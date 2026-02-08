const grid = document.getElementById('bubblesGrid');
const popCountEl = document.getElementById('popCount');
const resetBtn = document.getElementById('resetBubbles');
let popCount = 0;
const colors = ['#FF6B6B', '#FF8E72', '#F9CA24', '#E84393', '#FD79A8', '#6C5CE7', '#00CEC9'];

// Pop sound using Web Audio API (no external files)
let audioCtx = null;
function playPopSound() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const noise = audioCtx.createBufferSource();
        const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
        noise.buffer = noiseBuffer;
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        noise.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(audioCtx.currentTime);
        noise.stop(audioCtx.currentTime + 0.05);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180 + Math.random() * 120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.08);
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
