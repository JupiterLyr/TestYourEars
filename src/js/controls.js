import { updateDisplay, setSpeaker } from "./ui.js?v=1.4.0";
import { playSound, stopSound } from "./audio.js?v=1.4.0";

const MIN_FREQ = 20;
const MAX_FREQ = 28160;
const BASE_FREQ = 440;

function sliderToFreq(n) {
    return BASE_FREQ * Math.pow(2, n / 12);
}

function freqToSlider(freq) {
    return Math.round(12 * Math.log2(freq / BASE_FREQ));
}

export function bindControls() {
    const freqInput = document.getElementById("freq");
    const freqRange = document.getElementById("freqRange");
    const ampInput = document.getElementById("amp");
    const waveType = document.getElementById("waveType");

    // 初始化
    freqRange.value = freqToSlider(freqInput.value);
    updateDisplay(freqInput.value);

    // 滑块 → 输入框
    freqRange.addEventListener("input", () => {
        const freq = sliderToFreq(freqRange.value);
        freqInput.value = Math.round(freq);
        updateDisplay(freq);
    });

    // 输入框 → 滑块
    freqInput.addEventListener("input", () => {
        let val = parseFloat(freqInput.value);
        if (isNaN(val)) return;

        val = Math.min(MAX_FREQ, Math.max(MIN_FREQ, val));
        freqRange.value = freqToSlider(val);
        updateDisplay(val);
    });

    // 暴露按钮行为供 HTML 调用
    window.play = () => {
        const freq = parseFloat(freqInput.value);
        const amp = parseFloat(ampInput.value);
        const type = waveType.value;

        if (freq < MIN_FREQ || freq > MAX_FREQ) {
            alert(`频率必须在 ${MIN_FREQ}Hz ~ ${MAX_FREQ}Hz`);
            return;
        }
        if (amp < 0 || amp > 1) {
            alert("振幅必须在 0~1");
            return;
        }

        playSound(freq, amp, type);
        updateDisplay(freq);
        setSpeaker(true);
    };

    window.stop = () => {
        stopSound();
        setSpeaker(false);
    };
}