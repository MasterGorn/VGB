require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {
  registerAuthRoutes,
  registerLeaderboardRoutes,
  registerDeckRoutes,
  registerEloRoutes,
} = require('./routes');

const PORT = Number(process.env.PORT || 3000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vgb';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('[VGB] MongoDB connecté:', MONGODB_URI);

  const app = express();
  app.use(cors({ origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN }));
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'vgb-mongo', time: new Date().toISOString() });
  });

  // Compatibilité avec le client PHP (même shape JSON)
  registerAuthRoutes(app);
  registerLeaderboardRoutes(app);
  registerDeckRoutes(app);
  registerEloRoutes(app);

  // Alias GET pour leaderboard déjà défini ; health ok

  app.use((err, _req, res, _next) => {
    console.error('[VGB]', err);
    res.status(500).json({ ok: false, error: err.message || 'Erreur serveur' });
  });

  app.listen(PORT, () => {
    console.log(`[VGB] API MongoDB sur http://localhost:${PORT}`);
    console.log('  POST /api/auth     { action: register|login|me|logout }');
    console.log('  GET  /api/leaderboard?limit=20');
    console.log('  POST /api/deck     { action: list|get|save|delete|setDefault }');
    console.log('  POST /api/elo      { opponentId, result: win|loss|draw }');
  });
}

main().catch((err) => {
  console.error('Impossible de démarrer:', err);
  process.exit(1);
});
