let cfgEl = document.getElementById('config');
let btnsEl = document.getElementById('actions-buttons');
let resultEl = document.getElementById('result');

function setBtnsWidth() {
    btnsEl.style.minWidth = cfgEl.clientWidth + 'px';
    resultEl.style.minWidth = cfgEl.clientWidth + 'px';
}

setBtnsWidth();
window.onresize = setBtnsWidth;