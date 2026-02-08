const grid = document.getElementById('bubblesGrid');
const popCountEl = document.getElementById('popCount');
const resetBtn = document.getElementById('resetBubbles');
let popCount = 0;
const colors = ['#FF6B6B', '#FF8E72', '#F9CA24', '#E84393', '#FD79A8', '#6C5CE7', '#00CEC9'];

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.setProperty('--size', (25 + Math.random() * 25) + 'px');
    
    bubble.addEventListener('click', () => {
        if (bubble.classList.contains('popped')) return;
        bubble.classList.add('popped');
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
