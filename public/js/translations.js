// ========================================
// SYSTÈME DE TRADUCTION - VIDEO GAMES BATTLE
// ========================================

const translations = {
  fr: {
    // Interface principale
    'game-title': 'Video Games Battle',
    'page-title': 'Chesstendo - Draft + Plateau',
    'tagline': 'Oubliez les échecs classiques, ici les héros de jeux vidéo font les règles !',
    'select-players': 'Nombre de joueurs',
    'select-board-size': 'Taille du plateau',
    'start-game': 'Commencer la partie',
    'player': 'Joueur',
    'players': 'joueurs',
    'faction': 'Faction',
    'money': 'Points',
    'team': 'Équipe',
    'next-player': 'Joueur suivant',
    'previous-player': 'Joueur précédent',
    'finish-selection': 'Terminer la sélection',
    'start-game-button': 'Démarrer la partie',
    
    // Tailles de plateau
    'board-small': '9x9 (Petit)',
    'board-medium': '11x11 (Moyen)',
    'board-large': '15x15 (Grand)',
    
    // Factions
    'nintendo': 'Nintendo',
    'sega': 'SEGA',
    'playstation': 'PlayStation',
    'xbox': 'Xbox',
    
    // Rois
    'king-nintendo': 'Roi Nintendo',
    'king-playstation': 'Roi PlayStation',
    'king-sega': 'Roi SEGA',
    'king-xbox': 'Roi Xbox',
    
    // Messages de jeu
    'game-start': 'Début de la partie !',
    'your-turn': 'Votre tour',
    'player-turn': 'Tour du Joueur',
    'pieces-in-play': 'Pièces en jeu',
    'rules': 'Règles',
    'captured-pieces': 'Pièces capturées',
    'items': 'Objets',
    'timer': 'Chronomètre',
    
    // Actions
    'move': 'Déplacer',
    'capture': 'Capturer',
    'use-item': 'Utiliser objet',
    'end-turn': 'Finir le tour',
    'restart': 'Recommencer',
    'quit': 'Quitter',
    
    // Messages d'erreur
    'invalid-move': 'Mouvement invalide',
    'not-your-turn': 'Ce n\'est pas votre tour',
    'no-piece-selected': 'Aucune pièce sélectionnée',
    'cannot-move-there': 'Impossible de se déplacer ici',
    
    // Objets
    'bobomb': 'Bob-omb',
    'portals': 'Portails',
    'lightning': 'Foudre',
    'star': 'Étoile',
    'tetrimino': 'Tetrimino',
    'tornado': 'Tornade',
    'banana': 'Banane',
    'phoenix': 'Queue de Phoenix',
    'cursor': 'Cursor Sims',
    'heart': 'Cœur',
    'sandglass': 'Sablière du Temps',
    'mask': 'Masque de Majora',
    'ocarina': 'Ocarina du Temps',
    
    // Descriptions des objets
    'bobomb-desc': 'Bombe explosive de Mario ! Place une bombe sur une case vide qui explosera au prochain tour.',
    'portals-desc': 'Téléportation instantanée ! Crée deux portails connectés sur le plateau.',
    'lightning-desc': 'Éclair Mario Kart ! Se charge en 4 tours, puis frappe 8 cases blanches au hasard.',
    'star-desc': 'Invincibilité ! Rend toutes les pièces invincibles pendant un tour.',
    'tetrimino-desc': 'Bloc de construction ! Place un mur Tetrimino sur le plateau.',
    'tornado-desc': 'Tornade Sonic ! Téléporte une pièce à une position aléatoire du plateau.',
    'banana-desc': 'Peau de banane ! Place un piège : 1 chance sur 3 de stopper net la pièce qui passe dessus.',
    'phoenix-desc': 'Queue de Phénix (Final Fantasy) ! Ressuscite votre dernière pièce perdue.',
    'cursor-desc': 'Contrôle total ! Prend le contrôle d\'une pièce adverse pendant 1 tour.',
    'heart-desc': 'Vie supplémentaire ! Donne une vie en plus à une pièce (survit à une capture).',
    'sandglass-desc': 'Sablier (9×9 uniquement) ! Retire 1 minute au chrono de votre adversaire.',
    'mask-desc': 'Le masque maudit de Termina ! Force un adversaire à jouer une pièce spécifique lors de son prochain tour.',
    'ocarina-desc': 'L\'instrument magique d\'Hyrule ! Transforme permanentement une pièce en cavalier (mouvements en L).',
    
    // Messages d'objets
    'item-used': 'Objet utilisé',
    'item-charging': 'Objet en charge',
    'select-target': 'Sélectionnez une cible',
    'select-position': 'Sélectionnez une position',
    'not-activated': 'n\'est pas activé',
    
    // Navigation
    'play': 'Jouer',
    'pieces': 'Les pièces',
    'rules': 'Les règles',
    'items': 'Les objets',
    'credits': 'Crédits',
    'movements': 'Mouvements',
    'login': 'Se connecter',
    
    // Pages
    'available-pieces': 'Pièces disponibles',
    'available-items': 'Objets disponibles',
    'game-rules': 'Règles du jeu',
    'movement-demos': 'Démonstrations de Mouvements',
    'sort-by': 'Trier par',
    'strength': 'Rôle',
    'role': 'Rôle',
    'all-roles': 'Tous',
    'editor': 'Éditeur',
    'universe': 'Univers',
    'all': 'Tous',
    
    // Règles du jeu
    'game-objective': 'Objectif du jeu',
    'game-objective-desc': 'Video Games Battle est un duel de stratégie type échecs : deux joueurs s\'affrontent avec des skins de personnages de jeux vidéo. L\'objectif est de capturer le roi adverse.',
    'victory': 'Victoire',
    'victory-desc': ' Capturer le roi adverse, ou l\'éliminer par timeout si le chronomètre est activé.',
    'piece-types': 'Rôles',
    'piece-types-intro': 'Chaque pièce a un rôle d\'échecs (pion, cavalier, fou, etc.). Les personnages sont des skins : vous choisissez qui représente chaque rôle.',
    'board-section': 'Le plateau',
    'board-section-desc': 'La partie se joue exclusivement sur un plateau 9×9, en duel (2 joueurs).',
    'board-rule-1': 'Les cases alternent clair / foncé (style échiquier).',
    'board-rule-2': 'Des caisses d\'objets apparaissent sur les cases claires de la ligne 5 (rangée centrale).',
    'board-rule-3': 'Chaque camp place ses pièces sur 2 rangées : rangée arrière + ligne de pions.',
    'role-pawn-title': 'Pion (×9)',
    'role-pawn-desc': 'Avance d\'une case ; capture en diagonale. Direction selon le camp.',
    'role-knight-title': 'Cavalier (×2)',
    'role-knight-desc': 'Saut en L. Peut passer par-dessus les pièces.',
    'role-bishop-title': 'Fou (×2)',
    'role-bishop-desc': 'Diagonales, portée libre jusqu\'à obstacle.',
    'role-rook-title': 'Tour (×2)',
    'role-rook-desc': 'Lignes et colonnes, portée libre jusqu\'à obstacle.',
    'role-queen-title': 'Dame (×1)',
    'role-queen-desc': 'Toutes directions, portée libre jusqu\'à obstacle.',
    'role-king-title': 'Roi (×1)',
    'role-king-desc': 'Une case dans toutes les directions. Sa capture termine la partie.',
    'role-unique-title': 'Unique (×1)',
    'role-unique-desc': "Capacité spéciale du personnage (hors règles d'échecs classiques).",
    'formation-title': 'Formation de départ',
    'formation-desc': 'Rangée arrière (de gauche à droite), puis 9 pions devant :',
    'formation-line': 'T · C · F · D · R · U · F · C · T<br>P · P · P · P · P · P · P · P · P',
    'formation-note': 'Le Roi est au centre ; l\'Unique est en face de la Dame. Une lettre (P, C, F, T, D, R, U) s\'affiche sur chaque pièce pour repérer son rôle.',
    'draft-rule-1': 'Armée complète = 17 pièces + le roi de faction (placé automatiquement).',
    'draft-rule-2': 'Pas de budget / coût : seuls les quotas de rôles comptent.',
    'draft-rule-3': 'Le même skin peut être choisi plusieurs fois pour un même rôle.',
    'online-section': 'Mode en ligne',
    'online-section-desc': 'En mode en ligne, vous jouez en 1v1 avec matchmaking. Le résultat met à jour votre classement Elo. Consultez le classement et connectez-vous via la page de login.',
    'cursor-rule-desc': 'contrôle un pion ou cavalier adverse pendant 1 tour',
    'faq-same-skin': 'Puis-je mettre plusieurs fois le même personnage ?',
    'faq-same-skin-desc': 'Oui. Un même skin peut remplir plusieurs slots du même rôle (ex. 9 fois le même pion).',
    'king': 'Roi',
    'king-desc': 'Pièce la plus importante. Se déplace d\'une case dans toutes les directions. Sa capture termine la partie.',
    'special-pieces': 'Pièces spéciales',
    'special-pieces-desc': 'Chaque faction dispose de personnages uniques avec des mouvements et capacités spécifiques :',
    'movements': 'Mouvements',
    'movements-desc': 'Chaque rôle suit les règles d\'échecs, sauf l\'Unique qui garde le mouvement du personnage.',
    'directions': 'Directions',
    'directions-desc': 'Cases adjacentes accessibles',
    'range': 'Portée',
    'range-desc': 'Nombre maximum de cases en ligne droite',
    'specialties': 'Spécialités',
    'specialties-desc': 'Capacités uniques (saut, vol, etc.)',
    'object-system': 'Système d\'objets',
    'acquisition': 'Acquisition',
    'acquisition-desc': 'En passant sur une caisse, vous récupérez un objet aléatoire. Réserve max : 3 objets.',
    'usage': 'Utilisation',
    'usage-desc': 'Un seul objet par tour. Effets variés (détails sur la page Objets) :',
    'time-sand': 'Sablière du Temps',
    'time-sand-desc': '9×9 : −1 min au chrono adverse',
    'majora-mask': 'Masque de Majora',
    'majora-mask-desc': 'force une pièce adverse au prochain tour',
    'time-ocarina': 'Ocarina du Temps',
    'time-ocarina-desc': 'transforme une pièce en cavalier',
    'bomb': 'Bombe',
    'bomb-desc': 'Explose et endommage les pièces adjacentes',
    'star': 'Étoile',
    'star-desc': 'Rend toutes les pièces invincibles 1 tour',
    'weight-desc': 'Chaque objet a un poids : plus le poids est élevé, plus l\'objet est fréquent à l\'apparition.',
    
    // Règles communes des objets
    'common-rules': 'Règles communes :',
    'common-rules-1': 'Chaque joueur peut conserver jusqu\'à <strong>3 objets</strong> en réserve.',
    'common-rules-2': 'On ne peut utiliser <strong>qu\'un objet par tour</strong>.',
    'common-rules-3': 'Les objets apparaissent aléatoirement dans des caisses sur le plateau.',
    'common-rules-4': 'Le poids d\'un objet détermine sa rareté (plus le poids est élevé, plus l\'objet est rare).',
    
    // Page des crédits
    'credits-title': 'CRÉDITS',
    'legal-warning': 'AVERTISSEMENT LÉGAL',
    'fan-project': 'Ce jeu est un projet FAN non lucratif',
    'fan-project-desc': 'Tous les personnages, franchises et propriétés intellectuelles appartiennent à leurs propriétaires respectifs.',
    'no-content-sale': 'Aucun contenu n\'est à vendre',
    'completely-free': 'L\'intégralité du jeu est 100% GRATUITE',
    'fan-created': 'Ce projet est créé par des fans, pour les fans, sans but commercial.',
    'owner-of': 'Propriétaire de :',
    'nintendo-owner': 'The Legend of Zelda, Super Mario, et toutes leurs franchises associées',
    'playstation-owner': 'PlayStation, Uncharted, God of War, Astro Bot et leurs franchises',
    'sega-owner': 'Sonic, Yakuza, Shinobi et leurs franchises associées',
    'xbox-owner': 'Xbox, Halo, Gears of War, Perfect Dark et leurs franchises',
    'nintendo-king': 'Roi Nintendo',
    'playstation-king': 'Roi PlayStation',
    'sega-king': 'Roi SEGA',
    'xbox-king': 'Roi Xbox',
    'nintendo-representative': 'Représentant Nintendo',
    'playstation-representative': 'Représentant PlayStation',
    'sega-representative': 'Représentant SEGA',
    'xbox-representative': 'Représentant Xbox',
    'nintendo-copyright': '© Nintendo. Tous droits réservés. Nintendo est une marque déposée de Nintendo Co., Ltd.',
    'playstation-copyright': '© Sony Interactive Entertainment. Tous droits réservés. PlayStation est une marque déposée de Sony Interactive Entertainment LLC.',
    'sega-copyright': '© SEGA Corporation. Tous droits réservés. SEGA est une marque déposée de SEGA Corporation.',
    'xbox-copyright': '© Microsoft Corporation. Tous droits réservés. Xbox est une marque déposée de Microsoft Corporation.',
    'other-properties': 'Autres Propriétés',
    'inspired-by': 'Objets et éléments inspirés de :',
    'all-elements-inspired': 'Tous les éléments de gameplay sont inspirés de jeux existants et appartiennent à leurs propriétaires respectifs.',
    'legal-mentions': 'MENTIONS LÉGALES',
    'fan-project-legal': 'Video Games Battle est un projet FAN non commercial',
    'educational-purpose': 'Ce jeu a été créé par des passionnés de jeux vidéo dans un but éducatif et de divertissement uniquement.',
    'no-paid-content': 'Aucun contenu payant',
    'completely-accessible': 'L\'intégralité du jeu est accessible gratuitement',
    'no-sales': 'Aucune vente',
    'nothing-for-sale': 'Rien n\'est à vendre sur ce site',
    'completely-free': '100% Gratuit',
    'all-features-available': 'Toutes les fonctionnalités sont disponibles sans frais',
    'community-project': 'Projet communautaire',
    'created-by-community': 'Créé par et pour la communauté gaming',
    'technical-credits': 'CRÉDITS TECHNIQUES',
    'development': 'Développement :',
    'game-engine': 'Moteur de jeu :',
    'inspiration': 'Inspiration :',
    'thanks': 'Remerciements :',
    'community-support': 'À tous les fans qui nous soutiennent et à la communauté des jeux de stratégie',
    'copyright-respect': 'Ce projet respecte les droits d\'auteur et les marques déposées. Tous les personnages et franchises appartiennent à leurs propriétaires légitimes.',
    'scroll-indicator': 'Faites défiler pour voir tous les crédits',
    
    // Page des règles - sections manquantes
    'time-system': 'Système de temps',
    'optional-timer': 'Timer optionnel',
    'timer-description': 'Chaque joueur dispose de 5 minutes de temps total (plateau 9×9). Le chrono ne descend que pendant votre tour.',
    'board-9x9': '9×9 :',
    'board-11x11': '11×11 :',
    'board-15x15': '15×15 :',
    'minutes-per-turn': 'minutes',
    'timeout-elimination': 'Élimination par timeout',
    'timeout-description': 'Si votre temps tombe à zéro, vous êtes éliminé et toutes vos pièces quittent le plateau.',
    'game-flow': 'Déroulement d\'une partie',
    'draft-phase': 'Phase de draft',
    'draft-description': 'Avant la partie, chaque joueur compose son armée par rôle : choisir l\'éditeur, puis les skins pour remplir les quotas. Le bouton Aléatoire remplit automatiquement l\'armée.',
    'game-phase': 'Phase de jeu',
    'game-phase-description': 'Les joueurs jouent à tour de rôle. À chaque tour vous pouvez :',
    'select-piece': 'Sélectionner une pièce et la déplacer sur une case valide',
    'choose-destination': 'Choisir une case de destination valide',
    'use-object': 'Ou utiliser un objet (un seul par tour)',
    'next-player': 'Passer au joueur suivant',
    'end-game': 'Fin de partie',
    'end-game-description': 'La partie se termine dès qu\'un roi est capturé (ou qu\'un joueur est éliminé par timeout).',
    
    // Noms des objets
    'bobomb-name': 'Bob-omb',
    'portals-name': 'Portails',
    'lightning-name': 'Éclair',
    'star-name': 'Étoile',
    'tetrimino-name': 'Tétromino',
    'tornado-name': 'Tornade',
    'banana-name': 'Banane',
    'phoenix-name': 'Phénix',
    'cursor-name': 'Curseur Sims',
    'heart-name': 'Cœur',
    'sandglass-name': 'Sablier',
    'mask-name': 'Masque de Majora',
    'ocarina-name': 'Ocarina du Temps',
    
    // Descriptions des objets
    'bobomb-desc': 'Bombe explosive de Mario ! Place une <strong>bombe sur une case vide</strong> qui explosera au prochain tour.',
    'bobomb-details': 'La bombe endommage toutes les pièces adjacentes (alliées et ennemies). Parfait pour créer des zones de danger ou éliminer plusieurs pièces d\'un coup. Inspiré de Super Mario Bros.',
    'portals-desc': 'Téléportation instantanée ! Crée <strong>deux portails connectés</strong> sur le plateau.',
    'portals-details': 'Placez deux portails sur des cases vides. Toute pièce entrant dans un portail ressort instantanément de l\'autre. Parfait pour les mouvements tactiques et les échappatoires. Inspiré de Portal.',
    'lightning-desc': 'Éclair Mario Kart ! Se charge en <strong>4 tours</strong>, puis détruit les pièces sur <strong>8 cases blanches au hasard</strong>.',
    'lightning-details': 'Après 4 tours de charge, l\'éclair frappe 8 cases blanches choisies au hasard et détruit les pièces présentes (alliées comme ennemies). Les pièces sous étoile sont protégées. Inspiré de l\'éclair de Mario Kart.',
    'star-desc': 'Invincibilité ! Rend <strong>toutes les pièces invincibles</strong> pendant un tour.',
    'star-details': 'Toutes les pièces du plateau deviennent invincibles jusqu\'à votre prochain tour : aucune capture ni destruction d\'objet ne peut les toucher. Inspiré de Super Mario Bros.',
    'tetrimino-desc': 'Bloc de construction ! Place un <strong>mur Tetrimino</strong> sur le plateau.',
    'tetrimino-details': 'Crée un obstacle permanent sur le plateau qui bloque les mouvements. Parfait pour contrôler les zones de passage ou protéger des positions stratégiques. Inspiré de Tetris.',
    'tornado-desc': 'Tornade Sonic ! <strong>Téléporte une pièce</strong> à une position aléatoire du plateau.',
    'tornado-details': 'Choisissez une pièce qui sera téléportée vers une case aléatoire libre. Peut créer des situations inattendues et tactiques. Inspiré de Sonic the Hedgehog.',
    'banana-desc': 'Peau de banane ! Place un <strong>piège sur une case vide</strong> : 1 chance sur 3 de stopper net la pièce qui passe dessus.',
    'banana-details': 'Lorsqu\'une pièce traverse ou atterrit sur la banane, elle a une chance sur trois d\'être stoppée sur place. Sinon, elle continue sa course. Inspiré de Mario Kart.',
    'phoenix-desc': 'Queue de Phénix ! <strong>Ressuscite votre dernière pièce perdue</strong>.',
    'phoenix-details': 'Fait revenir votre dernière pièce perdue près de votre roi. Parfait pour compenser une perte critique. Inspiré de Final Fantasy (Queue de phénix).',
    'cursor-desc': 'Contrôle total ! <strong>Prend le contrôle d\'une pièce adverse</strong> pendant 1 tour.',
    'cursor-details': 'Vous pouvez déplacer la pièce adverse comme si c\'était la vôtre. Idéal pour créer des situations tactiques ou éliminer des menaces. Inspiré de The Sims, ce curseur magique permet de manipuler les autres.',
    'heart-desc': 'Vie supplémentaire ! <strong>Donne une vie en plus</strong> à une pièce.',
    'heart-details': 'La pièce gagne une vie supplémentaire : à la première capture, elle perd son cœur et reste en jeu. Parfait pour protéger une pièce importante. Inspiré de The Legend of Zelda.',
    'sandglass-desc': 'Sablier (9×9 uniquement) ! Retire <strong>1 minute au chrono de votre adversaire</strong>.',
    'sandglass-details': '<strong>Plateau 9×9 uniquement.</strong> Retire 1 minute au chrono de votre adversaire (parties à 2 joueurs). Nécessite que le timer soit activé. Inspiré de Prince of Persia: The Sands of Time.',
    'mask-desc': 'Le masque maudit de Termina ! Force un <strong>adversaire à jouer une pièce spécifique</strong> lors de son prochain tour.',
    'mask-details': 'Choisissez une pièce adverse que l\'adversaire sera obligé de déplacer. L\'effet disparaît après que la pièce ait joué. Inspiré de The Legend of Zelda: Majora\'s Mask, ce masque maléfique manipule les esprits.',
    'ocarina-desc': 'L\'instrument magique d\'Hyrule ! Transforme <strong>permanentement une pièce en cavalier</strong> (mouvements en L).',
    'ocarina-details': 'Choisissez n\'importe quelle pièce (alliée ou ennemie) qui se déplacera désormais comme un cavalier d\'échecs. L\'ocarina reste visible au-dessus de la pièce. Inspiré de The Legend of Zelda: Ocarina of Time, cet objet légendaire change les règles du jeu.',
    
    // Conseils stratégiques
    'strategic-tips': 'Conseils stratégiques',
    'king-protection': 'Protection du roi',
    'king-protection-desc': 'Protégez le centre et les cases autour du roi ; l\'Unique et la Dame sont de puissants défenseurs ou attaquants.',
    'object-management': 'Gestion des objets',
    'object-management-desc': 'Les caisses centrales sont un enjeu : contrôlez la ligne 5 pour récupérer des objets avant l\'adversaire.',
    'positioning': 'Positionnement',
    'positioning-desc': 'Ouvrez les diagonales pour les fous, les colonnes pour les tours, et utilisez les cavaliers pour sauter les lignes bloquées.',
    'temporary-cooperation': 'Coopération temporaire',
    'temporary-cooperation-desc': 'Le mode classique est un duel 1v1 : anticipez les menaces plutôt que de compter sur des alliances.',
    
    // FAQ
    'faq': 'Questions fréquentes',
    'can-capture-own': 'Puis-je capturer mes propres pièces ?',
    'can-capture-own-desc': 'Non. Seules les pièces adverses peuvent être capturées ; vos pièces bloquent vos trajectoires (sauf le cavalier).',
    'no-valid-moves': 'Que se passe-t-il si je n\'ai plus de mouvements valides ?',
    'no-valid-moves-desc': 'Si vous ne pouvez plus bouger aucune pièce, vous passez votre tour automatiquement.',
    'can-steal-objects': 'Les objets peuvent-ils être volés ?',
    'can-steal-objects-desc': 'Non, la réserve d\'objets est personnelle.',
    'can-change-piece': 'Puis-je changer de pièce après l\'avoir sélectionnée ?',
    'can-change-piece-desc': 'Oui : recliquez une autre de vos pièces pour changer de sélection avant de jouer le coup.',

    // Fin de partie (overlay)
    'end-game-title': 'Fin de partie',
    'end-game-subtitle-duel': 'Le roi adverse a été capturé.',
    'end-game-subtitle-multi': 'Classement final de la partie.',
    'end-game-winner': 'Victoire',
    'end-game-defeated': 'Défaite',
    'end-game-new-game': 'Nouvelle partie',
    'end-game-elo': 'Elo',
    'end-game-no-result': 'Partie terminée.',
    'end-game-rank-1': '1er',
    'end-game-rank-2': '2e',
    'end-game-rank-3': '3e',
    
    // Pièces
    'cost': 'Coût',
    'range': 'Portée',
    'movements': 'Mouvements',
    'movement-demo': 'Démonstration de mouvement',
    'tier-1': 'Faible',
    'tier-2': 'Moyen',
    'tier-3': 'Fort',
    'tier-4': 'Très fort',
    'tier-5': 'Légendaire',
    'weight': 'Poids',
    
    // Page des pièces - traductions manquantes
    'strength': 'Rôle',
    'role': 'Rôle',
    'all-strengths': 'Tous',
    'all-roles': 'Tous',
    'weak': 'Faible',
    'medium': 'Moyen',
    'strong': 'Fort',
    'unique': 'Unique',
    'legendary': 'Légendaire',
    'unknown': 'Inconnu',
    'all-directions': 'Toutes les directions (comme une reine)',
    'directions-possible': 'directions possibles',
    'points': 'pts',
    
    // Noms des pièces
    'king-nintendo': 'Roi Nintendo',
    'king-playstation': 'Roi PlayStation',
    'king-sega': 'Roi SEGA',
    'king-xbox': 'Roi Xbox',
    'link': 'Link',
    'mario': 'Mario',
    'zelda': 'Zelda',
    'bowser': 'Bowser',
    'ganondorf': 'Ganondorf',
    'samus': 'Samus',
    'pit': 'Pit',
    'palutena': 'Palutena',
    'sheik': 'Sheik',
    'wario': 'Wario',
    'duo-duck-hunt': 'Duo Duck Hunt',
    'wii-fit-trainer': 'Wii Fit Trainer',
    'luigi': 'Luigi',
    'peach': 'Peach',
    'kirby': 'Kirby',
    
    // Descriptions des pièces
    'king-nintendo-desc': "Emblème vivant de Nintendo, ce roi incarne l'esprit joyeux et inventif de la maison. Il mène sa faction avec panache et protège le cœur du camp. Sans lui, la partie s'effondre.",
    'king-playstation-desc': "Souverain de la PlayStation, ce roi porte l'héritage des grands exclusifs Sony. Calme et déterminé, il incarne l'aventure et la narration. Sa chute scelle la défaite.",
    'king-sega-desc': "Roi de SEGA, il symbolise l'audace arcade et le bleu électrique de la Dreamcast. Fier et un brin provocateur, il rallie Sonic et ses camarades. Le perdre, c'est tout perdre.",
    'king-xbox-desc': "Chef de file Xbox, ce roi représente la puissance et les mondes ouverts de Microsoft. Solide comme une console de salon, il ancre sa faction. Sa capture termine le duel.",
    'link-desc': "Héros élu d'Hyrule, Link porte l'Épée de Légende et le courage de la Triforce. Silencieux mais infatigable, il affronte Ganon encore et encore. Bouclier au bras, il ne recule jamais. Bouclier d'Hyrule : 20 % de chance de bloquer une attaque. Secondaire Flèche héroïque : tire en ortho à distance 3 sans se déplacer (1 fois / 3 tours).",
    'mario-desc': "Plombier moustachu de Brooklyn devenu sauveur du Royaume Champignon. Toujours prêt à écraser un Goomba d'un saut, il collectionne les étoiles et les princesses. C'est l'icône même de Nintendo.",
    'zelda-desc': "Princesse d'Hyrule et incarnation de la Sagesse. Entre magie, diplomatie et parfois déguisement Sheik, elle guide Link vers le destin du royaume. Sa présence rayonne sur le champ de bataille.",
    'bowser-desc': "Roi des Koopas, dragon-tortue à la carapace pointue et à l'ego démesuré. Ennemi juré de Mario, il kidnappe Peach… puis revient toujours plus fort. Sa flamme et ses Koopalings font trembler le royaume. Koopalings : invoque l'un des 7 Koopalings (déplacement de pion) sur une case voisine ; 1 invocation par Koopaling (7 max), consomme le tour.",
    'ganondorf-desc': "Roi des Gerudos et incarnation du Pouvoir. Traître, manipulateur et presque immortel, il poursuit la Triforce à travers les âges. Face à lui, Hyrule brûle.",
    'samus-desc': "Chasseuse de primes galactique sous l'armure Power Suit. Survivante de la colonie K-2L, elle traque les Metroids pour la Fédération. Glaciale, précise, légendaire.",
    'pit-desc': "Ange gardien de Palutena, archer céleste au cœur d'or. Même sans ailes permanentes, il plonge dans la mêlée pour Angel Land. « Quoi ?! » est son cri de guerre favori.",
    'palutena-desc': "Déesse de la Lumière qui protège les humains depuis les cieux. Élgante, sarcastique et toute-puissante, elle guide Pit… quand elle n'est pas piégée. Sa magie verte illumine le chaos.",
    'sheik-desc': "Ombre agile d'Hyrule, maître du ninjutsu sheikah. Voix grave, harpe et kunai : une identité secrète pour survivre à Ganondorf. Rapidité et mystère font sa force.",
    'wario-desc': "Rival cupide de Mario, obsédé par l'or et les gadgets foireux. Gros, fort, et fier de son gaz… il lance WarioWare entre deux coups bas. L'anti-héros jaune et violet par excellence.",
    'duo-duck-hunt-desc': "Le chien moqueur et le canard fuyard du classique NES. Ensemble, ils rappellent l'âge d'or du zapper. Un duo improbablement efficace… et un peu provocateur.",
    'wii-fit-trainer-desc': "Coach sportif de Wii Fit, toujours prêt à corriger votre posture. Sourire encourageant, routine yoga et motivation douce. Sur le plateau, l'équilibre devient une arme.",
    'luigi-desc': "Frère cadet de Mario, un peu peureux mais ultra talentueux. Fantômes, mansions et sauts précis : il brille quand on lui laisse la lumière. Vert de timidité, vert de victoire.",
    'peach-desc': "Princesse du Royaume Champignon, aussi diplomate que redoutable. Parapluie, flottement et charme royal masquent une vraie combattante. Mario court… et elle se bat aussi.",
    'kirby-desc': "Petite boule rose de Pop Star, gourmande et indestructible. Il aspire tout — ennemis, pouvoirs, goûter — avec un sourire innocent. Sous ses joues rondes se cache une force cosmique. Aspiration : se déplace comme la dernière pièce ennemie capturée (départ : mouvement de cavalier).",

    // Nintendo catalogue élargi
    'link': "Link",
    'link-desc': "Héros élu d'Hyrule, Link porte l'Épée de Légende et le courage de la Triforce. Silencieux mais infatigable, il affronte Ganon encore et encore. Bouclier au bras, il ne recule jamais. Bouclier d'Hyrule : 20 % de chance de bloquer une attaque. Secondaire Flèche héroïque : tire en ortho à distance 3 sans se déplacer (1 fois / 3 tours).",
    'mario': "Mario",
    'mario-desc': "Plombier moustachu de Brooklyn devenu sauveur du Royaume Champignon. Toujours prêt à écraser un Goomba d'un saut, il collectionne les étoiles et les princesses. C'est l'icône même de Nintendo.",
    'zelda': "Zelda",
    'zelda-desc': "Princesse d'Hyrule et incarnation de la Sagesse. Entre magie, diplomatie et parfois déguisement Sheik, elle guide Link vers le destin du royaume. Sa présence rayonne sur le champ de bataille.",
    'bowser': "Bowser",
    'bowser-desc': "Roi des Koopas, dragon-tortue à la carapace pointue et à l'ego démesuré. Ennemi juré de Mario, il kidnappe Peach… puis revient toujours plus fort. Sa flamme et ses Koopalings font trembler le royaume. Koopalings : invoque l'un des 7 Koopalings (déplacement de pion) sur une case voisine ; 1 invocation par Koopaling (7 max), consomme le tour.",
    'ganondorf': "Ganondorf",
    'ganondorf-desc': "Roi des Gerudos et incarnation du Pouvoir. Traître, manipulateur et presque immortel, il poursuit la Triforce à travers les âges. Face à lui, Hyrule brûle.",
    'samus': "Samus",
    'samus-desc': "Chasseuse de primes galactique sous l'armure Power Suit. Survivante de la colonie K-2L, elle traque les Metroids pour la Fédération. Glaciale, précise, légendaire.",
    'pit': "Pit",
    'pit-desc': "Ange gardien de Palutena, archer céleste au cœur d'or. Même sans ailes permanentes, il plonge dans la mêlée pour Angel Land. « Quoi ?! » est son cri de guerre favori.",
    'palutena': "Palutena",
    'palutena-desc': "Déesse de la Lumière qui protège les humains depuis les cieux. Élgante, sarcastique et toute-puissante, elle guide Pit… quand elle n'est pas piégée. Sa magie verte illumine le chaos.",
    'sheik': "Sheik",
    'sheik-desc': "Ombre agile d'Hyrule, maître du ninjutsu sheikah. Voix grave, harpe et kunai : une identité secrète pour survivre à Ganondorf. Rapidité et mystère font sa force.",
    'wario': "Wario",
    'wario-desc': "Rival cupide de Mario, obsédé par l'or et les gadgets foireux. Gros, fort, et fier de son gaz… il lance WarioWare entre deux coups bas. L'anti-héros jaune et violet par excellence.",
    'duo-duck-hunt': "Duo Duck Hunt",
    'duo-duck-hunt-desc': "Le chien moqueur et le canard fuyard du classique NES. Ensemble, ils rappellent l'âge d'or du zapper. Un duo improbablement efficace… et un peu provocateur.",
    'wii-fit-trainer': "Wii Fit Trainer",
    'wii-fit-trainer-desc': "Coach sportif de Wii Fit, toujours prêt à corriger votre posture. Sourire encourageant, routine yoga et motivation douce. Sur le plateau, l'équilibre devient une arme.",
    'luigi': "Luigi",
    'luigi-desc': "Frère cadet de Mario, un peu peureux mais ultra talentueux. Fantômes, mansions et sauts précis : il brille quand on lui laisse la lumière. Vert de timidité, vert de victoire.",
    'peach': "Peach",
    'peach-desc': "Princesse du Royaume Champignon, aussi diplomate que redoutable. Parapluie, flottement et charme royal masquent une vraie combattante. Mario court… et elle se bat aussi.",
    'kirby': "Kirby",
    'kirby-desc': "Petite boule rose de Pop Star, gourmande et indestructible. Il aspire tout — ennemis, pouvoirs, goûter — avec un sourire innocent. Sous ses joues rondes se cache une force cosmique. Aspiration : se déplace comme la dernière pièce ennemie capturée (départ : mouvement de cavalier).",
    'king-k-rool': "King K. Rool",
    'king-k-rool-desc': "Souverain crocodile des Kremlings, ennemi de Donkey Kong. Couronne bancale, ventre proéminent et plans de conquête ridicules… mais dangereux. Il veut les bananes, et le trône.",
    'waluigi': "Waluigi",
    'waluigi-desc': "Complice filiforme de Wario, jaloux de Luigi jusqu'au bout des moustaches. Spécialiste des sports, des coups tordus et du cri « Wah ! ». Le plus grand second rôle du Royaume Champignon.",
    'captain-falcon': "Captain Falcon",
    'captain-falcon-desc': "Pilote de F-Zero et chasseur de primes de Mute City. Casque bleu, Coup de poing Falcon et accélérations folles : la vitesse est sa religion. « Montre-moi ce que tu sais faire ! »",
    'bayonetta': "Bayonetta",
    'bayonetta-desc': "Sorcière Umbra élégante et impitoyable, maîtresse du Witch Time. Cheveux, armes à feu et talons aiguilles : elle danse avec les anges. Style, puissance et un clin d'œil fatal. Witch Time : après une capture, le prochain coup adverse adjacent est ralenti — cette pièce peut immédiatement se replacer d'1 case.",
    'ayo-oli': "Ayo et Oli",
    'ayo-oli-desc': "Les céphalopes stars de Splatoon, maîtres du Calamari Inkantation. Ayo mène, Oli suit… ou l'inverse, selon le refrain. Leur musique change même le monde.",
    'daisy': "Daisy",
    'daisy-desc': "Princesse de Sarasaland, énergique et compétitive. Moins « damsel », plus « sports star », elle rivalise avec Peach en panache. Jaune vif, attitude rock.",
    'lucina': "Lucina",
    'lucina-desc': "Princesse d'Ylisse venue du futur pour empêcher la catastrophe. Masquée en « Marth », elle brandit Falchion avec une détermination froide. L'espoir d'un monde brisé.",
    'lyn': "Lyn",
    'lyn-desc': "Épéiste du peuple des plaines dans Fire Emblem. Libre, fière et rapide comme le vent, elle défend les siens sans faiblir. Sa lame danse avant même que l'ennemi ne cligne.",
    'pyra-mythra': "Pyra & Mythra",
    'pyra-mythra-desc': "Les deux Aegis liées à Rex dans Xenoblade Chronicles 2. Feu et lumière, douceur et tranchant : une même âme, deux personnalités. Ensemble, elles tranchent le destin.",
    'marie': "Marie",
    'marie-desc': "Cousine calme du duo Calamar dans Splatoon. Voix grave, regard laconique et punchlines sèches. Quand elle chante, les Inklings suivent.",
    'min-min': "Min Min",
    'min-min-desc': "Combattante de Springtron à Ramen Bowl dans ARMS. Ses dragons extensibles frappent de loin avec un sourire de chef. Nouilles, style et allonge.",
    'samus-sans-armure': "Samus sans armure",
    'samus-sans-armure-desc': "Samus Aran sans Power Suit : juste la Zero Suit et son pistolet de poing. Agile, exposée, mais toujours la chasseuse la plus redoutable. La légende sous l'armure.",
    'perle-et-coralie': "Perle et Coralie",
    'perle-et-coralie-desc': "Duo de pop idols Off the Hook dans Splatoon 2. Perle hurle, Coralie groove : contraste parfait. Leur show illumine Inkopolis.",
    'krystal': "Krystal",
    'krystal-desc': "Guerrière cerulean de Star Fox, télépathe et juste. Exilée puis alliée de l'équipe, elle combat pour la paix galactique. Staff en main, intuition au cœur.",
    'fox-mccloud': "Fox McCloud",
    'fox-mccloud-desc': "Leader de Star Fox, renard pilote de l'Arwing. Père disparu, équipe loyale, blaster prêt : il défend le système Lylat. Tonneau recommandé !",
    'falco-lombardi': "Falco Lombardi",
    'falco-lombardi-desc': "Ace acerbe de Star Fox, oiseau de proie à l'ego affirmé. Moins diplomate que Fox, plus direct en dogfight. Solo ou en formation, il pique.",
    'wolf-o-donnell': "Wolf O'Donnell",
    'wolf-o-donnell-desc': "Rival de Fox à la tête de Star Wolf. Cicatrice, cynisme et respect grudging pour McCloud. L'ombre noire du système Lylat.",
    'marth': "Marth",
    'marth-desc': "Prince d'Altea, premier héros de Fire Emblem. Falchion à la main, il unit les continent contre le dragon sombre. Élégance et leadership incarnés.",
    'roy': "Roy",
    'roy-desc': "Jeune lord de Pherae dans Fire Emblem. Idéaliste, courageux, encore un peu vert… mais destiné à forger la paix. Son épée brûle d'ambition.",
    'yoshi': "Yoshi",
    'yoshi-desc': "Dinosaure fidèle du Royaume Champignon, gourmand et bondissant. Langue collante, œufs projectiles et monture de Mario : un allié indispensable. Vert (ou rose, ou bleu…) de bonheur. Langue élastique : attire une pièce ennemie à 1 case et la dépose juste derrière Yoshi.",
    'little-mac': "Little Mac",
    'little-mac-desc': "Boxeur de Brooklyn entraîné par Doc Louis. Petit gabarit, uppercuts monstrueux : du ring Punch-Out!! au sommet. Un vrai cœur de champion.",
    'dixie-kong': "Dixie Kong",
    'dixie-kong-desc': "Cousine blonde de Donkey Kong, queue en natte propulsive. Avec Diddy, elle sauve les îles et les bananes. Charme, rythme et acrobaties.",
    'ribbon-girl': "Ribbon Girl",
    'ribbon-girl-desc': "Star d'ARMS venue d'Ribbonane, fan des rubans extensibles. Populaire, rythmée, elle transforme le ring en scène. Ses coups ont du style.",
    'springman': "Spring Man",
    'springman-desc': "Héros musclé d'ARMS à Springtron. Bras ressorts, énergie débordante et fair-play. Il veut juste le meilleur combat possible.",
    'rex': "Rex",
    'rex-desc': "Jeune Driver de Xenoblade Chronicles 2, rêveur de l'Elysium. Lié à Pyra et Mythra, il grandit au fil des lames. Cœur d'or, ambition d'acier.",
    'james-mccloud': "James McCloud",
    'james-mccloud-desc': "Légendaire père de Fox, pilote mythique de Star Fox. Disparu… ou pas, selon les rumeurs du Lylat. Son héritage guide encore l'équipe.",
    'ice-climbers': "Ice Climbers",
    'ice-climbers-desc': "Popo et Nana, duo de grimpeurs du classique Ice Climber. Marteaux, glaciers et coordination parfaite. Ensemble, ils escaladent l'impossible.",
    'ike': "Ike",
    'ike-desc': "Mercenaire de Fire Emblem : Path of Radiance. Fils de Greil, lame lourde, idéal de justice brute. Il parle peu, frappe fort.",
    'roi-dadidou': "Roi Dadidou",
    'roi-dadidou-desc': "Souverain dodu de Dream Land, rival/ami de Kirby. Martelo en main, il veut le trône… et un bon festin. Méchant le lundi, allié le mardi.",
    'ridley': "Ridley",
    'ridley-desc': "Dragon spatial sadique, archi-ennemi de Samus. Intelligent, cruel, indestructible en apparence. Chaque rencontre laisse une cicatrice.",
    'general-pepper': "General Pepper",
    'general-pepper-desc': "Commandant des forces de Corneria dans Star Fox. Moustache, cigare et ordres secs depuis le QG. Il envoie Star Fox au feu… pour la paix.",
    'ness': "Ness",
    'ness-desc': "Garçon de Onett doté de pouvoirs PSI dans EarthBound. Baseball bat, yo-yo et courage face à Giygas. L'aventure commence dans sa banlieue.",
    'lucas': "Lucas",
    'lucas-desc': "Enfant sensible de Tazmily dans Mother 3. PK Love et détermination après la tragédie. Douceur qui peut faire basculer le monde.",
    'captain-olimar': "Captain Olimar",
    'captain-olimar-desc': "Astronaute Hocotate Freight, père des Pikmin. Petit, méthodique, souvent en retard de loyer. Ses Pikmin sont sa plus grande force.",
    'tom-nook': "Tom Nook",
    'tom-nook-desc': "Tanuki entrepreneur d'Animal Crossing. Sourire commercial, prêts immobiliers et… gentillesse calculée. Bienvenue à la ville — signe ici.",
    'mewtwo': "Mewtwo",
    'mewtwo-desc': "Pokémon légendaire créé par l'homme à partir de Mew. Pouvoir psychique absolu, crise existentielle incluse. « Qui suis-je ? » devient une arme. Psyko : une fois par 3 tours, échange sa position avec une pièce alliée dans un rayon de 2 cases.",
    'mr-game-and-watch': "Mr. Game & Watch",
    'mr-game-and-watch-desc': "Héros plat et pixelisé des LCD Game & Watch. Silhouette noire, occupations absurdes, nostalgie pure. Il est littéralement un jeu portable. Affichage LCD : chaque tour, 1 chance sur 9 de se comporter comme une dame ; sinon comme un fou.",
    'toad': "Toad",
    'toad-desc': "Fidèle Champignon du château de Peach. Courageux malgré sa taille, il guide, informe et panique avec le sourire. « Excusez-moi, Princess ! »",
    'bowser-junior': "Bowser Junior",
    'bowser-junior-desc': "Héritier turbulent de Bowser, pinceau Magikoopa à la main. Shadow Mario, karts et caprices de prince. Petit, mais déjà une menace.",
    'villageois': "Villageois",
    'villageois-desc': "Habitant personnalisable d'Animal Crossing. Hache, filet, canne… et une vie paisible. Ici, même la guerre a un air de dimanche.",
    'rondoudou': "Rondoudou",
    'rondoudou-desc': "Pokémon Normal/Fée au chant mortel : Berceuse. Mignon, rebondissant, et capable d'endormir tout un stade. Ne sous-estimez jamais ses yeux.",
    'peppy-hare': "Peppy Hare",
    'peppy-hare-desc': "Vétéran lapin de Star Fox, mentor de Fox. Conseils sages, « barrel roll » immortalisé, loyauté sans faille. L'âme de l'équipe.",
    'slippy-toad': "Slippy Toad",
    'slippy-toad-desc': "Ingénieur crapaud de Star Fox, parfois maladroit en dogfight. Génial en labo, fragile en cockpit. Sans lui, pas d'Arwing tuné.",
    'helix': "Helix",
    'helix-desc': "Combattant mystérieux d'ARMS aux bras hélicoïdaux. Style fluide, frappe tournoyante, présence énigmatique. Il déroule le combat.",
    'hero-ring-fit-adventure': "Héros Ring Fit",
    'hero-ring-fit-adventure-desc': "Aventurier sportif de Ring Fit Adventure. Squats, yoga et dragons : la forme physique sauve le monde. Respirez… puis chargez.",
    'fille-inkling': "Fille Inkling",
    'fille-inkling-desc': "Jeune Inkling prête à encrer le turf dans Splatoon. Transformable en calamar, arme à encre et style street. La couleur, c'est la vie.",
    'vlad': "Vlad",
    'vlad-desc': "Noble vampire d'ARMS, bras cape et allure gothique. Théâtral, puissant, un brin dramatique. La nuit lui appartient sur le ring.",
    'the-legend-of-zelda': "The Legend of Zelda",
    'super-mario': "Super Mario",
    'metroid': "Metroid",
    'kid-icarus': "Kid Icarus",
    'duck-hunt': "Duck Hunt",
    'wii-fit': "Wii Fit",
    'kirby': "Kirby",
    'donkey-kong': "Donkey Kong",
    'f-zero': "F-Zero",
    'bayonetta': "Bayonetta",
    'splatoon': "Splatoon",
    'fire-emblem': "Fire Emblem",
    'xenoblade-chronicles': "Xenoblade Chronicles",
    'arms': "ARMS",
    'star-fox': "Star Fox",
    'yoshi': "Yoshi",
    'punch-out': "Punch-Out!!",
    'ice-climber': "Ice Climber",
    'earthbound': "EarthBound",
    'pikmin': "Pikmin",
    'animal-crossing': "Animal Crossing",
    'pok-mon': "Pokémon",
    'game-watch': "Game & Watch",
    'ring-fit-adventure': "Ring Fit Adventure",
    
    // Univers des pièces
    'nintendo-universe': 'Nintendo',
    'playstation-universe': 'PlayStation',
    'sega-universe': 'SEGA',
    'xbox-universe': 'Xbox',
    'super-mario': 'Super Mario',
    'legend-of-zelda': 'The Legend of Zelda',
    'metroid': 'Metroid',
    'kid-icarus': 'Kid Icarus',
    'sonic': 'Sonic',
    'streets-of-rage': 'Streets of Rage',
    'halo': 'Halo',
    'gears-of-war': 'Gears of War',
    
    // Publicités
    'advertisements': 'Publicités',
    'ad-1': 'Annonce 1',
    'ad-2': 'Annonce 2',
    'ad-update': 'Mise à jour toutes les 5 actions',
    
    // Langues
    'language': 'Langue',
    'french': 'Français',
    'english': 'English',
    'spanish': 'Español',
    'german': 'Deutsch',
    'portuguese': 'Português',
    'italian': 'Italiano',
    
    // Nouvelles traductions pour tous les personnages
    'king-k-rool': 'King K. Rool',
    'king-k-rool-desc': "Souverain crocodile des Kremlings, ennemi de Donkey Kong. Couronne bancale, ventre proéminent et plans de conquête ridicules… mais dangereux. Il veut les bananes, et le trône.",
    'waluigi': 'Waluigi',
    'waluigi-desc': "Complice filiforme de Wario, jaloux de Luigi jusqu'au bout des moustaches. Spécialiste des sports, des coups tordus et du cri « Wah ! ». Le plus grand second rôle du Royaume Champignon.",
    'captain-falcon': 'Captain Falcon',
    'captain-falcon-desc': "Pilote de F-Zero et chasseur de primes de Mute City. Casque bleu, Coup de poing Falcon et accélérations folles : la vitesse est sa religion. « Montre-moi ce que tu sais faire ! »",
    'bayonetta': 'Bayonetta',
    'bayonetta-desc': "Sorcière Umbra élégante et impitoyable, maîtresse du Witch Time. Cheveux, armes à feu et talons aiguilles : elle danse avec les anges. Style, puissance et un clin d'œil fatal. Witch Time : après une capture, le prochain coup adverse adjacent est ralenti — cette pièce peut immédiatement se replacer d'1 case.",
    'banjo-kazooie': 'Banjo & Kazooie',
    'banjo-kazooie-desc': "Ours gentil et oiseau moqueur du Isle o' Hags. Banjo porte, Kazooie pique : le duo Rareware culte des collectathons. Jiggy ou pas, l'aventure reste joyeuse.",
    'ayo-oli': 'Ayo et Oli',
    'ayo-oli-desc': "Les céphalopes stars de Splatoon, maîtres du Calamari Inkantation. Ayo mène, Oli suit… ou l'inverse, selon le refrain. Leur musique change même le monde.",
    
    // PlayStation
    'astro-bot': 'Astro Bot',
    'astro-bot-desc': "Petit robot mignon d'Astro's Playroom et Astro Bot. Hommage vivant au catalogue PlayStation, sauts et gadgets inclus. La mascotte du DualSense.",
    'aloy': 'Aloy',
    'aloy-desc': "Chasseuse Nora de Horizon, clone d'Elisabet Sobeck. Arc, machines dinosaures et vérité sur le Faro Plague. Rouge de cheveux, d'acier de volonté.",
    'sackboy': 'Sackboy',
    'sackboy-desc': "Poupée de tissu créative de LittleBigPlanet. Personnalisable à l'infini, joyeux et collant (au sens craft). Votre imagination est son monde.",
    'jak': 'Jak',
    'jak-desc': "Héros d'Haven City dans Jak and Daxter. Éco, Dark, Light : l'énergie le transforme autant que l'aventure. Silence d'origine, puissance acquise. Éco sombre : après un déplacement, peut marquer une case voisine (interdit aux ennemis 1 tour).",
    'daxter': 'Daxter',
    'daxter-desc': "Ottsel moqueur, meilleur ami (et ex-humain) de Jak. Blagues, lâcheté stratégique et fidélité absolue. Le commentaire audio de l'épopée.",
    'kat': 'Kat',
    'kat-desc': "Héroïne de Gravity Rush capable de manipuler la gravité. Chapeau, chat Dust et chute contrôlée : elle redéfinit « tomber ». Élégance en apesanteur.",
    'parappa': 'Parappa',
    'parappa-desc': "Chien rappeur de Parappa the Rapper. « Je dois y croire ! » : rythme, école et confiance en soi. Appuie sur les touches, trouve le flow.",
    'sam-porter-bridges': 'Sam Porter Bridges',
    'sam-porter-bridges-desc': "Livreur de Death Stranding, reconnecteur de l'Amérique. BB, sang et randonnée apocalyptique. Chaque colis est un lien humain.",
    'ico': 'Ico',
    'ico-desc': "Garçon cornu d'ICO, guide d'Yorda dans le château. Silence, lumière et pureté du gameplay Team Ico. Protéger, c'est progresser.",
    
    // SEGA
    'ryo': 'Ryo',
    'ryo-desc': "Justicier des rues dans Streets of Rage (Bare Knuckle). Poings, alliés et synthwave : il nettoie la ville. La rage, version SEGA.",
    'joe-musashi': 'Joe Musashi',
    'joe-musashi-desc': "Ninja de Shinobi au service de l'honneur. Shurikens, lame et missions impossibles. L'ombre qui tranche le crime.",
    'tails': 'Tails',
    'tails-desc': "Miles « Tails » Prower, renard à deux queues et génie inventeur. Il vole, bricole et soutient Sonic sans jamais se vanter. Le meilleur acolyte bleu et orange. Vol de soutien : transporte une pièce alliée adjacente d'1 case vers l'avant.",
    'dr-robotnik': 'Dr. Robotnik',
    'dr-robotnik-desc': "Dr. Ivo Robotnik, alias Eggman : génie mégalomane à moustache. Badniks, Death Egg et rires gras contre Sonic. Ce hérisson le met hors de lui ! Robot Capsule : secondaire qui place un petit robot pion neutre sur une case vide voisine (bloque 1 tour).",
    'blaze-fielding': 'Blaze Fielding',
    'blaze-fielding-desc': "Enquêtrice et combattante de Streets of Rage. Coups de pied précis, justice urbaine, style affirmé. Elle ne laisse aucun gang tranquille.",
    'axel-stone': 'Axel Stone',
    'axel-stone-desc': "Brawler emblématique de Streets of Rage. Blouson, uppercut et loyauté envers ses potes. Le poing qui remet la ville d'aplomb.",
    'adam-hunter': 'Adam Hunter',
    'adam-hunter-desc': "Flic musclé de Streets of Rage, frère de Blaze selon les opus. Puissance brute et sens du devoir. Quand ça chauffe, il entre.",
    'hatsune-miku': 'Hatsune Miku',
    'hatsune-miku-desc': "Vocaloid turquoise aux couettes légendaires. Idole virtuelle, concerts hologrammes et hits planétaires. La voix que tout le monde connaît.",
    'sakura-shinguji': 'Sakura Shinguji',
    'sakura-shinguji-desc': "Héroïne de Sakura Wars, membre de la Flower Division. Katana, théâtre et mechas à vapeur. Doux sourire, frappe décisive.",
    'vyse': 'Vyse',
    'vyse-desc': "Pirate du ciel de Skies of Arcadia. Grand bleu, ambition plus grande encore : découvrir les confins. L'aventure a un rire.",
    'aika': 'Aika',
    'aika-desc': "Navigatrice fidèle de Vyse dans Skies of Arcadia. Esprit vif, courage et cœur sur la main. Sans elle, le Delphinus dérive.",
    'amigo': 'Amigo',
    'amigo-desc': "Singe maracas de Samba de Amigo. Rythme latino, sourire large, fête permanente. Secoue au tempo… ou rate le groove.",
    'ecco-dolphin': 'Ecco the Dolphin',
    'ecco-dolphin-desc': "Dauphin d'Ecco the Dolphin, sauveur des océans temporels. Sonar, mystère et voyage à travers les ères. La mer chante avec lui. Sonar mystique : secondaire qui repousse une pièce de 2 cases vers l'arrière.",
    'pilote-hang-on': 'Pilote Hang-On',
    'pilote-hang-on-desc': "Motard anonyme du classique arcade Hang-On. Virages inclinés, asphalte et adrénaline Yu Suzuki. Le corps devient le guidon.",
    'dj-professeur-k': 'DJ Professeur K',
    'dj-professeur-k-desc': "Voix pirate de Jet Set Radio / Jet Grind Radio. Groove, graffiti et liberté urbaine contre la censure. Monte le son !",
    'ulala': 'Ulala',
    'ulala-desc': "Reporter de Space Channel 5, danseuse d'actualité. Micro, rayons aliens et chorégraphies sauvent la galaxie. « Chu chu ! » Groove laser : secondaire qui contrôle temporairement une pièce ennemie adjacente pendant 1 tour.",
    'la-fille': 'La Fille',
    'la-fille-desc': "Héroïne enigmatic de Feel the Magic: XY/XX. Émotions, mini-jeux et romance absurde SEGA. Faire sourire devient une quête.",
    'le-joueur': 'Le Joueur',
    'le-joueur-desc': "Avatar du joueur dans Feel the Magic: XY/XX. Gestes, défis et maladresse touchante pour conquérir un cœur. Vous êtes le héros… littéralement.",
    'zombie': 'Zombie',
    'zombie-desc': "Mort-vivant classique de The House of the Dead. Lent, nombreux, affamé de cerveaux de tireurs arcade. Visez la tête !",
    'chupea': 'Chupea',
    'chupea-desc': "Souris colorée de ChuChu Rocket!. Rapide, mignonne, toujours à un tunnel d'une catastrophe. Direction : la fusée !",
    'chubach': 'Chubach',
    'chubach-desc': "Autre ChuChu de la meute Rocket. Instinct de groupe et panique organisée. Ensemble, ils remplissent la soucoupe.",
    'chuih': 'Chuih',
    'chuih-desc': "Petit rongeur de ChuChu Rocket!, prêt à foncer au mauvais moment. Chaos adorable garanti. Suivez les flèches… ou pas.",

    // Catalogue SEGA élargi
    'clarissa': "Clarissa",
    'clarissa-desc': "Passagère emblématique d'OutRun / OutRun 2. Cheveux au vent, cabriolet rouge, road trip mythique. La destination, c'est le style.",
    'tyris-flare': "Tyris Flare",
    'tyris-flare-desc': "Amazone magicienne de Golden Axe. Feu, beauté guerrière et vengeance contre Death Adder. La flamme du sud.",
    'gena': "Gena",
    'gena-desc': "Personnage de Jet Set Radio, skateur/graffeur selon les versions. Attitude street et liberté sur les rails. L'encre contre le système.",
    'billy-hatcher': "Billy Hatcher",
    'billy-hatcher-desc': "Garçon au costume de poulet de Billy Hatcher and the Giant Egg. Roule des œufs géants pour sauver le matin. Cocorico héroïque.",
    'ax-battler': "Ax Battler",
    'ax-battler-desc': "Barbare à la hache de Golden Axe. Force brute, montures et cris de guerre. Quand Ax frappe, la terre tremble.",
    'bd-joe': "B.D. Joe",
    'bd-joe-desc': "Chauffeur charismatique de Crazy Taxi. Courses folles, pourboires records et style déjanté. Le volant est sa scène.",
    'mec-space-harrier': "Mec Space Harrier",
    'mec-space-harrier-desc': "Pilote du shoot arcade Space Harrier. Bienvenue dans la Fantasy Zone : vitesse folle et sprites géants. L'espace défile sous vos yeux.",
    'taro-sega-boy': "Taro Sega Boy",
    'taro-sega-boy-desc': "Mascotte garçon SEGA, visage amical de la marque. Esprit arcade, nostalgie et bleu signature. Il porte le logo dans le cœur.",
    'taro-sega-girl': "Taro Sega Girl",
    'taro-sega-girl-desc': "Mascotte fille SEGA, énergie et sourire commercial vintage. Elle rappelle les bornes, les notices et la Dreamcast. Vive l'équipe SEGA !",
    'death-adder': "Death Adder",
    'death-adder-desc': "Tyran final de Golden Axe, usurpateur couronné. Magie noire, armée et arrogance absolue. Les héros existent pour le renverser.",
    'gilius-thunderhead': "Gilius Thunderhead",
    'gilius-thunderhead-desc': "Nain magicien de Golden Axe, sage et râleur. Foudre, hache et expérience des batailles. Petit gabarit, grand orage.",
    'aiai': "AiAi",
    'aiai-desc': "Singe de Super Monkey Ball, toujours dans sa sphère. Labyrinthes, bananas et chutes comiques. Restez dans la boule !",
    'puyo-puyo': "Puyo Puyo",
    'puyo-puyo-desc': "Gelée colorée du puzzle Puyo Puyo. Empile, aligne, fais disparaître… et envoie le combo. Mignon jusqu'à l'explosion.",
    'alberto': "Alberto",
    'alberto-desc': "Figure amicale de la galaxie SEGA, toujours prêt à en découdre avec le sourire. Esprit d'équipe et panache bleu électrique. Un visage qu'on n'oublie pas.",
    'gus': "Gus",
    'gus-desc': "Compère SEGA au caractère bien trempé et au moral d'acier. Loyal, direct, impossible à démonter. Quand Gus s'accroche, rien ne passe.",
    'mew-mew': "Mew Mew",
    'mew-mew-desc': "Petite créature SEGA au nom tout doux et à l'énergie espiègle. Expressive, imprévisible, redoutable quand on la sous-estime. Mignonneté stratégique garantie.",
    'axel': "Axel",
    'axel-desc': "Poing levé de Streets of Rage, cousin d'esprit d'Axel Stone. Blouson, uppercuts et nuits blanches contre les gangs. La rue n'attend personne.",
    'skies-of-arcadia': "Skies of Arcadia",
    'golden-axe': "Golden Axe",
    'jet-set-radio': "Jet Set Radio",
    'billy-hatcher': "Billy Hatcher",
    'crazy-taxi': "Crazy Taxi",
    'space-harrier': "Space Harrier",
    'super-monkey-ball': "Super Monkey Ball",
    'puyo-puyo': "Puyo Puyo",
    
    // Xbox
    'marcus-fenix': 'Marcus Fenix',
    'marcus-fenix-desc': "Sergent grognon de Gears of War. Lancer, baïonnette-tronçonneuse et fraternité COG. Les Locusts tremblent quand il charge.",
    'joanna-dark': 'Joanna Dark',
    'joanna-dark-desc': "Agent Carrington Institute dans Perfect Dark. Espionne du futur proche, armes expérimentales et missions sous couverture. Joanna voit dans le noir. Camouflage RCP-120 : avance de 4 cases en ligne droite (ortho uniquement). Double-clic avant de bouger pour devenir invisible 1 tour (semi-visible pour vous, invisible aux adversaires ; toujours capturable sur sa case).",
    'cortana': 'Cortana',
    'cortana-desc': "IA brillante liée au Master Chief dans Halo. Sarcasme, génie tactique et loyauté féroce. Plus qu'un logiciel : une partenaire.",
    'juno': 'Juno',
    'juno-desc': "Operatrice Halo au sang-froid militaire absolu. Coordination orbitale, briefings secs et soutien tactique. Quand elle parle, la flotte écoute.",
    'jd-fenix': 'JD Fenix',
    'jd-fenix-desc': "James Dominic Fenix, fils de Marcus dans Gears of War 4. Nouvelle génération, mêmes Locusts… et un père à convaincre. L'héritage pèse lourd.",
    'general-raam': 'General Raam',
    'general-raam-desc': "Général Locust mythique de Gears of War. Kryll autour de lui, lame immense, terreur incarnée. Les humains apprennent son nom dans le sang. Nuée de Kryll : les cases orthognales adjacentes bloquent les fuites ennemies tant qu'il reste immobile.",
    'cyclops-drone': 'Cyclops Drone',
    'cyclops-drone-desc': "Drone Locust cyclopéen, chair à canon technologique. Surveillance, essaims et pression constante. Un œil, mille menaces.",
    'ori': 'Ori',
    'ori-desc': "Esprit de lumière d'Ori and the Blind Forest / Will of the Wisps. Fragile, agile, bouleversant. La forêt chante sa renaissance.",
    'reaver': 'Reaver',
    'reaver-desc': "Pirate immortel de Fable, marchand d'ombres et de vices. Élégant, cynique, impossible à tuer longtemps. Le mal a du style. Pacte immortel : la première fois qu'il devrait être capturé, il réapparaît sur une case libre adjacente (1 fois / partie).",
    'senua': 'Senua',
    'senua-desc': "Guerrière pictish de Hellblade, confrontée à la psychose et aux dieux nordiques. Voix multiples, lame unique, courage absolu. Sa réalité est le champ de bataille. Focus : révèle et frappe une pièce ennemie dans un rayon de 2 cases si elle est isolée (sans allié adjacent), 1 fois / 3 tours.",
    'jago': 'Jago',
    'jago-desc': "Moine guerrier de Killer Instinct, hôte du Tiger Spirit. Katana, discipline et conflit intérieur. L'équilibre se gagne coup après coup.",
    'orchid': 'Orchid',
    'orchid-desc': "Espionne et combattante de Killer Instinct. Agilité, gadgets et charisme explosif. Elle frappe avant que vous ayez cligné.",
    'capitaine-flameheart': 'Capitaine Flameheart',
    'capitaine-flameheart-desc': "Pirate squelette légendaire de Sea of Thieves. Flotte maudite, rires de feu et quêtes épiques. La Mer des Larrons lui appartient.",
    'pirate': 'Pirate',
    'pirate-desc': "Corsaire de Sea of Thieves, soif d'or et de rhum. Alliances fragiles, trahisons joyeuses, tempêtes garanties. Yo-ho, yo-ho.",
    'rash': 'Rash',
    'rash-desc': "Battletoad vert, fouet de langue et attitude arcade. De Rareware à Xbox, il écrase les boss avec panache. Crapaud de choc, légende vivante.",
    'conker': 'Conker',
    'conker-desc': "Écureuil alcoolisé et cynique de Conker's Bad Fur Day. Humour noir, quêtes absurdes, portefeuille toujours vide. Réservé à un public averti.",
    'blinx': 'Blinx',
    'blinx-desc': "Chat manipulateur du temps dans Blinx: The Time Sweeper. Aspirateur temporel, paradoxes et souris à rattraper. Rembobinez le chaos.",
    'crash-bandicoot': 'Crash Bandicoot',
    'crash-bandicoot-desc': "Bandicoot mutant créé par Cortex, star des jeux de plates-formes. Vrille fulgurante, caisses TNT et cri de surprise signature. Marsupial, héroïque, indestructible.",
    'spyro': 'Spyro',
    'spyro-desc': "Jeune dragon violet des Dragon Realms. Vol, souffle de feu et attitude cool : il sauve les siens avec panache. Petite taille, grande flamme. Crachat de flamme : déplacement en triangle (2 cases devant + 2 latérales au bout). Secondaire Souffle de feu : brûle la case devant (interdite 1 tour).",
    'viva-pinata': 'Viva Piñata',
    'viva-pinata-desc': "Créature piñata de Viva Piñata, jardin et élevage colorés. Attirez, soignez, fêtez — sans trop secouer. Le jardin est un écosystème joyeux.",
    'joule-adams': 'Joule Adams',
    'joule-adams-desc': "Héroïne de ReCore, mécanicienne du desert de Far Eden. Frame companion et espoir terraforma. Elle répare le monde, pièce par pièce.",
    'steeve': 'Steeve',
    'steeve-desc': "Compagnon Core de Far Eden aux côtés de Joule Adams. Carcasse métallique, cœur fidèle, prêt pour le désert. Sans lui, la traversée serait solitaire.",
    'cooper': 'Cooper',
    'cooper-desc': "Héros chaotique de Sunset Overdrive. Armes absurdes, parkour et apocalypse amusante. Le soleil se couche, la fête commence.",
    'hornet': 'Hornet',
    'hornet-desc': "Agent d'élite plongé dans les fractures temporelles de Quantum Break. Missions tendues, réalités qui se fissurent, sang-froid obligatoire. Chaque seconde peut tout changer.",
    'shu': 'Shu',
    'shu-desc': "Survivant miniature de Grounded. Dans le jardin géant, une fourmi est un boss. Courage à l'échelle d'un brin d'herbe.",
    'lupus': 'Lupus',
    'lupus-desc': "Survivant de State of Decay, monde zombie sans filet. Base, communauté, choix durs. L'espoir se gère comme des ressources.",
    'moine': 'Moine',
    'moine-desc': "Figure spirituelle / survivante de State of Decay. Foi, calme et utilité au camp. Même l'apocalypse a besoin de silence.",
    'vela': 'Vela',
    'vela-desc': "Exploratrice Xbox au nom d'étoile, toujours tournée vers l'horizon. Curieuse, déterminée, lumière dans l'inconnu. Sa route s'écrit à chaque pas.",
    'nathan-drake-desc': "Chasseur de trésors charismatique d'Uncharted. Quips, escalade et malchance spectaculaire : Indiana Jones version PlayStation. Fortune et gloire… surtout des bleus.",
    'kratos-desc': "Ancien dieu de la guerre spartiate, désormais père en Midgard. Lames du Chaos, hache Léviathan et rage contenue. Un seul mot à son fils suffit parfois.",
    'sonic-desc': "Hérisson bleu le plus rapide du monde. Anneaux, loopings et attitude cool : il sauve les animaux du Dr Robotnik. La vitesse, c'est sa signature !",
    'master-chief-desc': "Spartan-117, légende silencieuse de Halo. Armure MJOLNIR, Cortana à l'oreille, Flood et Covenant en ligne de mire. Il termine toujours le combat. Bouclier d'énergie : secondaire qui ignore une capture une seule fois.",
    'pikachu-desc': "Pokémon Électrique emblématique, partenaire loyal de Sacha. Joues pétillantes, éclair foudroyant et cri mythique. La souris jaune qui a électrisé le monde. Éclair : frappe toutes les pièces adverses adjacentes situées sur des cases blanches, sans se déplacer (recharge 2 tours).",
    'link-ability': "Bouclier d'Hyrule : 20 % de chance de bloquer une attaque. Secondaire Flèche héroïque : tire en ortho à distance 3 sans se déplacer (1 fois / 3 tours).",
    'bowser-ability': "Koopalings : invoque l'un des 7 Koopalings (déplacement de pion) sur une case voisine ; 1 invocation par Koopaling (7 max), consomme le tour.",
    'kirby-ability': "Aspiration : se déplace comme la dernière pièce ennemie capturée (départ : mouvement de cavalier).",
    'bayonetta-ability': "Witch Time : après une capture, le prochain coup adverse adjacent est ralenti — cette pièce peut immédiatement se replacer d'1 case.",
    'yoshi-ability': "Langue élastique : attire une pièce ennemie à 1 case et la dépose juste derrière Yoshi.",
    'mewtwo-ability': "Psyko : une fois par 3 tours, échange sa position avec une pièce alliée dans un rayon de 2 cases.",
    'mr-game-and-watch-ability': "Affichage LCD : chaque tour, 1 chance sur 9 de se comporter comme une dame ; sinon comme un fou.",
    'jak-ability': "Éco sombre : après un déplacement, peut marquer une case voisine (interdit aux ennemis 1 tour).",
    'tails-ability': "Vol de soutien : transporte une pièce alliée adjacente d'1 case vers l'avant.",
    'dr-robotnik-ability': "Robot Capsule : secondaire qui place un petit robot pion neutre sur une case vide voisine (bloque 1 tour).",
    'ecco-dolphin-ability': "Sonar mystique : secondaire qui repousse une pièce de 2 cases vers l'arrière.",
    'ulala-ability': "Groove laser : secondaire qui contrôle temporairement une pièce ennemie adjacente pendant 1 tour.",
    'master-chief-ability': "Bouclier d'énergie : secondaire qui ignore une capture une seule fois.",
    'joanna-dark-ability': "Camouflage RCP-120 : avance de 4 cases en ligne droite (ortho uniquement). Double-clic avant de bouger pour devenir invisible 1 tour (semi-visible pour vous, invisible aux adversaires ; toujours capturable sur sa case).",
    'general-raam-ability': "Nuée de Kryll : les cases orthognales adjacentes bloquent les fuites ennemies tant qu'il reste immobile.",
    'reaver-ability': "Pacte immortel : la première fois qu'il devrait être capturé, il réapparaît sur une case libre adjacente (1 fois / partie).",
    'senua-ability': "Focus : révèle et frappe une pièce ennemie dans un rayon de 2 cases si elle est isolée (sans allié adjacent), 1 fois / 3 tours.",
    'spyro-ability': "Crachat de flamme : déplacement en triangle (2 cases devant + 2 latérales au bout). Secondaire Souffle de feu : brûle la case devant (interdite 1 tour).",
    'pikachu-ability': "Éclair : frappe toutes les pièces adverses adjacentes situées sur des cases blanches, sans se déplacer (recharge 2 tours).",
    'pikachu': "Pikachu",
    'larry-koopa': "Larry Koopa",
    'larry-koopa-desc': "Aîné malicieux des Koopalings, cheveux bleus et baguette magique. Dans New Super Mario Bros., il ouvre souvent le bal des châteaux. Sournois, agile… et très sûr de lui.",
    'morton-koopa': "Morton Koopa Jr.",
    'morton-koopa-desc': "Le plus massif des Koopalings, à la large étoile noire sur le museau. Il écrase le sol et charge sans subtilité. La force brute de la fratrie Koopa.",
    'wendy-koopa': "Wendy O. Koopa",
    'wendy-koopa-desc': "Seule fille des Koopalings, anneaux, nœud rose et attitude de diva. Elle combat avec style et n'aime pas qu'on lui marche sur les pieds. Princesse… à sa façon.",
    'iggy-koopa': "Iggy Koopa",
    'iggy-koopa-desc': "Le scientifique fou de la famille, cheveux en bataille et rire maniaque. Gadgets, potions et chaos calculé : Iggy adore expérimenter sur Mario. Brillant, instable, dangereux.",
    'roy-koopa': "Roy Koopa",
    'roy-koopa-desc': "Koopaling lunettes de soleil et carapace rose, du genre qui charge d'abord. Bagarreur et sûr de son effet, il impressionne autant qu'il intimide. Ne le confondez pas avec le lord de Fire Emblem.",
    'lemmy-koopa': "Lemmy Koopa",
    'lemmy-koopa-desc': "Le plus petit et le plus acrobatique, ballon d'équilibre et foulard à pois. Lemmy transforme chaque combat en numéro de cirque. Sous le spectacle, une vraie menace.",
    'ludwig-koopa': "Ludwig von Koopa",
    'ludwig-koopa-desc': "Cadet intellectuel et vaniteux, crinière bleue digne d'un compositeur. Ludwig se prend pour un génie — et ses sorts le prouvent souvent. L'orgueil des Koopalings personnifié."
  },
  
  en: {
    // Main interface
    'game-title': 'Video Games Battle',
    'page-title': 'Chesstendo - Draft + Board',
    'tagline': 'Forget classic chess, here video game heroes make the rules!',
    'select-players': 'Number of players',
    'select-board-size': 'Board size',
    'start-game': 'Start game',
    'player': 'Player',
    'players': 'players',
    'faction': 'Faction',
    'money': 'Points',
    'team': 'Team',
    'next-player': 'Next player',
    'previous-player': 'Previous player',
    'finish-selection': 'Finish selection',
    'start-game-button': 'Start game',
    
    // Board sizes
    'board-small': '9x9 (Small)',
    'board-medium': '11x11 (Medium)',
    'board-large': '15x15 (Large)',
    
    // Factions
    'nintendo': 'Nintendo',
    'sega': 'SEGA',
    'playstation': 'PlayStation',
    'xbox': 'Xbox',
    
    // Kings
    'king-nintendo': 'Nintendo King',
    'king-playstation': 'PlayStation King',
    'king-sega': 'SEGA King',
    'king-xbox': 'Xbox King',
    
    // Game messages
    'game-start': 'Game starts!',
    'your-turn': 'Your turn',
    'player-turn': 'Player turn',
    'pieces-in-play': 'Pieces in play',
    'rules': 'Rules',
    'captured-pieces': 'Captured pieces',
    'items': 'Items',
    'timer': 'Timer',
    
    // Actions
    'move': 'Move',
    'capture': 'Capture',
    'use-item': 'Use item',
    'end-turn': 'End turn',
    'restart': 'Restart',
    'quit': 'Quit',
    
    // Error messages
    'invalid-move': 'Invalid move',
    'not-your-turn': 'Not your turn',
    'no-piece-selected': 'No piece selected',
    'cannot-move-there': 'Cannot move there',
    
    // Items
    'bobomb': 'Bob-omb',
    'portals': 'Portals',
    'lightning': 'Lightning',
    'star': 'Star',
    'tetrimino': 'Tetrimino',
    'tornado': 'Tornado',
    'banana': 'Banana',
    'phoenix': 'Phoenix Down',
    'cursor': 'Sims Cursor',
    'heart': 'Heart',
    'sandglass': 'Sands of Time',
    'mask': 'Majora\'s Mask',
    'ocarina': 'Ocarina of Time',
    
    // Item descriptions
    'bobomb-desc': 'Mario\'s explosive bomb! Places a bomb on an empty tile that will explode next turn.',
    'portals-desc': 'Instant teleportation! Creates two connected portals on the board.',
    'lightning-desc': 'Mario Kart lightning! Charges for 4 turns, then strikes 8 random light squares.',
    'star-desc': 'Invincibility! Makes all pieces invincible for one turn.',
    'tetrimino-desc': 'Building block! Places a Tetrimino wall on the board.',
    'tornado-desc': 'Sonic tornado! Teleports a piece to a random position on the board.',
    'banana-desc': 'Banana peel! Places a trap: 1 in 3 chance to stop a piece that crosses it.',
    'phoenix-desc': 'Phoenix Down (Final Fantasy)! Revives your last lost piece.',
    'cursor-desc': 'Total control! Takes control of an enemy piece for 1 turn.',
    'heart-desc': 'Extra life! Gives a piece one additional life (survives one capture).',
    'sandglass-desc': 'Hourglass (9×9 only)! Removes 1 minute from your opponent\'s timer.',
    'mask-desc': 'Termina\'s cursed mask! Forces an opponent to play a specific piece on their next turn.',
    'ocarina-desc': 'Hyrule\'s magical instrument! Permanently transforms a piece into a knight (L-shaped moves).',
    
    // Item messages
    'item-used': 'Item used',
    'item-charging': 'Item charging',
    'select-target': 'Select a target',
    'select-position': 'Select a position',
    'not-activated': 'not activated',
    
    // Navigation
    'play': 'Play',
    'pieces': 'Pieces',
    'rules': 'Rules',
    'items': 'Items',
    'credits': 'Credits',
    'movements': 'Movements',
    'login': 'Login',
    
    // Pages
    'available-pieces': 'Available Pieces',
    'available-items': 'Available Items',
    'game-rules': 'Game Rules',
    'movement-demos': 'Movement Demonstrations',
    'sort-by': 'Sort by',
    'strength': 'Role',
    'role': 'Role',
    'all-roles': 'All',
    'editor': 'Editor',
    'universe': 'Universe',
    'all': 'All',
    
    // Game Rules
    'game-objective': 'Game Objective',
    'game-objective-desc': 'Video Games Battle is a chess-like duel: two players face off with video-game character skins. The goal is to capture the opponent\'s king.',
    'victory': 'Victory',
    'victory-desc': ' Capture the opposing king, or win by timeout if the clock is enabled.',
    'piece-types': 'Roles',
    'piece-types-intro': 'Each piece has a chess role (pawn, knight, bishop, etc.). Characters are skins: you choose who represents each role.',
    'board-section': 'The board',
    'board-section-desc': 'Games are played exclusively on a 9×9 board, in a 2-player duel.',
    'board-rule-1': 'Squares alternate light / dark (chessboard style).',
    'board-rule-2': 'Item crates appear on the light squares of row 5 (center rank).',
    'board-rule-3': 'Each side places pieces on 2 ranks: back rank + pawn line.',
    'role-pawn-title': 'Pawn (×9)',
    'role-pawn-desc': 'Moves forward one square; captures diagonally. Direction depends on side.',
    'role-knight-title': 'Knight (×2)',
    'role-knight-desc': 'L-shaped jump. Can leap over pieces.',
    'role-bishop-title': 'Bishop (×2)',
    'role-bishop-desc': 'Diagonals, free range until blocked.',
    'role-rook-title': 'Rook (×2)',
    'role-rook-desc': 'Ranks and files, free range until blocked.',
    'role-queen-title': 'Queen (×1)',
    'role-queen-desc': 'All directions, free range until blocked.',
    'role-king-title': 'King (×1)',
    'role-king-desc': 'One square in any direction. Capturing it ends the game.',
    'role-unique-title': 'Unique (×1)',
    'role-unique-desc': 'Character-specific movement (outside standard chess rules).',
    'formation-title': 'Starting formation',
    'formation-desc': 'Back rank (left to right), then 9 pawns in front:',
    'formation-line': 'R · N · B · Q · K · U · B · N · R<br>P · P · P · P · P · P · P · P · P',
    'formation-note': 'The King is in the center; Unique faces the Queen. A letter on each piece shows its role.',
    'draft-rule-1': 'Full army = 17 pieces + faction king (placed automatically).',
    'draft-rule-2': 'No budget/cost: only role quotas matter.',
    'draft-rule-3': 'The same skin can be chosen multiple times for one role.',
    'online-section': 'Online mode',
    'online-section-desc': 'Online play is 1v1 matchmaking. Results update your Elo rating. Check the leaderboard and sign in via the login page.',
    'cursor-rule-desc': 'control an enemy pawn or knight for 1 turn',
    'faq-same-skin': 'Can I use the same character multiple times?',
    'faq-same-skin-desc': 'Yes. The same skin can fill several slots of the same role (e.g. 9 identical pawns).',
    'king': 'King',
    'king-desc': 'Most important piece. Moves one square in all directions. Capturing it ends the game.',
    'special-pieces': 'Special Pieces',
    'special-pieces-desc': 'Each faction has unique characters with specific movements and abilities:',
    'movements': 'Movements',
    'movements-desc': 'Each role follows chess rules, except Unique which keeps the character\'s movement.',
    'directions': 'Directions',
    'directions-desc': 'Adjacent accessible squares',
    'range': 'Range',
    'range-desc': 'Maximum number of squares in a straight line',
    'specialties': 'Specialties',
    'specialties-desc': 'Unique abilities (jump, flight, etc.)',
    'object-system': 'Item System',
    'acquisition': 'Acquisition',
    'acquisition-desc': 'Walking onto a crate gives a random item. Max reserve: 3 items.',
    'usage': 'Usage',
    'usage-desc': 'One item per turn. Varied effects (see the Items page):',
    'time-sand': 'Time Sand',
    'time-sand-desc': '9×9 only: −1 min from opponent timer',
    'majora-mask': 'Majora\'s Mask',
    'majora-mask-desc': 'forces a specific enemy piece on the next turn',
    'time-ocarina': 'Ocarina of Time',
    'time-ocarina-desc': 'turns a piece into a knight',
    'bomb': 'Bomb',
    'bomb-desc': 'Explodes and damages adjacent pieces',
    'star': 'Star',
    'star-desc': 'Makes all pieces invincible for 1 turn',
    'weight-desc': 'Each item has a weight: higher weight means it appears more often.',
    
    // Common object rules
    'common-rules': 'Common rules:',
    'common-rules-1': 'Each player can keep up to <strong>3 objects</strong> in reserve.',
    'common-rules-2': 'You can only use <strong>one object per turn</strong>.',
    'common-rules-3': 'Objects appear randomly in crates on the board.',
    'common-rules-4': 'An object\'s weight determines its rarity (the higher the weight, the rarer the object).',
    
    // Credits page
    'credits-title': 'CREDITS',
    'legal-warning': 'LEGAL WARNING',
    'fan-project': 'This game is a non-profit FAN project',
    'fan-project-desc': 'All characters, franchises and intellectual properties belong to their respective owners.',
    'no-content-sale': 'No content is for sale',
    'completely-free': 'The entire game is 100% FREE',
    'fan-created': 'This project is created by fans, for fans, without commercial purpose.',
    'owner-of': 'Owner of:',
    'nintendo-owner': 'The Legend of Zelda, Super Mario, and all their associated franchises',
    'playstation-owner': 'PlayStation, Uncharted, God of War, Astro Bot and their franchises',
    'sega-owner': 'Sonic, Yakuza, Shinobi and their associated franchises',
    'xbox-owner': 'Xbox, Halo, Gears of War, Perfect Dark and their franchises',
    'nintendo-king': 'Nintendo King',
    'playstation-king': 'PlayStation King',
    'sega-king': 'SEGA King',
    'xbox-king': 'Xbox King',
    'nintendo-representative': 'Nintendo Representative',
    'playstation-representative': 'PlayStation Representative',
    'sega-representative': 'SEGA Representative',
    'xbox-representative': 'Xbox Representative',
    'nintendo-copyright': '© Nintendo. All rights reserved. Nintendo is a trademark of Nintendo Co., Ltd.',
    'playstation-copyright': '© Sony Interactive Entertainment. All rights reserved. PlayStation is a trademark of Sony Interactive Entertainment LLC.',
    'sega-copyright': '© SEGA Corporation. All rights reserved. SEGA is a trademark of SEGA Corporation.',
    'xbox-copyright': '© Microsoft Corporation. All rights reserved. Xbox is a trademark of Microsoft Corporation.',
    'other-properties': 'Other Properties',
    'inspired-by': 'Items and elements inspired by:',
    'all-elements-inspired': 'All gameplay elements are inspired by existing games and belong to their respective owners.',
    'legal-mentions': 'LEGAL NOTICES',
    'fan-project-legal': 'Video Games Battle is a non-commercial FAN project',
    'educational-purpose': 'This game was created by video game enthusiasts for educational and entertainment purposes only.',
    'no-paid-content': 'No paid content',
    'completely-accessible': 'The entire game is accessible for free',
    'no-sales': 'No sales',
    'nothing-for-sale': 'Nothing is for sale on this site',
    'completely-free': '100% Free',
    'all-features-available': 'All features are available at no cost',
    'community-project': 'Community project',
    'created-by-community': 'Created by and for the gaming community',
    'technical-credits': 'TECHNICAL CREDITS',
    'development': 'Development:',
    'game-engine': 'Game engine:',
    'inspiration': 'Inspiration:',
    'thanks': 'Thanks:',
    'community-support': 'To all the fans who support us and the strategy gaming community',
    'copyright-respect': 'This project respects copyright and trademarks. All characters and franchises belong to their legitimate owners.',
    'scroll-indicator': 'Scroll down to see all credits',
    
    // Rules page - missing sections
    'time-system': 'Time system',
    'optional-timer': 'Optional timer',
    'timer-description': 'Each player has 5 minutes of total time (9×9 board). The clock only runs during your turn.',
    'board-9x9': '9×9:',
    'board-11x11': '11×11:',
    'board-15x15': '15×15:',
    'minutes-per-turn': 'minutes',
    'timeout-elimination': 'Timeout elimination',
    'timeout-description': 'If your time reaches zero, you are eliminated and all your pieces leave the board.',
    'game-flow': 'Game flow',
    'draft-phase': 'Draft phase',
    'draft-description': 'Before the game, each player builds an army by role: pick a publisher, then skins to fill quotas. The Random button auto-fills the army.',
    'game-phase': 'Game phase',
    'game-phase-description': 'Players take turns. On each turn you can:',
    'select-piece': 'Select a piece and move it to a valid square',
    'choose-destination': 'Choose a valid destination square',
    'use-object': 'Or use an item (one per turn)',
    'next-player': 'Pass to the next player',
    'end-game': 'End of game',
    'end-game-description': 'The game ends as soon as a king is captured (or a player is eliminated by timeout).',
    
    // Object names
    'bobomb-name': 'Bob-omb',
    'portals-name': 'Portals',
    'lightning-name': 'Lightning',
    'star-name': 'Star',
    'tetrimino-name': 'Tetromino',
    'tornado-name': 'Tornado',
    'banana-name': 'Banana',
    'phoenix-name': 'Phoenix',
    'cursor-name': 'Sims Cursor',
    'heart-name': 'Heart',
    'sandglass-name': 'Hourglass',
    'mask-name': 'Majora\'s Mask',
    'ocarina-name': 'Ocarina of Time',
    
    // Object descriptions
    'bobomb-desc': 'Mario\'s explosive bomb! Places a <strong>bomb on an empty square</strong> that will explode next turn.',
    'bobomb-details': 'The bomb damages all adjacent pieces (allies and enemies). Perfect for creating danger zones or eliminating multiple pieces at once. Inspired by Super Mario Bros.',
    'portals-desc': 'Instant teleportation! Creates <strong>two connected portals</strong> on the board.',
    'portals-details': 'Place two portals on empty squares. Any piece entering a portal instantly exits the other. Perfect for tactical movements and escapes. Inspired by Portal.',
    'lightning-desc': 'Mario Kart lightning! Charges for <strong>4 turns</strong>, then destroys pieces on <strong>8 random light squares</strong>.',
    'lightning-details': 'After 4 charge turns, lightning hits 8 random light squares and destroys pieces there (allies and enemies). Star-protected pieces are safe. Inspired by Mario Kart\'s Lightning.',
    'star-desc': 'Invincibility! Makes <strong>all pieces invincible</strong> for one turn.',
    'star-details': 'All pieces become invincible until your next turn: no capture or item destruction can affect them. Inspired by Super Mario Bros.',
    'tetrimino-desc': 'Building block! Places a <strong>Tetrimino wall</strong> on the board.',
    'tetrimino-details': 'Creates a permanent obstacle on the board that blocks movements. Perfect for controlling passage areas or protecting strategic positions. Inspired by Tetris.',
    'tornado-desc': 'Sonic tornado! <strong>Teleports a piece</strong> to a random position on the board.',
    'tornado-details': 'Choose a piece that will be teleported to a random free square. Can create unexpected and tactical situations. Inspired by Sonic the Hedgehog.',
    'banana-desc': 'Banana peel! Places a <strong>trap on an empty square</strong>: 1 in 3 chance to stop a piece that crosses it.',
    'banana-details': 'When a piece crosses or lands on the banana, it has a one-in-three chance of being stopped in place. Otherwise it continues. Inspired by Mario Kart.',
    'phoenix-desc': 'Phoenix Down! <strong>Revives your last lost piece</strong>.',
    'phoenix-details': 'Brings back your last lost piece near your king. Perfect after a critical loss. Inspired by Final Fantasy (Phoenix Down).',
    'cursor-desc': 'Total control! <strong>Takes control of an enemy piece</strong> for 1 turn.',
    'cursor-details': 'You can move the enemy piece as if it were yours. Ideal for creating tactical situations or eliminating threats. Inspired by The Sims, this magical cursor allows you to manipulate others.',
    'heart-desc': 'Extra life! <strong>Gives one additional life</strong> to a piece.',
    'heart-details': 'The piece gains an extra life: on the first capture it loses its heart and stays on the board. Perfect for protecting a key piece. Inspired by The Legend of Zelda.',
    'sandglass-desc': 'Hourglass (9×9 only)! Removes <strong>1 minute from your opponent\'s timer</strong>.',
    'sandglass-details': '<strong>9×9 board only.</strong> Removes 1 minute from your opponent\'s timer (2-player matches). Requires the timer to be enabled. Inspired by Prince of Persia: The Sands of Time.',
    'mask-desc': 'Termina\'s cursed mask! Forces an <strong>enemy to play a specific piece</strong> on their next turn.',
    'mask-details': 'Choose an enemy piece that the opponent will be forced to move. The effect disappears after the piece has played. Inspired by The Legend of Zelda: Majora\'s Mask, this evil mask manipulates minds.',
    'ocarina-desc': 'Hyrule\'s magical instrument! <strong>Permanently transforms a piece into a knight</strong> (L-shaped movements).',
    'ocarina-details': 'Choose any piece (ally or enemy) that will now move like a chess knight. The ocarina remains visible above the piece. Inspired by The Legend of Zelda: Ocarina of Time, this legendary object changes the rules of the game.',
    
    // Strategic tips
    'strategic-tips': 'Strategic Tips',
    'king-protection': 'King Protection',
    'king-protection-desc': 'Protect the center and squares around the king; Unique and Queen are strong defenders or attackers.',
    'object-management': 'Item Management',
    'object-management-desc': 'Central crates matter: control row 5 to grab items before your opponent.',
    'positioning': 'Positioning',
    'positioning-desc': 'Open diagonals for bishops, files for rooks, and use knights to leap over blocked lines.',
    'temporary-cooperation': 'Temporary Cooperation',
    'temporary-cooperation-desc': 'Classic mode is a 1v1 duel: anticipate threats rather than relying on alliances.',
    
    // FAQ
    'faq': 'FAQ',
    'can-capture-own': 'Can I capture my own pieces?',
    'can-capture-own-desc': 'No. Only enemy pieces can be captured; your pieces block your paths (except the knight).',
    'no-valid-moves': 'What happens if I have no valid moves?',
    'no-valid-moves-desc': 'If you can\'t move any piece, you automatically skip your turn.',
    'can-steal-objects': 'Can objects be stolen?',
    'can-steal-objects-desc': 'No, the item reserve is personal.',
    'can-change-piece': 'Can I change pieces after selecting one?',
    'can-change-piece-desc': 'Yes: click another of your pieces to change selection before playing the move.',

    // End game overlay
    'end-game-title': 'Game over',
    'end-game-subtitle-duel': 'The opposing king was captured.',
    'end-game-subtitle-multi': 'Final standings.',
    'end-game-winner': 'Victory',
    'end-game-defeated': 'Defeated',
    'end-game-new-game': 'New game',
    'end-game-elo': 'Elo',
    'end-game-no-result': 'Game finished.',
    'end-game-rank-1': '1st',
    'end-game-rank-2': '2nd',
    'end-game-rank-3': '3rd',
    
    // Pieces
    'cost': 'Cost',
    'range': 'Range',
    'movements': 'Movements',
    'movement-demo': 'Movement Demo',
    'tier-1': 'Weak',
    'tier-2': 'Medium',
    'tier-3': 'Strong',
    'tier-4': 'Very Strong',
    'tier-5': 'Legendary',
    'weight': 'Weight',
    
    // Pieces page - missing translations
    'strength': 'Role',
    'role': 'Role',
    'all-strengths': 'All',
    'all-roles': 'All',
    'weak': 'Weak',
    'medium': 'Medium',
    'strong': 'Strong',
    'unique': 'Unique',
    'legendary': 'Legendary',
    'unknown': 'Unknown',
    'all-directions': 'All directions (like a queen)',
    'directions-possible': 'possible directions',
    'points': 'pts',
    
    // Piece names
    'king-nintendo': 'Nintendo King',
    'king-playstation': 'PlayStation King',
    'king-sega': 'SEGA King',
    'king-xbox': 'Xbox King',
    'link': 'Link',
    'mario': 'Mario',
    'zelda': 'Zelda',
    'bowser': 'Bowser',
    'ganondorf': 'Ganondorf',
    'samus': 'Samus',
    'pit': 'Pit',
    'palutena': 'Palutena',
    'sheik': 'Sheik',
    'wario': 'Wario',
    'duo-duck-hunt': 'Duck Hunt Duo',
    'wii-fit-trainer': 'Wii Fit Trainer',
    'luigi': 'Luigi',
    'peach': 'Peach',
    'kirby': 'Kirby',
    
    // Piece descriptions
    'king-nintendo-desc': "Emblème vivant de Nintendo, ce roi incarne l'esprit joyeux et inventif de la maison. Il mène sa faction avec panache et protège le cœur du camp. Sans lui, la partie s'effondre.",
    'king-playstation-desc': "Souverain de la PlayStation, ce roi porte l'héritage des grands exclusifs Sony. Calme et déterminé, il incarne l'aventure et la narration. Sa chute scelle la défaite.",
    'king-sega-desc': "Roi de SEGA, il symbolise l'audace arcade et le bleu électrique de la Dreamcast. Fier et un brin provocateur, il rallie Sonic et ses camarades. Le perdre, c'est tout perdre.",
    'king-xbox-desc': "Chef de file Xbox, ce roi représente la puissance et les mondes ouverts de Microsoft. Solide comme une console de salon, il ancre sa faction. Sa capture termine le duel.",
    'link-desc': "Héros élu d'Hyrule, Link porte l'Épée de Légende et le courage de la Triforce. Silencieux mais infatigable, il affronte Ganon encore et encore. Bouclier au bras, il ne recule jamais. Bouclier d'Hyrule : 20 % de chance de bloquer une attaque. Secondaire Flèche héroïque : tire en ortho à distance 3 sans se déplacer (1 fois / 3 tours).",
    'mario-desc': "Plombier moustachu de Brooklyn devenu sauveur du Royaume Champignon. Toujours prêt à écraser un Goomba d'un saut, il collectionne les étoiles et les princesses. C'est l'icône même de Nintendo.",
    'zelda-desc': "Princesse d'Hyrule et incarnation de la Sagesse. Entre magie, diplomatie et parfois déguisement Sheik, elle guide Link vers le destin du royaume. Sa présence rayonne sur le champ de bataille.",
    'bowser-desc': "Roi des Koopas, dragon-tortue à la carapace pointue et à l'ego démesuré. Ennemi juré de Mario, il kidnappe Peach… puis revient toujours plus fort. Sa flamme et ses Koopalings font trembler le royaume. Koopalings : invoque l'un des 7 Koopalings (déplacement de pion) sur une case voisine ; 1 invocation par Koopaling (7 max), consomme le tour.",
    'ganondorf-desc': "Roi des Gerudos et incarnation du Pouvoir. Traître, manipulateur et presque immortel, il poursuit la Triforce à travers les âges. Face à lui, Hyrule brûle.",
    'samus-desc': "Chasseuse de primes galactique sous l'armure Power Suit. Survivante de la colonie K-2L, elle traque les Metroids pour la Fédération. Glaciale, précise, légendaire.",
    'pit-desc': "Ange gardien de Palutena, archer céleste au cœur d'or. Même sans ailes permanentes, il plonge dans la mêlée pour Angel Land. « Quoi ?! » est son cri de guerre favori.",
    'palutena-desc': "Déesse de la Lumière qui protège les humains depuis les cieux. Élgante, sarcastique et toute-puissante, elle guide Pit… quand elle n'est pas piégée. Sa magie verte illumine le chaos.",
    'sheik-desc': "Ombre agile d'Hyrule, maître du ninjutsu sheikah. Voix grave, harpe et kunai : une identité secrète pour survivre à Ganondorf. Rapidité et mystère font sa force.",
    'wario-desc': "Rival cupide de Mario, obsédé par l'or et les gadgets foireux. Gros, fort, et fier de son gaz… il lance WarioWare entre deux coups bas. L'anti-héros jaune et violet par excellence.",
    'duo-duck-hunt-desc': "Le chien moqueur et le canard fuyard du classique NES. Ensemble, ils rappellent l'âge d'or du zapper. Un duo improbablement efficace… et un peu provocateur.",
    'wii-fit-trainer-desc': "Coach sportif de Wii Fit, toujours prêt à corriger votre posture. Sourire encourageant, routine yoga et motivation douce. Sur le plateau, l'équilibre devient une arme.",
    'luigi-desc': "Frère cadet de Mario, un peu peureux mais ultra talentueux. Fantômes, mansions et sauts précis : il brille quand on lui laisse la lumière. Vert de timidité, vert de victoire.",
    'peach-desc': "Princesse du Royaume Champignon, aussi diplomate que redoutable. Parapluie, flottement et charme royal masquent une vraie combattante. Mario court… et elle se bat aussi.",
    'kirby-desc': "Petite boule rose de Pop Star, gourmande et indestructible. Il aspire tout — ennemis, pouvoirs, goûter — avec un sourire innocent. Sous ses joues rondes se cache une force cosmique. Aspiration : se déplace comme la dernière pièce ennemie capturée (départ : mouvement de cavalier).",

    // Expanded Nintendo roster
    'link': "Link",
    'link-desc': "Héros élu d'Hyrule, Link porte l'Épée de Légende et le courage de la Triforce. Silencieux mais infatigable, il affronte Ganon encore et encore. Bouclier au bras, il ne recule jamais. Bouclier d'Hyrule : 20 % de chance de bloquer une attaque. Secondaire Flèche héroïque : tire en ortho à distance 3 sans se déplacer (1 fois / 3 tours).",
    'mario': "Mario",
    'mario-desc': "Plombier moustachu de Brooklyn devenu sauveur du Royaume Champignon. Toujours prêt à écraser un Goomba d'un saut, il collectionne les étoiles et les princesses. C'est l'icône même de Nintendo.",
    'zelda': "Zelda",
    'zelda-desc': "Princesse d'Hyrule et incarnation de la Sagesse. Entre magie, diplomatie et parfois déguisement Sheik, elle guide Link vers le destin du royaume. Sa présence rayonne sur le champ de bataille.",
    'bowser': "Bowser",
    'bowser-desc': "Roi des Koopas, dragon-tortue à la carapace pointue et à l'ego démesuré. Ennemi juré de Mario, il kidnappe Peach… puis revient toujours plus fort. Sa flamme et ses Koopalings font trembler le royaume. Koopalings : invoque l'un des 7 Koopalings (déplacement de pion) sur une case voisine ; 1 invocation par Koopaling (7 max), consomme le tour.",
    'ganondorf': "Ganondorf",
    'ganondorf-desc': "Roi des Gerudos et incarnation du Pouvoir. Traître, manipulateur et presque immortel, il poursuit la Triforce à travers les âges. Face à lui, Hyrule brûle.",
    'samus': "Samus",
    'samus-desc': "Chasseuse de primes galactique sous l'armure Power Suit. Survivante de la colonie K-2L, elle traque les Metroids pour la Fédération. Glaciale, précise, légendaire.",
    'pit': "Pit",
    'pit-desc': "Ange gardien de Palutena, archer céleste au cœur d'or. Même sans ailes permanentes, il plonge dans la mêlée pour Angel Land. « Quoi ?! » est son cri de guerre favori.",
    'palutena': "Palutena",
    'palutena-desc': "Déesse de la Lumière qui protège les humains depuis les cieux. Élgante, sarcastique et toute-puissante, elle guide Pit… quand elle n'est pas piégée. Sa magie verte illumine le chaos.",
    'sheik': "Sheik",
    'sheik-desc': "Ombre agile d'Hyrule, maître du ninjutsu sheikah. Voix grave, harpe et kunai : une identité secrète pour survivre à Ganondorf. Rapidité et mystère font sa force.",
    'wario': "Wario",
    'wario-desc': "Rival cupide de Mario, obsédé par l'or et les gadgets foireux. Gros, fort, et fier de son gaz… il lance WarioWare entre deux coups bas. L'anti-héros jaune et violet par excellence.",
    'duo-duck-hunt': "Duo Duck Hunt",
    'duo-duck-hunt-desc': "Le chien moqueur et le canard fuyard du classique NES. Ensemble, ils rappellent l'âge d'or du zapper. Un duo improbablement efficace… et un peu provocateur.",
    'wii-fit-trainer': "Wii Fit Trainer",
    'wii-fit-trainer-desc': "Coach sportif de Wii Fit, toujours prêt à corriger votre posture. Sourire encourageant, routine yoga et motivation douce. Sur le plateau, l'équilibre devient une arme.",
    'luigi': "Luigi",
    'luigi-desc': "Frère cadet de Mario, un peu peureux mais ultra talentueux. Fantômes, mansions et sauts précis : il brille quand on lui laisse la lumière. Vert de timidité, vert de victoire.",
    'peach': "Peach",
    'peach-desc': "Princesse du Royaume Champignon, aussi diplomate que redoutable. Parapluie, flottement et charme royal masquent une vraie combattante. Mario court… et elle se bat aussi.",
    'kirby': "Kirby",
    'kirby-desc': "Petite boule rose de Pop Star, gourmande et indestructible. Il aspire tout — ennemis, pouvoirs, goûter — avec un sourire innocent. Sous ses joues rondes se cache une force cosmique. Aspiration : se déplace comme la dernière pièce ennemie capturée (départ : mouvement de cavalier).",
    'king-k-rool': "King K. Rool",
    'king-k-rool-desc': "Souverain crocodile des Kremlings, ennemi de Donkey Kong. Couronne bancale, ventre proéminent et plans de conquête ridicules… mais dangereux. Il veut les bananes, et le trône.",
    'waluigi': "Waluigi",
    'waluigi-desc': "Complice filiforme de Wario, jaloux de Luigi jusqu'au bout des moustaches. Spécialiste des sports, des coups tordus et du cri « Wah ! ». Le plus grand second rôle du Royaume Champignon.",
    'captain-falcon': "Captain Falcon",
    'captain-falcon-desc': "Pilote de F-Zero et chasseur de primes de Mute City. Casque bleu, Coup de poing Falcon et accélérations folles : la vitesse est sa religion. « Montre-moi ce que tu sais faire ! »",
    'bayonetta': "Bayonetta",
    'bayonetta-desc': "Sorcière Umbra élégante et impitoyable, maîtresse du Witch Time. Cheveux, armes à feu et talons aiguilles : elle danse avec les anges. Style, puissance et un clin d'œil fatal. Witch Time : après une capture, le prochain coup adverse adjacent est ralenti — cette pièce peut immédiatement se replacer d'1 case.",
    'ayo-oli': "Agent 3 & Agent 8",
    'ayo-oli-desc': "Les céphalopes stars de Splatoon, maîtres du Calamari Inkantation. Ayo mène, Oli suit… ou l'inverse, selon le refrain. Leur musique change même le monde.",
    'daisy': "Daisy",
    'daisy-desc': "Princesse de Sarasaland, énergique et compétitive. Moins « damsel », plus « sports star », elle rivalise avec Peach en panache. Jaune vif, attitude rock.",
    'lucina': "Lucina",
    'lucina-desc': "Princesse d'Ylisse venue du futur pour empêcher la catastrophe. Masquée en « Marth », elle brandit Falchion avec une détermination froide. L'espoir d'un monde brisé.",
    'lyn': "Lyn",
    'lyn-desc': "Épéiste du peuple des plaines dans Fire Emblem. Libre, fière et rapide comme le vent, elle défend les siens sans faiblir. Sa lame danse avant même que l'ennemi ne cligne.",
    'pyra-mythra': "Pyra & Mythra",
    'pyra-mythra-desc': "Les deux Aegis liées à Rex dans Xenoblade Chronicles 2. Feu et lumière, douceur et tranchant : une même âme, deux personnalités. Ensemble, elles tranchent le destin.",
    'marie': "Callie",
    'marie-desc': "Cousine calme du duo Calamar dans Splatoon. Voix grave, regard laconique et punchlines sèches. Quand elle chante, les Inklings suivent.",
    'min-min': "Min Min",
    'min-min-desc': "Combattante de Springtron à Ramen Bowl dans ARMS. Ses dragons extensibles frappent de loin avec un sourire de chef. Nouilles, style et allonge.",
    'samus-sans-armure': "Zero Suit Samus",
    'samus-sans-armure-desc': "Samus Aran sans Power Suit : juste la Zero Suit et son pistolet de poing. Agile, exposée, mais toujours la chasseuse la plus redoutable. La légende sous l'armure.",
    'perle-et-coralie': "Pearl & Marina",
    'perle-et-coralie-desc': "Duo de pop idols Off the Hook dans Splatoon 2. Perle hurle, Coralie groove : contraste parfait. Leur show illumine Inkopolis.",
    'krystal': "Krystal",
    'krystal-desc': "Guerrière cerulean de Star Fox, télépathe et juste. Exilée puis alliée de l'équipe, elle combat pour la paix galactique. Staff en main, intuition au cœur.",
    'fox-mccloud': "Fox McCloud",
    'fox-mccloud-desc': "Leader de Star Fox, renard pilote de l'Arwing. Père disparu, équipe loyale, blaster prêt : il défend le système Lylat. Tonneau recommandé !",
    'falco-lombardi': "Falco Lombardi",
    'falco-lombardi-desc': "Ace acerbe de Star Fox, oiseau de proie à l'ego affirmé. Moins diplomate que Fox, plus direct en dogfight. Solo ou en formation, il pique.",
    'wolf-o-donnell': "Wolf O'Donnell",
    'wolf-o-donnell-desc': "Rival de Fox à la tête de Star Wolf. Cicatrice, cynisme et respect grudging pour McCloud. L'ombre noire du système Lylat.",
    'marth': "Marth",
    'marth-desc': "Prince d'Altea, premier héros de Fire Emblem. Falchion à la main, il unit les continent contre le dragon sombre. Élégance et leadership incarnés.",
    'roy': "Roy",
    'roy-desc': "Jeune lord de Pherae dans Fire Emblem. Idéaliste, courageux, encore un peu vert… mais destiné à forger la paix. Son épée brûle d'ambition.",
    'yoshi': "Yoshi",
    'yoshi-desc': "Dinosaure fidèle du Royaume Champignon, gourmand et bondissant. Langue collante, œufs projectiles et monture de Mario : un allié indispensable. Vert (ou rose, ou bleu…) de bonheur. Langue élastique : attire une pièce ennemie à 1 case et la dépose juste derrière Yoshi.",
    'little-mac': "Little Mac",
    'little-mac-desc': "Boxeur de Brooklyn entraîné par Doc Louis. Petit gabarit, uppercuts monstrueux : du ring Punch-Out!! au sommet. Un vrai cœur de champion.",
    'dixie-kong': "Dixie Kong",
    'dixie-kong-desc': "Cousine blonde de Donkey Kong, queue en natte propulsive. Avec Diddy, elle sauve les îles et les bananes. Charme, rythme et acrobaties.",
    'ribbon-girl': "Ribbon Girl",
    'ribbon-girl-desc': "Star d'ARMS venue d'Ribbonane, fan des rubans extensibles. Populaire, rythmée, elle transforme le ring en scène. Ses coups ont du style.",
    'springman': "Spring Man",
    'springman-desc': "Héros musclé d'ARMS à Springtron. Bras ressorts, énergie débordante et fair-play. Il veut juste le meilleur combat possible.",
    'rex': "Rex",
    'rex-desc': "Jeune Driver de Xenoblade Chronicles 2, rêveur de l'Elysium. Lié à Pyra et Mythra, il grandit au fil des lames. Cœur d'or, ambition d'acier.",
    'james-mccloud': "James McCloud",
    'james-mccloud-desc': "Légendaire père de Fox, pilote mythique de Star Fox. Disparu… ou pas, selon les rumeurs du Lylat. Son héritage guide encore l'équipe.",
    'ice-climbers': "Ice Climbers",
    'ice-climbers-desc': "Popo et Nana, duo de grimpeurs du classique Ice Climber. Marteaux, glaciers et coordination parfaite. Ensemble, ils escaladent l'impossible.",
    'ike': "Ike",
    'ike-desc': "Mercenaire de Fire Emblem : Path of Radiance. Fils de Greil, lame lourde, idéal de justice brute. Il parle peu, frappe fort.",
    'roi-dadidou': "King Dedede",
    'roi-dadidou-desc': "Souverain dodu de Dream Land, rival/ami de Kirby. Martelo en main, il veut le trône… et un bon festin. Méchant le lundi, allié le mardi.",
    'ridley': "Ridley",
    'ridley-desc': "Dragon spatial sadique, archi-ennemi de Samus. Intelligent, cruel, indestructible en apparence. Chaque rencontre laisse une cicatrice.",
    'general-pepper': "General Pepper",
    'general-pepper-desc': "Commandant des forces de Corneria dans Star Fox. Moustache, cigare et ordres secs depuis le QG. Il envoie Star Fox au feu… pour la paix.",
    'ness': "Ness",
    'ness-desc': "Garçon de Onett doté de pouvoirs PSI dans EarthBound. Baseball bat, yo-yo et courage face à Giygas. L'aventure commence dans sa banlieue.",
    'lucas': "Lucas",
    'lucas-desc': "Enfant sensible de Tazmily dans Mother 3. PK Love et détermination après la tragédie. Douceur qui peut faire basculer le monde.",
    'captain-olimar': "Captain Olimar",
    'captain-olimar-desc': "Astronaute Hocotate Freight, père des Pikmin. Petit, méthodique, souvent en retard de loyer. Ses Pikmin sont sa plus grande force.",
    'tom-nook': "Tom Nook",
    'tom-nook-desc': "Tanuki entrepreneur d'Animal Crossing. Sourire commercial, prêts immobiliers et… gentillesse calculée. Bienvenue à la ville — signe ici.",
    'mewtwo': "Mewtwo",
    'mewtwo-desc': "Pokémon légendaire créé par l'homme à partir de Mew. Pouvoir psychique absolu, crise existentielle incluse. « Qui suis-je ? » devient une arme. Psyko : une fois par 3 tours, échange sa position avec une pièce alliée dans un rayon de 2 cases.",
    'mr-game-and-watch': "Mr. Game & Watch",
    'mr-game-and-watch-desc': "Héros plat et pixelisé des LCD Game & Watch. Silhouette noire, occupations absurdes, nostalgie pure. Il est littéralement un jeu portable. Affichage LCD : chaque tour, 1 chance sur 9 de se comporter comme une dame ; sinon comme un fou.",
    'toad': "Toad",
    'toad-desc': "Fidèle Champignon du château de Peach. Courageux malgré sa taille, il guide, informe et panique avec le sourire. « Excusez-moi, Princess ! »",
    'bowser-junior': "Bowser Jr.",
    'bowser-junior-desc': "Héritier turbulent de Bowser, pinceau Magikoopa à la main. Shadow Mario, karts et caprices de prince. Petit, mais déjà une menace.",
    'villageois': "Villager",
    'villageois-desc': "Habitant personnalisable d'Animal Crossing. Hache, filet, canne… et une vie paisible. Ici, même la guerre a un air de dimanche.",
    'rondoudou': "Jigglypuff",
    'rondoudou-desc': "Pokémon Normal/Fée au chant mortel : Berceuse. Mignon, rebondissant, et capable d'endormir tout un stade. Ne sous-estimez jamais ses yeux.",
    'peppy-hare': "Peppy Hare",
    'peppy-hare-desc': "Vétéran lapin de Star Fox, mentor de Fox. Conseils sages, « barrel roll » immortalisé, loyauté sans faille. L'âme de l'équipe.",
    'slippy-toad': "Slippy Toad",
    'slippy-toad-desc': "Ingénieur crapaud de Star Fox, parfois maladroit en dogfight. Génial en labo, fragile en cockpit. Sans lui, pas d'Arwing tuné.",
    'helix': "Helix",
    'helix-desc': "Combattant mystérieux d'ARMS aux bras hélicoïdaux. Style fluide, frappe tournoyante, présence énigmatique. Il déroule le combat.",
    'hero-ring-fit-adventure': "Ring Fit Hero",
    'hero-ring-fit-adventure-desc': "Aventurier sportif de Ring Fit Adventure. Squats, yoga et dragons : la forme physique sauve le monde. Respirez… puis chargez.",
    'fille-inkling': "Inkling Girl",
    'fille-inkling-desc': "Jeune Inkling prête à encrer le turf dans Splatoon. Transformable en calamar, arme à encre et style street. La couleur, c'est la vie.",
    'vlad': "Vlad",
    'vlad-desc': "Noble vampire d'ARMS, bras cape et allure gothique. Théâtral, puissant, un brin dramatique. La nuit lui appartient sur le ring.",
    'the-legend-of-zelda': "The Legend of Zelda",
    'super-mario': "Super Mario",
    'metroid': "Metroid",
    'kid-icarus': "Kid Icarus",
    'duck-hunt': "Duck Hunt",
    'wii-fit': "Wii Fit",
    'kirby': "Kirby",
    'donkey-kong': "Donkey Kong",
    'f-zero': "F-Zero",
    'bayonetta': "Bayonetta",
    'splatoon': "Splatoon",
    'fire-emblem': "Fire Emblem",
    'xenoblade-chronicles': "Xenoblade Chronicles",
    'arms': "ARMS",
    'star-fox': "Star Fox",
    'yoshi': "Yoshi",
    'punch-out': "Punch-Out!!",
    'ice-climber': "Ice Climber",
    'earthbound': "EarthBound",
    'pikmin': "Pikmin",
    'animal-crossing': "Animal Crossing",
    'pok-mon': "Pokémon",
    'game-watch': "Game & Watch",
    'ring-fit-adventure': "Ring Fit Adventure",
    
    // Piece universes
    'nintendo-universe': 'Nintendo',
    'playstation-universe': 'PlayStation',
    'sega-universe': 'SEGA',
    'xbox-universe': 'Xbox',
    'super-mario': 'Super Mario',
    'legend-of-zelda': 'The Legend of Zelda',
    'metroid': 'Metroid',
    'kid-icarus': 'Kid Icarus',
    'sonic': 'Sonic',
    'streets-of-rage': 'Streets of Rage',
    'halo': 'Halo',
    'gears-of-war': 'Gears of War',
    
    // Advertisements
    'advertisements': 'Advertisements',
    'ad-1': 'Ad 1',
    'ad-2': 'Ad 2',
    'ad-update': 'Updates every 5 actions',
    
    // Languages
    'language': 'Language',
    'french': 'Français',
    'english': 'English',
    'spanish': 'Español',
    'german': 'Deutsch',
    'portuguese': 'Português',
    
    // Nouvelles traductions pour tous les personnages
    'king-k-rool': 'King K. Rool',
    'king-k-rool-desc': "Souverain crocodile des Kremlings, ennemi de Donkey Kong. Couronne bancale, ventre proéminent et plans de conquête ridicules… mais dangereux. Il veut les bananes, et le trône.",
    'waluigi': 'Waluigi',
    'waluigi-desc': "Complice filiforme de Wario, jaloux de Luigi jusqu'au bout des moustaches. Spécialiste des sports, des coups tordus et du cri « Wah ! ». Le plus grand second rôle du Royaume Champignon.",
    'captain-falcon': 'Captain Falcon',
    'captain-falcon-desc': "Pilote de F-Zero et chasseur de primes de Mute City. Casque bleu, Coup de poing Falcon et accélérations folles : la vitesse est sa religion. « Montre-moi ce que tu sais faire ! »",
    'bayonetta': 'Bayonetta',
    'bayonetta-desc': "Sorcière Umbra élégante et impitoyable, maîtresse du Witch Time. Cheveux, armes à feu et talons aiguilles : elle danse avec les anges. Style, puissance et un clin d'œil fatal. Witch Time : après une capture, le prochain coup adverse adjacent est ralenti — cette pièce peut immédiatement se replacer d'1 case.",
    'banjo-kazooie': 'Banjo & Kazooie',
    'banjo-kazooie-desc': "Ours gentil et oiseau moqueur du Isle o' Hags. Banjo porte, Kazooie pique : le duo Rareware culte des collectathons. Jiggy ou pas, l'aventure reste joyeuse.",
    'ayo-oli': 'Ayo & Oli',
    'ayo-oli-desc': "Les céphalopes stars de Splatoon, maîtres du Calamari Inkantation. Ayo mène, Oli suit… ou l'inverse, selon le refrain. Leur musique change même le monde.",
    
    // PlayStation
    'astro-bot': 'Astro Bot',
    'astro-bot-desc': "Petit robot mignon d'Astro's Playroom et Astro Bot. Hommage vivant au catalogue PlayStation, sauts et gadgets inclus. La mascotte du DualSense.",
    'aloy': 'Aloy',
    'aloy-desc': "Chasseuse Nora de Horizon, clone d'Elisabet Sobeck. Arc, machines dinosaures et vérité sur le Faro Plague. Rouge de cheveux, d'acier de volonté.",
    'sackboy': 'Sackboy',
    'sackboy-desc': "Poupée de tissu créative de LittleBigPlanet. Personnalisable à l'infini, joyeux et collant (au sens craft). Votre imagination est son monde.",
    'jak': 'Jak',
    'jak-desc': "Héros d'Haven City dans Jak and Daxter. Éco, Dark, Light : l'énergie le transforme autant que l'aventure. Silence d'origine, puissance acquise. Éco sombre : après un déplacement, peut marquer une case voisine (interdit aux ennemis 1 tour).",
    'daxter': 'Daxter',
    'daxter-desc': "Ottsel moqueur, meilleur ami (et ex-humain) de Jak. Blagues, lâcheté stratégique et fidélité absolue. Le commentaire audio de l'épopée.",
    'kat': 'Kat',
    'kat-desc': "Héroïne de Gravity Rush capable de manipuler la gravité. Chapeau, chat Dust et chute contrôlée : elle redéfinit « tomber ». Élégance en apesanteur.",
    'parappa': 'Parappa',
    'parappa-desc': "Chien rappeur de Parappa the Rapper. « Je dois y croire ! » : rythme, école et confiance en soi. Appuie sur les touches, trouve le flow.",
    'sam-porter-bridges': 'Sam Porter Bridges',
    'sam-porter-bridges-desc': "Livreur de Death Stranding, reconnecteur de l'Amérique. BB, sang et randonnée apocalyptique. Chaque colis est un lien humain.",
    'ico': 'Ico',
    'ico-desc': "Garçon cornu d'ICO, guide d'Yorda dans le château. Silence, lumière et pureté du gameplay Team Ico. Protéger, c'est progresser.",
    
    // SEGA
    'ryo': 'Ryo',
    'ryo-desc': "Justicier des rues dans Streets of Rage (Bare Knuckle). Poings, alliés et synthwave : il nettoie la ville. La rage, version SEGA.",
    'joe-musashi': 'Joe Musashi',
    'joe-musashi-desc': "Ninja de Shinobi au service de l'honneur. Shurikens, lame et missions impossibles. L'ombre qui tranche le crime.",
    'tails': 'Tails',
    'tails-desc': "Miles « Tails » Prower, renard à deux queues et génie inventeur. Il vole, bricole et soutient Sonic sans jamais se vanter. Le meilleur acolyte bleu et orange. Vol de soutien : transporte une pièce alliée adjacente d'1 case vers l'avant.",
    'dr-robotnik': 'Dr. Robotnik',
    'dr-robotnik-desc': "Dr. Ivo Robotnik, alias Eggman : génie mégalomane à moustache. Badniks, Death Egg et rires gras contre Sonic. Ce hérisson le met hors de lui ! Robot Capsule : secondaire qui place un petit robot pion neutre sur une case vide voisine (bloque 1 tour).",
    'blaze-fielding': 'Blaze Fielding',
    'blaze-fielding-desc': "Enquêtrice et combattante de Streets of Rage. Coups de pied précis, justice urbaine, style affirmé. Elle ne laisse aucun gang tranquille.",
    'axel-stone': 'Axel Stone',
    'axel-stone-desc': "Brawler emblématique de Streets of Rage. Blouson, uppercut et loyauté envers ses potes. Le poing qui remet la ville d'aplomb.",
    'adam-hunter': 'Adam Hunter',
    'adam-hunter-desc': "Flic musclé de Streets of Rage, frère de Blaze selon les opus. Puissance brute et sens du devoir. Quand ça chauffe, il entre.",
    'hatsune-miku': 'Hatsune Miku',
    'hatsune-miku-desc': "Vocaloid turquoise aux couettes légendaires. Idole virtuelle, concerts hologrammes et hits planétaires. La voix que tout le monde connaît.",
    'sakura-shinguji': 'Sakura Shinguji',
    'sakura-shinguji-desc': "Héroïne de Sakura Wars, membre de la Flower Division. Katana, théâtre et mechas à vapeur. Doux sourire, frappe décisive.",
    'vyse': 'Vyse',
    'vyse-desc': "Pirate du ciel de Skies of Arcadia. Grand bleu, ambition plus grande encore : découvrir les confins. L'aventure a un rire.",
    'aika': 'Aika',
    'aika-desc': "Navigatrice fidèle de Vyse dans Skies of Arcadia. Esprit vif, courage et cœur sur la main. Sans elle, le Delphinus dérive.",
    'amigo': 'Amigo',
    'amigo-desc': "Singe maracas de Samba de Amigo. Rythme latino, sourire large, fête permanente. Secoue au tempo… ou rate le groove.",
    'ecco-dolphin': 'Ecco the Dolphin',
    'ecco-dolphin-desc': "Dauphin d'Ecco the Dolphin, sauveur des océans temporels. Sonar, mystère et voyage à travers les ères. La mer chante avec lui. Sonar mystique : secondaire qui repousse une pièce de 2 cases vers l'arrière.",
    'pilote-hang-on': 'Hang-On Pilot',
    'pilote-hang-on-desc': "Motard anonyme du classique arcade Hang-On. Virages inclinés, asphalte et adrénaline Yu Suzuki. Le corps devient le guidon.",
    'dj-professeur-k': 'DJ Professor K',
    'dj-professeur-k-desc': "Voix pirate de Jet Set Radio / Jet Grind Radio. Groove, graffiti et liberté urbaine contre la censure. Monte le son !",
    'ulala': 'Ulala',
    'ulala-desc': "Reporter de Space Channel 5, danseuse d'actualité. Micro, rayons aliens et chorégraphies sauvent la galaxie. « Chu chu ! » Groove laser : secondaire qui contrôle temporairement une pièce ennemie adjacente pendant 1 tour.",
    'la-fille': 'The Girl',
    'la-fille-desc': "Héroïne enigmatic de Feel the Magic: XY/XX. Émotions, mini-jeux et romance absurde SEGA. Faire sourire devient une quête.",
    'le-joueur': 'The Player',
    'le-joueur-desc': "Avatar du joueur dans Feel the Magic: XY/XX. Gestes, défis et maladresse touchante pour conquérir un cœur. Vous êtes le héros… littéralement.",
    'zombie': 'Zombie',
    'zombie-desc': "Mort-vivant classique de The House of the Dead. Lent, nombreux, affamé de cerveaux de tireurs arcade. Visez la tête !",
    'chupea': 'Chupea',
    'chupea-desc': "Souris colorée de ChuChu Rocket!. Rapide, mignonne, toujours à un tunnel d'une catastrophe. Direction : la fusée !",
    'chubach': 'Chubach',
    'chubach-desc': "Autre ChuChu de la meute Rocket. Instinct de groupe et panique organisée. Ensemble, ils remplissent la soucoupe.",
    'chuih': 'Chuih',
    'chuih-desc': "Petit rongeur de ChuChu Rocket!, prêt à foncer au mauvais moment. Chaos adorable garanti. Suivez les flèches… ou pas.",

    // Expanded SEGA roster
    'clarissa': "Clarissa",
    'clarissa-desc': "Passagère emblématique d'OutRun / OutRun 2. Cheveux au vent, cabriolet rouge, road trip mythique. La destination, c'est le style.",
    'tyris-flare': "Tyris Flare",
    'tyris-flare-desc': "Amazone magicienne de Golden Axe. Feu, beauté guerrière et vengeance contre Death Adder. La flamme du sud.",
    'gena': "Gena",
    'gena-desc': "Personnage de Jet Set Radio, skateur/graffeur selon les versions. Attitude street et liberté sur les rails. L'encre contre le système.",
    'billy-hatcher': "Billy Hatcher",
    'billy-hatcher-desc': "Garçon au costume de poulet de Billy Hatcher and the Giant Egg. Roule des œufs géants pour sauver le matin. Cocorico héroïque.",
    'ax-battler': "Ax Battler",
    'ax-battler-desc': "Barbare à la hache de Golden Axe. Force brute, montures et cris de guerre. Quand Ax frappe, la terre tremble.",
    'bd-joe': "B.D. Joe",
    'bd-joe-desc': "Chauffeur charismatique de Crazy Taxi. Courses folles, pourboires records et style déjanté. Le volant est sa scène.",
    'mec-space-harrier': "Space Harrier Pilot",
    'mec-space-harrier-desc': "Pilote du shoot arcade Space Harrier. Bienvenue dans la Fantasy Zone : vitesse folle et sprites géants. L'espace défile sous vos yeux.",
    'taro-sega-boy': "Taro Sega Boy",
    'taro-sega-boy-desc': "Mascotte garçon SEGA, visage amical de la marque. Esprit arcade, nostalgie et bleu signature. Il porte le logo dans le cœur.",
    'taro-sega-girl': "Taro Sega Girl",
    'taro-sega-girl-desc': "Mascotte fille SEGA, énergie et sourire commercial vintage. Elle rappelle les bornes, les notices et la Dreamcast. Vive l'équipe SEGA !",
    'death-adder': "Death Adder",
    'death-adder-desc': "Tyran final de Golden Axe, usurpateur couronné. Magie noire, armée et arrogance absolue. Les héros existent pour le renverser.",
    'gilius-thunderhead': "Gilius Thunderhead",
    'gilius-thunderhead-desc': "Nain magicien de Golden Axe, sage et râleur. Foudre, hache et expérience des batailles. Petit gabarit, grand orage.",
    'aiai': "AiAi",
    'aiai-desc': "Singe de Super Monkey Ball, toujours dans sa sphère. Labyrinthes, bananas et chutes comiques. Restez dans la boule !",
    'puyo-puyo': "Puyo Puyo",
    'puyo-puyo-desc': "Gelée colorée du puzzle Puyo Puyo. Empile, aligne, fais disparaître… et envoie le combo. Mignon jusqu'à l'explosion.",
    'alberto': "Alberto",
    'alberto-desc': "Figure amicale de la galaxie SEGA, toujours prêt à en découdre avec le sourire. Esprit d'équipe et panache bleu électrique. Un visage qu'on n'oublie pas.",
    'gus': "Gus",
    'gus-desc': "Compère SEGA au caractère bien trempé et au moral d'acier. Loyal, direct, impossible à démonter. Quand Gus s'accroche, rien ne passe.",
    'mew-mew': "Mew Mew",
    'mew-mew-desc': "Petite créature SEGA au nom tout doux et à l'énergie espiègle. Expressive, imprévisible, redoutable quand on la sous-estime. Mignonneté stratégique garantie.",
    'axel': "Axel",
    'axel-desc': "Poing levé de Streets of Rage, cousin d'esprit d'Axel Stone. Blouson, uppercuts et nuits blanches contre les gangs. La rue n'attend personne.",
    'skies-of-arcadia': "Skies of Arcadia",
    'golden-axe': "Golden Axe",
    'jet-set-radio': "Jet Set Radio",
    'billy-hatcher': "Billy Hatcher",
    'crazy-taxi': "Crazy Taxi",
    'space-harrier': "Space Harrier",
    'super-monkey-ball': "Super Monkey Ball",
    'puyo-puyo': "Puyo Puyo",
    
    // Xbox
    'marcus-fenix': 'Marcus Fenix',
    'marcus-fenix-desc': "Sergent grognon de Gears of War. Lancer, baïonnette-tronçonneuse et fraternité COG. Les Locusts tremblent quand il charge.",
    'joanna-dark': 'Joanna Dark',
    'joanna-dark-desc': "Agent Carrington Institute dans Perfect Dark. Espionne du futur proche, armes expérimentales et missions sous couverture. Joanna voit dans le noir. Camouflage RCP-120 : avance de 4 cases en ligne droite (ortho uniquement). Double-clic avant de bouger pour devenir invisible 1 tour (semi-visible pour vous, invisible aux adversaires ; toujours capturable sur sa case).",
    'cortana': 'Cortana',
    'cortana-desc': "IA brillante liée au Master Chief dans Halo. Sarcasme, génie tactique et loyauté féroce. Plus qu'un logiciel : une partenaire.",
    'juno': 'Juno',
    'juno-desc': "Operatrice Halo au sang-froid militaire absolu. Coordination orbitale, briefings secs et soutien tactique. Quand elle parle, la flotte écoute.",
    'jd-fenix': 'JD Fenix',
    'jd-fenix-desc': "James Dominic Fenix, fils de Marcus dans Gears of War 4. Nouvelle génération, mêmes Locusts… et un père à convaincre. L'héritage pèse lourd.",
    'general-raam': 'General Raam',
    'general-raam-desc': "Général Locust mythique de Gears of War. Kryll autour de lui, lame immense, terreur incarnée. Les humains apprennent son nom dans le sang. Nuée de Kryll : les cases orthognales adjacentes bloquent les fuites ennemies tant qu'il reste immobile.",
    'cyclops-drone': 'Cyclops Drone',
    'cyclops-drone-desc': "Drone Locust cyclopéen, chair à canon technologique. Surveillance, essaims et pression constante. Un œil, mille menaces.",
    'ori': 'Ori',
    'ori-desc': "Esprit de lumière d'Ori and the Blind Forest / Will of the Wisps. Fragile, agile, bouleversant. La forêt chante sa renaissance.",
    'reaver': 'Reaver',
    'reaver-desc': "Pirate immortel de Fable, marchand d'ombres et de vices. Élégant, cynique, impossible à tuer longtemps. Le mal a du style. Pacte immortel : la première fois qu'il devrait être capturé, il réapparaît sur une case libre adjacente (1 fois / partie).",
    'senua': 'Senua',
    'senua-desc': "Guerrière pictish de Hellblade, confrontée à la psychose et aux dieux nordiques. Voix multiples, lame unique, courage absolu. Sa réalité est le champ de bataille. Focus : révèle et frappe une pièce ennemie dans un rayon de 2 cases si elle est isolée (sans allié adjacent), 1 fois / 3 tours.",
    'jago': 'Jago',
    'jago-desc': "Moine guerrier de Killer Instinct, hôte du Tiger Spirit. Katana, discipline et conflit intérieur. L'équilibre se gagne coup après coup.",
    'orchid': 'Orchid',
    'orchid-desc': "Espionne et combattante de Killer Instinct. Agilité, gadgets et charisme explosif. Elle frappe avant que vous ayez cligné.",
    'capitaine-flameheart': 'Captain Flameheart',
    'capitaine-flameheart-desc': "Pirate squelette légendaire de Sea of Thieves. Flotte maudite, rires de feu et quêtes épiques. La Mer des Larrons lui appartient.",
    'pirate': 'Pirate',
    'pirate-desc': "Corsaire de Sea of Thieves, soif d'or et de rhum. Alliances fragiles, trahisons joyeuses, tempêtes garanties. Yo-ho, yo-ho.",
    'rash': 'Rash',
    'rash-desc': "Battletoad vert, fouet de langue et attitude arcade. De Rareware à Xbox, il écrase les boss avec panache. Crapaud de choc, légende vivante.",
    'conker': 'Conker',
    'conker-desc': "Écureuil alcoolisé et cynique de Conker's Bad Fur Day. Humour noir, quêtes absurdes, portefeuille toujours vide. Réservé à un public averti.",
    'blinx': 'Blinx',
    'blinx-desc': "Chat manipulateur du temps dans Blinx: The Time Sweeper. Aspirateur temporel, paradoxes et souris à rattraper. Rembobinez le chaos.",
    'crash-bandicoot': 'Crash Bandicoot',
    'crash-bandicoot-desc': "Bandicoot mutant créé par Cortex, star des jeux de plates-formes. Vrille fulgurante, caisses TNT et cri de surprise signature. Marsupial, héroïque, indestructible.",
    'spyro': 'Spyro',
    'spyro-desc': "Jeune dragon violet des Dragon Realms. Vol, souffle de feu et attitude cool : il sauve les siens avec panache. Petite taille, grande flamme. Crachat de flamme : déplacement en triangle (2 cases devant + 2 latérales au bout). Secondaire Souffle de feu : brûle la case devant (interdite 1 tour).",
    'viva-pinata': 'Viva Piñata',
    'viva-pinata-desc': "Créature piñata de Viva Piñata, jardin et élevage colorés. Attirez, soignez, fêtez — sans trop secouer. Le jardin est un écosystème joyeux.",
    'joule-adams': 'Joule Adams',
    'joule-adams-desc': "Héroïne de ReCore, mécanicienne du desert de Far Eden. Frame companion et espoir terraforma. Elle répare le monde, pièce par pièce.",
    'steeve': 'Steeve',
    'steeve-desc': "Compagnon Core de Far Eden aux côtés de Joule Adams. Carcasse métallique, cœur fidèle, prêt pour le désert. Sans lui, la traversée serait solitaire.",
    'cooper': 'Cooper',
    'cooper-desc': "Héros chaotique de Sunset Overdrive. Armes absurdes, parkour et apocalypse amusante. Le soleil se couche, la fête commence.",
    'hornet': 'Hornet',
    'hornet-desc': "Agent d'élite plongé dans les fractures temporelles de Quantum Break. Missions tendues, réalités qui se fissurent, sang-froid obligatoire. Chaque seconde peut tout changer.",
    'shu': 'Shu',
    'shu-desc': "Survivant miniature de Grounded. Dans le jardin géant, une fourmi est un boss. Courage à l'échelle d'un brin d'herbe.",
    'lupus': 'Lupus',
    'lupus-desc': "Survivant de State of Decay, monde zombie sans filet. Base, communauté, choix durs. L'espoir se gère comme des ressources.",
    'moine': 'Monk',
    'moine-desc': "Figure spirituelle / survivante de State of Decay. Foi, calme et utilité au camp. Même l'apocalypse a besoin de silence.",
    'vela': 'Vela',
    'vela-desc': "Exploratrice Xbox au nom d'étoile, toujours tournée vers l'horizon. Curieuse, déterminée, lumière dans l'inconnu. Sa route s'écrit à chaque pas.",
    'nathan-drake-desc': "Chasseur de trésors charismatique d'Uncharted. Quips, escalade et malchance spectaculaire : Indiana Jones version PlayStation. Fortune et gloire… surtout des bleus.",
    'kratos-desc': "Ancien dieu de la guerre spartiate, désormais père en Midgard. Lames du Chaos, hache Léviathan et rage contenue. Un seul mot à son fils suffit parfois.",
    'sonic-desc': "Hérisson bleu le plus rapide du monde. Anneaux, loopings et attitude cool : il sauve les animaux du Dr Robotnik. La vitesse, c'est sa signature !",
    'master-chief-desc': "Spartan-117, légende silencieuse de Halo. Armure MJOLNIR, Cortana à l'oreille, Flood et Covenant en ligne de mire. Il termine toujours le combat. Bouclier d'énergie : secondaire qui ignore une capture une seule fois.",
    'pikachu-desc': "Pokémon Électrique emblématique, partenaire loyal de Sacha. Joues pétillantes, éclair foudroyant et cri mythique. La souris jaune qui a électrisé le monde. Éclair : frappe toutes les pièces adverses adjacentes situées sur des cases blanches, sans se déplacer (recharge 2 tours).",
    'link-ability': "Bouclier d'Hyrule : 20 % de chance de bloquer une attaque. Secondaire Flèche héroïque : tire en ortho à distance 3 sans se déplacer (1 fois / 3 tours).",
    'bowser-ability': "Koopalings : invoque l'un des 7 Koopalings (déplacement de pion) sur une case voisine ; 1 invocation par Koopaling (7 max), consomme le tour.",
    'kirby-ability': "Aspiration : se déplace comme la dernière pièce ennemie capturée (départ : mouvement de cavalier).",
    'bayonetta-ability': "Witch Time : après une capture, le prochain coup adverse adjacent est ralenti — cette pièce peut immédiatement se replacer d'1 case.",
    'yoshi-ability': "Langue élastique : attire une pièce ennemie à 1 case et la dépose juste derrière Yoshi.",
    'mewtwo-ability': "Psyko : une fois par 3 tours, échange sa position avec une pièce alliée dans un rayon de 2 cases.",
    'mr-game-and-watch-ability': "Affichage LCD : chaque tour, 1 chance sur 9 de se comporter comme une dame ; sinon comme un fou.",
    'jak-ability': "Éco sombre : après un déplacement, peut marquer une case voisine (interdit aux ennemis 1 tour).",
    'tails-ability': "Vol de soutien : transporte une pièce alliée adjacente d'1 case vers l'avant.",
    'dr-robotnik-ability': "Robot Capsule : secondaire qui place un petit robot pion neutre sur une case vide voisine (bloque 1 tour).",
    'ecco-dolphin-ability': "Sonar mystique : secondaire qui repousse une pièce de 2 cases vers l'arrière.",
    'ulala-ability': "Groove laser : secondaire qui contrôle temporairement une pièce ennemie adjacente pendant 1 tour.",
    'master-chief-ability': "Bouclier d'énergie : secondaire qui ignore une capture une seule fois.",
    'joanna-dark-ability': "Camouflage RCP-120 : avance de 4 cases en ligne droite (ortho uniquement). Double-clic avant de bouger pour devenir invisible 1 tour (semi-visible pour vous, invisible aux adversaires ; toujours capturable sur sa case).",
    'general-raam-ability': "Nuée de Kryll : les cases orthognales adjacentes bloquent les fuites ennemies tant qu'il reste immobile.",
    'reaver-ability': "Pacte immortel : la première fois qu'il devrait être capturé, il réapparaît sur une case libre adjacente (1 fois / partie).",
    'senua-ability': "Focus : révèle et frappe une pièce ennemie dans un rayon de 2 cases si elle est isolée (sans allié adjacent), 1 fois / 3 tours.",
    'spyro-ability': "Crachat de flamme : déplacement en triangle (2 cases devant + 2 latérales au bout). Secondaire Souffle de feu : brûle la case devant (interdite 1 tour).",
    'pikachu-ability': "Éclair : frappe toutes les pièces adverses adjacentes situées sur des cases blanches, sans se déplacer (recharge 2 tours).",
    'pikachu': "Pikachu",
    'larry-koopa': "Larry Koopa",
    'larry-koopa-desc': "Aîné malicieux des Koopalings, cheveux bleus et baguette magique. Dans New Super Mario Bros., il ouvre souvent le bal des châteaux. Sournois, agile… et très sûr de lui.",
    'morton-koopa': "Morton Koopa Jr.",
    'morton-koopa-desc': "Le plus massif des Koopalings, à la large étoile noire sur le museau. Il écrase le sol et charge sans subtilité. La force brute de la fratrie Koopa.",
    'wendy-koopa': "Wendy O. Koopa",
    'wendy-koopa-desc': "Seule fille des Koopalings, anneaux, nœud rose et attitude de diva. Elle combat avec style et n'aime pas qu'on lui marche sur les pieds. Princesse… à sa façon.",
    'iggy-koopa': "Iggy Koopa",
    'iggy-koopa-desc': "Le scientifique fou de la famille, cheveux en bataille et rire maniaque. Gadgets, potions et chaos calculé : Iggy adore expérimenter sur Mario. Brillant, instable, dangereux.",
    'roy-koopa': "Roy Koopa",
    'roy-koopa-desc': "Koopaling lunettes de soleil et carapace rose, du genre qui charge d'abord. Bagarreur et sûr de son effet, il impressionne autant qu'il intimide. Ne le confondez pas avec le lord de Fire Emblem.",
    'lemmy-koopa': "Lemmy Koopa",
    'lemmy-koopa-desc': "Le plus petit et le plus acrobatique, ballon d'équilibre et foulard à pois. Lemmy transforme chaque combat en numéro de cirque. Sous le spectacle, une vraie menace.",
    'ludwig-koopa': "Ludwig von Koopa",
    'ludwig-koopa-desc': "Cadet intellectuel et vaniteux, crinière bleue digne d'un compositeur. Ludwig se prend pour un génie — et ses sorts le prouvent souvent. L'orgueil des Koopalings personnifié."
  },
  
  es: {
    // Interfaz principal
    'game-title': 'Video Games Battle',
    'page-title': 'Chesstendo - Draft + Tablero',
    'tagline': '¡Olvida el ajedrez clásico, aquí los héroes de videojuegos hacen las reglas!',
    'select-players': 'Número de jugadores',
    'select-board-size': 'Tamaño del tablero',
    'start-game': 'Comenzar partida',
    'player': 'Jugador',
    'players': 'jugadores',
    'faction': 'Facción',
    'money': 'Puntos',
    'team': 'Equipo',
    'next-player': 'Siguiente jugador',
    'previous-player': 'Jugador anterior',
    'finish-selection': 'Terminar selección',
    'start-game-button': 'Iniciar partida',
    
    // Tamaños de tablero
    'board-small': '9x9 (Pequeño)',
    'board-medium': '11x11 (Mediano)',
    'board-large': '15x15 (Grande)',
    
    // Facciones
    'nintendo': 'Nintendo',
    'sega': 'SEGA',
    'playstation': 'PlayStation',
    'xbox': 'Xbox',
    
    // Reyes
    'king-nintendo': 'Rey Nintendo',
    'king-playstation': 'Rey PlayStation',
    'king-sega': 'Rey SEGA',
    'king-xbox': 'Rey Xbox',
    
    // Mensajes de juego
    'game-start': '¡Comienza la partida!',
    'your-turn': 'Tu turno',
    'player-turn': 'Turno del Jugador',
    'pieces-in-play': 'Piezas en juego',
    'rules': 'Reglas',
    'captured-pieces': 'Piezas capturadas',
    'items': 'Objetos',
    'timer': 'Cronómetro',
    
    // Acciones
    'move': 'Mover',
    'capture': 'Capturar',
    'use-item': 'Usar objeto',
    'end-turn': 'Terminar turno',
    'restart': 'Reiniciar',
    'quit': 'Salir',
    
    // Mensajes de error
    'invalid-move': 'Movimiento inválido',
    'not-your-turn': 'No es tu turno',
    'no-piece-selected': 'Ninguna pieza seleccionada',
    'cannot-move-there': 'No se puede mover ahí',
    
    // Objetos
    'bobomb': 'Bob-omb',
    'portals': 'Portales',
    'lightning': 'Rayo',
    'star': 'Estrella',
    'tetrimino': 'Tetrimino',
    'tornado': 'Tornado',
    'banana': 'Plátano',
    'phoenix': 'Pluma de Fénix',
    'cursor': 'Cursor Sims',
    'heart': 'Corazón',
    'sandglass': 'Reloj de Arena',
    'mask': 'Máscara de Majora',
    'ocarina': 'Ocarina del Tiempo',
    
    // Descripciones de objetos
    'bobomb-desc': '¡Bomba explosiva de Mario! Coloca una bomba en una casilla vacía que explotará el próximo turno.',
    'portals-desc': '¡Teletransportación instantánea! Crea dos portales conectados en el tablero.',
    'lightning-desc': '¡Rayo destructivo! Elimina instantáneamente una pieza de tu elección.',
    'star-desc': '¡Revelación mística! Revela todas las piezas ocultas en el tablero durante 3 turnos.',
    'tetrimino-desc': '¡Bloque de construcción! Coloca un muro Tetrimino en el tablero.',
    'tornado-desc': '¡Viento destructivo! Teletransporta una pieza a una posición aleatoria del tablero.',
    'banana-desc': '¡Trampa resbaladiza! Coloca un plátano en una casilla vacía que hará resbalar a la próxima pieza que aterrice ahí.',
    'phoenix-desc': '¡Renacimiento! Resucita una pieza perdida de tu facción.',
    'cursor-desc': '¡Control total! Toma el control de una pieza enemiga durante 1 turno.',
    'heart-desc': '¡Vida extra! Protege una pieza de la captura durante 2 turnos.',
    'sandglass-desc': '¡El tiempo del enemigo se desmorona! Reduce el cronómetro de todos los oponentes según el tamaño del tablero.',
    'mask-desc': '¡La máscara maldita de Termina! Fuerza a un oponente a jugar una pieza específica en su próximo turno.',
    'ocarina-desc': '¡El instrumento mágico de Hyrule! Transforma permanentemente una pieza en caballo (movimientos en L).',
    
    // Mensajes de objetos
    'item-used': 'Objeto usado',
    'item-charging': 'Objeto cargando',
    'select-target': 'Selecciona un objetivo',
    'select-position': 'Selecciona una posición',
    'not-activated': 'no activado',
    
    // Navegación
    'play': 'Jugar',
    'pieces': 'Piezas',
    'rules': 'Reglas',
    'items': 'Objetos',
    'credits': 'Créditos',
    'movements': 'Movimientos',
    'login': 'Iniciar sesión',
    
    // Páginas
    'available-pieces': 'Piezas Disponibles',
    'available-items': 'Objetos Disponibles',
    'game-rules': 'Reglas del Juego',
    'movement-demos': 'Demostraciones de Movimientos',
    'sort-by': 'Ordenar por',
    'strength': 'Rol',
    'role': 'Rol',
    'all-roles': 'Todos',
    'editor': 'Editor',
    'universe': 'Universo',
    'all': 'Todos',
    
    // Reglas del Juego
    'game-objective': 'Objetivo del Juego',
    'game-objective-desc': 'Video Games Battle es un juego de estrategia inspirado en el ajedrez donde los jugadores se enfrentan con personajes icónicos del universo de los videojuegos. El objetivo es capturar el rey adversario para eliminar al jugador y convertirse en el último superviviente.',
    'victory': 'Victoria',
    'victory-desc': 'Ser el último jugador vivo capturando todos los reyes adversarios o eliminando a todos los oponentes por tiempo agotado.',
    'piece-types': 'Roles',
    'king': 'Rey',
    'king-desc': 'Pieza más importante de cada jugador. Se mueve una casilla en todas las direcciones. Si tu rey es capturado, quedas eliminado de la partida.',
    'special-pieces': 'Piezas Especiales',
    'special-pieces-desc': 'Cada facción dispone de personajes únicos con movimientos y capacidades específicas:',
    'movements': 'Movimientos',
    'movements-desc': 'Cada pieza tiene sus propias reglas de movimiento definidas por:',
    'directions': 'Direcciones',
    'directions-desc': 'Casillas adyacentes accesibles',
    'range': 'Alcance',
    'range-desc': 'Número máximo de casillas en línea recta',
    'specialties': 'Especialidades',
    'specialties-desc': 'Capacidades únicas (salto, vuelo, etc.)',
    'object-system': 'Sistema de Objetos',
    'acquisition': 'Adquisición',
    'acquisition-desc': 'Los objetos aparecen aleatoriamente en el tablero en cajas. Cada jugador puede recoger un máximo de 3 en reserva.',
    'usage': 'Uso',
    'usage-desc': 'Solo se puede usar un objeto por turno. Los objetos tienen efectos variados:',
    'time-sand': 'Arena del Tiempo',
    'time-sand-desc': 'Reduce el tiempo de los adversarios',
    'majora-mask': 'Máscara de Majora',
    'majora-mask-desc': 'Fuerza a un adversario a jugar una pieza específica',
    'time-ocarina': 'Ocarina del Tiempo',
    'time-ocarina-desc': 'Transforma una pieza en caballo',
    'bomb': 'Bomba',
    'bomb-desc': 'Explota y daña las piezas adyacentes',
    'star': 'Estrella',
    'star-desc': 'Revela las piezas ocultas',
    'weight-desc': 'Cada objeto tiene un peso diferente que influye en la probabilidad de aparición. Cuanto mayor es el peso, más raro es el objeto.',
    
    // Reglas comunes de objetos
    'common-rules': 'Reglas comunes:',
    'common-rules-1': 'Cada jugador puede conservar hasta <strong>3 objetos</strong> en reserva.',
    'common-rules-2': 'Solo se puede usar <strong>un objeto por turno</strong>.',
    'common-rules-3': 'Los objetos aparecen aleatoriamente en cajas en el tablero.',
    'common-rules-4': 'El peso de un objeto determina su rareza (cuanto mayor es el peso, más raro es el objeto).',
    
    // Página de créditos
    'credits-title': 'CRÉDITOS',
    'legal-warning': 'ADVERTENCIA LEGAL',
    'fan-project': 'Este juego es un proyecto FAN sin ánimo de lucro',
    'fan-project-desc': 'Todos los personajes, franquicias y propiedades intelectuales pertenecen a sus respectivos propietarios.',
    'no-content-sale': 'Ningún contenido está a la venta',
    'completely-free': 'Todo el juego es 100% GRATIS',
    'fan-created': 'Este proyecto es creado por fans, para fans, sin propósito comercial.',
    'owner-of': 'Propietario de:',
    'nintendo-owner': 'The Legend of Zelda, Super Mario, y todas sus franquicias asociadas',
    'playstation-owner': 'PlayStation, Uncharted, God of War, Astro Bot y sus franquicias',
    'sega-owner': 'Sonic, Yakuza, Shinobi y sus franquicias asociadas',
    'xbox-owner': 'Xbox, Halo, Gears of War, Perfect Dark y sus franquicias',
    'nintendo-king': 'Rey Nintendo',
    'playstation-king': 'Rey PlayStation',
    'sega-king': 'Rey SEGA',
    'xbox-king': 'Rey Xbox',
    'nintendo-representative': 'Representante Nintendo',
    'playstation-representative': 'Representante PlayStation',
    'sega-representative': 'Representante SEGA',
    'xbox-representative': 'Representante Xbox',
    'nintendo-copyright': '© Nintendo. Todos los derechos reservados. Nintendo es una marca registrada de Nintendo Co., Ltd.',
    'playstation-copyright': '© Sony Interactive Entertainment. Todos los derechos reservados. PlayStation es una marca registrada de Sony Interactive Entertainment LLC.',
    'sega-copyright': '© SEGA Corporation. Todos los derechos reservados. SEGA es una marca registrada de SEGA Corporation.',
    'xbox-copyright': '© Microsoft Corporation. Todos los derechos reservados. Xbox es una marca registrada de Microsoft Corporation.',
    'other-properties': 'Otras Propiedades',
    'inspired-by': 'Objetos y elementos inspirados en:',
    'all-elements-inspired': 'Todos los elementos de juego están inspirados en juegos existentes y pertenecen a sus respectivos propietarios.',
    'legal-mentions': 'MENCIÓN LEGAL',
    'fan-project-legal': 'Video Games Battle es un proyecto FAN no comercial',
    'educational-purpose': 'Este juego fue creado por entusiastas de videojuegos con fines educativos y de entretenimiento únicamente.',
    'no-paid-content': 'Sin contenido de pago',
    'completely-accessible': 'Todo el juego es accesible gratuitamente',
    'no-sales': 'Sin ventas',
    'nothing-for-sale': 'Nada está a la venta en este sitio',
    'completely-free': '100% Gratis',
    'all-features-available': 'Todas las funciones están disponibles sin costo',
    'community-project': 'Proyecto comunitario',
    'created-by-community': 'Creado por y para la comunidad gaming',
    'technical-credits': 'CRÉDITOS TÉCNICOS',
    'development': 'Desarrollo:',
    'game-engine': 'Motor de juego:',
    'inspiration': 'Inspiración:',
    'thanks': 'Agradecimientos:',
    'community-support': 'A todos los fans que nos apoyan y a la comunidad de juegos de estrategia',
    'copyright-respect': 'Este proyecto respeta los derechos de autor y las marcas registradas. Todos los personajes y franquicias pertenecen a sus propietarios legítimos.',
    'scroll-indicator': 'Desplázate hacia abajo para ver todos los créditos',
    
    // Página de reglas - secciones faltantes
    'time-system': 'Sistema de tiempo',
    'optional-timer': 'Temporizador opcional',
    'timer-description': 'Los jugadores pueden activar un temporizador para limitar el tiempo de reflexión por turno. El tiempo por turno varía según el tamaño del tablero:',
    'board-9x9': '9×9:',
    'board-11x11': '11×11:',
    'board-15x15': '15×15:',
    'minutes-per-turn': 'minutos por turno',
    'timeout-elimination': 'Eliminación por tiempo agotado',
    'timeout-description': 'Si un jugador excede su tiempo, es eliminado automáticamente y todas sus piezas desaparecen del tablero.',
    'game-flow': 'Desarrollo de una partida',
    'draft-phase': 'Fase de draft',
    'draft-description': 'Al inicio de cada partida, los jugadores seleccionan sus piezas en un orden definido. Cada jugador elige una pieza por turno hasta haber constituido su ejército.',
    'game-phase': 'Fase de juego',
    'game-phase-description': 'Los jugadores juegan por turnos en el orden definido. Cada turno consiste en:',
    'select-piece': 'Seleccionar una pieza',
    'choose-destination': 'Elegir una casilla de destino válida',
    'use-object': 'Opcionalmente usar un objeto',
    'next-player': 'Pasar al siguiente jugador',
    'end-game': 'Fin de partida',
    'end-game-description': 'La partida termina cuando solo queda un jugador vivo. ¡Este jugador gana!',
    
    // Consejos estratégicos y FAQ - traducciones faltantes
    'strategic-tips': 'Consejos estratégicos',
    'king-protection': 'Protección del rey',
    'king-protection-desc': 'Tu rey es tu pieza más valiosa. Manténlo siempre protegido por otras piezas y evita exponerlo innecesariamente.',
    'object-management': 'Gestión de objetos',
    'object-management-desc': 'Los objetos pueden cambiar el curso de una partida. Úsalos en el momento adecuado para maximizar su impacto.',
    'positioning': 'Posicionamiento',
    'positioning-desc': 'Controla el centro del tablero para tener más opciones de movimiento y captura.',
    'temporary-cooperation': 'Cooperación temporal',
    'temporary-cooperation-desc': 'En partidas multijugador, no dudes en formar alianzas temporales contra amenazas comunes.',
    'faq': 'Preguntas frecuentes',
    'can-capture-own': '¿Puedo capturar mis propias piezas?',
    'can-capture-own-desc': 'No, solo puedes capturar piezas enemigas. Tus propias piezas bloquean tus movimientos.',
    'no-valid-moves': '¿Qué pasa si no tengo movimientos válidos?',
    'no-valid-moves-desc': 'Si no puedes mover ninguna pieza, pasas tu turno automáticamente.',
    'can-steal-objects': '¿Se pueden robar los objetos?',
    'can-steal-objects-desc': 'No, los objetos son personales y no pueden ser tomados por otros jugadores.',
    'can-change-piece': '¿Puedo cambiar de pieza después de seleccionarla?',
    'can-change-piece-desc': 'No, una vez que una pieza está seleccionada, debes moverla o pasar tu turno.',
    
    // Nombres de objetos
    'bobomb-name': 'Bob-omb',
    'portals-name': 'Portales',
    'lightning-name': 'Rayo',
    'star-name': 'Estrella',
    'tetrimino-name': 'Tetromino',
    'tornado-name': 'Tornado',
    'banana-name': 'Plátano',
    'phoenix-name': 'Fénix',
    'cursor-name': 'Cursor Sims',
    'heart-name': 'Corazón',
    'sandglass-name': 'Reloj de Arena',
    'mask-name': 'Máscara de Majora',
    'ocarina-name': 'Ocarina del Tiempo',
    
    // Descripciones de objetos
    'bobomb-desc': '¡Bomba explosiva de Mario! Coloca una <strong>bomba en una casilla vacía</strong> que explotará en el próximo turno.',
    'bobomb-details': 'La bomba daña todas las piezas adyacentes (aliadas y enemigas). Perfecto para crear zonas de peligro o eliminar múltiples piezas de una vez. Inspirado en Super Mario Bros.',
    'portals-desc': '¡Teletransportación instantánea! Crea <strong>dos portales conectados</strong> en el tablero.',
    'portals-details': 'Coloca dos portales en casillas vacías. Cualquier pieza que entre en un portal sale instantáneamente del otro. Perfecto para movimientos tácticos y escapes. Inspirado en Portal.',
    'lightning-desc': '¡Rayo destructivo! <strong>Elimina instantáneamente una pieza</strong> de tu elección.',
    'lightning-details': 'Elige cualquier pieza en el tablero (aliada o enemiga) para eliminarla inmediatamente. Poderoso pero costoso, perfecto para eliminar amenazas mayores. Inspirado en la magia elemental clásica.',
    'star-desc': '¡Revelación mística! <strong>Revela todas las piezas ocultas</strong> en el tablero durante 3 turnos.',
    'star-details': 'Permite ver las piezas enemigas incluso si normalmente son invisibles. Útil para planificar ataques o evitar trampas. Inspirado en Super Mario Bros, la estrella aporta clarividencia.',
    'tetrimino-desc': '¡Bloque de construcción! Coloca un <strong>muro Tetrimino</strong> en el tablero.',
    'tetrimino-details': 'Crea un obstáculo permanente en el tablero que bloquea los movimientos. Perfecto para controlar zonas de paso o proteger posiciones estratégicas. Inspirado en Tetris.',
    'tornado-desc': '¡Viento destructivo! <strong>Teletransporta una pieza</strong> a una posición aleatoria del tablero.',
    'tornado-details': 'Elige una pieza que será teletransportada a una casilla libre aleatoria. Puede crear situaciones inesperadas y tácticas. Inspirado en fenómenos meteorológicos extremos.',
    'banana-desc': '¡Trampa resbaladiza! Coloca una <strong>banana en una casilla vacía</strong> que hará resbalar a la próxima pieza que aterrice allí.',
    'banana-details': 'La pieza que aterrice en la banana resbala hacia la siguiente casilla en la dirección de su movimiento. Puede crear situaciones inesperadas y tácticas. Inspirado en Mario Kart, la banana es una trampa clásica.',
    'phoenix-desc': '¡Renacimiento! <strong>Resucita una pieza perdida</strong> de tu facción.',
    'phoenix-details': 'Elige una pieza que has perdido para hacerla volver al tablero. Perfecto para compensar pérdidas o reforzar tu ejército. Inspirado en la mitología del fénix.',
    'cursor-desc': '¡Control total! <strong>Toma el control de una pieza enemiga</strong> durante 1 turno.',
    'cursor-details': 'Puedes mover la pieza enemiga como si fuera tuya. Ideal para crear situaciones tácticas o eliminar amenazas. Inspirado en The Sims, este cursor mágico permite manipular a otros.',
    'heart-desc': '¡Vida extra! <strong>Protege una pieza</strong> de la captura durante 2 turnos.',
    'heart-details': 'La pieza protegida no puede ser capturada, ni siquiera por el rey enemigo. Perfecto para proteger una pieza importante o crear una distracción. Inspirado en The Legend of Zelda, el corazón aporta protección divina.',
    'sandglass-desc': '¡El tiempo del enemigo se desmorona! Reduce el <strong>cronómetro de todos los enemigos</strong> según el tamaño del tablero.',
    'sandglass-details': '<strong>9×9:</strong> -1 minuto | <strong>11×11:</strong> -2 minutos | <strong>15×15:</strong> -3 minutos<br>Este objeto solo funciona si el cronómetro está activado. Inspirado en Prince of Persia: The Sands of Time, permite obtener una ventaja temporal sobre tus enemigos.',
    'mask-desc': '¡La máscara maldita de Termina! Fuerza a un <strong>enemigo a jugar una pieza específica</strong> en su próximo turno.',
    'mask-details': 'Elige una pieza enemiga que el oponente estará obligado a mover. El efecto desaparece después de que la pieza haya jugado. Inspirado en The Legend of Zelda: Majora\'s Mask, esta máscara maléfica manipula las mentes.',
    'ocarina-desc': '¡El instrumento mágico de Hyrule! Transforma <strong>permanentemente una pieza en caballo</strong> (movimientos en L).',
    'ocarina-details': 'Elige cualquier pieza (aliada o enemiga) que ahora se moverá como un caballo de ajedrez. La ocarina permanece visible sobre la pieza. Inspirado en The Legend of Zelda: Ocarina of Time, este objeto legendario cambia las reglas del juego.',
    
    // Piezas
    'cost': 'Costo',
    'range': 'Alcance',
    'movements': 'Movimientos',
    'movement-demo': 'Demo de Movimiento',
    'tier-1': 'Débil',
    'tier-2': 'Medio',
    'tier-3': 'Fuerte',
    'tier-4': 'Muy Fuerte',
    'tier-5': 'Legendario',
    'weight': 'Peso',
    
    // Página de piezas - traducciones faltantes
    'strength': 'Rol',
    'role': 'Rol',
    'all-strengths': 'Todos',
    'all-roles': 'Todos',
    'weak': 'Débil',
    'medium': 'Medio',
    'strong': 'Fuerte',
    'unique': 'Único',
    'legendary': 'Legendario',
    'unknown': 'Desconocido',
    'all-directions': 'Todas las direcciones (como una reina)',
    'directions-possible': 'direcciones posibles',
    'points': 'pts',
    
    // Nombres de piezas
    'king-nintendo': 'Rey Nintendo',
    'king-playstation': 'Rey PlayStation',
    'king-sega': 'Rey SEGA',
    'king-xbox': 'Rey Xbox',
    'link': 'Link',
    'mario': 'Mario',
    'zelda': 'Zelda',
    'bowser': 'Bowser',
    'ganondorf': 'Ganondorf',
    'samus': 'Samus',
    'pit': 'Pit',
    'palutena': 'Palutena',
    'sheik': 'Sheik',
    'wario': 'Wario',
    'duo-duck-hunt': 'Dúo Duck Hunt',
    'wii-fit-trainer': 'Wii Fit Trainer',
    'luigi': 'Luigi',
    'peach': 'Peach',
    'kirby': 'Kirby',
    
    // Descripciones de piezas
    'king-nintendo-desc': 'El rey de Nintendo. Se mueve una casilla en todas las direcciones. Capturar el rey enemigo gana la partida.',
    'king-playstation-desc': 'El rey de PlayStation. Se mueve una casilla en todas las direcciones. Capturar el rey enemigo gana la partida.',
    'king-sega-desc': 'El rey de SEGA. Se mueve una casilla en todas las direcciones. Capturar el rey enemigo gana la partida.',
    'king-xbox-desc': 'El rey de Xbox. Se mueve una casilla en todas las direcciones. Capturar el rey enemigo gana la partida.',
    'link-desc': 'El héroe de la Trifuerza. Se mueve como un caballo, capaz de saltar obstáculos.',
    'mario-desc': 'El fontanero más famoso del mundo. Se mueve en línea recta hasta 2 casillas.',
    'zelda-desc': 'La princesa de Hyrule. Puede moverse en todas las direcciones hasta 3 casillas.',
    'bowser-desc': 'El rey de los Koopas. Se mueve como una torre, horizontal y verticalmente.',
    'ganondorf-desc': 'El rey de los Gerudos. Se mueve como un alfil, solo en diagonal.',
    'samus-desc': 'La cazarrecompensas. Se mueve como un caballo con alcance extendido.',
    'pit-desc': 'El ángel de Palutena. Se mueve como un caballo, capaz de volar.',
    'palutena-desc': 'La diosa de la luz. Se mueve en todas las direcciones hasta 2 casillas.',
    'sheik-desc': 'El alter ego de Zelda. Se mueve como un caballo con gran agilidad.',
    'wario-desc': 'El rival de Mario. Se mueve en línea recta 1 casilla, muy poderoso.',
    'duo-duck-hunt-desc': 'El perro y el pato. Se mueven juntos como un caballo.',
    'wii-fit-trainer-desc': 'El entrenador de fitness. Se mueve en todas las direcciones 1 casilla.',
    'luigi-desc': 'El hermano de Mario. Se mueve como un caballo, más ágil que Mario.',
    'peach-desc': 'La princesa de los hongos. Se mueve en todas las direcciones hasta 2 casillas.',
    'kirby-desc': 'La estrella rosa. Se mueve como un caballo, puede absorber enemigos.',
    
    // Anuncios
    'advertisements': 'Anuncios',
    'ad-1': 'Anuncio 1',
    'ad-2': 'Anuncio 2',
    'ad-update': 'Actualización cada 5 acciones',
    
    // Idiomas
    'language': 'Idioma',
    'french': 'Français',
    'english': 'English',
    'spanish': 'Español',
    'german': 'Deutsch',
    'portuguese': 'Português'
  },
  
  de: {
    // Hauptinterface
    'game-title': 'Video Games Battle',
    'page-title': 'Chesstendo - Draft + Brett',
    'tagline': 'Vergessen Sie klassisches Schach, hier machen Videospielhelden die Regeln!',
    'select-players': 'Anzahl der Spieler',
    'select-board-size': 'Brettgröße',
    'start-game': 'Spiel starten',
    'player': 'Spieler',
    'players': 'Spieler',
    'faction': 'Fraktion',
    'money': 'Punkte',
    'team': 'Team',
    'next-player': 'Nächster Spieler',
    'previous-player': 'Vorheriger Spieler',
    'finish-selection': 'Auswahl beenden',
    'start-game-button': 'Spiel starten',
    
    // Brettgrößen
    'board-small': '9x9 (Klein)',
    'board-medium': '11x11 (Mittel)',
    'board-large': '15x15 (Groß)',
    
    // Fraktionen
    'nintendo': 'Nintendo',
    'sega': 'SEGA',
    'playstation': 'PlayStation',
    'xbox': 'Xbox',
    
    // Könige
    'king-nintendo': 'Nintendo König',
    'king-playstation': 'PlayStation König',
    'king-sega': 'SEGA König',
    'king-xbox': 'Xbox König',
    
    // Spielnachrichten
    'game-start': 'Spiel beginnt!',
    'your-turn': 'Dein Zug',
    'player-turn': 'Spielerzug',
    'pieces-in-play': 'Spielsteine',
    'rules': 'Regeln',
    'captured-pieces': 'Geschlagene Steine',
    'items': 'Gegenstände',
    'timer': 'Timer',
    
    // Aktionen
    'move': 'Bewegen',
    'capture': 'Schlagen',
    'use-item': 'Gegenstand verwenden',
    'end-turn': 'Zug beenden',
    'restart': 'Neustart',
    'quit': 'Beenden',
    
    // Fehlermeldungen
    'invalid-move': 'Ungültiger Zug',
    'not-your-turn': 'Nicht dein Zug',
    'no-piece-selected': 'Kein Stein ausgewählt',
    'cannot-move-there': 'Kann nicht dorthin ziehen',
    
    // Gegenstände
    'bobomb': 'Bob-omb',
    'portals': 'Portale',
    'lightning': 'Blitz',
    'star': 'Stern',
    'tetrimino': 'Tetrimino',
    'tornado': 'Tornado',
    'banana': 'Banane',
    'phoenix': 'Phönixfeder',
    'cursor': 'Sims-Cursor',
    'heart': 'Herz',
    'sandglass': 'Sanduhr',
    'mask': 'Majoras Maske',
    'ocarina': 'Ocarina der Zeit',
    
    // Gegenstandsbeschreibungen
    'bobomb-desc': 'Marios explosive Bombe! Platziert eine Bombe auf einem leeren Feld, die nächsten Zug explodiert.',
    'portals-desc': 'Sofortige Teleportation! Erstellt zwei verbundene Portale auf dem Brett.',
    'lightning-desc': 'Zerstörerischer Blitz! Eliminiert sofort eine Figur deiner Wahl.',
    'star-desc': 'Mystische Offenbarung! Zeigt alle versteckten Figuren auf dem Brett für 3 Züge.',
    'tetrimino-desc': 'Baustein! Platziert eine Tetrimino-Wand auf dem Brett.',
    'tornado-desc': 'Zerstörerischer Wind! Teleportiert eine Figur zu einer zufälligen Position auf dem Brett.',
    'banana-desc': 'Rutschiger Fallen! Platziert eine Banane auf einem leeren Feld, die die nächste Figur, die dort landet, zum Rutschen bringt.',
    'phoenix-desc': 'Wiedergeburt! Erweckt eine verlorene Figur deiner Fraktion wieder zum Leben.',
    'cursor-desc': 'Totale Kontrolle! Übernimmt die Kontrolle über eine gegnerische Figur für 1 Zug.',
    'heart-desc': 'Extra Leben! Schützt eine Figur vor dem Schlagen für 2 Züge.',
    'sandglass-desc': 'Die Zeit des Gegners zerbröckelt! Reduziert den Timer aller Gegner basierend auf der Brettgröße.',
    'mask-desc': 'Majoras verfluchte Maske! Zwingt einen Gegner, eine bestimmte Figur in seinem nächsten Zug zu spielen.',
    'ocarina-desc': 'Hyrules magisches Instrument! Verwandelt eine Figur permanent in einen Springer (L-förmige Züge).',
    
    // Gegenstandsnachrichten
    'item-used': 'Gegenstand verwendet',
    'item-charging': 'Gegenstand lädt',
    'select-target': 'Ziel auswählen',
    'select-position': 'Position auswählen',
    'not-activated': 'nicht aktiviert',
    
    // Navigation
    'play': 'Spielen',
    'pieces': 'Figuren',
    'rules': 'Regeln',
    'items': 'Gegenstände',
    'credits': 'Credits',
    'movements': 'Bewegungen',
    'login': 'Anmelden',
    
    // Seiten
    'available-pieces': 'Verfügbare Figuren',
    'available-items': 'Verfügbare Gegenstände',
    'game-rules': 'Spielregeln',
    'movement-demos': 'Bewegungsdemonstrationen',
    'sort-by': 'Sortieren nach',
    'strength': 'Rolle',
    'role': 'Rolle',
    'all-roles': 'Alle',
    'editor': 'Herausgeber',
    'universe': 'Universum',
    'all': 'Alle',
    
    // Spielregeln
    'game-objective': 'Spielziel',
    'game-objective-desc': 'Video Games Battle ist ein Strategiespiel, das vom Schach inspiriert ist, bei dem Spieler mit ikonischen Charakteren aus dem Videospieluniversum kämpfen. Das Ziel ist es, den gegnerischen König zu fangen, um den Spieler zu eliminieren und der letzte Überlebende zu werden.',
    'victory': 'Sieg',
    'victory-desc': 'Der letzte lebende Spieler sein, indem man alle gegnerischen Könige fängt oder alle Gegner durch Timeout eliminiert.',
    'piece-types': 'Rollen',
    'king': 'König',
    'king-desc': 'Wichtigste Figur jedes Spielers. Bewegt sich ein Feld in alle Richtungen. Wenn dein König gefangen wird, bist du aus dem Spiel eliminiert.',
    'special-pieces': 'Spezielle Figuren',
    'special-pieces-desc': 'Jede Fraktion verfügt über einzigartige Charaktere mit spezifischen Bewegungen und Fähigkeiten:',
    'movements': 'Bewegungen',
    'movements-desc': 'Jede Figur hat ihre eigenen Bewegungsregeln, definiert durch:',
    'directions': 'Richtungen',
    'directions-desc': 'Angrenzende zugängliche Felder',
    'range': 'Reichweite',
    'range-desc': 'Maximale Anzahl von Feldern in gerader Linie',
    'specialties': 'Spezialitäten',
    'specialties-desc': 'Einzigartige Fähigkeiten (Sprung, Flug, etc.)',
    'object-system': 'Gegenstandssystem',
    'acquisition': 'Erwerb',
    'acquisition-desc': 'Gegenstände erscheinen zufällig auf dem Brett in Kisten. Jeder Spieler kann maximal 3 in Reserve sammeln.',
    'usage': 'Verwendung',
    'usage-desc': 'Nur ein Gegenstand kann pro Zug verwendet werden. Gegenstände haben verschiedene Effekte:',
    'time-sand': 'Zeitsand',
    'time-sand-desc': 'Reduziert die Zeit der Gegner',
    'majora-mask': 'Majoras Maske',
    'majora-mask-desc': 'Zwingt einen Gegner, eine bestimmte Figur zu spielen',
    'time-ocarina': 'Ocarina der Zeit',
    'time-ocarina-desc': 'Verwandelt eine Figur in einen Springer',
    'bomb': 'Bombe',
    'bomb-desc': 'Explodiert und beschädigt angrenzende Figuren',
    'star': 'Stern',
    'star-desc': 'Enthüllt versteckte Figuren',
    'weight-desc': 'Jeder Gegenstand hat ein anderes Gewicht, das die Wahrscheinlichkeit des Erscheinens beeinflusst. Je höher das Gewicht, desto seltener ist der Gegenstand.',
    
    // Gemeinsame Objektregeln
    'common-rules': 'Gemeinsame Regeln:',
    'common-rules-1': 'Jeder Spieler kann bis zu <strong>3 Gegenstände</strong> in Reserve halten.',
    'common-rules-2': 'Man kann nur <strong>einen Gegenstand pro Zug</strong> verwenden.',
    'common-rules-3': 'Gegenstände erscheinen zufällig in Kisten auf dem Brett.',
    'common-rules-4': 'Das Gewicht eines Gegenstands bestimmt seine Seltenheit (je höher das Gewicht, desto seltener der Gegenstand).',
    
    // Credits-Seite
    'credits-title': 'CREDITS',
    'legal-warning': 'RECHTLICHE WARNUNG',
    'fan-project': 'Dieses Spiel ist ein gemeinnütziges FAN-Projekt',
    'fan-project-desc': 'Alle Charaktere, Franchises und geistigen Eigentumsrechte gehören ihren jeweiligen Eigentümern.',
    'no-content-sale': 'Kein Inhalt ist zum Verkauf',
    'completely-free': 'Das gesamte Spiel ist 100% KOSTENLOS',
    'fan-created': 'Dieses Projekt wird von Fans, für Fans, ohne kommerziellen Zweck erstellt.',
    'owner-of': 'Eigentümer von:',
    'nintendo-owner': 'The Legend of Zelda, Super Mario und alle ihre zugehörigen Franchises',
    'playstation-owner': 'PlayStation, Uncharted, God of War, Astro Bot und ihre Franchises',
    'sega-owner': 'Sonic, Yakuza, Shinobi und ihre zugehörigen Franchises',
    'xbox-owner': 'Xbox, Halo, Gears of War, Perfect Dark und ihre Franchises',
    'nintendo-king': 'Nintendo-König',
    'playstation-king': 'PlayStation-König',
    'sega-king': 'SEGA-König',
    'xbox-king': 'Xbox-König',
    'nintendo-representative': 'Nintendo-Vertreter',
    'playstation-representative': 'PlayStation-Vertreter',
    'sega-representative': 'SEGA-Vertreter',
    'xbox-representative': 'Xbox-Vertreter',
    'nintendo-copyright': '© Nintendo. Alle Rechte vorbehalten. Nintendo ist eine eingetragene Marke von Nintendo Co., Ltd.',
    'playstation-copyright': '© Sony Interactive Entertainment. Alle Rechte vorbehalten. PlayStation ist eine eingetragene Marke von Sony Interactive Entertainment LLC.',
    'sega-copyright': '© SEGA Corporation. Alle Rechte vorbehalten. SEGA ist eine eingetragene Marke von SEGA Corporation.',
    'xbox-copyright': '© Microsoft Corporation. Alle Rechte vorbehalten. Xbox ist eine eingetragene Marke von Microsoft Corporation.',
    'other-properties': 'Andere Eigenschaften',
    'inspired-by': 'Gegenstände und Elemente inspiriert von:',
    'all-elements-inspired': 'Alle Gameplay-Elemente sind von bestehenden Spielen inspiriert und gehören ihren jeweiligen Eigentümern.',
    'legal-mentions': 'RECHTLICHE HINWEISE',
    'fan-project-legal': 'Video Games Battle ist ein nicht-kommerzielles FAN-Projekt',
    'educational-purpose': 'Dieses Spiel wurde von Videospiel-Enthusiasten nur zu Bildungs- und Unterhaltungszwecken erstellt.',
    'no-paid-content': 'Kein kostenpflichtiger Inhalt',
    'completely-accessible': 'Das gesamte Spiel ist kostenlos zugänglich',
    'no-sales': 'Keine Verkäufe',
    'nothing-for-sale': 'Nichts ist auf dieser Website zum Verkauf',
    'completely-free': '100% Kostenlos',
    'all-features-available': 'Alle Funktionen sind kostenlos verfügbar',
    'community-project': 'Gemeinschaftsprojekt',
    'created-by-community': 'Von und für die Gaming-Community erstellt',
    'technical-credits': 'TECHNISCHE CREDITS',
    'development': 'Entwicklung:',
    'game-engine': 'Spiel-Engine:',
    'inspiration': 'Inspiration:',
    'thanks': 'Danksagungen:',
    'community-support': 'An alle Fans, die uns unterstützen, und die Strategie-Gaming-Community',
    'copyright-respect': 'Dieses Projekt respektiert Urheberrechte und Marken. Alle Charaktere und Franchises gehören ihren legitimen Eigentümern.',
    'scroll-indicator': 'Scrollen Sie nach unten, um alle Credits zu sehen',
    
    // Regeln-Seite - fehlende Abschnitte
    'time-system': 'Zeitsystem',
    'optional-timer': 'Optionaler Timer',
    'timer-description': 'Spieler können einen Timer aktivieren, um die Denkzeit pro Zug zu begrenzen. Die Zeit pro Zug variiert je nach Brettgröße:',
    'board-9x9': '9×9:',
    'board-11x11': '11×11:',
    'board-15x15': '15×15:',
    'minutes-per-turn': 'Minuten pro Zug',
    'timeout-elimination': 'Eliminierung durch Zeitüberschreitung',
    'timeout-description': 'Wenn ein Spieler seine Zeit überschreitet, wird er automatisch eliminiert und alle seine Figuren verschwinden vom Brett.',
    'game-flow': 'Spielablauf',
    'draft-phase': 'Draft-Phase',
    'draft-description': 'Zu Beginn jedes Spiels wählen die Spieler ihre Figuren in einer definierten Reihenfolge. Jeder Spieler wählt abwechselnd eine Figur, bis er seine Armee aufgebaut hat.',
    'game-phase': 'Spielphase',
    'game-phase-description': 'Die Spieler spielen abwechselnd in der definierten Reihenfolge. Jeder Zug besteht aus:',
    'select-piece': 'Eine Figur auswählen',
    'choose-destination': 'Ein gültiges Zielfeld wählen',
    'use-object': 'Optional ein Objekt verwenden',
    'next-player': 'Zum nächsten Spieler übergehen',
    'end-game': 'Spielende',
    'end-game-description': 'Das Spiel endet, wenn nur noch ein Spieler am Leben ist. Dieser Spieler gewinnt!',
    
    // Strategische Tipps und FAQ - fehlende Übersetzungen
    'strategic-tips': 'Strategische Tipps',
    'king-protection': 'Königsschutz',
    'king-protection-desc': 'Ihr König ist Ihre wertvollste Figur. Halten Sie ihn immer durch andere Figuren geschützt und vermeiden Sie unnötige Exposition.',
    'object-management': 'Objektverwaltung',
    'object-management-desc': 'Objekte können den Verlauf eines Spiels ändern. Verwenden Sie sie zum richtigen Zeitpunkt, um ihre Wirkung zu maximieren.',
    'positioning': 'Positionierung',
    'positioning-desc': 'Kontrollieren Sie das Zentrum des Brettes, um mehr Bewegungs- und Eroberungsoptionen zu haben.',
    'temporary-cooperation': 'Temporäre Zusammenarbeit',
    'temporary-cooperation-desc': 'In Mehrspielerpartien zögern Sie nicht, temporäre Allianzen gegen gemeinsame Bedrohungen zu bilden.',
    'faq': 'Häufig gestellte Fragen',
    'can-capture-own': 'Kann ich meine eigenen Figuren erobern?',
    'can-capture-own-desc': 'Nein, Sie können nur gegnerische Figuren erobern. Ihre eigenen Figuren blockieren Ihre Bewegungen.',
    'no-valid-moves': 'Was passiert, wenn ich keine gültigen Züge mehr habe?',
    'no-valid-moves-desc': 'Wenn Sie keine Figur mehr bewegen können, überspringen Sie automatisch Ihren Zug.',
    'can-steal-objects': 'Können Objekte gestohlen werden?',
    'can-steal-objects-desc': 'Nein, Objekte sind persönlich und können nicht von anderen Spielern genommen werden.',
    'can-change-piece': 'Kann ich die Figur wechseln, nachdem ich sie ausgewählt habe?',
    'can-change-piece-desc': 'Nein, einmal ausgewählt, müssen Sie die Figur bewegen oder Ihren Zug überspringen.',
    
    // Figuren
    'cost': 'Kosten',
    'range': 'Reichweite',
    'movements': 'Bewegungen',
    'movement-demo': 'Bewegungsdemo',
    'tier-1': 'Schwach',
    'tier-2': 'Mittel',
    'tier-3': 'Stark',
    'tier-4': 'Sehr Stark',
    'tier-5': 'Legendär',
    'weight': 'Gewicht',
    
    // Figuren-Seite - fehlende Übersetzungen
    'strength': 'Rolle',
    'role': 'Rolle',
    'all-strengths': 'Alle',
    'all-roles': 'Alle',
    'weak': 'Schwach',
    'medium': 'Mittel',
    'strong': 'Stark',
    'unique': 'Einzigartig',
    'legendary': 'Legendär',
    'unknown': 'Unbekannt',
    'all-directions': 'Alle Richtungen (wie eine Dame)',
    'directions-possible': 'mögliche Richtungen',
    'points': 'Pkt',
    
    // Werbung
    'advertisements': 'Werbung',
    'ad-1': 'Anzeige 1',
    'ad-2': 'Anzeige 2',
    'ad-update': 'Aktualisierung alle 5 Aktionen',
    
    // Sprachen
    'language': 'Sprache',
    'french': 'Français',
    'english': 'English',
    'spanish': 'Español',
    'german': 'Deutsch',
    'portuguese': 'Português'
  },
  
  pt: {
    // Interface principal
    'game-title': 'Video Games Battle',
    'page-title': 'Chesstendo - Draft + Tabuleiro',
    'tagline': 'Esqueça o xadrez clássico, aqui os heróis dos videogames fazem as regras!',
    'select-players': 'Número de jogadores',
    'select-board-size': 'Tamanho do tabuleiro',
    'start-game': 'Iniciar jogo',
    'player': 'Jogador',
    'players': 'jogadores',
    'faction': 'Facção',
    'money': 'Pontos',
    'team': 'Equipe',
    'next-player': 'Próximo jogador',
    'previous-player': 'Jogador anterior',
    'finish-selection': 'Terminar seleção',
    'start-game-button': 'Iniciar jogo',
    
    // Tamanhos de tabuleiro
    'board-small': '9x9 (Pequeno)',
    'board-medium': '11x11 (Médio)',
    'board-large': '15x15 (Grande)',
    
    // Facções
    'nintendo': 'Nintendo',
    'sega': 'SEGA',
    'playstation': 'PlayStation',
    'xbox': 'Xbox',
    
    // Reis
    'king-nintendo': 'Rei Nintendo',
    'king-playstation': 'Rei PlayStation',
    'king-sega': 'Rei SEGA',
    'king-xbox': 'Rei Xbox',
    
    // Mensagens de jogo
    'game-start': 'Jogo começa!',
    'your-turn': 'Sua vez',
    'player-turn': 'Vez do Jogador',
    'pieces-in-play': 'Peças em jogo',
    'rules': 'Regras',
    'captured-pieces': 'Peças capturadas',
    'items': 'Itens',
    'timer': 'Cronômetro',
    
    // Ações
    'move': 'Mover',
    'capture': 'Capturar',
    'use-item': 'Usar item',
    'end-turn': 'Terminar turno',
    'restart': 'Reiniciar',
    'quit': 'Sair',
    
    // Mensagens de erro
    'invalid-move': 'Movimento inválido',
    'not-your-turn': 'Não é sua vez',
    'no-piece-selected': 'Nenhuma peça selecionada',
    'cannot-move-there': 'Não pode mover para lá',
    
    // Itens
    'bobomb': 'Bob-omb',
    'portals': 'Portais',
    'lightning': 'Raio',
    'star': 'Estrela',
    'tetrimino': 'Tetrimino',
    'tornado': 'Tornado',
    'banana': 'Banana',
    'phoenix': 'Pena de Fênix',
    'cursor': 'Cursor Sims',
    'heart': 'Coração',
    'sandglass': 'Ampulheta',
    'mask': 'Máscara de Majora',
    'ocarina': 'Ocarina do Tempo',
    
    // Descrições dos itens
    'bobomb-desc': 'Bomba explosiva do Mario! Coloca uma bomba em uma casa vazia que explodirá no próximo turno.',
    'portals-desc': 'Teletransporte instantâneo! Cria dois portais conectados no tabuleiro.',
    'lightning-desc': 'Raio destrutivo! Elimina instantaneamente uma peça de sua escolha.',
    'star-desc': 'Revelação mística! Revela todas as peças escondidas no tabuleiro por 3 turnos.',
    'tetrimino-desc': 'Bloco de construção! Coloca uma parede Tetrimino no tabuleiro.',
    'tornado-desc': 'Vento destrutivo! Teletransporta uma peça para uma posição aleatória no tabuleiro.',
    'banana-desc': 'Armadilha escorregadia! Coloca uma banana em uma casa vazia que fará a próxima peça que pousar lá escorregar.',
    'phoenix-desc': 'Renascimento! Ressuscita uma peça perdida de sua facção.',
    'cursor-desc': 'Controle total! Assume o controle de uma peça inimiga por 1 turno.',
    'heart-desc': 'Vida extra! Protege uma peça da captura por 2 turnos.',
    'sandglass-desc': 'O tempo do inimigo se desfaz! Reduz o cronômetro de todos os oponentes baseado no tamanho do tabuleiro.',
    'mask-desc': 'A máscara amaldiçoada de Termina! Força um oponente a jogar uma peça específica em seu próximo turno.',
    'ocarina-desc': 'O instrumento mágico de Hyrule! Transforma permanentemente uma peça em cavalo (movimentos em L).',
    
    // Mensagens de itens
    'item-used': 'Item usado',
    'item-charging': 'Item carregando',
    'select-target': 'Selecione um alvo',
    'select-position': 'Selecione uma posição',
    'not-activated': 'não ativado',
    
    // Navegação
    'play': 'Jogar',
    'pieces': 'Peças',
    'rules': 'Regras',
    'items': 'Itens',
    'credits': 'Créditos',
    'movements': 'Movimentos',
    'login': 'Entrar',
    
    // Páginas
    'available-pieces': 'Peças Disponíveis',
    'available-items': 'Itens Disponíveis',
    'game-rules': 'Regras do Jogo',
    'movement-demos': 'Demonstrações de Movimentos',
    'sort-by': 'Ordenar por',
    'strength': 'Função',
    'role': 'Função',
    'all-roles': 'Todos',
    'editor': 'Editor',
    'universe': 'Universo',
    'all': 'Todos',
    
    // Regras do Jogo
    'game-objective': 'Objetivo do Jogo',
    'game-objective-desc': 'Video Games Battle é um jogo de estratégia inspirado no xadrez onde os jogadores se enfrentam com personagens icônicos do universo dos videogames. O objetivo é capturar o rei adversário para eliminar o jogador e se tornar o último sobrevivente.',
    'victory': 'Vitória',
    'victory-desc': 'Ser o último jogador vivo capturando todos os reis adversários ou eliminando todos os oponentes por tempo esgotado.',
    'piece-types': 'Funções',
    'king': 'Rei',
    'king-desc': 'Peça mais importante de cada jogador. Move-se uma casa em todas as direções. Se seu rei for capturado, você é eliminado da partida.',
    'special-pieces': 'Peças Especiais',
    'special-pieces-desc': 'Cada facção possui personagens únicos com movimentos e habilidades específicas:',
    'movements': 'Movimentos',
    'movements-desc': 'Cada peça tem suas próprias regras de movimento definidas por:',
    'directions': 'Direções',
    'directions-desc': 'Casas adjacentes acessíveis',
    'range': 'Alcance',
    'range-desc': 'Número máximo de casas em linha reta',
    'specialties': 'Especialidades',
    'specialties-desc': 'Habilidades únicas (pulo, voo, etc.)',
    'object-system': 'Sistema de Objetos',
    'acquisition': 'Aquisição',
    'acquisition-desc': 'Objetos aparecem aleatoriamente no tabuleiro em caixas. Cada jogador pode coletar no máximo 3 em reserva.',
    'usage': 'Uso',
    'usage-desc': 'Apenas um objeto pode ser usado por turno. Os objetos têm efeitos variados:',
    'time-sand': 'Areia do Tempo',
    'time-sand-desc': 'Reduz o tempo dos adversários',
    'majora-mask': 'Máscara de Majora',
    'majora-mask-desc': 'Força um adversário a jogar uma peça específica',
    'time-ocarina': 'Ocarina do Tempo',
    'time-ocarina-desc': 'Transforma uma peça em cavalo',
    'bomb': 'Bomba',
    'bomb-desc': 'Explode e danifica peças adjacentes',
    'star': 'Estrela',
    'star-desc': 'Revela peças ocultas',
    'weight-desc': 'Cada objeto tem um peso diferente que influencia a probabilidade de aparecimento. Quanto maior o peso, mais raro é o objeto.',
    
    // Regras comuns dos objetos
    'common-rules': 'Regras comuns:',
    'common-rules-1': 'Cada jogador pode manter até <strong>3 objetos</strong> em reserva.',
    'common-rules-2': 'Só se pode usar <strong>um objeto por turno</strong>.',
    'common-rules-3': 'Os objetos aparecem aleatoriamente em caixas no tabuleiro.',
    'common-rules-4': 'O peso de um objeto determina sua raridade (quanto maior o peso, mais raro o objeto).',
    
    // Página de créditos
    'credits-title': 'CRÉDITOS',
    'legal-warning': 'AVISO LEGAL',
    'fan-project': 'Este jogo é um projeto FAN sem fins lucrativos',
    'fan-project-desc': 'Todos os personagens, franquias e propriedades intelectuais pertencem aos seus respectivos proprietários.',
    'no-content-sale': 'Nenhum conteúdo está à venda',
    'completely-free': 'Todo o jogo é 100% GRATUITO',
    'fan-created': 'Este projeto é criado por fãs, para fãs, sem propósito comercial.',
    'owner-of': 'Proprietário de:',
    'nintendo-owner': 'The Legend of Zelda, Super Mario, e todas as suas franquias associadas',
    'playstation-owner': 'PlayStation, Uncharted, God of War, Astro Bot e suas franquias',
    'sega-owner': 'Sonic, Yakuza, Shinobi e suas franquias associadas',
    'xbox-owner': 'Xbox, Halo, Gears of War, Perfect Dark e suas franquias',
    'nintendo-king': 'Rei Nintendo',
    'playstation-king': 'Rei PlayStation',
    'sega-king': 'Rei SEGA',
    'xbox-king': 'Rei Xbox',
    'nintendo-representative': 'Representante Nintendo',
    'playstation-representative': 'Representante PlayStation',
    'sega-representative': 'Representante SEGA',
    'xbox-representative': 'Representante Xbox',
    'nintendo-copyright': '© Nintendo. Todos os direitos reservados. Nintendo é uma marca registrada da Nintendo Co., Ltd.',
    'playstation-copyright': '© Sony Interactive Entertainment. Todos os direitos reservados. PlayStation é uma marca registrada da Sony Interactive Entertainment LLC.',
    'sega-copyright': '© SEGA Corporation. Todos os direitos reservados. SEGA é uma marca registrada da SEGA Corporation.',
    'xbox-copyright': '© Microsoft Corporation. Todos os direitos reservados. Xbox é uma marca registrada da Microsoft Corporation.',
    'other-properties': 'Outras Propriedades',
    'inspired-by': 'Objetos e elementos inspirados em:',
    'all-elements-inspired': 'Todos os elementos de gameplay são inspirados em jogos existentes e pertencem aos seus respectivos proprietários.',
    'legal-mentions': 'MENÇÕES LEGAIS',
    'fan-project-legal': 'Video Games Battle é um projeto FAN não comercial',
    'educational-purpose': 'Este jogo foi criado por entusiastas de videogames apenas para fins educacionais e de entretenimento.',
    'no-paid-content': 'Sem conteúdo pago',
    'completely-accessible': 'Todo o jogo é acessível gratuitamente',
    'no-sales': 'Sem vendas',
    'nothing-for-sale': 'Nada está à venda neste site',
    'completely-free': '100% Gratuito',
    'all-features-available': 'Todos os recursos estão disponíveis sem custo',
    'community-project': 'Projeto comunitário',
    'created-by-community': 'Criado por e para a comunidade gaming',
    'technical-credits': 'CRÉDITOS TÉCNICOS',
    'development': 'Desenvolvimento:',
    'game-engine': 'Motor de jogo:',
    'inspiration': 'Inspiração:',
    'thanks': 'Agradecimentos:',
    'community-support': 'A todos os fãs que nos apoiam e à comunidade de jogos de estratégia',
    'copyright-respect': 'Este projeto respeita direitos autorais e marcas registradas. Todos os personagens e franquias pertencem aos seus proprietários legítimos.',
    'scroll-indicator': 'Role para baixo para ver todos os créditos',
    
    // Página de regras - seções faltantes
    'time-system': 'Sistema de tempo',
    'optional-timer': 'Timer opcional',
    'timer-description': 'Os jogadores podem ativar um timer para limitar o tempo de reflexão por turno. O tempo por turno varia de acordo com o tamanho do tabuleiro:',
    'board-9x9': '9×9:',
    'board-11x11': '11×11:',
    'board-15x15': '15×15:',
    'minutes-per-turn': 'minutos por turno',
    'timeout-elimination': 'Eliminação por tempo esgotado',
    'timeout-description': 'Se um jogador exceder seu tempo, ele é automaticamente eliminado e todas as suas peças desaparecem do tabuleiro.',
    'game-flow': 'Desenvolvimento de uma partida',
    'draft-phase': 'Fase de draft',
    'draft-description': 'No início de cada partida, os jogadores selecionam suas peças em uma ordem definida. Cada jogador escolhe uma peça por vez até ter constituído seu exército.',
    'game-phase': 'Fase de jogo',
    'game-phase-description': 'Os jogadores jogam por turnos na ordem definida. Cada turno consiste em:',
    'select-piece': 'Selecionar uma peça',
    'choose-destination': 'Escolher uma casa de destino válida',
    'use-object': 'Opcionalmente usar um objeto',
    'next-player': 'Passar para o próximo jogador',
    'end-game': 'Fim de jogo',
    'end-game-description': 'A partida termina quando apenas um jogador permanece vivo. Este jogador vence!',
    
    // Dicas estratégicas e FAQ - traduções faltantes
    'strategic-tips': 'Dicas estratégicas',
    'king-protection': 'Proteção do rei',
    'king-protection-desc': 'Seu rei é sua peça mais valiosa. Mantenha-o sempre protegido por outras peças e evite expô-lo desnecessariamente.',
    'object-management': 'Gestão de objetos',
    'object-management-desc': 'Os objetos podem mudar o curso de uma partida. Use-os no momento certo para maximizar seu impacto.',
    'positioning': 'Posicionamento',
    'positioning-desc': 'Controle o centro do tabuleiro para ter mais opções de movimento e captura.',
    'temporary-cooperation': 'Cooperação temporária',
    'temporary-cooperation-desc': 'Em partidas multijogador, não hesite em formar alianças temporárias contra ameaças comuns.',
    'faq': 'Perguntas frequentes',
    'can-capture-own': 'Posso capturar minhas próprias peças?',
    'can-capture-own-desc': 'Não, você só pode capturar peças inimigas. Suas próprias peças bloqueiam seus movimentos.',
    'no-valid-moves': 'O que acontece se eu não tiver mais movimentos válidos?',
    'no-valid-moves-desc': 'Se você não conseguir mover nenhuma peça, passa sua vez automaticamente.',
    'can-steal-objects': 'Os objetos podem ser roubados?',
    'can-steal-objects-desc': 'Não, os objetos são pessoais e não podem ser tomados por outros jogadores.',
    'can-change-piece': 'Posso trocar de peça depois de selecioná-la?',
    'can-change-piece-desc': 'Não, uma vez que uma peça está selecionada, você deve movê-la ou passar sua vez.',
    
    // Peças
    'cost': 'Custo',
    'range': 'Alcance',
    'movements': 'Movimentos',
    'movement-demo': 'Demo de Movimento',
    'tier-1': 'Fraco',
    'tier-2': 'Médio',
    'tier-3': 'Forte',
    'tier-4': 'Muito Forte',
    'tier-5': 'Lendário',
    'weight': 'Peso',
    
    // Página de peças - traduções faltantes
    'strength': 'Função',
    'role': 'Função',
    'all-strengths': 'Todos',
    'all-roles': 'Todos',
    'weak': 'Fraco',
    'medium': 'Médio',
    'strong': 'Forte',
    'unique': 'Único',
    'legendary': 'Lendário',
    'unknown': 'Desconhecido',
    'all-directions': 'Todas as direções (como uma rainha)',
    'directions-possible': 'direções possíveis',
    'points': 'pts',
    
    // Anúncios
    'advertisements': 'Anúncios',
    'ad-1': 'Anúncio 1',
    'ad-2': 'Anúncio 2',
    'ad-update': 'Atualização a cada 5 ações',
    
    // Idiomas
    'language': 'Idioma',
    'french': 'Français',
    'english': 'English',
    'spanish': 'Español',
    'german': 'Deutsch',
    'portuguese': 'Português'
  },
  
  it: {
    // Interfaccia principale
    'game-title': 'Video Games Battle',
    'page-title': 'Chesstendo - Draft + Scacchiera',
    'tagline': 'Dimentica gli scacchi classici, qui gli eroi dei videogiochi fanno le regole!',
    'select-players': 'Numero di giocatori',
    'select-board-size': 'Dimensione della scacchiera',
    'start-game': 'Inizia partita',
    'player': 'Giocatore',
    'players': 'giocatori',
    'faction': 'Fazione',
    'money': 'Punti',
    'team': 'Squadra',
    'next-player': 'Prossimo giocatore',
    'previous-player': 'Giocatore precedente',
    'finish-selection': 'Termina selezione',
    'start-game-button': 'Inizia partita',
    
    // Dimensioni scacchiera
    'board-small': '9x9 (Piccola)',
    'board-medium': '11x11 (Media)',
    'board-large': '15x15 (Grande)',
    
    // Fazioni
    'nintendo': 'Nintendo',
    'sega': 'SEGA',
    'playstation': 'PlayStation',
    'xbox': 'Xbox',
    
    // Re
    'king-nintendo': 'Re Nintendo',
    'king-playstation': 'Re PlayStation',
    'king-sega': 'Re SEGA',
    'king-xbox': 'Re Xbox',
    
    // Messaggi di gioco
    'game-start': 'La partita inizia!',
    'your-turn': 'Il tuo turno',
    'player-turn': 'Turno del Giocatore',
    'pieces-in-play': 'Pezzi in gioco',
    'rules': 'Regole',
    'captured-pieces': 'Pezzi catturati',
    'items': 'Oggetti',
    'timer': 'Timer',
    
    // Azioni
    'move': 'Muovi',
    'capture': 'Cattura',
    'use-item': 'Usa oggetto',
    'end-turn': 'Termina turno',
    'restart': 'Riavvia',
    'quit': 'Esci',
    
    // Messaggi di errore
    'invalid-move': 'Mossa non valida',
    'not-your-turn': 'Non è il tuo turno',
    'no-piece-selected': 'Nessun pezzo selezionato',
    'cannot-move-there': 'Non puoi muoverti lì',
    
    // Oggetti
    'bobomb': 'Bob-omb',
    'portals': 'Portali',
    'lightning': 'Fulmine',
    'star': 'Stella',
    'tetrimino': 'Tetrimino',
    'tornado': 'Tornado',
    'banana': 'Banana',
    'phoenix': 'Piuma di Fenice',
    'cursor': 'Cursore Sims',
    'heart': 'Cuore',
    'sandglass': 'Clessidra',
    'mask': 'Maschera di Majora',
    'ocarina': 'Ocarina del Tempo',
    
    // Descrizioni oggetti
    'bobomb-desc': 'Bomba esplosiva di Mario! Piazzare una bomba su una casella vuota che esploderà al prossimo turno.',
    'portals-desc': 'Teletrasporto istantaneo! Crea due portali collegati sulla scacchiera.',
    'lightning-desc': 'Fulmine distruttivo! Elimina istantaneamente un pezzo a tua scelta.',
    'star-desc': 'Rivelazione mistica! Rivela tutti i pezzi nascosti sulla scacchiera per 3 turni.',
    'tetrimino-desc': 'Blocco da costruzione! Piazzare un muro Tetrimino sulla scacchiera.',
    'tornado-desc': 'Vento distruttivo! Teletrasporta un pezzo in una posizione casuale sulla scacchiera.',
    'banana-desc': 'Trappola scivolosa! Piazzare una banana su una casella vuota che farà scivolare il prossimo pezzo che ci atterra.',
    'phoenix-desc': 'Rinascita! Resuscita un pezzo perso della tua fazione.',
    'cursor-desc': 'Controllo totale! Prendi il controllo di un pezzo nemico per 1 turno.',
    'heart-desc': 'Vita extra! Protegge un pezzo dalla cattura per 2 turni.',
    'sandglass-desc': 'Il tempo del nemico si sgretola! Riduce il timer di tutti gli avversari in base alla dimensione della scacchiera.',
    'mask-desc': 'La maschera maledetta di Termina! Forza un avversario a giocare un pezzo specifico nel suo prossimo turno.',
    'ocarina-desc': 'Lo strumento magico di Hyrule! Trasforma permanentemente un pezzo in cavallo (mosse a L).',
    
    // Messaggi oggetti
    'item-used': 'Oggetto usato',
    'item-charging': 'Oggetto in carica',
    'select-target': 'Seleziona un bersaglio',
    'select-position': 'Seleziona una posizione',
    'not-activated': 'non attivato',
    
    // Navigazione
    'play': 'Gioca',
    'pieces': 'Pezzi',
    'rules': 'Regole',
    'items': 'Oggetti',
    'credits': 'Crediti',
    'movements': 'Movimenti',
    'login': 'Accedi',
    
    // Pagine
    'available-pieces': 'Pezzi Disponibili',
    'available-items': 'Oggetti Disponibili',
    'game-rules': 'Regole del Gioco',
    'movement-demos': 'Dimostrazioni di Movimenti',
    'sort-by': 'Ordina per',
    'strength': 'Ruolo',
    'role': 'Ruolo',
    'all-roles': 'Tutti',
    'editor': 'Editore',
    'universe': 'Universo',
    'all': 'Tutti',
    
    // Regole del Gioco
    'game-objective': 'Obiettivo del Gioco',
    'game-objective-desc': 'Video Games Battle è un gioco di strategia ispirato agli scacchi dove i giocatori si affrontano con personaggi iconici dell\'universo videoludico. L\'obiettivo è catturare il re avversario per eliminare il giocatore e diventare l\'ultimo sopravvissuto.',
    'victory': 'Vittoria',
    'victory-desc': 'Essere l\'ultimo giocatore vivo catturando tutti i re avversari o eliminando tutti gli avversari per timeout.',
    'piece-types': 'Ruoli',
    'king': 'Re',
    'king-desc': 'Pezzo più importante di ogni giocatore. Si muove di una casella in tutte le direzioni. Se il tuo re viene catturato, sei eliminato dalla partita.',
    'special-pieces': 'Pezzi Speciali',
    'special-pieces-desc': 'Ogni fazione dispone di personaggi unici con movimenti e capacità specifiche:',
    'movements': 'Movimenti',
    'movements-desc': 'Ogni pezzo ha le sue regole di movimento definite da:',
    'directions': 'Direzioni',
    'directions-desc': 'Caselle adiacenti accessibili',
    'range': 'Gittata',
    'range-desc': 'Numero massimo di caselle in linea retta',
    'specialties': 'Specialità',
    'specialties-desc': 'Capacità uniche (salto, volo, ecc.)',
    'object-system': 'Sistema di Oggetti',
    'acquisition': 'Acquisizione',
    'acquisition-desc': 'Gli oggetti appaiono casualmente sulla scacchiera in casse. Ogni giocatore può raccoglierne un massimo di 3 in riserva.',
    'usage': 'Utilizzo',
    'usage-desc': 'Solo un oggetto può essere usato per turno. Gli oggetti hanno effetti vari:',
    'time-sand': 'Sabbia del Tempo',
    'time-sand-desc': 'Riduce il tempo degli avversari',
    'majora-mask': 'Maschera di Majora',
    'majora-mask-desc': 'Forza un avversario a giocare un pezzo specifico',
    'time-ocarina': 'Ocarina del Tempo',
    'time-ocarina-desc': 'Trasforma un pezzo in cavallo',
    'bomb': 'Bomba',
    'bomb-desc': 'Esplode e danneggia i pezzi adiacenti',
    'star': 'Stella',
    'star-desc': 'Rivela i pezzi nascosti',
    'weight-desc': 'Ogni oggetto ha un peso diverso che influenza la probabilità di apparizione. Più alto è il peso, più raro è l\'oggetto.',
    
    // Regole comuni degli oggetti
    'common-rules': 'Regole comuni:',
    'common-rules-1': 'Ogni giocatore può conservare fino a <strong>3 oggetti</strong> in riserva.',
    'common-rules-2': 'Si può usare solo <strong>un oggetto per turno</strong>.',
    'common-rules-3': 'Gli oggetti appaiono casualmente in casse sulla scacchiera.',
    'common-rules-4': 'Il peso di un oggetto determina la sua rarità (più alto è il peso, più raro è l\'oggetto).',
    
    // Pagina dei crediti
    'credits-title': 'CREDITI',
    'legal-warning': 'AVVISO LEGALE',
    'fan-project': 'Questo gioco è un progetto FAN senza scopo di lucro',
    'fan-project-desc': 'Tutti i personaggi, franchise e proprietà intellettuali appartengono ai loro rispettivi proprietari.',
    'no-content-sale': 'Nessun contenuto è in vendita',
    'completely-free': 'L\'intero gioco è 100% GRATUITO',
    'fan-created': 'Questo progetto è creato da fan, per fan, senza scopo commerciale.',
    'owner-of': 'Proprietario di:',
    'nintendo-owner': 'The Legend of Zelda, Super Mario, e tutti i loro franchise associati',
    'playstation-owner': 'PlayStation, Uncharted, God of War, Astro Bot e i loro franchise',
    'sega-owner': 'Sonic, Yakuza, Shinobi e i loro franchise associati',
    'xbox-owner': 'Xbox, Halo, Gears of War, Perfect Dark e i loro franchise',
    'nintendo-king': 'Re Nintendo',
    'playstation-king': 'Re PlayStation',
    'sega-king': 'Re SEGA',
    'xbox-king': 'Re Xbox',
    'nintendo-representative': 'Rappresentante Nintendo',
    'playstation-representative': 'Rappresentante PlayStation',
    'sega-representative': 'Rappresentante SEGA',
    'xbox-representative': 'Rappresentante Xbox',
    'nintendo-copyright': '© Nintendo. Tutti i diritti riservati. Nintendo è un marchio registrato di Nintendo Co., Ltd.',
    'playstation-copyright': '© Sony Interactive Entertainment. Tutti i diritti riservati. PlayStation è un marchio registrato di Sony Interactive Entertainment LLC.',
    'sega-copyright': '© SEGA Corporation. Tutti i diritti riservati. SEGA è un marchio registrato di SEGA Corporation.',
    'xbox-copyright': '© Microsoft Corporation. Tutti i diritti riservati. Xbox è un marchio registrato di Microsoft Corporation.',
    'other-properties': 'Altre Proprietà',
    'inspired-by': 'Oggetti ed elementi ispirati a:',
    'all-elements-inspired': 'Tutti gli elementi di gameplay sono ispirati a giochi esistenti e appartengono ai loro rispettivi proprietari.',
    'legal-mentions': 'MENZIONI LEGALI',
    'fan-project-legal': 'Video Games Battle è un progetto FAN non commerciale',
    'educational-purpose': 'Questo gioco è stato creato da appassionati di videogiochi solo per scopi educativi e di intrattenimento.',
    'no-paid-content': 'Nessun contenuto a pagamento',
    'completely-accessible': 'L\'intero gioco è accessibile gratuitamente',
    'no-sales': 'Nessuna vendita',
    'nothing-for-sale': 'Niente è in vendita su questo sito',
    'completely-free': '100% Gratuito',
    'all-features-available': 'Tutte le funzionalità sono disponibili senza costo',
    'community-project': 'Progetto comunitario',
    'created-by-community': 'Creato da e per la comunità gaming',
    'technical-credits': 'CREDITI TECNICI',
    'development': 'Sviluppo:',
    'game-engine': 'Motore di gioco:',
    'inspiration': 'Ispirazione:',
    'thanks': 'Ringraziamenti:',
    'community-support': 'A tutti i fan che ci sostengono e alla comunità dei giochi di strategia',
    'copyright-respect': 'Questo progetto rispetta i diritti d\'autore e i marchi registrati. Tutti i personaggi e franchise appartengono ai loro proprietari legittimi.',
    'scroll-indicator': 'Scorri verso il basso per vedere tutti i crediti',
    
    // Pagina delle regole - sezioni mancanti
    'time-system': 'Sistema di tempo',
    'optional-timer': 'Timer opzionale',
    'timer-description': 'I giocatori possono attivare un timer per limitare il tempo di riflessione per turno. Il tempo per turno varia in base alla dimensione della scacchiera:',
    'board-9x9': '9×9:',
    'board-11x11': '11×11:',
    'board-15x15': '15×15:',
    'minutes-per-turn': 'minuti per turno',
    'timeout-elimination': 'Eliminazione per timeout',
    'timeout-description': 'Se un giocatore supera il suo tempo, viene automaticamente eliminato e tutti i suoi pezzi scompaiono dalla scacchiera.',
    'game-flow': 'Svolgimento di una partita',
    'draft-phase': 'Fase di draft',
    'draft-description': 'All\'inizio di ogni partita, i giocatori selezionano i loro pezzi in un ordine definito. Ogni giocatore sceglie un pezzo a turno fino ad aver costituito il suo esercito.',
    'game-phase': 'Fase di gioco',
    'game-phase-description': 'I giocatori giocano a turni nell\'ordine definito. Ogni turno consiste in:',
    'select-piece': 'Selezionare un pezzo',
    'choose-destination': 'Scegliere una casella di destinazione valida',
    'use-object': 'Opzionalmente usare un oggetto',
    'next-player': 'Passare al giocatore successivo',
    'end-game': 'Fine partita',
    'end-game-description': 'La partita termina quando rimane solo un giocatore in vita. Questo giocatore vince!',
    
    // Consigli strategici e FAQ - traduzioni mancanti
    'strategic-tips': 'Consigli strategici',
    'king-protection': 'Protezione del re',
    'king-protection-desc': 'Il tuo re è il tuo pezzo più prezioso. Mantienilo sempre protetto da altri pezzi ed evita di esporlo inutilmente.',
    'object-management': 'Gestione degli oggetti',
    'object-management-desc': 'Gli oggetti possono cambiare il corso di una partita. Usali al momento giusto per massimizzare il loro impatto.',
    'positioning': 'Posizionamento',
    'positioning-desc': 'Controlla il centro della scacchiera per avere più opzioni di movimento e cattura.',
    'temporary-cooperation': 'Cooperazione temporanea',
    'temporary-cooperation-desc': 'Nelle partite multigiocatore, non esitare a formare alleanze temporanee contro minacce comuni.',
    'faq': 'Domande frequenti',
    'can-capture-own': 'Posso catturare i miei stessi pezzi?',
    'can-capture-own-desc': 'No, puoi catturare solo i pezzi avversari. I tuoi stessi pezzi bloccano i tuoi movimenti.',
    'no-valid-moves': 'Cosa succede se non ho più mosse valide?',
    'no-valid-moves-desc': 'Se non riesci a muovere nessun pezzo, passi automaticamente il tuo turno.',
    'can-steal-objects': 'Gli oggetti possono essere rubati?',
    'can-steal-objects-desc': 'No, gli oggetti sono personali e non possono essere presi da altri giocatori.',
    'can-change-piece': 'Posso cambiare pezzo dopo averlo selezionato?',
    'can-change-piece-desc': 'No, una volta che un pezzo è selezionato, devi muoverlo o passare il tuo turno.',
    
    // Pezzi
    'cost': 'Costo',
    'range': 'Gittata',
    'movements': 'Movimenti',
    'movement-demo': 'Demo di Movimento',
    'tier-1': 'Debole',
    'tier-2': 'Medio',
    'tier-3': 'Forte',
    'tier-4': 'Molto Forte',
    'tier-5': 'Leggendario',
    'weight': 'Peso',
    
    // Pagina dei pezzi - traduzioni mancanti
    'strength': 'Ruolo',
    'role': 'Ruolo',
    'all-strengths': 'Tutti',
    'all-roles': 'Tutti',
    'weak': 'Debole',
    'medium': 'Medio',
    'strong': 'Forte',
    'unique': 'Unico',
    'legendary': 'Leggendario',
    'unknown': 'Sconosciuto',
    'all-directions': 'Tutte le direzioni (come una regina)',
    'directions-possible': 'direzioni possibili',
    'points': 'pts',
    
    // Pubblicità
    'advertisements': 'Pubblicità',
    'ad-1': 'Annuncio 1',
    'ad-2': 'Annuncio 2',
    'ad-update': 'Aggiornamento ogni 5 azioni',
    
    // Lingue
    'language': 'Lingua',
    'french': 'Français',
    'english': 'English',
    'spanish': 'Español',
    'german': 'Deutsch',
    'portuguese': 'Português',
    'italian': 'Italiano'
  }
};

