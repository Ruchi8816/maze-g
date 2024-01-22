const timerValue=document.getElementById('timeValue');
const startButton=document.getElementById('startButton');
const pauseButton=document.getElementById('pauseButton');
const stopButton=document.getElementById('stopButton');

let seconds=0;
let timerInterval=0;
let isTimeRunning=false;

function updateTimer()
{
  seconds++;
  timerValue.textContent=seconds;
 
}

function startTimer()
{
  
  if(!isTimeRunning)
  {
    timerInterval=setInterval(updateTimer,1000);
    isTimeRunning=true;
  }
}

function pauseTimer(){
  clearInterval(timerInterval);
  isTimeRunning=false;
}
function stopTimer()
{
  clearInterval(timerInterval);
  isTimeRunning=false;
  seconds=0;
  timerValue.textContent=seconds;
  
}

function getOption()
{
  var x = document.getElementById("mySelect").value;
  console.log(x);
  document.getElementById("demo").innerHTML = x;
}
document.addEventListener('DOMContentLoaded', function() {
  const maze = document.getElementById('maze');
  const cells = [];
  const size = 8; // Adjust the size of maze
  let playerPosition = { x: 0, y: 0 };
  // for creating maze

  function createMaze() {
    const stoppers =   [
      { x: 1, y: 0}, { x: 2, y: 0}, { x: 3, y: 0}, { x: 4, y: 0}, { x: 5, y: 0}, { x: 6, y: 0}, { x: 7, y: 0}, { x: 2, y: 1},
      { x: 7, y: 1}, { x: 0, y: 2},{ x: 0, y: 3},{ x: 0, y: 4},{ x: 0, y: 5},{ x: 0, y: 6},{ x: 0, y: 7},{ x: 1, y: 5},{ x: 1, y: 6},{ x: 1, y: 7},
      { x: 3, y: 5},{ x: 3, y:7},{ x: 4, y: 2},{ x: 4, y: 3},{ x: 4, y: 5},{ x: 4, y: 7},{ x: 5, y: 2},{ x: 5, y: 3},{ x: 5, y: 4},{ x: 5, y: 5},{ x: 5, y: 7},
      { x: 7, y: 1},{ x: 7, y: 2},{ x: 7, y: 3},{ x: 7, y: 4},{ x: 7, y: 4},{ x: 7, y: 5},{ x: 6, y: 7},{ x: 5, y: 6},
    ]; // Add stoppers
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) { 
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        maze.appendChild(cell);
        if (stoppers.some(s => s.x === col && s.y === row)) {
          cell.classList.add('stopper'); // Add class for stoppers
        }
      }
    }
    setPlayerPosition();
    setFinishPosition();
  }


  //setPlayerPosition and setFinishPosition functions add the player and finish.
  function setPlayerPosition() {
    const index = playerPosition.y * size + playerPosition.x;
    cells[index].classList.add('player');
  }

  function setFinishPosition() {
    const finishPosition = { x: size - 1, y: size - 1 };
    const index = finishPosition.y * size + finishPosition.x;
    cells[index].classList.add('finish');
  }
  
  let destinationReched = false;//for timer

  function movePlayer(event) {
    const keyCode = event.keyCode;
    const newPosition = { ...playerPosition };
      // Switch case to handle arrow key presses and update the new position
    if(GameStated){
      switch (keyCode) {
        case 37: // Left arrow
          newPosition.x = Math.max(0, playerPosition.x - 1);
          break;
        case 38: // Up arrow
          newPosition.y = Math.max(0, playerPosition.y - 1);
          break;
        case 39: // Right arrow
          newPosition.x = Math.min(size - 1, playerPosition.x + 1);
          break;
        case 40: // Down arrow
          newPosition.y = Math.min(size - 1, playerPosition.y + 1);
          break;
      }
    }
    
    const currentIndex = playerPosition.y * size + playerPosition.x;
    const newIndex = newPosition.y * size + newPosition.x;
    // Check if the new cell is not a stopper
    if (!cells[newIndex].classList.contains('stopper')) { // Check if the new cell is a stopper
      // Move the player to the new cell
      cells[currentIndex].classList.remove('player');
      cells[newIndex].classList.add('player');
      // Update the player's position
      playerPosition = newPosition;
      // Check if the player reached the finish
      if (newPosition.x === size-1 && newPosition.y === size -1) {
        alert('Congratulation! You won ');
        destinationReched = true;
        pausewhenreach();
        // resetGame();
      }
    }
  }

  function resetGame() {
    cells.forEach(cell => {
      cell.classList.remove('player', 'finish');
    });
    playerPosition = { x: 0, y: 0 };
    setPlayerPosition();
    setFinishPosition();
  }

  document.addEventListener('keydown', movePlayer);
  createMaze();




// for time button

let gameRunning = false;
let elapsedTime = 0;
let timerInterval;
let GameStated = false;
const timeLimit = 8;


function startGame() {

  GameStated = true;
  gameRunning = true;
  timerInterval = setInterval(updateTime, 1000);
  setTimeout(endGame, timeLimit * 1000);

}

function pauseGame() {

    gameRunning = false;

    clearInterval(timerInterval);

    // Other pause-related logic

}

function resumeGame() {

    gameRunning = true;

    timerInterval = setInterval(updateTime, 1000);

    // Other resume-related logic
}

function endGame() {
  // gameRunning = false;
  // clearInterval(timerInterval);
  pauseGame();
  resetGame();
  GameStated = false;
  document.getElementById('timer').innerHTML = "Times UP!! " + elapsedTime;
  elapsedTime = 0;
  // Additional logic for ending the games
}

function pausewhenreach(){
  if(destinationReched){
    // console.log(destinationReched);
    resetGame();
    pauseGame();
   }
}
function updateTime() {

    if (gameRunning) {

        elapsedTime++;

        document.getElementById('timer').innerHTML = "Elapsed Time: " + elapsedTime;

    }
}



document.getElementById('startButton').addEventListener('click', startGame);

document.getElementById('pauseButton').addEventListener('click', pauseGame);

document.getElementById('resumeButton').addEventListener('click', resumeGame);
});


