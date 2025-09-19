// ========================================
// DONNÉES DES OBJETS - VIDEO GAMES BATTLE
// ========================================

// Données des objets avec informations détaillées (correspondant au jeu)
const itemsData = [
  {
    name: "Bob-omb",
    nameKey: "bobomb-name",
    key: "bobomb",
    weight: 4,
    description: "bobomb-desc",
    details: "bobomb-details",
    image: "public/images/items/bobomb.png",
    category: "explosif"
  },
  {
    name: "Portails",
    nameKey: "portals-name",
    key: "portals",
    weight: 4,
    description: "portals-desc",
    details: "portals-details",
    image: "public/images/items/portals.png",
    category: "téléportation"
  },
  {
    name: "Foudre",
    nameKey: "lightning-name",
    key: "lightning",
    weight: 1,
    description: "lightning-desc",
    details: "lightning-details",
    image: "public/images/items/lightning.png",
    category: "destruction"
  },
  {
    name: "Étoile",
    nameKey: "star-name",
    key: "star",
    weight: 2,
    description: "star-desc",
    details: "star-details",
    image: "public/images/items/star.png",
    category: "révélation"
  },
  {
    name: "Tetrimino",
    nameKey: "tetrimino-name",
    key: "tetrimino",
    weight: 3,
    description: "tetrimino-desc",
    details: "tetrimino-details",
    image: "public/images/items/tetrimino.png",
    category: "obstacle"
  },
  {
    name: "Tornade",
    nameKey: "tornado-name",
    key: "tornado",
    weight: 2,
    description: "tornado-desc",
    details: "tornado-details",
    image: "public/images/items/tornado.png",
    category: "téléportation"
  },
  {
    name: "Banane",
    nameKey: "banana-name",
    key: "banana",
    weight: 5,
    description: "banana-desc",
    details: "banana-details",
    image: "public/images/items/banana.png",
    category: "piège"
  },
  {
    name: "Queue de Phoenix",
    nameKey: "phoenix-name",
    key: "phoenix",
    weight: 2,
    description: "phoenix-desc",
    details: "phoenix-details",
    image: "public/images/items/phoenix-down.png",
    category: "résurrection"
  },
  {
    name: "Cursor Sims",
    nameKey: "cursor-name",
    key: "cursor",
    weight: 3,
    description: "cursor-desc",
    details: "cursor-details",
    image: "public/images/items/sims-cursor.png",
    category: "contrôle"
  },
  {
    name: "Cœur",
    nameKey: "heart-name",
    key: "heart",
    weight: 2,
    description: "heart-desc",
    details: "heart-details",
    image: "public/images/items/heart.png",
    category: "protection"
  },
  {
    name: "Sablière du Temps",
    nameKey: "sandglass-name",
    key: "sandglass",
    weight: 3,
    description: "sandglass-desc",
    details: "sandglass-details",
    image: "public/images/items/hourglass.png",
    category: "temps"
  },
  {
    name: "Masque de Majora",
    nameKey: "mask-name",
    key: "mask",
    weight: 4,
    description: "mask-desc",
    details: "mask-details",
    image: "public/images/items/mask-majora.png",
    category: "contrôle"
  },
  {
    name: "Ocarina du Temps",
    nameKey: "ocarina-name",
    key: "ocarina",
    weight: 3,
    description: "ocarina-desc",
    details: "ocarina-details",
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
} else {
  // Export global pour le navigateur
  window.itemsData = itemsData;
  window.getItemsByCategory = getItemsByCategory;
  window.getItemByKey = getItemByKey;
  window.getAllCategories = getAllCategories;
  window.getItemWeights = getItemWeights;
}
