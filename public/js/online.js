/**
 * VGB Online — auth, matchmaking Elo, sync draft / partie, decks
 *
 * Backend par défaut : API PHP (MAMP) sous api/
 * Option MongoDB : localStorage.vgb_api_base = 'http://localhost:3000/api'
 *   (serveur Node dans /server + docker-compose)
 */
(function (global) {
  function apiBase() {
    try {
      const custom = localStorage.getItem('vgb_api_base');
      if (custom) return custom.replace(/\/$/, '');
    } catch (e) {}
    return null;
  }

  function endpoints() {
    const base = apiBase();
    if (base) {
      return {
        auth: base + '/auth',
        match: base + '/match',
        game: base + '/game',
        leaderboard: base + '/leaderboard',
        deck: base + '/deck',
      };
    }
    return {
      auth: 'api/auth.php',
      match: 'api/match.php',
      game: 'api/game.php',
      leaderboard: 'api/leaderboard.php',
      deck: 'api/deck.php',
    };
  }

  const storageKey = 'vgb_online_session';

  const Online = {
    token: null,
    user: null,
    match: null,
    seat: null,
    pollTimer: null,
    queueTimer: null,
    lastVersion: 0,
    enabled: false,

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
      localStorage.setItem(storageKey, JSON.stringify({ token: this.token, user: this.user }));
    },

    clearSession() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(storageKey);
    },

    async request(url, body) {
      const opts = {
        method: body ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      if (this.token) opts.headers['X-Auth-Token'] = this.token;
      if (body) opts.body = JSON.stringify(body);

      let res;
      try {
        res = await fetch(url, opts);
      } catch (e) {
        throw new Error(
          'Impossible de joindre l\'API (' + url + '). ' +
          'Ouvrez le site via MAMP (ex. http://localhost:8888/...) ou lancez : php -S localhost:8000'
        );
      }

      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (e) {
        const looksPhp = /<\?php|PDO|Fatal error|Warning:/i.test(raw);
        const looksHtml = /^\s*</.test(raw);
        if (looksPhp || looksHtml || res.status === 404) {
          throw new Error(
            'L\'API PHP ne répond pas en JSON. ' +
            'N\'utilisez pas http-server / file:// : ouvrez via MAMP ' +
            '(http://localhost:8888/videogamesbattle/VGB/) ou : php -S localhost:8000'
          );
        }
        throw new Error('Réponse invalide du serveur (HTTP ' + res.status + ')');
      }

      if (!res.ok || data.ok === false) {
        throw new Error(data.error || ('Erreur HTTP ' + res.status));
      }
      return data;
    },

    async register(username, password) {
      const API = endpoints();
      const data = await this.request(API.auth, { action: 'register', username, password });
      this.token = data.token;
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async login(username, password) {
      const API = endpoints();
      const data = await this.request(API.auth, { action: 'login', username, password });
      this.token = data.token;
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async refreshMe() {
      if (!this.token) return null;
      const API = endpoints();
      const data = await this.request(API.auth, { action: 'me' });
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async logout() {
      try {
        if (this.token) {
          const API = endpoints();
          await this.request(API.auth, { action: 'logout' });
        }
      } catch (e) {}
      this.stopPolling();
      this.clearSession();
      this.match = null;
      this.enabled = false;
    },

    async fetchLeaderboard(limit = 10) {
      const API = endpoints();
      const data = await this.request(API.leaderboard + '?limit=' + limit);
      return data.leaderboard || [];
    },

    async listDecks() {
      const API = endpoints();
      const data = await this.request(API.deck, { action: 'list' });
      return data.decks || [];
    },

    async getDeck(id) {
      const API = endpoints();
      const data = await this.request(API.deck, { action: 'get', id: id || undefined });
      return data.deck;
    },

    async saveDeck({ id, name, faction, slots, isDefault }) {
      const API = endpoints();
      const data = await this.request(API.deck, {
        action: 'save',
        id,
        name,
        faction,
        slots,
        isDefault: !!isDefault,
      });
      return data.deck;
    },

    async deleteDeck(id) {
      const API = endpoints();
      return this.request(API.deck, { action: 'delete', id });
    },

    async setDefaultDeck(id) {
      const API = endpoints();
      return this.request(API.deck, { action: 'setDefault', id });
    },

    armyToSlots(army) {
      return (army || [])
        .filter((p) => p && p.role && p.role !== 'king')
        .map((p) => ({
          role: p.role,
          pieceKey: p.nameKey || p.type || '',
        }));
    },

    slotsToArmy(slots, piecesCatalog) {
      const byKey = {};
      (piecesCatalog || []).forEach((p) => {
        if (p.nameKey) byKey[p.nameKey] = p;
      });
      return (slots || []).map((s) => {
        const base = byKey[s.pieceKey];
        if (!base) return null;
        return Object.assign({}, base, { role: s.role });
      }).filter(Boolean);
    },

    async enqueue(gridSize) {
      const API = endpoints();
      const data = await this.request(API.match, { action: 'enqueue', gridSize });
      if (data.matched) {
        this.onMatched(data.match);
      }
      return data;
    },

    async cancelQueue() {
      this.stopQueuePoll();
      const API = endpoints();
      return this.request(API.match, { action: 'cancel' });
    },

    startQueuePoll(gridSize, onUpdate) {
      this.stopQueuePoll();
      this.queueTimer = setInterval(async () => {
        try {
          const API = endpoints();
          const data = await this.request(API.match, { action: 'status' });
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
      if (typeof global.VGBOnline_onMatched === 'function') {
        global.VGBOnline_onMatched(match);
      }
    },

    async submitDraft({ faction, army, name }) {
      if (!this.match) throw new Error('Pas de partie');
      const API = endpoints();
      const data = await this.request(API.game, {
        action: 'setDraft',
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
      const API = endpoints();
      state.version = (this.lastVersion || 0) + 1;
      const data = await this.request(API.game, {
        action: 'pushState',
        matchId: this.match.matchId,
        state,
        currentSeat,
      });
      if (data.state) {
        this.lastVersion = data.state.version || this.lastVersion;
      }
      return data;
    },

    async finish(winnerSeat) {
      if (!this.match) return;
      const API = endpoints();
      const data = await this.request(API.game, {
        action: 'finish',
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
          const API = endpoints();
          const data = await this.request(API.game, {
            action: 'get',
            matchId: this.match.matchId,
          });
          const version = (data.state && data.state.version) || 0;
          if (version > this.lastVersion) {
            this.lastVersion = version;
            handler(data);
          } else if (data.status === 'finished') {
            handler(data);
          }
        } catch (e) {
          console.warn('Poll erreur', e);
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
