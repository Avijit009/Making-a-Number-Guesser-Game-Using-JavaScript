let low = 1;
let high = 10;
let correct_ans = Math.floor(Math.random() * (high - low + 1)) + low;

// Initialize a variable to track if the player wins
let win = false;

// Set the number of attempts
let attempts = 3;

const textBox = document.querySelector('#textBox');
const hint = document.querySelector('.hint');
const resultDiv = document.querySelector('.result');
const submitBtn = document.querySelector('.btn');
const correctAnsElement = document.querySelector('.correct_ans');

function resetGame() {
    correct_ans = Math.floor(Math.random() * (high - low + 1)) + low;
    win = false;
    attempts = 3;
    hint.textContent = '';
    textBox.value = '';
    // Re-enable the input field
    textBox.disabled = false;
    submitBtn.disabled = false;
    correctAnsElement.textContent = '';

    // Clear any previous result message
    resultDiv.textContent = ''; 
}

submitBtn.addEventListener('click', function () {
    const userGuess = parseInt(textBox.value);

    if (isNaN(userGuess) || userGuess < low || userGuess > high) {
        hint.textContent = 'Hint: Please enter a valid number between ' + low + ' and ' + high + '.';
        hint.style.color = 'chocolate';
        return;
    }

    attempts--;

    if (userGuess === correct_ans) {
        hint.textContent = 'You Win!';
        hint.style.color = 'green';
        hint.style.fontSize = '20px';
        hint.style.fontWeight = 'bold';
        win = true;
        submitBtn.disabled = true;
         // Disable the input field when the player wins
        textBox.disabled = true;
        correctAnsElement.textContent = 'The correct answer was: ' + correct_ans;
        correctAnsElement.style.background = 'chocolate';
        correctAnsElement.style.color = 'white';
        correctAnsElement.style.borderRadius = '4px';
        correctAnsElement.style.padding = '4px 8px';
        correctAnsElement.style.marginTop = '8px';

    } else if (userGuess < correct_ans) {
        hint.textContent = 'Hint: Correct answer is greater!';
        hint.style.color = 'gray';

    } else if (userGuess > correct_ans) {
        hint.textContent = 'Hint: Correct answer is smaller!';
        hint.style.color = 'gray';
    }

    if (!win && attempts === 0) {
        hint.textContent = 'You Lose!';
        hint.style.color = 'red';
        hint.style.fontSize = '20px';
        hint.style.fontWeight = 'bold';
        submitBtn.disabled = true;

        // Disable the input field when the player loses
        textBox.disabled = true; 

        correctAnsElement.textContent = 'The correct answer was: ' + correct_ans;
        correctAnsElement.style.background = 'chocolate';
        correctAnsElement.style.color = 'white';
        correctAnsElement.style.borderRadius = '4px';
        correctAnsElement.style.padding = '4px 8px';
        correctAnsElement.style.marginTop = '8px';
    }

    // Clear the input field after submitting
    textBox.value = '';

    if (win || (attempts === 0 && !win)) {
        // Display the restart button after showing the correct answer
        const restartButton = document.createElement('button');

        restartButton.textContent = 'Reset';
        restartButton.style.background = 'gray';
        restartButton.style.color = 'white';
        restartButton.style.border = 'none';
        restartButton.style.cursor = 'pointer';
        restartButton.style.padding = '5px 10px';
        restartButton.style.borderRadius = '4px';
        restartButton.addEventListener('click', resetGame);
        
        resultDiv.appendChild(restartButton);
    }
});

// Initial game setup
resetGame();
