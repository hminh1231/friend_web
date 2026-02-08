const thoughts = [
    "What if pigeons are actually government drones and we've been feeding spies this whole time",
    "I should become a professional napper. The pay would be terrible but the benefits... sleep.",
    "Why do we say 'heads up' when we actually want people to look down??",
    "If I eat a whole pizza alone at 2am, did it even happen? No. No it didn't.",
    "I'm 90% sure my plants are judging my life choices. The succulent especially.",
    "What if our dreams are just our brain's way of binge-watching weird movies",
    "I could be productive... or I could lie on the floor and think about the Roman Empire. Again.",
    "Is it too early to have a mid-life crisis? Asking for a friend. The friend is me.",
    "I've had the same 3 tabs open for 47 days. They're part of the family now.",
    "Why does 'awful' mean bad but 'awesome' means good. English is unhinged.",
    "I'm not procrastinating. I'm strategically delaying success. It's different.",
    "What if we're all just NPCs in someone else's simulation and we're the boring ones",
    "I would fight a bear for my last slice of pizza. No regrets.",
    "My sleep schedule is less of a schedule and more of a vague suggestion",
    "I've rewatched the same show 12 times. New things are scary. Comfort is key.",
    "What if mirrors are actually portals and we've been waving at ourselves from another dimension",
    "I'm either extremely motivated or a certified potato. There's no in-between.",
    "Why do we park in a driveway but drive on a parkway. WHO DECIDED THIS.",
    "I could solve world hunger but I forgot what I walked into the kitchen for",
    "My brain at 3am: what if everyone else is a robot and I'm the only real one",
];

const display = document.getElementById('thoughtDisplay');
const btn = document.getElementById('thoughtBtn');

btn.addEventListener('click', () => {
    const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
    display.innerHTML = `<span class="funny-text">"${thought}"</span>`;
    display.querySelector('.funny-text').style.animation = 'popIn 0.5s ease forwards';
});
