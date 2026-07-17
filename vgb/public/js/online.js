/**
 * VGB Online — client pour Next.js (NextAuth + MongoDB Atlas)
 * Session cookie (credentials: include). Fallback PHP si /api/health absent.
 */
(function (global) {
  function preferNext() {
    try {
      const force = localStorage.getItem("vgb_api_mode");
      if (force === "php") return false;
      if (force === "next") return true;
    } catch (e) {}
    return true;
  }

  function phpEndpoints() {
    return {
      auth: "api/auth.php",
      match: "api/match.php",
      game: "api/game.php",
      leaderboard: "api/leaderboard.php",
      deck: "api/deck.php",
    };
  }

  const storageKey = "vgb_online_session";

  const Online = {
    token: null,
    user: null,
    match: null,
    seat: null,
    pollTimer: null,
    queueTimer: null,
    lastVersion: 0,
    enabled: false,
    mode: preferNext() ? "next" : "php",

    loadSession() {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return;
        const data = JSON.parse(raw);
        this.token = data.token || null;
        this.user = data.user || null;
      } catch (e) {}
    },

    saveSession() {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ token: this.token, user: this.user, mode: this.mode })
      );
    },

    clearSession() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(storageKey);
    },

    async request(url, body, method) {
      const opts = {
        method: method || (body ? "POST" : "GET"),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      if (this.mode === "php" && this.token && this.token !== "session") {
        opts.headers["X-Auth-Token"] = this.token;
      }
      if (body) opts.body = JSON.stringify(body);

      let res;
      try {
        res = await fetch(url, opts);
      } catch (e) {
        throw new Error(
          "Impossible de joindre l'API. Lancez `cd vgb && npm run dev` avec MONGODB_URI, ou ouvrez le déploiement Vercel."
        );
      }

      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (e) {
        throw new Error(
          "Réponse non JSON. Vérifiez que l'app Next.js tourne (Root Directory = vgb sur Vercel)."
        );
      }
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Erreur HTTP " + res.status);
      }
      return data;
    },

    async register(username, password) {
      if (this.mode === "next") {
        const data = await this.request("/api/auth/register", { username, password });
        await this.login(username, password);
        return data.user;
      }
      const API = phpEndpoints();
      const data = await this.request(API.auth, { action: "register", username, password });
      this.token = data.token;
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async login(username, password) {
      if (this.mode === "next") {
        const csrfRes = await fetch("/api/auth/csrf", { credentials: "include" });
        const csrf = await csrfRes.json();
        const body = new URLSearchParams({
          csrfToken: csrf.csrfToken,
          username,
          password,
          json: "true",
          callbackUrl: "/",
        });
        const res = await fetch("/api/auth/callback/credentials", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
        if (!res.ok) throw new Error("Identifiants incorrects");
        return this.refreshMe();
      }
      const API = phpEndpoints();
      const data = await this.request(API.auth, { action: "login", username, password });
      this.token = data.token;
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async refreshMe() {
      if (this.mode === "next") {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        const data = await res.json();
        if (!data?.user?.name) {
          this.clearSession();
          return null;
        }
        this.token = "session";
        this.user = {
          id: data.user.id,
          username: data.user.name,
          elo: data.user.elo,
          wins: data.user.wins,
          losses: data.user.losses,
          draws: data.user.draws,
        };
        this.saveSession();
        return this.user;
      }
      if (!this.token) return null;
      const API = phpEndpoints();
      const data = await this.request(API.auth, { action: "me" });
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async logout() {
      try {
        if (this.mode === "next") {
          const csrfRes = await fetch("/api/auth/csrf", { credentials: "include" });
          const csrf = await csrfRes.json();
          await fetch("/api/auth/signout", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ csrfToken: csrf.csrfToken, json: "true" }),
          });
        } else if (this.token) {
          const API = phpEndpoints();
          await this.request(API.auth, { action: "logout" });
        }
      } catch (e) {}
      this.stopPolling();
      this.clearSession();
      this.match = null;
      this.enabled = false;
    },

    async fetchLeaderboard(limit = 10) {
      if (this.mode === "next") {
        const data = await this.request("/api/leaderboard?limit=" + limit);
        return data.leaderboard || [];
      }
      const API = phpEndpoints();
      const data = await this.request(API.leaderboard + "?limit=" + limit);
      return data.leaderboard || [];
    },

    async listDecks() {
      if (this.mode === "next") {
        const data = await this.request("/api/decks");
        return data.decks || [];
      }
      const API = phpEndpoints();
      const data = await this.request(API.deck, { action: "list" });
      return data.decks || [];
    },

    async getDeck(id) {
      if (this.mode === "next") {
        const q = id ? "?id=" + encodeURIComponent(id) : "?default=1";
        const data = await this.request("/api/decks" + q);
        return data.deck;
      }
      const API = phpEndpoints();
      const data = await this.request(API.deck, { action: "get", id: id || undefined });
      return data.deck;
    },

    async saveDeck({ id, name, faction, slots, isDefault }) {
      if (this.mode === "next") {
        if (id) {
          const data = await this.request(
            "/api/decks/" + id,
            { name, faction, slots, isDefault: !!isDefault },
            "PATCH"
          );
          return data.deck;
        }
        const data = await this.request("/api/decks", {
          name,
          faction,
          slots,
          isDefault: !!isDefault,
        });
        return data.deck;
      }
      const API = phpEndpoints();
      const data = await this.request(API.deck, {
        action: "save",
        id,
        name,
        faction,
        slots,
        isDefault: !!isDefault,
      });
      return data.deck;
    },

    async deleteDeck(id) {
      if (this.mode === "next") {
        return this.request("/api/decks/" + id, null, "DELETE");
      }
      const API = phpEndpoints();
      return this.request(API.deck, { action: "delete", id });
    },

    async setDefaultDeck(id) {
      if (this.mode === "next") {
        return this.request("/api/decks/" + id, { isDefault: true }, "PATCH");
      }
      const API = phpEndpoints();
      return this.request(API.deck, { action: "setDefault", id });
    },

    armyToSlots(army) {
      return (army || [])
        .filter((p) => p && p.role && p.role !== "king")
        .map((p) => ({
          role: p.role,
          pieceKey: p.nameKey || p.type || "",
        }));
    },

    slotsToArmy(slots, piecesCatalog) {
      const byKey = {};
      (piecesCatalog || []).forEach((p) => {
        if (p.nameKey) byKey[p.nameKey] = p;
      });
      return (slots || [])
        .map((s) => {
          const base = byKey[s.pieceKey];
          if (!base) return null;
          return Object.assign({}, base, { role: s.role });
        })
        .filter(Boolean);
    },

    async enqueue(gridSize) {
      const API = phpEndpoints();
      const data = await this.request(API.match, { action: "enqueue", gridSize });
      if (data.matched) this.onMatched(data.match);
      return data;
    },

    async cancelQueue() {
      this.stopQueuePoll();
      const API = phpEndpoints();
      return this.request(API.match, { action: "cancel" });
    },

    startQueuePoll(gridSize, onUpdate) {
      this.stopQueuePoll();
      this.queueTimer = setInterval(async () => {
        try {
          const API = phpEndpoints();
          const data = await this.request(API.match, { action: "status" });
          if (onUpdate) onUpdate(data);
          if (data.matched) {
            this.stopQueuePoll();
            this.onMatched(data.match);
          }
        } catch (e) {
          if (onUpdate) onUpdate({ error: e.message });
        }
      }, 1500);
    },

    stopQueuePoll() {
      if (this.queueTimer) {
        clearInterval(this.queueTimer);
        this.queueTimer = null;
      }
    },

    onMatched(match) {
      this.match = match;
      this.seat = match.seat;
      this.enabled = true;
      this.lastVersion = (match.state && match.state.version) || 0;
      if (typeof global.VGBOnline_onMatched === "function") {
        global.VGBOnline_onMatched(match);
      }
    },

    async submitDraft({ faction, army, name }) {
      if (!this.match) throw new Error("Pas de partie");
      const API = phpEndpoints();
      const data = await this.request(API.game, {
        action: "setDraft",
        matchId: this.match.matchId,
        faction,
        army,
        name,
      });
      this.lastVersion = (data.state && data.state.version) || this.lastVersion;
      return data;
    },

    async pushGameState(state, currentSeat) {
      if (!this.match || !this.enabled) return;
      const API = phpEndpoints();
      state.version = (this.lastVersion || 0) + 1;
      const data = await this.request(API.game, {
        action: "pushState",
        matchId: this.match.matchId,
        state,
        currentSeat,
      });
      if (data.state) this.lastVersion = data.state.version || this.lastVersion;
      return data;
    },

    async finish(winnerSeat) {
      if (!this.match) return;
      const API = phpEndpoints();
      const data = await this.request(API.game, {
        action: "finish",
        matchId: this.match.matchId,
        winnerSeat,
      });
      try {
        await this.refreshMe();
      } catch (e) {}
      return data;
    },

    startMatchPoll(handler) {
      this.stopPolling();
      this.pollTimer = setInterval(async () => {
        try {
          const API = phpEndpoints();
          const data = await this.request(API.game, {
            action: "get",
            matchId: this.match.matchId,
          });
          const version = (data.state && data.state.version) || 0;
          if (version > this.lastVersion) {
            this.lastVersion = version;
            handler(data);
          } else if (data.status === "finished") {
            handler(data);
          }
        } catch (e) {
          console.warn("Poll erreur", e);
        }
      }, 1200);
    },

    stopPolling() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
      this.stopQueuePoll();
    },

    isMyTurn(currentPlayer) {
      return this.enabled && this.seat === currentPlayer;
    },
  };

  Online.loadSession();
  global.VGBOnline = Online;
})(window);
