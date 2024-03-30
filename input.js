import initSync, { init, check_config, simulate } from './wasm_state_machine.js';

initSync();

var is_init = false;

function testConfig() {
  init();
  var cfg = document.getElementById("config").value;
  var out = check_config(cfg)
  document.getElementById("result").textContent = out;
}

function simulateInput() {
  init();
  var cfg = document.getElementById("config").value;
  var sim = document.getElementById("siminput").value;
  var out = simulate(cfg, sim)
  document.getElementById("result").textContent = out;
}

window.testConfig = testConfig;
window.simulateInput = simulateInput;