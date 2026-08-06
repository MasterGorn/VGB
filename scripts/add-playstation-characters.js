#!/usr/bin/env node
/**
 * Ajoute / réaligne les personnages PlayStation (rôles demandés).
 * Usage: node scripts/add-playstation-characters.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PIECES_PATH = path.join(ROOT, 'public', 'data', 'pieces.js');
const VGB_PIECES_PATH = path.join(ROOT, 'vgb', 'public', 'data', 'pieces.js');
const TRANSLATIONS_PATH = path.join(ROOT, 'public', 'js', 'translations.js');
const VGB_TRANSLATIONS_PATH = path.join(ROOT, 'vgb', 'public', 'js', 'translations.js');
const IMG_DIR = path.join(ROOT, 'public', 'images', 'playstation', 'characters');
const VGB_IMG_DIR = path.join(ROOT, 'vgb', 'public', 'images', 'playstation', 'characters');

const ROLE_TPL = {
  pawn: {
    cost: 2,
    tier: 1,
    range: 1,
    moves: [[1, 0], [-1, 0], [0, 1], [0, -1]],
  },
  knight: {
    cost: 3,
    tier: 2,
    range: 1,
    moves: [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]],
  },
  bishop: {
    cost: 4,
    tier: 2,
    range: 8,
    moves: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
  },
  rook: {
    cost: 6,
    tier: 3,
    range: 8,
    moves: [[1, 0], [-1, 0], [0, 1], [0, -1]],
  },
  queen: {
    cost: 7,
    tier: 3,
    range: 8,
    moves: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
  },
  unique: {
    cost: 5,
    tier: 3,
    range: 3,
    moves: [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]],
  },
  king: {
    cost: 0,
    tier: 1,
    range: 1,
    moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
  },
};

/** Catalogue cible : nameKey = clé stable */
const CATALOG = [
  // King
  {
    name: 'Président Sony',
    nameKey: 'king-playstation',
    type: 'king',
    role: 'king',
    universe: 'PlayStation',
    imageFile: 'king.png',
    description:
      'Président de Sony Interactive Entertainment, figure emblématique de la PlayStation. Calme, stratégique, il incarne l’empire des exclusifs. Sa chute scelle la défaite.',
    enName: 'Sony President',
    enDesc:
      'President of Sony Interactive Entertainment, emblem of PlayStation. Calm and strategic—his fall ends the match.',
  },
  // Pawns
  {
    name: 'Sackboy',
    nameKey: 'sackboy',
    type: 'sackboy',
    role: 'pawn',
    universe: 'LittleBigPlanet',
    imageFile: 'sackboy.png',
    description:
      'Poupée de tissu créative de LittleBigPlanet. Personnalisable à l’infini, joyeux et collant (au sens craft). Votre imagination est son monde.',
    enName: 'Sackboy',
    enDesc:
      'Creative cloth doll from LittleBigPlanet. Infinitely customizable—your imagination is his world.',
  },
  {
    name: 'Daxter',
    nameKey: 'daxter',
    type: 'daxter',
    role: 'pawn',
    universe: 'Jak and Daxter',
    imageFile: 'daxter.png',
    description:
      'Ottsel moqueur, meilleur ami (et ex-humain) de Jak. Blagues, lâcheté stratégique et fidélité absolue. Le commentaire audio de l’épopée.',
    enName: 'Daxter',
    enDesc: 'Jak’s wisecracking ottsel buddy. Jokes, strategic cowardice, absolute loyalty.',
  },
  {
    name: 'Astro Bot',
    nameKey: 'astro-bot',
    type: 'astro-bot',
    role: 'pawn',
    universe: "Astro's Playroom",
    imageFile: 'astro-bot.png',
    description:
      'Petit robot mignon d’Astro’s Playroom et Astro Bot. Hommage vivant au catalogue PlayStation, sauts et gadgets inclus. La mascotte du DualSense.',
    enName: 'Astro Bot',
    enDesc: 'Cute DualSense mascot from Astro’s Playroom / Astro Bot—a living PlayStation tribute.',
  },
  {
    name: 'Clank',
    nameKey: 'clank',
    type: 'clank',
    role: 'pawn',
    universe: 'Ratchet & Clank',
    imageFile: 'clank.png',
    description:
      'Robot Zoni et conscience de Ratchet & Clank. Petit, brillant, souvent porté… mais indispensable. La voix de la raison (et des gadgets).',
    enName: 'Clank',
    enDesc: 'Zoni robot and brains of Ratchet & Clank—small, brilliant, essential.',
  },
  // Knights
  {
    name: 'Ico',
    nameKey: 'ico',
    type: 'ico',
    role: 'knight',
    universe: 'Ico',
    imageFile: 'ico.png',
    description:
      'Garçon cornu d’ICO, guide d’Yorda dans le château. Silence, lumière et pureté du gameplay Team Ico. Protéger, c’est progresser.',
    enName: 'Ico',
    enDesc: 'Horned boy from ICO who guides Yorda—silence, light, and Team Ico purity.',
  },
  {
    name: 'Nathan Drake',
    nameKey: 'nathan-drake',
    type: 'nathan-drake',
    role: 'knight',
    universe: 'Uncharted',
    imageFile: 'nathan-drake.png',
    description:
      'Chasseur de trésors charismatique d’Uncharted. Quips, escalade et malchance spectaculaire : Indiana Jones version PlayStation. Fortune et gloire… surtout des bleus.',
    enName: 'Nathan Drake',
    enDesc: 'Charismatic Uncharted treasure hunter—quips, climbs, and spectacular bad luck.',
  },
  {
    name: 'Sam Porter Bridges',
    nameKey: 'sam-porter-bridges',
    type: 'sam-porter',
    role: 'knight',
    universe: 'Death Stranding',
    imageFile: 'sam-porter-bridges.png',
    description:
      'Livreur de Death Stranding, reconnecteur de l’Amérique. BB, sang et randonnée apocalyptique. Chaque colis est un lien humain.',
    enName: 'Sam Porter Bridges',
    enDesc: 'Death Stranding porter reconnecting America—every package is a human link.',
  },
  {
    name: 'Atreus',
    nameKey: 'atreus',
    type: 'atreus',
    role: 'knight',
    universe: 'God of War',
    imageFile: 'atreus.png',
    description:
      'Fils de Kratos dans God of War. Archer, langues anciennes et destin divin. « Boy » devient un héros.',
    enName: 'Atreus',
    enDesc: 'Kratos’s son in God of War—archer, ancient tongues, divine destiny.',
  },
  {
    name: 'Deacon St John',
    nameKey: 'deacon-st-john',
    type: 'deacon-st-john',
    role: 'knight',
    universe: 'Days Gone',
    imageFile: 'deacon-st-john.png',
    description:
      'Biker survivant de Days Gone. Motos, Freakers et quête de Sarah. L’Oregon post-apocalyptique a un visage.',
    enName: 'Deacon St. John',
    enDesc: 'Days Gone biker surviving Freakers and hunting for Sarah.',
  },
  {
    name: 'Ellie',
    nameKey: 'ellie',
    type: 'ellie',
    role: 'knight',
    universe: 'The Last of Us',
    imageFile: 'ellie.png',
    description:
      'Héroïne de The Last of Us. Immunisée, déterminée, brisée et indomptable. La survie a le visage d’une ado.',
    enName: 'Ellie',
    enDesc: 'The Last of Us heroine—immune, determined, broken and unbreakable.',
  },
  {
    name: 'Pilote Gran Turismo',
    nameKey: 'pilote-gran-turismo',
    type: 'pilote-gran-turismo',
    role: 'knight',
    universe: 'Gran Turismo',
    imageFile: 'pilote-gran-turismo.png',
    description:
      'Pilote anonyme de Gran Turismo. Virages parfaits, télémétrie et passion automobile. Le real driving simulator en personne.',
    enName: 'Gran Turismo Driver',
    enDesc: 'Anonymous Gran Turismo driver—perfect lines and real driving passion.',
  },
  {
    name: 'William Adams',
    nameKey: 'william-adams',
    type: 'william-adams',
    role: 'knight',
    universe: 'Nioh',
    imageFile: 'william-adams.png',
    description:
      'Samouraï occidental de Nioh. Yokai, ki et lames multiples. L’Angleterre rencontre le Japon féodal.',
    enName: 'William Adams',
    enDesc: 'Western samurai of Nioh—yokai, ki, and deadly blades.',
  },
  // Bishops
  {
    name: 'Parappa',
    nameKey: 'parappa',
    type: 'parappa',
    role: 'bishop',
    universe: 'Parappa the Rapper',
    imageFile: 'parappa-the-rapper.png',
    description:
      'Chien rappeur de Parappa the Rapper. « Je dois y croire ! » : rythme, école et confiance en soi. Appuie sur les touches, trouve le flow.',
    enName: 'Parappa',
    enDesc: 'Parappa the Rapper dog—“I gotta believe!” Rhythm and self-confidence.',
  },
  {
    name: 'Cole MacGrath',
    nameKey: 'cole-macgrath',
    type: 'cole-macgrath',
    role: 'bishop',
    universe: 'inFAMOUS',
    imageFile: 'cole-macgrath.png',
    description:
      'Coursier devenu conduit électrique dans inFAMOUS. Karma, éclairs et Empire City. Le pouvoir choisit son camp.',
    enName: 'Cole MacGrath',
    enDesc: 'inFAMOUS conduit—karma, lightning, and Empire City.',
  },
  {
    name: 'Ratchet',
    nameKey: 'ratchet',
    type: 'ratchet',
    role: 'bishop',
    universe: 'Ratchet & Clank',
    imageFile: 'ratchet.png',
    description:
      'Lombax inventeur de Ratchet & Clank. Armes ridicules, galaxies à sauver, Clank sur le dos. Le héros à fourrure orange.',
    enName: 'Ratchet',
    enDesc: 'Lombax hero of Ratchet & Clank—wild weapons and galaxy-saving antics.',
  },
  {
    name: 'Sir Daniel Fortesque',
    nameKey: 'sir-daniel-fortesque',
    type: 'sir-daniel-fortesque',
    role: 'bishop',
    universe: 'MediEvil',
    imageFile: 'sir-daniel-fortesque.png',
    description:
      'Chevalier squelette de MediEvil. Héros malgré lui, mâchoire lâchée et humour macabre. Gallowmere a besoin de lui… encore.',
    enName: 'Sir Daniel Fortesque',
    enDesc: 'MediEvil’s skeletal knight—unlikely hero with dark humor.',
  },
  {
    name: 'Sly Cooper',
    nameKey: 'sly-cooper',
    type: 'sly-cooper',
    role: 'bishop',
    universe: 'Sly Cooper',
    imageFile: 'sly-cooper.png',
    description:
      'Raton laveur voleur gentilhomme de Sly Cooper. Canne, stealth et héritage familial. Les coffres n’ont qu’à bien se tenir.',
    enName: 'Sly Cooper',
    enDesc: 'Gentleman raccoon thief—cane, stealth, and family legacy.',
  },
  {
    name: 'Toro Inoue',
    nameKey: 'toro-inoue',
    type: 'toro-inoue',
    role: 'bishop',
    universe: 'Doko Demo Issyo',
    imageFile: 'toro-inoue.png',
    description:
      'Chat blanc mascotte de Doko Demo Issyo / PlayStation. Doux, curieux, ambassadeur japonais de Sony. « Torō desu. »',
    enName: 'Toro Inoue',
    enDesc: 'White cat mascot of Doko Demo Issyo—Sony’s gentle Japanese ambassador.',
  },
  // Rooks
  {
    name: 'Kratos',
    nameKey: 'kratos',
    type: 'kratos',
    role: 'rook',
    universe: 'God of War',
    imageFile: 'kratos.png',
    description:
      'Ancien dieu de la guerre spartiate, désormais père en Midgard. Lames du Chaos, hache Léviathan et rage contenue. Un seul mot à son fils suffit parfois.',
    enName: 'Kratos',
    enDesc: 'Former God of War, now a father in Midgard—blades, Leviathan Axe, contained rage.',
  },
  {
    name: 'Jin Sakai',
    nameKey: 'jin-sakai',
    type: 'jin-sakai',
    role: 'rook',
    universe: 'Ghost of Tsushima',
    imageFile: 'jin-sakai.png',
    description:
      'Samouraï devenu Fantôme dans Ghost of Tsushima. Honneur brisé, Mongols chassés, île défendue. La voie du bushido… ou de l’ombre.',
    enName: 'Jin Sakai',
    enDesc: 'Ghost of Tsushima samurai turned Ghost—honor broken to save the island.',
  },
  {
    name: 'Joel',
    nameKey: 'joel',
    type: 'joel',
    role: 'rook',
    universe: 'The Last of Us',
    imageFile: 'joel.png',
    description:
      'Contrebandier de The Last of Us. Père perdu, Ellie trouvée, choix impossibles. La survie a un coût.',
    enName: 'Joel',
    enDesc: 'The Last of Us smuggler—lost fatherhood, Ellie, impossible choices.',
  },
  {
    name: 'Abby',
    nameKey: 'abby',
    type: 'abby',
    role: 'rook',
    universe: 'The Last of Us',
    imageFile: 'abby.png',
    description:
      'Guerrière de The Last of Us Part II. Force brute, vengeance et rédemption ambiguë. Deux faces d’une même guerre.',
    enName: 'Abby',
    enDesc: 'The Last of Us Part II warrior—raw strength, revenge, ambiguous redemption.',
  },
  {
    name: 'Trico',
    nameKey: 'trico',
    type: 'trico',
    role: 'rook',
    universe: 'The Last Guardian',
    imageFile: 'trico.png',
    description:
      'Créature ailée de The Last Guardian. Lien silencieux avec le garçon, bondissements et éclairs. La confiance se gagne plume à plume.',
    enName: 'Trico',
    enDesc: 'The Last Guardian’s winged beast—trust earned feather by feather.',
  },
  // Queens
  {
    name: 'Aloy',
    nameKey: 'aloy',
    type: 'aloy',
    role: 'queen',
    universe: 'Horizon',
    imageFile: 'aloy.png',
    description:
      'Chasseuse Nora de Horizon, clone d’Elisabet Sobeck. Arc, machines dinosaures et vérité sur le Faro Plague. Rouge de cheveux, d’acier de volonté.',
    enName: 'Aloy',
    enDesc: 'Nora hunter of Horizon—bow, machine beasts, and the Faro truth.',
  },
  {
    name: 'Kat',
    nameKey: 'kat',
    type: 'kat',
    role: 'queen',
    universe: 'Gravity Rush',
    imageFile: 'kat.png',
    description:
      'Héroïne de Gravity Rush capable de manipuler la gravité. Chapeau, chat Dust et chute contrôlée : elle redéfinit « tomber ». Élégance en apesanteur.',
    enName: 'Kat',
    enDesc: 'Gravity Rush heroine who bends gravity—hat, Dust the cat, elegant freefall.',
  },
  {
    name: 'Carmelita Fox',
    nameKey: 'carmelita-fox',
    type: 'carmelita-fox',
    role: 'queen',
    universe: 'Sly Cooper',
    imageFile: 'carmelita-fox.png',
    description:
      'Inspectrice Interpol dans Sly Cooper. Shock pistol, justice et… attirance pour le voleur. L’ordre a du panache.',
    enName: 'Carmelita Fox',
    enDesc: 'Interpol inspector in Sly Cooper—shock pistol, justice, and a soft spot for the thief.',
  },
  {
    name: 'Chloe Frazer',
    nameKey: 'chloe-frazer',
    type: 'chloe-frazer',
    role: 'queen',
    universe: 'Uncharted',
    imageFile: 'chloe-frazer.png',
    description:
      'Chasseuse de trésors d’Uncharted. Accent australien, ambition et alliée parfois rivale de Nate. Elle mène sa propre aventure.',
    enName: 'Chloe Frazer',
    enDesc: 'Uncharted treasure hunter—Australian grit and her own agenda.',
  },
  // Unique
  {
    name: 'Jak',
    nameKey: 'jak',
    type: 'jak',
    role: 'unique',
    universe: 'Jak and Daxter',
    imageFile: 'jak.png',
    description:
      'Héros d’Haven City dans Jak and Daxter. Éco, Dark, Light : l’énergie le transforme autant que l’aventure. Silence d’origine, puissance acquise. Éco sombre : après un déplacement, peut marquer une case voisine (interdit aux ennemis 1 tour).',
    enName: 'Jak',
    enDesc:
      'Haven City hero—Eco energies reshape him. Dark Eco: after moving, may mark an adjacent square (enemies banned 1 turn).',
    abilityDesc:
      'Éco sombre : après un déplacement, peut marquer une case voisine (interdit aux ennemis 1 tour).',
    abilityKey: 'jak-ability',
  },
];

