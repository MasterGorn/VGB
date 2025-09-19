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
  {
    name: "Bowser",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 8,
    tier: 4,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Roi des Koopas et ennemi juré de Mario. Se déplace dans toutes les directions sur 3 cases. Force brute et résistance exceptionnelles.",
    image: "public/images/nintendo/characters/bowser.png",
    type: "bowser"
  },
  {
    name: "Ganondorf",
    faction: "Nintendo",
    universe: "The Legend of Zelda",
    cost: 9,
    tier: 4,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Roi des Gerudos et incarnation du Mal. Se déplace dans toutes les directions sur 4 cases. Pouvoirs sombres et magie noire redoutables.",
    image: "public/images/nintendo/characters/ganondorf.png",
    type: "ganondorf"
  },
  {
    name: "Samus",
    faction: "Nintendo",
    universe: "Metroid",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Chasseuse de prime galactique. Se déplace dans toutes les directions sur 4 cases. Armure puissante et armes avancées.",
    image: "public/images/nintendo/characters/samus.png",
    type: "samus"
  },
  {
    name: "Pit",
    faction: "Nintendo",
    universe: "Kid Icarus",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Ange gardien de Palutena. Se déplace dans toutes les directions sur 3 cases. Vol et attaques à distance avec son arc.",
    image: "public/images/nintendo/characters/pit.png",
    type: "pit"
  },
  {
    name: "Palutena",
    faction: "Nintendo",
    universe: "Kid Icarus",
    cost: 8,
    tier: 4,
    range: 6,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Déesse de la Lumière et protectrice d'Angel Land. Se déplace dans toutes les directions sur 6 cases. Pouvoirs divins et magie sacrée.",
    image: "public/images/nintendo/characters/palutena.png",
    type: "palutena"
  },
  {
    name: "Sheik",
    faction: "Nintendo",
    universe: "The Legend of Zelda",
    cost: 5,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Identité secrète de Zelda. Se déplace en diagonale et en L sur 2 cases. Agilité et techniques ninja redoutables.",
    image: "public/images/nintendo/characters/sheik.png",
    type: "sheik"
  },
  {
    name: "Wario",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 4,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Cousin avare de Mario. Se déplace dans toutes les directions sur 2 cases. Force brute et résistance aux dégâts.",
    image: "public/images/nintendo/characters/wario.png",
    type: "wario"
  },
  {
    name: "Duo Duck Hunt",
    faction: "Nintendo",
    universe: "Duck Hunt",
    cost: 3,
    tier: 1,
    range: 5,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Chasseur et son canard fidèle. Se déplace en ligne droite sur 5 cases. Attaques à distance et travail d'équipe.",
    image: "public/images/nintendo/characters/duo-duck-hunt.png",
    type: "duo-duck-hunt"
  },
  {
    name: "Wii Fit Trainer",
    faction: "Nintendo",
    universe: "Wii Fit",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Instructeur de fitness Wii. Se déplace dans toutes les directions sur 2 cases. Équilibre et techniques de yoga.",
    image: "public/images/nintendo/characters/wii-fit-trainer.png",
    type: "wii-fit-trainer"
  },
  
  // === PERSONNAGES NINTENDO SUPPLÉMENTAIRES ===
  
  {
    name: "Luigi",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Frère de Mario. Se déplace dans toutes les directions sur 2 cases. Agilité et saut exceptionnels.",
    image: "public/images/nintendo/characters/luigi.png",
    type: "luigi"
  },
  {
    name: "Peach",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Princesse du Royaume Champignon. Se déplace dans toutes les directions sur 3 cases. Magie et grâce.",
    image: "public/images/nintendo/characters/peach.png",
    type: "peach"
  },
  {
    name: "Kirby",
    faction: "Nintendo",
    universe: "Kirby",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Étoile rose gourmande. Se déplace en ligne droite sur 3 cases. Absorption et copie d'aptitudes.",
    image: "public/images/nintendo/characters/kirby.png",
    type: "kirby"
  },
  {
    name: "King K. Rool",
    faction: "Nintendo",
    universe: "Donkey Kong",
    cost: 6,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Roi des Kremlings. Se déplace dans toutes les directions sur 3 cases. Force brute et ruse.",
    image: "public/images/nintendo/characters/king-k-rool.png",
    type: "king-k-rool"
  },
  {
    name: "Waluigi",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Cousin maléfique de Luigi. Se déplace dans toutes les directions sur 2 cases. Tricherie et malice.",
    image: "public/images/nintendo/characters/waluigi.png",
    type: "waluigi"
  },
  {
    name: "Captain Falcon",
    faction: "Nintendo",
    universe: "F-Zero",
    cost: 5,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Pilote de course F-Zero. Se déplace en ligne droite sur 4 cases. Vitesse et précision.",
    image: "public/images/nintendo/characters/captain-falcon.png",
    type: "captain-falcon"
  },
  {
    name: "Bayonetta",
    faction: "Nintendo",
    universe: "Bayonetta",
    cost: 8,
    tier: 4,
    range: 5,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Sorcière Umbra. Se déplace dans toutes les directions sur 5 cases. Magie noire et combat acrobatique.",
    image: "public/images/nintendo/characters/bayonetta.png",
    type: "bayonetta"
  },
  {
    name: "Banjo & Kazooie",
    faction: "Nintendo",
    universe: "Banjo-Kazooie",
    cost: 6,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Duo d'aventuriers. Se déplace en ligne droite sur 3 cases. Plateforme et collectibles.",
    image: "public/images/nintendo/characters/banjo-&.png",
    type: "banjo-kazooie"
  },
  {
    name: "Ayo et Oli",
    faction: "Nintendo",
    universe: "Splatoon",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Agents d'élite. Se déplace dans toutes les directions sur 3 cases. Encre et combat urbain.",
    image: "public/images/nintendo/characters/ayo-et-oli.png",
    type: "ayo-et-oli"
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
  
  // === PERSONNAGES PLAYSTATION SUPPLÉMENTAIRES ===
  
  {
    name: "Aloy",
    faction: "PlayStation",
    universe: "Horizon",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Chasseuse de machines. Se déplace en ligne droite sur 4 cases. Survie et technologie primitive.",
    image: "public/images/playstation/characters/aloy.png",
    type: "aloy"
  },
  {
    name: "Sackboy",
    faction: "PlayStation",
    universe: "LittleBigPlanet",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Héros en tissu. Se déplace dans toutes les directions sur 2 cases. Créativité et imagination.",
    image: "public/images/playstation/characters/sackboy.png",
    type: "sackboy"
  },
  {
    name: "Jak",
    faction: "PlayStation",
    universe: "Jak and Daxter",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Aventurier énergétique. Se déplace dans toutes les directions sur 3 cases. Aventure et énergie écologique.",
    image: "public/images/playstation/characters/jak.png",
    type: "jak"
  },
  {
    name: "Daxter",
    faction: "PlayStation",
    universe: "Jak and Daxter",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Compagnon ottsel. Se déplace en ligne et diagonale sur 2 cases. Agilité et humour.",
    image: "public/images/playstation/characters/daxter.png",
    type: "daxter"
  },
  {
    name: "Kat",
    faction: "PlayStation",
    universe: "Gravity Rush",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Maîtresse de la gravité. Se déplace en ligne droite sur 4 cases. Manipulation gravitationnelle.",
    image: "public/images/playstation/characters/kat.png",
    type: "kat"
  },
  {
    name: "Parappa",
    faction: "PlayStation",
    universe: "Parappa the Rapper",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Rappeur de papier. Se déplace dans toutes les directions sur 3 cases. Rythme et confiance.",
    image: "public/images/playstation/characters/parappa-the-rapper.png",
    type: "parappa"
  },
  {
    name: "Sam Porter Bridges",
    faction: "PlayStation",
    universe: "Death Stranding",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Livrer de l'espoir. Se déplace en ligne droite sur 3 cases. Livraison et connexion.",
    image: "public/images/playstation/characters/sam-porter-bridges (1).png",
    type: "sam-porter"
  },
  {
    name: "Ico",
    faction: "PlayStation",
    universe: "Ico",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Garçon aux cornes. Se déplace dans toutes les directions sur 3 cases. Protection et mystère.",
    image: "public/images/playstation/characters/ico (1).png",
    type: "ico"
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
  
  // === PERSONNAGES SEGA SUPPLÉMENTAIRES ===
  
  {
    name: "Tails",
    faction: "SEGA",
    universe: "Sonic the Hedgehog",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Renard volant. Se déplace dans toutes les directions sur 3 cases. Vol et ingénierie.",
    image: "public/images/sega/characters/tails.png",
    type: "tails"
  },
  {
    name: "Dr. Robotnik",
    faction: "SEGA",
    universe: "Sonic the Hedgehog",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Génie du mal. Se déplace dans toutes les directions sur 4 cases. Technologie et machines.",
    image: "public/images/sega/characters/dr.robotnik.png",
    type: "dr-robotnik"
  },
  {
    name: "Blaze Fielding",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Détective d'élite. Se déplace dans toutes les directions sur 3 cases. Arts martiaux et justice.",
    image: "public/images/sega/characters/blaze-fielding.png",
    type: "blaze-fielding"
  },
  {
    name: "Axel Stone",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Ex-policier. Se déplace en ligne droite sur 3 cases. Combat et justice.",
    image: "public/images/sega/characters/axel-stone.png",
    type: "axel-stone"
  },
  {
    name: "Adam Hunter",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Boxeur professionnel. Se déplace en ligne et diagonale sur 2 cases. Force et endurance.",
    image: "public/images/sega/characters/adam-hunter.png",
    type: "adam-hunter"
  },
  {
    name: "Hatsune Miku",
    faction: "SEGA",
    universe: "Vocaloid",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Idole virtuelle. Se déplace dans toutes les directions sur 4 cases. Musique et technologie.",
    image: "public/images/sega/characters/hatsune-miku.png",
    type: "hatsune-miku"
  },
  {
    name: "Sakura Shinguji",
    faction: "SEGA",
    universe: "Sakura Wars",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Capitaine de la Division des Fleurs. Se déplace dans toutes les directions sur 3 cases. Mecha et détermination.",
    image: "public/images/sega/characters/sakura-shinguji.png",
    type: "sakura-shinguji"
  },
  {
    name: "Vyse",
    faction: "SEGA",
    universe: "Skies of Arcadia",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Pirate du ciel. Se déplace en ligne droite sur 3 cases. Aventure et exploration.",
    image: "public/images/sega/characters/vyse.png",
    type: "vyse"
  },
  {
    name: "Aika",
    faction: "SEGA",
    universe: "Skies of Arcadia",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Navigatrice experte. Se déplace dans toutes les directions sur 3 cases. Navigation et magie.",
    image: "public/images/sega/characters/aika.png",
    type: "aika"
  },
  {
    name: "Amigo",
    faction: "SEGA",
    universe: "Samba de Amigo",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Singe musicien. Se déplace en ligne et diagonale sur 2 cases. Rythme et joie de vivre.",
    image: "public/images/sega/characters/amigo.png",
    type: "amigo"
  },
  {
    name: "Ecco the Dolphin",
    faction: "SEGA",
    universe: "Ecco the Dolphin",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Dauphin voyageur. Se déplace dans toutes les directions sur 3 cases. Nage et communication.",
    image: "public/images/sega/characters/ecco-the-dolphin.png",
    type: "ecco"
  },
  {
    name: "Pilote Hang-On",
    faction: "SEGA",
    universe: "Hang-On",
    cost: 3,
    tier: 2,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Pilote de moto. Se déplace en ligne droite sur 4 cases. Vitesse et précision.",
    image: "public/images/sega/characters/pilote-hang-on.png",
    type: "pilote-hang-on"
  },
  {
    name: "DJ Professeur K",
    faction: "SEGA",
    universe: "Jet Set Radio",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "DJ mystérieux. Se déplace dans toutes les directions sur 3 cases. Musique et culture urbaine.",
    image: "public/images/sega/characters/dj-professeur-k.png",
    type: "dj-professeur-k"
  },
  {
    name: "Ulala",
    faction: "SEGA",
    universe: "Space Channel 5",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Reporter intergalactique. Se déplace dans toutes les directions sur 3 cases. Danse et reportage.",
    image: "public/images/sega/characters/ulala.png",
    type: "ulala"
  },
  {
    name: "La Fille",
    faction: "SEGA",
    universe: "Feel the Magic: XY/XX",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Survivante zombie. Se déplace en ligne et diagonale sur 2 cases. Survie et horreur.",
    image: "public/images/sega/characters/la-fille.png",
    type: "la-fille"
  },
  {
    name: "Le Joueur",
    faction: "SEGA",
    universe: "Feel the Magic: XY/XX",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Agent de terrain. Se déplace en ligne et diagonale sur 2 cases. Combat et survie.",
    image: "public/images/sega/characters/le-joueur.png",
    type: "le-joueur"
  },
  {
    name: "Zombie",
    faction: "SEGA",
    universe: "The House of the Dead",
    cost: 2,
    tier: 1,
    range: 1,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Mort-vivant. Se déplace d'une case dans les 4 directions. Horreur et résistance.",
    image: "public/images/sega/characters/zombie-the-house-of-the-dead.png",
    type: "zombie"
  },
  {
    name: "Chupea",
    faction: "SEGA",
    universe: "ChuChu Rocket",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Souris spatiale. Se déplace en ligne et diagonale sur 2 cases. Agilité et stratégie.",
    image: "public/images/sega/characters/chupea.png",
    type: "chupea"
  },
  {
    name: "Chubach",
    faction: "SEGA",
    universe: "ChuChu Rocket",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Chat spatial. Se déplace en ligne et diagonale sur 2 cases. Ruse et agilité.",
    image: "public/images/sega/characters/chubach.png",
    type: "chubach"
  },
  {
    name: "Chuih",
    faction: "SEGA",
    universe: "ChuChu Rocket",
    cost: 1,
    tier: 1,
    range: 1,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Petite souris. Se déplace d'une case dans les 4 directions. Vitesse et discrétion.",
    image: "public/images/sega/characters/chuih.png",
    type: "chuih"
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
  },
  
  // === PERSONNAGES XBOX AVEC IMAGES DISPONIBLES ===
  
  // Halo Universe
  {
    name: "Cortana",
    faction: "Xbox",
    universe: "Halo",
    cost: 6,
    tier: 3,
    range: 5,
    moves: [[2,0], [-2,0], [0,2], [0,-2], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "IA artificielle de génie. Se déplace en L et en diagonale sur 5 cases. Intelligence artificielle et hacking.",
    image: "public/images/xbox/characters/cortana.png",
    type: "cortana"
  },
  {
    name: "Juno",
    faction: "Xbox",
    universe: "Halo",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Spartan-312. Se déplace en ligne droite sur 3 cases. Guerrière d'élite avec armure MJOLNIR.",
    image: "public/images/xbox/characters/juno.png",
    type: "juno"
  },
  
  // Gears of War Universe
  {
    name: "JD Fenix",
    faction: "Xbox",
    universe: "Gears of War",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Fils de Marcus Fenix. Se déplace en ligne droite sur 3 cases. Nouvelle génération de soldats Delta.",
    image: "public/images/xbox/characters/jd-fenix.png",
    type: "jd-fenix"
  },
  {
    name: "General Raam",
    faction: "Xbox",
    universe: "Gears of War",
    cost: 8,
    tier: 4,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Général Locust. Se déplace dans toutes les directions sur 4 cases. Commandant suprême des Locusts.",
    image: "public/images/xbox/characters/general-raam.png",
    type: "general-raam"
  },
  {
    name: "Cyclops Drone",
    faction: "Xbox",
    universe: "Gears of War",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Drone Locust. Se déplace en ligne et diagonale sur 2 cases. Soldat de base des Locusts.",
    image: "public/images/xbox/characters/cyclops-drone.png",
    type: "cyclops-drone"
  },
  
  // Ori Universe
  {
    name: "Ori",
    faction: "Xbox",
    universe: "Ori",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Esprit de la forêt. Se déplace en ligne droite sur 3 cases. Magie naturelle et agilité.",
    image: "public/images/xbox/characters/ori.png",
    type: "ori"
  },
  
  // Fable Universe
  {
    name: "Reaver",
    faction: "Xbox",
    universe: "Fable",
    cost: 7,
    tier: 4,
    range: 5,
    moves: [[2,0], [-2,0], [0,2], [0,-2], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Pirate immortel. Se déplace en L et en diagonale sur 5 cases. Immortalité et ruse.",
    image: "public/images/xbox/characters/reaver.png",
    type: "reaver"
  },
  
  // Hellblade Universe
  {
    name: "Senua",
    faction: "Xbox",
    universe: "Hellblade",
    cost: 8,
    tier: 4,
    range: 5,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Guerrière celtique. Se déplace dans toutes les directions sur 5 cases. Psychologie et mythologie.",
    image: "public/images/xbox/characters/senua.png",
    type: "senua"
  },
  
  // Killer Instinct Universe
  {
    name: "Jago",
    faction: "Xbox",
    universe: "Killer Instinct",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Guerrier ninja. Se déplace en ligne droite sur 3 cases. Arts martiaux et combos.",
    image: "public/images/xbox/characters/jago.png",
    type: "jago"
  },
  {
    name: "Orchid",
    faction: "Xbox",
    universe: "Killer Instinct",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Guerrière agile. Se déplace dans toutes les directions sur 3 cases. Agilité et rapidité.",
    image: "public/images/xbox/characters/orchid.png",
    type: "orchid"
  },
  
  // Sea of Thieves Universe
  {
    name: "Capitaine Flameheart",
    faction: "Xbox",
    universe: "Sea of Thieves",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Capitaine pirate légendaire. Se déplace dans toutes les directions sur 4 cases. Navigation et trésors.",
    image: "public/images/xbox/characters/capitaine-flameheart.png",
    type: "capitaine-flameheart"
  },
  {
    name: "Pirate",
    faction: "Xbox",
    universe: "Sea of Thieves",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Pirate de base. Se déplace en ligne et diagonale sur 2 cases. Navigation et aventure.",
    image: "public/images/xbox/characters/pirate.png",
    type: "pirate"
  },
  
  // Battletoads Universe
  {
    name: "Rash",
    faction: "Xbox",
    universe: "Battletoads",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Crapaud de combat. Se déplace en ligne droite sur 3 cases. Combat rapproché et acrobaties.",
    image: "public/images/xbox/characters/rash.png",
    type: "rash"
  },
  
  // Conker Universe
  {
    name: "Conker",
    faction: "Xbox",
    universe: "Conker",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Écureuil aventurier. Se déplace dans toutes les directions sur 3 cases. Aventure et humour.",
    image: "public/images/xbox/characters/conker.png",
    type: "conker"
  },
  
  // Blinx Universe
  {
    name: "Blinx",
    faction: "Xbox",
    universe: "Blinx",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Chat temporel. Se déplace en ligne droite sur 4 cases. Manipulation du temps et nettoyage.",
    image: "public/images/xbox/characters/blinx.png",
    type: "blinx"
  },
  
  // Crash Bandicoot Universe
  {
    name: "Crash Bandicoot",
    faction: "Xbox",
    universe: "Crash Bandicoot",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Bandicoot aventurier. Se déplace en ligne droite sur 3 cases. Plateforme et collectibles.",
    image: "public/images/xbox/characters/crash-bandicoot.png",
    type: "crash-bandicoot"
  },
  
  // Spyro Universe
  {
    name: "Spyro",
    faction: "Xbox",
    universe: "Spyro",
    cost: 5,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Dragon violet. Se déplace dans toutes les directions sur 4 cases. Vol et magie.",
    image: "public/images/xbox/characters/spyro.png",
    type: "spyro"
  },
  
  // Viva Piñata Universe
  {
    name: "Viva Piñata",
    faction: "Xbox",
    universe: "Viva Piñata",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Piñata colorée. Se déplace en ligne et diagonale sur 2 cases. Jardinage et créatures colorées.",
    image: "public/images/xbox/characters/viva-pinata.png",
    type: "viva-pinata"
  },
  
  // Recore Universe
  {
    name: "Joule Adams",
    faction: "Xbox",
    universe: "Recore",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Exploratrice de Far Eden. Se déplace dans toutes les directions sur 3 cases. Science-fiction et robots.",
    image: "public/images/xbox/characters/joule-adams.png",
    type: "joule-adams"
  },
  {
    name: "Steeve",
    faction: "Xbox",
    universe: "Recore",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Robot compagnon. Se déplace en ligne droite sur 3 cases. Technologie et loyauté.",
    image: "public/images/xbox/characters/steeve.png",
    type: "steeve"
  },
  
  // Sunset Overdrive Universe
  {
    name: "Cooper",
    faction: "Xbox",
    universe: "Sunset Overdrive",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Employé rebelle. Se déplace en ligne droite sur 3 cases. Style et énergie.",
    image: "public/images/xbox/characters/cooper.png",
    type: "cooper"
  },
  
  // Quantum Break Universe
  {
    name: "Hornet",
    faction: "Xbox",
    universe: "Quantum Break",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Agent temporel. Se déplace dans toutes les directions sur 4 cases. Manipulation temporelle.",
    image: "public/images/xbox/characters/hornet.png",
    type: "hornet"
  },
  
  // Grounded Universe
  {
    name: "Shu",
    faction: "Xbox",
    universe: "Grounded",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Adolescent rétréci. Se déplace en ligne et diagonale sur 2 cases. Survie microscopique.",
    image: "public/images/xbox/characters/shu.png",
    type: "shu"
  },
  
  // State of Decay Universe
  {
    name: "Lupus",
    faction: "Xbox",
    universe: "State of Decay",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Survivant de l'apocalypse. Se déplace en ligne et diagonale sur 2 cases. Survie et adaptation.",
    image: "public/images/xbox/characters/lupus.png",
    type: "lupus"
  },
  {
    name: "Moine",
    faction: "Xbox",
    universe: "State of Decay",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Moine survivant. Se déplace en ligne droite sur 3 cases. Sagesse et survie.",
    image: "public/images/xbox/characters/moine.png",
    type: "moine"
  },
  
  // Vela Universe
  {
    name: "Vela",
    faction: "Xbox",
    universe: "Vela",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Guerrière mystérieuse. Se déplace dans toutes les directions sur 3 cases. Combat et mystère.",
    image: "public/images/xbox/characters/vela.png",
    type: "vela"
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
