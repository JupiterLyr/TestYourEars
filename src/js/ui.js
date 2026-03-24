const NOTE_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];

export function getNoteInfo(freq) {
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

export function updateDisplay(freq) {
    const info = getNoteInfo(freq);

    let text = info.note;
    if (info.cents !== 0) {
        text += (info.cents > 0 ? "+" : "") + info.cents + " cent";
    }

    document.getElementById("noteDisplay").innerText = text;
    document.getElementById("freqDisplay").innerText = Math.round(freq) + " Hz";
}

export function setSpeaker(state) {
    document.getElementById("speaker").innerText = state ? "🔊" : "🔈";
}