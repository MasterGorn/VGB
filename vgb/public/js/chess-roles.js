/**
 * Rôles d'échecs VGB — modes VGB (9×9 + Unique) et Classique (8×8)
 * VGB rangée arrière : T C F D R U F C T
 * Classique           : T C F D R F C T
 *
 * Les personnages Unique ont aussi un rôle classique (ex. Bowser → Tour)
 * pour pouvoir remplir les quotas en mode échecs traditionnels.
 */
(function (global) {
  const ROLE_LABELS = {
    pawn: 'Pion',
    knight: 'Cavalier',
    bishop: 'Fou',
    rook: 'Tour',
    queen: 'Dame',
    king: 'Roi',
    unique: 'Unique'
  };

  /** Rôle d'échecs standard associé à chaque Unique (nameKey) */
  const UNIQUE_CLASSIC_ROLES = {
    bowser: 'rook',
    'mr-game-and-watch': 'rook',
    'dr-robotnik': 'rook',
    'master-chief': 'rook',
    'joanna-dark': 'rook',
    link: 'knight',
    yoshi: 'knight',
    pikachu: 'knight',
    tails: 'knight',
    kirby: 'bishop',
    jak: 'bishop',
    ulala: 'bishop',
    'ecco-dolphin': 'rook',
    moine: 'bishop',
    'viva-pinata': 'pawn',
    bayonetta: 'queen',
    mewtwo: 'queen',
    senua: 'queen'
  };

  const MODES = {
    vgb: {
      id: 'vgb',
      gridSize: 9,
      maxArmySize: 17,
      roleLimits: { pawn: 9, knight: 2, bishop: 2, rook: 2, queen: 1, unique: 1 },
      backRank: ['rook', 'knight', 'bishop', 'queen', 'king', 'unique', 'bishop', 'knight', 'rook'],
      items: true,
      label: 'Video Games Battle'
    },
    classic: {
      id: 'classic',
      gridSize: 8,
      maxArmySize: 15,
      roleLimits: { pawn: 8, knight: 2, bishop: 2, rook: 2, queen: 1 },
      backRank: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
      items: false,
      label: 'Échecs traditionnels'
    }
  };

  let currentMode = MODES.vgb;

  function setGameMode(modeId) {
    currentMode = MODES[modeId] || MODES.vgb;
    return currentMode;
  }

  function getGameMode() {
    return currentMode;
  }

  function isClassicMode() {
    return currentMode.id === 'classic';
  }

  function getRoleLimits() {
    return currentMode.roleLimits;
  }

  function getBackRankRoles() {
    return currentMode.backRank;
  }

  function getRoleLabel(role) {
    return ROLE_LABELS[role] || role;
  }

  function getClassicRole(piece) {
    if (!piece) return null;
    if (piece.classicRole && ROLE_LABELS[piece.classicRole] && piece.classicRole !== 'unique' && piece.classicRole !== 'king') {
      return piece.classicRole;
    }
    const key = piece.nameKey || piece.type || '';
    if (UNIQUE_CLASSIC_ROLES[key]) return UNIQUE_CLASSIC_ROLES[key];
    if (piece.role && piece.role !== 'unique' && piece.role !== 'king') return piece.role;
    const moves = piece.moves || [];
    const range = piece.range || 1;
    const n = moves.length;
    if (n === 4 && range >= 3) return 'rook';
    if (n >= 8 && range >= 4) return 'queen';
    if (n >= 8 && range === 1) return 'knight';
    if (n === 4 || (n >= 8 && range <= 3)) return 'bishop';
    return 'knight';
  }

  /** La pièce peut-elle être choisie pour ce rôle de draft dans le mode courant ? */
  function pieceMatchesDraftRole(piece, draftRole) {
    if (!piece || !draftRole || piece.type === 'king' || piece.role === 'king') return false;
    if (piece.role === draftRole) return true;
    if (isClassicMode() && piece.role === 'unique' && draftRole !== 'unique') {
      return getClassicRole(piece) === draftRole;
    }
    return false;
  }

  function countRoleInArmy(army, role) {
    return (army || []).filter(p => p && p.role === role).length;
  }

  function isArmyComplete(army) {
    const limits = getRoleLimits();
    const list = army || [];
    for (let i = 0; i < list.length; i++) {
      const role = list[i] && list[i].role;
      if (role && role !== 'king' && !(role in limits)) return false;
    }
    return Object.keys(limits).every(role => countRoleInArmy(list, role) === limits[role]);
  }

  function armyProgress(army) {
    const limits = getRoleLimits();
    let have = 0;
    let need = 0;
    for (const role of Object.keys(limits)) {
      have += Math.min(countRoleInArmy(army, role), limits[role]);
      need += limits[role];
    }
    return { have, need };
  }

  const ORTHO = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  const ALL = ORTHO.concat(DIAG);
  const KNIGHT = [
    [1, 2], [2, 1], [2, -1], [1, -2],
    [-1, -2], [-2, -1], [-2, 1], [-1, 2]
  ];

  function getChessMovement(piece) {
    const role = piece.role || 'pawn';
    if (role === 'unique') {
      return {
        moves: piece.moves || ALL,
        range: piece.range || 3,
        special: 'unique'
      };
    }
    if (role === 'king') {
      return { moves: ALL, range: 1, special: null };
    }
    if (role === 'knight') {
      return { moves: KNIGHT, range: 1, special: 'knight' };
    }
    if (role === 'bishop') {
      return { moves: DIAG, range: 8, special: null };
    }
    if (role === 'rook') {
      return { moves: ORTHO, range: 8, special: null };
    }
    if (role === 'queen') {
      return { moves: ALL, range: 8, special: null };
    }
    return { moves: [], range: 1, special: 'pawn' };
  }

  function getChessStartPositions(army, playerIndex, gridSize) {
    const byRole = { pawn: [], knight: [], bishop: [], rook: [], queen: [], unique: [] };
    for (const p of army || []) {
      if (p && byRole[p.role]) byRole[p.role].push(p);
    }

    const size = gridSize || currentMode.gridSize;
    const backRank = getBackRankRoles();
    const yBack = playerIndex === 0 ? 0 : size - 1;
    const yPawn = playerIndex === 0 ? 1 : size - 2;
    const placements = [];
    const kingX = backRank.indexOf('king');
    const kingIndex = kingX >= 0 ? kingX : Math.floor(size / 2);

    placements.push({
      role: 'king',
      piece: null,
      x: kingIndex,
      y: yBack
    });

    const take = (role) => byRole[role].shift() || null;

    for (let x = 0; x < size; x++) {
      const role = backRank[x];
      if (!role || role === 'king') continue;
      placements.push({ role, piece: take(role), x, y: yBack });
    }

    for (let x = 0; x < size; x++) {
      placements.push({ role: 'pawn', piece: take('pawn'), x, y: yPawn });
    }

    return placements;
  }

  function pawnDirection(playerIndex) {
    return playerIndex === 0 ? 1 : -1;
  }

  global.VGBChess = {
    ROLE_LABELS,
    UNIQUE_CLASSIC_ROLES,
    get ROLE_LIMITS() { return getRoleLimits(); },
    get BACK_RANK_ROLES() { return getBackRankRoles(); },
    MODES,
    setGameMode,
    getGameMode,
    isClassicMode,
    getRoleLabel,
    getClassicRole,
    pieceMatchesDraftRole,
    countRoleInArmy,
    isArmyComplete,
    armyProgress,
    getChessMovement,
    getChessStartPositions,
    pawnDirection
  };
})(window);
