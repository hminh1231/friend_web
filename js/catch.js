const area = document.getElementById('catchArea');
const basket = document.getElementById('basket');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const startBtn = document.getElementById('startBtn');
const message = document.getElementById('gameMessage');
const hearts = ['💕', '💖', '💗', '💘', '❤️', '🌸', '✨'];
let score = 0, lives = 3;
let gameRunning = false;
let basketX = 0;
let fallInterval;
let heartElements = [];

function updateBasketPosition(x) {
    const rect = area.getBoundingClientRect();
    const left = Math.max(0, Math.min(rect.width - 80, x));
    basket.style.left = left + 'px';
}

area.addEventListener('mousemove', (e) => {
    basketX = e.clientX - area.getBoundingClientRect().left - 40;
    updateBasketPosition(basketX);
});

area.addEventListener('touchmove', (e) => {
    e.preventDefault();
    basketX = e.touches[0].clientX - area.getBoundingClientRect().left - 40;
    updateBasketPosition(basketX);
}, { passive: false });

function createHeart() {
    if (!gameRunning) return;
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * (area.offsetWidth - 40) + 'px';
    area.appendChild(heart);
    heartElements.push(heart);
    
    const fallSpeed = 2 + Math.random() * 2;
    let top = 0;
    
    const animate = () => {
        if (!gameRunning || !heart.parentNode) return;
        top += fallSpeed;
        heart.style.top = top + 'px';
        
        if (top > area.offsetHeight - 60) {
            heart.remove();
            heartElements = heartElements.filter(h => h !== heart);
            lives--;
            livesEl.textContent = lives;
            if (lives <= 0) endGame();
            return;
        }
        
        const hRect = heart.getBoundingClientRect();
        const bRect = basket.getBoundingClientRect();
        if (hRect.bottom > bRect.top && hRect.top < bRect.bottom &&
            hRect.right > bRect.left && hRect.left < bRect.right) {
            score++;
            scoreEl.textContent = score;
            heart.classList.add('caught');
            heart.remove();
            heartElements = heartElements.filter(h => h !== heart);
            return;
        }
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}

function startGame() {
    gameRunning = true;
    score = 0;
    lives = 3;
    scoreEl.textContent = score;
    livesEl.textContent = lives;
    message.textContent = '';
    startBtn.style.display = 'none';
    heartElements.forEach(h => h.remove());
    heartElements = [];
    
    fallInterval = setInterval(createHeart, 800);
}

function endGame() {
    gameRunning = false;
    clearInterval(fallInterval);
    heartElements.forEach(h => h.remove());
    heartElements = [];
    startBtn.style.display = 'block';
    message.textContent = `Game over! You caught ${score} hearts! 🎉 Play again?`;
}

startBtn.addEventListener('click', startGame);
