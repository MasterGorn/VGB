/**
 * IA locale Video Games Battle — facile / moyenne / difficile.
 * S'appuie sur getReachablePositions / getPieceAt fournis par play.html.
 */
(function (global) {
  'use strict';

  var ROLE_VALUE = {
    pawn: 10,
    knight: 30,
    bishop: 32,
    rook: 50,
    queen: 90,
    unique: 42,
    king: 1000
  };

  function pieceValue(p) {
    if (!p) return 0;
    if (p.type === 'king') return 10000;
    return ROLE_VALUE[p.role] || ROLE_VALUE[p.type] || 15;
  }

  function centerBonus(x, y, gridSize) {
    var c = (gridSize - 1) / 2;
    return 3 - (Math.abs(x - c) + Math.abs(y - c)) * 0.35;
  }

  function enemyKing(pieces, seat) {
    for (var i = 0; i < pieces.length; i++) {
      var p = pieces[i];
      if (p.player !== seat && p.type === 'king') return p;
    }
    return null;
  }

  function kingProximity(to, pieces, seat) {
    var k = enemyKing(pieces, seat);
    if (!k) return 0;
    var d = Math.abs(to.x - k.x) + Math.abs(to.y - k.y);
    return Math.max(0, 8 - d) * 0.6;
  }

  function enumerateMoves(api, seat, onlyPiece) {
    var list = [];
    var pieces = api.pieces;
    for (var i = 0; i < pieces.length; i++) {
      var piece = pieces[i];
      if (piece.player !== seat) continue;
      if (onlyPiece && piece !== onlyPiece) continue;
      var targets = api.getMoves(piece) || [];
      for (var t = 0; t < targets.length; t++) {
        var to = targets[t];
        var target = api.getPieceAt(to);
        if (target && target.player !== seat && api.isStarProtected && api.isStarProtected(target)) {
          continue;
        }
        list.push({ piece: piece, from: { x: piece.x, y: piece.y }, to: { x: to.x, y: to.y } });
      }
    }
    return list;
  }

  function scoreImmediate(api, move, seat) {
    var target = api.getPieceAt(move.to);
    var score = 0;
    if (target && target.player !== seat) {
      if (target.type === 'king') score += 100000;
      else if (api.hasHeart && api.hasHeart(target)) score += 8;
      else score += pieceValue(target) * 12;
    }
    score += centerBonus(move.to.x, move.to.y, api.gridSize || 9);
    score += kingProximity(move.to, api.pieces, seat);
    // légère préférence à avancer les pièces non-roi
    if (move.piece.type !== 'king') {
      var dir = seat === 0 ? 1 : -1;
      score += (move.to.y - move.from.y) * dir * 0.4;
    } else {
      score -= 2;
    }
    return score;
  }

  function pickRandom(moves) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  function pickBest(moves, scoreFn, noise) {
    var best = null;
    var bestScore = -Infinity;
    for (var i = 0; i < moves.length; i++) {
      var s = scoreFn(moves[i]) + (Math.random() - 0.5) * (noise || 0);
      if (s > bestScore) {
        bestScore = s;
        best = moves[i];
      }
    }
    return best;
  }

  /**
   * Simule un coup sur le tableau live (sync) puis restaure.
   */
  function withSimulatedMove(api, move, seat, fn) {
    var piece = move.piece;
    var ox = piece.x;
    var oy = piece.y;
    var target = api.getPieceAt(move.to);
    var removed = null;
    var heartHit = false;

    if (target && target.player !== seat) {
      if (api.hasHeart && api.hasHeart(target)) {
        heartHit = true;
      } else {
        removed = target;
        var idx = api.pieces.indexOf(target);
        if (idx >= 0) api.pieces.splice(idx, 1);
      }
    }

    if (!heartHit) {
      piece.x = move.to.x;
      piece.y = move.to.y;
    }

    var result;
    try {
      result = fn(removed, heartHit);
    } finally {
      piece.x = ox;
      piece.y = oy;
      if (removed) api.pieces.push(removed);
    }
    return result;
  }

  function bestCaptureValue(api, seat) {
    var moves = enumerateMoves(api, seat);
    var best = 0;
    for (var i = 0; i < moves.length; i++) {
      var t = api.getPieceAt(moves[i].to);
      if (t && t.player !== seat) {
        if (t.type === 'king') return 100000;
        if (api.hasHeart && api.hasHeart(t)) continue;
        var v = pieceValue(t);
        if (v > best) best = v;
      }
    }
    return best;
  }

  function evaluateBoard(api, seat) {
    var me = 0;
    var opp = 0;
    var oppSeat = seat === 0 ? 1 : 0;
    for (var i = 0; i < api.pieces.length; i++) {
      var p = api.pieces[i];
      var v = pieceValue(p);
      if (p.player === seat) me += v;
      else opp += v;
    }
    me += enumerateMoves(api, seat).length * 0.15;
    opp += enumerateMoves(api, oppSeat).length * 0.15;
    return me - opp;
  }

  function scoreHard(api, move, seat) {
    var immediate = scoreImmediate(api, move, seat);
    var oppSeat = seat === 0 ? 1 : 0;

    return withSimulatedMove(api, move, seat, function (removed) {
      if (removed && removed.type === 'king') return 100000;
      var reply = bestCaptureValue(api, oppSeat) * 11;
      // notre pièce sur to est-elle capturable ?
      var hanging = 0;
      var after = api.getPieceAt(move.to);
      if (after && after.player === seat) {
        var oppMoves = enumerateMoves(api, oppSeat);
        for (var i = 0; i < oppMoves.length; i++) {
          if (oppMoves[i].to.x === move.to.x && oppMoves[i].to.y === move.to.y) {
            hanging = pieceValue(after) * 10;
            break;
          }
        }
      }
      var staticEval = evaluateBoard(api, seat);
      return immediate + staticEval * 0.8 - reply - hanging;
    });
  }

  function minimaxRoot(api, moves, seat, depth) {
    var oppSeat = seat === 0 ? 1 : 0;
    var best = null;
    var bestScore = -Infinity;

    for (var i = 0; i < moves.length; i++) {
      var move = moves[i];
      var score = withSimulatedMove(api, move, seat, function (removed) {
        if (removed && removed.type === 'king') return 100000;
        if (depth <= 1) {
          return evaluateBoard(api, seat) - bestCaptureValue(api, oppSeat) * 8;
        }
        var replies = enumerateMoves(api, oppSeat);
        if (!replies.length) return evaluateBoard(api, seat);
        var worst = Infinity;
        var limit = Math.min(replies.length, 40);
        // échantillonner les meilleures réponses adverses
        replies.sort(function (a, b) {
          return scoreImmediate(api, b, oppSeat) - scoreImmediate(api, a, oppSeat);
        });
        for (var r = 0; r < limit; r++) {
          var rs = withSimulatedMove(api, replies[r], oppSeat, function (cap) {
            if (cap && cap.type === 'king') return -100000;
            return evaluateBoard(api, seat);
          });
          if (rs < worst) worst = rs;
        }
        return worst;
      });

      score += scoreImmediate(api, move, seat) * 0.05;
      if (score > bestScore) {
        bestScore = score;
        best = move;
      }
    }
    return best;
  }

  function chooseMove(api) {
    if (!api || !api.pieces || !api.getMoves || !api.getPieceAt) return null;
    var seat = typeof api.seat === 'number' ? api.seat : 1;
    var difficulty = api.difficulty || 'medium';
    var onlyPiece = api.onlyPiece || null;
    var moves = enumerateMoves(api, seat, onlyPiece);
    if (!moves.length) return null;

    if (difficulty === 'easy') {
      // 70% aléatoire, 30% un coup un peu meilleur
      if (Math.random() < 0.7) return pickRandom(moves);
      return pickBest(moves, function (m) { return scoreImmediate(api, m, seat); }, 25);
    }

    if (difficulty === 'hard') {
      if (moves.length > 80) {
        // pré-filtre sur score immédiat pour limiter le branching
        moves.sort(function (a, b) {
          return scoreHard(api, b, seat) - scoreHard(api, a, seat);
        });
        moves = moves.slice(0, 50);
      }
      return minimaxRoot(api, moves, seat, 2) || pickBest(moves, function (m) {
        return scoreHard(api, m, seat);
      }, 2);
    }

    // medium
    return pickBest(moves, function (m) {
      return scoreImmediate(api, m, seat);
    }, 6);
  }

  global.VGBAI = {
    chooseMove: chooseMove,
    pieceValue: pieceValue
  };
})(typeof window !== 'undefined' ? window : globalThis);