// Détection de la langue du navigateur
function detectLanguage() {
  // 1. Vérifier le localStorage pour une langue sauvegardée
  const savedLanguage = localStorage.getItem('vgb-language');
  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }
  
  // 2. Détecter la langue du navigateur
  const browserLanguage = navigator.language || navigator.userLanguage;
  const languageCode = browserLanguage.split('-')[0].toLowerCase();
  
  // 3. Vérifier si la langue est supportée
  if (translations[languageCode]) {
    return languageCode;
  }
  
  // 4. Détecter par géolocalisation (pays francophones)
  const francophoneCountries = ['FR', 'BE', 'CH', 'CA', 'LU', 'MC', 'SN', 'CI', 'ML', 'BF', 'NE', 'TD', 'MG', 'CM', 'CD', 'CF', 'GA', 'CG', 'BI', 'RW', 'DJ', 'KM', 'SC', 'VU', 'NC', 'PF', 'WF', 'YT', 'RE', 'MQ', 'GP', 'GF', 'BL', 'MF', 'PM'];
  
  // 5. Fallback par défaut
  return 'fr'; // Français par défaut
}

// Fonction de traduction
function t(key, ...args) {
  const currentLanguage = window.currentLanguage || 'fr';
  let translation = translations[currentLanguage]?.[key] || translations['fr'][key] || key;
  
  // Remplacer les arguments si fournis
  if (args.length > 0) {
    args.forEach((arg, index) => {
      translation = translation.replace(`{${index}}`, arg);
    });
  }
  
  return translation;
}

