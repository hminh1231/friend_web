const revengeIdeas = [
    "Become a billionaire and buy their house just to turn it into a cat café. They can never enter.",
    "Get so famous they see your face on a billboard every day on their way to work. No escape.",
    "Start a successful business with the exact name they wanted for their startup. Oops.",
    "Become best friends with their favorite celebrity. Post photos. Casually.",
    "Learn their mother's secret recipe and make it better. WAY better.",
    "Get cast as the lead in a movie they auditioned for. Method acting? Nah. Destiny.",
    "Buy the coffee shop they go to every morning. Rename it 'Thỏ Đào's Café'. They have to say your name.",
    "Become so hot that when they see you at a party they accidentally walk into a wall. Physics.",
    "Write a bestselling novel. The villain is... someone who kind of looks like them. Totally coincidental.",
    "Get your dream job at their dream company. Become their boss. 'Oh, you work here too? Small world.'",
    "Win an award they've always wanted. Thank 'everyone who doubted me' in your speech. Maintain eye contact.",
    "Grow the most beautiful garden. They have to walk past it every day. Suffer in jealousy, mortal.",
    "Become a world-renowned artist. Your most famous piece? 'The One Who Got Away' (it's abstract).",
    "Get so fit you have to buy new clothes. All of them. Your glow-up is a public service.",
    "Adopt 47 cats and name them all variations of 'serenity' and 'peace'. You have both now.",
];

const display = document.getElementById('revengeDisplay');
const btn = document.getElementById('revengeBtn');

btn.addEventListener('click', () => {
    const idea = revengeIdeas[Math.floor(Math.random() * revengeIdeas.length)];
    display.innerHTML = `<span class="funny-text">${idea}</span>`;
    display.querySelector('.funny-text').style.animation = 'popIn 0.5s ease forwards';
});
