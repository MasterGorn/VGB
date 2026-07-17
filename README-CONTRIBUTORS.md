# 🎮 Guide Rapide pour les Contributeurs

## 🚀 Démarrage rapide

### 1. Fork et Clone

```bash
git clone https://github.com/VOTRE-USERNAME/VGB.git
cd VGB
```

### 2. Installer les dépendances

```bash
# Aucune dépendance Node.js requise pour le développement
# Le jeu fonctionne directement dans le navigateur
```

### 3. Lancer le jeu

```bash
# Ouvrir index.html dans un navigateur
# Ou utiliser un serveur local :
python -m http.server 8000
# Puis aller sur http://localhost:8000
```

## 🎭 Ajouter un personnage rapidement

### Méthode 1 : Script automatique

```bash
node scripts/add-character.js
```

### Méthode 2 : Manuel

1. **Image** : Ajoutez dans `public/images/[faction]/characters/`
2. **Données** : Modifiez `public/data/pieces.js`
3. **Traductions** : Modifiez `public/data/translations.js`
4. **Chargement** : Ajoutez dans `index.html` (section preload)

## 🎁 Ajouter un objet rapidement

### Méthode 1 : Script automatique

```bash
node scripts/add-item.js
```

### Méthode 2 : Manuel

1. **Image** : Ajoutez dans `public/images/items/`
2. **Données** : Modifiez `public/data/items.js`
3. **Traductions** : Modifiez `public/data/translations.js`
4. **Poids** : Ajoutez dans `index.html` (ITEM_WEIGHTS)
5. **Chargement** : Ajoutez dans `index.html` (section preload)

## 📝 Structure des données

### Personnage (pieces.js)

```javascript
{
  name: "Nom du Personnage",
  nameKey: "nom-personnage", // Clé unique
  faction: "Nintendo", // Nintendo, PlayStation, SEGA, Xbox
  universe: "Univers du jeu",
  cost: 5, // Coût en points (1-10)
  tier: 2, // Niveau de puissance (1-4)
  range: 2, // Portée de mouvement (1-5)
  moves: [[1,0], [-1,0], [0,1], [0,-1]], // Mouvements
  description: "Description en français",
  descriptionKey: "nom-personnage-desc",
  image: "public/images/nintendo/characters/nom-personnage.png",
  type: "nom-personnage"
}
```

### Objet (items.js)

```javascript
{
  name: "Nom de l'Objet",
  nameKey: "nom-objet",
  description: "Description en français",
  descriptionKey: "nom-objet-desc",
  image: "public/images/items/nom-objet.png",
  weight: 10, // Poids pour génération (1-100)
  type: "nom-objet"
}
```

## 🌍 Traductions

### Format dans translations.js

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

### Langues supportées

- `fr` : Français (par défaut)
- `en` : Anglais
- `es` : Espagnol
- `de` : Allemand
- `it` : Italien
- `pt` : Portugais

## 🎨 Images

### Personnages

- **Format** : PNG avec transparence
- **Taille** : 64x64 pixels minimum
- **Nom** : En minuscules avec tirets (ex: `mario-bros.png`)
- **Dossier** : `public/images/[faction]/characters/`

### Objets

- **Format** : PNG avec transparence
- **Taille** : 32x32 pixels minimum
- **Nom** : En minuscules avec tirets (ex: `power-star.png`)
- **Dossier** : `public/images/items/`

## ⚖️ Équilibrage

### Coûts recommandés par tier

- **Tier 1** (Faible) : 1-3 points
- **Tier 2** (Moyen) : 4-6 points
- **Tier 3** (Fort) : 7-8 points
- **Tier 4** (Unique) : 9-10 points

### Poids d'objets recommandés

- **Commun** : 20-40
- **Rare** : 10-19
- **Épique** : 5-9
- **Légendaire** : 1-4

## 🧪 Tests

### Vérifications obligatoires

- [ ] Image affichée correctement
- [ ] Personnage/objet fonctionne en jeu
- [ ] Traductions dans toutes les langues
- [ ] Pas d'erreurs console
- [ ] Équilibrage testé

### Comment tester

1. Ouvrez `index.html`
2. Lancez une partie
3. Sélectionnez votre contenu
4. Vérifiez le fonctionnement
5. Testez en différentes langues

## 📋 Checklist Pull Request

- [ ] Personnage/objet ajouté
- [ ] Images ajoutées
- [ ] Traductions complètes
- [ ] Tests effectués
- [ ] Pas d'erreurs
- [ ] Description claire
- [ ] Captures d'écran

## 🆘 Aide

### Problèmes courants

1. **Image ne s'affiche pas** : Vérifiez le chemin et le chargement
2. **Traductions manquantes** : Vérifiez les clés dans translations.js
3. **Erreurs console** : Vérifiez la syntaxe JavaScript
4. **Personnage ne se déplace pas** : Vérifiez les mouvements dans moves

### Ressources

- **Issues GitHub** : Pour signaler des bugs
- **Discussions** : Pour poser des questions
- **CONTRIBUTING.md** : Guide détaillé

## 🎯 Exemples

### Personnage Nintendo

```javascript
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

### Objet

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

---

**🎮 Bon développement et merci de contribuer à Video Games Battle !**




