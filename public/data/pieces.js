// ========================================
// DONNÉES DES PIÈCES - VIDEO GAMES BATTLE
// ========================================

// Données des pièces avec informations détaillées (correspondant au jeu)
const piecesData = [
  // Rois (toutes factions)
  {
    name: "Roi Nintendo",
    faction: "Nintendo",
    universe: "Nintendo",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de Nintendo. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    image: "public/images/nintendo/characters/king.png",
    type: "king"
  },
  {
    name: "Roi PlayStation",
    faction: "PlayStation",
    universe: "PlayStation",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de PlayStation. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    image: "public/images/playstation/characters/king.png",
    type: "king"
  },
  {
    name: "Roi SEGA",
    faction: "SEGA",
    universe: "SEGA",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de SEGA. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    image: "public/images/sega/characters/king.png",
    type: "king"
  },
  {
    name: "Roi Xbox",
    faction: "Xbox",
    universe: "Xbox",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de Xbox. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    image: "public/images/xbox/characters/king.png",
    type: "king"
  },
  
  // Nintendo
  {
    name: "Link",
    faction: "Nintendo", 
    universe: "The Legend of Zelda",
    cost: 5,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Le héros de la Triforce. Se déplace en ligne droite sur 3 cases maximum. Maître de l'épée et de la magie.",
    image: "public/images/nintendo/characters/link.png",
    type: "link"
  },
  {
    name: "Mario",
    faction: "Nintendo",
    universe: "Super Mario", 
    cost: 3,
    tier: 1,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Le plombier le plus célèbre du monde. Se déplace en diagonale sur 2 cases. Agilité et saut exceptionnels.",
    image: "public/images/nintendo/characters/mario.png",
    type: "mario"
  },
  {
    name: "Zelda",
    faction: "Nintendo",
    universe: "The Legend of Zelda",
    cost: 7,
    tier: 3,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Princesse d'Hyrule et gardienne de la Triforce. Se déplace dans toutes les directions sur 8 cases. Puissance magique immense.",
    image: "public/images/nintendo/characters/zelda.png",
    type: "zelda"
  },
  
  // PlayStation
  {
    name: "Nathan Drake",
    faction: "PlayStation",
    universe: "Uncharted",
    cost: 5,
    tier: 1,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Chasseur de trésors intrépide. Se déplace en ligne droite sur 3 cases. Agilité et ruse au service de l'aventure.",
    image: "public/images/playstation/characters/nathan-drake.png",
    type: "nathan-drake"
  },
  {
    name: "Kratos",
    faction: "PlayStation",
    universe: "God of War",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Dieu de la Guerre spartiate. Se déplace en diagonale sur 2 cases. Force brute et rage destructrice.",
    image: "public/images/playstation/characters/kratos.png",
    type: "kratos"
  },
  {
    name: "Astro Bot",
    faction: "PlayStation",
    universe: "Astro's Playroom",
    cost: 7,
    tier: 3,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Robot mascotte de PlayStation. Se déplace dans toutes les directions sur 8 cases. Technologie et innovation.",
    image: "public/images/playstation/characters/astro-bot.png",
    type: "astro-bot"
  },
  
  // SEGA
  {
    name: "Sonic",
    faction: "SEGA",
    universe: "Sonic the Hedgehog",
    cost: 5,
    tier: 1,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Hérisson bleu le plus rapide du monde. Se déplace en ligne droite sur 3 cases. Vitesse et agilité exceptionnelles.",
    image: "public/images/sega/characters/sonic.png",
    type: "sonic"
  },
  {
    name: "Ryo",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Flic de Metro City. Se déplace en diagonale sur 2 cases. Combat au corps à corps redoutable.",
    image: "public/images/sega/characters/ryo.png",
    type: "ryo"
  },
  {
    name: "Joe Musashi",
    faction: "SEGA",
    universe: "Shinobi",
    cost: 7,
    tier: 3,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Ninja légendaire. Se déplace dans toutes les directions sur 8 cases. Arts martiaux et techniques secrètes.",
    image: "public/images/sega/characters/joe-musashi.png",
    type: "joe-musashi"
  },
  
  // Xbox
  {
    name: "Master Chief",
    faction: "Xbox",
    universe: "Halo",
    cost: 5,
    tier: 1,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Spartan-117, dernier espoir de l'humanité. Se déplace en ligne droite sur 3 cases. Armure MJOLNIR et armes Covenant.",
    image: "public/images/xbox/characters/masterchief.png",
    type: "masterchief"
  },
  {
    name: "Marcus Fenix",
    faction: "Xbox", 
    universe: "Gears of War",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Soldat Delta. Se déplace en diagonale sur 2 cases. Guerre contre les Locust avec des armes lourdes.",
    image: "public/images/xbox/characters/marcus-fenix.png",
    type: "marcus-fenix"
  },
  {
    name: "Joanna Dark",
    faction: "Xbox",
    universe: "Perfect Dark",
    cost: 7,
    tier: 4,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Agent secret d'élite. Se déplace dans toutes les directions sur 8 cases. Espionnage et technologie de pointe.",
    image: "public/images/xbox/characters/joanna-dark.png",
    type: "joanna-dark"
  }
];

// Fonction pour obtenir les pièces par faction
function getPiecesByFaction(faction) {
  return piecesData.filter(piece => piece.faction === faction);
}

// Fonction pour obtenir une pièce par type
function getPieceByType(type) {
  return piecesData.find(piece => piece.type === type);
}

// Fonction pour obtenir toutes les factions
function getAllFactions() {
  return [...new Set(piecesData.map(piece => piece.faction))];
}

// Fonction pour obtenir tous les univers
function getAllUniverses() {
  return [...new Set(piecesData.map(piece => piece.universe))];
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    piecesData,
    getPiecesByFaction,
    getPieceByType,
    getAllFactions,
    getAllUniverses
  };
}
