/**
 * IA locale Video Games Battle — facile / moyenne / difficile / expert.
 * S'appuie sur getReachablePositions / getPieceAt fournis par play.html.
 * Prend en compte mines, bananes, tourelles adverses.
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

  function trapPenalty(api, to, seat, piece) {
    var traps = api.traps;
    if (!traps || !to) return 0;
    var penalty = 0;
    var mines = traps.mines || [];
    for (var i = 0; i < mines.length; i++) {
      var m = mines[i];
      if (m.x === to.x && m.y === to.y) {
        // Mine adverse (ou inconnue) : très dangereux
        if (m.playerId !== seat) {
          penalty += piece && piece.type === 'king' ? 80000 : pieceValue(piece) * 18;
        } else {
          // Sa propre mine : encore une mauvaise idée
          penalty += pieceValue(piece) * 8;
        }
      }
    }
    var bananas = traps.bananas || [];
    for (var b = 0; b < bananas.length; b++) {
      if (bananas[b].x === to.x && bananas[b].y === to.y) {
        penalty += 35;
      }
    }
    var turrets = traps.turrets || [];
    for (var t = 0; t < turrets.length; t++) {
      var tur = turrets[t];
      if (tur.playerId !== seat && tur.column === to.x) {
        penalty += piece && piece.type === 'king' ? 90000 : pieceValue(piece) * 20;
      }
    }
    return penalty;
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
    if (move.piece.type !== 'king') {
      var dir = seat === 0 ? 1 : -1;
      score += (move.to.y - move.from.y) * dir * 0.4;
    } else {
      score -= 2;
    }
    score -= trapPenalty(api, move.to, seat, move.piece);
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

    var ek = enemyKing(api.pieces, seat);
    var mk = enemyKing(api.pieces, oppSeat);
    if (ek) {
      var ourMoves = enumerateMoves(api, seat);
      var pressure = 0;
      for (var j = 0; j < ourMoves.length; j++) {
        if (ourMoves[j].to.x === ek.x && ourMoves[j].to.y === ek.y) pressure += 80;
        else {
          var d = Math.abs(ourMoves[j].to.x - ek.x) + Math.abs(ourMoves[j].to.y - ek.y);
          if (d <= 2) pressure += 2;
        }
      }
      me += pressure;
    }
    if (mk) {
      var threats = bestCaptureValue(api, oppSeat);
      if (threats >= 100000) me -= 500;
      // Roi sur colonne tourelle adverse
      var turrets = (api.traps && api.traps.turrets) || [];
      for (var ti = 0; ti < turrets.length; ti++) {
        if (turrets[ti].playerId === oppSeat && turrets[ti].column === mk.x) me -= 40;
      }
    }

    return me - opp;
  }

  function scoreHard(api, move, seat) {
    var immediate = scoreImmediate(api, move, seat);
    var oppSeat = seat === 0 ? 1 : 0;

    return withSimulatedMove(api, move, seat, function (removed) {
      if (removed && removed.type === 'king') return 100000;
      var reply = bestCaptureValue(api, oppSeat) * 12;
      var hanging = 0;
      var after = api.getPieceAt(move.to);
      if (after && after.player === seat) {
        var oppMoves = enumerateMoves(api, oppSeat);
        for (var i = 0; i < oppMoves.length; i++) {
          if (oppMoves[i].to.x === move.to.x && oppMoves[i].to.y === move.to.y) {
            hanging = pieceValue(after) * 12;
            break;
          }
        }
      }
      var staticEval = evaluateBoard(api, seat);
      return immediate + staticEval * 0.9 - reply - hanging;
    });
  }

  function scoreExpert(api, move, seat) {
    var immediate = scoreImmediate(api, move, seat);
    var oppSeat = seat === 0 ? 1 : 0;

    return withSimulatedMove(api, move, seat, function (removed) {
      if (removed && removed.type === 'king') return 200000;
      var reply = bestCaptureValue(api, oppSeat) * 16;
      var hanging = 0;
      var after = api.getPieceAt(move.to);
      if (after && after.player === seat) {
        var oppMoves = enumerateMoves(api, oppSeat);
        for (var i = 0; i < oppMoves.length; i++) {
          if (oppMoves[i].to.x === move.to.x && oppMoves[i].to.y === move.to.y) {
            hanging = pieceValue(after) * 16;
            break;
          }
        }
      }
      var kingDanger = 0;
      var myKing = enemyKing(api.pieces, oppSeat);
      if (myKing) {
        var threatsOnKing = enumerateMoves(api, oppSeat);
        for (var k = 0; k < threatsOnKing.length; k++) {
          if (threatsOnKing[k].to.x === myKing.x && threatsOnKing[k].to.y === myKing.y) {
            kingDanger = 1200;
            break;
          }
        }
        kingDanger += trapPenalty(api, { x: myKing.x, y: myKing.y }, seat, myKing) * 0.02;
      }
      var staticEval = evaluateBoard(api, seat);
      return immediate * 1.2 + staticEval * 1.25 - reply - hanging - kingDanger;
    });
  }

  function minimaxRoot(api, moves, seat, depth, opts) {
    opts = opts || {};
    var oppSeat = seat === 0 ? 1 : 0;
    var best = null;
    var bestScore = -Infinity;
    var replyLimit = opts.replyLimit || 40;
    var scoreFn = opts.scoreFn || scoreImmediate;

    moves = moves.slice().sort(function (a, b) {
      return scoreFn(api, b, seat) - scoreFn(api, a, seat);
    });

    for (var i = 0; i < moves.length; i++) {
      var move = moves[i];
      var score = withSimulatedMove(api, move, seat, function (removed) {
        if (removed && removed.type === 'king') return 200000;
        if (depth <= 1) {
          return evaluateBoard(api, seat) - bestCaptureValue(api, oppSeat) * (opts.quietFactor || 8);
        }
        var replies = enumerateMoves(api, oppSeat);
        if (!replies.length) return evaluateBoard(api, seat) + 50;
        var worst = Infinity;
        var limit = Math.min(replies.length, replyLimit);
        replies.sort(function (a, b) {
          return scoreImmediate(api, b, oppSeat) - scoreImmediate(api, a, oppSeat);
        });
        for (var r = 0; r < limit; r++) {
          var rs = withSimulatedMove(api, replies[r], oppSeat, function (cap) {
            if (cap && cap.type === 'king') return -200000;
            if (depth >= 3) {
              var ourReplies = enumerateMoves(api, seat);
              if (!ourReplies.length) return evaluateBoard(api, seat) - 30;
              ourReplies.sort(function (a, b) {
                return scoreImmediate(api, b, seat) - scoreImmediate(api, a, seat);
              });
              var bestReply = -Infinity;
              var lim2 = Math.min(ourReplies.length, opts.depth3Limit || 22);
              for (var o = 0; o < lim2; o++) {
                var os = withSimulatedMove(api, ourReplies[o], seat, function (c2) {
                  if (c2 && c2.type === 'king') return 200000;
                  return evaluateBoard(api, seat) - trapPenalty(api, ourReplies[o].to, seat, ourReplies[o].piece) * 0.05;
                });
                if (os > bestReply) bestReply = os;
              }
              return bestReply;
            }
            return evaluateBoard(api, seat);
          });
          if (rs < worst) worst = rs;
        }
        return worst;
      });

      score += scoreImmediate(api, move, seat) * (opts.immediateWeight || 0.05);
      score -= trapPenalty(api, move.to, seat, move.piece) * (opts.trapWeight || 0.15);
      if (score > bestScore) {
        bestScore = score;
        best = move;
      }
    }
    return best;
  }

  function filterSuicidal(api, moves, seat) {
    var safe = [];
    for (var i = 0; i < moves.length; i++) {
      var m = moves[i];
      var pen = trapPenalty(api, m.to, seat, m.piece);
      // Garder les coups suicidaires seulement s’ils capturent le roi
      var target = api.getPieceAt(m.to);
      if (pen >= 50000 && !(target && target.type === 'king')) continue;
      safe.push(m);
    }
    return safe.length ? safe : moves;
  }

  function chooseMove(api) {
    if (!api || !api.pieces || !api.getMoves || !api.getPieceAt) return null;
    var seat = typeof api.seat === 'number' ? api.seat : 1;
    var difficulty = api.difficulty || 'medium';
    var onlyPiece = api.onlyPiece || null;
    var moves = enumerateMoves(api, seat, onlyPiece);
    if (!moves.length) return null;

    if (difficulty === 'easy') {
      // Très souvent aléatoire ; ignore souvent les pièges
      if (Math.random() < 0.82) return pickRandom(moves);
      return pickBest(moves, function (m) { return scoreImmediate(api, m, seat); }, 40);
    }

    moves = filterSuicidal(api, moves, seat);

    if (difficulty === 'expert') {
      if (moves.length > 50) {
        moves.sort(function (a, b) {
          return scoreExpert(api, b, seat) - scoreExpert(api, a, seat);
        });
        moves = moves.slice(0, 32);
      }
      return minimaxRoot(api, moves, seat, 3, {
        replyLimit: 32,
        quietFactor: 14,
        immediateWeight: 0.1,
        trapWeight: 0.35,
        depth3Limit: 24,
        scoreFn: scoreExpert
      }) || pickBest(moves, function (m) {
        return scoreExpert(api, m, seat);
      }, 0);
    }

    if (difficulty === 'hard') {
      if (moves.length > 70) {
        moves.sort(function (a, b) {
          return scoreHard(api, b, seat) - scoreHard(api, a, seat);
        });
        moves = moves.slice(0, 45);
      }
      return minimaxRoot(api, moves, seat, 2, {
        replyLimit: 36,
        quietFactor: 10,
        immediateWeight: 0.08,
        trapWeight: 0.25,
        scoreFn: scoreHard
      }) || pickBest(moves, function (m) {
        return scoreHard(api, m, seat);
      }, 1);
    }

    // medium : conscient des pièges, un peu de bruit, pas de minimax profond
    return pickBest(moves, function (m) {
      return scoreImmediate(api, m, seat) + evaluateBoard(api, seat) * 0.05;
    }, 5);
  }

  global.VGBAI = {
    chooseMove: chooseMove,
    pieceValue: pieceValue
  };
})(typeof window !== 'undefined' ? window : globalThis);
