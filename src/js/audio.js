const MAX_DB = -6;

let audioCtx = null;
let oscillator = null;

export function dbToGain(db) {
    return Math.pow(10, db / 20);
}

export function playSound(freq, amp, type) {
    stopSound(); // 防止叠加

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

export function stopSound() {
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