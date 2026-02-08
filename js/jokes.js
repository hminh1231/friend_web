const jokes = [
    { q: "Why did the scarecrow win an award?", a: "Because he was outstanding in his field! 🌾" },
    { q: "What do you call a bear with no teeth?", a: "A gummy bear! 🐻" },
    { q: "Why don't eggs tell jokes?", a: "They'd crack each other up! 🥚" },
    { q: "What do you call a fake noodle?", a: "An impasta! 🍝" },
    { q: "Why did the coffee file a police report?", a: "It got mugged! ☕" },
    { q: "What do you call a fish without eyes?", a: "A fsh! 🐟" },
    { q: "Why can't you give Elsa a balloon?", a: "Because she will let it go! 🎈" },
    { q: "What do you call a can opener that doesn't work?", a: "A can't opener! 🥫" },
    { q: "Why did the bicycle fall over?", a: "Because it was two-tired! 🚲" },
    { q: "What do you call a bear stuck in the rain?", a: "A drizzly bear! 🌧️" },
    { q: "Why did the tomato turn red?", a: "Because it saw the salad dressing! 🍅" },
    { q: "What do you call a pile of cats?", a: "A meowtain! 🐱" },
    { q: "Why don't scientists trust atoms?", a: "Because they make up everything! ⚛️" },
    { q: "What do you call a snowman with a suntan?", a: "A puddle! ⛄" },
    { q: "Why did the golfer bring two pairs of pants?", a: "In case he got a hole in one! ⛳" },
    { q: "What do you call a sheep with no legs?", a: "A cloud! 🐑" },
    { q: "Why can't you run in a camp?", a: "Because you can only ran (it's past tents)! ⛺" },
    { q: "What do you call a fish wearing a bowtie?", a: "Sofishticated! 🐠" },
    { q: "Why did the math book look sad?", a: "Because it had too many problems! 📚" },
    { q: "What do you call a bear with no ears?", a: "B! 🐻" },
];

const display = document.getElementById('jokeDisplay');
const btn = document.getElementById('jokeBtn');

btn.addEventListener('click', () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    display.innerHTML = `
        <div class="joke-setup">${joke.q}</div>
        <div class="joke-punchline">${joke.a}</div>
    `;
    display.querySelector('.joke-setup').style.animation = 'popIn 0.4s ease forwards';
    setTimeout(() => {
        const punchline = display.querySelector('.joke-punchline');
        punchline.style.animation = 'popIn 0.5s ease forwards';
    }, 600);
});
