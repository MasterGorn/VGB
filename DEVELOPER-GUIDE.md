# 🛠️ Guide Développeur - Video Games Battle

## 🎯 Vue d'ensemble

Ce guide est destiné aux développeurs qui souhaitent contribuer au code du jeu Video Games Battle. Il couvre l'architecture, les conventions de code, et les bonnes pratiques.

## 📁 Architecture du projet

```
VGB/
├── index.html                 # Jeu principal (Phaser 3)
├── pieces.html               # Page des personnages
├── objets.html               # Page des objets
├── regles.html               # Page des règles
├── pieces.html               # Page des pièces
├── credits.html              # Page des crédits
├── public/
│   ├── data/
│   │   ├── pieces.js         # Données des personnages
│   │   ├── items.js          # Données des objets
│   │   └── translations.js   # Système de traductions
│   ├── images/               # Assets graphiques
│   ├── sounds/               # Assets audio
│   └── styles/               # CSS global
├── scripts/                  # Scripts de développement
└── .github/                  # Templates GitHub
```

## 🎮 Technologies utilisées

- **Phaser 3** : Moteur de jeu 2D
- **Vanilla JavaScript** : Pas de framework
- **HTML5 Canvas** : Rendu graphique
- **CSS3** : Styles et animations
- **Node.js** : Scripts de développement (optionnel)

## 🏗️ Architecture du code

### Structure principale (index.html)

```javascript
// Variables globales
let game, scene;
let players = [];
let pieces = [];
let currentPlayer = 0;

// Initialisation Phaser
const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// Fonctions principales
function preload() {
  /* Chargement des assets */
}
function create() {
  /* Création des objets de jeu */
}
function update() {
  /* Boucle de jeu */
}
```

### Système de personnages

```javascript
// Structure d'un personnage
{
  name: "Nom du Personnage",
  nameKey: "clé-traduction",
  faction: "Nintendo|PlayStation|SEGA|Xbox",
  universe: "Univers du jeu",
  cost: 1-10,           // Coût en points
  tier: 1-4,            // Niveau de puissance
  range: 1-5,           // Portée de mouvement
  moves: [[x,y], ...],  // Vecteurs de mouvement
  description: "Description",
  descriptionKey: "clé-traduction-desc",
  image: "chemin/vers/image.png",
  type: "identifiant-unique"
}
```

### Système d'objets

```javascript
// Structure d'un objet
{
  name: "Nom de l'Objet",
  nameKey: "clé-traduction",
  description: "Description",
  descriptionKey: "clé-traduction-desc",
  image: "chemin/vers/image.png",
  weight: 1-100,        // Poids pour génération
  type: "identifiant-unique"
}
```

### Système de traductions

```javascript
// Structure des traductions
const translations = {
  fr: { clé: "Valeur française" },
  en: { clé: "English value" },
  es: { clé: "Valor español" },
  // ... autres langues
};

// Fonction de traduction
function t(key) {
  const lang = currentLanguage || "fr";
  return translations[lang]?.[key] || key;
}
```

## 🎨 Conventions de code

### JavaScript

```javascript
// ✅ Bon
const playerName = "Mario";
const isGameStarted = true;
const playerPieces = [];

// ❌ Mauvais
const playername = "Mario";
const isgamestarted = true;
const playerpieces = [];

// Fonctions
function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Variables globales (éviter si possible)
let globalGameState = {};
```

### CSS

```css
/* ✅ Bon */
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* ❌ Mauvais */
.gamecontainer {
  display: flex;
}

.playername {
  font-size: 16px;
}
```

### HTML

```html
<!-- ✅ Bon -->
<div class="character-card" data-character="mario">
  <img src="mario.png" alt="Mario" class="character-image" />
  <h3 class="character-name">Mario</h3>
  <p class="character-description">Plombier aventurier</p>
</div>

<!-- ❌ Mauvais -->
<div>
  <img src="mario.png" />
  <h3>Mario</h3>
  <p>Plombier aventurier</p>
</div>
```

## 🔧 Fonctions principales

### Gestion des pièces

```javascript
// Créer une pièce
function createPiece(x, y, pieceData, player) {
  const piece = {
    x,
    y,
    player,
    data: pieceData,
    sprite: null,
    backgroundSprite: null,
  };

  pieces.push(piece);
  return piece;
}

// Déplacer une pièce
function movePiece(piece, newX, newY) {
  if (isValidMove(piece, newX, newY)) {
    piece.x = newX;
    piece.y = newY;
    updatePiecePosition(piece);
    return true;
  }
  return false;
}

// Vérifier les mouvements valides
function getReachablePositions(piece) {
  const positions = [];
  const rule = getRuleForPiece(piece);

  rule.moves.forEach((move) => {
    for (let i = 1; i <= rule.range; i++) {
      const newX = piece.x + move[0] * i;
      const newY = piece.y + move[1] * i;

      if (isValidPosition(newX, newY)) {
        positions.push({ x: newX, y: newY });
      }
    }
  });

  return positions;
}
```

### Gestion des objets

