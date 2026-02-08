// Confetti colors matching the site palette
const confettiColors = ['#FF6B6B', '#FF8E72', '#F9CA24', '#E84393', '#FD79A8', '#6C5CE7', '#00CEC9', '#FFF5F0'];

function createConfetti() {
    const container = document.getElementById('confetti');
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.width = (Math.random() * 8 + 6) + 'px';
        confetti.style.height = (Math.random() * 8 + 6) + 'px';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 3}s linear forwards`;
        confetti.style.opacity = '0';
        
        container.appendChild(confetti);
        
        // Trigger reflow for animation
        confetti.offsetHeight;
        confetti.style.opacity = '1';
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initial confetti burst on load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});

// More confetti on button click
document.getElementById('moreConfetti').addEventListener('click', () => {
    createConfetti();
});

// Subtle scroll-triggered animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            if (entry.target.classList.contains('card')) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Add fade-in animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeStyle);

// Observe cards and sections
document.querySelectorAll('.card, .peach-container, .deserve-list li, .cta, .mood-picker, .explore-section').forEach(el => {
    if (el) el.style.opacity = '0';
    if (el) observer.observe(el);
});

// Mood Picker
const moodMessages = {
    sad: ["It's okay to feel this way. You're allowed to heal at your own pace. 💙", "This feeling won't last forever. You're stronger than you know.", "Sending you a virtual hug. You matter so much. 🤗"],
    meh: ["Baby steps count. You showed up today — that's something. 🌱", "Not every day has to be amazing. Rest is valid too.", "Hey, you're still here. That takes courage."],
    okay: ["Glad you're hanging in there. Brighter moments are on the way. ☀️", "You're doing better than you think. Keep going!", "Okay is totally fine. Progress isn't always loud."],
    good: ["Love to see it! Your energy is contagious. ✨", "You're glowing! Keep that momentum going.", "Yes! This is the Thỏ Đào we know and love. 💖"],
    great: ["YOU'RE ON FIRE! 🔥 Nothing can stop you now!", "Look at you! Absolutely radiant. Shine on!", "The world better watch out — you're unstoppable! 🌟"]
};

document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mood = btn.dataset.mood;
        const messages = moodMessages[mood];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const responseEl = document.getElementById('moodResponse');
        responseEl.textContent = msg;
        responseEl.classList.add('show');
    });
});
