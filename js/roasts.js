const roasts = [
    "You're the human equivalent of a golden retriever who just discovered a new smell. Pure chaos. Pure joy.",
    "Your Spotify Wrapped is 90% 'songs to cry to' and 10% 'songs to pretend you're fine.' We see you.",
    "You give 'main character energy' but your life is more like a chaotic sitcom. We're here for it.",
    "You probably save memes at 2am 'for later' and never look at them again. It's okay. We all do.",
    "You're the friend who says 'I'm fine' while aggressively reorganizing their entire room at midnight.",
    "Your sleep schedule is just a suggestion and you treat it like one. Every. Single. Day.",
    "You've definitely cried at a commercial. Or a TikTok. Or a cloud that looked like a bunny.",
    "You're the type to say 'I'll just take a quick nap' and wake up 4 hours later confused about what year it is.",
    "Your camera roll is 80% screenshots you'll never need and 20% accidental butt pics. No judgment.",
    "You have strong opinions about things that don't matter. Like pineapple on pizza. We respect it.",
    "You've probably googled 'am I emotionally stable' at 3am. The answer was no. But you're cute.",
    "You're the person who adds things to cart 'just to look' and forgets for 3 months. Free therapy.",
    "Your texts are either one word or 47 voice notes. There is no in-between.",
    "You've definitely pretended to be on a call to avoid someone. Queen of boundaries.",
    "You're so extra that even your sneeze has a backstory. We love it.",
    "Your brain at 2am: solving world peace. Your brain at 2pm: forgetting what you walked into a room for.",
    "You've said 'I'm not crazy' while doing something completely unhinged. Iconic.",
    "You're the type to laugh so hard you snort and then get embarrassed. Peak comedy.",
    "Your coffee order probably has more steps than your life plan. Valid.",
    "You've definitely had a full conversation with your pet. They're a great listener.",
];

const display = document.getElementById('roastDisplay');
const btn = document.getElementById('roastBtn');

btn.addEventListener('click', () => {
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    display.innerHTML = `<span class="funny-text">${roast}</span>`;
    display.querySelector('.funny-text').style.animation = 'popIn 0.5s ease forwards';
});
