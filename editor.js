/* ══════════════════════════════════════════════════════════════════
   Cinematic LP Kit — ローカル編集パネル
   ・localhost（自分のPCで見てる時）だけ表示。公開したサイトには一切出ない。
   ・色/文字/背景などをその場で変更 → 気に入ったら「保存コードをコピー」
     → Claude に貼って「config.js をこれにして」と言えば確定。
   ══════════════════════════════════════════════════════════════════ */
(function(){
  // ── ローカル閲覧時だけ動く（公開サイトでは何もしない）──
  var host = location.hostname;
  var isLocal = host === '' || host === 'localhost' || host === '127.0.0.1' || location.protocol === 'file:';
  if (!isLocal) return;

  function ready(){ return window.__lpEngine && window.__lpLiveApply; }
  (function boot(){ if(!ready()){ return setTimeout(boot, 150); } build(); })();

  var cfg;         // 編集中の設定（現在の設定のディープコピー）
  var engine;      // 'photo' | 'particles'
  var pending = false;

  function clone(o){ return JSON.parse(JSON.stringify(o||{})); }
  function save(){ try{ localStorage.setItem('LP_EDIT', JSON.stringify(cfg)); }catch(e){} }
  function live(){ save(); try{ window.__lpLiveApply(cfg); }catch(e){} }
  function markReload(){ save(); pending = true; var b=document.getElementById('lpReload'); if(b) b.style.display='block'; }

  var MOTIONS = [['forest','森・木漏れ日'],['water','水面のゆらぎ'],['city','夜景の瞬き'],['space','星の瞬き'],
    ['desert','砂漠の陽炎'],['snow','雪と霧'],['beach','波・ヤシ'],['meadow','草原の光'],['cliff','断崖・海霧'],['still','ほぼ静止']];
  var BGS = [['grid-all','近未来グリッド'],['grid-hero','FVだけグリッド→星雲'],['nebula','幻想の星雲'],['field','自然・畑']];
  var FONTS_DISP = [['keep','今のまま'],["'Anton',sans-serif","力強いゴシック(Anton)"],
    ["'Cormorant Garamond',serif","上品セリフ",'Cormorant Garamond:wght@600'],
    ["'Zen Maru Gothic',sans-serif","やさしい丸ゴシック",'Zen Maru Gothic:wght@700'],
    ["'Orbitron',sans-serif","テック(Orbitron)",'Orbitron:wght@700']];

  function build(){
    engine = window.__lpEngine;
    cfg = clone(window.LP_CONFIG);
    cfg.hero = cfg.hero||{}; cfg.join = cfg.join||{}; cfg.palette = cfg.palette||{};
    cfg.fonts = cfg.fonts||{}; cfg.chapters = cfg.chapters||[];

    var css = document.createElement('style');
    css.textContent = ''
      + '#lpEdBtn{position:fixed;right:16px;bottom:16px;z-index:99998;background:#111418;color:#fff;border:1px solid rgba(255,255,255,.25);'
      + 'font:600 13px/1 system-ui,sans-serif;padding:11px 15px;border-radius:30px;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.4)}'
      + '#lpEdBtn:hover{background:#1b1f26}'
      + '#lpEd{position:fixed;top:0;right:0;height:100%;width:min(340px,92vw);z-index:99999;background:#0e1116;color:#e8ebf0;'
      + 'font-family:system-ui,-apple-system,sans-serif;box-shadow:-8px 0 40px rgba(0,0,0,.5);transform:translateX(105%);'
      + 'transition:transform .28s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column}'
      + '#lpEd.open{transform:none}'
      + '#lpEd header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.1)}'
      + '#lpEd header b{font-size:14px;letter-spacing:.02em}#lpEd header span{cursor:pointer;opacity:.7;font-size:20px;line-height:1}'
      + '#lpEd .body{overflow-y:auto;padding:6px 16px 90px;flex:1}'
      + '#lpEd .g{border-bottom:1px solid rgba(255,255,255,.08);padding:12px 0}'
      + '#lpEd .g>h4{margin:0 0 9px;font-size:11px;letter-spacing:.14em;color:#8b93a5;text-transform:uppercase;font-weight:700}'
      + '#lpEd label{display:block;font-size:12px;color:#aeb6c6;margin:8px 0 3px}'
      + '#lpEd input[type=text],#lpEd textarea,#lpEd select{width:100%;background:#171b22;color:#fff;border:1px solid rgba(255,255,255,.14);'
      + 'border-radius:8px;padding:8px 9px;font:13px system-ui,sans-serif;box-sizing:border-box}'
      + '#lpEd textarea{resize:vertical;min-height:44px;line-height:1.5}'
      + '#lpEd .row{display:flex;gap:8px;align-items:center}'
      + '#lpEd .sw{display:flex;gap:6px;flex-wrap:wrap}'
      + '#lpEd .sw button{flex:1;min-width:88px;background:#171b22;color:#cfd6e4;border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:9px;font:600 12px system-ui;cursor:pointer}'
      + '#lpEd .sw button.on{background:#2f6bd6;border-color:#2f6bd6;color:#fff}'
      + '#lpEd .col{display:flex;align-items:center;gap:8px;margin:5px 0}#lpEd .col input[type=color]{width:34px;height:26px;padding:0;border:none;background:none;cursor:pointer}'
      + '#lpEd .col span{font-size:12px;color:#aeb6c6}'
      + '#lpEd input[type=range]{width:100%}'
      + '#lpEd .foot{position:absolute;bottom:0;left:0;right:0;background:#0e1116;border-top:1px solid rgba(255,255,255,.1);padding:10px 16px;display:flex;flex-direction:column;gap:7px}'
      + '#lpEd .foot button{border:none;border-radius:9px;padding:11px;font:700 13px system-ui;cursor:pointer}'
      + '#lpReload{display:none;background:#e0a13a;color:#1a1305}'
      + '#lpCopy{background:#2fd6a0;color:#052b1e}#lpReset{background:transparent;color:#8b93a5;border:1px solid rgba(255,255,255,.14)!important}'
      + '#lpToast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:100000;background:#2fd6a0;color:#052b1e;'
      + 'font:600 13px system-ui;padding:10px 18px;border-radius:30px;opacity:0;transition:opacity .3s;pointer-events:none}'
      + '#lpToast.show{opacity:1}';
    document.head.appendChild(css);

    var btn = document.createElement('div'); btn.id='lpEdBtn'; btn.textContent='✎ 編集';
    var panel = document.createElement('div'); panel.id='lpEd';
    document.body.appendChild(btn); document.body.appendChild(panel);
    var toast = document.createElement('div'); toast.id='lpToast'; document.body.appendChild(toast);
    btn.onclick=function(){ panel.classList.add('open'); };

    // ── コントロール生成ヘルパー ──
    var H = [];
    H.push('<header><b>✎ カスタマイズ</b><span id="lpClose">×</span></header><div class="body">');

    // 見せ方
    H.push('<div class="g"><h4>見せ方</h4><div class="sw">'
      + '<button data-eng="photo">写真が動く</button>'
      + '<button data-eng="particles">光の粒子</button></div>'
      + '<div style="font-size:11px;color:#6f7788;margin-top:6px">切り替えは再読み込みで反映。日本語の名前は「写真が動く」がおすすめ（光の粒子の立体文字は英字向け）</div></div>');

    // 背景・動き
    if (engine === 'photo') {
      H.push('<div class="g"><h4>背景・雰囲気</h4>'
        + '<label>写真の抽象度（0=写真そのまま / 1=絵画的）</label>'
        + '<input type="range" id="lpMood" min="0" max="1" step="0.05">'
        + '<label>各画面の「動き」</label>'
        + motionSel('FV', 'hero') + motionSel('章1','c0') + motionSel('章2','c1')
        + motionSel('章3','c2') + motionSel('章4','c3') + motionSel('最終','join')
        + '</div>');
    } else {
      H.push('<div class="g"><h4>背景</h4><label>背景の種類</label><select id="lpBg">'
        + BGS.map(function(b){return '<option value="'+b[0]+'">'+b[1]+'</option>';}).join('') + '</select></div>');
    }

    // 色
    H.push('<div class="g"><h4>色</h4>'
      + colRow('lpC1','差し色1（金）','accent') + colRow('lpC2','差し色2（水色）','accent2')
      + colRow('lpC3','差し色3（橙）','accent3') + colRow('lpCta','ボタンの色','cta')
      + colRow('lpCtaInk','ボタンの文字色','ctaInk') + '</div>');

    // 文字
    H.push('<div class="g"><h4>文字</h4>'
      + '<label>大きく出す名前</label><input type="text" id="lpBrand">'
      + '<label>ファーストビューの一言</label><input type="text" id="lpHeroSub">'
      + '<label>左上の小さいコピー</label><input type="text" id="lpTag"></div>');

    // 各章
    H.push('<div class="g"><h4>4つの章</h4>');
    for (var i=0;i<4;i++){
      H.push('<label>章'+(i+1)+'：見出し</label><input type="text" data-ch-title="'+i+'">'
        + '<label>章'+(i+1)+'：本文（改行は書かず1〜2行で）</label><textarea data-ch-body="'+i+'"></textarea>');
    }
    H.push('</div>');

    // 最終画面
    H.push('<div class="g"><h4>最終画面（登録ボタン）</h4>'
      + '<label>見出し</label><input type="text" id="lpJH">'
      + '<label>本文</label><textarea id="lpJB"></textarea>'
      + '<label>ボタンの文字</label><input type="text" id="lpCtaText">'
      + '<label>ボタンの飛び先URL（無ければ空でOK）</label><input type="text" id="lpCtaUrl"></div>');

    // フォント
    H.push('<div class="g"><h4>フォント（見出し）</h4><select id="lpFont">'
      + FONTS_DISP.map(function(f){return '<option value="'+f[0]+'">'+f[1]+'</option>';}).join('')
      + '</select><div style="font-size:11px;color:#6f7788;margin-top:6px">変更は再読み込みで反映</div></div>');

    H.push('</div>'); // .body
    H.push('<div class="foot">'
      + '<button id="lpReload">🔄 再読み込みして反映</button>'
      + '<button id="lpCopy">保存コードをコピー</button>'
      + '<button id="lpReset">最初の状態にもどす</button></div>');
    panel.innerHTML = H.join('');

    // ── 値の初期化 ──
    setEngBtns();
    if (engine === 'photo') {
      byId('lpMood').value = (cfg.photoMood!=null?cfg.photoMood:0.85);
      motSetVal('hero', (cfg.hero.motion)||'still');
      for (var m=0;m<4;m++) motSetVal('c'+m, (cfg.chapters[m]||{}).motion||'still');
      motSetVal('join', (cfg.join.motion)||'still');
    } else { if(byId('lpBg')) byId('lpBg').value = cfg.background||'grid-all'; }
    setCol('lpC1','accent','#ffc46b'); setCol('lpC2','accent2','#6fe9ff'); setCol('lpC3','accent3','#ff7a18');
    setCol('lpCta','cta','#06c755'); setCol('lpCtaInk','ctaInk','#03361b');
    byId('lpBrand').value = cfg.brand||''; byId('lpHeroSub').value = cfg.hero.sub||''; byId('lpTag').value = cfg.tagline||'';
    for (var t=0;t<4;t++){ var ch=cfg.chapters[t]||{};
      qsel('[data-ch-title="'+t+'"]').value = ch.title||'';
      qsel('[data-ch-body="'+t+'"]').value = (ch.body||'').replace(/<br\s*\/?>/gi,' ');
    }
    byId('lpJH').value = (cfg.join.heading||'').replace(/<br\s*\/?>/gi,' ');
    byId('lpJB').value = (cfg.join.body||'').replace(/<br\s*\/?>/gi,' ');
    byId('lpCtaText').value = cfg.join.ctaText||''; byId('lpCtaUrl').value = (cfg.join.ctaUrl==='#'?'':cfg.join.ctaUrl)||'';
    byId('lpFont').value = (cfg.fonts.display && matchFont(cfg.fonts.display)) || 'keep';

    // ── イベント ──
    byId('lpClose').onclick = function(){ panel.classList.remove('open'); };

    [].forEach.call(panel.querySelectorAll('[data-eng]'), function(b){
      b.onclick = function(){ cfg.engine = b.getAttribute('data-eng'); setEngBtns(); save(); location.href = 'index.html'; };
    });
    if (engine==='photo'){
      byId('lpMood').oninput = function(){ cfg.photoMood = parseFloat(this.value); live(); };
      motWire('hero', function(v){ cfg.hero.motion = v; });
      for (var k=0;k<4;k++)(function(k){ motWire('c'+k, function(v){ if(!cfg.chapters[k])cfg.chapters[k]={}; cfg.chapters[k].motion=v; }); })(k);
      motWire('join', function(v){ cfg.join.motion = v; });
    } else if (byId('lpBg')) {
      byId('lpBg').onchange = function(){ cfg.background = this.value; markReload(); };
    }
    colWire('lpC1','accent'); colWire('lpC2','accent2'); colWire('lpC3','accent3');
    colWire('lpCta','cta'); colWire('lpCtaInk','ctaInk');
    byId('lpBrand').oninput = function(){ cfg.brand = this.value; live(); };
    byId('lpHeroSub').oninput = function(){ cfg.hero.sub = this.value; live(); };
    byId('lpTag').oninput = function(){ cfg.tagline = this.value; live(); };
    for (var u=0;u<4;u++)(function(u){
      qsel('[data-ch-title="'+u+'"]').oninput = function(){ if(!cfg.chapters[u])cfg.chapters[u]={}; cfg.chapters[u].title=this.value; live(); };
      qsel('[data-ch-body="'+u+'"]').oninput = function(){ if(!cfg.chapters[u])cfg.chapters[u]={}; cfg.chapters[u].body=this.value.trim().replace(/\n+/g,'<br>'); live(); };
    })(u);
    byId('lpJH').oninput = function(){ cfg.join.heading = this.value.trim().replace(/\n+/g,'<br>'); live(); };
    byId('lpJB').oninput = function(){ cfg.join.body = this.value.trim().replace(/\n+/g,'<br>'); live(); };
    byId('lpCtaText').oninput = function(){ cfg.join.ctaText = this.value; live(); };
    byId('lpCtaUrl').oninput = function(){ cfg.join.ctaUrl = this.value.trim()||'#'; live(); };
    byId('lpFont').onchange = function(){ var f = FONTS_DISP.find(function(x){return x[0]===this.value;}.bind(this));
      if(!f) return; if(f[0]==='keep'){ delete cfg.fonts.display; } else { cfg.fonts.display=f[0]; if(f[2]){ cfg.fonts.google=cfg.fonts.google||[]; if(cfg.fonts.google.indexOf(f[2])<0)cfg.fonts.google.push(f[2]); } } markReload(); };

    byId('lpReload').onclick = function(){ save(); location.reload(); };
    byId('lpReset').onclick = function(){ if(!confirm('編集を全部消して最初の状態にもどす？')) return; try{localStorage.removeItem('LP_EDIT');}catch(e){} location.href='index.html'; };
    byId('lpCopy').onclick = function(){
      var code = 'window.LP_CONFIG = ' + JSON.stringify(stripHex(cfg), null, 2) + ';';
      navigator.clipboard && navigator.clipboard.writeText(code).then(showToast, function(){ prompt('下をコピーして Claude に「config.js をこれにして」と貼ってください：', code); });
      if(!navigator.clipboard) prompt('下をコピーして Claude に「config.js をこれにして」と貼ってください：', code);
    };

    // ── ヘルパー ──
    function byId(x){ return document.getElementById(x); }
    function qsel(s){ return panel.querySelector(s); }
    function motionSel(lbl,key){ return '<div class="row" style="margin:4px 0"><span style="font-size:12px;color:#aeb6c6;width:44px">'+lbl+'</span>'
      + '<select data-mot="'+key+'">'+MOTIONS.map(function(m){return '<option value="'+m[0]+'">'+m[1]+'</option>';}).join('')+'</select></div>'; }
    function motSetVal(key,v){ var s=panel.querySelector('[data-mot="'+key+'"]'); if(s)s.value=v; }
    function motWire(key,setter){ var s=panel.querySelector('[data-mot="'+key+'"]'); if(s)s.onchange=function(){ setter(s.value); markReload(); }; }
    function colRow(id,lbl,key){ return '<div class="col"><input type="color" id="'+id+'"><span>'+lbl+'</span></div>'; }
    function setCol(id,key,def){ var v=cfg.palette[key]||def; if(byId(id))byId(id).value=toHex6(v); }
    function colWire(id,key){ byId(id).oninput=function(){ cfg.palette[key]=this.value; live(); }; }
    function setEngBtns(){ [].forEach.call(panel.querySelectorAll('[data-eng]'),function(b){ b.classList.toggle('on', b.getAttribute('data-eng')===(cfg.engine||engine)); }); }
    function showToast(){ toast.textContent='コピーしました。Claude に貼って「config.js をこれにして」と言ってね'; toast.classList.add('show'); setTimeout(function(){toast.classList.remove('show');},2600); }
  }

  function toHex6(v){ if(typeof v==='number'){ return '#'+(v&0xffffff).toString(16).padStart(6,'0'); }
    v=String(v||'#000000'); if(v[0]!=='#')v='#'+v; if(v.length===4)v='#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3]; return v.slice(0,7); }
  function matchFont(disp){ var f=[["'Anton',sans-serif","'Anton',sans-serif"],["'Cormorant Garamond',serif","'Cormorant Garamond',serif"],
    ["'Zen Maru Gothic',sans-serif","'Zen Maru Gothic',sans-serif"],["'Orbitron',sans-serif","'Orbitron',sans-serif"]].find(function(x){return x[0]===disp;}); return f?f[0]:null; }
  // tints は 0x 数値のまま保つ（JSONにすると10進数になるが有効なJSなのでそのまま。編集パネルはtintsを触らない）
  function stripHex(o){ return o; }
})();
