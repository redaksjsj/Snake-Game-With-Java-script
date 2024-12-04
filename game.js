const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const box = 20;


let snake = [
  { x: 5 * box, y: 5 * box },
  { x: 4 * box, y: 5 * box },
  { x: 3 * box, y: 5 * box }
];


let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};


let d;

document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode == 37 && d != 'RIGHT') {
    d = 'LEFT';
  } else if (event.keyCode == 38 && d != 'DOWN') {
    d = 'UP';
  } else if (event.keyCode == 39 && d != 'LEFT') {
    d = 'RIGHT';
  } else if (event.keyCode == 40 && d != 'UP') {
    d = 'DOWN';
  }
}

function draw() {
  // Fond du jeu
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'darkgreen'; // Tête et corps
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === 'LEFT') snakeX -= box;
  if (d === 'UP') snakeY -= box;
  if (d === 'RIGHT') snakeX += box;
  if (d === 'DOWN') snakeY += box;

  
  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    
    snake.pop();
  }

  
  const newHead = {
    x: snakeX,
    y: snakeY
  };

  // Vérification de la collision avec les murs
  if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
    clearInterval(game);
  }

  
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snakeX && snake[i].y === snakeY) {
      clearInterval(game);
    }
  }

  // Ajouter la nouvelle tête du serpent
  snake.unshift(newHead);
}

// Rafraîchir l'écran toutes les 100 ms
const game = setInterval(draw, 100);
