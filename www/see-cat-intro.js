/* ============================================================
   See Cat — intro d'ouverture (style Netflix)
   Utilisation : ajouter dans le <head> de chaque page, le plus haut possible :
       <script src="see-cat-intro.js"></script>
   - Joue une seule fois par session (à l'ouverture de l'app).
   - Un clic / une touche (Echap, Entrée) la passe.
   - Ajouter ?nointro à l'adresse la désactive, ?intro la force (pour tester).
   - Le son se joue seulement si le navigateur l'autorise.
   ============================================================ */
(function () {
  try {
    var q = location.search;
    if (q.indexOf('nointro') > -1) return;
    if (q.indexOf('intro') < 0) {
      if (sessionStorage.getItem('seecat_intro') === '1') return;
      if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { sessionStorage.setItem('seecat_intro', '1'); return; }
    }
    sessionStorage.setItem('seecat_intro', '1');
  } catch (e) {}

  var CSS = ":host{position:fixed;inset:0;z-index:2147483647;display:block;background:#000;--u:calc(min(100vw,177.78vh)/100)}\n@media (max-aspect-ratio:1/1){:host{--u:1.5vw}}\n*{margin:0;box-sizing:border-box}\n:host(:not(.go)) *{animation-play-state:paused!important}\n.scene{position:absolute;inset:0;overflow:hidden;background:#000;animation:out .6s 4.15s both}\n@keyframes out{to{opacity:0}}\n.scene::after{content:\"\";position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 50%,#000c 100%);pointer-events:none}\n.cam{position:absolute;inset:0;animation:shake .75s 2.4s both}\n@keyframes shake{0%{transform:translate(0,0)}10%{transform:translate(calc(var(--u)*-1.2),calc(var(--u)*.8))}20%{transform:translate(calc(var(--u)*1),calc(var(--u)*-.9))}30%{transform:translate(calc(var(--u)*-.8),calc(var(--u)*-.6))}40%{transform:translate(calc(var(--u)*.7),calc(var(--u)*.6))}55%{transform:translate(calc(var(--u)*-.4),calc(var(--u)*.3))}70%{transform:translate(calc(var(--u)*.25),calc(var(--u)*-.2))}100%{transform:translate(0,0)}}\n.glow{position:absolute;inset:0;margin:auto;width:calc(var(--u)*80);height:calc(var(--u)*34);background:radial-gradient(closest-side,#ff7e2988,transparent);opacity:0;animation:glow 2.4s 2.4s both}\n@keyframes glow{0%{opacity:0;transform:scale(.5)}20%{opacity:1;transform:scale(1.1)}100%{opacity:.55;transform:scale(1.2)}}\n.eyes{position:absolute;inset:0;margin:auto;width:calc(var(--u)*29);height:calc(var(--u)*16);display:flex;gap:calc(var(--u)*7);align-items:center;justify-content:center;animation:zoom .45s 1.95s cubic-bezier(.6,0,1,.6) both}\n@keyframes zoom{from{transform:scale(1);opacity:1}to{transform:scale(7);opacity:0}}\n.eye{width:calc(var(--u)*11);height:calc(var(--u)*6);overflow:visible;filter:drop-shadow(0 0 calc(var(--u)*2) #ff7e29);opacity:0;transform:scaleY(.04);animation:open .8s .8s cubic-bezier(.2,.8,.2,1) both,glowUp 1s 1.3s both}\n@keyframes open{0%{opacity:0;transform:scaleY(.04)}12%{opacity:1}100%{opacity:1;transform:scaleY(1)}}\n@keyframes glowUp{from{filter:drop-shadow(0 0 calc(var(--u)*2) #ff7e29)}to{filter:drop-shadow(0 0 calc(var(--u)*4.5) #ffb070)}}\n.pu{transform-box:fill-box;transform-origin:center;animation:pup 1s 1.2s both}\n@keyframes pup{to{transform:scaleX(.4)}}\n.flash{position:absolute;inset:0;z-index:3;background:#fff1de;opacity:0;animation:flash .42s 2.38s both}\n@keyframes flash{0%{opacity:0}18%{opacity:.9}100%{opacity:0}}\n.ring{position:absolute;inset:0;margin:auto;width:calc(var(--u)*10);height:calc(var(--u)*10);border:calc(var(--u)*.5) solid #ff9a4d;border-radius:50%;opacity:0;animation:ring 1.2s 2.4s ease-out both}\n.ring.r2{border-width:calc(var(--u)*.25);animation-delay:2.52s}\n@keyframes ring{0%{opacity:0;transform:scale(.2)}6%{opacity:.9}100%{opacity:0;transform:scale(9)}}\n.streak{position:absolute;inset:0;margin:auto;height:calc(var(--u)*.35);width:calc(var(--u)*90);background:linear-gradient(90deg,transparent,#ffb070,#fff,#ffb070,transparent);box-shadow:0 0 calc(var(--u)*2) #ff7e29;opacity:0;animation:streak 1s 2.45s both}\n@keyframes streak{0%{opacity:0;transform:scaleX(0)}25%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(1.2)}}\n.lgw{position:absolute;inset:0;display:grid;place-items:center;animation:push 2.4s 2.4s linear both}\n@keyframes push{from{transform:scale(1)}to{transform:scale(1.06)}}\n.lg{display:flex;align-items:center;gap:calc(var(--u)*1.8);color:#ff7e29;font:400 calc(var(--u)*13)/1 'Bebas Neue',Impact,sans-serif;opacity:0;animation:slam .9s 2.4s cubic-bezier(.1,.9,.2,1) both}\n@keyframes slam{0%{opacity:0;transform:scale(3.2);filter:blur(calc(var(--u)*1.6))}28%{opacity:1}100%{opacity:1;transform:scale(1);filter:blur(0)}}\n.cat{height:.82em;width:auto;fill:currentColor}\n.tx{display:flex;letter-spacing:.1em;text-shadow:0 0 calc(var(--u)*2.5) #ff7e2988;animation:gl .6s 2.4s both}\n.sp{display:inline-block;width:.3em}\n@keyframes gl{from{text-shadow:calc(var(--u)*-.9) 0 #00e5ff,calc(var(--u)*.9) 0 #ff3d81}to{text-shadow:0 0 calc(var(--u)*2.5) #ff7e2988}}\n.sk{position:absolute;left:50%;top:50%;width:calc(var(--u)*.5);height:calc(var(--u)*.5);border-radius:50%;background:#ffb070;box-shadow:0 0 calc(var(--u)*1) #ff7e29;opacity:0;animation:spark 1.7s 2.4s ease-out both}\n@keyframes spark{0%{opacity:0;transform:translate(0,0)}10%{opacity:1}100%{opacity:0;transform:translate(calc(var(--u)*var(--xn)),calc(var(--u)*var(--yn)))}}";
  var HTML = "<div class=\"scene\" id=\"scene\"><div class=\"cam\"><div class=\"glow\"></div><div class=\"eyes\"><svg class=\"eye\" viewBox=\"0 0 100 54\" aria-hidden=\"true\"><defs><radialGradient id=\"ir1\" cx=\"50%\" cy=\"50%\" r=\"55%\"><stop offset=\"0\" stop-color=\"#ffe08a\"/><stop offset=\".45\" stop-color=\"#ff9a2e\"/><stop offset=\"1\" stop-color=\"#8a2f00\"/></radialGradient></defs><path d=\"M2 27Q50 -8 98 27Q50 62 2 27Z\" fill=\"url(#ir1)\"/><ellipse class=\"pu\" cx=\"50\" cy=\"27\" rx=\"7\" ry=\"23\" fill=\"#000\"/></svg><svg class=\"eye\" viewBox=\"0 0 100 54\" aria-hidden=\"true\"><defs><radialGradient id=\"ir2\" cx=\"50%\" cy=\"50%\" r=\"55%\"><stop offset=\"0\" stop-color=\"#ffe08a\"/><stop offset=\".45\" stop-color=\"#ff9a2e\"/><stop offset=\"1\" stop-color=\"#8a2f00\"/></radialGradient></defs><path d=\"M2 27Q50 -8 98 27Q50 62 2 27Z\" fill=\"url(#ir2)\"/><ellipse class=\"pu\" cx=\"50\" cy=\"27\" rx=\"7\" ry=\"23\" fill=\"#000\"/></svg></div><div class=\"ring\"></div><div class=\"ring r2\"></div><div class=\"streak\"></div><div class=\"lgw\"><div class=\"lg\"><svg class=\"cat\" viewBox=\"0 0 576 512\" aria-hidden=\"true\"><path d=\"M320 192l17.1 0c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4l0 4 0 32 0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-140.8L280 448l56 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-144 0c-53 0-96-43-96-96l0-223.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3l0 85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5s0 0 0 0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32c0 0 0 0 0 0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128c0 0 0 0 0 0l0-96 0-20 0-1.3C352 4.8 356.7 .1 362.6 0l.2 0c3.3 0 6.4 1.6 8.4 4.2c0 0 0 0 0 .1L384 21.3l27.2 36.3L416 64l64 0 4.8-6.4L512 21.3 524.8 4.3c0 0 0 0 0-.1c2-2.6 5.1-4.2 8.4-4.2l.2 0C539.3 .1 544 4.8 544 10.7l0 1.3 0 20 0 96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z\"/></svg><div class=\"tx\">SEE<span class=\"sp\"></span>CAT</div></div></div></div><div class=\"flash\"></div></div>";

  var host = document.createElement('div');
  host.id = 'seecat-intro';
  host.setAttribute('aria-hidden', 'true');
  var root = host.attachShadow({ mode: 'open' });
  root.innerHTML = '<style>' + CSS + '</style>' + HTML;
  document.documentElement.appendChild(host);
  var de = document.documentElement, prevOv = de.style.overflow;
  de.style.overflow = 'hidden';

  if (!document.querySelector('link[href*="Bebas"]')) {
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
    document.head && document.head.appendChild(l);
  }

  var done = false, ctx = null, started = false;
  function rm() { host.remove(); de.style.overflow = prevOv; }
  function end(fast) {
    if (done) return; done = true;
    if (ctx) { try { ctx.close(); } catch (e) {} }
    if (fast) { host.style.transition = 'opacity .25s'; host.style.opacity = '0'; setTimeout(rm, 270); } else rm();
  }
  host.addEventListener('click', function () { end(true); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') end(true); });

  // étincelles
  (function () {
    var s = root.getElementById('scene');
    for (var i = 0; i < 26; i++) {
      var a = (i * 137.5 % 360) * Math.PI / 180, d = 16 + (i * 37 % 26), e = document.createElement('i');
      e.className = 'sk';
      e.style.cssText = '--xn:' + (Math.cos(a) * d).toFixed(1) + ';--yn:' + (Math.sin(a) * d * .55).toFixed(1) + ';animation-delay:' + (2.4 + (i % 5) * .03).toFixed(2) + 's';
      s.appendChild(e);
    }
  })();

  // ---------- son « battements + impact » (seulement si le navigateur l'autorise) ----------
  function sting(c) {
    var t0 = c.currentTime + .03;
    var master = c.createGain(), comp = c.createDynamicsCompressor(), bus = c.createGain(), fx = c.createGain();
    master.gain.setValueAtTime(.9, t0); master.gain.setValueAtTime(.9, t0 + 4.1); master.gain.linearRampToValueAtTime(0, t0 + 4.8);
    var len = c.sampleRate * 3.2, ir = c.createBuffer(2, len, c.sampleRate);
    for (var k = 0; k < 2; k++) { var d = ir.getChannelData(k); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2); }
    var rv = c.createConvolver(); rv.buffer = ir; var rg = c.createGain(); rg.gain.value = .5;
    bus.connect(comp); fx.connect(comp); fx.connect(rv); rv.connect(rg); rg.connect(comp); comp.connect(master); master.connect(c.destination);
    var nb = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), nd = nb.getChannelData(0); for (var j = 0; j < nd.length; j++) nd[j] = Math.random() * 2 - 1;
    function tone(f, t, d, type, v, lp, a, r, det, dest) {
      var o = c.createOscillator(), g = c.createGain(), fl = c.createBiquadFilter();
      o.type = type; o.frequency.value = f; if (det) o.detune.value = det; fl.type = 'lowpass'; fl.frequency.value = lp;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + a); g.gain.setValueAtTime(v, t + d); g.gain.linearRampToValueAtTime(0, t + d + r);
      o.connect(fl); fl.connect(g); g.connect(dest || fx); o.start(t); o.stop(t + d + r + .05);
    }
    function noise(t, d, type, f0, f1, v, at, dest) {
      var s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain(); s.buffer = nb; fl.type = type;
      fl.frequency.setValueAtTime(f0, t); fl.frequency.exponentialRampToValueAtTime(f1, t + d); fl.Q.value = type === 'bandpass' ? 1.2 : .7;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + (at != null ? at : d * .9)); g.gain.linearRampToValueAtTime(0, t + d);
      s.connect(fl); fl.connect(g); g.connect(dest || bus); s.start(t); s.stop(t + d + .05);
    }
    function sweep(f0, f1, t, d, v) {
      var o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + d);
      g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g); g.connect(bus); o.start(t); o.stop(t + d + .05);
    }
    tone(55, t0, 2.3, 'sine', .22, 200, 1.4, .2, 0, bus); tone(110, t0 + .4, 1.9, 'sawtooth', .05, 500, 1.3, .2, -8);
    noise(t0 + .75, .8, 'bandpass', 400, 2500, .1, null, fx);
    [[.95, .3], [1.2, .26], [1.65, .5], [1.9, .45]].forEach(function (p) { sweep(95, 40, t0 + p[0], .22, p[1]); });
    noise(t0 + 1.65, .75, 'bandpass', 400, 9000, .26, null, fx);
    var o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(80, t0 + 1.65); o.frequency.exponentialRampToValueAtTime(700, t0 + 2.4);
    g.gain.setValueAtTime(0, t0 + 1.65); g.gain.linearRampToValueAtTime(.1, t0 + 2.35); g.gain.linearRampToValueAtTime(0, t0 + 2.4); o.connect(g); g.connect(fx); o.start(t0 + 1.65); o.stop(t0 + 2.45);
    sweep(80, 28, t0 + 2.4, 2.2, 1); sweep(55, 35, t0 + 2.4, 2.4, .5);
    noise(t0 + 2.4, 2.2, 'highpass', 2500, 9000, .2, .005, fx); noise(t0 + 2.45, .8, 'lowpass', 6000, 400, .18, .02, fx);
    [110, 165, 220, 330, 440].forEach(function (f, i) { tone(f, t0 + 2.4, .35, 'sawtooth', .055, 1500, .005, 2.2, i % 2 ? 7 : -7); });
    [1760, 2349].forEach(function (f, i) { tone(f, t0 + 2.4 + i * .03, .05, 'sine', .05, 7000, .003, 1.8); });
  }

  function start() {
    if (started || done) return; started = true;
    var AC = window.AudioContext || window.webkitAudioContext, ok = false;
    try {
      if (AC) { ctx = new AC(); if (ctx.resume) ctx.resume(); }
    } catch (e) { ctx = null; }
    setTimeout(function () {
      if (done) return;
      try { if (ctx && ctx.state === 'running') sting(ctx); else if (ctx) { ctx.close(); ctx = null; } } catch (e) {}
      host.classList.add('go');
      setTimeout(function () { end(false); }, 4800);
    }, 110);
  }
  var fontReady = (document.fonts && document.fonts.load) ? document.fonts.load('100px "Bebas Neue"') : Promise.resolve();
  Promise.race([fontReady, new Promise(function (r) { setTimeout(r, 1200); })]).then(start, start);
})();
