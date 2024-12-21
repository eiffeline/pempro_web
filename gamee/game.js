// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const menu = document.getElementById('menu');
const gameArea = document.getElementById('gameArea');

// Ukuran canvas
const WIDTH = 800;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

// Warna yang digunakan
const COLORS = {
    snake: 'green',
    food: 'red',
    background: '#fafafa'
};

// Ukuran snake dan kecepatan
const SNAKE_SIZE = 20;
let snake = [{x: WIDTH / 2, y: HEIGHT / 2}];
let food = spawnFood();
let direction = {x: 0, y: 0};
let score = 0;
let gameInterval;

// Fungsi untuk menggambar ular
function drawSnake() {
    ctx.fillStyle = COLORS.snake;
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
    });
}

// Fungsi untuk menggambar makanan
function drawFood() {
    ctx.fillStyle = COLORS.food;
    ctx.fillRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);
}

// Fungsi untuk menggambar skor
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Fungsi untuk menggerakkan ular
function moveSnake() {
    const head = {x: snake[0].x + direction.x * SNAKE_SIZE, y: snake[0].y + direction.y * SNAKE_SIZE};
    snake.unshift(head);
    
    // Memeriksa apakah ular makan makanan
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = spawnFood();
    } else {
        snake.pop();
    }

    // Memeriksa apakah ular menabrak dinding atau tubuhnya sendiri
    if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT || isCollidingWithSelf(head)) {
        clearInterval(gameInterval);
        alert('Game Over! Press OK to restart.');
        resetGame();
    }
}

// Fungsi untuk mengecek tabrakan dengan tubuh ular
function isCollidingWithSelf(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Fungsi untuk spawn makanan secara acak
function spawnFood() {
    const x = Math.floor(Math.random() * (WIDTH / SNAKE_SIZE)) * SNAKE_SIZE;
    const y = Math.floor(Math.random() * (HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE;
    return {x, y};
}

// Fungsi untuk menggambar semua elemen game
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawSnake();
    drawFood();
    drawScore();
}

// Fungsi untuk memperbarui game
function update() {
    moveSnake();
    draw();
}

// Fungsi untuk memulai game
function startGame() {
    menu.classList.add('hidden');
    gameArea.classList.remove('hidden');
    resetGame();
    gameInterval = setInterval(update, 100); // Set interval untuk game loop
}

// Fungsi untuk mereset permainan
function resetGame() {
    snake = [{x: WIDTH / 2, y: HEIGHT / 2}];
    direction = {x: 0, y: 0};
    score = 0;
    food = spawnFood();
}

// Fungsi untuk menangani input keyboard
function handleKeyDown(event) {
    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = {x: 0, y: -1};
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = {x: 0, y: 1};
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = {x: -1, y: 0};
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = {x: 1, y: 0};
    }
}

// Menambahkan event listener untuk tombol keyboard
document.addEventListener('keydown', handleKeyDown);

// Menambahkan event listener untuk tombol Start
startBtn.addEventListener('click', startGame);