// Fonction pour traduire les noms des rois
function translateKingName(originalName) {
  const currentLanguage = window.currentLanguage || 'fr';
  
  // Mapper les noms originaux aux clés de traduction
  const kingMapping = {
    'Roi Nintendo': 'king-nintendo',
    'Roi PlayStation': 'king-playstation',
    'Roi SEGA': 'king-sega',
    'Roi Xbox': 'king-xbox'
  };
  
  const translationKey = kingMapping[originalName];
  if (translationKey) {
    return t(translationKey);
  }
  
  return originalName;
}

// Fonction pour obtenir les noms par défaut des joueurs selon la langue
function getDefaultPlayerNames(count) {
  const names = [];
  for (let i = 1; i <= count; i++) {
    names.push(`${t('player')} ${i}`);
  }
  return names;
}

// Changer de langue
function changeLanguage(languageCode) {
  if (translations[languageCode]) {
    window.currentLanguage = languageCode;
    localStorage.setItem('vgb-language', languageCode);
    updateAllTexts();
    updatePlayerNames(true); // Forcer la mise à jour des noms
    
    // Mettre à jour le sélecteur de langue dans le header
    updateHeaderLanguageSelector();
    
    // Mettre à jour les éléments dynamiques selon la page
    updateDynamicContent();
  }
}

