/**
 * Rôles d'échecs VGB — plateau 9×9
 * Rangée arrière : T C F D R U F C T  (Roi au centre, Unique en face de la Dame)
 * Rangée avant  : 9 pions
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

  const ROLE_LIMITS = {
    pawn: 9,
    knight: 2,
    bishop: 2,
    rook: 2,
    queen: 1,
    unique: 1
  };

  /** Ordre des cases de la rangée arrière (x = 0..8) */
  const BACK_RANK_ROLES = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'unique', 'bishop', 'knight', 'rook'
  ];

  const ORTHO = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  const ALL = ORTHO.concat(DIAG);
  const KNIGHT = [
    [1, 2], [2, 1], [2, -1], [1, -2],
    [-1, -2], [-2, -1], [-2, 1], [-1, 2]
  ];

  function getRoleLabel(role) {
    return ROLE_LABELS[role] || role;
  }

  function countRoleInArmy(army, role) {
    return (army || []).filter(p => p && p.role === role).length;
  }

  function isArmyComplete(army) {
    return Object.keys(ROLE_LIMITS).every(role => countRoleInArmy(army, role) >= ROLE_LIMITS[role]);
  }

  function armyProgress(army) {
    let have = 0;
    let need = 0;
    for (const role of Object.keys(ROLE_LIMITS)) {
      have += Math.min(countRoleInArmy(army, role), ROLE_LIMITS[role]);
      need += ROLE_LIMITS[role];
    }
    return { have, need };
  }

  /** Mouvements standards d'échecs selon le rôle (Unique = moves du personnage) */
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
    // pawn — traité à part
    return { moves: [], range: 1, special: 'pawn' };
  }

  /**
   * Positions de départ type échecs 9×9
   * player 0 = haut (pions vers le bas), player 1 = bas (pions vers le haut)
   */
  function getChessStartPositions(army, playerIndex, gridSize) {
    const byRole = { pawn: [], knight: [], bishop: [], rook: [], queen: [], unique: [] };
    for (const p of army || []) {
      if (p && byRole[p.role]) byRole[p.role].push(p);
    }

    const yBack = playerIndex === 0 ? 0 : gridSize - 1;
    const yPawn = playerIndex === 0 ? 1 : gridSize - 2;
    const placements = [];

    // Roi au centre (index 4)
    placements.push({
      role: 'king',
      piece: null,
      x: 4,
      y: yBack
    });

    const take = (role) => byRole[role].shift() || null;

    for (let x = 0; x < 9; x++) {
      const role = BACK_RANK_ROLES[x];
      if (role === 'king') continue;
      placements.push({ role, piece: take(role), x, y: yBack });
    }

    for (let x = 0; x < 9; x++) {
      placements.push({ role: 'pawn', piece: take('pawn'), x, y: yPawn });
    }

    return placements;
  }

  /** Direction du pion : +1 (vers le bas) pour joueur haut, -1 pour joueur bas */
  function pawnDirection(playerIndex) {
    return playerIndex === 0 ? 1 : -1;
  }

  global.VGBChess = {
    ROLE_LABELS,
    ROLE_LIMITS,
    BACK_RANK_ROLES,
    getRoleLabel,
    countRoleInArmy,
    isArmyComplete,
    armyProgress,
    getChessMovement,
    getChessStartPositions,
    pawnDirection
  };
})(window);
