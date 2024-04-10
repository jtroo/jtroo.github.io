let cfgEl = document.getElementById('config');
let btnsEl = document.getElementById('actions-buttons');
let resultEl = document.getElementById('result');

function setBtnsWidth() {
    btnsEl.style.minWidth = cfgEl.offsetWidth + 'px';
    resultEl.style.minWidth = cfgEl.offsetWidth + 'px';
}

setBtnsWidth();
window.onresize = setBtnsWidth;