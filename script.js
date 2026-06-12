const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

let playerX = 375;
let score = 0;
let timeLeft = 60;
let gameRunning = true;

document.addEventListener("keydown", (event) => {
    if (!gameRunning) return;

    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    }

    if (event.key === "ArrowRight" && playerX < 750) {
        playerX += 20;
    }

    player.style.left = playerX + "px";
});

function createFruit() {
    if (!gameRunning) return;

    const fruit = document.createElement("div");
    fruit.classList.add("fruit");

    const fruits = ["🍎", "🍓", "🍊", "🥕", "🌽"];
    fruit.innerHTML = fruits[Math.floor(Math.random() * fruits.length)];

    let x = Math.random() * 760;

    fruit.style.left = x + "px";
    fruit.style.top = "0px";

    game.appendChild(fruit);

    let y = 0;

    const fall = setInterval(() => {
        if (!gameRunning) {
            clearInterval(fall);
            fruit.remove();
            return;
        }

        y += 5;
        fruit.style.top = y + "px";

        const fruitRect = fruit.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            fruitRect.left < playerRect.right &&
            fruitRect.right > playerRect.left &&
            fruitRect.bottom > playerRect.top &&
            fruitRect.top < playerRect.bottom
        ) {
            score++;
            scoreText.textContent = score;
            clearInterval(fall);
            fruit.remove();
        }

        if (y > 500) {
            clearInterval(fall);
            fruit.remove();
        }

    }, 20);
}

const fruitInterval = setInterval(createFruit, 1000);

const timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
        gameRunning = false;

        clearInterval(timer);
        clearInterval(fruitInterval);

        alert(`Fim de jogo! Você fez ${score} pontos! 🌾`);
    }
}, 1000);
