# Video Games Battle (VGB)

Jeu de stratégie type échecs avec skins de jeux vidéo.

## Deux façons de lancer

### Recommandé — Next.js + MongoDB Atlas (comme Liengo)

App dans le dossier **`vgb/`** (déploiement Vercel, comptes partagés local/prod).

Voir **[vgb/README.md](vgb/README.md)**.

```bash
cd vgb
cp .env.example .env.local   # MONGODB_URI + NEXTAUTH_*
npm install
npm run dev
```

### Legacy — HTML + PHP (MAMP)

Pages à la racine + `api/*.php` (SQLite). Utile pour le matchmaking local sans Atlas.

Ouvrir via Apache MAMP, ex. `http://localhost:8888/videogamesbattle/VGB/`.
