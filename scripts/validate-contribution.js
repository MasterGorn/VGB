#!/usr/bin/env node

/**
 * Script de validation des contributions
 * Usage: node scripts/validate-contribution.js
 */

const fs = require('fs');
const path = require('path');

// Charger la configuration
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Fonction pour vérifier les personnages
function validateCharacters() {
  log('\n🎭 Validation des personnages...', 'cyan');
  
  const piecesPath = path.join(__dirname, '..', 'public', 'data', 'pieces.js');
  const piecesContent = fs.readFileSync(piecesPath, 'utf8');
  
  // Extraire les personnages (simplifié)
  const characterMatches = piecesContent.match(/{\s*name:\s*"[^"]+"/g);
  let validCharacters = 0;
  let totalCharacters = characterMatches ? characterMatches.length : 0;
  
  log(`📊 ${totalCharacters} personnages trouvés`, 'blue');
  
  // Vérifications basiques
  const checks = [
    {
      name: 'Structure JSON valide',
      test: () => {
        try {
          // Extraire la partie des personnages
          const start = piecesContent.indexOf('const piecesData = [');
          const end = piecesContent.indexOf('];', start);
          const dataSection = piecesContent.substring(start, end + 2);
          
          // Remplacer les clés non-quotées par des clés quotées
          const fixedSection = dataSection
            .replace(/(\w+):/g, '"$1":')
            .replace(/:\s*(\d+)/g, ': $1')
            .replace(/:\s*true/g, ': true')
            .replace(/:\s*false/g, ': false')
            .replace(/:\s*null/g, ': null');
          
          JSON.parse(fixedSection);
          return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      name: 'Images existent',
      test: () => {
        const imageMatches = piecesContent.match(/image:\s*"[^"]+"/g);
        if (!imageMatches) return false;
        
        let validImages = 0;
        imageMatches.forEach(match => {
          const imagePath = match.match(/"[^"]+"/)[0].slice(1, -1);
          const fullPath = path.join(__dirname, '..', imagePath);
          if (fs.existsSync(fullPath)) validImages++;
        });
        
        return validImages === imageMatches.length;
      }
    },
    {
      name: 'Traductions présentes',
      test: () => {
        const translationsPath = path.join(__dirname, '..', 'public', 'js', 'translations.js');
        const translationsContent = fs.readFileSync(translationsPath, 'utf8');
        
        // Vérifier que toutes les langues sont présentes
        const languages = config.languages.map(lang => lang.code);
        return languages.every(lang => translationsContent.includes(`${lang}: {`));
      }
    }
  ];
  
  checks.forEach(check => {
    const result = check.test();
    const status = result ? '✅' : '❌';
    const color = result ? 'green' : 'red';
    log(`${status} ${check.name}`, color);
  });
  
  return totalCharacters;
}

// Fonction pour vérifier les objets
function validateItems() {
  log('\n🎁 Validation des objets...', 'cyan');
  
  const itemsPath = path.join(__dirname, '..', 'public', 'data', 'items.js');
  const itemsContent = fs.readFileSync(itemsPath, 'utf8');
  
  // Extraire les objets
  const itemMatches = itemsContent.match(/{\s*name:\s*"[^"]+"/g);
  let totalItems = itemMatches ? itemMatches.length : 0;
  
  log(`📊 ${totalItems} objets trouvés`, 'blue');
  
  // Vérifications basiques
  const checks = [
    {
      name: 'Structure JSON valide',
      test: () => {
        try {
          // Extraire la partie des objets
          const start = itemsContent.indexOf('const itemsData = [');
          const end = itemsContent.indexOf('];', start);
          const dataSection = itemsContent.substring(start, end + 2);
          
          const fixedSection = dataSection
            .replace(/(\w+):/g, '"$1":')
            .replace(/:\s*(\d+)/g, ': $1')
            .replace(/:\s*true/g, ': true')
            .replace(/:\s*false/g, ': false')
            .replace(/:\s*null/g, ': null');
          
          JSON.parse(fixedSection);
          return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      name: 'Images existent',
      test: () => {
        const imageMatches = itemsContent.match(/image:\s*"[^"]+"/g);
        if (!imageMatches) return false;
        
        let validImages = 0;
        imageMatches.forEach(match => {
          const imagePath = match.match(/"[^"]+"/)[0].slice(1, -1);
          const fullPath = path.join(__dirname, '..', imagePath);
          if (fs.existsSync(fullPath)) validImages++;
        });
        
        return validImages === imageMatches.length;
      }
    },
    {
      name: 'Poids définis',
      test: () => {
        const indexPath = path.join(__dirname, '..', 'index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        
        return indexContent.includes('ITEM_WEIGHTS') && indexContent.includes('const ITEM_WEIGHTS');
      }
    }
  ];
  
  checks.forEach(check => {
    const result = check.test();
    const status = result ? '✅' : '❌';
    const color = result ? 'green' : 'red';
    log(`${status} ${check.name}`, color);
  });
  
  return totalItems;
}

// Fonction pour vérifier les traductions
function validateTranslations() {
  log('\n🌍 Validation des traductions...', 'cyan');
  
  const translationsPath = path.join(__dirname, '..', 'public', 'js', 'translations.js');
  const translationsContent = fs.readFileSync(translationsPath, 'utf8');
  
  let totalLanguages = 0;
  let missingTranslations = 0;
  
  config.languages.forEach(lang => {
    if (translationsContent.includes(`${lang.code}: {`)) {
      totalLanguages++;
      log(`✅ ${lang.flag} ${lang.name} (${lang.code})`, 'green');
    } else {
      missingTranslations++;
      log(`❌ ${lang.flag} ${lang.name} (${lang.code}) manquant`, 'red');
    }
  });
  
  log(`📊 ${totalLanguages}/${config.languages.length} langues configurées`, 'blue');
  
  return { totalLanguages, missingTranslations };
}

// Fonction pour vérifier les fichiers de structure
function validateStructure() {
  log('\n📁 Validation de la structure...', 'cyan');
  
  const requiredFiles = [
    'index.html',
    'public/data/pieces.js',
    'public/data/items.js',
    'public/js/translations.js'
  ];
  
  const requiredDirs = [
    'public/images/nintendo/characters',
    'public/images/playstation/characters',
    'public/images/sega/characters',
    'public/images/xbox/characters',
    'public/images/items'
  ];
  
  let validFiles = 0;
  let validDirs = 0;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      validFiles++;
      log(`✅ ${file}`, 'green');
    } else {
      log(`❌ ${file} manquant`, 'red');
    }
  });
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      validDirs++;
      log(`✅ ${dir}/`, 'green');
    } else {
      log(`❌ ${dir}/ manquant`, 'red');
    }
  });
  
  log(`📊 ${validFiles}/${requiredFiles.length} fichiers présents`, 'blue');
  log(`📊 ${validDirs}/${requiredDirs.length} dossiers présents`, 'blue');
  
  return { validFiles, validDirs };
}

// Fonction principale
function main() {
  log('🎮 Validation des contributions - Video Games Battle', 'bright');
  log('=' .repeat(50), 'blue');
  
  const results = {
    characters: 0,
    items: 0,
    translations: { totalLanguages: 0, missingTranslations: 0 },
    structure: { validFiles: 0, validDirs: 0 }
  };
  
  // Exécuter toutes les validations
  results.characters = validateCharacters();
  results.items = validateItems();
  results.translations = validateTranslations();
  results.structure = validateStructure();
  
  // Résumé final
  log('\n📊 Résumé de la validation:', 'bright');
  log('=' .repeat(30), 'blue');
  log(`🎭 Personnages: ${results.characters}`, 'cyan');
  log(`🎁 Objets: ${results.items}`, 'cyan');
  log(`🌍 Langues: ${results.translations.totalLanguages}/${config.languages.length}`, 'cyan');
  log(`📁 Structure: ${results.structure.validFiles} fichiers, ${results.structure.validDirs} dossiers`, 'cyan');
  
  // Évaluation globale
  const score = (
    (results.characters > 0 ? 1 : 0) +
    (results.items > 0 ? 1 : 0) +
    (results.translations.totalLanguages >= 4 ? 1 : 0) +
    (results.structure.validFiles >= 4 ? 1 : 0)
  );
  
  if (score >= 3) {
    log('\n✅ Validation réussie ! Le projet semble prêt.', 'green');
  } else if (score >= 2) {
    log('\n⚠️  Validation partielle. Quelques problèmes détectés.', 'yellow');
  } else {
    log('\n❌ Validation échouée. Plusieurs problèmes critiques.', 'red');
  }
  
  log('\n💡 Utilisez les scripts add-character.js et add-item.js pour ajouter du contenu facilement.', 'blue');
}

// Lancer la validation
main();
