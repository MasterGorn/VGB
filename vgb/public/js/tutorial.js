/**
 * Tutoriels guidés VGB — leçons courtes, style coach (sélection + action).
 */
(function (global) {
  const STORAGE_DONE = 'vgb-tutorial-done';
  const STORAGE_SEEN = 'vgb-tutorial-seen';

  const IMAGES = {
    toad: '/images/nintendo/characters/toad.png',
    king: '/images/xbox/characters/king.png',
    mario: '/images/nintendo/characters/mario.png',
    bayonetta: '/images/nintendo/characters/bayonetta.png',
    junior: '/images/nintendo/characters/bowser-junior.png',
    crate: '/images/items/box-item-mario-kart.png',
    star: '/images/items/star.png'
  };

  const LESSONS = [
    {
      id: 'basics',
      title: 'Les bases',
      icon: '🎯',
      meta: '4 étapes · ~1 min',
      desc: 'Déplacer, capturer, gagner.',
      steps: [
        {
          title: 'LE BUT',
          icon: '🎯',
          text: 'Video Games Battle oppose deux armées de personnages de jeux vidéo. Pour gagner, capture le roi adverse.',
          visual: 'goal',
          bullets: [
            'Plateau 9×9, chacun son tour.',
            'Les personnages sont des skins de rôles d’échecs.',
            'Capturer le roi termine la partie.'
          ],
          hint: 'Observe l’objectif, puis continue.'
        },
        {
          title: 'DÉPLACER',
          icon: '♟️',
          text: 'Un pion avance d’une case vers l’avant. Touche ta pièce, puis la case verte.',
          instruction: 'Touche Toad, puis la case devant lui.',
          board: {
            size: 5,
            pieces: [
              { id: 'toad', x: 2, y: 3, role: 'pawn', team: 'you', img: IMAGES.toad, name: 'Toad', letter: 'P' }
            ],
            glow: 'toad',
            dest: [{ x: 2, y: 2 }]
          },
          expect: { piece: 'toad', to: { x: 2, y: 2 } }
        },
        {
          title: 'CAPTURER',
          icon: '⚔️',
          text: 'Un pion capture en diagonale, en se plaçant sur la pièce adverse.',
          instruction: 'Touche Toad, puis Bowser Jr.',
          board: {
            size: 5,
            pieces: [
              { id: 'toad', x: 2, y: 3, role: 'pawn', team: 'you', img: IMAGES.toad, name: 'Toad', letter: 'P' },
              { id: 'enemy', x: 3, y: 2, role: 'pawn', team: 'foe', img: IMAGES.junior, name: 'Bowser Jr.', letter: 'P' }
            ],
            glow: 'toad',
            dest: [{ x: 3, y: 2 }]
          },
          expect: { piece: 'toad', to: { x: 3, y: 2 } }
        },
        {
          title: 'VICTOIRE',
          icon: '👑',
          text: 'La partie se termine dès que le roi est capturé (ou qu’un joueur n’a plus de temps). Tu as les bases !',
          hint: 'Rends-toi dans Tutoriel pour les objets et les rôles, quand tu veux.',
          board: {
            size: 5,
            pieces: [
              { id: 'toad', x: 2, y: 2, role: 'pawn', team: 'you', img: IMAGES.toad, name: 'Toad', letter: 'P' },
              { id: 'king', x: 2, y: 0, role: 'king', team: 'foe', img: IMAGES.king, name: 'Phil Spencer', letter: 'R' }
            ]
          }
        }
      ]
    },
    {
      id: 'items',
      title: 'Les objets',
      icon: '📦',
      meta: '3 étapes · ~1 min',
      desc: 'Caisses, inventaire, un objet par tour.',
      steps: [
        {
          title: 'LES CAISSES',
          icon: '📦',
          text: 'En mode Video Games Battle, des caisses apparaissent sur les cases claires de la ligne centrale.',
          bullets: [
            'Passer sur une caisse donne un objet aléatoire.',
            'Réserve : 3 objets maximum.',
            'Un seul objet utilisable par tour.'
          ],
          board: {
            size: 5,
            crates: [{ x: 1, y: 2 }, { x: 3, y: 2 }],
            pieces: [
              { id: 'toad', x: 2, y: 4, role: 'pawn', team: 'you', img: IMAGES.toad, name: 'Toad', letter: 'P' }
            ]
          }
        },
        {
          title: 'RAMASSER',
          icon: '🎁',
          text: 'Déplace ta pièce sur la caisse lumineuse pour récupérer un objet.',
          instruction: 'Touche Toad, puis la caisse.',
          board: {
            size: 5,
            crates: [{ x: 2, y: 2, glow: true }],
            pieces: [
              { id: 'toad', x: 2, y: 3, role: 'pawn', team: 'you', img: IMAGES.toad, name: 'Toad', letter: 'P' }
            ],
            glow: 'toad',
            dest: [{ x: 2, y: 2 }]
          },
          expect: { piece: 'toad', to: { x: 2, y: 2 } }
        },
        {
          title: 'UTILISER',
          icon: '⭐',
          text: 'Les objets s’affichent dans ton inventaire. Exemple : l’Étoile rend tes pièces invincibles jusqu’à ton prochain tour.',
          instruction: 'Touche l’Étoile dans l’inventaire.',
          board: {
            size: 5,
            pieces: [
              { id: 'toad', x: 2, y: 2, role: 'pawn', team: 'you', img: IMAGES.toad, name: 'Toad', letter: 'P' }
            ],
            inventory: [{ id: 'star', name: 'Étoile', img: IMAGES.star }]
          },
          expect: { item: 'star' }
        }
      ]
    },
    {
      id: 'roles',
      title: 'Les rôles',
      icon: '♞',
      meta: '3 étapes · ~1 min',
      desc: 'Cavalier, Unique, et le reste.',
      steps: [
        {
          title: '7 RÔLES',
          icon: '♟️',
          text: 'Chaque personnage a un rôle d’échecs. Une lettre sur la pièce l’indique.',
          bullets: [
            'P pion · C cavalier · F fou · T tour',
            'D dame · R roi · U unique',
            'L’Unique a un déplacement propre au personnage.'
          ]
        },
        {
          title: 'LE CAVALIER',
          icon: '♞',
          text: 'Le cavalier saute en L : deux cases puis une sur le côté. Il passe par-dessus les autres pièces.',
          instruction: 'Touche Mario, puis la case lumineuse.',
          board: {
            size: 5,
            pieces: [
              { id: 'mario', x: 1, y: 3, role: 'knight', team: 'you', img: IMAGES.mario, name: 'Mario', letter: 'C' },
              { id: 'block', x: 1, y: 2, role: 'pawn', team: 'foe', img: IMAGES.junior, name: 'Pion', letter: 'P' }
            ],
            glow: 'mario',
            dest: [{ x: 2, y: 1 }]
          },
          expect: { piece: 'mario', to: { x: 2, y: 1 } }
        },
        {
          title: 'L’UNIQUE',
          icon: '✨',
          text: 'L’Unique (U) a un mouvement spécial, différent des échecs classiques. Bayonetta glisse jusqu’à 5 cases, comme une dame.',
          instruction: 'Touche Bayonetta, puis la case au bout de la ligne.',
          board: {
            size: 5,
            pieces: [
              { id: 'bayo', x: 2, y: 4, role: 'unique', team: 'you', img: IMAGES.bayonetta, name: 'Bayonetta', letter: 'U' }
            ],
            glow: 'bayo',
            dest: [{ x: 2, y: 1 }]
          },
          expect: { piece: 'bayo', to: { x: 2, y: 1 } }
        }
      ]
    }
  ];

  const els = {};
  let lesson = null;
  let stepIndex = 0;
  let selectedId = null;
  let actionDone = false;
  let boardState = null;
  let fromAuto = false;

  function $(id) {
    return document.getElementById(id);
  }

  function readDone() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_DONE) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function markDone(id) {
    const done = readDone();
    done[id] = true;
    try { localStorage.setItem(STORAGE_DONE, JSON.stringify(done)); } catch (e) {}
    markSeen();
    renderHub();
  }

  function markSeen() {
    try { localStorage.setItem(STORAGE_SEEN, '1'); } catch (e) {}
    const tile = document.querySelector('[data-home-mode="tutorial"]');
    if (tile) tile.classList.remove('tile-new');
  }

  function pieceAt(x, y) {
    return (boardState.pieces || []).find(function (p) { return p.x === x && p.y === y; });
  }

  function isDest(x, y) {
    return (boardState.dest || []).some(function (d) { return d.x === x && d.y === y; });
  }

  function cloneBoard(board) {
    if (!board) return { size: 5, pieces: [], crates: [], dest: [], inventory: [] };
    return {
      size: board.size || 5,
      glow: board.glow || null,
      dest: (board.dest || []).map(function (d) { return { x: d.x, y: d.y }; }),
      crates: (board.crates || []).map(function (c) { return { x: c.x, y: c.y, glow: !!c.glow }; }),
      inventory: (board.inventory || []).map(function (i) { return Object.assign({}, i); }),
      pieces: (board.pieces || []).map(function (p) { return Object.assign({}, p); })
    };
  }

  function currentStep() {
    return lesson && lesson.steps[stepIndex];
  }

  function cacheEls() {
    els.overlay = $('tutorial-overlay');
    els.hub = $('tutorial-hub');
    els.lessons = $('tutorial-lesson-list');
    els.screen = $('tutorial-screen');
    els.kicker = $('tutorial-kicker');
    els.heading = $('tutorial-heading');
    els.progress = $('tutorial-progress-count');
    els.rail = $('tutorial-progress-fill');
    els.board = $('tutorial-board');
    els.inventory = $('tutorial-inventory');
    els.card = $('tutorial-card');
    els.prev = $('tutorial-prev');
    els.next = $('tutorial-next');
    els.quit = $('tutorial-quit');
    els.skip = $('tutorial-skip');
    els.setupTitle = document.querySelector('.setup-title');
    els.setupCard = document.querySelector('.setup-card');
    els.setupDetail = $('setup-detail');
    els.homeBack = $('home-mode-back');
    els.homeMenu = $('home-mode-menu');
  }

  function setOverlay(open) {
    cacheEls();
    if (els.overlay) els.overlay.hidden = !open;
    document.body.classList.toggle('tutorial-open', !!open);
  }

  function renderHub() {
    if (!els.lessons) return;
    const done = readDone();
    els.lessons.innerHTML = LESSONS.map(function (item) {
      const complete = !!done[item.id];
      return (
        '<button type="button" class="tutorial-lesson-card' + (complete ? ' is-done' : '') + '" data-lesson="' + item.id + '">' +
          '<span class="lesson-icon" aria-hidden="true">' + item.icon + '</span>' +
          '<span class="lesson-copy">' +
            '<span class="lesson-title">' + item.title + (complete ? ' <em>fait</em>' : '') + '</span>' +
            '<span class="lesson-meta">' + item.meta + '</span>' +
            '<span class="lesson-desc">' + item.desc + '</span>' +
          '</span>' +
        '</button>'
      );
    }).join('');
  }

  function showHub() {
    cacheEls();
    markSeen();
    fromAuto = false;
    lesson = null;
    setOverlay(false);
    if (els.setupCard) els.setupCard.classList.remove('is-tutorial-playing');
    if (els.homeMenu) els.homeMenu.hidden = true;
    if (els.hub) els.hub.hidden = false;
    if (els.setupDetail) els.setupDetail.hidden = false;
    const localSetup = $('local-setup');
    const onlineSetup = $('online-setup');
    const tournamentSetup = $('tournament-setup');
    if (localSetup) localSetup.style.display = 'none';
    if (onlineSetup) {
      onlineSetup.style.display = 'none';
      onlineSetup.classList.remove('visible');
    }
    if (tournamentSetup) tournamentSetup.hidden = true;
    if (els.homeBack) els.homeBack.hidden = false;
    if (els.setupTitle) {
      els.setupTitle.hidden = false;
      els.setupTitle.textContent = 'Tutoriel';
    }
    renderHub();
  }

  function startLesson(id, auto) {
    cacheEls();
    lesson = LESSONS.find(function (l) { return l.id === id; }) || null;
    if (!lesson) return;
    fromAuto = !!auto;
    stepIndex = 0;
    if (els.hub) els.hub.hidden = true;
    if (els.setupDetail) els.setupDetail.hidden = true;
    if (els.homeBack) els.homeBack.hidden = true;
    if (els.setupTitle) els.setupTitle.hidden = true;
    if (els.setupCard) els.setupCard.classList.add('is-tutorial-playing');
    if (els.skip) {
      els.skip.hidden = !fromAuto;
      els.skip.textContent = 'Passer';
    }
    if (els.quit) {
      els.quit.hidden = !!fromAuto;
      els.quit.textContent = 'Leçons';
    }
    setOverlay(true);
    showStep(0);
  }

  function visualHtml(kind) {
    if (kind !== 'goal') return '';
    return (
      '<div class="tuto-visual-pair">' +
        '<div class="tuto-visual-card">' +
          '<img src="' + IMAGES.toad + '" alt="">' +
          '<strong>Ton armée</strong>' +
          '<span>Skins de rôles d’échecs</span>' +
        '</div>' +
        '<span class="tuto-vs">VS</span>' +
        '<div class="tuto-visual-card">' +
          '<img src="' + IMAGES.king + '" alt="Phil Spencer">' +
          '<strong>Phil Spencer</strong>' +
          '<span>Le roi adverse à capturer</span>' +
        '</div>' +
      '</div>'
    );
  }

  function showStep(index) {
    if (!lesson) return;
    stepIndex = Math.max(0, Math.min(index, lesson.steps.length - 1));
    const step = currentStep();
    selectedId = null;
    actionDone = !step.expect;
    boardState = cloneBoard(step.board);

    const total = lesson.steps.length;
    const n = stepIndex + 1;
    if (els.kicker) els.kicker.textContent = 'APPRENDRE · ' + lesson.title.toUpperCase();
    if (els.heading) els.heading.textContent = 'TUTORIEL GUIDÉ';
    if (els.progress) els.progress.textContent = n + '/' + total;
    if (els.rail) els.rail.style.width = ((n / total) * 100) + '%';

    const bullets = (step.bullets || []).map(function (b) { return '<li>' + b + '</li>'; }).join('');
    const instruction = step.instruction
      ? '<strong class="tutorial-instruction">🎯 ' + step.instruction + '</strong>'
      : (step.hint ? '<strong class="tutorial-instruction">' + step.hint + '</strong>' : '');
    els.card.innerHTML =
      '<span class="tutorial-icon">' + (step.icon || lesson.icon) + '</span>' +
      '<h3>' + step.title + '</h3>' +
      '<p>' + step.text + '</p>' +
      visualHtml(step.visual) +
      (bullets ? '<ul>' + bullets + '</ul>' : '') +
      instruction;

    renderBoard();
    renderInventory();
    syncButtons();
  }

  function renderBoard() {
    if (!els.board) return;
    const size = boardState.size || 5;
    const hasBoard = !!(currentStep() && currentStep().board);
    els.board.hidden = !hasBoard;
    if (!hasBoard) {
      els.board.innerHTML = '';
      return;
    }
    els.board.style.setProperty('--tuto-size', String(size));
    const cells = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const light = (x + y) % 2 === 0;
        const piece = pieceAt(x, y);
        const crate = (boardState.crates || []).find(function (c) { return c.x === x && c.y === y; });
        const dest = isDest(x, y);
        const glowPiece = piece && piece.id === boardState.glow;
        const selected = piece && piece.id === selectedId;
        const classes = [
          'tuto-cell',
          light ? 'is-light' : 'is-dark',
          dest ? 'is-dest' : '',
          glowPiece ? 'is-glow' : '',
          selected ? 'is-selected' : '',
          piece && piece.team === 'foe' && dest ? 'is-capture' : '',
          crate && crate.glow ? 'is-crate-glow' : ''
        ].filter(Boolean).join(' ');

        let inner = '';
        if (crate) {
          inner += '<img class="tuto-crate" src="' + IMAGES.crate + '" alt="Caisse d’objet">';
        }
        if (piece) {
          inner +=
            '<img class="tuto-piece" src="' + piece.img + '" alt="' + piece.name + '">' +
            (piece.letter ? '<span class="tuto-letter">' + piece.letter + '</span>' : '');
        } else if (dest) {
          inner += '<span class="tuto-dot" aria-hidden="true"></span>';
        }
        cells.push(
          '<button type="button" class="' + classes + '" data-x="' + x + '" data-y="' + y + '" aria-label="Case ' + (x + 1) + ', ' + (y + 1) + '">' +
            inner +
          '</button>'
        );
      }
    }
    els.board.innerHTML = cells.join('');
  }

  function renderInventory() {
    if (!els.inventory) return;
    const items = boardState.inventory || [];
    els.inventory.hidden = items.length === 0;
    if (!items.length) {
      els.inventory.innerHTML = '';
      return;
    }
    els.inventory.innerHTML =
      '<span class="tuto-inv-label">Inventaire</span>' +
      items.map(function (item) {
        return (
          '<button type="button" class="tuto-inv-item' + (actionDone && item.id === 'star' ? ' is-used' : '') + '" data-item="' + item.id + '">' +
            '<img src="' + item.img + '" alt="">' +
            '<span>' + item.name + '</span>' +
          '</button>'
        );
      }).join('');
  }

  function syncButtons() {
    const last = lesson && stepIndex === lesson.steps.length - 1;
    if (els.prev) els.prev.disabled = stepIndex === 0;
    if (els.next) {
      els.next.disabled = !actionDone;
      if (!actionDone) {
        els.next.textContent = 'ACTION RÉUSSIE • SUIVANT →';
      } else if (last) {
        els.next.textContent = 'TERMINER';
      } else if (currentStep() && currentStep().expect) {
        els.next.textContent = 'ACTION RÉUSSIE • SUIVANT →';
      } else {
        els.next.textContent = 'J’AI COMPRIS • SUIVANT →';
      }
    }
  }

  function completeAction() {
    if (actionDone) return;
    actionDone = true;
    boardState.glow = null;
    boardState.dest = [];
    renderBoard();
    renderInventory();
    syncButtons();
  }

  function onCellClick(x, y) {
    const step = currentStep();
    if (!step || !step.expect || actionDone) return;
    const expect = step.expect;
    if (expect.item) return;

    const piece = pieceAt(x, y);
    if (piece && piece.team === 'you' && (!expect.piece || piece.id === expect.piece)) {
      selectedId = piece.id;
      renderBoard();
      return;
    }
    if (!selectedId) return;
    if (!isDest(x, y)) return;
    if (expect.to && (expect.to.x !== x || expect.to.y !== y)) return;

    const moving = boardState.pieces.find(function (p) { return p.id === selectedId; });
    if (!moving) return;
    boardState.pieces = boardState.pieces.filter(function (p) {
      return p.id === selectedId || p.x !== x || p.y !== y;
    });
    moving.x = x;
    moving.y = y;
    boardState.crates = (boardState.crates || []).filter(function (c) {
      return c.x !== x || c.y !== y;
    });
    selectedId = null;
    completeAction();
  }

  function onItemClick(itemId) {
    const step = currentStep();
    if (!step || !step.expect || actionDone) return;
    if (step.expect.item && step.expect.item === itemId) {
      completeAction();
    }
  }

  function nextStep() {
    if (!actionDone || !lesson) return;
    if (stepIndex >= lesson.steps.length - 1) {
      markDone(lesson.id);
      if (fromAuto) {
        fromAuto = false;
        setOverlay(false);
        showHub();
        return;
      }
      showHub();
      return;
    }
    showStep(stepIndex + 1);
  }

  function prevStep() {
    if (!lesson || stepIndex === 0) return;
    showStep(stepIndex - 1);
  }

  function closeOverlayToHome() {
    cacheEls();
    markSeen();
    lesson = null;
    fromAuto = false;
    setOverlay(false);
    if (els.setupCard) els.setupCard.classList.remove('is-tutorial-playing');
    if (els.setupTitle) {
      els.setupTitle.hidden = false;
      els.setupTitle.textContent = 'Choisissez un mode';
    }
    if (els.homeMenu) els.homeMenu.hidden = false;
    if (els.setupDetail) els.setupDetail.hidden = true;
    if (els.hub) els.hub.hidden = true;
  }

  function skipOrQuit() {
    if (fromAuto) {
      closeOverlayToHome();
      return;
    }
    showHub();
  }

  function maybeAutoStart() {
    cacheEls();
    try {
      if (localStorage.getItem(STORAGE_SEEN)) return;
    } catch (e) {
      return;
    }
    startLesson('basics', true);
  }

  function bind() {
    cacheEls();
    if (els.lessons) {
      els.lessons.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-lesson]');
        if (!btn) return;
        startLesson(btn.getAttribute('data-lesson'), false);
      });
    }
    if (els.board) {
      els.board.addEventListener('click', function (e) {
        const cell = e.target.closest('[data-x]');
        if (!cell) return;
        onCellClick(Number(cell.getAttribute('data-x')), Number(cell.getAttribute('data-y')));
      });
    }
    if (els.inventory) {
      els.inventory.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-item]');
        if (!btn) return;
        onItemClick(btn.getAttribute('data-item'));
      });
    }
    if (els.next) els.next.addEventListener('click', nextStep);
    if (els.prev) els.prev.addEventListener('click', prevStep);
    if (els.quit) els.quit.addEventListener('click', skipOrQuit);
    if (els.skip) els.skip.addEventListener('click', skipOrQuit);

    if (els.overlay) {
      els.overlay.addEventListener('click', function (e) {
        if (e.target === els.overlay) skipOrQuit();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && els.overlay && !els.overlay.hidden) skipOrQuit();
    });

    try {
      if (!localStorage.getItem(STORAGE_SEEN)) {
        const tile = document.querySelector('[data-home-mode="tutorial"]');
        if (tile) tile.classList.add('tile-new');
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  global.VGBTutorial = {
    openHub: showHub,
    startLesson: startLesson,
    maybeAutoStart: maybeAutoStart,
    close: closeOverlayToHome,
    lessons: LESSONS
  };
})(window);
