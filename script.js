const quizData = [
  {
    question: 'Where was the first well located?',
    options: ['Spain', 'China', 'Cyprus', 'USA'],
    answer: 'Cyprus',
  },
  {
    question: 'Who was the woman to bake a cake?',
    options: [' ', ' ', ' ', ' '],x
    answer: ' ',
  },
  {
    question: 'What country made the first orange juice?',
    options: ['Ecuador', 'France', 'USA', 'Japan'],
    answer: 'USA ',
  },
  {
    question: 'Who was the first man to fly in a hot air balloon?',
    options: ['James Simeon', 'Peter Rodriguez', 'Jean-François Pilâtre de Rozier', 'Sam Ruiz'],
    answer: 'Jean-François Pilâtre de Rozier',
  },
  {
    question: 'Who invented the first electric car?',
    options: [
      'Jimmy Prichard',
      'Sage Quin',
      'Robert Anderson',
      'Bobby Williamson',
    ],
    answer: 'Robert Anderson',
  },
  {
    question: 'What is the most sensitive part of the human body?',
    options: ['Lips', 'Neck', 'Skin', 'Fingertips'],
    answer: 'Skin ',
  },
  {
    question: 'Who built the first ships in the world?',
    options: [
      'Romans',
      'Americans',
      'Egyptians',
      'Chinese ',
    ],
    answer: 'Egyptians',
  },
  {
    question: 'Where is the oldest museum in the world located?',
    options: ['Vatican Museum', 'Capitoline Museum', 'Louvre Museum', 'The Ashmolean Museum'],
    answer: 'Capitoline Museum',
  },
  {
    question: 'What planet is the most similar to earth?',
    options: [
      'Mars ',
      'Venus',
      'Saturn ',
      'Jupitar ',
    ],
    answer: 'Venus',
  },
  {
    question: 'What animal flies, walks and swims?',
    options: ['Hen', 'Seal', 'Duck', 'Vulture'],
    answer: 'Duck ',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

// Your existing script.js content

// Function to display a question
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);

  // Progress Update
  const progressContainer = document.getElementById('progress');
  progressContainer.innerHTML = `Question ${currentQuestion + 1} of ${quizData.length}`;

  // Timer
  let timeLeft = 10;
  const timerElement = document.getElementById('timer');
  clearInterval(window.timerInterval); // Ensure no overlap from previous intervals
  window.timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timerElement.innerHTML = `Time left: ${timeLeft--} seconds`;
    } else {
      clearInterval(window.timerInterval);
      checkAnswer(); // Auto-submit when time is up
    }
  }, 1000);
}

// Function to check the answer
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;

    // Apply dynamic CSS class for correct/incorrect answers
    if (answer === quizData[currentQuestion].answer) {
      score++;
      selectedOption.parentElement.classList.add('correct');
    } else {
      selectedOption.parentElement.classList.add('incorrect');
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }

    // Score Display Update
    const scoreContainer = document.getElementById('score');
    scoreContainer.innerHTML = `Score: ${score}`;

    currentQuestion++;
    selectedOption.checked = false;

    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

// Other existing functions: displayResult, retryQuiz, showAnswer, etc.

displayQuestion(); // Initial call to load the first question
