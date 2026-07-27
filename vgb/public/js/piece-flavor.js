/**
 * Phrases courtes affichées à la sélection d'une pièce en partie.
 * Clé = nameKey / type de la pièce.
 */
(function (global) {
  const QUOTES = {
    mario: ["Let's-a go!", "Mamma mia!", "Yahoo!"],
    luigi: ["OKIE DOKIE!", "Let's go, Mario!"],
    peach: ["Sweet!", "Oh dear…"],
    daisy: ["Hi, I'm Daisy!", "Let's play!"],
    bowser: ["Gwahaha!", "Showtime!"],
    "bowser-junior": ["Hee hee!", "Watch this!"],
    kirby: ["Poyo!", "Poyo poyo!"],
    "roi-dadidou": ["Hi-yo!", "Dee dee!"],
    link: ["…", "Hyah!"],
    zelda: ["Courage…", "…"],
    sheik: ["…", "Hah!"],
    ganondorf: ["Pathetic.", "Kneel."],
    pikachu: ["Pika!", "Pika pika!"],
    mewtwo: ["Useless.", "…"],
    rondoudou: ["Puuu!", "Jiggly!"],
    samus: ["Mission start.", "…"],
    "samus-sans-armure": ["Ready.", "Lock on."],
    ridley: ["Screech!", "Hunt."],
    yoshi: ["Yoshi!", "Yo!"],
    toad: ["Here we go!", "Okie dokie!"],
    wario: ["I'm-a Wario!", "Wahaha!"],
    waluigi: ["Wah!", "Walui-time!"],
    sonic: ["J'ai failli attendre !", "Gotta go fast!", "You're too slow!"],
    tails: ["Ready!", "I got this!"],
    "dr-robotnik": ["Snooping as usual, I see!", "Pingas!"],
    "dr.robotnik": ["Snooping as usual, I see!", "Pingas!"],
    kratos: ["I am your end.", "Boy."],
    "nathan-drake": ["That worked!", "Oh boy…"],
    "master-chief": ["I need a weapon.", "Sir, yes sir."],
    masterchief: ["I need a weapon.", "Sir, yes sir."],
    "crash-bandicoot": ["Whoa!", "Yeeeah!"],
    spyro: ["Let's burn!", "Cool!"],
    bayonetta: ["Bloody fate!", "Let's dance."],
    "fox-mccloud": ["Do a barrel roll!", "I've got you!"],
    "falco-lombardi": ["Hey Einstein!", "Bollox!"],
    "wolf-o-donnell": ["Can't let you do that.", "Interesting…"],
    "captain-falcon": ["Falcon Punch!", "Show me your moves!"],
    "king-k-rool": ["Kremlings, attack!", "Gwahaha!"],
    "little-mac": ["Doc!", "Here we go!"],
    ike: ["I fight for my friends.", "Prepare yourself!"],
    marth: ["I must protect everyone.", "Falchion!"],
    roy: ["I won't lose!", "For Pherae!"],
    lucina: ["I will change fate!", "…"],
    lyn: ["The wind guides me.", "Ready!"],
    joker: ["Persona!", "Take this!"],
    cloud: ["…", "Not interested."],
    sephiroth: ["Deserve better.", "Ha."],
    snake: ["Kept you waiting, huh?", "…"],
    "solid-snake": ["Kept you waiting, huh?"],
    raiden: ["Jack the Ripper!", "Cut!"],
    "astro-bot": ["Beep!", "Woo!"],
    aloy: ["Focus.", "Got it."],
    "joanna-dark": ["Target acquired.", "Clear."],
    "general-raam": ["Locust!", "Die."],
    jak: ["Haven't got all day!", "Nice!"],
    daxter: ["Oh yeah!", "We're gonna die!"],
    "hatsune-miku": ["Ready to sing!", "Nya~"],
    "banjo-kazooie": ["Jiggy!", "Breegull bash!"],
    conker: ["Bloody hell.", "Cheers!"],
    "ice-climbers": ["Popo!", "Nana!"],
    "duo-duck-hunt": ["Gotcha!", "…"],
    "fille-inkling": ["Woomy!", "Splaaat!"],
    "hero-ring-fit-adventure": ["Feel the burn!", "One more!"],
    hornet: ["Sharpened.", "…"],
    "mr-game-and-watch": ["…", "Beep."],
    reaver: ["Charming.", "Delightful carnage."],
    senua: ["The darkness…", "I see you."],
    ulala: ["Groove!", "Let's dance!"],
    "ecco-dolphin": ["…", "~"],
    ecco: ["…", "~"],
    "axel-stone": ["Here comes a new challenger!", "Grand!"],
    blaze: ["Ready.", "Burn!"],
    "blaze-fielding": ["Let's go!", "Clear!"],
    pit: ["What?!", "I'm not done yet!"],
    palutena: ["Pit, move!", "Divine light."],
    ness: ["OK!", "PSI!"],
    lucas: ["…!", "PK Love!"],
    "tom-nook": ["Yes yes!", "About that loan…"],
    villageois: ["Hello!", "…"],
    cortana: ["Don't make a girl a promise…", "Chief."],
    "marcus-fenix": ["Come on!", "Gears!"],
    sackboy: ["…!", "Whee!"],
    kat: ["Gravity!", "Dust!"],
    parappa: ["I gotta believe!", "Kick!"],
    ori: ["…", "Light!"],
    rash: ["Rash attack!", "Toads!"],
    "dixie-kong": ["Yahoo!", "Let's roll!"],
    "pyra-mythra": ["Rex!", "Aegis!"],
    rex: ["I got this!", "Elysium!"],
    marie: ["Stay fresh.", "…"],
    "min-min": ["Ramen!", "Extend!"],
    krystal: ["I'm with you.", "Lylat!"],
    "james-mccloud": ["Never give up.", "…"],
    "captain-olimar": ["Pikmin!", "Hocotate!"],
    "general-pepper": ["Do a barrel roll!", "Star Fox!"],
    "wii-fit-trainer": ["Breathe in…", "Feel the stretch!"],
    "ribbon-girl": ["Encore!", "Hit it!"],
    springman: ["Spring!", "Let's fight!"],
    "ayo-et-oli": ["Calamari!", "Ink!"],
    "perle-et-coralie": ["Off the Hook!", "Splat!"],
    "sam-porter-bridges": ["Keep on keeping on.", "…"],
    "sam-porter": ["Keep on keeping on.", "…"],
    ico: ["…", "Yorda!"],
    ryo: ["Here we go!", "Rage!"],
    "joe-musashi": ["Shinobi.", "Hah!"],
    "axel-stone": ["Grand Upper!", "Let's go!"],
    axel: ["Grand Upper!", "Let's go!"],
    "adam-hunter": ["Freeze!", "Move out!"],
    vyse: ["Adventure!", "Blue Rogues!"],
    aika: ["Vyse!", "Ready!"],
    amigo: ["Samba!", "Ole!"],
    "la-fille": ["…", "Smile."],
    "le-joueur": ["…!", "Go!"],
    zombie: ["Braains…", "Grrr…"],
    clarissa: ["Drive!", "Faster!"],
    "tyris-flare": ["Burn!", "Golden Axe!"],
    gena: ["Graffiti!", "Grind!"],
    "billy-hatcher": ["Cock-a-doodle!", "Egg!"],
    "ax-battler": ["Hyaah!", "Axe!"],
    "bd-joe": ["Crazy taxi!", "Fare please!"],
    "death-adder": ["Kneel!", "Fool."],
    "gilius-thunderhead": ["Thunder!", "Hmph."],
    aiai: ["Banana!", "Whee!"],
    "puyo-puyo": ["Puyo!", "Pop!"],
    "dj-professeur-k": ["Turn it up!", "Jet Set!"],
    "pilote-hang-on": ["Lean in!", "Go!"],
    "mec-space-harrier": ["Welcome to the Fantasy Zone!", "Fire!"],
    "taro-sega-boy": ["SEGA!", "Yeah!"],
    "taro-sega-girl": ["SEGA!", "Go!"],
    alberto: ["Alright!", "Let's go!"],
    gus: ["Hmph.", "Ready."],
    "mew-mew": ["Mew!", "Nya!"],
    "jd-fenix": ["Dad…", "COG!"],
    "cyclops-drone": ["…", "Beep."],
    jago: ["Tiger!", "Hiyah!"],
    orchid: ["Kiss!", "Too easy."],
    "capitaine-flameheart": ["Yo-ho!", "Fire!"],
    pirate: ["Arr!", "Treasure!"],
    blinx: ["Sweep!", "Time!"],
    "viva-pinata": ["Party!", "Candy!"],
    "joule-adams": ["Frame!", "Go!"],
    steeve: ["Beep!", "…"],
    cooper: ["Ghoulies!", "Rare!"],
    shu: ["Tiny!", "Run!"],
    lupus: ["Stay sharp.", "…"],
    moine: ["Wololo!", "Convert!"],
    vela: ["Horizon!", "Onward."],
    juno: ["Copy that.", "Roger."],
    vlad: ["Blood!", "Night falls."],
    helix: ["Twist!", "…"],
    peppy: ["Do a barrel roll!", "Fox!"],
    "peppy-hare": ["Do a barrel roll!", "Fox!"],
    slippy: ["I'm hit!", "Engaging!"],
    "slippy-toad": ["I'm hit!", "Engaging!"],
    chupea: ["Chu!", "Squeak!"],
    chubach: ["Chu!", "Go!"],
    chuih: ["Chu!", "Run!"],
    "sakura-shinguji": ["Hah!", "For the Division!"]
  };

  const ROLE_FALLBACK = {
    pawn: ["Forward!", "Charge!", "Go!"],
    knight: ["Jump!", "Hah!", "Now!"],
    bishop: ["Diagonal!", "Focus.", "Ready."],
    rook: ["Hold the line!", "Advance!", "…"],
    queen: ["Watch me.", "My move.", "Ready."],
    unique: ["Special!", "My turn.", "…"]
  };

  const FALLBACK = ["Ready!", "Go!", "Hmm.", "Let's go!", "…!"];

  const ALIASES = {
    masterchief: "master-chief",
    "dr.robotnik": "dr-robotnik",
    "sam-porter": "sam-porter-bridges",
    peppy: "peppy-hare",
    slippy: "slippy-toad",
    ecco: "ecco-dolphin",
    "ayo-oli": "ayo-et-oli"
  };

  function normalizeKey(raw) {
    return String(raw || "")
      .toLowerCase()
      .trim()
      .replace(/_/g, "-")
      .replace(/\s+/g, "-");
  }

  function pickQuote(piece) {
    if (!piece) return null;
    let key = normalizeKey(piece.nameKey || piece.type);
    if (ALIASES[key]) key = ALIASES[key];
    const name = String(piece.name || "").toLowerCase();

    let list = QUOTES[key];
    if (!list) {
      const byName = Object.keys(QUOTES).find(function (k) {
        const nice = k.replace(/-/g, " ");
        return name.includes(nice) || name.includes(k);
      });
      if (byName) list = QUOTES[byName];
    }
    if (!list || !list.length) {
      const role = String(piece.role || "").toLowerCase();
      list = ROLE_FALLBACK[role] || FALLBACK;
    }
    return list[Math.floor(Math.random() * list.length)];
  }

  function formatWinStreak(n) {
    const streak = Number(n) || 0;
    if (streak <= 0) return "";
    if (streak >= 10) return "🔥 GODLIKE";
    if (streak >= 7) return "🔥🔥 ×" + streak;
    return "🔥 ×" + streak;
  }

  global.VGBFlavor = {
    QUOTES,
    pickQuote,
    formatWinStreak
  };
})(window);
