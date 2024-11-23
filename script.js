const quizData = [
  {
    question: 'Where was the first well located?',
    options: ['Spain', 'China', 'Cyprus', 'USA'],
    answer: 'Cyprus',
  },
  {
    question: 'Who was the first woman that flew an helicopter?',
    options: ['Claire Simmons', 'Josephine Thompson', 'Sharon Bowie', 'Hanna Reitsch'],
    answer: 'Hanna Reitsch',
  },
  {
    question: 'What country made the first orange juice?',
    options: ['Ecuador', 'France', 'USA', 'Japan'],
    answer: 'USA',
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
    answer: 'Skin',
  },
  {
    question: 'Who built the first ships in the world?',
    options: [
      'Romans',
      'Americans',
      'Egyptians',
      'Chinese',
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
      'Mars',
      'Venus',
      'Saturn',
      'Jupitar',
    ],
    answer: 'Venus',
  },
  {
    question: 'What animal flies, walks and swims?',
    options: ['Hen', 'Seal', 'Duck', 'Vulture'],
    answer: 'Duck',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const progressContainer = document.getElementById('progress');
const scoreContainer = document.getElementById('score');
const timerElement = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timerInterval;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function startTimer() {
  let timeLeft = 30;
  clearInterval(timerInterval); // Reset previous timer
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timerElement.innerHTML = `Time left: ${timeLeft--} seconds`;
    } else {
      clearInterval(timerInterval);
      checkAnswer(); // Auto-submit if time is up
    }
  }, 1000);
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  quizContainer.innerHTML = `
    <div class="question">${questionData.question}</div>
    <div class="options">
      ${shuffledOptions
        .map(
          (option) => `
          <label class="option">
            <input type="radio" name="quiz" value="${option}">
            ${option}
          </label>`
        )
        .join('')}
    </div>
  `;

  progressContainer.innerHTML = `Question ${currentQuestion + 1} of ${quizData.length}`;
  startTimer();
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
        userAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  } else {
    alert('Please select an answer before submitting!');
  }
  scoreContainer.innerHTML = `Score: ${score}`;
}

function displayResult() {
  clearInterval(timerInterval); // Stop timer
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    ${
      incorrectAnswers.length === 0
        ? '<p>Incorrect Answers: 0</p>'
        : `<p>Incorrect Answers:</p>${incorrectAnswers
            .map(
              (answer) =>
                `<p>Question: ${answer.question}<br>Your Answer: ${answer.userAnswer}<br>Correct Answer: ${answer.correctAnswer}</p>`
            )
            .join('')}`
    }
  `;
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

  resultContainer.innerHTML = `
    <p>Answers:</p>
    ${quizData
      .map(
        (data) =>
          `<p>Question: ${data.question}<br>Correct Answer: ${data.answer}</p>`
      )
      .join('')}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

      
