LZString = window.LZString;

const siminput = document.getElementById('siminput');
const config = document.getElementById('config');

const urlParams = new URLSearchParams(window.location.search);
var cfgAndInput = urlParams.get('data');
if (cfgAndInput) {
  var data = LZString.decompressFromEncodedURIComponent(cfgAndInput);
  if (data) {
    var [cfg, input] = data.split('||||||||||||||||');
    config.value = cfg;
    siminput.value = input;
  } else {
    cfgAndInput = null;
  }
}

const persistVersion = "2";
var storedPersistVersion = localStorage.getItem('persistversion');
if (storedPersistVersion === persistVersion && !cfgAndInput) {
  var cfg = localStorage.getItem('config');
  if (cfg) {
    var actual = LZString.decompressFromEncodedURIComponent(cfg);
    if (actual) {
      console.log('setting cfg to localstorage value');
      config.value = actual;
    }
  }
  var sim = localStorage.getItem('siminput');
  if (sim) {
    var actual = LZString.decompressFromEncodedURIComponent(sim);
    if (actual) {
      console.log('setting sim to localstorage value');
      siminput.value = actual;
    }
  }
} else if (storedPersistVersion !== persistVersion) {
  localStorage.setItem('config', null);
  localStorage.setItem('siminput', null);
  localStorage.setItem('persistversion', persistVersion);
}

var pendingConfigSave = false;
config.oninput = () => {
  if (!pendingConfigSave) {
    pendingConfigSave = true;
    setTimeout(() => {
      console.log('saving cfg to localstorage');
      localStorage.setItem('config', LZString.compressToEncodedURIComponent(config.value));
      pendingConfigSave = false;
    }, 1000);
  }
};

var pendingSimSave = false;
siminput.oninput = () => {
  if (!pendingSimSave) {
    pendingSimSave = true;
    setTimeout(() => {
      console.log('saving sim to localstorage');
      localStorage.setItem('siminput', LZString.compressToEncodedURIComponent(siminput.value));
      pendingSimSave = false;
    }, 1000);
  }
}

function permalink() {
  var result = document.getElementById('result');
  result.textContent = '.';
  setTimeout(() => result.textContent = '..', 33);
  setTimeout(() => result.textContent = '...', 66);
  var data = config.value + '||||||||||||||||' + siminput.value;
  var b64 = LZString.compressToEncodedURIComponent(data);
  var l = window.location;
  var url = `${l.origin}?data=${b64}`
  navigator.clipboard.writeText(url);
  setTimeout(() => result.textContent = '... Copied link to clipboard!', 100);
}

window.permalink = permalink;

if (!config.value) {
  config.value = `;; Hold f activates arrows for keys: i j k l
(defsrc f i j k l)
(defalias f (tap-hold 200 200 f
  (layer-while-held arrows)))
(deflayer base   @f   i    j    k    l)
(deflayer arrows _    up   left down right)`;
}

if (!siminput.value) {
  siminput.value = `d:KeyI t:50 u:KeyI t:100     d:KeyF t:10
d:KeyI t:80 u:KeyI t:100
d:KeyJ t:50 u:KeyJ t:300
d:KeyK t:20 u:KeyK t:500
d:KeyL t:60 u:KeyL t:480     u:KeyF t:9000`;
}