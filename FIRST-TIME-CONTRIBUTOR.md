# 🌟 Premier contributeur - Video Games Battle

Bienvenue ! Ce guide est spécialement conçu pour les développeurs qui contribuent pour la première fois au projet Video Games Battle.

## 🎯 Par où commencer ?

### 1. Fork et Clone

```bash
# 1. Fork le repository sur GitHub
# 2. Clone votre fork localement
git clone https://github.com/VOTRE-USERNAME/VGB.git
cd VGB

# 3. Ajoutez le repository original comme upstream
git remote add upstream https://github.com/ORIGINAL-OWNER/VGB.git
```

### 2. Testez le jeu

```bash
# Lancez le serveur local
python -m http.server 8000
# Ou
npm run dev

# Ouvrez http://localhost:8000 dans votre navigateur
```

## 🎭 Votre première contribution : Ajouter un personnage

### Option 1 : Script automatique (Recommandé)

```bash
# Lancez le script interactif
npm run add-character

# Suivez les instructions à l'écran
```

### Option 2 : Manuel (Pour apprendre)

1. **Préparez l'image**

   - Format : PNG avec transparence
   - Taille : 64x64 pixels minimum
   - Nom : `nom-personnage.png`

2. **Ajoutez l'image**

   ```bash
   # Copiez votre image dans le bon dossier
   cp votre-image.png public/images/nintendo/characters/
   ```

3. **Modifiez `public/data/pieces.js`**

   ```javascript
   // Ajoutez votre personnage à la fin du tableau
   {
     name: "Nom du Personnage",
     nameKey: "nom-personnage",
     faction: "Nintendo", // ou PlayStation, SEGA, Xbox
     universe: "Univers du jeu",
     cost: 5, // 1-10
     tier: 2, // 1-4
     range: 2, // 1-5
     moves: [[1,0], [-1,0], [0,1], [0,-1]], // Mouvements
     description: "Description en français",
     descriptionKey: "nom-personnage-desc",
     image: "public/images/nintendo/characters/nom-personnage.png",
     type: "nom-personnage"
   }
   ```

4. **Ajoutez les traductions dans `public/js/translations.js`**

   ```javascript
   // Dans chaque langue (fr, en, es, de, it, pt)
   "nom-personnage": "Character Name",
   "nom-personnage-desc": "Character description"
   ```

5. **Ajoutez le chargement d'image dans `index.html`**
   ```javascript
   // Dans la fonction preload(), section appropriée
   this.load.image("nom-personnage", "nom-personnage.png");
   ```

## 🎁 Ajouter un objet

### Script automatique

```bash
npm run add-item
```

### Manuel

1. **Image** : 32x32 PNG transparent
2. **Données** : Ajoutez dans `public/data/items.js`
3. **Traductions** : Ajoutez dans `public/js/translations.js`
4. **Poids** : Ajoutez dans `index.html` (ITEM_WEIGHTS)
5. **Chargement** : Ajoutez dans `index.html` (preload)

## 🧪 Tester vos modifications

```bash
# Validez vos contributions
npm run validate

# Testez le jeu
npm run dev
```

### Vérifications obligatoires

- [ ] L'image s'affiche correctement
- [ ] Le personnage/objet fonctionne en jeu
- [ ] Les traductions sont présentes
- [ ] Pas d'erreurs dans la console
- [ ] Le script de validation passe

## 📝 Créer une Pull Request

### 1. Commitez vos changements

```bash
# Créez une branche
git checkout -b add-nouveau-personnage

# Ajoutez vos fichiers
git add .

# Commitez
git commit -m "feat: Add [Nom du personnage] character

- Add [Nom du personnage] sprite (64x64 PNG)
- Add movement patterns and stats
- Add translations in all 6 languages
- Cost: X points, Tier: Y, Range: Z"

# Poussez vers votre fork
git push origin add-nouveau-personnage
```

### 2. Créez la Pull Request

1. Allez sur votre fork GitHub
2. Cliquez sur "Compare & pull request"
3. Remplissez le template
4. Ajoutez des captures d'écran
5. Mentionnez @maintainer si nécessaire

## 🎨 Conseils pour les images

### Personnages

- **Style** : Cohérent avec les autres personnages
- **Qualité** : Haute résolution, net
- **Transparence** : Fond transparent obligatoire
- **Détails** : Visibles à 64x64 pixels

### Objets

- **Style** : Simple et reconnaissable
- **Taille** : 32x32 pixels
- **Couleurs** : Contrastées pour la visibilité
- **Transparence** : Fond transparent

## 🌍 Traductions

### Langues supportées

- 🇫🇷 **Français** (obligatoire)
- 🇬🇧 **Anglais** (obligatoire)
- 🇪🇸 **Espagnol** (recommandé)
- 🇩🇪 **Allemand** (recommandé)
- 🇮🇹 **Italien** (optionnel)
- 🇵🇹 **Portugais** (optionnel)

### Conseils

- **Nom** : Court et mémorable
- **Description** : Maximum 100 caractères
- **Cohérence** : Style similaire aux autres
- **Vérification** : Testez dans le jeu

## ⚖️ Équilibrage

### Coûts recommandés

- **Tier 1** (Faible) : 1-3 points
- **Tier 2** (Moyen) : 4-6 points
- **Tier 3** (Fort) : 7-8 points
- **Tier 4** (Unique) : 9-10 points

### Mouvements

- **Simple** : Croix (4 directions)
- **Moyen** : Roi (8 directions)
- **Avancé** : Cavalier (L)
- **Spécial** : Personnalisé

## 🐛 Signaler un bug

### Template d'issue

```markdown
**Bug Description**
Description claire du problème

**Steps to Reproduce**

1. Aller à...
2. Cliquer sur...
3. Voir l'erreur

**Expected Behavior**
Ce qui devrait se passer

**Screenshots**
Ajoutez des captures d'écran

**Environment**

- OS: [ex: Windows 10]
- Browser: [ex: Chrome 91]
- Version: [ex: 1.0.0]
```

## 💡 Proposer une fonctionnalité

### Template d'issue

```markdown
**Feature Request**
Description de la fonctionnalité

**Use Case**
Pourquoi cette fonctionnalité serait utile

**Proposed Solution**
Comment vous l'implémenteriez

**Alternatives**
Autres solutions possibles
```

## 🤝 Code de conduite

### Règles de base

- ✅ **Respectueux** : Soyez poli et constructif
- ✅ **Collaboratif** : Acceptez les critiques constructives
- ✅ **Patient** : Les reviews peuvent prendre du temps
- ✅ **Apprenant** : Posez des questions si nécessaire

### À éviter

- ❌ **Spam** : Pas de contributions de faible qualité
- ❌ **Insultes** : Respectez tous les contributeurs
- ❌ **Hors-sujet** : Restez dans le contexte du projet
- ❌ **Urgence** : Pas de demande de merge immédiat

## 🆘 Besoin d'aide ?

### Ressources

- **Issues** : Créez une issue avec le label `question`
- **Discussions** : Utilisez les discussions GitHub
- **Documentation** : Lisez les autres guides
- **Code** : Regardez les contributions existantes

### Contact

- **Mainteneur** : @maintainer
- **Communauté** : Discussions GitHub
- **Documentation** : Wiki du projet

## 🎉 Félicitations !

Une fois votre première Pull Request acceptée :

- ✅ Vous êtes officiellement un contributeur
- ✅ Votre nom apparaîtra dans les crédits
- ✅ Vous pouvez aider d'autres contributeurs
- ✅ Vous pouvez proposer des améliorations majeures

---

**🌟 Merci de contribuer à Video Games Battle ! Votre contribution compte !**




