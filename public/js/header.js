(function(){
  function renderHeader(active) {
    return (
      '<header class="site-header">' +
        '<div class="header-inner">' +
          '<nav class="site-nav">' +
            '<a href="index.html" class="nav-link'+(active==='index'?' active':'')+'" data-t="play">Jouer</a>' +
            '<a href="pieces.html" class="nav-link'+(active==='pieces'?' active':'')+'" data-t="pieces">Les pièces</a>' +
            '<a href="regles.html" class="nav-link'+(active==='regles'?' active':'')+'" data-t="rules">Les règles</a>' +
            '<a href="objets.html" class="nav-link'+(active==='objets'?' active':'')+'" data-t="items">Les objets</a>' +
            '<a href="credits.html" class="nav-link'+(active==='credits'?' active':'')+'" data-t="credits">Crédits</a>' +
          '</nav>' +
          '<a href="index.html" aria-label="Accueil" class="logo-link">' +
            '<img src="public/images/site/logo-video-games-battle-256.webp" alt="Video Games Battle" class="logo" />' +
          '</a>' +
          '<div class="auth-link">' +
            '<a href="movement-demo.html" class="nav-link'+(active==='movement-demo'?' active':'')+'" data-t="movements">Mouvements</a>' +
            '<a href="login.html" class="nav-link" data-t="login">Se connecter</a>' +
            '<div class="language-selector">' +
              '<button class="language-btn" id="current-lang-btn" title="Changer de langue">' +
                '<span class="flag-icon" id="current-flag">🇫🇷</span>' +
              '</button>' +
              '<div class="language-dropdown" id="language-dropdown" style="display: none;">' +
                '<button class="lang-option" data-lang="fr" title="Français">🇫🇷 Français</button>' +
                '<button class="lang-option" data-lang="en" title="English">🇬🇧 English</button>' +
                '<button class="lang-option" data-lang="es" title="Español">🇪🇸 Español</button>' +
                '<button class="lang-option" data-lang="de" title="Deutsch">🇩🇪 Deutsch</button>' +
                '<button class="lang-option" data-lang="pt" title="Português">🇵🇹 Português</button>' +
                '<button class="lang-option" data-lang="it" title="Italiano">🇮🇹 Italiano</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }

  function injectHeader(active) {
    var placeholder = document.getElementById('header-root');
    if (!placeholder) return;
    placeholder.outerHTML = renderHeader(active);
    
    // Réinitialiser le sélecteur de langue après injection du header
    if (typeof initHeaderLanguageSelector === 'function') {
      setTimeout(() => {
        initHeaderLanguageSelector();
      }, 100);
    }
  }

  window.VGBHeader = { injectHeader: injectHeader };
})();


