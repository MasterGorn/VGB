#!/usr/bin/env node

/**
 * Script d'aide pour ajouter un nouvel objet
 * Usage: node scripts/add-item.js
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
    case 'weight':
      const weight = parseInt(input);
      return weight >= 1 && weight <= 100 ? weight : null;
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

// Fonction pour ajouter l'objet au fichier items.js
function addItemToItems(itemData) {
  const itemsPath = path.join(__dirname, '..', 'public', 'data', 'items.js');
  let content = fs.readFileSync(itemsPath, 'utf8');
  
  // Trouver la position d'insertion (avant le dernier })
  const lastBraceIndex = content.lastIndexOf('}');
  const insertPosition = lastBraceIndex;
  
  const itemEntry = `,
  {
    name: "${itemData.name}",
    nameKey: "${itemData.nameKey}",
    description: "${itemData.description}",
    descriptionKey: "${itemData.nameKey}-desc",
    image: "public/images/items/${itemData.imageName}",
    weight: ${itemData.weight},
    type: "${itemData.nameKey}"
  }`;
  
  content = content.slice(0, insertPosition) + itemEntry + content.slice(insertPosition);
  fs.writeFileSync(itemsPath, content);
  console.log('✅ Objet ajouté à items.js');
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

// Fonction pour ajouter le poids dans ITEM_WEIGHTS
function addItemWeight(nameKey, weight) {
  const indexPath = path.join(__dirname, '..', 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Trouver la section ITEM_WEIGHTS
  const weightsSection = 'const ITEM_WEIGHTS = {';
  const sectionIndex = content.indexOf(weightsSection);
  
  if (sectionIndex !== -1) {
    // Trouver la fin de la section (avant le })
    const endIndex = content.indexOf('};', sectionIndex);
    const insertPos = endIndex;
    
    const weightEntry = `,
    '${nameKey}': ${weight}`;
    
    content = content.slice(0, insertPos) + weightEntry + content.slice(insertPos);
    fs.writeFileSync(indexPath, content);
    console.log('✅ Poids ajouté à ITEM_WEIGHTS');
  }
}

// Fonction pour ajouter le chargement d'image
function addImageLoading(imageName) {
  const indexPath = path.join(__dirname, '..', 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Trouver la section des objets
  const itemsSection = '// Items';
  const sectionIndex = content.indexOf(itemsSection);
  
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
  console.log('🎁 Assistant d\'ajout d\'objet - Video Games Battle\n');
  
  try {
    // Collecter les informations de l'objet
    const name = await askQuestion('Nom de l\'objet: ');
    const description = await askQuestion('Description en français: ');
    const weight = await askQuestion('Poids pour la génération (1-100): ');
    const imageName = await askQuestion('Nom du fichier image (ex: power-star.png): ');
    
    // Valider les entrées
    const validatedWeight = validateInput(weight, 'weight');
    
    if (!validatedWeight) {
      console.log('❌ Erreur: Poids invalide (doit être entre 1 et 100)');
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
    
    // Créer l'objet item
    const itemData = {
      name: name,
      nameKey: nameKey,
      description: description,
      weight: validatedWeight,
      imageName: imageName
    };
    
    console.log('\n📝 Résumé de l\'objet:');
    console.log(JSON.stringify(itemData, null, 2));
    
    const confirm = await askQuestion('\nConfirmer l\'ajout ? (y/N): ');
    
    if (confirm.toLowerCase() === 'y') {
      // Ajouter l'objet
      addItemToItems(itemData);
      addTranslations(nameKey, name, description, languages);
      addItemWeight(nameKey, validatedWeight);
      addImageLoading(imageName);
      
      console.log('\n✅ Objet ajouté avec succès !');
      console.log('\n📋 Prochaines étapes:');
      console.log('1. Ajoutez l\'image dans public/images/items/');
      console.log('2. Testez l\'objet dans le jeu');
      console.log('3. Ajustez le poids si nécessaire');
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
