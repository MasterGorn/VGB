// ========================================
// DONNÉES DES PIÈCES - VIDEO GAMES BATTLE
// ========================================

// Données des pièces avec informations détaillées (correspondant au jeu)
const piecesData = [
  // Rois (toutes factions)
  {
    name: "Roi Nintendo",
    nameKey: "king-nintendo",
    faction: "Nintendo",
    universe: "Nintendo",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de Nintendo. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    descriptionKey: "king-nintendo-desc",
    image: "public/images/nintendo/characters/king.png",
    type: "king"
  },
  {
    name: "Roi PlayStation",
    nameKey: "king-playstation",
    faction: "PlayStation",
    universe: "PlayStation",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de PlayStation. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    descriptionKey: "king-playstation-desc",
    image: "public/images/playstation/characters/king.png",
    type: "king"
  },
  {
    name: "Roi SEGA",
    nameKey: "king-sega",
    faction: "SEGA",
    universe: "SEGA",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de SEGA. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    descriptionKey: "king-sega-desc",
    image: "public/images/sega/characters/king.png",
    type: "king"
  },
  {
    name: "Roi Xbox",
    nameKey: "king-xbox",
    faction: "Xbox",
    universe: "Xbox",
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]],
    description: "Le roi de Xbox. Se déplace d'une case dans toutes les directions. Capturer le roi adverse fait gagner la partie.",
    descriptionKey: "king-xbox-desc",
    image: "public/images/xbox/characters/king.png",
    type: "king"
  },
  
  // Nintendo
  {
    name: "Link",
    nameKey: "link",
    faction: "Nintendo", 
    universe: "The Legend of Zelda",
    cost: 5,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Le héros légendaire d'Hyrule, porteur de l'Épée de Légende. Maître de l'épée et de la magie, il se déplace en ligne droite sur 3 cases maximum. Sa bravoure et sa sagesse en font un adversaire redoutable.",
    descriptionKey: "link-desc",
    image: "public/images/nintendo/characters/link.png",
    type: "link"
  },
  {
    name: "Mario",
    nameKey: "mario",
    faction: "Nintendo",
    universe: "Super Mario", 
    cost: 3,
    tier: 1,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Le plombier le plus célèbre du monde, héros de l'univers Nintendo. Se déplace en diagonale sur 2 cases avec une agilité et des capacités de saut exceptionnelles. Sa détermination et son courage en font un combattant redoutable.",
    descriptionKey: "mario-desc",
    image: "public/images/nintendo/characters/mario.png",
    type: "mario"
  },
  {
    name: "Zelda",
    nameKey: "zelda",
    faction: "Nintendo",
    universe: "The Legend of Zelda",
    cost: 7,
    tier: 3,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Princesse d'Hyrule et gardienne de la Triforce de la Sagesse. Maîtresse des arts magiques, elle se déplace dans toutes les directions sur 8 cases avec une puissance magique immense. Sa sagesse et ses pouvoirs divins en font une adversaire redoutable.",
    descriptionKey: "zelda-desc",
    image: "public/images/nintendo/characters/zelda.png",
    type: "zelda"
  },
  {
    name: "Bowser",
    nameKey: "bowser",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 8,
    tier: 4,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Roi des Koopas et ennemi juré de Mario. Ce dragon-tortue géant se déplace dans toutes les directions sur 3 cases avec une force brute et une résistance exceptionnelles. Sa puissance destructrice et sa ténacité en font un adversaire redoutable.",
    descriptionKey: "bowser-desc",
    image: "public/images/nintendo/characters/bowser.png",
    type: "bowser"
  },
  {
    name: "Ganondorf",
    nameKey: "ganondorf",
    faction: "Nintendo",
    universe: "The Legend of Zelda",
    cost: 9,
    tier: 4,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Roi des Gerudos et incarnation du Mal, porteur de la Triforce du Pouvoir. Maître des arts sombres, il se déplace dans toutes les directions sur 4 cases avec des pouvoirs sombres et une magie noire redoutables. Sa soif de pouvoir et sa malveillance en font l'ennemi ultime.",
    descriptionKey: "ganondorf-desc",
    image: "public/images/nintendo/characters/ganondorf.png",
    type: "ganondorf"
  },
  {
    name: "Samus",
    nameKey: "samus",
    faction: "Nintendo",
    universe: "Metroid",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Chasseuse de prime galactique légendaire, protégée par une armure de combat avancée. Se déplace dans toutes les directions sur 4 cases avec une puissance de feu et une technologie de pointe. Sa détermination et ses capacités de combat en font une adversaire redoutable.",
    descriptionKey: "samus-desc",
    image: "public/images/nintendo/characters/samus.png",
    type: "samus"
  },
  {
    name: "Pit",
    nameKey: "pit",
    faction: "Nintendo",
    universe: "Kid Icarus",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Ange gardien de Palutena, commandant de l'armée céleste. Se déplace dans toutes les directions sur 3 cases avec des capacités de vol et des attaques à distance avec son arc divin. Sa loyauté et sa bravoure en font un combattant redoutable.",
    descriptionKey: "pit-desc",
    image: "public/images/nintendo/characters/pit.png",
    type: "pit"
  },
  {
    name: "Palutena",
    nameKey: "palutena",
    faction: "Nintendo",
    universe: "Kid Icarus",
    cost: 8,
    tier: 4,
    range: 6,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Déesse de la Lumière et protectrice d'Angel Land, souveraine des cieux. Se déplace dans toutes les directions sur 6 cases avec des pouvoirs divins et une magie sacrée incomparable. Sa sagesse divine et sa puissance en font une adversaire redoutable.",
    descriptionKey: "palutena-desc",
    image: "public/images/nintendo/characters/palutena.png",
    type: "palutena"
  },
  {
    name: "Sheik",
    nameKey: "sheik",
    faction: "Nintendo",
    universe: "The Legend of Zelda",
    cost: 5,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Identité secrète de Zelda, maître des arts ninja. Se déplace en diagonale et en L sur 2 cases avec une agilité et des techniques ninja redoutables. Sa discrétion et sa rapidité en font un adversaire redoutable.",
    descriptionKey: "sheik-desc",
    image: "public/images/nintendo/characters/sheik.png",
    type: "sheik"
  },
  {
    name: "Wario",
    nameKey: "wario",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 4,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Cousin avare et malveillant de Mario, entrepreneur cupide. Se déplace dans toutes les directions sur 2 cases avec une force brute et une résistance aux dégâts exceptionnelles. Sa cupidité et sa ténacité en font un adversaire redoutable.",
    descriptionKey: "wario-desc",
    image: "public/images/nintendo/characters/wario.png",
    type: "wario"
  },
  {
    name: "Duo Duck Hunt",
    nameKey: "duo-duck-hunt",
    faction: "Nintendo",
    universe: "Duck Hunt",
    cost: 3,
    tier: 1,
    range: 5,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Chasseur et son canard fidèle. Se déplace en ligne droite sur 5 cases. Attaques à distance et travail d'équipe.",
    descriptionKey: "duo-duck-hunt-desc",
    image: "public/images/nintendo/characters/duo-duck-hunt.png",
    type: "duo-duck-hunt"
  },
  {
    name: "Wii Fit Trainer",
    nameKey: "wii-fit-trainer",
    faction: "Nintendo",
    universe: "Wii Fit",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Instructeur de fitness Wii. Se déplace dans toutes les directions sur 2 cases. Équilibre et techniques de yoga.",
    descriptionKey: "wii-fit-trainer-desc",
    image: "public/images/nintendo/characters/wii-fit-trainer.png",
    type: "wii-fit-trainer"
  },
  
  // === PERSONNAGES NINTENDO SUPPLÉMENTAIRES ===
  
  {
    name: "Luigi",
    nameKey: "luigi",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Frère loyal de Mario, héros en vert. Se déplace dans toutes les directions sur 2 cases avec une agilité et des capacités de saut exceptionnelles. Sa loyauté et son courage timide mais déterminé en font un allié précieux.",
    descriptionKey: "luigi-desc",
    image: "public/images/nintendo/characters/luigi.png",
    type: "luigi"
  },
  {
    name: "Peach",
    nameKey: "peach",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Princesse du Royaume Champignon, souveraine bienveillante. Se déplace dans toutes les directions sur 3 cases avec grâce et pouvoirs magiques. Sa gentillesse et sa détermination cachent une force redoutable.",
    descriptionKey: "peach-desc",
    image: "public/images/nintendo/characters/peach.png",
    type: "peach"
  },
  {
    name: "Kirby",
    nameKey: "kirby",
    faction: "Nintendo",
    universe: "Kirby",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Étoile rose gourmande de la planète Pop Star. Se déplace en ligne droite sur 3 cases avec des capacités d'absorption et de copie d'aptitudes uniques. Sa nature joyeuse cache un pouvoir redoutable.",
    descriptionKey: "kirby-desc",
    image: "public/images/nintendo/characters/kirby.png",
    type: "kirby"
  },
  {
    name: "King K. Rool",
    nameKey: "king-k-rool",
    faction: "Nintendo",
    universe: "Donkey Kong",
    cost: 6,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Roi des Kremlings. Se déplace dans toutes les directions sur 3 cases. Force brute et ruse.",
    descriptionKey: "king-k-rool-desc",
    image: "public/images/nintendo/characters/king-k-rool.png",
    type: "king-k-rool"
  },
  {
    name: "Waluigi",
    nameKey: "waluigi",
    faction: "Nintendo",
    universe: "Super Mario",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Cousin maléfique de Luigi. Se déplace dans toutes les directions sur 2 cases. Tricherie et malice.",
    descriptionKey: "waluigi-desc",
    image: "public/images/nintendo/characters/waluigi.png",
    type: "waluigi"
  },
  {
    name: "Captain Falcon",
    nameKey: "captain-falcon",
    faction: "Nintendo",
    universe: "F-Zero",
    cost: 5,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Pilote de course F-Zero. Se déplace en ligne droite sur 4 cases. Vitesse et précision.",
    descriptionKey: "captain-falcon-desc",
    image: "public/images/nintendo/characters/captain-falcon.png",
    type: "captain-falcon"
  },
  {
    name: "Bayonetta",
    nameKey: "bayonetta",
    faction: "Nintendo",
    universe: "Bayonetta",
    cost: 8,
    tier: 4,
    range: 5,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Sorcière Umbra. Se déplace dans toutes les directions sur 5 cases. Magie noire et combat acrobatique.",
    descriptionKey: "bayonetta-desc",
    image: "public/images/nintendo/characters/bayonetta.png",
    type: "bayonetta"
  },
  {
    name: "Banjo & Kazooie",
    nameKey: "banjo-kazooie",
    faction: "Xbox",
    universe: "Banjo-Kazooie",
    cost: 6,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Duo d'aventuriers. Se déplace en ligne droite sur 3 cases. Plateforme et collectibles.",
    descriptionKey: "banjo-kazooie-desc",
    image: "public/images/xbox/characters/banjo-et-kazooie.png",
    type: "banjo-kazooie"
  },
  {
    name: "Ayo et Oli",
    nameKey: "ayo-oli",
    faction: "Nintendo",
    universe: "Splatoon",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Agents d'élite. Se déplace dans toutes les directions sur 3 cases. Encre et combat urbain.",
    descriptionKey: "ayo-oli-desc",
    image: "public/images/nintendo/characters/ayo-et-oli.png",
    type: "ayo-et-oli"
  },
  
  // PlayStation
  {
    name: "Nathan Drake",
    nameKey: "nathan-drake",
    faction: "PlayStation",
    universe: "Uncharted",
    cost: 5,
    tier: 1,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Chasseur de trésors intrépide et aventurier charismatique. Se déplace en ligne droite sur 3 cases avec une agilité et une ruse exceptionnelles au service de l'aventure. Son charme et son courage téméraire en font un héros irrésistible.",
    descriptionKey: "nathan-drake-desc",
    image: "public/images/playstation/characters/nathan-drake.png",
    type: "nathan-drake"
  },
  {
    name: "Kratos",
    nameKey: "kratos",
    faction: "PlayStation",
    universe: "God of War",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Ancien Dieu de la Guerre spartiate, guerrier légendaire. Se déplace en diagonale sur 2 cases avec une force brute et une rage destructrice incomparables. Sa détermination et sa fureur en font un combattant redoutable.",
    descriptionKey: "kratos-desc",
    image: "public/images/playstation/characters/kratos.png",
    type: "kratos"
  },
  {
    name: "Astro Bot",
    nameKey: "astro-bot",
    faction: "PlayStation",
    universe: "Astro's Playroom",
    cost: 7,
    tier: 3,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Robot mascotte de PlayStation. Se déplace dans toutes les directions sur 8 cases. Technologie et innovation.",
    descriptionKey: "astro-bot-desc",
    image: "public/images/playstation/characters/astro-bot.png",
    type: "astro-bot"
  },
  
  // === PERSONNAGES PLAYSTATION SUPPLÉMENTAIRES ===
  
  {
    name: "Aloy",
    nameKey: "aloy",
    faction: "PlayStation",
    universe: "Horizon",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Chasseuse de machines. Se déplace en ligne droite sur 4 cases. Survie et technologie primitive.",
    descriptionKey: "aloy-desc",
    image: "public/images/playstation/characters/aloy.png",
    type: "aloy"
  },
  {
    name: "Sackboy",
    nameKey: "sackboy",
    faction: "PlayStation",
    universe: "LittleBigPlanet",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Héros en tissu. Se déplace dans toutes les directions sur 2 cases. Créativité et imagination.",
    descriptionKey: "sackboy-desc",
    image: "public/images/playstation/characters/sackboy.png",
    type: "sackboy"
  },
  {
    name: "Jak",
    nameKey: "jak",
    faction: "PlayStation",
    universe: "Jak and Daxter",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Aventurier énergétique. Se déplace dans toutes les directions sur 3 cases. Aventure et énergie écologique.",
    descriptionKey: "jak-desc",
    image: "public/images/playstation/characters/jak.png",
    type: "jak"
  },
  {
    name: "Daxter",
    nameKey: "daxter",
    faction: "PlayStation",
    universe: "Jak and Daxter",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Compagnon ottsel. Se déplace en ligne et diagonale sur 2 cases. Agilité et humour.",
    descriptionKey: "daxter-desc",
    image: "public/images/playstation/characters/daxter.png",
    type: "daxter"
  },
  {
    name: "Kat",
    nameKey: "kat",
    faction: "PlayStation",
    universe: "Gravity Rush",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Maîtresse de la gravité. Se déplace en ligne droite sur 4 cases. Manipulation gravitationnelle.",
    descriptionKey: "kat-desc",
    image: "public/images/playstation/characters/kat.png",
    type: "kat"
  },
  {
    name: "Parappa",
    nameKey: "parappa",
    faction: "PlayStation",
    universe: "Parappa the Rapper",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Rappeur de papier. Se déplace dans toutes les directions sur 3 cases. Rythme et confiance.",
    descriptionKey: "parappa-desc",
    image: "public/images/playstation/characters/parappa-the-rapper.png",
    type: "parappa"
  },
  {
    name: "Sam Porter Bridges",
    nameKey: "sam-porter-bridges",
    faction: "PlayStation",
    universe: "Death Stranding",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Livrer de l'espoir. Se déplace en ligne droite sur 3 cases. Livraison et connexion.",
    descriptionKey: "sam-porter-bridges-desc",
    image: "public/images/playstation/characters/sam-porter-bridges.png",
    type: "sam-porter"
  },
  {
    name: "Ico",
    nameKey: "ico",
    faction: "PlayStation",
    universe: "Ico",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Garçon aux cornes. Se déplace dans toutes les directions sur 3 cases. Protection et mystère.",
    descriptionKey: "ico-desc",
    image: "public/images/playstation/characters/ico.png",
    type: "ico"
  },
  
  // SEGA
  {
    name: "Sonic",
    nameKey: "sonic",
    faction: "SEGA",
    universe: "Sonic the Hedgehog",
    cost: 5,
    tier: 1,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Hérisson bleu légendaire, le plus rapide du monde. Se déplace en ligne droite sur 3 cases avec une vitesse et une agilité exceptionnelles. Son attitude cool et sa détermination en font un héros irrésistible.",
    descriptionKey: "sonic-desc",
    image: "public/images/sega/characters/sonic.png",
    type: "sonic"
  },
  {
    name: "Ryo",
    nameKey: "ryo",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Flic de Metro City. Se déplace en diagonale sur 2 cases. Combat au corps à corps redoutable.",
    descriptionKey: "ryo-desc",
    image: "public/images/sega/characters/ryo.png",
    type: "ryo"
  },
  {
    name: "Joe Musashi",
    nameKey: "joe-musashi",
    faction: "SEGA",
    universe: "Shinobi",
    cost: 7,
    tier: 3,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Ninja légendaire. Se déplace dans toutes les directions sur 8 cases. Arts martiaux et techniques secrètes.",
    descriptionKey: "joe-musashi-desc",
    image: "public/images/sega/characters/joe-musashi.png",
    type: "joe-musashi"
  },
  
  // === PERSONNAGES SEGA SUPPLÉMENTAIRES ===
  
  {
    name: "Tails",
    nameKey: "tails",
    faction: "SEGA",
    universe: "Sonic the Hedgehog",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Renard volant. Se déplace dans toutes les directions sur 3 cases. Vol et ingénierie.",
    descriptionKey: "tails-desc",
    image: "public/images/sega/characters/tails.png",
    type: "tails"
  },
  {
    name: "Dr. Robotnik",
    nameKey: "dr-robotnik",
    faction: "SEGA",
    universe: "Sonic the Hedgehog",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Génie du mal. Se déplace dans toutes les directions sur 4 cases. Technologie et machines.",
    descriptionKey: "dr-robotnik-desc",
    image: "public/images/sega/characters/dr.robotnik.png",
    type: "dr-robotnik"
  },
  {
    name: "Blaze Fielding",
    nameKey: "blaze-fielding",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Détective d'élite. Se déplace dans toutes les directions sur 3 cases. Arts martiaux et justice.",
    descriptionKey: "blaze-fielding-desc",
    image: "public/images/sega/characters/blaze-fielding.png",
    type: "blaze-fielding"
  },
  {
    name: "Axel Stone",
    nameKey: "axel-stone",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Ex-policier. Se déplace en ligne droite sur 3 cases. Combat et justice.",
    descriptionKey: "axel-stone-desc",
    image: "public/images/sega/characters/axel-stone.png",
    type: "axel-stone"
  },
  {
    name: "Adam Hunter",
    nameKey: "adam-hunter",
    faction: "SEGA",
    universe: "Streets of Rage",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Boxeur professionnel. Se déplace en ligne et diagonale sur 2 cases. Force et endurance.",
    descriptionKey: "adam-hunter-desc",
    image: "public/images/sega/characters/adam-hunter.png",
    type: "adam-hunter"
  },
  {
    name: "Hatsune Miku",
    nameKey: "hatsune-miku",
    faction: "SEGA",
    universe: "Vocaloid",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Idole virtuelle. Se déplace dans toutes les directions sur 4 cases. Musique et technologie.",
    descriptionKey: "hatsune-miku-desc",
    image: "public/images/sega/characters/hatsune-miku.png",
    type: "hatsune-miku"
  },
  {
    name: "Sakura Shinguji",
    nameKey: "sakura-shinguji",
    faction: "SEGA",
    universe: "Sakura Wars",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Capitaine de la Division des Fleurs. Se déplace dans toutes les directions sur 3 cases. Mecha et détermination.",
    descriptionKey: "sakura-shinguji-desc",
    image: "public/images/sega/characters/sakura-shinguji.png",
    type: "sakura-shinguji"
  },
  {
    name: "Vyse",
    nameKey: "vyse",
    faction: "SEGA",
    universe: "Skies of Arcadia",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Pirate du ciel. Se déplace en ligne droite sur 3 cases. Aventure et exploration.",
    descriptionKey: "vyse-desc",
    image: "public/images/sega/characters/vyse.png",
    type: "vyse"
  },
  {
    name: "Aika",
    nameKey: "aika",
    faction: "SEGA",
    universe: "Skies of Arcadia",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Navigatrice experte. Se déplace dans toutes les directions sur 3 cases. Navigation et magie.",
    descriptionKey: "aika-desc",
    image: "public/images/sega/characters/aika.png",
    type: "aika"
  },
  {
    name: "Amigo",
    nameKey: "amigo",
    faction: "SEGA",
    universe: "Samba de Amigo",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Singe musicien. Se déplace en ligne et diagonale sur 2 cases. Rythme et joie de vivre.",
    descriptionKey: "amigo-desc",
    image: "public/images/sega/characters/amigo.png",
    type: "amigo"
  },
  {
    name: "Ecco the Dolphin",
    nameKey: "ecco-dolphin",
    faction: "SEGA",
    universe: "Ecco the Dolphin",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Dauphin voyageur. Se déplace dans toutes les directions sur 3 cases. Nage et communication.",
    descriptionKey: "ecco-dolphin-desc",
    image: "public/images/sega/characters/ecco-the-dolphin.png",
    type: "ecco"
  },
  {
    name: "Pilote Hang-On",
    nameKey: "pilote-hang-on",
    faction: "SEGA",
    universe: "Hang-On",
    cost: 3,
    tier: 2,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Pilote de moto. Se déplace en ligne droite sur 4 cases. Vitesse et précision.",
    descriptionKey: "pilote-hang-on-desc",
    image: "public/images/sega/characters/pilote-hang-on.png",
    type: "pilote-hang-on"
  },
  {
    name: "DJ Professeur K",
    nameKey: "dj-professeur-k",
    faction: "SEGA",
    universe: "Jet Set Radio",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "DJ mystérieux. Se déplace dans toutes les directions sur 3 cases. Musique et culture urbaine.",
    descriptionKey: "dj-professeur-k-desc",
    image: "public/images/sega/characters/dj-professeur-k.png",
    type: "dj-professeur-k"
  },
  {
    name: "Ulala",
    nameKey: "ulala",
    faction: "SEGA",
    universe: "Space Channel 5",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Reporter intergalactique. Se déplace dans toutes les directions sur 3 cases. Danse et reportage.",
    descriptionKey: "ulala-desc",
    image: "public/images/sega/characters/ulala.png",
    type: "ulala"
  },
  {
    name: "La Fille",
    nameKey: "la-fille",
    faction: "SEGA",
    universe: "Feel the Magic: XY/XX",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Survivante zombie. Se déplace en ligne et diagonale sur 2 cases. Survie et horreur.",
    descriptionKey: "la-fille-desc",
    image: "public/images/sega/characters/la-fille.png",
    type: "la-fille"
  },
  {
    name: "Le Joueur",
    nameKey: "le-joueur",
    faction: "SEGA",
    universe: "Feel the Magic: XY/XX",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Agent de terrain. Se déplace en ligne et diagonale sur 2 cases. Combat et survie.",
    descriptionKey: "le-joueur-desc",
    image: "public/images/sega/characters/le-joueur.png",
    type: "le-joueur"
  },
  {
    name: "Zombie",
    nameKey: "zombie",
    faction: "SEGA",
    universe: "The House of the Dead",
    cost: 2,
    tier: 1,
    range: 1,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Mort-vivant. Se déplace d'une case dans les 4 directions. Horreur et résistance.",
    descriptionKey: "zombie-desc",
    image: "public/images/sega/characters/zombie-the-house-of-the-dead.png",
    type: "zombie"
  },
  {
    name: "Chupea",
    nameKey: "chupea",
    faction: "SEGA",
    universe: "ChuChu Rocket",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Souris spatiale. Se déplace en ligne et diagonale sur 2 cases. Agilité et stratégie.",
    descriptionKey: "chupea-desc",
    image: "public/images/sega/characters/chupea.png",
    type: "chupea"
  },
  {
    name: "Chubach",
    nameKey: "chubach",
    faction: "SEGA",
    universe: "ChuChu Rocket",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Chat spatial. Se déplace en ligne et diagonale sur 2 cases. Ruse et agilité.",
    descriptionKey: "chubach-desc",
    image: "public/images/sega/characters/chubach.png",
    type: "chubach"
  },
  {
    name: "Chuih",
    nameKey: "chuih",
    faction: "SEGA",
    universe: "ChuChu Rocket",
    cost: 1,
    tier: 1,
    range: 1,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Petite souris. Se déplace d'une case dans les 4 directions. Vitesse et discrétion.",
    descriptionKey: "chuih-desc",
    image: "public/images/sega/characters/chuih.png",
    type: "chuih"
  },
  
  // Xbox
  {
    name: "Master Chief",
    nameKey: "master-chief",
    faction: "Xbox",
    universe: "Halo",
    cost: 5,
    tier: 1,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1]],
    description: "Spartan-117, super-soldat légendaire et dernier espoir de l'humanité. Se déplace en ligne droite sur 3 cases avec une armure MJOLNIR avancée et des armes de pointe. Sa détermination et son courage en font un héros incontournable.",
    descriptionKey: "master-chief-desc",
    image: "public/images/xbox/characters/masterchief.png",
    type: "masterchief"
  },
  {
    name: "Marcus Fenix",
    nameKey: "marcus-fenix",
    faction: "Xbox", 
    universe: "Gears of War",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Soldat Delta. Se déplace en diagonale sur 2 cases. Guerre contre les Locust avec des armes lourdes.",
    descriptionKey: "marcus-fenix-desc",
    image: "public/images/xbox/characters/marcus-fenix.png",
    type: "marcus-fenix"
  },
  {
    name: "Joanna Dark",
    nameKey: "joanna-dark",
    faction: "Xbox",
    universe: "Perfect Dark",
    cost: 7,
    tier: 4,
    range: 8,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Agent secret d'élite. Se déplace dans toutes les directions sur 8 cases. Espionnage et technologie de pointe.",
    descriptionKey: "joanna-dark-desc",
    image: "public/images/xbox/characters/joanna-dark.png",
    type: "joanna-dark"
  },
  
  // === PERSONNAGES XBOX AVEC IMAGES DISPONIBLES ===
  
  // Halo Universe
  {
    name: "Cortana",
    nameKey: "cortana",
    faction: "Xbox",
    universe: "Halo",
    cost: 6,
    tier: 3,
    range: 5,
    moves: [[2,0], [-2,0], [0,2], [0,-2], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "IA artificielle de génie. Se déplace en L et en diagonale sur 5 cases. Intelligence artificielle et hacking.",
    descriptionKey: "cortana-desc",
    image: "public/images/xbox/characters/cortana.png",
    type: "cortana"
  },
  {
    name: "Juno",
    nameKey: "juno",
    faction: "Xbox",
    universe: "Halo",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Spartan-312. Se déplace en ligne droite sur 3 cases. Guerrière d'élite avec armure MJOLNIR.",
    descriptionKey: "juno-desc",
    image: "public/images/xbox/characters/juno.png",
    type: "juno"
  },
  
  // Gears of War Universe
  {
    name: "JD Fenix",
    nameKey: "jd-fenix",
    faction: "Xbox",
    universe: "Gears of War",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Fils de Marcus Fenix. Se déplace en ligne droite sur 3 cases. Nouvelle génération de soldats Delta.",
    descriptionKey: "jd-fenix-desc",
    image: "public/images/xbox/characters/jd-fenix.png",
    type: "jd-fenix"
  },
  {
    name: "General Raam",
    nameKey: "general-raam",
    faction: "Xbox",
    universe: "Gears of War",
    cost: 8,
    tier: 4,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Général Locust. Se déplace dans toutes les directions sur 4 cases. Commandant suprême des Locusts.",
    descriptionKey: "general-raam-desc",
    image: "public/images/xbox/characters/general-raam.png",
    type: "general-raam"
  },
  {
    name: "Cyclops Drone",
    nameKey: "cyclops-drone",
    faction: "Xbox",
    universe: "Gears of War",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Drone Locust. Se déplace en ligne et diagonale sur 2 cases. Soldat de base des Locusts.",
    descriptionKey: "cyclops-drone-desc",
    image: "public/images/xbox/characters/cyclops-drone.png",
    type: "cyclops-drone"
  },
  
  // Ori Universe
  {
    name: "Ori",
    nameKey: "ori",
    faction: "Xbox",
    universe: "Ori",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Esprit de la forêt. Se déplace en ligne droite sur 3 cases. Magie naturelle et agilité.",
    descriptionKey: "ori-desc",
    image: "public/images/xbox/characters/ori.png",
    type: "ori"
  },
  
  // Fable Universe
  {
    name: "Reaver",
    nameKey: "reaver",
    faction: "Xbox",
    universe: "Fable",
    cost: 7,
    tier: 4,
    range: 5,
    moves: [[2,0], [-2,0], [0,2], [0,-2], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Pirate immortel. Se déplace en L et en diagonale sur 5 cases. Immortalité et ruse.",
    descriptionKey: "reaver-desc",
    image: "public/images/xbox/characters/reaver.png",
    type: "reaver"
  },
  
  // Hellblade Universe
  {
    name: "Senua",
    nameKey: "senua",
    faction: "Xbox",
    universe: "Hellblade",
    cost: 8,
    tier: 4,
    range: 5,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Guerrière celtique. Se déplace dans toutes les directions sur 5 cases. Psychologie et mythologie.",
    descriptionKey: "senua-desc",
    image: "public/images/xbox/characters/senua.png",
    type: "senua"
  },
  
  // Killer Instinct Universe
  {
    name: "Jago",
    nameKey: "jago",
    faction: "Xbox",
    universe: "Killer Instinct",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Guerrier ninja. Se déplace en ligne droite sur 3 cases. Arts martiaux et combos.",
    descriptionKey: "jago-desc",
    image: "public/images/xbox/characters/jago.png",
    type: "jago"
  },
  {
    name: "Orchid",
    nameKey: "orchid",
    faction: "Xbox",
    universe: "Killer Instinct",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Guerrière agile. Se déplace dans toutes les directions sur 3 cases. Agilité et rapidité.",
    descriptionKey: "orchid-desc",
    image: "public/images/xbox/characters/orchid.png",
    type: "orchid"
  },
  
  // Sea of Thieves Universe
  {
    name: "Capitaine Flameheart",
    nameKey: "capitaine-flameheart",
    faction: "Xbox",
    universe: "Sea of Thieves",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Capitaine pirate légendaire. Se déplace dans toutes les directions sur 4 cases. Navigation et trésors.",
    descriptionKey: "capitaine-flameheart-desc",
    image: "public/images/xbox/characters/capitaine-flameheart.png",
    type: "capitaine-flameheart"
  },
  {
    name: "Pirate",
    nameKey: "pirate",
    faction: "Xbox",
    universe: "Sea of Thieves",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Pirate de base. Se déplace en ligne et diagonale sur 2 cases. Navigation et aventure.",
    descriptionKey: "pirate-desc",
    image: "public/images/xbox/characters/pirate.png",
    type: "pirate"
  },
  
  // Battletoads Universe
  {
    name: "Rash",
    nameKey: "rash",
    faction: "Xbox",
    universe: "Battletoads",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Crapaud de combat. Se déplace en ligne droite sur 3 cases. Combat rapproché et acrobaties.",
    descriptionKey: "rash-desc",
    image: "public/images/xbox/characters/rash.png",
    type: "rash"
  },
  
  // Conker Universe
  {
    name: "Conker",
    nameKey: "conker",
    faction: "Xbox",
    universe: "Conker",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Écureuil aventurier. Se déplace dans toutes les directions sur 3 cases. Aventure et humour.",
    descriptionKey: "conker-desc",
    image: "public/images/xbox/characters/conker.png",
    type: "conker"
  },
  
  // Blinx Universe
  {
    name: "Blinx",
    nameKey: "blinx",
    faction: "Xbox",
    universe: "Blinx",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Chat temporel. Se déplace en ligne droite sur 4 cases. Manipulation du temps et nettoyage.",
    descriptionKey: "blinx-desc",
    image: "public/images/xbox/characters/blinx.png",
    type: "blinx"
  },
  
  // Crash Bandicoot Universe
  {
    name: "Crash Bandicoot",
    nameKey: "crash-bandicoot",
    faction: "Xbox",
    universe: "Crash Bandicoot",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Bandicoot aventurier. Se déplace en ligne droite sur 3 cases. Plateforme et collectibles.",
    descriptionKey: "crash-bandicoot-desc",
    image: "public/images/xbox/characters/crash-bandicoot.png",
    type: "crash-bandicoot"
  },
  
  // Spyro Universe
  {
    name: "Spyro",
    nameKey: "spyro",
    faction: "Xbox",
    universe: "Spyro",
    cost: 5,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Dragon violet. Se déplace dans toutes les directions sur 4 cases. Vol et magie.",
    descriptionKey: "spyro-desc",
    image: "public/images/xbox/characters/spyro.png",
    type: "spyro"
  },
  
  // Viva Piñata Universe
  {
    name: "Viva Piñata",
    nameKey: "viva-pinata",
    faction: "Xbox",
    universe: "Viva Piñata",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Piñata colorée. Se déplace en ligne et diagonale sur 2 cases. Jardinage et créatures colorées.",
    descriptionKey: "viva-pinata-desc",
    image: "public/images/xbox/characters/viva-pinata.png",
    type: "viva-pinata"
  },
  
  // Recore Universe
  {
    name: "Joule Adams",
    nameKey: "joule-adams",
    faction: "Xbox",
    universe: "Recore",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Exploratrice de Far Eden. Se déplace dans toutes les directions sur 3 cases. Science-fiction et robots.",
    descriptionKey: "joule-adams-desc",
    image: "public/images/xbox/characters/joule-adams.png",
    type: "joule-adams"
  },
  {
    name: "Steeve",
    nameKey: "steeve",
    faction: "Xbox",
    universe: "Recore",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Robot compagnon. Se déplace en ligne droite sur 3 cases. Technologie et loyauté.",
    descriptionKey: "steeve-desc",
    image: "public/images/xbox/characters/steeve.png",
    type: "steeve"
  },
  
  // Sunset Overdrive Universe
  {
    name: "Cooper",
    nameKey: "cooper",
    faction: "Xbox",
    universe: "Sunset Overdrive",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Employé rebelle. Se déplace en ligne droite sur 3 cases. Style et énergie.",
    descriptionKey: "cooper-desc",
    image: "public/images/xbox/characters/cooper.png",
    type: "cooper"
  },
  
  // Quantum Break Universe
  {
    name: "Hornet",
    nameKey: "hornet",
    faction: "Xbox",
    universe: "Quantum Break",
    cost: 6,
    tier: 3,
    range: 4,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Agent temporel. Se déplace dans toutes les directions sur 4 cases. Manipulation temporelle.",
    descriptionKey: "hornet-desc",
    image: "public/images/xbox/characters/hornet.png",
    type: "hornet"
  },
  
  // Grounded Universe
  {
    name: "Shu",
    nameKey: "shu",
    faction: "Xbox",
    universe: "Grounded",
    cost: 2,
    tier: 1,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Adolescent rétréci. Se déplace en ligne et diagonale sur 2 cases. Survie microscopique.",
    descriptionKey: "shu-desc",
    image: "public/images/xbox/characters/shu.png",
    type: "shu"
  },
  
  // State of Decay Universe
  {
    name: "Lupus",
    nameKey: "lupus",
    faction: "Xbox",
    universe: "State of Decay",
    cost: 3,
    tier: 2,
    range: 2,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [-1,-1]],
    description: "Survivant de l'apocalypse. Se déplace en ligne et diagonale sur 2 cases. Survie et adaptation.",
    descriptionKey: "lupus-desc",
    image: "public/images/xbox/characters/lupus.png",
    type: "lupus"
  },
  {
    name: "Moine",
    nameKey: "moine",
    faction: "Xbox",
    universe: "State of Decay",
    cost: 4,
    tier: 2,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [2,0], [-2,0], [0,2], [0,-2]],
    description: "Moine survivant. Se déplace en ligne droite sur 3 cases. Sagesse et survie.",
    descriptionKey: "moine-desc",
    image: "public/images/xbox/characters/moine.png",
    type: "moine"
  },
  
  // Vela Universe
  {
    name: "Vela",
    nameKey: "vela",
    faction: "Xbox",
    universe: "Vela",
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]],
    description: "Guerrière mystérieuse. Se déplace dans toutes les directions sur 3 cases. Combat et mystère.",
    descriptionKey: "vela-desc",
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
