// Game variables
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let gameover = false;

// Game functions
function initGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    direction = 'right';
    gameover = false;
}

function updateGame() {
    // Update game state
    if (!gameover) {
        // Update snake position based on direction
        let head = { x: snake[0].x, y: snake[0].y };
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Check for collisions
        if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10 || checkCollision(head)) {
            gameover = true;
            alert('Game Over! Press OK to restart.');
            initGame();
        } else {
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                // Snake eats food
                food.x = Math.floor(Math.random() * (canvas.width / 10));
                food.y = Math.floor(Math.random() * (canvas.height / 10));
            } else {
                snake.pop();
            }
        }
    }
}

function drawGame() {
    // Draw game elements on the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

function checkCollision(head) {
    // Check for collisions with snake's body
    return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
}

function main() {
    // Main game loop
    setInterval(() => {
        updateGame();
        drawGame();
    }, 100);
}

// Event listeners for keyboard controls
document.addEventListener('keydown', (event) => {
    // Handle keyboard input for controlling the snake
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// Start the game
initGame();
main();
