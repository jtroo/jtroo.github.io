const siminput = document.getElementById('siminput');
const config = document.getElementById('config');

var cfg = localStorage.getItem('config');
if (cfg) {
  console.log('setting cfg to localstorage value');
  config.value = cfg;
}
var sim = localStorage.getItem('siminput');
if (sim) {
  console.log('setting sim to localstorage value');
  siminput.value = sim;
}

var pendingConfigSave = false;
config.oninput = () => {
  if (!pendingConfigSave) {
    pendingConfigSave = true;
    setTimeout(() => {
      console.log('saving cfg to localstorage');
      localStorage.setItem('config', config.value);
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
      localStorage.setItem('siminput', siminput.value);
      pendingSimSave = false;
    }, 1000);
  }
}