// Mettre à jour le contenu dynamique selon la page
function updateDynamicContent() {
  // Page des pièces
  if (typeof displayPieces === 'function' && typeof applyFiltersAndSort === 'function') {
    applyFiltersAndSort();
  }
  
  // Page des objets
  if (typeof generateItemsHTML === 'function') {
    generateItemsHTML();
  }
  
  // Page principale (jeu)
  if (typeof updateTeamsDisplay === 'function') {
    updateTeamsDisplay();
  }
}

// Mettre à jour les noms des joueurs selon la langue
function updatePlayerNames(forceUpdate = false) {
  if (typeof playerNames !== 'undefined' && playerNames.length > 0) {
    const newNames = getDefaultPlayerNames(playerNames.length);
    for (let i = 0; i < playerNames.length; i++) {
      // Mettre à jour si c'est forcé ou si le nom est encore le nom par défaut
      if (forceUpdate || playerNames[i].includes('Joueur') || playerNames[i].includes('Player') || 
          playerNames[i].includes('Jugador') || playerNames[i].includes('Spieler') || 
          playerNames[i].includes('Jogador') || playerNames[i].includes('Giocatore')) {
        playerNames[i] = newNames[i];
      }
    }
    
    // Mettre à jour l'affichage si on est en mode sélection de personnages
    if (typeof updateTeamsDisplay === 'function') {
      updateTeamsDisplay();
    }
    
    // Mettre à jour l'input du nom du joueur actuel
    if (typeof updatePlayerInfo === 'function') {
      updatePlayerInfo();
    }
  }
}