function loadPieces(filePath) {
  const s = fs.readFileSync(filePath, 'utf8');
  const marker = 'const piecesData = ';
  const i = s.indexOf(marker);
  if (i < 0) throw new Error('piecesData not found in ' + filePath);
  const arrStart = s.indexOf('[', i);
  let depth = 0;
  let arrEnd = -1;
  for (let j = arrStart; j < s.length; j++) {
    const ch = s[j];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        arrEnd = j;
        break;
      }
    }
  }
  if (arrEnd < 0) throw new Error('] not found for piecesData');
  const data = JSON.parse(s.slice(arrStart, arrEnd + 1));
  const prefix = s.slice(0, arrStart);
  // keep trailing `];` and whatever follows
  let suffixStart = arrEnd + 1;
  if (s[suffixStart] === ';') suffixStart++;
  const suffix = s.slice(suffixStart);
  return { data, prefix, suffix };
}

function writePieces(filePath, prefix, data, suffix) {
  const json = JSON.stringify(data);
  fs.writeFileSync(filePath, prefix + json + ';' + suffix);
}

function upsertTranslations(filePath, entries) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Insert into fr and en blocks near existing playstation keys if missing
  for (const e of entries) {
    const pairs = [
      [e.nameKey, e.name],
      [e.nameKey + '-desc', e.description],
      ...(e.abilityKey ? [[e.abilityKey, e.abilityDesc]] : []),
    ];
    const enPairs = [
      [e.nameKey, e.enName || e.name],
      [e.nameKey + '-desc', e.enDesc || e.description],
      ...(e.abilityKey ? [[e.abilityKey, e.enDesc || e.abilityDesc]] : []),
    ];

    function ensureKey(langCode, key, value) {
      const re = new RegExp(`(['"])${key}\\1\\s*:`);
      // crude: if key already anywhere, skip (keys are unique across langs mostly duplicated)
      // Better: check inside language section — for simplicity, if `'key':` exists in file for this exact pattern near lang, skip
      const langIdx = content.indexOf(`  ${langCode}: {`) >= 0
        ? content.indexOf(`  ${langCode}: {`)
        : content.indexOf(`  '${langCode}': {`) >= 0
          ? content.indexOf(`  '${langCode}': {`)
          : content.indexOf(`"${langCode}"`);
      if (langIdx < 0) return;
      // Find next language or end of translations object chunk — insert before a known PS key or at sackboy area
      const probe = `'${key}':`;
      const probe2 = `"${key}":`;
      // Search only in a window after lang start (80k chars)
      const window = content.slice(langIdx, langIdx + 120000);
      if (window.includes(probe) || window.includes(probe2)) return;
      // Insert after sackboy-desc or king-playstation if present, else after lang opening
      let insertRel = window.indexOf("'sackboy-desc':");
      if (insertRel < 0) insertRel = window.indexOf('"sackboy-desc":');
      if (insertRel < 0) insertRel = window.indexOf("'king-playstation':");
      if (insertRel < 0) insertRel = 20;
      // find end of that line
      const lineEnd = window.indexOf('\n', insertRel);
      const abs = langIdx + lineEnd + 1;
      const line = `    '${key}': ${JSON.stringify(value)},\n`;
      content = content.slice(0, abs) + line + content.slice(abs);
    }

    for (const [k, v] of pairs) ensureKey('fr', k, v);
    for (const [k, v] of enPairs) ensureKey('en', k, v);
  }
  fs.writeFileSync(filePath, content);
}

