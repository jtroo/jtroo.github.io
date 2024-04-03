import initSync, { init, check_config, simulate } from './kanata_wasm.js';

const beginBtn = document.getElementById('beginRecording');
const stopBtn = document.getElementById('stopRecording');
const simInput = document.getElementById('siminput');

initSync();

function testConfig() {
  init();
  var cfg = document.getElementById('config').value;
  var out = check_config(cfg)
  document.getElementById('result').textContent = out;
}

function simulateInput() {
  init();
  var cfg = document.getElementById('config').value;
  var sim = document.getElementById('siminput').value;
  var out = simulate(cfg, sim)
  out = out.replaceAll(/^t:/gm, 't:              ');
  out = out.replaceAll('↓(press)   ', '   ↓(press) ');
  out = out.replaceAll('↑(release) ', ' ↑(release) ');
  if (!out.trim()) {
    out = 'No output events from simulation.\nMake sure to simulate time via t:<number>';
  }
  document.getElementById('result').textContent = out;
}

var recordingPress = null;
var recordingRelease = null;
var recordingEndFn = null;

function beginRecording() {
  beginBtn.style.display = 'none';
  stopBtn.style.display = 'block';

  var prevT = null;
  var inputStr = "";
  var itemCount = 0;
  var pressedKey = null;
  var recordFnPress = (event) => {
    event.preventDefault();
    if (prevT != null) {
      inputStr = inputStr.concat(`t:${Date.now() - prevT} `);
      itemCount++;
      if (itemCount >= 6) {
        inputStr = inputStr.concat('\n');
        itemCount = 0;
      }
    }
    itemCount++;
    var code = event.code;
    if (!code) {
      code = event.key;
    }
    var action = 'd';
    if (pressedKey === code) {
      // check for key repeat
      action = 'r';
    }
    inputStr = inputStr.concat(`${action}:${code} `);
    prevT = Date.now();
    simInput.value = inputStr;
    pressedKey = code;
  };
  var recordFnRelease = (event) => {
    event.preventDefault();
    if (prevT != null) {
      inputStr = inputStr.concat(`t:${Date.now() - prevT} `);
      itemCount++;
      if (itemCount >= 6) {
        inputStr = inputStr.concat('\n');
        itemCount = 0;
      }
    }
    itemCount++;
    var code = event.code;
    if (!code) {
      code = event.key;
    }
    inputStr = inputStr.concat(`u:${code} `);
    prevT = Date.now();
    simInput.value = inputStr;
    pressedKey = null;
  };

  recordingPress = recordFnPress;
  recordingRelease = recordFnRelease;
  addEventListener('keydown', recordFnPress);
  addEventListener('keyup', recordFnRelease);

  // Add extra ending time to help kanata complete pending states.
  recordingEndFn = () => {
    inputStr = inputStr.concat(`t:9000`);
    simInput.value = inputStr;
  };

  setTimeout(() => stopRecording(recordFnPress, recordFnRelease), 30000);
}

function stopRecording(recordFnPress, recordFnRelease) {
  if (   !recordFnPress
      || !recordFnRelease
      || (recordFnPress === recordingPress
          && recordFnRelease === recordingRelease))
  {
    beginBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    removeEventListener('keydown', recordingPress);
    removeEventListener('keyup', recordingRelease);
    recordingPress = null;
    recordingRelease = null;
    recordingEndFn();
  }
}

window.testConfig = testConfig;
window.simulateInput = simulateInput;
window.beginRecording = beginRecording;
window.stopRecording = stopRecording;
