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
      if (typeof VGBHeader !== "undefined" && typeof VGBHeader.refreshAuth === "function") {
        VGBHeader.refreshAuth();
      }
    },

    clearSession() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(storageKey);
      if (typeof VGBHeader !== "undefined" && typeof VGBHeader.refreshAuth === "function") {
        VGBHeader.refreshAuth();
      }
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
          recentResults: [],
        };
        try {
          const hist = await this.request("/api/history");
          if (hist && hist.user) {
            this.user.elo = hist.user.elo;
            this.user.wins = hist.user.wins;
            this.user.losses = hist.user.losses;
            this.user.draws = hist.user.draws;
            this.user.recentResults = hist.results || hist.user.recentResults || [];
          }
        } catch (e) {}
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

    async fetchHistory() {
      if (this.mode === "next") {
        return this.request("/api/history");
      }
      return { ok: true, results: (this.user && this.user.recentResults) || [], slots: [] };
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

    async listReplays() {
      if (this.mode !== "next") {
        return { auto: [], favorites: [], limits: { auto: 5, favorite: 10 } };
      }
      return this.request("/api/replays");
    },

    async getReplay(id) {
      if (this.mode !== "next") throw new Error("Replays disponibles uniquement en mode en ligne");
      const data = await this.request("/api/replays?id=" + encodeURIComponent(id));
      return data.replay;
    },

    async saveAutoReplay(payload, meta, matchId) {
      if (this.mode !== "next" || !this.user) return null;
      const body = {
        type: "auto",
        payload,
        meta: meta || undefined,
        matchId: matchId || undefined,
      };
      if (payload && Array.isArray(payload.moveLog) && payload.moveLog.length) {
        body.moveLog = payload.moveLog;
      }
      const data = await this.request("/api/replays", body);
      return data.replay;
    },

    async saveFavoriteReplay(payload, options) {
      if (this.mode !== "next" || !this.user) {
        throw new Error("Connectez-vous pour sauvegarder un replay favori");
      }
      const body = { type: "favorite" };
      if (options && options.fromReplayId) {
        body.fromReplayId = options.fromReplayId;
        if (options.name) body.name = options.name;
      } else {
        body.payload = payload;
        if (options && options.meta) body.meta = options.meta;
        if (options && options.name) body.name = options.name;
      }
      const data = await this.request("/api/replays", body);
      return data.replay;
    },

    async renameReplay(id, name) {
      if (this.mode !== "next") throw new Error("Replays indisponibles");
      const data = await this.request("/api/replays/" + id, { name }, "PATCH");
      return data.replay;
    },

    async deleteReplay(id) {
      if (this.mode !== "next") throw new Error("Replays indisponibles");
      return this.request("/api/replays/" + id, null, "DELETE");
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
      if (this.mode === "next") {
        const data = await this.request("/api/match", { action: "enqueue", gridSize });
        if (data.matched) this.onMatched(data.match);
        return data;
      }
      const API = phpEndpoints();
      const data = await this.request(API.match, { action: "enqueue", gridSize });
      if (data.matched) this.onMatched(data.match);
      return data;
    },

    async cancelQueue() {
      this.stopQueuePoll();
      if (this.mode === "next") {
        return this.request("/api/match", { action: "cancel" });
      }
      const API = phpEndpoints();
      return this.request(API.match, { action: "cancel" });
    },

    async createPrivate(targetUserId) {
      if (this.mode !== "next") {
        throw new Error("Parties privées disponibles uniquement avec l'API Next.js");
      }
      const data = await this.request("/api/match", {
        action: "createPrivate",
        targetUserId: targetUserId || undefined,
      });
      if (data.matched) this.onMatched(data.match);
      return data;
    },

    async joinPrivate({ roomCode, hostId }) {
      if (this.mode !== "next") {
        throw new Error("Parties privées disponibles uniquement avec l'API Next.js");
      }
      const data = await this.request("/api/match", {
        action: "joinPrivate",
        roomCode: roomCode || undefined,
        hostId: hostId || undefined,
      });
      if (data.matched) this.onMatched(data.match);
      return data;
    },

    async cancelPrivate() {
      if (this.mode !== "next") return { ok: true };
      return this.request("/api/match", { action: "cancelPrivate" });
    },

    startQueuePoll(gridSize, onUpdate) {
      this.stopQueuePoll();
      this.queueTimer = setInterval(async () => {
        try {
          let data;
          if (this.mode === "next") {
            data = await this.request("/api/match", { action: "status" });
          } else {
            const API = phpEndpoints();
            data = await this.request(API.match, { action: "status" });
          }
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
      const payload = {
        action: "setDraft",
        matchId: this.match.matchId,
        faction,
        army,
        name,
      };
      const data =
        this.mode === "next"
          ? await this.request("/api/game", payload)
          : await this.request(phpEndpoints().game, payload);
      this.lastVersion = (data.state && data.state.version) || this.lastVersion;
      return data;
    },

    async pushGameState(state, currentSeat) {
      if (!this.match || !this.enabled) return;
      state.version = (this.lastVersion || 0) + 1;
      const payload = {
        action: "pushState",
        matchId: this.match.matchId,
        state,
        currentSeat,
      };
      const data =
        this.mode === "next"
          ? await this.request("/api/game", payload)
          : await this.request(phpEndpoints().game, payload);
      if (data.state) this.lastVersion = data.state.version || this.lastVersion;
      return data;
    },

    async finish(winnerSeat, extra) {
      if (!this.match) return;
      const moveLog = extra && extra.moveLog ? extra.moveLog : undefined;
      let replayPayload = extra && extra.replayPayload ? extra.replayPayload : undefined;
      if (replayPayload && moveLog && (!Array.isArray(replayPayload.moveLog) || !replayPayload.moveLog.length)) {
        replayPayload = Object.assign({}, replayPayload, { moveLog: moveLog.slice() });
      }
      const payload = {
        action: "finish",
        matchId: this.match.matchId,
        winnerSeat,
        moveLog,
        replayPayload,
      };
      const data =
        this.mode === "next"
          ? await this.request("/api/game", payload)
          : await this.request(phpEndpoints().game, payload);
      if (data && data.you) {
        this.user = Object.assign({}, this.user || {}, data.you);
        this.saveSession();
      } else {
        try {
          await this.refreshMe();
        } catch (e) {}
      }
      return data;
    },

    startMatchPoll(handler) {
      this.stopPolling();
      this.pollTimer = setInterval(async () => {
        try {
          const payload = {
            action: "get",
            matchId: this.match.matchId,
          };
          const data =
            this.mode === "next"
              ? await this.request("/api/game", payload)
              : await this.request(phpEndpoints().game, payload);
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
