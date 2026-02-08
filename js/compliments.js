const compliments = [
    "Your smile could light up a whole city. 🌟",
    "You have the kind of energy that makes people feel good just being near you.",
    "Your boldness is inspiring. Never change.",
    "You're not just pretty — you're magnetic. ✨",
    "The way you carry yourself? Chef's kiss. 👑",
    "Your spirit is fire. Literally unstoppable.",
    "You deserve someone who sees how rare you are.",
    "Your laugh is probably contagious. In the best way.",
    "You're the main character. Don't forget it.",
    "Someone's going to be so lucky to have you. (Spoiler: it's everyone who knows you.)",
    "Your confidence? Unmatched. 🔥",
    "You've got that 'it' factor. You really do.",
    "The world is better with you in it.",
    "You're the friend everyone wishes they had.",
    "Your vibe? Immaculate.",
    "You're stronger than you give yourself credit for.",
    "That breakup upgraded their loss, not yours.",
    "You're the kind of person people write songs about.",
    "Your energy is too good to waste on anyone who doesn't see it.",
    "You're a whole vibe and a half. 💖",
    "Someone out there is gonna thank the universe for you.",
    "You're the plot twist in everyone's story.",
    "Your presence is a gift. Seriously.",
    "You've got main character energy and we're all here for it.",
    "You're the kind of cool that can't be faked.",
    "Your heart is big. Protect it, but never shrink it.",
    "You're literally glowing. (Yes, we can tell.)",
    "You deserve love that matches your intensity.",
    "You're not 'too much' — you're exactly enough.",
    "The right person will love every part of you. Until then, love yourself. 💕"
];

let count = 0;
const display = document.getElementById('complimentDisplay');
const btn = document.getElementById('complimentBtn');
const counter = document.getElementById('complimentCounter');

function getRandomCompliment() {
    return compliments[Math.floor(Math.random() * compliments.length)];
}

function showCompliment() {
    const compliment = getRandomCompliment();
    display.innerHTML = '';
    const span = document.createElement('span');
    span.className = 'compliment-text';
    span.textContent = compliment;
    span.style.animation = 'popIn 0.5s ease forwards';
    display.appendChild(span);
    count++;
    counter.textContent = `Compliments received: ${count}`;
    
    // Confetti burst on milestones
    if (count % 5 === 0 && count > 0) {
        triggerMiniConfetti();
    }
}

function triggerMiniConfetti() {
    const colors = ['#FF6B6B', '#F9CA24', '#E84393', '#00CEC9'];
    for (let i = 0; i < 20; i++) {
        const c = document.createElement('div');
        c.style.cssText = `
            position: fixed;
            width: 8px; height: 8px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            left: 50%;
            top: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: miniConfetti 1.5s ease-out forwards;
        `;
        document.body.appendChild(c);
        const angle = (i / 20) * Math.PI * 2;
        const dist = 80 + Math.random() * 60;
        c.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 }
        ], { duration: 1500, fill: 'forwards' });
        setTimeout(() => c.remove(), 1500);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from { opacity: 0; transform: scale(0.8) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
`;
document.head.appendChild(style);

btn.addEventListener('click', showCompliment);
