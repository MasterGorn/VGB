// ========================================
// DONNÉES DES OBJETS - VIDEO GAMES BATTLE
// ========================================

// Données des objets avec informations détaillées (correspondant au jeu)
const itemsData = [
  {
    name: "Bob-omb",
    key: "bobomb",
    weight: 4,
    description: "Bombe explosive de Mario ! Place une <strong>bombe sur une case vide</strong> qui explosera au prochain tour.",
    details: "La bombe endommage toutes les pièces adjacentes (alliées et ennemies). Parfait pour créer des zones de danger ou éliminer plusieurs pièces d'un coup. Inspiré de Super Mario Bros.",
    image: "public/images/items/bobomb.png",
    category: "explosif"
  },
  {
    name: "Portails",
    key: "portals",
    weight: 4,
    description: "Téléportation instantanée ! Crée <strong>deux portails connectés</strong> sur le plateau.",
    details: "Placez deux portails sur des cases vides. Toute pièce entrant dans un portail ressort instantanément de l'autre. Parfait pour les mouvements tactiques et les échappatoires. Inspiré de Portal.",
    image: "public/images/items/portals.png",
    category: "téléportation"
  },
  {
    name: "Foudre",
    key: "lightning",
    weight: 1,
    description: "Éclair destructeur ! <strong>Élimine instantanément une pièce</strong> de votre choix.",
    details: "Choisissez n'importe quelle pièce sur le plateau (alliée ou ennemie) pour l'éliminer immédiatement. Puissant mais coûteux, parfait pour éliminer des menaces majeures. Inspiré de la magie élémentaire classique.",
    image: "public/images/items/lightning.png",
    category: "destruction"
  },
  {
    name: "Étoile",
    key: "star",
    weight: 2,
    description: "Révélation mystique ! <strong>Révèle toutes les pièces cachées</strong> sur le plateau pendant 3 tours.",
    details: "Permet de voir les pièces adverses même si elles sont normalement invisibles. Utile pour planifier des attaques ou éviter des pièges. Inspiré de Super Mario Bros, l'étoile apporte la clairvoyance.",
    image: "public/images/items/star.png",
    category: "révélation"
  },
  {
    name: "Tetrimino",
    key: "tetrimino",
    weight: 3000,
    description: "Bloc de construction ! Place un <strong>mur Tetrimino</strong> sur le plateau.",
    details: "Crée un obstacle permanent sur le plateau qui bloque les mouvements. Parfait pour contrôler les zones de passage ou protéger des positions stratégiques. Inspiré de Tetris.",
    image: "public/images/items/tetrimino.png",
    category: "obstacle"
  },
  {
    name: "Tornade",
    key: "tornado",
    weight: 2,
    description: "Vent destructeur ! <strong>Téléporte une pièce</strong> à une position aléatoire du plateau.",
    details: "Choisissez une pièce qui sera téléportée vers une case aléatoire libre. Peut créer des situations inattendues et tactiques. Inspiré des phénomènes météorologiques extrêmes.",
    image: "public/images/items/tornado.png",
    category: "téléportation"
  },
  {
    name: "Banane",
    key: "banana",
    weight: 5,
    description: "Piège glissant ! Place une <strong>banane sur une case vide</strong> qui fera glisser la prochaine pièce qui s'y arrête.",
    details: "La pièce qui atterrit sur la banane glisse vers la case suivante dans la direction de son mouvement. Peut créer des situations inattendues et tactiques. Inspiré de Mario Kart, la banane est un piège classique.",
    image: "public/images/items/banana.png",
    category: "piège"
  },
  {
    name: "Queue de Phoenix",
    key: "phoenix",
    weight: 2,
    description: "Renaissance ! <strong>Ressuscite une pièce perdue</strong> de votre faction.",
    details: "Choisissez une pièce que vous avez perdue pour la faire revenir sur le plateau. Parfait pour compenser les pertes ou renforcer votre armée. Inspiré de la mythologie du phénix.",
    image: "public/images/items/phoenix-down.png",
    category: "résurrection"
  },
  {
    name: "Cursor Sims",
    key: "cursor",
    weight: 3,
    description: "Contrôle total ! <strong>Prend le contrôle d'une pièce adverse</strong> pendant 1 tour.",
    details: "Vous pouvez déplacer la pièce adverse comme si c'était la vôtre. Idéal pour créer des situations tactiques ou éliminer des menaces. Inspiré de The Sims, ce curseur magique permet de manipuler les autres.",
    image: "public/images/items/cursor-sims.png",
    category: "contrôle"
  },
  {
    name: "Cœur",
    key: "heart",
    weight: 2,
    description: "Vie supplémentaire ! <strong>Protège une pièce</strong> de la capture pendant 2 tours.",
    details: "La pièce protégée ne peut pas être capturée, même par le roi adverse. Parfait pour protéger une pièce importante ou créer une diversion. Inspiré de The Legend of Zelda, le cœur apporte la protection divine.",
    image: "public/images/items/heart.png",
    category: "protection"
  },
  {
    name: "Sablière du Temps",
    key: "sandglass",
    weight: 3,
    description: "Le temps de l'adversaire s'effrite ! Réduit le <strong>chrono de tous les adversaires</strong> selon la taille du plateau.",
    details: "<strong>9×9 :</strong> -1 minute | <strong>11×11 :</strong> -2 minutes | <strong>15×15 :</strong> -3 minutes<br>Cet objet ne fonctionne que si le timer est activé. Inspiré de Prince of Persia: The Sands of Time, il permet de prendre l'avantage temporel sur ses ennemis.",
    image: "public/images/items/hourglass.png",
    category: "temps"
  },
  {
    name: "Masque de Majora",
    key: "mask",
    weight: 4,
    description: "Le masque maudit de Termina ! Force un <strong>adversaire à jouer une pièce spécifique</strong> lors de son prochain tour.",
    details: "Choisissez une pièce adverse que l'adversaire sera obligé de déplacer. L'effet disparaît après que la pièce ait joué. Inspiré de The Legend of Zelda: Majora's Mask, ce masque maléfique manipule les esprits.",
    image: "public/images/items/mask-majora.png",
    category: "contrôle"
  },
  {
    name: "Ocarina du Temps",
    key: "ocarina",
    weight: 3,
    description: "L'instrument magique d'Hyrule ! Transforme <strong>permanentement une pièce en cavalier</strong> (mouvements en L).",
    details: "Choisissez n'importe quelle pièce (alliée ou ennemie) qui se déplacera désormais comme un cavalier d'échecs. L'ocarina reste visible au-dessus de la pièce. Inspiré de The Legend of Zelda: Ocarina of Time, cet objet légendaire change les règles du jeu.",
    image: "public/images/items/oracina.png",
    category: "transformation"
  }
];

// Fonction pour obtenir les objets par catégorie
function getItemsByCategory(category) {
  return itemsData.filter(item => item.category === category);
}

// Fonction pour obtenir un objet par clé
function getItemByKey(key) {
  return itemsData.find(item => item.key === key);
}

// Fonction pour obtenir toutes les catégories
function getAllCategories() {
  return [...new Set(itemsData.map(item => item.category))];
}

// Fonction pour obtenir les poids des objets (pour le jeu)
function getItemWeights() {
  const weights = {};
  itemsData.forEach(item => {
    weights[item.key] = item.weight;
  });
  return weights;
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    itemsData,
    getItemsByCategory,
    getItemByKey,
    getAllCategories,
    getItemWeights
  };
}