function syncImages(imageFile) {
  const src = path.join(IMG_DIR, imageFile);
  const dest = path.join(VGB_IMG_DIR, imageFile);
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(VGB_IMG_DIR, { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

function main() {
  const missingImages = [];
  const { data, prefix, suffix } = loadPieces(PIECES_PATH);
  const byKey = new Map(data.map((p) => [p.nameKey, p]));

  for (const entry of CATALOG) {
    const imgOk = fs.existsSync(path.join(IMG_DIR, entry.imageFile));
    if (!imgOk) {
      missingImages.push(entry.name + ' (' + entry.imageFile + ')');
      continue;
    }
    syncImages(entry.imageFile);

    const tpl = ROLE_TPL[entry.role];
    const existing = byKey.get(entry.nameKey);
    const piece = {
      name: entry.name,
      nameKey: entry.nameKey,
      faction: 'PlayStation',
      universe: entry.universe,
      cost: tpl.cost,
      tier: tpl.tier,
      role: entry.role,
      range: tpl.range,
      moves: tpl.moves,
      description: entry.description,
      descriptionKey: entry.nameKey + '-desc',
      image: '/images/playstation/characters/' + entry.imageFile,
      type: entry.type,
    };
    if (entry.abilityDesc) {
      piece.abilityDesc = entry.abilityDesc;
      piece.abilityKey = entry.abilityKey;
    } else if (existing && existing.abilityDesc && entry.nameKey === 'jak') {
      piece.abilityDesc = existing.abilityDesc;
      piece.abilityKey = existing.abilityKey;
    }

    if (existing) {
      const idx = data.indexOf(existing);
      // preserve ability on jak if not overwritten
      data[idx] = piece;
      byKey.set(entry.nameKey, piece);
    } else {
      data.push(piece);
      byKey.set(entry.nameKey, piece);
    }
  }

  writePieces(PIECES_PATH, prefix, data, suffix);
  writePieces(VGB_PIECES_PATH, prefix, data, suffix);

  upsertTranslations(TRANSLATIONS_PATH, CATALOG.filter((e) => !missingImages.some((m) => m.startsWith(e.name))));
  upsertTranslations(VGB_TRANSLATIONS_PATH, CATALOG.filter((e) => !missingImages.some((m) => m.startsWith(e.name))));

  // Rename king translation
  for (const tp of [TRANSLATIONS_PATH, VGB_TRANSLATIONS_PATH]) {
    let t = fs.readFileSync(tp, 'utf8');
    t = t.replace(/'king-playstation': 'Roi PlayStation'/g, "'king-playstation': 'Président Sony'");
    t = t.replace(/"king-playstation": "Roi PlayStation"/g, '"king-playstation": "Président Sony"');
    t = t.replace(/'king-playstation': 'PlayStation King'/g, "'king-playstation': 'Sony President'");
    t = t.replace(/"king-playstation": "PlayStation King"/g, '"king-playstation": "Sony President"');
    fs.writeFileSync(tp, t);
  }

  const ps = data.filter((p) => p.faction === 'PlayStation');
  console.log('PlayStation pieces:', ps.length);
  ps.sort((a, b) => a.role.localeCompare(b.role) || a.name.localeCompare(b.name));
  for (const p of ps) console.log(p.role.padEnd(8), p.name);
  if (missingImages.length) {
    console.log('\nImages manquantes (non ajoutés):');
    missingImages.forEach((m) => console.log(' -', m));
  }
}

main();
