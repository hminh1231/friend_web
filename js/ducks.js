const zone = document.getElementById('ducksZone');
const countEl = document.getElementById('duckCount');
let count = 0;
const ducks = ['🦆', '🐤', '🦢', '🐥'];

zone.addEventListener('click', (e) => {
    const duck = document.createElement('div');
    duck.className = 'spawned-duck';
    duck.textContent = ducks[Math.floor(Math.random() * ducks.length)];
    duck.style.left = e.clientX + 'px';
    duck.style.top = e.clientY + 'px';
    duck.style.setProperty('--rotation', (Math.random() * 40 - 20) + 'deg');
    duck.style.setProperty('--size', (1.5 + Math.random() * 1.5) + 'rem');
    document.body.appendChild(duck);
    count++;
    countEl.textContent = count;
    
    setTimeout(() => duck.remove(), 3000);
});