// Mettre à jour le sélecteur de langue dans le header
function updateHeaderLanguageSelector() {
  const currentFlag = document.getElementById('current-flag');
  const languageDropdown = document.getElementById('language-dropdown');
  
  if (!currentFlag || !languageDropdown) {
    return;
  }
  
  // Mapper les langues aux drapeaux
  const languageFlags = {
    'fr': '🇫🇷',
    'en': '🇬🇧',
    'es': '🇪🇸',
    'de': '🇩🇪',
    'pt': '🇵🇹',
    'it': '🇮🇹'
  };
  
  // Mettre à jour le drapeau actuel
  currentFlag.textContent = languageFlags[window.currentLanguage] || '🇫🇷';
  
  // Mettre à jour les options actives
  const langOptions = languageDropdown.querySelectorAll('.lang-option');
  langOptions.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-lang') === window.currentLanguage) {
      option.classList.add('active');
    }
  });
}

// Mettre à jour tous les textes de la page
function updateAllTexts() {
  // Mettre à jour le titre de la page
  const pageTitle = document.querySelector('title[data-t]');
  if (pageTitle) {
    const key = pageTitle.getAttribute('data-t');
    pageTitle.textContent = t(key);
  }
  
  // Mettre à jour les éléments avec data-t
  document.querySelectorAll('[data-t]').forEach(element => {
    const key = element.getAttribute('data-t');
    const text = t(key);
    
    if (element.tagName === 'INPUT' && element.type === 'text') {
      element.placeholder = text;
    } else if (element.tagName === 'SELECT') {
      // Pour les selects, mettre à jour les options
      const options = element.querySelectorAll('option');
      options.forEach(option => {
        const optionKey = option.getAttribute('data-t');
        if (optionKey) {
          const optionText = t(optionKey);
          // Vérifier si le texte contient des balises HTML
          if (optionText.includes('<') && optionText.includes('>')) {
            option.innerHTML = optionText;
          } else {
            option.textContent = optionText;
          }
        }
      });
    } else if (element.tagName !== 'TITLE') {
      // Vérifier si le texte contient des balises HTML
      if (text.includes('<') && text.includes('>')) {
        element.innerHTML = text;
      } else {
        element.textContent = text;
      }
    }
  });
  
  // Mettre à jour les attributs title
  document.querySelectorAll('[data-t-title]').forEach(element => {
    const key = element.getAttribute('data-t-title');
    element.title = t(key);
  });
  
  // Mettre à jour les attributs alt
  document.querySelectorAll('[data-t-alt]').forEach(element => {
    const key = element.getAttribute('data-t-alt');
    element.alt = t(key);
  });
}

