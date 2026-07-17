/**
 * VGB Online — auth, matchmaking Elo, sync draft / partie
 */
(function (global) {
  const API = {
    auth: 'api/auth.php',
    match: 'api/match.php',
    game: 'api/game.php',
    leaderboard: 'api/leaderboard.php',
  };

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
      const res = await fetch(url, opts);
      const data = await res.json().catch(() => ({ ok: false, error: 'Réponse invalide' }));
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || ('Erreur HTTP ' + res.status));
      }
      return data;
    },

    async register(username, password) {
      const data = await this.request(API.auth, { action: 'register', username, password });
      this.token = data.token;
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async login(username, password) {
      const data = await this.request(API.auth, { action: 'login', username, password });
      this.token = data.token;
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async refreshMe() {
      if (!this.token) return null;
      const data = await this.request(API.auth, { action: 'me' });
      this.user = data.user;
      this.saveSession();
      return data.user;
    },

    async logout() {
      try {
        if (this.token) await this.request(API.auth, { action: 'logout' });
      } catch (e) {}
      this.stopPolling();
      this.clearSession();
      this.match = null;
      this.enabled = false;
    },

    async fetchLeaderboard(limit = 10) {
      const data = await this.request(API.leaderboard + '?limit=' + limit);
      return data.leaderboard || [];
    },

    async enqueue(gridSize) {
      const data = await this.request(API.match, { action: 'enqueue', gridSize });
      if (data.matched) {
        this.onMatched(data.match);
      }
      return data;
    },

    async cancelQueue() {
      this.stopQueuePoll();
      return this.request(API.match, { action: 'cancel' });
    },

    startQueuePoll(gridSize, onUpdate) {
      this.stopQueuePoll();
      this.queueTimer = setInterval(async () => {
        try {
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
