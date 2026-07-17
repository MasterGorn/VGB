const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { User, Token, Deck } = require('./models');

const ROLE_LIMITS = {
  pawn: 9,
  knight: 2,
  bishop: 2,
  rook: 2,
  queen: 1,
  unique: 1,
};

const ELO_DEFAULT = Number(process.env.ELO_DEFAULT || 1000);
const ELO_K = Number(process.env.ELO_K || 32);

function publicUser(user) {
  return {
    id: String(user._id),
    username: user.username,
    elo: user.elo,
    wins: user.wins,
    losses: user.losses,
    draws: user.draws,
  };
}

function publicDeck(deck) {
  return {
    id: String(deck._id),
    name: deck.name,
    faction: deck.faction,
    slots: deck.slots,
    isDefault: !!deck.isDefault,
    updatedAt: deck.updatedAt,
    createdAt: deck.createdAt,
  };
}

function newToken() {
  return crypto.randomBytes(24).toString('hex');
}

function validateSlots(slots) {
  if (!Array.isArray(slots)) {
    const err = new Error('slots invalides');
    err.status = 400;
    throw err;
  }
  const counts = Object.fromEntries(Object.keys(ROLE_LIMITS).map((r) => [r, 0]));
  const clean = [];
  for (const slot of slots) {
    const role = String(slot.role || '');
    const pieceKey = String(slot.pieceKey || slot.nameKey || '').trim();
    if (!ROLE_LIMITS[role]) {
      const err = new Error('Rôle inconnu: ' + role);
      err.status = 400;
      throw err;
    }
    if (!pieceKey || pieceKey.length > 64 || !/^[a-zA-Z0-9_\-&]+$/.test(pieceKey)) {
      const err = new Error('pieceKey invalide');
      err.status = 400;
      throw err;
    }
    counts[role] += 1;
    clean.push({ role, pieceKey });
  }
  for (const [role, limit] of Object.entries(ROLE_LIMITS)) {
    if (counts[role] !== limit) {
      const err = new Error(`Quota ${role} incorrect (${counts[role]}/${limit})`);
      err.status = 400;
      throw err;
    }
  }
  return clean;
}

function eloUpdate(ratingA, ratingB, scoreA) {
  const expectedA = 1 / (1 + 10 ** ((ratingB - ratingA) / 400));
  const expectedB = 1 - expectedA;
  const newA = Math.round(ratingA + ELO_K * (scoreA - expectedA));
  const newB = Math.round(ratingB + ELO_K * ((1 - scoreA) - expectedB));
  return [newA, newB];
}

async function authMiddleware(req, res, next) {
  try {
    let token = '';
    const auth = req.headers.authorization || '';
    if (auth.toLowerCase().startsWith('bearer ')) token = auth.slice(7).trim();
    if (!token) token = (req.headers['x-auth-token'] || '').toString().trim();
    if (!token) token = (req.query.token || '').toString().trim();
    if (!token) return res.status(401).json({ ok: false, error: 'Non authentifié' });

    const row = await Token.findOne({ token }).lean();
    if (!row) return res.status(401).json({ ok: false, error: 'Session invalide' });
    const user = await User.findById(row.userId);
    if (!user) return res.status(401).json({ ok: false, error: 'Session invalide' });
    req.user = user;
    req.authToken = token;
    next();
  } catch (e) {
    next(e);
  }
}

function registerAuthRoutes(app) {
  app.post('/api/auth', async (req, res, next) => {
    try {
      const action = req.body.action || req.query.action;

      if (action === 'register') {
        const username = String(req.body.username || '').trim();
        const password = String(req.body.password || '');
        if (username.length < 3 || username.length > 24) {
          return res.status(400).json({ ok: false, error: 'Pseudo entre 3 et 24 caractères' });
        }
        if (!/^[a-zA-Z0-9_\-]+$/.test(username)) {
          return res.status(400).json({ ok: false, error: 'Pseudo: lettres, chiffres, _ et - uniquement' });
        }
        if (password.length < 4) {
          return res.status(400).json({ ok: false, error: 'Mot de passe trop court (min. 4)' });
        }
        const exists = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
        if (exists) return res.status(409).json({ ok: false, error: 'Ce pseudo est déjà pris' });

        const user = await User.create({
          username,
          passwordHash: await bcrypt.hash(password, 10),
          elo: ELO_DEFAULT,
        });
        const token = newToken();
        await Token.create({ token, userId: user._id });
        return res.json({ ok: true, token, user: publicUser(user) });
      }

      if (action === 'login') {
        const username = String(req.body.username || '').trim();
        const password = String(req.body.password || '');
        const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
          return res.status(401).json({ ok: false, error: 'Identifiants incorrects' });
        }
        const token = newToken();
        await Token.create({ token, userId: user._id });
        return res.json({ ok: true, token, user: publicUser(user) });
      }

      if (action === 'me' || action === 'logout') {
        return authMiddleware(req, res, async () => {
          try {
            if (action === 'logout') {
              await Token.deleteOne({ token: req.authToken });
              return res.json({ ok: true });
            }
            return res.json({ ok: true, user: publicUser(req.user) });
          } catch (e) {
            next(e);
          }
        });
      }

      return res.status(400).json({ ok: false, error: 'Action inconnue. Utilisez register, login, me ou logout.' });
    } catch (e) {
      next(e);
    }
  });
}

