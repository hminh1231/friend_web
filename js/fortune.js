const fortunes = [
    "Something wonderful is coming your way very soon.",
    "Your next chapter will be your best yet.",
    "Love will find you when you least expect it.",
    "A surprise from someone special awaits you.",
    "Your courage will open new doors this week.",
    "Good news is on its way. Stay open.",
    "Someone is thinking of you right now.",
    "Your dreams are closer than they appear.",
    "A bold move will change everything.",
    "Happiness is choosing yourself first.",
    "The universe is aligning in your favor.",
    "Your spark will inspire someone today.",
    "Adventure awaits — say yes to it.",
    "Your worth is not up for debate.",
    "Peace will find you. Let it in.",
    "A meaningful connection is near.",
    "Trust the timing of your life.",
    "You are exactly where you need to be.",
    "Your energy attracts your tribe.",
    "Something you've been hoping for is coming.",
    "You're braver than you believe.",
    "New love will surprise you soon.",
    "Your vibe will attract your tribe.",
    "The best is yet to come.",
    "You are loved more than you know.",
    "A new opportunity will excite you.",
    "Your heart knows the way.",
    "Magic happens outside your comfort zone."
];

const cookie = document.getElementById('fortuneCookie');
const paper = document.getElementById('fortunePaper');
const text = document.getElementById('fortuneText');
const btn = document.getElementById('newFortune');
let opened = false;

function openCookie() {
    if (opened) return;
    opened = true;
    cookie.classList.add('broken');
    
    setTimeout(() => {
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        text.textContent = fortune;
        paper.classList.add('revealed');
    }, 800);
}

function resetCookie() {
    opened = false;
    cookie.classList.remove('broken');
    const body = cookie.querySelector('.cookie-body');
    body.style.animation = 'none';
    body.offsetHeight; // force reflow
    body.style.animation = '';
    paper.classList.remove('revealed');
    text.textContent = '';
}

cookie.addEventListener('click', openCookie);
btn.addEventListener('click', () => {
    resetCookie();
    setTimeout(openCookie, 100);
});
