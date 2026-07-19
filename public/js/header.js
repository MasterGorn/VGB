(function(){
  var LOGIN_HREF = 'login.html';

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getSessionUser() {
    if (typeof VGBOnline !== 'undefined' && VGBOnline.user && VGBOnline.user.username) {
      return VGBOnline.user;
    }
    try {
      var raw = localStorage.getItem('vgb_online_session');
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data && data.user && data.user.username) return data.user;
    } catch (e) {}
    return null;
  }

  function authLabel(user) {
    if (!user || !user.username) return 'Se connecter';
    var elo = (typeof user.elo === 'number') ? user.elo : (user.elo || '—');
    return escapeHtml(user.username) + ' <span class="nav-elo">' + escapeHtml(elo) + ' Elo</span>';
  }

  function renderAuthLink(extraClass, active) {
    var user = getSessionUser();
    var isLogin = active === 'login';
    var cls = 'nav-link header-auth-link ' + extraClass + (isLogin ? ' active' : '') + (user ? ' nav-link-user' : '');
    var label = user ? authLabel(user) : '<span data-t="login">Se connecter</span>';
    var title = user ? (user.username + ' — ' + (user.elo != null ? user.elo : '—') + ' Elo') : 'Se connecter';
    return '<a href="' + LOGIN_HREF + '" class="' + cls + '" title="' + escapeHtml(title) + '">' + label + '</a>';
  }

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
            '<a href="objets.html" class="nav-link'+(active==='objets'?' active':'')+'" data-t="items">Les objets</a>' +
            '<a href="regles.html" class="nav-link'+(active==='regles'?' active':'')+'" data-t="rules">Les règles</a>' +
            renderAuthLink('nav-link-mobile-only', active) +
          '</nav>' +
          '<a href="index.html" aria-label="Accueil" class="logo-link">' +
            '<img src="public/images/site/logo-video-games-battle-256.webp" alt="Video Games Battle" class="logo" />' +
          '</a>' +
          '<div class="auth-link">' +
            renderAuthLink('nav-link-desktop-only', active) +
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

  function renderFooter(active) {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer">' +
        '<div class="footer-inner">' +
          '<a href="credits.html" class="footer-link'+(active==='credits'?' active':'')+'" data-t="credits">Crédits</a>' +
          '<span class="footer-sep" aria-hidden="true">·</span>' +
          '<span class="footer-copy">&copy; ' + year + ' Video Games Battle</span>' +
        '</div>' +
      '</footer>'
    );
  }

  function injectFooter(active) {
    if (document.querySelector('.site-footer')) return;
    var placeholder = document.getElementById('footer-root');
    if (placeholder) {
      placeholder.outerHTML = renderFooter(active);
    } else {
      document.body.insertAdjacentHTML('beforeend', renderFooter(active));
    }
  }

  function refreshAuth() {
    var user = getSessionUser();
    document.querySelectorAll('.header-auth-link').forEach(function(link) {
      var isUser = !!user;
      link.classList.toggle('nav-link-user', isUser);
      if (isUser) {
        link.removeAttribute('data-t');
        link.innerHTML = authLabel(user);
        link.title = user.username + ' — ' + (user.elo != null ? user.elo : '—') + ' Elo';
      } else {
        link.setAttribute('data-t', 'login');
        link.innerHTML = 'Se connecter';
        link.title = 'Se connecter';
      }
    });
  }

  function injectHeader(active) {
    var placeholder = document.getElementById('header-root');
    if (!placeholder) return;
    placeholder.outerHTML = renderHeader(active);
    bindMobileNav();
    injectFooter(active);
    refreshAuth();

    if (typeof VGBOnline !== 'undefined' && typeof VGBOnline.refreshMe === 'function') {
      VGBOnline.refreshMe().then(function() {
        refreshAuth();
      }).catch(function() {});
    }

    if (typeof initHeaderLanguageSelector === 'function') {
      setTimeout(function() {
        initHeaderLanguageSelector();
      }, 100);
    }
  }

  window.VGBHeader = {
    injectHeader: injectHeader,
    injectFooter: injectFooter,
    refreshAuth: refreshAuth
  };
})();
