/**
 * Capacités des pièces Unique — Video Games Battle
 * API globale: VGBUniqueAbilities
 */
(function (global) {
  const ORTHO = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  const ALL8 = ORTHO.concat(DIAG);
  const KNIGHT = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
  const QUEEN = { moves: ALL8, range: 8 };
  const BISHOP = { moves: DIAG, range: 8 };

  const state = {
    joannaCloak: null, // { pieceRef, untilPlayerTurn }
    bowserSummoned: {}, // playerId -> [nameKey, ...]
    linkArrowReadyAt: {}, // pieceId -> moveCount
    burnedTiles: [], // { x, y, untilRound, sprite }
    neutralUnits: [], // { x, y, sprite, kind, untilRound, owner }
    masterChiefShield: {}, // piece onlineId/nameKey+player -> available bool
    kirbyMoves: {}, // key -> { moves, range }
    pikachuReadyAt: {},
    ulalaControl: null, // { piece, controller, untilPlayer }
    gnwIsQueen: {}, // player|id -> bool this turn
    lastClick: null // { piece, at }
  };

  function pieceKey(p) {
    return (p.onlineId || (p.player + ':' + (p.nameKey || p.type || p.name) + ':' + p.x + ',' + p.y));
  }

  function typeKey(p) {
    return String(p.type || p.nameKey || '').toLowerCase().replace(/\s+/g, '-');
  }

  function isType(p, ...types) {
    const t = typeKey(p);
    const n = String(p.nameKey || '').toLowerCase();
    return types.some((x) => t === x || n === x || t.includes(x));
  }

  const KOOPALINGS = [
    'larry-koopa',
    'morton-koopa',
    'wendy-koopa',
    'iggy-koopa',
    'roy-koopa',
    'lemmy-koopa',
    'ludwig-koopa'
  ];

  const API = {
    state,
    ORTHO,
    DIAG,
    ALL8,
    KNIGHT,

    onTurnStart(currentPlayer, ctx) {
      // Mr Game & Watch: 1/9 dame sinon fou
      for (const p of ctx.pieces || []) {
        if (p.player !== currentPlayer) continue;
        if (!isType(p, 'mr-game-and-watch', 'mr-game-&-watch')) continue;
        const queen = Math.random() < 1 / 9;
        state.gnwIsQueen[pieceKey(p)] = queen;
        if (ctx.showInfo) {
          ctx.showInfo(queen
            ? 'Mr. Game & Watch adopte le comportement d\'une dame ce tour !'
            : 'Mr. Game & Watch se comporte comme un fou ce tour.', 1800);
        }
      }
      // Expire Joanna cloak when that player's turn returns
      if (state.joannaCloak && state.joannaCloak.untilPlayer === currentPlayer) {
        API.clearJoannaCloak(ctx);
      }
      // Ulala control ends
      if (state.ulalaControl && state.ulalaControl.untilPlayer === currentPlayer) {
        state.ulalaControl = null;
      }
      // Expire burned tiles / neutral units
      API.tickHazards(ctx);
    },

    modifyMovementData(piece, base) {
      if (!piece) return base;
      if (isType(piece, 'mr-game-and-watch', 'mr-game-&-watch')) {
        return state.gnwIsQueen[pieceKey(piece)] ? QUEEN : BISHOP;
      }
      if (isType(piece, 'kirby')) {
        const copied = state.kirbyMoves[piece.player];
        if (copied) return { moves: copied.moves, range: copied.range, special: 'unique' };
        return { moves: KNIGHT, range: 1, special: 'knight' };
      }
      if (isType(piece, 'joanna-dark')) {
        return { moves: ORTHO, range: 4, special: 'unique' };
      }
      return base;
    },

    /** Double-clic Joanna → camouflage */
    handlePieceReselect(piece, ctx) {
      if (!isType(piece, 'joanna-dark')) return false;
      if (piece.player !== ctx.currentPlayer) return false;
      const now = Date.now();
      if (state.lastClick && state.lastClick.piece === piece && now - state.lastClick.at < 450) {
        state.lastClick = null;
        state.joannaCloak = { piece, untilPlayer: piece.player };
        if (piece.sprite) piece.sprite.setAlpha(0.35);
        if (ctx.showInfo) ctx.showInfo('Joanna active le camouflage RCP-120 (1 tour).', 2200);
        return true;
      }
      state.lastClick = { piece, at: now };
      return false;
    },

    clearJoannaCloak(ctx) {
      if (state.joannaCloak && state.joannaCloak.piece && state.joannaCloak.piece.sprite) {
        state.joannaCloak.piece.sprite.setAlpha(1);
      }
      state.joannaCloak = null;
    },

    applyCloakVisibility(ctx) {
      if (!state.joannaCloak || !state.joannaCloak.piece) return;
      const p = state.joannaCloak.piece;
      if (!p.sprite) return;
      const mySeat = ctx.mySeat;
      const isOwnerView = mySeat == null || mySeat === p.player || !ctx.online;
      p.sprite.setAlpha(isOwnerView ? 0.35 : 0.02);
      p.sprite.setVisible(isOwnerView ? true : false);
      // Keep interactable / capturable — visibility only
      if (!isOwnerView) {
        p.sprite.setVisible(true);
        p.sprite.setAlpha(0.001);
      }
    },

    /** Link: 20% block */
    tryBlockCapture(defender, ctx) {
      if (!isType(defender, 'link')) return false;
      if (Math.random() < 0.2) {
        if (ctx.showInfo) ctx.showInfo('Link bloque l\'attaque avec son bouclier !', 2000);
        return true;
      }
      return false;
    },

    onEnemyCaptured(attacker, victim, ctx) {
      if (!victim) return;
      // Kirby copies movement
      if (isType(attacker, 'kirby')) {
        const data = ctx.getPieceMovementData
          ? ctx.getPieceMovementData(victim)
          : { moves: victim.moves || KNIGHT, range: victim.range || 1 };
        state.kirbyMoves[attacker.player] = {
          moves: (data && data.moves) ? data.moves.slice() : KNIGHT.slice(),
          range: (data && data.range) || 1
        };
        if (ctx.showInfo) ctx.showInfo('Kirby aspire le style de déplacement de ' + (victim.name || 'la pièce') + ' !', 2200);
      }
    },

    getNextKoopaling(playerId) {
      const used = state.bowserSummoned[playerId] || [];
      return KOOPALINGS.find((k) => !used.includes(k)) || null;
    },

    remainingKoopalingSummons(playerId) {
      const used = state.bowserSummoned[playerId] || [];
      return Math.max(0, KOOPALINGS.length - used.length);
    },

    canUseSecondary(piece) {
      const t = typeKey(piece);
      if (isType(piece, 'bowser')) {
        return API.remainingKoopalingSummons(piece.player) > 0;
      }
      return [
        'link', 'spyro', 'dr-robotnik', 'dr.robotnik', 'master-chief',
        'pikachu', 'yoshi', 'tails', 'ecco-dolphin', 'ecco', 'ulala'
      ].some((x) => t === x || t.includes(x) || (piece.nameKey || '') === x);
    },

    getSecondaryTargets(piece, ctx) {
      const t = typeKey(piece);
      const out = [];
      if (isType(piece, 'link')) {
        const ready = (state.linkArrowReadyAt[pieceKey(piece)] || 0) <= ctx.moveCount;
        if (!ready) return out;
        for (const [dx, dy] of ORTHO) {
          for (let i = 1; i <= 3; i++) {
            const x = piece.x + dx * i;
            const y = piece.y + dy * i;
            if (x < 0 || y < 0 || x >= ctx.gridSize || y >= ctx.gridSize) break;
            if (ctx.isBlocked && ctx.isBlocked(x, y)) break;
            const occ = ctx.getPieceAt({ x, y });
            if (occ) {
              if (occ.player !== piece.player) out.push({ x, y, kind: 'link-arrow' });
              break;
            }
          }
        }
        return out;
      }
      if (isType(piece, 'spyro')) {
        // burn tile in front — 4 directions adjacent
        for (const [dx, dy] of ORTHO) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          if (x < 0 || y < 0 || x >= ctx.gridSize || y >= ctx.gridSize) continue;
          if (!ctx.getPieceAt({ x, y })) out.push({ x, y, kind: 'spyro-burn' });
        }
        return out;
      }
      if (isType(piece, 'bowser')) {
        if (API.remainingKoopalingSummons(piece.player) <= 0) return out;
        for (const [dx, dy] of ALL8) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          if (x < 0 || y < 0 || x >= ctx.gridSize || y >= ctx.gridSize) continue;
          if (!ctx.getPieceAt({ x, y })) out.push({ x, y, kind: 'bowser-summon' });
        }
        return out;
      }
      if (isType(piece, 'dr-robotnik', 'dr.robotnik')) {
        for (const [dx, dy] of ALL8) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          if (x < 0 || y < 0 || x >= ctx.gridSize || y >= ctx.gridSize) continue;
          if (!ctx.getPieceAt({ x, y })) out.push({ x, y, kind: 'eggman-robot' });
        }
        return out;
      }
      if (isType(piece, 'master-chief')) {
        if (state.masterChiefShield[pieceKey(piece)] === false) return out;
        out.push({ x: piece.x, y: piece.y, kind: 'chief-shield' });
        return out;
      }
      if (isType(piece, 'pikachu')) {
        const ready = (state.pikachuReadyAt[pieceKey(piece)] || 0) <= ctx.moveCount;
        if (!ready) return out;
        out.push({ x: piece.x, y: piece.y, kind: 'pikachu-thunder' });
        return out;
      }
      if (isType(piece, 'yoshi')) {
        for (const [dx, dy] of ALL8) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          const occ = ctx.getPieceAt({ x, y });
          if (occ && occ.player !== piece.player && occ.type !== 'king') {
            out.push({ x, y, kind: 'yoshi-tongue' });
          }
        }
        return out;
      }
      if (isType(piece, 'tails')) {
        for (const [dx, dy] of ALL8) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          const occ = ctx.getPieceAt({ x, y });
          if (occ && occ.player === piece.player) out.push({ x, y, kind: 'tails-carry' });
        }
        return out;
      }
      if (isType(piece, 'ecco-dolphin', 'ecco')) {
        for (const [dx, dy] of ALL8) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          const occ = ctx.getPieceAt({ x, y });
          if (occ && occ.player !== piece.player) out.push({ x, y, kind: 'ecco-sonar' });
        }
        return out;
      }
      if (isType(piece, 'ulala')) {
        for (const [dx, dy] of ALL8) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          const occ = ctx.getPieceAt({ x, y });
          if (occ && occ.player !== piece.player && occ.type !== 'king') {
            out.push({ x, y, kind: 'ulala-control' });
          }
        }
        return out;
      }
      return out;
    },

    applySecondary(piece, pos, ctx) {
      const targets = API.getSecondaryTargets(piece, ctx);
      const hit = targets.find((t) => t.x === pos.x && t.y === pos.y);
      if (!hit) return false;

      if (hit.kind === 'link-arrow') {
        const victim = ctx.getPieceAt(pos);
        if (!victim) return false;
        state.linkArrowReadyAt[pieceKey(piece)] = ctx.moveCount + 3;
        ctx.capturePiece(victim, piece, { ranged: true });
        if (ctx.showInfo) ctx.showInfo('Flèche héroïque !', 1800);
        return true;
      }
      if (hit.kind === 'spyro-burn') {
        API.addBurnedTile(pos.x, pos.y, ctx.roundCounter + 1, ctx);
        if (ctx.showInfo) ctx.showInfo('Souffle de feu : case brûlée 1 tour !', 1800);
        return true;
      }
      if (hit.kind === 'bowser-summon') {
        const nextKey = API.getNextKoopaling(piece.player);
        if (!nextKey) {
          if (ctx.showInfo) ctx.showInfo('Bowser a déjà invoqué ses 7 Koopalings !', 2000);
          return false;
        }
        const catalog = (typeof piecesData !== 'undefined' && piecesData)
          ? piecesData.find((p) => p.nameKey === nextKey || p.type === nextKey)
          : null;
        const spawned = ctx.spawnNeutralOrMinion({
          x: pos.x,
          y: pos.y,
          player: piece.player,
          name: (catalog && catalog.name) || nextKey,
          type: nextKey,
          nameKey: nextKey,
          role: 'pawn',
          image: (catalog && catalog.image) || null,
          textureKey: nextKey,
          fromCatalog: catalog || null
        });
        if (!spawned) return false;
        if (!state.bowserSummoned[piece.player]) state.bowserSummoned[piece.player] = [];
        state.bowserSummoned[piece.player].push(nextKey);
        const left = API.remainingKoopalingSummons(piece.player);
        if (ctx.showInfo) {
          ctx.showInfo(
            'Bowser invoque ' + ((catalog && catalog.name) || nextKey) + ' ! (' + left + ' restant' + (left > 1 ? 's' : '') + ')',
            2200
          );
        }
        return true;
      }
      if (hit.kind === 'eggman-robot') {
        API.addNeutralBlock(pos.x, pos.y, ctx.roundCounter + 1, ctx, 'robot');
        if (ctx.showInfo) ctx.showInfo('Robot Capsule déployé !', 1800);
        return true;
      }
      if (hit.kind === 'chief-shield') {
        state.masterChiefShield[pieceKey(piece)] = true;
        piece._energyShield = true;
        if (ctx.showInfo) ctx.showInfo('Bouclier d\'énergie activé (1 capture ignorée).', 2000);
        return true;
      }
      if (hit.kind === 'pikachu-thunder') {
        const victims = [];
        for (const [dx, dy] of ALL8) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          if ((x + y) % 2 !== 0) continue; // cases « blanches » (même parité que 0,0)
          const occ = ctx.getPieceAt({ x, y });
          if (occ && occ.player !== piece.player) victims.push(occ);
        }
        victims.forEach((v) => ctx.capturePiece(v, piece, { ranged: true }));
        state.pikachuReadyAt[pieceKey(piece)] = ctx.moveCount + 2;
        if (ctx.showInfo) ctx.showInfo('Pikachu utilise Éclair !', 2000);
        return true;
      }
      if (hit.kind === 'yoshi-tongue') {
        const victim = ctx.getPieceAt(pos);
        if (!victim) return false;
        const dx = Math.sign(piece.x - victim.x) || 0;
        const dy = Math.sign(piece.y - victim.y) || 0;
        // behind Yoshi = opposite side from victim relative to yoshi
        const bx = piece.x + (piece.x - victim.x);
        const by = piece.y + (piece.y - victim.y);
        if (bx < 0 || by < 0 || bx >= ctx.gridSize || by >= ctx.gridSize) return false;
        if (ctx.getPieceAt({ x: bx, y: by })) return false;
        victim.x = bx;
        victim.y = by;
        if (ctx.updatePieces) ctx.updatePieces();
        if (ctx.showInfo) ctx.showInfo('Langue élastique !', 1800);
        return true;
      }
      if (hit.kind === 'tails-carry') {
        const ally = ctx.getPieceAt(pos);
        if (!ally) return false;
        // "en avant" = vers le camp adverse selon le siège
        const dir = ally.player === 0 ? 1 : -1;
        const nx = ally.x;
        const ny = ally.y + dir;
        if (ny < 0 || ny >= ctx.gridSize) return false;
        if (ctx.getPieceAt({ x: nx, y: ny })) return false;
        ally.y = ny;
        if (ctx.updatePieces) ctx.updatePieces();
        if (ctx.showInfo) ctx.showInfo('Vol de soutien !', 1800);
        return true;
      }
      if (hit.kind === 'ecco-sonar') {
        const victim = ctx.getPieceAt(pos);
        if (!victim) return false;
        const dx = Math.sign(victim.x - piece.x);
        const dy = Math.sign(victim.y - piece.y);
        let nx = victim.x;
        let ny = victim.y;
        for (let i = 0; i < 2; i++) {
          const tx = nx + dx;
          const ty = ny + dy;
          if (tx < 0 || ty < 0 || tx >= ctx.gridSize || ty >= ctx.gridSize) break;
          if (ctx.getPieceAt({ x: tx, y: ty })) break;
          nx = tx;
          ny = ty;
        }
        victim.x = nx;
        victim.y = ny;
        if (ctx.updatePieces) ctx.updatePieces();
        if (ctx.showInfo) ctx.showInfo('Sonar mystique !', 1800);
        return true;
      }
      if (hit.kind === 'ulala-control') {
        const victim = ctx.getPieceAt(pos);
        if (!victim) return false;
        state.ulalaControl = {
          piece: victim,
          controller: piece.player,
          untilPlayer: piece.player
        };
        victim._ulalaControlledBy = piece.player;
        if (ctx.showInfo) ctx.showInfo('Groove laser : contrôle temporaire !', 2200);
        return true;
      }
      return false;
    },

    tryAbsorbCapture(defender) {
      if (defender && defender._energyShield) {
        defender._energyShield = false;
        state.masterChiefShield[pieceKey(defender)] = false;
        return true;
      }
      return false;
    },

    isTileBurned(x, y) {
      return state.burnedTiles.some((t) => t.x === x && t.y === y);
    },

    isNeutralBlock(x, y) {
      return state.neutralUnits.some((u) => u.x === x && u.y === y);
    },

    addBurnedTile(x, y, untilRound, ctx) {
      state.burnedTiles = state.burnedTiles.filter((t) => !(t.x === x && t.y === y));
      let sprite = null;
      if (ctx.scene) {
        sprite = ctx.scene.add.rectangle(
          ctx.GRID_OFFSET_X + x * ctx.TILE_SIZE + ctx.TILE_SIZE / 2,
          ctx.GRID_OFFSET_Y + y * ctx.TILE_SIZE + ctx.TILE_SIZE / 2,
          ctx.TILE_SIZE - 4,
          ctx.TILE_SIZE - 4,
          0xff5722,
          0.45
        );
        sprite.setDepth(50);
      }
      state.burnedTiles.push({ x, y, untilRound, sprite });
    },

    addNeutralBlock(x, y, untilRound, ctx, kind) {
      let sprite = null;
      if (ctx.scene) {
        const key = kind === 'robot' && ctx.scene.textures.exists('eggman-robot')
          ? 'eggman-robot'
          : null;
        if (key) {
          sprite = ctx.scene.add.image(
            ctx.GRID_OFFSET_X + x * ctx.TILE_SIZE + ctx.TILE_SIZE / 2,
            ctx.GRID_OFFSET_Y + y * ctx.TILE_SIZE + ctx.TILE_SIZE / 2,
            key
          );
          sprite.setDisplaySize(ctx.TILE_SIZE * 0.7, ctx.TILE_SIZE * 0.7);
          sprite.setDepth(60);
        } else {
          sprite = ctx.scene.add.circle(
            ctx.GRID_OFFSET_X + x * ctx.TILE_SIZE + ctx.TILE_SIZE / 2,
            ctx.GRID_OFFSET_Y + y * ctx.TILE_SIZE + ctx.TILE_SIZE / 2,
            ctx.TILE_SIZE * 0.28,
            0x90a4ae,
            0.9
          );
          sprite.setDepth(60);
        }
      }
      state.neutralUnits.push({ x, y, untilRound, sprite, kind });
    },

    tickHazards(ctx) {
      const round = ctx.roundCounter;
      state.burnedTiles = state.burnedTiles.filter((t) => {
        if (t.untilRound <= round) {
          if (t.sprite) t.sprite.destroy();
          return false;
        }
        return true;
      });
      state.neutralUnits = state.neutralUnits.filter((u) => {
        if (u.untilRound <= round) {
          if (u.sprite) u.sprite.destroy();
          return false;
        }
        return true;
      });
    },

    controlledPieceOwnerOverride(piece) {
      if (state.ulalaControl && state.ulalaControl.piece === piece) {
        return state.ulalaControl.controller;
      }
      return null;
    }
  };

  global.VGBUniqueAbilities = API;
})(typeof window !== 'undefined' ? window : global);
