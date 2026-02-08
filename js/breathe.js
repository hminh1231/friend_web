const circle = document.getElementById('breatheCircle');
const text = document.getElementById('breatheText');
const phase = document.getElementById('breathePhase');
const btn = document.getElementById('breatheBtn');
const INHALE = 4, HOLD = 2, EXHALE = 6;
let isRunning = false;
let animationId;

function startBreathing() {
    if (isRunning) return;
    isRunning = true;
    btn.textContent = 'Stop';
    runCycle();
}

function stopBreathing() {
    isRunning = false;
    btn.textContent = 'Start';
    phase.textContent = 'Paused';
    text.textContent = 'Breathe';
    circle.style.animation = 'none';
    circle.offsetHeight; // reflow
    if (animationId) cancelAnimationFrame(animationId);
}

function runCycle() {
    if (!isRunning) return;
    
    phase.textContent = 'Inhale...';
    text.textContent = 'In';
    circle.style.animation = `expand ${INHALE}s ease-in-out forwards`;
    
    setTimeout(() => {
        if (!isRunning) return;
        phase.textContent = 'Hold...';
        text.textContent = 'Hold';
    }, INHALE * 1000);
    
    setTimeout(() => {
        if (!isRunning) return;
        phase.textContent = 'Exhale...';
        text.textContent = 'Out';
        circle.style.animation = `shrink ${EXHALE}s ease-in-out forwards`;
    }, (INHALE + HOLD) * 1000);
    
    setTimeout(() => {
        if (isRunning) runCycle();
    }, (INHALE + HOLD + EXHALE) * 1000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes expand {
        from { transform: scale(0.6); opacity: 0.7; }
        to { transform: scale(1.2); opacity: 1; }
    }
    @keyframes shrink {
        from { transform: scale(1.2); opacity: 1; }
        to { transform: scale(0.6); opacity: 0.7; }
    }
`;
document.head.appendChild(style);

btn.addEventListener('click', () => {
    if (isRunning) stopBreathing();
    else startBreathing();
});
