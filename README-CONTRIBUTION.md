# 🎮 Guide de Contribution - Video Games Battle

Bienvenue dans le projet **Video Games Battle** ! Ce guide vous explique comment contribuer en ajoutant de nouveaux personnages et objets au jeu.

## 📚 Tutoriels disponibles

### 🎭 [Tutoriel : Ajouter un personnage](TUTORIEL-AJOUT-PERSONNAGE.md)

Guide pas à pas pour ajouter un nouveau personnage au jeu en modifiant directement le code.

**Ce que vous apprendrez :**

- Comment ajouter les données d'un personnage
- Où modifier les traductions
- Comment charger l'image dans le jeu
- Comment personnaliser les mouvements et statistiques

### 🎁 [Tutoriel : Ajouter un objet](TUTORIEL-AJOUT-OBJET.md)

Guide pas à pas pour ajouter un nouvel objet au jeu avec ses effets spéciaux.

**Ce que vous apprendrez :**

- Comment ajouter les données d'un objet
- Comment implémenter les effets spéciaux
- Comment gérer la rareté des objets
- Comment intégrer l'objet dans la logique de jeu

## 🚀 Démarrage rapide

### 1. Fork et Clone

```bash
# 1. Fork le repository sur GitHub
# 2. Clone votre fork localement
git clone https://github.com/VOTRE-USERNAME/VGB.git
cd VGB
```

### 2. Testez le jeu

```bash
# Lancez le serveur local
python -m http.server 8000
# Ou
npx http-server -p 8000

# Ouvrez http://localhost:8000 dans votre navigateur
```

### 3. Suivez un tutoriel

- **Pour un personnage** : Ouvrez `TUTORIEL-AJOUT-PERSONNAGE.md`
- **Pour un objet** : Ouvrez `TUTORIEL-AJOUT-OBJET.md`

## 📁 Structure du projet

```
VGB/
├── index.html                    # Jeu principal
├── public/
│   ├── data/
│   │   ├── pieces.js            # Données des personnages
│   │   └── items.js             # Données des objets
│   ├── js/
│   │   └── translations.js      # Traductions multilingues
│   ├── images/
│   │   ├── nintendo/characters/ # Images Nintendo
│   │   ├── playstation/characters/ # Images PlayStation
│   │   ├── sega/characters/     # Images SEGA
│   │   ├── xbox/characters/     # Images Xbox
│   │   └── items/               # Images des objets
│   └── sounds/                  # Sons du jeu
├── TUTORIEL-AJOUT-PERSONNAGE.md # Guide pour les personnages
├── TUTORIEL-AJOUT-OBJET.md      # Guide pour les objets
└── README-CONTRIBUTION.md       # Ce fichier
```

## 🎯 Types de contributions

### 🎭 Nouveaux personnages

- **Nintendo** : Mario, Luigi, Princess Peach, Bowser, Link, Zelda, Samus, Pikachu, etc.
- **PlayStation** : Kratos, Ratchet & Clank, Nathan Drake, Aloy, Spider-Man, etc.
- **SEGA** : Sonic, Tails, Knuckles, Bayonetta, etc.
- **Xbox** : Master Chief, Marcus Fenix, Banjo & Kazooie, etc.

### 🎁 Nouveaux objets

- **Objets de protection** : Boucliers, cœurs, armures
- **Objets de mouvement** : Bottes de course, ailes, téléporteurs
- **Objets de combat** : Épées, boules de feu, sorts
- **Objets spéciaux** : Étoiles, cristaux, potions

### 🌍 Traductions

- **Français** (obligatoire)
- **Anglais** (obligatoire)
- **Espagnol** (recommandé)
- **Allemand** (recommandé)
- **Italien** (optionnel)
- **Portugais** (optionnel)

## 🎨 Ressources pour les images

### Personnages

- **Format** : PNG avec transparence
- **Taille** : 64x64 pixels minimum
- **Style** : Cohérent avec les autres personnages
- **Qualité** : Haute résolution, net

### Objets

- **Format** : PNG avec transparence
- **Taille** : 32x32 pixels minimum
- **Style** : Simple et reconnaissable
- **Couleurs** : Contrastées pour la visibilité

## ⚖️ Équilibrage

### Personnages

- **Tier 1** (Faible) : 1-3 points
- **Tier 2** (Moyen) : 4-6 points
- **Tier 3** (Fort) : 7-8 points
- **Tier 4** (Unique) : 9-10 points

### Objets

- **Commun** : Poids 20-40
- **Rare** : Poids 10-19
- **Épique** : Poids 5-9
- **Légendaire** : Poids 1-4

## 🧪 Tests

### Vérifications obligatoires

- [ ] Image affichée correctement
- [ ] Personnage/objet fonctionne en jeu
- [ ] Traductions dans toutes les langues
- [ ] Pas d'erreurs dans la console
- [ ] Équilibrage testé

### Comment tester

1. Ouvrez `index.html`
2. Lancez une partie
3. Sélectionnez votre contenu
4. Vérifiez le fonctionnement
5. Testez en différentes langues

## 📝 Pull Request

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
3. Remplissez la description
4. Ajoutez des captures d'écran
5. Mentionnez @maintainer si nécessaire

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
- **Tutoriels** : Relisez les guides pas à pas
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

**🎮 Merci de contribuer à Video Games Battle ! Votre contribution compte !**




