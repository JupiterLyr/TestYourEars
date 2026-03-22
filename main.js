const MIN_FREQ = 20;
const MAX_FREQ = 28160;
const MAX_DB = -6;
const BASE_FREQ = 440;

let audioCtx = null;
let oscillator = null;

function sliderToFreq(n) {
    return BASE_FREQ * Math.pow(2, n / 12);
}

function freqToSlider(freq) {
    return Math.round(12 * Math.log2(freq / BASE_FREQ));
}

function dbToGain(db) {
    return Math.pow(10, db / 20);
}

function play() {
    const freq = parseFloat(document.getElementById("freq").value);
    const amp = parseFloat(document.getElementById("amp").value);
    const type = document.getElementById("waveType").value;

    if (freq < MIN_FREQ || freq > MAX_FREQ) {
        alert("频率必须在 " + MIN_FREQ + "Hz ~ " + MAX_FREQ + "Hz");
        return;
    }
    if (amp < 0 || amp > 1) {
        alert("振幅必须在 0~1");
        return;
    }
    stop(); // 防止叠加

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    const safeGain = dbToGain(MAX_DB) * amp;
    gainNode.gain.value = safeGain;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
}

function stop() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
    if (audioCtx) {
        audioCtx.close();
        audioCtx = null;
    }
}
const freqInput = document.getElementById("freq");
const freqRange = document.getElementById("freqRange");

// 初始化同步
freqRange.value = freqToSlider(freqInput.value);

// 滑块 -> 输入框
freqRange.addEventListener("input", () => {
    const freq = sliderToFreq(freqRange.value);
    freqInput.value = Math.round(freq);
});

// 输入框 -> 滑块
freqInput.addEventListener("input", () => {
    let val = Math.min(MAX_FREQ, Math.max(MIN_FREQ, freqInput.value));
    freqRange.value = freqToSlider(val);
});
