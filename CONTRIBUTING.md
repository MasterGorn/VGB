# 🎮 Guide de Contribution - Video Games Battle

Bienvenue dans le projet **Video Games Battle** ! Ce guide vous explique comment contribuer en ajoutant de nouveaux personnages et objets au jeu.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Structure du projet](#structure-du-projet)
3. [Ajouter un nouveau personnage](#ajouter-un-nouveau-personnage)
4. [Ajouter un nouvel objet](#ajouter-un-nouvel-objet)
5. [Traductions](#traductions)
6. [Tests](#tests)
7. [Pull Request](#pull-request)
8. [Exemples](#exemples)

## 🛠️ Prérequis

- Connaissance de base en JavaScript
- Compréhension des fichiers JSON
- Un éditeur de code (VS Code recommandé)
- Git installé sur votre machine
- Un compte GitHub

## 📁 Structure du projet

```
VGB/
├── public/
│   ├── data/
│   │   ├── pieces.js          # Données des personnages
│   │   ├── items.js           # Données des objets
│   │   └── translations.js    # Traductions multilingues
│   ├── images/
│   │   ├── nintendo/characters/
│   │   ├── playstation/characters/
│   │   ├── sega/characters/
│   │   ├── xbox/characters/
│   │   └── items/
│   └── sounds/
│       ├── characters/
│       └── items/
├── index.html                 # Jeu principal
└── pieces.html               # Page des personnages
```

## 🎭 Ajouter un nouveau personnage

### Étape 1 : Préparer l'image

1. **Format requis** : PNG avec fond transparent
2. **Taille recommandée** : 64x64 pixels minimum
3. **Nom du fichier** : En minuscules, avec des tirets (ex: `mario-bros.png`)

### Étape 2 : Ajouter l'image

Placez votre image dans le dossier approprié :

- `public/images/nintendo/characters/` pour Nintendo
- `public/images/playstation/characters/` pour PlayStation
- `public/images/sega/characters/` pour SEGA
- `public/images/xbox/characters/` pour Xbox

### Étape 3 : Ajouter les données dans `pieces.js`

Ouvrez `public/data/pieces.js` et ajoutez votre personnage :

```javascript
{
  name: "Nom du Personnage",
  nameKey: "nom-personnage", // Clé unique pour les traductions
  faction: "Nintendo", // Nintendo, PlayStation, SEGA, ou Xbox
  universe: "Univers du jeu",
  cost: 5, // Coût en points (1-10)
  tier: 2, // Niveau de puissance (1-4)
  range: 2, // Portée de mouvement (1-5)
  moves: [[1,0], [-1,0], [0,1], [0,-1]], // Mouvements possibles
  description: "Description en français",
  descriptionKey: "nom-personnage-desc", // Clé pour les traductions
  image: "public/images/nintendo/characters/nom-personnage.png",
  type: "nom-personnage" // Identifiant unique
}
```

### Étape 4 : Ajouter les traductions

Dans `public/data/translations.js`, ajoutez les traductions :

```javascript
// Dans chaque langue
"nom-personnage": "Character Name",
"nom-personnage-desc": "Character description in this language"
```

### Étape 5 : Charger l'image dans le jeu

Dans `index.html`, ajoutez le chargement d'image dans la section appropriée :

```javascript
// Dans la fonction preload(), section Nintendo par exemple
this.load.image("nom-personnage", "nom-personnage.png");
```

## 🎁 Ajouter un nouvel objet

### Étape 1 : Préparer l'image

1. **Format requis** : PNG avec fond transparent
2. **Taille recommandée** : 32x32 pixels
3. **Nom du fichier** : En minuscules, avec des tirets (ex: `power-star.png`)

### Étape 2 : Ajouter l'image

Placez votre image dans `public/images/items/`

### Étape 3 : Ajouter les données dans `items.js`

Ouvrez `public/data/items.js` et ajoutez votre objet :

```javascript
{
  name: "Nom de l'Objet",
  nameKey: "nom-objet", // Clé unique pour les traductions
  description: "Description en français",
  descriptionKey: "nom-objet-desc", // Clé pour les traductions
  image: "public/images/items/nom-objet.png",
  weight: 10, // Poids pour la génération (1-100)
  type: "nom-objet" // Identifiant unique
}
```

### Étape 4 : Ajouter les traductions

Dans `public/data/translations.js`, ajoutez les traductions pour l'objet.

### Étape 5 : Charger l'image dans le jeu

Dans `index.html`, ajoutez le chargement d'image :

```javascript
// Dans la fonction preload()
this.load.image("nom-objet", "nom-objet.png");
```

### Étape 6 : Ajouter le poids dans `ITEM_WEIGHTS`

Dans `index.html`, ajoutez le poids de votre objet :

```javascript
const ITEM_WEIGHTS = {
  // ... autres objets
  "nom-objet": 10,
};
```

## 🌍 Traductions

### Langues supportées

- 🇫🇷 Français (langue par défaut)
- 🇬🇧 Anglais
- 🇪🇸 Espagnol
- 🇩🇪 Allemand
- 🇮🇹 Italien
- 🇵🇹 Portugais

### Structure des traductions

```javascript
const translations = {
  fr: {
    "nom-personnage": "Nom en français",
    "nom-personnage-desc": "Description en français",
  },
  en: {
    "nom-personnage": "Name in English",
    "nom-personnage-desc": "Description in English",
  },
  // ... autres langues
};
```

### Bonnes pratiques

- ✅ Utilisez des clés descriptives et uniques
- ✅ Gardez les descriptions courtes (max 100 caractères)
- ✅ Vérifiez que toutes les langues sont traduites
- ❌ N'utilisez pas de caractères spéciaux dans les clés

## 🧪 Tests

### Vérifications obligatoires

1. **Image affichée correctement**

   - L'image apparaît dans le sélecteur de personnages
   - L'image s'affiche correctement sur le plateau de jeu

2. **Mouvements fonctionnels**

   - Le personnage se déplace selon les règles définies
   - Les mouvements sont visibles en surbrillance

3. **Traductions complètes**

   - Toutes les langues affichent le texte correctement
   - Pas de clés de traduction manquantes

4. **Équilibrage**
   - Le coût correspond à la puissance du personnage
   - Les mouvements sont logiques pour le personnage

### Comment tester

1. Ouvrez `index.html` dans un navigateur
2. Lancez une partie de test
3. Sélectionnez votre nouveau personnage
4. Vérifiez les mouvements et l'affichage
5. Testez dans différentes langues

## 📝 Pull Request

### Avant de soumettre

1. **Fork** le repository
2. **Clone** votre fork localement
3. **Créez** une branche pour votre contribution
4. **Testez** vos modifications
5. **Commitez** avec un message descriptif

### Message de commit

```
feat: Add Mario character with basic movement

- Add Mario sprite (64x64 PNG)
- Add movement patterns (cross + knight moves)
- Add translations in all 6 languages
- Cost: 6 points, Tier: 3, Range: 3
```

### Contenu de la Pull Request

- **Description claire** de ce qui a été ajouté
- **Images** du personnage/objet
- **Justification** des stats (coût, tier, range)
- **Liste** des langues traduites

## 📚 Exemples

### Exemple 1 : Personnage Nintendo (Mario)

```javascript
// Dans pieces.js
{
  name: "Mario",
  nameKey: "mario",
  faction: "Nintendo",
  universe: "Super Mario",
  cost: 6,
  tier: 3,
  range: 3,
  moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,1], [1,-1], [-1,-1]],
  description: "Plombier aventurier. Se déplace en croix et en diagonale.",
  descriptionKey: "mario-desc",
  image: "public/images/nintendo/characters/mario.png",
  type: "mario"
}
```

### Exemple 2 : Objet (Étoile de puissance)

```javascript
// Dans items.js
{
  name: "Étoile de Puissance",
  nameKey: "power-star",
  description: "Rend invincible pendant 3 tours",
  descriptionKey: "power-star-desc",
  image: "public/images/items/power-star.png",
  weight: 5,
  type: "power-star"
}
```

## 🤝 Aide et Support

### Ressources utiles

- **Issues GitHub** : Pour signaler des bugs ou demander de l'aide
- **Discussions** : Pour poser des questions sur le développement
- **Wiki** : Documentation détaillée du projet

### Contact

- Créez une **issue** sur GitHub pour toute question
- Utilisez les **discussions** pour les idées de personnages/objets
- Rejoignez notre communauté Discord (lien dans le README)

## 📜 Licence

En contribuant à ce projet, vous acceptez que votre contribution soit sous la même licence que le projet.

---

**Merci de contribuer à Video Games Battle ! 🎮✨**

_Ce guide sera mis à jour régulièrement. N'hésitez pas à proposer des améliorations._




