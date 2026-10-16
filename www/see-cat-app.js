/* See Cat — comportement « application » : service worker, bandeau d'installation, confort en mode plein écran. */
(function () {
  // Dans l'APK (Capacitor), l'app est déjà « installée » : pas de bandeau, pas de service worker
  var native = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  var standalone = native || (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;

  // 1) Hors connexion : enregistrement du service worker (HTTPS ou localhost uniquement)
  if (!native && 'serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  // 2) Confort en mode application : pas de rebond de page, pas de surbrillance au toucher
  if (standalone) {
    var st = document.createElement('style');
    st.textContent = 'html,body{overscroll-behavior-y:none}*{-webkit-tap-highlight-color:transparent}' +
      'body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}input,textarea,[contenteditable]{-webkit-user-select:text;user-select:text}';
    // La connexion Google (fenêtre popup) ne fonctionne pas dans une WebView Android : on la masque dans l'APK
    if (native) st.textContent += '#google-btn,.auth-divider{display:none!important}';
    (document.head || document.documentElement).appendChild(st);
    return;                                   // déjà installée : pas de bandeau
  }

  // 3) Bandeau « Installer l'application » (Android/Chrome) ou mode d'emploi (iPhone/iPad)
  var path = location.pathname, skip = /(player|auth|codevalider)\.html$/.test(path);
  var ua = navigator.userAgent, ios = /iphone|ipad|ipod/i.test(ua) && !/crios|fxios|edgios/i.test(ua);
  var deferred = null, shown = false;
  try { var t = +localStorage.getItem('seecat_install_dismissed') || 0; if (Date.now() - t < 7 * 864e5) skip = true; } catch (e) {}
  if (skip) return;

  var CSS = ':host{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:block;pointer-events:none}' +
    '*{box-sizing:border-box;margin:0}' +
    '.b{pointer-events:auto;margin:0 auto 14px;margin-bottom:calc(14px + env(safe-area-inset-bottom,0px));width:min(560px,calc(100% - 24px));display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding:14px 16px;' +
    'background:rgba(18,18,32,.97);border:1px solid rgba(255,255,255,.1);border-radius:14px;box-shadow:0 14px 44px rgba(0,0,0,.6);color:#f0f0f0;font-family:Inter,system-ui,sans-serif;animation:up .5s cubic-bezier(.2,.8,.2,1) both}' +
    '@keyframes up{from{transform:translateY(120%);opacity:0}to{transform:none;opacity:1}}' +
    '.i{flex:0 0 auto;width:46px;height:46px;border-radius:11px}' +
    '.t{flex:1 1 150px;min-width:0}.a{display:flex;align-items:center;gap:4px;margin-left:auto}.t b{display:block;font-size:14.5px;font-weight:700}.t span{display:block;font-size:12.5px;color:#9a9ab8;line-height:1.4;margin-top:2px}' +
    'button{font:700 13.5px Inter,system-ui,sans-serif;border:0;border-radius:8px;padding:10px 16px;cursor:pointer}' +
    '.go{background:#ff7e29;color:#fff}.x{background:transparent;color:#9a9ab8;padding:10px 6px;font-weight:600}' +
    'button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '@media (prefers-reduced-motion:reduce){.b{animation:none}}';

  function show() {
    if (shown || (!deferred && !ios)) return;
    if (document.getElementById('seecat-intro')) { setTimeout(show, 800); return; }   // on attend la fin de l'intro
    shown = true;
    var host = document.createElement('div'); host.id = 'seecat-install';
    var root = host.attachShadow({ mode: 'open' });
    var share = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff7e29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><path d="M12 3v12M8 7l4-4 4 4M5 12v8h14v-8"/></svg>';
    root.innerHTML = '<style>' + CSS + '</style><div class="b" role="dialog" aria-label="Installer See Cat"><img class="i" src="icons/icon-192.png" alt="">' +
      '<div class="t"><b>Installe See Cat</b><span>' + (deferred ? "Ajoute l'application à ton écran d'accueil." : 'Touche ' + share + ' Partager, puis « Sur l\'écran d\'accueil ».') + '</span></div>' +
      '<div class="a">' + (deferred ? '<button class="go" type="button">Installer</button>' : '') + '<button class="x" type="button" aria-label="Fermer">Plus tard</button></div></div>';
    document.documentElement.appendChild(host);
    function close(remember) { host.remove(); if (remember) { try { localStorage.setItem('seecat_install_dismissed', String(Date.now())); } catch (e) {} } }
    root.querySelector('.x').addEventListener('click', function () { close(true); });
    var go = root.querySelector('.go');
    if (go) go.addEventListener('click', function () {
      var d = deferred; deferred = null; close(false);
      d.prompt(); d.userChoice && d.userChoice.then(function (r) { if (r.outcome !== 'accepted') { try { localStorage.setItem('seecat_install_dismissed', String(Date.now())); } catch (e) {} } });
    });
  }
  addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; setTimeout(show, 5000); });
  addEventListener('appinstalled', function () { var h = document.getElementById('seecat-install'); if (h) h.remove(); });
  if (ios) addEventListener('load', function () { setTimeout(show, 6000); });
})();
