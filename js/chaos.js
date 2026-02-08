const btn = document.getElementById('chaosBtn');
const area = document.getElementById('chaosArea');
const message = document.getElementById('chaosMessage');
const countEl = document.getElementById('clickCount');
let clicks = 0;
const taunts = [
    "Nope! 🏃‍♀️", "Almost! ...jk", "Too slow!", "Nice try 😏", "Nah ah ah!",
    "The button said no", "Skill issue", "👋", "Bye!", "Catch me if you can!",
    "Nyoom", "✨ teleports ✨", "Not today!", "Oops, my finger slipped"
];

function moveButton() {
    const rect = area.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const padding = 15;
    
    const centerX = rect.left + padding + btnRect.width/2 + Math.random() * (rect.width - btnRect.width - padding*2);
    const centerY = rect.top + padding + btnRect.height/2 + Math.random() * (rect.height - btnRect.height - padding*2);
    
    btn.style.position = 'fixed';
    btn.style.left = centerX + 'px';
    btn.style.top = centerY + 'px';
    btn.style.transform = 'translate(-50%, -50%)';
}

btn.addEventListener('mouseenter', () => {
    moveButton();
    message.textContent = taunts[Math.floor(Math.random() * taunts.length)];
});

btn.addEventListener('click', () => {
    clicks++;
    countEl.textContent = clicks;
    message.textContent = "YOU GOT ME! 🎉";
    message.style.color = 'var(--gold)';
    setTimeout(() => {
        message.textContent = '';
        message.style.color = '';
        moveButton();
    }, 800);
});