function registerLeaderboardRoutes(app) {
  app.get('/api/leaderboard', async (req, res, next) => {
    try {
      const limit = Math.max(1, Math.min(100, Number(req.query.limit || 20)));
      const users = await User.find({})
        .sort({ elo: -1, wins: -1, username: 1 })
        .limit(limit)
        .lean();
      const leaderboard = users.map((u, i) => ({
        rank: i + 1,
        id: String(u._id),
        username: u.username,
        elo: u.elo,
        wins: u.wins,
        losses: u.losses,
        draws: u.draws,
      }));
      res.json({ ok: true, leaderboard });
    } catch (e) {
      next(e);
    }
  });
}

function registerDeckRoutes(app) {
  app.post('/api/deck', authMiddleware, async (req, res, next) => {
    try {
      const action = req.body.action || req.query.action || 'list';
      const userId = req.user._id;

      if (action === 'list') {
        const decks = await Deck.find({ userId }).sort({ isDefault: -1, updatedAt: -1 });
        return res.json({ ok: true, decks: decks.map(publicDeck) });
      }

      if (action === 'get') {
        const id = req.body.id || req.query.id;
        let deck;
        if (id) deck = await Deck.findOne({ _id: id, userId });
        else deck = await Deck.findOne({ userId }).sort({ isDefault: -1, updatedAt: -1 });
        if (!deck) return res.status(404).json({ ok: false, error: 'Aucun deck' });
        return res.json({ ok: true, deck: publicDeck(deck) });
      }

      if (action === 'save') {
        const name = String(req.body.name || 'Mon deck').trim().slice(0, 40) || 'Mon deck';
        const faction = String(req.body.faction || '');
        if (!['Nintendo', 'PlayStation', 'SEGA', 'Xbox'].includes(faction)) {
          return res.status(400).json({ ok: false, error: 'Faction invalide' });
        }
        const slots = validateSlots(req.body.slots || []);
        let isDefault = !!req.body.isDefault;
        const id = req.body.id;

        if (isDefault) {
          await Deck.updateMany({ userId }, { $set: { isDefault: false } });
        }

        let deck;
        if (id) {
          deck = await Deck.findOne({ _id: id, userId });
          if (!deck) return res.status(404).json({ ok: false, error: 'Deck introuvable' });
          deck.name = name;
          deck.faction = faction;
          deck.slots = slots;
          deck.isDefault = isDefault;
          deck.updatedAt = new Date();
          await deck.save();
        } else {
          const count = await Deck.countDocuments({ userId });
          if (count >= 5) return res.status(400).json({ ok: false, error: 'Maximum 5 decks par compte' });
          if (count === 0) isDefault = true;
          deck = await Deck.create({ userId, name, faction, slots, isDefault });
        }
        return res.json({ ok: true, deck: publicDeck(deck) });
      }

      if (action === 'setDefault') {
        const id = req.body.id;
        const deck = await Deck.findOne({ _id: id, userId });
        if (!deck) return res.status(404).json({ ok: false, error: 'Deck introuvable' });
        await Deck.updateMany({ userId }, { $set: { isDefault: false } });
        deck.isDefault = true;
        deck.updatedAt = new Date();
        await deck.save();
        return res.json({ ok: true });
      }

      if (action === 'delete') {
        const result = await Deck.deleteOne({ _id: req.body.id, userId });
        if (!result.deletedCount) return res.status(404).json({ ok: false, error: 'Deck introuvable' });
        return res.json({ ok: true });
      }

      return res.status(400).json({ ok: false, error: 'Action inconnue' });
    } catch (e) {
      if (e.status) return res.status(e.status).json({ ok: false, error: e.message });
      next(e);
    }
  });
}

/** Mise à jour Elo après une partie (appelé par le client ou un service de match) */
function registerEloRoutes(app) {
  app.post('/api/elo', authMiddleware, async (req, res, next) => {
    try {
      const { opponentId, result } = req.body;
      // result: 'win' | 'loss' | 'draw'
      if (!opponentId || !['win', 'loss', 'draw'].includes(result)) {
        return res.status(400).json({ ok: false, error: 'opponentId et result (win|loss|draw) requis' });
      }
      const opponent = await User.findById(opponentId);
      if (!opponent) return res.status(404).json({ ok: false, error: 'Adversaire introuvable' });

      const scoreA = result === 'win' ? 1 : result === 'draw' ? 0.5 : 0;
      const [newA, newB] = eloUpdate(req.user.elo, opponent.elo, scoreA);
      req.user.elo = newA;
      opponent.elo = newB;
      if (result === 'win') { req.user.wins += 1; opponent.losses += 1; }
      else if (result === 'loss') { req.user.losses += 1; opponent.wins += 1; }
      else { req.user.draws += 1; opponent.draws += 1; }
      await req.user.save();
      await opponent.save();
      res.json({
        ok: true,
        user: publicUser(req.user),
        opponent: publicUser(opponent),
      });
    } catch (e) {
      next(e);
    }
  });
}

module.exports = {
  registerAuthRoutes,
  registerLeaderboardRoutes,
  registerDeckRoutes,
  registerEloRoutes,
  authMiddleware,
  publicUser,
  ROLE_LIMITS,
};
