/**
 * Helpers profil : avatar + drapeau de nationalité.
 */
(function (global) {
  const AVATARS = [
    { url: "/images/nintendo/characters/mario.png", label: "Mario" },
    { url: "/images/nintendo/characters/luigi.png", label: "Luigi" },
    { url: "/images/nintendo/characters/peach.png", label: "Peach" },
    { url: "/images/nintendo/characters/bowser.png", label: "Bowser" },
    { url: "/images/nintendo/characters/link.png", label: "Link" },
    { url: "/images/nintendo/characters/zelda.png", label: "Zelda" },
    { url: "/images/nintendo/characters/samus.png", label: "Samus" },
    { url: "/images/nintendo/characters/kirby.png", label: "Kirby" },
    { url: "/images/nintendo/characters/pikachu.png", label: "Pikachu" },
    { url: "/images/nintendo/characters/fox-mccloud.png", label: "Fox" },
    { url: "/images/sega/characters/sonic.png", label: "Sonic" },
    { url: "/images/sega/characters/tails.png", label: "Tails" },
    { url: "/images/playstation/characters/kratos.png", label: "Kratos" },
    { url: "/images/playstation/characters/astro-bot.png", label: "Astro" },
    { url: "/images/xbox/characters/masterchief.png", label: "Chief" },
    { url: "/images/xbox/characters/crash-bandicoot.png", label: "Crash" }
  ];

  const TITLES = [
    { id: "default-nouveau", label: "Nouveau joueur" },
    { id: "default-amateur", label: "Amateur d'échecs" },
    { id: "default-collectionneur", label: "Collectionneur de jeux vidéo" },
    { id: "default-retro", label: "Fan de rétro" },
    { id: "default-curieux", label: "Curieux du plateau" }
  ];

  /** Pays courants pour le sélecteur (ISO + emoji). */
  const COUNTRIES = [
    { code: "FR", flag: "🇫🇷", name: "France" },
    { code: "BE", flag: "🇧🇪", name: "Belgique" },
    { code: "CH", flag: "🇨🇭", name: "Suisse" },
    { code: "CA", flag: "🇨🇦", name: "Canada" },
    { code: "US", flag: "🇺🇸", name: "États-Unis" },
    { code: "GB", flag: "🇬🇧", name: "Royaume-Uni" },
    { code: "ES", flag: "🇪🇸", name: "Espagne" },
    { code: "PT", flag: "🇵🇹", name: "Portugal" },
    { code: "IT", flag: "🇮🇹", name: "Italie" },
    { code: "DE", flag: "🇩🇪", name: "Allemagne" },
    { code: "NL", flag: "🇳🇱", name: "Pays-Bas" },
    { code: "JP", flag: "🇯🇵", name: "Japon" },
    { code: "KR", flag: "🇰🇷", name: "Corée du Sud" },
    { code: "BR", flag: "🇧🇷", name: "Brésil" },
    { code: "MX", flag: "🇲🇽", name: "Mexique" },
    { code: "AR", flag: "🇦🇷", name: "Argentine" },
    { code: "AU", flag: "🇦🇺", name: "Australie" },
    { code: "PL", flag: "🇵🇱", name: "Pologne" },
    { code: "SE", flag: "🇸🇪", name: "Suède" },
    { code: "NO", flag: "🇳🇴", name: "Norvège" },
    { code: "DK", flag: "🇩🇰", name: "Danemark" },
    { code: "FI", flag: "🇫🇮", name: "Finlande" },
    { code: "IE", flag: "🇮🇪", name: "Irlande" },
    { code: "AT", flag: "🇦🇹", name: "Autriche" },
    { code: "CZ", flag: "🇨🇿", name: "Tchéquie" },
    { code: "RO", flag: "🇷🇴", name: "Roumanie" },
    { code: "TR", flag: "🇹🇷", name: "Turquie" },
    { code: "RU", flag: "🇷🇺", name: "Russie" },
    { code: "CN", flag: "🇨🇳", name: "Chine" },
    { code: "IN", flag: "🇮🇳", name: "Inde" },
    { code: "MA", flag: "🇲🇦", name: "Maroc" },
    { code: "TN", flag: "🇹🇳", name: "Tunisie" },
    { code: "DZ", flag: "🇩🇿", name: "Algérie" },
    { code: "SN", flag: "🇸🇳", name: "Sénégal" },
    { code: "CI", flag: "🇨🇮", name: "Côte d’Ivoire" }
  ];

  function countryMeta(code) {
    const c = String(code || "").toUpperCase();
    return COUNTRIES.find(function (x) { return x.code === c; }) || null;
  }

  function flagEmoji(code) {
    const meta = countryMeta(code);
    if (meta) return meta.flag;
    const c = String(code || "").toUpperCase();
    if (!/^[A-Z]{2}$/.test(c)) return "";
    // Fallback regional indicator symbols
    return String.fromCodePoint(...[...c].map(function (ch) {
      return 127397 + ch.charCodeAt(0);
    }));
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Badge compact : avatar + drapeau + pseudo (HTML). */
  function userBadgeHtml(user, opts) {
    const o = opts || {};
    const name = escapeHtml((user && user.username) || o.fallbackName || "Joueur");
    const avatar = user && user.avatarUrl ? String(user.avatarUrl) : "";
    const flag = flagEmoji(user && user.countryCode);
    const size = o.size || 22;
    let html = '<span class="vgb-user-badge" style="display:inline-flex;align-items:center;gap:6px;vertical-align:middle;">';
    if (avatar) {
      html += '<img class="vgb-user-avatar" src="' + escapeHtml(avatar) + '" alt="" width="' + size + '" height="' + size + '" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover;background:rgba(0,0,0,.25);flex-shrink:0;" />';
    }
    if (flag && !o.hideFlag) {
      html += '<span class="vgb-user-flag" title="' + escapeHtml((user && user.countryCode) || "") + '" style="font-size:' + Math.max(14, size * 0.72) + 'px;line-height:1;">' + flag + "</span>";
    }
    html += '<span class="vgb-user-name">' + name + "</span>";
    html += "</span>";
    return html;
  }

  global.VGBProfile = {
    AVATARS,
    TITLES,
    COUNTRIES,
    countryMeta,
    flagEmoji,
    userBadgeHtml,
    escapeHtml,
    titleLabel: function (userOrId) {
      if (!userOrId) return "";
      if (typeof userOrId === "string") {
        const hit = TITLES.find(function (t) { return t.id === userOrId; });
        return hit ? hit.label : "";
      }
      if (userOrId.title) return String(userOrId.title);
      if (userOrId.titleId) {
        const hit = TITLES.find(function (t) { return t.id === userOrId.titleId; });
        return hit ? hit.label : "";
      }
      return "";
    }
  };
})(window);
