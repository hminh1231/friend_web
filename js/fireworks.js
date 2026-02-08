const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const lightShowBtn = document.getElementById('lightShowBtn');
const stopBtn = document.getElementById('stopBtn');

const colors = [
    '#FF6B6B', '#FF8E72', '#F9CA24', '#E84393', '#FD79A8',
    '#6C5CE7', '#00CEC9', '#FFF5F0', '#FFEAA7', '#DDA0DD'
];

let fireworks = [];
let particles = [];
let lightShowInterval = null;
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, vx, vy, color, size = 2, decay = 0.98) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.decay = decay;
        this.alpha = 1;
        this.gravity = 0.02;
    }

    update() {
        this.vx *= this.decay;
        this.vy *= this.decay;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 4;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        const particleCount = 80 + Math.floor(Math.random() * 40);
        const isSpecial = Math.random() > 0.85;

        for (let i = 0; i < particleCount; i++) {
            let angle, speed;
            if (isSpecial) {
                angle = (Math.PI * 2 * i) / particleCount;
                speed = 3 + Math.random() * 2;
            } else {
                angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
                speed = 2 + Math.random() * 4;
            }
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const pColor = Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)];
            this.particles.push(new Particle(x, y, vx, vy, pColor, isSpecial ? 2 : 1.5 + Math.random()));
        }
    }

    update() {
        this.particles = this.particles.filter(p => {
            p.update();
            return p.alpha > 0;
        });
    }

    draw() {
        this.particles.forEach(p => p.draw());
    }

    isDone() {
        return this.particles.length === 0;
    }
}

function createFirework(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.push(new Firework(x, y, color));
}

function randomFirework() {
    const x = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
    const y = canvas.height * 0.2 + Math.random() * canvas.height * 0.5;
    createFirework(x, y);
}

function animate() {
    ctx.fillStyle = 'rgba(45, 19, 44, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks = fireworks.filter(fw => {
        fw.update();
        fw.draw();
        return !fw.isDone();
    });

    animationId = requestAnimationFrame(animate);
}
animate();

canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

function startLightShow() {
    if (lightShowInterval) return;
    lightShowBtn.textContent = 'Light Show Running ✨';
    lightShowBtn.disabled = true;

    lightShowInterval = setInterval(() => {
        randomFirework();
        if (Math.random() > 0.6) {
            setTimeout(randomFirework, 200);
        }
    }, 600);
}

function stopLightShow() {
    if (lightShowInterval) {
        clearInterval(lightShowInterval);
        lightShowInterval = null;
    }
    lightShowBtn.textContent = 'Start Light Show 🌟';
    lightShowBtn.disabled = false;
}

lightShowBtn.addEventListener('click', startLightShow);
stopBtn.addEventListener('click', stopLightShow);
