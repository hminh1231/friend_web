const lockedEl = document.getElementById('lockedContent');
const birthdayEl = document.getElementById('birthdayContent');
const navLinks = document.getElementById('navLinks');

function isBirthday() {
    const now = new Date();
    // Visible on March 26 and after (every year)
    return now.getMonth() > 2 || (now.getMonth() === 2 && now.getDate() >= 26);
}

const navHTML = `
    <a href="compliments.html">Compliments</a>
    <a href="bubbles.html">Pop Bubbles</a>
    <a href="roasts.html">Roasts</a>
    <a href="chaos.html">Chaos</a>
    <a href="ducks.html">Ducks</a>
    <a href="jokes.html">Jokes</a>
    <a href="revenge.html">Revenge</a>
    <a href="fireworks.html">Fireworks</a>
    <a href="breathe.html">Breathe</a>
    <a href="fortune.html">Fortune</a>
    <a href="catch.html">Catch Hearts</a>
`;
navLinks.innerHTML = navHTML;

if (isBirthday()) {
    lockedEl.style.display = 'none';
    birthdayEl.style.display = 'block';
    document.title = 'Happy Birthday Thỏ Đào! 🎂';

    // Confetti burst
    const confettiColors = ['#FF6B6B', '#FF8E72', '#F9CA24', '#E84393', '#FD79A8', '#6C5CE7', '#00CEC9'];
    const container = document.getElementById('confetti');
    
    for (let i = 0; i < 80; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = '-20px';
        c.style.backgroundColor = confettiColors[i % confettiColors.length];
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        c.style.width = (Math.random() * 8 + 6) + 'px';
        c.style.height = (Math.random() * 8 + 6) + 'px';
        c.style.animation = `confettiFall ${Math.random() * 2 + 3}s linear forwards`;
        container.appendChild(c);
        setTimeout(() => c.remove(), 5000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
} else {
    lockedEl.style.display = 'block';
    birthdayEl.style.display = 'none';
}
