# 🎁 Tutoriel : Ajouter un objet manuellement

Ce tutoriel vous guide pas à pas pour ajouter un nouvel objet au jeu Video Games Battle en modifiant directement le code.

## 📋 Prérequis

- Un éditeur de code (VS Code, Sublime Text, etc.)
- Une image PNG de l'objet (32x32 pixels minimum)
- Connaissance basique du JavaScript

## 🎯 Exemple : Ajouter l'Étoile de Puissance

Nous allons ajouter l'Étoile de Puissance comme exemple. Suivez ces étapes exactement dans l'ordre.

## Étape 1 : Préparer l'image

1. **Format** : PNG avec fond transparent
2. **Taille** : 32x32 pixels minimum
3. **Nom** : `power-star.png`
4. **Emplacement** : Copiez l'image dans `public/images/items/power-star.png`

## Étape 2 : Ajouter les données de l'objet

Ouvrez le fichier `public/data/items.js`

### 2.1 Localiser la fin du tableau

Trouvez la fin du tableau des objets :

```javascript
{
  name: "Tetrimino",
  nameKey: "tetrimino",
  description: "Bloc qui bloque les mouvements",
  descriptionKey: "tetrimino-desc",
  image: "public/images/items/tetrimino.png",
  weight: 15,
  type: "tetrimino"
}
];
```

### 2.2 Ajouter l'Étoile de Puissance

Ajoutez ce code juste avant la fermeture du tableau `];` :

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

### 2.3 Explication des propriétés

