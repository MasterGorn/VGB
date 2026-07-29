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
    image: "/images/items/bobomb.png",
    category: "explosif"
  },
  {
    name: "Portails",
    nameKey: "portals-name",
    key: "portals",
    weight: 4,
    description: "portals-desc",
    details: "portals-details",
    image: "/images/items/portals.png",
    category: "téléportation"
  },
  {
    name: "Foudre",
    nameKey: "lightning-name",
    key: "lightning",
    weight: 1,
    description: "lightning-desc",
    details: "lightning-details",
    image: "/images/items/Lightning.png",
    category: "destruction"
  },
  {
    name: "Étoile",
    nameKey: "star-name",
    key: "star",
    weight: 2,
    description: "star-desc",
    details: "star-details",
    image: "/images/items/star.png",
    category: "invincibilité"
  },
  {
    name: "Tetrimino",
    nameKey: "tetrimino-name",
    key: "tetrimino",
    weight: 3,
    description: "tetrimino-desc",
    details: "tetrimino-details",
    image: "/images/items/tetrimino.png",
    category: "obstacle"
  },
  {
    name: "Tornade",
    nameKey: "tornado-name",
    key: "tornado",
    weight: 2,
    description: "tornado-desc",
    details: "tornado-details",
    image: "/images/items/tornado.png",
    category: "téléportation"
  },
  {
    name: "Banane",
    nameKey: "banana-name",
    key: "banana",
    weight: 5,
    description: "banana-desc",
    details: "banana-details",
    image: "/images/items/banana.png",
    category: "piège"
  },
  {
    name: "Queue de Phoenix",
    nameKey: "phoenix-name",
    key: "phoenix",
    weight: 2,
    description: "phoenix-desc",
    details: "phoenix-details",
    image: "/images/items/phoenix-down.png",
    category: "résurrection"
  },
  {
    name: "Cursor Sims",
    nameKey: "cursor-name",
    key: "cursor",
    weight: 3,
    description: "cursor-desc",
    details: "cursor-details",
    image: "/images/items/sims-cursor.png",
    category: "contrôle"
  },
  {
    name: "Cœur",
    nameKey: "heart-name",
    key: "heart",
    weight: 2,
    description: "heart-desc",
    details: "heart-details",
    image: "/images/items/heart.png",
    category: "protection"
  },
  {
    name: "Sablière du Temps",
    nameKey: "sandglass-name",
    key: "sandglass",
    weight: 3,
    description: "sandglass-desc",
    details: "sandglass-details",
    image: "/images/items/hourglass.png",
    category: "temps"
  },
  {
    name: "Masque de Majora",
    nameKey: "mask-name",
    key: "mask",
    weight: 4,
    description: "mask-desc",
    details: "mask-details",
    image: "/images/items/mask-majora.png",
    category: "contrôle"
  },
  {
    name: "Ocarina du Temps",
    nameKey: "ocarina-name",
    key: "ocarina",
    weight: 3,
    description: "ocarina-desc",
    details: "ocarina-details",
    image: "/images/items/oracina.png",
    category: "transformation"
  },
  {
    name: "Objection",
    nameKey: "objection-name",
    key: "objection",
    weight: 3,
    description: "objection-desc",
    details: "objection-details",
    image: "/images/items/objection.png",
    category: "temps"
  },
  {
    name: "Chaussures de Sonic",
    nameKey: "sonic-shoes-name",
    key: "sonic-shoes",
    weight: 2,
    description: "sonic-shoes-desc",
    details: "sonic-shoes-details",
    image: "/images/items/Sonic-shoe.png",
    category: "mouvement"
  },
  {
    name: "Tourelle",
    nameKey: "turret-name",
    key: "turret",
    weight: 3,
    description: "turret-desc",
    details: "turret-details",
    image: "/images/items/turret.png",
    category: "piège"
  },
  {
    name: "Bombe de peinture",
    nameKey: "paint-bomb-name",
    key: "paint-bomb",
    weight: 3,
    description: "paint-bomb-desc",
    details: "paint-bomb-details",
    image: "/images/items/spray-paint-can.png",
    category: "obstacle"
  },
  {
    name: "Pokéball",
    nameKey: "pokeball-name",
    key: "pokeball",
    weight: 2,
    description: "pokeball-desc",
    details: "pokeball-details",
    image: "/images/items/pokeball.png",
    category: "invocation"
  },
  {
    name: "Carton",
    nameKey: "cardboard-name",
    key: "cardboard",
    weight: 3,
    description: "cardboard-desc",
    details: "cardboard-details",
    image: "/images/items/cardboard.png",
    category: "camouflage"
  },
  {
    name: "Mine de proximité",
    nameKey: "proximity-mine-name",
    key: "proximity-mine",
    weight: 3,
    description: "proximity-mine-desc",
    details: "proximity-mine-details",
    image: "/images/items/local-mine.png",
    category: "explosif"
  },
  {
    name: "Fausse caisse",
    nameKey: "fake-crate-name",
    key: "fake-crate",
    weight: 0,
    description: "fake-crate-desc",
    details: "fake-crate-details",
    image: "/images/items/false-box-item-mario-kart.png",
    category: "piège"
  },
  {
    name: "Potion de mana",
    nameKey: "mana-potion-name",
    key: "mana-potion",
    weight: 3,
    description: "mana-potion-desc",
    details: "mana-potion-details",
    image: "/images/items/mana-potion.png",
    category: "bonus"
  },
  {
    name: "Cerise",
    nameKey: "cherry-name",
    key: "cherry",
    weight: 3,
    description: "cherry-desc",
    details: "cherry-details",
    image: "/images/items/cherry.png",
    category: "bonus"
  },
  {
    name: "Mur de la Tempête",
    nameKey: "storm-wall-name",
    key: "storm-wall",
    weight: 2,
    description: "storm-wall-desc",
    details: "storm-wall-details",
    image: "/images/items/storm-wall.png",
    category: "destruction"
  },
  {
    name: "Golden Gun",
    nameKey: "golden-gun-name",
    key: "golden-gun",
    weight: 1,
    description: "golden-gun-desc",
    details: "golden-gun-details",
    image: "/images/items/golden-gun.png",
    category: "destruction"
  },
  {
    name: "Pied de biche",
    nameKey: "crowbar-name",
    key: "crowbar",
    weight: 3,
    description: "crowbar-desc",
    details: "crowbar-details",
    image: "/images/items/crowbar.png",
    category: "destruction"
  }
];

// Fonction pour normaliser le chemin d'image d'un objet (Next.js / statique)
function getItemImageUrl(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('/')) return imagePath;
  if (imagePath.startsWith('public/')) return '/' + imagePath.slice('public/'.length);
  return '/images/items/' + imagePath.replace(/^\/+/, '');
}

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
    getItemWeights,
    getItemImageUrl
  };
} else {
  // Export global pour le navigateur
  window.itemsData = itemsData;
  window.getItemsByCategory = getItemsByCategory;
  window.getItemByKey = getItemByKey;
  window.getAllCategories = getAllCategories;
  window.getItemWeights = getItemWeights;
  window.getItemImageUrl = getItemImageUrl;
}
