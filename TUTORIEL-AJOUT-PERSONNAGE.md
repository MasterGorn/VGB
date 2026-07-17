# 🎭 Tutoriel : Ajouter un personnage manuellement

Ce tutoriel vous guide pas à pas pour ajouter un nouveau personnage au jeu Video Games Battle en modifiant directement le code.

## 📋 Prérequis

- Un éditeur de code (VS Code, Sublime Text, etc.)
- Une image PNG du personnage (64x64 pixels minimum)
- Connaissance basique du JavaScript

## 🎯 Exemple : Ajouter Mario

Nous allons ajouter Mario comme exemple. Suivez ces étapes exactement dans l'ordre.

## Étape 1 : Préparer l'image

1. **Format** : PNG avec fond transparent
2. **Taille** : 64x64 pixels minimum
3. **Nom** : `mario.png`
4. **Emplacement** : Copiez l'image dans `public/images/nintendo/characters/mario.png`

## Étape 2 : Ajouter les données du personnage

Ouvrez le fichier `public/data/pieces.js`

### 2.1 Localiser la section Nintendo

Trouvez cette section dans le fichier :

```javascript
// Nintendo characters
{
  name: "Luigi",
  nameKey: "luigi",
  faction: "Nintendo",
  universe: "Super Mario",
  role: "knight",
  range: 2,
  moves: [[1,0], [-1,0], [0,1], [0,-1]],
  description: "Frère de Mario. Se déplace en croix sur 2 cases. Agilité et saut.",
  descriptionKey: "luigi-desc",
  image: "public/images/nintendo/characters/luigi.png",
  type: "luigi"
},
```

### 2.2 Ajouter Mario après Luigi

