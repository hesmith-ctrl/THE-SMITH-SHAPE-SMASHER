let score = 0;
let misses = 0;
let gameInterval;
let isPlaying = false;

const shape = document.getElementById('shape');
const scoreDisplay = document.getElementById('score');
const missesDisplay = document.getElementById('misses');
const startButton = document.getElementById('start-button');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

const shapes = [
    'circle.png',
    'square.png',
    'triangle.png'
];

// Function to start the game
startButton.addEventListener('click', () => {
    isPlaying = true;
    score = 0;
    misses = 0;
    scoreDisplay.textContent = score;
    missesDisplay.textContent = `${misses}/5`;
    startButton.style.display = 'none';
    gameOverScreen.style.display = 'none';
    gameInterval = setInterval(spawnShape, 1000);
});

// Function to spawn a shape
function spawnShape() {
    if (!isPlaying) return;

    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomX = Math.floor(Math.random() * (window.innerWidth - 100));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 100));

    shape.style.backgroundImage = `url(${randomShape})`;
    shape.style.left = `${randomX}px`;
    shape.style.top = `${randomY}px`;
    shape.style.display = 'block';

    // Shape disappears after a set time if not clicked
    setTimeout(() => {
        if (shape.style.display === 'block') {
            misses++;
            missesDisplay.textContent = `${misses}/5`;
            if (misses >= 5) {
                endGame();
            }
        }
    }, 800);
}

// Function to handle shape click
shape.addEventListener('click', () => {
    if (!isPlaying) return;
    score++;
    scoreDisplay.textContent = score;
    shape.style.display = 'none';
});

// Function to end the game
function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    shape.style.display = 'none';
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = score;
    startButton.style.display = 'none';
}

// Restart button functionality
restartButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    startButton.style.display = 'block';
});
