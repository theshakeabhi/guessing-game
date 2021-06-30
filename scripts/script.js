'use script';

let secretNumber = Math.trunc(Math.random() * 20) + 1; // for generating the random number
let score = 10;
let highScore = 0;

/* 
changeTextContent function takes CSS selector and the value to be stored
in the element as arguments.
*/
const changeTextContent = function (cssSelector, value) {
  document.querySelector(cssSelector).textContent = value;
};

/* 
backgroundColorChange function takes the value of color as arguments.
*/
const backgroundColorChange = function (value) {
  document.querySelector('body').style.backgroundColor = value;
};

/* 
widthSizeChange function takes the value of width as arguments.
*/
const widthSizeChange = function (value) {
  document.querySelector('.number').style.width = value;
};

/* 
The core functionality of the game
*/
const gameCore = function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    // when user clicks without entering values
    changeTextContent('.message', 'Enter a Number DUMBO!!');
    backgroundColorChange('darkRed');
  } else if (guess === secretNumber) {
    // when the user guess the number correct
    changeTextContent('.message', 'You have WONN!');
    changeTextContent('.number', secretNumber);
    backgroundColorChange('green');
    widthSizeChange('30rem');
    if (score > highScore) {
      highScore = score;
      changeTextContent('.highscore', highScore);
    }
  } else if (guess !== secretNumber) {
    // when the user guess the number wrong
    if (score > 1) {
      // when the user haven't lost the game
      changeTextContent(
        '.message',
        guess > secretNumber
          ? 'Choose a Smaller Number'
          : 'Choose a Larger Number'
      );
      backgroundColorChange(guess > secretNumber ? 'orange' : 'blue');
      score--;
      changeTextContent('.score', score);
    } else {
      // when the user loses the game
      changeTextContent('.message', 'You have lost!');
      backgroundColorChange('red');
      score = 0;
      changeTextContent('.score', score);
      changeTextContent('.heading', 'The Number was:');
      changeTextContent('.number', secretNumber);
      widthSizeChange('30rem');
    }
  }
};

/* 
when the user clicks the Again button, this functions resets everything,
excpet the highscore
*/
const reset = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  backgroundColorChange('#222');
  changeTextContent('.number', '?');
  changeTextContent(
    '.message',
    document.querySelector('.message').textContent === 'Start guessing...'
      ? 'Start guessing...'
      : 'Start guessing again...'
  );
  document.querySelector('.guess').value = '';
  score = 10;
  changeTextContent('.score', score);
};

/* 
The starting point of execution
*/
changeTextContent('.score', score);
changeTextContent('.highscore', highScore);
document.querySelector('.check').addEventListener('click', gameCore); // when the user clicks on Check button
document.querySelector('.again').addEventListener('click', reset); // when the user clicks on Again button