Ajoutez ce code juste après la définition de Luigi (avant la virgule et l'accolade fermante) :

```javascript
{
  name: "Mario",
  nameKey: "mario",
  faction: "Nintendo",
  universe: "Super Mario",
  role: "pawn",
  range: 1,
  moves: [[1,0], [-1,0], [0,1], [0,-1]],
  description: "Plombier aventurier. Skin de pion (mouvement d'échecs).",
  descriptionKey: "mario-desc",
  image: "public/images/nintendo/characters/mario.png",
  type: "mario"
},
```

### 2.3 Explication des propriétés

- **name** : Nom affiché du personnage
- **nameKey** : Clé unique pour les traductions (pas d'espaces, minuscules)
- **faction** : Nintendo, PlayStation, SEGA, ou Xbox
- **universe** : Univers du jeu
- **role** : Force / rôle d'échecs — `pawn`, `knight`, `bishop`, `rook`, `queen`, `unique` (ou `king`)
- **range** / **moves** : Surtout utiles pour le rôle `unique` ; les autres rôles suivent les règles d'échecs
- **description** : Description en français
- **descriptionKey** : Clé pour les traductions
- **image** : Chemin vers l'image
- **type** : Identifiant unique

## Étape 3 : Ajouter les traductions

Ouvrez le fichier `public/js/translations.js`

### 3.1 Localiser la section française

Trouvez cette section :

```javascript
const translations = {
  fr: {
    // Interface principale
    'game-title': 'Video Games Battle',
    // ... autres traductions
```

### 3.2 Ajouter les traductions françaises

Ajoutez ces lignes dans la section `fr:` :

```javascript
    // Personnages Nintendo
    'mario': 'Mario',
    'mario-desc': 'Plombier aventurier. Se déplace en croix et diagonales sur 2 cases.',
```

### 3.3 Ajouter les traductions anglaises

Trouvez la section `en:` et ajoutez :

```javascript
    // Nintendo characters
    'mario': 'Mario',
    'mario-desc': 'Adventurous plumber. Moves in cross and diagonal patterns for 2 squares.',
```

### 3.4 Ajouter les autres langues

Répétez pour les autres langues (es, de, it, pt) :

**Espagnol (es:)** :

```javascript
    'mario': 'Mario',
    'mario-desc': 'Fontanero aventurero. Se mueve en cruz y diagonales por 2 casillas.',
```

**Allemand (de:)** :

```javascript
    'mario': 'Mario',
    'mario-desc': 'Abenteuerlustiger Klempner. Bewegt sich kreuzförmig und diagonal über 2 Felder.',
```

**Italien (it:)** :

```javascript
    'mario': 'Mario',
    'mario-desc': 'Idraulico avventuroso. Si muove a croce e diagonalmente per 2 caselle.',
```

**Portugais (pt:)** :

```javascript
    'mario': 'Mario',
    'mario-desc': 'Encanador aventureiro. Move-se em cruz e diagonais por 2 quadrados.',
```

## Étape 4 : Charger l'image dans le jeu

Ouvrez le fichier `index.html`

### 4.1 Localiser la fonction preload

Trouvez cette section :

```javascript
function preload() {
  // Charger les images des personnages Nintendo
  this.load.setPath('public/images/nintendo/characters/');
  this.load.image('luigi', 'luigi.png');
  // ... autres personnages Nintendo
```

### 4.2 Ajouter le chargement de Mario

Ajoutez cette ligne dans la section Nintendo :

```javascript
this.load.image("mario", "mario.png");
```

La section devrait ressembler à :

```javascript
// Charger les images des personnages Nintendo
this.load.setPath("public/images/nintendo/characters/");
this.load.image("luigi", "luigi.png");
this.load.image("mario", "mario.png");
// ... autres personnages
```

## Étape 5 : Tester le personnage

### 5.1 Ouvrir le jeu

1. Ouvrez `index.html` dans votre navigateur
2. Ou lancez un serveur local : `python -m http.server 8000`

### 5.2 Vérifier l'ajout

1. **Sélecteur de personnages** : Mario devrait apparaître dans la liste Nintendo
2. **Image** : L'image devrait s'afficher correctement
3. **Traductions** : Changez la langue pour vérifier les traductions
4. **Mouvements** : Sélectionnez Mario et vérifiez ses mouvements

## 🎨 Personnaliser le personnage

### Modifier les mouvements

Les mouvements sont définis par des vecteurs `[x, y]` :

```javascript
moves: [
  [1, 0], // Droite
  [-1, 0], // Gauche
  [0, 1], // Bas
  [0, -1], // Haut
  [1, 1], // Diagonale bas-droite
  [-1, 1], // Diagonale bas-gauche
  [1, -1], // Diagonale haut-droite
  [-1, -1], // Diagonale haut-gauche
];
```

### Exemples de mouvements

**Croix simple** (4 directions) :

```javascript
moves: [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
```

**Mouvement de roi** (8 directions) :

```javascript
moves: [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];
```

**Mouvement de cavalier** (L) :

```javascript
moves: [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];
```

### Modifier les statistiques

- **role** : `pawn` / `knight` / `bishop` / `rook` / `queen` / `unique` (définit la force et le mouvement d'échecs)
- **range** / **moves** : surtout pour les pièces `unique`

## 🎁 Ajouter un objet (bonus)

Pour ajouter un objet, suivez le même processus :

### 1. Données dans `public/data/items.js`

```javascript
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

### 2. Traductions dans `public/js/translations.js`

Ajoutez dans chaque langue :

```javascript
'power-star': 'Étoile de Puissance',
'power-star-desc': 'Rend invincible pendant 3 tours',
```

### 3. Poids dans `index.html`

Trouvez la section `ITEM_WEIGHTS` et ajoutez :

```javascript
const ITEM_WEIGHTS = {
  // ... autres objets
  "power-star": 5,
};
```

### 4. Chargement d'image dans `index.html`

Dans la fonction `preload()`, section items :

```javascript
this.load.image("power-star", "power-star.png");
```

## 🐛 Problèmes courants

### L'image ne s'affiche pas

- Vérifiez le chemin de l'image
- Assurez-vous que l'image est dans le bon dossier
- Vérifiez que le chargement est ajouté dans `preload()`

### Les traductions ne marchent pas

- Vérifiez les clés dans `translations.js`
- Assurez-vous que les clés correspondent exactement
- Vérifiez la syntaxe JavaScript (virgules, guillemets)

### Le personnage n'apparaît pas dans le sélecteur

- Vérifiez la syntaxe dans `pieces.js`
- Assurez-vous que toutes les propriétés sont définies
- Vérifiez les accolades et virgules

### Erreurs JavaScript

- Ouvrez la console du navigateur (F12)
- Vérifiez les erreurs de syntaxe
- Assurez-vous que tous les fichiers sont bien sauvegardés

## ✅ Checklist finale

- [ ] Image ajoutée dans le bon dossier
- [ ] Données ajoutées dans `pieces.js`
- [ ] Traductions ajoutées dans `translations.js`
- [ ] Chargement d'image ajouté dans `index.html`
- [ ] Personnage visible dans le sélecteur
- [ ] Image s'affiche correctement
- [ ] Mouvements fonctionnent
- [ ] Traductions dans toutes les langues
- [ ] Pas d'erreurs dans la console

## 🎉 Félicitations !

Vous avez ajouté votre premier personnage ! Vous pouvez maintenant :

1. **Créer une Pull Request** sur GitHub
2. **Ajouter d'autres personnages** avec le même processus
3. **Personnaliser** les mouvements et statistiques
4. **Aider d'autres contributeurs** avec vos connaissances

---

**🎮 Bon développement et merci de contribuer à Video Games Battle !**




