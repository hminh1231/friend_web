const grid = document.getElementById('bubblesGrid');
const popCountEl = document.getElementById('popCount');
const resetBtn = document.getElementById('resetBubbles');
let popCount = 0;
const colors = ['#FF6B6B', '#FF8E72', '#F9CA24', '#E84393', '#FD79A8', '#6C5CE7', '#00CEC9'];

// Bubble-wrap style pop sound (Web Audio API)
let audioCtx = null;
function playPopSound() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const t0 = audioCtx.currentTime;
        const duration = 0.035;

        // Short noise burst (air release / crack)
        const noiseBuffer = audioCtx.createBuffer(1, Math.ceil(audioCtx.sampleRate * duration), audioCtx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const fade = 1 - (i / data.length) * (i / data.length);
            data[i] = (Math.random() * 2 - 1) * 0.45 * fade;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.5, t0);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
        const bandpass = audioCtx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 400 + Math.random() * 400;
        bandpass.Q.value = 1.2;
        noise.connect(bandpass);
        bandpass.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(t0);
        noise.stop(t0 + duration);

        // Quick low "thump" (plastic cavity)
        const thump = audioCtx.createOscillator();
        const thumpGain = audioCtx.createGain();
        thump.type = 'sine';
        thump.frequency.setValueAtTime(90 + Math.random() * 60, t0);
        thumpGain.gain.setValueAtTime(0.2, t0);
        thumpGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.02);
        thump.connect(thumpGain);
        thumpGain.connect(audioCtx.destination);
        thump.start(t0);
        thump.stop(t0 + 0.02);
    } catch (_) {}
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.setProperty('--size', (25 + Math.random() * 25) + 'px');
    
    bubble.addEventListener('click', () => {
        if (bubble.classList.contains('popped')) return;
        bubble.classList.add('popped');
        playPopSound();
        popCount++;
        popCountEl.textContent = popCount;
        
        // Pop particles
        for (let i = 0; i < 8; i++) {
            const p = document.createElement('div');
            p.className = 'pop-particle';
            p.style.background = bubble.style.backgroundColor;
            bubble.appendChild(p);
            const angle = (i / 8) * Math.PI * 2;
            p.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * 30}px, ${Math.sin(angle) * 30}px) scale(0)`, opacity: 0 }
            ], { duration: 300, fill: 'forwards' });
        }
        setTimeout(() => bubble.remove(), 300);
    });
    
    return bubble;
}

function fillGrid() {
    grid.innerHTML = '';
    const count = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 4000));
    for (let i = 0; i < count; i++) {
        grid.appendChild(createBubble());
    }
}

fillGrid();
resetBtn.addEventListener('click', fillGrid);