```javascript
// Créer un objet
function createItem(x, y, itemData) {
  const item = {
    x,
    y,
    data: itemData,
    sprite: null,
  };

  items.push(item);
  return item;
}

// Utiliser un objet
function useItem(item, targetPiece) {
  const effect = item.data.type;

  switch (effect) {
    case "heart":
      addHeartToPiece(targetPiece);
      break;
    case "ocarina":
      addKnightMovement(targetPiece);
      break;
    // ... autres effets
  }

  removeItem(item);
}
```

### Interface utilisateur

```javascript
// Afficher un message
function showInfoMessage(message, duration = 3000) {
  if (infoText && infoBackground) {
    infoText.setText(message);
    infoBackground.setVisible(true);
    infoText.setVisible(true);

    scene.time.delayedCall(duration, () => {
      infoBackground.setVisible(false);
      infoText.setVisible(false);
    });
  }
}

// Mettre à jour l'interface
function updateTurnUI() {
  // Mettre à jour le nom du joueur actif
  if (playerNameTexts && playerNameTexts[currentPlayer]) {
    playerNameTexts[currentPlayer].setStyle({
      color: "#00ff00",
      fontWeight: "bold",
    });
  }

  // Réinitialiser les autres joueurs
  playerNameTexts.forEach((text, index) => {
    if (index !== currentPlayer && text) {
      text.setStyle({
        color: "#333333",
        fontWeight: "normal",
      });
    }
  });
}
```

## 🎯 Bonnes pratiques

### Performance

```javascript
// ✅ Bon - Utiliser des pools d'objets
const spritePool = [];
function getSprite() {
  return spritePool.pop() || createNewSprite();
}

// ✅ Bon - Éviter les boucles inutiles
function updatePieces() {
  pieces.forEach((piece) => {
    if (piece.sprite) {
      piece.sprite.setPosition(piece.x * TILE_SIZE, piece.y * TILE_SIZE);
    }
  });
}

// ❌ Mauvais - Créer des objets à chaque frame
function updatePieces() {
  pieces.forEach((piece) => {
    piece.sprite = scene.add.sprite(piece.x, piece.y, piece.data.image);
  });
}
```

### Gestion des erreurs

```javascript
// ✅ Bon
function loadImage(key, path) {
  try {
    this.load.image(key, path);
  } catch (error) {
    console.error(`Erreur lors du chargement de ${key}:`, error);
    // Image de fallback
    this.load.image(key, "public/images/default.png");
  }
}

// ✅ Bon - Validation des entrées
function validatePieceData(data) {
  const required = ["name", "faction", "cost", "tier", "range"];
  return required.every((field) => data.hasOwnProperty(field));
}
```

### Code modulaire

```javascript
// ✅ Bon - Séparer les responsabilités
const GameLogic = {
  movePiece: (piece, x, y) => {
    /* logique de mouvement */
  },
  capturePiece: (attacker, target) => {
    /* logique de capture */
  },
  checkWinCondition: () => {
    /* vérification de victoire */
  },
};

const UIManager = {
  updatePlayerInfo: (player) => {
    /* mise à jour UI */
  },
  showMessage: (message) => {
    /* affichage message */
  },
  highlightPositions: (positions) => {
    /* surbrillance */
  },
};
```

## 🧪 Tests et débogage

### Console de débogage

```javascript
// Variables de débogage
const DEBUG = true;

function debugLog(message, data = null) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
}

// Utilisation
debugLog("Pièce déplacée", {
  piece: piece.name,
  from: [oldX, oldY],
  to: [newX, newY],
});
```

### Validation des données

```javascript
// Fonction de validation
function validateGameState() {
  const errors = [];

  // Vérifier les pièces
  pieces.forEach((piece, index) => {
    if (!piece.data || !piece.sprite) {
      errors.push(`Pièce ${index} invalide`);
    }
  });

  // Vérifier les joueurs
  players.forEach((player, index) => {
    if (!player.name || !Array.isArray(player.army)) {
      errors.push(`Joueur ${index} invalide`);
    }
  });

  if (errors.length > 0) {
    console.error("Erreurs de validation:", errors);
    return false;
  }

  return true;
}
```

## 📦 Scripts de développement

### Ajouter un personnage

```bash
# Script interactif
npm run add-character

# Ou directement
node scripts/add-character.js
```

### Ajouter un objet

```bash
# Script interactif
npm run add-item

# Ou directement
node scripts/add-item.js
```

### Valider les contributions

```bash
# Validation complète
npm run validate

# Ou directement
node scripts/validate-contribution.js
```

## 🚀 Déploiement

### Préparation

```bash
# Valider le code
npm run validate

# Tester localement
npm run dev
```

### Optimisations

- **Images** : Optimiser les PNG avec des outils comme TinyPNG
- **Code** : Minifier le JavaScript pour la production
- **Cache** : Configurer les en-têtes de cache appropriés

## 🤝 Contribution

### Workflow

1. **Fork** le repository
2. **Clone** votre fork
3. **Créer** une branche feature
4. **Développer** avec les bonnes pratiques
5. **Tester** vos modifications
6. **Valider** avec les scripts
7. **Créer** une Pull Request

### Code Review

- **Lisibilité** : Code clair et bien commenté
- **Performance** : Pas de fuites mémoire ou de boucles infinies
- **Compatibilité** : Fonctionne sur différents navigateurs
- **Sécurité** : Validation des entrées utilisateur

---

**🎮 Bon développement et merci de contribuer à Video Games Battle !**




