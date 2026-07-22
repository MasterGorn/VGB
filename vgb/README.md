# Video Games Battle — stack Next.js (comme Liengo)

## Architecture

```
VGB/                    ← racine Git
├── api/                ← legacy PHP (optionnel, matchmaking local MAMP)
├── vgb/                ← app Next.js 16 (Root Directory Vercel)
│   ├── src/            ← App Router, NextAuth, Mongoose
│   ├── public/         ← jeu Phaser (play.html) + assets
│   └── .env.example
└── README.md
```

Stack alignée sur Liengo (sans Stripe / Resend / Blob) :

| Couche | Techno |
|--------|--------|
| Runtime | Node.js ≥ 20, TypeScript 5, ESM |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind 3 |
| DB | MongoDB Atlas via Mongoose 8 |
| Auth | NextAuth 4 (Credentials + JWT) |
| Host | Vercel (preview à chaque push) |

## Setup local

1. Créer un cluster **MongoDB Atlas** + URI `MONGODB_URI`
2. Dans `vgb/` :

```bash
cd vgb
cp .env.example .env.local
# renseigner MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_APP_URL
npm install
npm run dev
```

3. Ouvrir http://localhost:3000 → **même site qu’avant** (pages HTML historiques)  
   - Jeu : `/` ou `/play.html`  
   - Compte : `/login.html`  
   - Classement : `/classement.html`  
   - Pièces / règles / objets : inchangés  

L’API Next (auth Atlas, Elo) tourne en arrière-plan ; le design reste celui de `public/css/`.

## Vercel

1. Importer le dépôt GitHub **MasterGorn/VGB**
2. **Root Directory** = `vgb`
3. **Framework Preset** = **Next.js** (obligatoire)
4. **Output Directory** = **laisser vide** (ne jamais mettre `public` / `vgb/public` — sinon les pages HTML marchent mais **toutes les routes `/api/*` renvoient 404**)
5. Variables d’environnement (Production + Preview) :
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET` (obligatoire en prod, sinon NextAuth peut échouer)
   - `NEXTAUTH_URL` = `https://www.videogamesbattle.com` (sans `/` final)
   - `NEXT_PUBLIC_APP_URL` = `https://www.videogamesbattle.com`
6. **Deployment Protection** : désactiver sur Production (Settings → Deployment Protection → Vercel Authentication OFF, ou « Only Preview »)
7. Après changement de config build : **Redeploy** le déploiement Production

### Si `/api/auth/session` ou `/api/health` → 404

Le site est servi en **statique** (HTML/CSS/images OK) sans fonctions Next.js. Checklist :
- Root Directory = `vgb`
- Framework = Next.js
- Output Directory **vide**
- Build logs doivent contenir `Compiled successfully` / routes API, pas seulement une copie de fichiers
- Le fichier `vgb/vercel.json` force le framework Next.js

Le script `scripts/vercel-postbuild.mjs` contourne le bug Next 16 + Root Directory.

## API

| Route | Rôle |
|-------|------|
| `POST /api/auth/register` | Création de compte |
| `/api/auth/[...nextauth]` | NextAuth (login / session) |
| `GET/POST /api/decks` | Liste / création decks |
| `PATCH/DELETE /api/decks/[id]` | MAJ / suppression |
| `GET /api/leaderboard` | Classement Elo |
| `POST /api/elo` | MAJ Elo après partie |
| `POST /api/match` | File d’attente / matchmaking (`enqueue`, `cancel`, `status`) |
| `POST /api/game` | Draft, sync état, fin de partie (`get`, `setDraft`, `pushState`, `finish`) |
| `GET /api/history` | 5 derniers résultats (W/L/D) du joueur connecté |
| `GET /api/health` | Santé |

## Notes

- Comptes **username + password** (pas d’e-mail pour l’instant).
- Matchmaking 1v1 classé : API Next `/api/match` + `/api/game` (MongoDB Atlas).
- Ancien front MAMP / PHP à la racine du repo reste disponible en fallback (`localStorage vgb_api_mode=php`).