- **name** : Nom affiché de l'objet
- **nameKey** : Clé unique pour les traductions (pas d'espaces, minuscules)
- **description** : Description en français
- **descriptionKey** : Clé pour les traductions
- **image** : Chemin vers l'image
- **weight** : Poids pour la génération (1-100, plus bas = plus rare)
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
    // Objets
    'power-star': 'Étoile de Puissance',
    'power-star-desc': 'Rend invincible pendant 3 tours',
```

### 3.3 Ajouter les traductions anglaises

Trouvez la section `en:` et ajoutez :

```javascript
    // Items
    'power-star': 'Power Star',
    'power-star-desc': 'Makes invincible for 3 turns',
```

### 3.4 Ajouter les autres langues

Répétez pour les autres langues (es, de, it, pt) :

**Espagnol (es:)** :

```javascript
    'power-star': 'Estrella de Poder',
    'power-star-desc': 'Hace invencible por 3 turnos',
```

**Allemand (de:)** :

```javascript
    'power-star': 'Machtstern',
    'power-star-desc': 'Macht für 3 Züge unverwundbar',
```

**Italien (it:)** :

```javascript
    'power-star': 'Stella del Potere',
    'power-star-desc': 'Rende invincibile per 3 turni',
```

**Portugais (pt:)** :

```javascript
    'power-star': 'Estrela do Poder',
    'power-star-desc': 'Torna invencível por 3 turnos',
```

## Étape 4 : Ajouter le poids de l'objet

Ouvrez le fichier `index.html`

### 4.1 Localiser ITEM_WEIGHTS

Trouvez cette section :

```javascript
const ITEM_WEIGHTS = {
  heart: 20,
  ocarina: 15,
  tetrimino: 15,
};
```

### 4.2 Ajouter le poids de l'Étoile

Ajoutez cette ligne dans l'objet :

```javascript
const ITEM_WEIGHTS = {
  heart: 20,
  ocarina: 15,
  tetrimino: 15,
  "power-star": 5,
};
```

### 4.3 Explication des poids

- **1-10** : Très rare (légendaire)
- **11-20** : Rare (épique)
- **21-40** : Moyennement rare
- **41-100** : Commun

## Étape 5 : Charger l'image dans le jeu

### 5.1 Localiser la fonction preload

Trouvez cette section dans `index.html` :

```javascript
function preload() {
  // ... autres chargements

  // Charger les images des objets
  this.load.setPath('public/images/items/');
  this.load.image('heart', 'heart.png');
  this.load.image('ocarina', 'ocarina.png');
  this.load.image('tetrimino', 'tetrimino.png');
```

### 5.2 Ajouter le chargement de l'Étoile

Ajoutez cette ligne dans la section des objets :

```javascript
// Charger les images des objets
this.load.setPath("public/images/items/");
this.load.image("heart", "heart.png");
this.load.image("ocarina", "ocarina.png");
this.load.image("tetrimino", "tetrimino.png");
this.load.image("power-star", "power-star.png");
```

## Étape 6 : Implémenter l'effet de l'objet

### 6.1 Localiser la fonction useItem

Trouvez cette fonction dans `index.html` :

```javascript
function useItem(item, targetPiece) {
  const itemType = item.data.type;

  switch (itemType) {
    case "heart":
      addHeartToPiece(targetPiece);
      break;
    case "ocarina":
      addKnightMovement(targetPiece);
      break;
    case "tetrimino":
      // Effet déjà géré dans la génération
      break;
    default:
      console.log("Objet non reconnu:", itemType);
  }
}
```

### 6.2 Ajouter l'effet de l'Étoile

Ajoutez ce case dans le switch :

```javascript
function useItem(item, targetPiece) {
  const itemType = item.data.type;

  switch (itemType) {
    case "heart":
      addHeartToPiece(targetPiece);
      break;
    case "ocarina":
      addKnightMovement(targetPiece);
      break;
    case "power-star":
      addInvincibilityToPiece(targetPiece);
      break;
    case "tetrimino":
      // Effet déjà géré dans la génération
      break;
    default:
      console.log("Objet non reconnu:", itemType);
  }
}
```

### 6.3 Créer la fonction d'invincibilité

Ajoutez cette fonction quelque part dans le code :

```javascript
function addInvincibilityToPiece(piece) {
  // Marquer la pièce comme invincible
  piece.invincible = true;
  piece.invincibilityTurns = 3;

  // Changer visuellement la pièce (optionnel)
  if (piece.sprite) {
    piece.sprite.setTint(0xffff00); // Jaune pour l'invincibilité
  }

  showInfoMessage(`${piece.name} est maintenant invincible !`, 3000);
}

// Fonction pour décrémenter l'invincibilité
function decrementInvincibility() {
  pieces.forEach((piece) => {
    if (piece.invincible && piece.invincibilityTurns > 0) {
      piece.invincibilityTurns--;

      if (piece.invincibilityTurns === 0) {
        piece.invincible = false;
        if (piece.sprite) {
          piece.sprite.clearTint(); // Retirer la teinte
        }
        showInfoMessage(`${piece.name} n'est plus invincible !`, 2000);
      }
    }
  });
}
```

### 6.4 Intégrer dans la logique de jeu

Trouvez la fonction qui gère la fin de tour et ajoutez l'appel :

```javascript
function nextPlayer() {
  // ... code existant ...

  // Décrémenter l'invincibilité
  decrementInvincibility();

  // ... reste du code ...
}
```

## Étape 7 : Tester l'objet

### 7.1 Ouvrir le jeu

1. Ouvrez `index.html` dans votre navigateur
2. Ou lancez un serveur local : `python -m http.server 8000`

### 7.2 Vérifier l'ajout

1. **Page des objets** : L'Étoile devrait apparaître dans la liste
2. **Image** : L'image devrait s'afficher correctement
3. **Traductions** : Changez la langue pour vérifier les traductions
4. **Génération** : L'objet devrait apparaître dans les caisses
5. **Effet** : Utilisez l'objet sur une pièce pour tester l'effet

## 🎨 Personnaliser l'objet

### Modifier la rareté

Changez la valeur `weight` dans `ITEM_WEIGHTS` :

```javascript
'power-star': 1   // Très rare (légendaire)
'power-star': 10  // Rare (épique)
'power-star': 30  // Moyennement rare
'power-star': 50  // Commun
```

### Modifier l'effet

Vous pouvez créer différents effets :

```javascript
// Objet de soin
case 'potion':
  piece.health = Math.min(piece.health + 2, piece.maxHealth);
  break;

// Objet de vitesse
case 'boots':
  piece.speedBoost = 3;
  piece.speedTurns = 2;
  break;

// Objet de téléportation
case 'teleport':
  // Permettre de se téléporter
  piece.canTeleport = true;
  break;
```

## 🎁 Exemples d'objets

### Objet de soin

```javascript
{
  name: "Potion de Vie",
  nameKey: "health-potion",
  description: "Restaure 2 points de vie",
  descriptionKey: "health-potion-desc",
  image: "public/images/items/health-potion.png",
  weight: 25,
  type: "health-potion"
}
```

### Objet de vitesse

```javascript
{
  name: "Bottes de Course",
  nameKey: "speed-boots",
  description: "Augmente la portée de 1 case",
  descriptionKey: "speed-boots-desc",
  image: "public/images/items/speed-boots.png",
  weight: 20,
  type: "speed-boots"
}
```

### Objet de téléportation

```javascript
{
  name: "Cristal de Téléportation",
  nameKey: "teleport-crystal",
  description: "Permet de se téléporter",
  descriptionKey: "teleport-crystal-desc",
  image: "public/images/items/teleport-crystal.png",
  weight: 8,
  type: "teleport-crystal"
}
```

## 🐛 Problèmes courants

### L'objet n'apparaît pas dans les caisses

- Vérifiez que le poids est ajouté dans `ITEM_WEIGHTS`
- Assurez-vous que le type correspond exactement
- Vérifiez la syntaxe JavaScript

### L'effet ne fonctionne pas

- Vérifiez que le case est ajouté dans `useItem()`
- Assurez-vous que la fonction d'effet est définie
- Vérifiez l'intégration dans la logique de jeu

### Les traductions ne marchent pas

- Vérifiez les clés dans `translations.js`
- Assurez-vous que les clés correspondent exactement
- Vérifiez la syntaxe JavaScript

## ✅ Checklist finale

- [ ] Image ajoutée dans `public/images/items/`
- [ ] Données ajoutées dans `items.js`
- [ ] Traductions ajoutées dans `translations.js`
- [ ] Poids ajouté dans `ITEM_WEIGHTS`
- [ ] Chargement d'image ajouté dans `index.html`
- [ ] Effet implémenté dans `useItem()`
- [ ] Fonction d'effet créée
- [ ] Intégration dans la logique de jeu
- [ ] Objet visible dans la page des objets
- [ ] Objet apparaît dans les caisses
- [ ] Effet fonctionne correctement
- [ ] Traductions dans toutes les langues
- [ ] Pas d'erreurs dans la console

## 🎉 Félicitations !

Vous avez ajouté votre premier objet ! Vous pouvez maintenant :

1. **Créer une Pull Request** sur GitHub
2. **Ajouter d'autres objets** avec le même processus
3. **Personnaliser** les effets et la rareté
4. **Aider d'autres contributeurs** avec vos connaissances

---

**🎮 Bon développement et merci de contribuer à Video Games Battle !**




