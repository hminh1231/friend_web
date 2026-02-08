const tracks = [
    { title: 'Soft piano', mood: 'Calm & cozy', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Acoustic breeze', mood: 'Light & easy', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'Evening chill', mood: 'Wind-down vibes', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { title: 'Dreamy strings', mood: 'Peaceful', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
];

const audio = document.getElementById('audio');
const trackTitle = document.getElementById('trackTitle');
const trackMood = document.getElementById('trackMood');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');
const volumeBar = document.getElementById('volumeBar');
const trackList = document.getElementById('trackList');

let currentIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    currentIndex = index;
    const t = tracks[index];
    audio.src = t.src;
    trackTitle.textContent = t.title;
    trackMood.textContent = t.mood;
    progressBar.value = 0;
    timeCurrent.textContent = '0:00';
    timeTotal.textContent = '0:00';
    document.querySelectorAll('.track-item').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
}

function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function togglePlay() {
    if (!audio.src) return;
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶';
    } else {
        audio.play().catch(() => {});
        playPauseBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function prevTrack() {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentIndex);
    if (isPlaying) audio.play();
}

function nextTrack() {
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
    if (isPlaying) audio.play();
}

audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    const p = (audio.currentTime / audio.duration) * 100;
    progressBar.value = isFinite(p) ? p : 0;
    timeCurrent.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('ended', () => {
    nextTrack();
});

audio.addEventListener('error', () => {
    trackTitle.textContent = 'Could not load track';
    trackMood.textContent = 'Try another one';
});

progressBar.addEventListener('input', () => {
    const t = (progressBar.value / 100) * audio.duration;
    if (isFinite(t)) audio.currentTime = t;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

trackList.querySelectorAll('.track-item').forEach((item, i) => {
    item.addEventListener('click', () => {
        loadTrack(i);
        audio.play().catch(() => {});
        isPlaying = true;
        playPauseBtn.textContent = '⏸';
    });
});

loadTrack(0);
audio.volume = volumeBar.value / 100;
