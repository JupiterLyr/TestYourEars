const MIN_FREQ = 20;
const MAX_FREQ = 28160;
const MAX_DB = -6;
const BASE_FREQ = 440;
const NOTE_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];

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

function getNoteInfo(freq) {
    const n = 12 * Math.log2(freq / 440);
    const nearest = Math.round(n);

    const cents = Math.round((n - nearest) * 100);
    const noteIndex = (nearest + 9 + 1200) % 12;
    const octave = 4 + Math.floor((nearest + 9) / 12);
    return {
        note: NOTE_NAMES[noteIndex] + octave,
        cents: cents
    };
}

function updateDisplay(freq) {
    const info = getNoteInfo(freq);
    let text = info.note;
    if (info.cents !== 0) {
        text += (info.cents > 0 ? "+" : "") + info.cents + " cent";
    }
    document.getElementById("noteDisplay").innerText = text;
    document.getElementById("freqDisplay").innerText = Math.round(freq) + " Hz";
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
    updateDisplay(freq);
    document.getElementById("speaker").innerText = "🔊";

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
    document.getElementById("speaker").innerText = "🔈";
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
updateDisplay(freqInput.value);

freqRange.addEventListener("input", () => {
    const freq = sliderToFreq(freqRange.value);
    freqInput.value = Math.round(freq);
    updateDisplay(freq);
});

freqInput.addEventListener("input", () => {
    let val = parseFloat(freqInput.value);
    if (isNaN(val)) return;
    val = Math.min(MAX_FREQ, Math.max(MIN_FREQ, val));
    freqRange.value = freqToSlider(val);
    updateDisplay(val);
});