// Initialiser le système de traduction
function initTranslation() {
  window.currentLanguage = detectLanguage();
  updateAllTexts();
  
  // Initialiser les noms des joueurs
  if (typeof playerNames !== 'undefined' && playerNames.length > 0) {
    playerNames = getDefaultPlayerNames(playerNames.length);
  }
  
  // Initialiser le sélecteur de langue dans le header
  // Attendre que le header soit injecté
  const initHeader = () => {
    if (document.getElementById('current-lang-btn')) {
      initHeaderLanguageSelector();
    } else {
      setTimeout(initHeader, 100);
    }
  };
  initHeader();
}

// Initialiser le sélecteur de langue dans le header
function initHeaderLanguageSelector() {
  const currentLangBtn = document.getElementById('current-lang-btn');
  const languageDropdown = document.getElementById('language-dropdown');
  const currentFlag = document.getElementById('current-flag');
  
  if (!currentLangBtn || !languageDropdown || !currentFlag) {
    return;
  }
  
  // Éviter les doublons d'event listeners
  if (currentLangBtn.hasAttribute('data-lang-initialized')) {
    return;
  }
  currentLangBtn.setAttribute('data-lang-initialized', 'true');
  
  // Mapper les langues aux drapeaux
  const languageFlags = {
    'fr': '🇫🇷',
    'en': '🇬🇧',
    'es': '🇪🇸',
    'de': '🇩🇪',
    'pt': '🇵🇹',
    'it': '🇮🇹'
  };
  
  // Mettre à jour le drapeau actuel
  currentFlag.textContent = languageFlags[window.currentLanguage] || '🇫🇷';
  
  // Gérer l'ouverture/fermeture du dropdown
  currentLangBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = languageDropdown.style.display !== 'none';
    languageDropdown.style.display = isVisible ? 'none' : 'block';
  });
  
  // Gérer la sélection d'une langue
  const langOptions = languageDropdown.querySelectorAll('.lang-option');
  langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = option.getAttribute('data-lang');
      changeLanguage(selectedLang);
      languageDropdown.style.display = 'none';
    });
    
    // Marquer l'option active
    if (option.getAttribute('data-lang') === window.currentLanguage) {
      option.classList.add('active');
    }
  });
  
  // Fermer le dropdown en cliquant ailleurs
  document.addEventListener('click', (e) => {
    if (!currentLangBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
      languageDropdown.style.display = 'none';
    }
  });
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    translations,
    detectLanguage,
    t,
    changeLanguage,
    updateAllTexts,
    initTranslation
  };
} else {
  // Export global pour le navigateur
  window.translations = translations;
  window.detectLanguage = detectLanguage;
  window.t = t;
  window.changeLanguage = changeLanguage;
  window.updateAllTexts = updateAllTexts;
  window.initTranslation = initTranslation;
  window.translateKingName = translateKingName;
  window.getDefaultPlayerNames = getDefaultPlayerNames;
  window.updatePlayerNames = updatePlayerNames;
  window.updateDynamicContent = updateDynamicContent;
  
  // Fonction de test pour vérifier les traductions
  window.testTranslations = function() {
    console.log('=== Test des traductions ===');
    console.log('Langue actuelle:', window.currentLanguage);
    console.log('Noms des joueurs:', typeof playerNames !== 'undefined' ? playerNames : 'Non défini');
    console.log('Traduction "player":', t('player'));
    console.log('Traduction "players":', t('players'));
    console.log('Noms par défaut:', getDefaultPlayerNames(4));
    console.log('Roi Nintendo:', translateKingName('Roi Nintendo'));
    
    // Test de changement de langue
    console.log('=== Test changement de langue ===');
    console.log('Avant changement:', playerNames);
    updatePlayerNames(true);
    console.log('Après changement:', playerNames);
  };
}
