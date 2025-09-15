(function(){
  function renderHeader(active) {
    return (
      '<header class="site-header">' +
        '<div class="header-inner">' +
          '<nav class="site-nav">' +
            '<a href="index.html" class="nav-link'+(active==='index'?' active':'')+'">Jouer</a>' +
            '<a href="pieces.html" class="nav-link'+(active==='pieces'?' active':'')+'">Les pièces</a>' +
            '<a href="regles.html" class="nav-link'+(active==='regles'?' active':'')+'">Les règles</a>' +
            '<a href="objets.html" class="nav-link'+(active==='objets'?' active':'')+'">Les objets</a>' +
            '<a href="credits.html" class="nav-link'+(active==='credits'?' active':'')+'">Crédits</a>' +
          '</nav>' +
          '<a href="index.html" aria-label="Accueil" class="logo-link">' +
            '<img src="public/images/site/logo-video-games-battle-256.png" alt="Video Games Battle" class="logo" />' +
          '</a>' +
          '<div class="auth-link"><a href="login.html" class="nav-link">Se connecter</a></div>' +
        '</div>' +
      '</header>'
    );
  }

  function injectHeader(active) {
    var placeholder = document.getElementById('header-root');
    if (!placeholder) return;
    placeholder.outerHTML = renderHeader(active);
  }

  window.VGBHeader = { injectHeader: injectHeader };
})();


