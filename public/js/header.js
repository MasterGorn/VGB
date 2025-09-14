(function(){
  function renderHeader(active) {
    return (
      '<header style="position:sticky; top:0; z-index:5000; background:#ffffffcc; backdrop-filter:saturate(120%) blur(6px); box-shadow:0 4px 16px rgba(0,0,0,0.12); overflow:visible;">' +
        '<div class="inner" style="max-width:1200px; margin:0 auto; padding:10px 16px; display:flex; align-items:center; justify-content:space-between; position:relative; height:64px;">' +
          '<nav style="display:flex; gap:14px; align-items:center;">' +
            '<a href="index.html" style="font:14px Arial; color:#111; text-decoration:none; padding:6px 10px; border-radius:6px;'+(active==='index'?' background:#dde8ff;':'')+'">Jouer</a>' +
            '<a href="pieces.html" style="font:14px Arial; color:#111; text-decoration:none; padding:6px 10px; border-radius:6px;'+(active==='pieces'?' background:#dde8ff;':'')+'">Les pièces</a>' +
            '<a href="regles.html" style="font:14px Arial; color:#111; text-decoration:none; padding:6px 10px; border-radius:6px;'+(active==='regles'?' background:#dde8ff;':'')+'">Les règles</a>' +
            '<a href="objets.html" style="font:14px Arial; color:#111; text-decoration:none; padding:6px 10px; border-radius:6px;'+(active==='objets'?' background:#dde8ff;':'')+'">Les objets</a>' +
            '<a href="credits.html" style="font:14px Arial; color:#111; text-decoration:none; padding:6px 10px; border-radius:6px;'+(active==='credits'?' background:#dde8ff;':'')+'">Crédits</a>' +
          '</nav>' +
          '<a href="index.html" aria-label="Accueil" style="position:absolute; left:50%; top:0; transform:translateX(-50%); display:inline-flex; align-items:center;">' +
            '<img src="public/images/site/logo-video-games-battle-256.png" alt="Video Games Battle" style="height:86px; width:86px; object-fit:contain; display:block;" />' +
          '</a>' +
          '<div><a href="login.html" style="font:14px Arial; color:#111; text-decoration:none; padding:6px 10px; border-radius:6px;">Se connecter</a></div>' +
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


