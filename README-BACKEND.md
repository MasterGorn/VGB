# Backend Video Games Battle

## Ce qui existe déjà (MAMP / PHP + SQLite)

Sous `api/` (fonctionne immédiatement avec MAMP) :

| Endpoint | Rôle |
|----------|------|
| `api/auth.php` | Compte : register / login / me / logout |
| `api/leaderboard.php` | Classement Elo |
| `api/match.php` + `api/game.php` | Matchmaking + sync partie |
| `api/deck.php` | **Nouveau** — decks favoris (jusqu’à 5) |

Elo : départ 1000, K=32. Mis à jour à la fin d’une partie online.

### Decks

Format d’un deck :

```json
{
  "name": "Mon deck Nintendo",
  "faction": "Nintendo",
  "isDefault": true,
  "slots": [
    { "role": "rook", "pieceKey": "bowser" },
    { "role": "knight", "pieceKey": "link" }
  ]
}
```

Quotas obligatoires (17 pièces, sans le roi auto) :

- pion ×9, cavalier ×2, fou ×2, tour ×2, dame ×1, unique ×1

Actions : `list` | `get` | `save` | `delete` | `setDefault`  
Auth : header `X-Auth-Token` (comme le reste de l’API).

**UI :** page `deck.html` + boutons *Charger deck* / *Sauver deck* au draft (`index.html`).

---

## Option MongoDB (Node)

Service parallèle dans `server/` + `docker-compose.yml`.

### Démarrage rapide

```bash
# Mongo + API
docker compose up -d --build

# ou en local
cd server
cp .env.example .env
npm install
# MongoDB doit tourner sur mongodb://127.0.0.1:27017
npm start
```

API : `http://localhost:3000`

| Route | Description |
|-------|-------------|
| `POST /api/auth` | register / login / me / logout |
| `GET /api/leaderboard?limit=20` | Classement |
| `POST /api/deck` | list / get / save / delete / setDefault |
| `POST /api/elo` | `{ opponentId, result: win\|loss\|draw }` |
| `GET /api/health` | Santé |

### Brancher le front sur Mongo

Dans la console navigateur (une fois) :

```js
localStorage.setItem('vgb_api_base', 'http://localhost:3000/api');
location.reload();
```

Pour revenir au PHP MAMP :

```js
localStorage.removeItem('vgb_api_base');
location.reload();
```

> Note : le matchmaking (`match` / `game`) reste sur PHP pour l’instant. Avec `vgb_api_base`, auth / classement / decks utilisent Mongo ; le match online PHP nécessite encore l’API MAMP (comptes séparés). Recommandation : utiliser **PHP pour tout** en local MAMP, ou Mongo pour comptes/decks hors match.

---

## Compte joueur

1. Aller sur `login.html`
2. Créer un compte (pseudo + mot de passe)
3. Composer une armée au draft → **Sauver deck**
4. Parties suivantes → **Charger deck**
