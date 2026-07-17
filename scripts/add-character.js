#!/usr/bin/env node

/**
 * Script d'aide pour ajouter un nouveau personnage
 * Usage: node scripts/add-character.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour poser une question
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Fonction pour valider les entrées
function validateInput(input, type) {
  switch (type) {
    case 'role':
      const roles = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'unique'];
      const role = String(input || '').trim().toLowerCase();
      return roles.includes(role) ? role : null;
    case 'range':
      const range = parseInt(input);
      return range >= 1 && range <= 8 ? range : null;
    case 'faction':
      const factions = ['Nintendo', 'PlayStation', 'SEGA', 'Xbox'];
      return factions.includes(input) ? input : null;
    default:
      return input.trim();
  }
}

// Fonction pour générer la clé de traduction
function generateKey(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Fonction pour ajouter le personnage au fichier pieces.js
function addCharacterToPieces(charData) {
  const piecesPath = path.join(__dirname, '..', 'public', 'data', 'pieces.js');
  let content = fs.readFileSync(piecesPath, 'utf8');
  
  // Trouver la position d'insertion (avant le dernier })
  const lastBraceIndex = content.lastIndexOf('}');
  const insertPosition = lastBraceIndex;
  
  const characterEntry = `,
  {
    name: "${charData.name}",
    nameKey: "${charData.nameKey}",
    faction: "${charData.faction}",
    universe: "${charData.universe}",
    role: "${charData.role}",
    range: ${charData.range},
    moves: ${JSON.stringify(charData.moves)},
    description: "${charData.description}",
    descriptionKey: "${charData.nameKey}-desc",
    image: "public/images/${charData.faction.toLowerCase()}/characters/${charData.imageName}",
    type: "${charData.nameKey}"
  }`;
  
  content = content.slice(0, insertPosition) + characterEntry + content.slice(insertPosition);
  fs.writeFileSync(piecesPath, content);
  console.log('✅ Personnage ajouté à pieces.js');
}

// Fonction pour ajouter les traductions
function addTranslations(nameKey, name, description, languages) {
  const translationsPath = path.join(__dirname, '..', 'public', 'js', 'translations.js');
  let content = fs.readFileSync(translationsPath, 'utf8');
  
  languages.forEach(lang => {
    const langData = lang.split('|');
    const langCode = langData[0];
    const langName = langData[1];
    const langDesc = langData[2];
    
    // Ajouter la traduction du nom
    const namePattern = new RegExp(`(\\s+"${langCode}":\\s*{[^}]*?)(\\s*})`, 's');
    const nameMatch = content.match(namePattern);
    if (nameMatch) {
      const insertPos = nameMatch[1].lastIndexOf('}');
      const nameEntry = `,
      "${nameKey}": "${langName}"`;
      content = content.slice(0, insertPos) + nameEntry + content.slice(insertPos);
    }
    
    // Ajouter la traduction de la description
    const descPattern = new RegExp(`(\\s+"${langCode}":\\s*{[^}]*?)(\\s*})`, 's');
    const descMatch = content.match(descPattern);
    if (descMatch) {
      const insertPos = descMatch[1].lastIndexOf('}');
      const descEntry = `,
      "${nameKey}-desc": "${langDesc}"`;
      content = content.slice(0, insertPos) + descEntry + content.slice(insertPos);
    }
  });
  
  fs.writeFileSync(translationsPath, content);
  console.log('✅ Traductions ajoutées');
}

// Fonction pour ajouter le chargement d'image dans index.html
function addImageLoading(faction, imageName) {
  const indexPath = path.join(__dirname, '..', 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Trouver la section appropriée pour charger l'image
  const factionSection = `// ${faction} characters`;
  const sectionIndex = content.indexOf(factionSection);
  
  if (sectionIndex !== -1) {
    const nextSectionIndex = content.indexOf('// ', sectionIndex + 1);
    const insertPos = nextSectionIndex !== -1 ? nextSectionIndex : content.length;
    
    const imageLoading = `    this.load.image('${generateKey(imageName)}', '${imageName}');
`;
    
    content = content.slice(0, insertPos) + imageLoading + content.slice(insertPos);
    fs.writeFileSync(indexPath, content);
    console.log('✅ Chargement d\'image ajouté à index.html');
  }
}

// Fonction principale
async function main() {
  console.log('🎮 Assistant d\'ajout de personnage - Video Games Battle\n');
  
  try {
    // Collecter les informations du personnage
    const name = await askQuestion('Nom du personnage: ');
    const faction = await askQuestion('Faction (Nintendo/PlayStation/SEGA/Xbox): ');
    const universe = await askQuestion('Univers du jeu: ');
    const role = await askQuestion('Rôle / force (pawn/knight/bishop/rook/queen/unique): ');
    const range = await askQuestion('Portée (surtout pour Unique, 1-8 — défaut 1 pour les rôles standards): ');
    const description = await askQuestion('Description en français: ');
    const imageName = await askQuestion('Nom du fichier image (ex: mario.png): ');
    
    // Valider les entrées
    const validatedFaction = validateInput(faction, 'faction');
    const validatedRole = validateInput(role, 'role');
    const validatedRange = validateInput(range || '1', 'range');
    
    if (!validatedFaction || !validatedRole || !validatedRange) {
      console.log('❌ Erreur: Valeurs invalides');
      process.exit(1);
    }
    
    const nameKey = generateKey(name);
    
    // Collecter les traductions
    console.log('\n🌍 Traductions (format: code|nom|description):');
    const languages = [];
    const langCodes = ['en', 'es', 'de', 'it', 'pt'];
    const langNames = ['Anglais', 'Espagnol', 'Allemand', 'Italien', 'Portugais'];
    
    for (let i = 0; i < langCodes.length; i++) {
      const translation = await askQuestion(`${langNames[i]} (${langCodes[i]}): `);
      languages.push(`${langCodes[i]}|${translation}`);
    }
    
    // Mouvements : pour Unique on garde une croix par défaut ; sinon le jeu utilise les moves d'échecs du rôle
    const defaultMoves = [[1,0], [-1,0], [0,1], [0,-1]];
    
    // Créer l'objet personnage
    const characterData = {
      name: name,
      nameKey: nameKey,
      faction: validatedFaction,
      universe: universe,
      role: validatedRole,
      range: validatedRange,
      moves: defaultMoves,
      description: description,
      imageName: imageName
    };
    
    console.log('\n📝 Résumé du personnage:');
    console.log(JSON.stringify(characterData, null, 2));
    
    const confirm = await askQuestion('\nConfirmer l\'ajout ? (y/N): ');
    
    if (confirm.toLowerCase() === 'y') {
      // Ajouter le personnage
      addCharacterToPieces(characterData);
      addTranslations(nameKey, name, description, languages);
      addImageLoading(validatedFaction, imageName);
      
      console.log('\n✅ Personnage ajouté avec succès !');
      console.log('\n📋 Prochaines étapes:');
      console.log('1. Ajoutez l\'image dans public/images/' + validatedFaction.toLowerCase() + '/characters/');
      console.log('2. Testez le personnage dans le jeu');
      console.log('3. Ajustez les mouvements si nécessaire');
      console.log('4. Créez une Pull Request');
    } else {
      console.log('❌ Ajout annulé');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    rl.close();
  }
}

// Lancer le script
main();
