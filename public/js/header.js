(function(){
  function renderHeader(active) {
    return (
      '<header class="site-header">' +
        '<div class="header-inner">' +
          '<button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="site-nav-panel" aria-label="Menu">' +
            '<span class="nav-toggle-bar" aria-hidden="true"></span>' +
            '<span class="nav-toggle-bar" aria-hidden="true"></span>' +
            '<span class="nav-toggle-bar" aria-hidden="true"></span>' +
          '</button>' +
          '<nav class="site-nav" id="site-nav-panel">' +
            '<a href="index.html" class="nav-link'+(active==='index'?' active':'')+'" data-t="play">Jouer</a>' +
            '<a href="classement.html" class="nav-link'+(active==='classement'?' active':'')+'">Classement</a>' +
            '<a href="deck.html" class="nav-link'+(active==='deck'?' active':'')+'">Mes decks</a>' +
            '<a href="pieces.html" class="nav-link'+(active==='pieces'?' active':'')+'" data-t="pieces">Les pièces</a>' +
            '<a href="regles.html" class="nav-link'+(active==='regles'?' active':'')+'" data-t="rules">Les règles</a>' +
            '<a href="objets.html" class="nav-link'+(active==='objets'?' active':'')+'" data-t="items">Les objets</a>' +
            '<a href="movement-demo.html" class="nav-link nav-link-mobile-only'+(active==='movement-demo'?' active':'')+'" data-t="movements">Mouvements</a>' +
            '<a href="credits.html" class="nav-link'+(active==='credits'?' active':'')+'" data-t="credits">Crédits</a>' +
            '<a href="login.html" class="nav-link nav-link-mobile-only" data-t="login">Se connecter</a>' +
          '</nav>' +
          '<a href="index.html" aria-label="Accueil" class="logo-link">' +
            '<img src="public/images/site/logo-video-games-battle-256.webp" alt="Video Games Battle" class="logo" />' +
          '</a>' +
          '<div class="auth-link">' +
            '<a href="movement-demo.html" class="nav-link nav-link-desktop-only'+(active==='movement-demo'?' active':'')+'" data-t="movements">Mouvements</a>' +
            '<a href="login.html" class="nav-link nav-link-desktop-only" data-t="login">Se connecter</a>' +
            '<div class="language-selector">' +
              '<button class="language-btn" id="current-lang-btn" title="Changer de langue" type="button">' +
                '<span class="flag-icon" id="current-flag">🇫🇷</span>' +
              '</button>' +
              '<div class="language-dropdown" id="language-dropdown" style="display: none;">' +
                '<button class="lang-option" data-lang="fr" title="Français" type="button">🇫🇷 Français</button>' +
                '<button class="lang-option" data-lang="en" title="English" type="button">🇬🇧 English</button>' +
                '<button class="lang-option" data-lang="es" title="Español" type="button">🇪🇸 Español</button>' +
                '<button class="lang-option" data-lang="de" title="Deutsch" type="button">🇩🇪 Deutsch</button>' +
                '<button class="lang-option" data-lang="pt" title="Português" type="button">🇵🇹 Português</button>' +
                '<button class="lang-option" data-lang="it" title="Italiano" type="button">🇮🇹 Italiano</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="nav-backdrop" id="nav-backdrop" hidden></div>' +
      '</header>'
    );
  }

  function bindMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('site-nav-panel');
    var backdrop = document.getElementById('nav-backdrop');
    if (!toggle || !panel) return;

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (backdrop) backdrop.hidden = !open;
    }

    toggle.addEventListener('click', function() {
      setOpen(!document.body.classList.contains('nav-open'));
    });

    if (backdrop) {
      backdrop.addEventListener('click', function() { setOpen(false); });
    }

    panel.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() { setOpen(false); });
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) setOpen(false);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function injectHeader(active) {
    var placeholder = document.getElementById('header-root');
    if (!placeholder) return;
    placeholder.outerHTML = renderHeader(active);
    bindMobileNav();

    if (typeof initHeaderLanguageSelector === 'function') {
      setTimeout(function() {
        initHeaderLanguageSelector();
      }, 100);
    }
  }

  window.VGBHeader = { injectHeader: injectHeader };
})();
