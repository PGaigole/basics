const gameArea = document.getElementById("game-area");
const snake = document.querySelector(".snake");
const food = document.querySelector(".food");

let snakePositionX = 50; // Initial snake position (percentage)
let snakePositionY = 50; // Initial snake position (percentage)

const snakeSegments = [snake]; // Array to hold all snake segments

function moveSnake() {
  switch (direction) {
    case "ArrowUp":
      snakePositionY -= 1;
      break;
    case "ArrowDown":
      snakePositionY += 1;
      break;
    case "ArrowLeft":
      snakePositionX -= 1;
      break;
    case "ArrowRight":
      snakePositionX += 1;
      break;
  }

  // Ensure the snake stays within the game area bounds
  snakePositionX = Math.max(0, Math.min(100, snakePositionX));
  snakePositionY = Math.max(0, Math.min(100, snakePositionY));

  // Move each segment
  for (let i = snakeSegments.length - 1; i > 0; i--) {
    const prevSegment = snakeSegments[i - 1];
    snakeSegments[i].style.left = prevSegment.style.left;
    snakeSegments[i].style.top = prevSegment.style.top;
  }

  // Update the snake's position
  snake.style.left = `${snakePositionX}%`;
  snake.style.top = `${snakePositionY}%`;

  // Check if snake has eaten the food
  if (isCollision(snake, food)) {
    moveFoodToRandomPosition();
    addSnakeSegment();
  }
}

// Function to change direction based on key press
document.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    direction = event.key;
  }
});

// Function to keep the snake moving at regular intervals
setInterval(moveSnake, 100); // Move the snake every 100ms

function moveFoodToRandomPosition() {
  const maxX = gameArea.clientWidth - food.clientWidth;
  const maxY = gameArea.clientHeight - food.clientHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  food.style.left = `${randomX}px`;
  food.style.top = `${randomY}px`;
}

function isCollision(snake, food) {
  const snakeRect = snake.getBoundingClientRect();
  const foodRect = food.getBoundingClientRect();

  return (
    snakeRect.left < foodRect.left + foodRect.width &&
    snakeRect.left + snakeRect.width > foodRect.left &&
    snakeRect.top < foodRect.top + foodRect.height &&
    snakeRect.top + snakeRect.height > foodRect.top
  );
}

function addSnakeSegment() {
  const newSegment = document.createElement("div");
  newSegment.classList.add("snake");
  newSegment.style.width = "20px";
  newSegment.style.height = "20px";
  newSegment.style.position = "absolute";
  newSegment.style.backgroundColor = "green";

  const lastSegment = snakeSegments[snakeSegments.length - 1];
  newSegment.style.left = lastSegment.style.left;
  newSegment.style.top = lastSegment.style.top;

  gameArea.appendChild(newSegment);
  snakeSegments.push(newSegment);
}

// Initial position of the food
moveFoodToRandomPosition();
