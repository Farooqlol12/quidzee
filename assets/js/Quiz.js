const quizData = [
  {
    question: 'Which country won the FIFA World Cup in 2018?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    answer: 'France',
  },
  {
    question: 'Who is this player?',
    imageClass: 'q1',
    options: ['William Saliba', 'Jeremy Frimpong', 'Alejandro Grimaldo', 'Kylian Mbappe'],
    answer: 'Alejandro Grimaldo',
  },
  {
    question: 'Which team won the UEFA Euro 2020 tournament?',
    options: ['Italy', 'England', 'Spain', 'Portugal'],
    answer: 'Italy',
  },
  {
    question: 'Who is the all-time top scorer in the Premier League?',
    options: ['Alan Shearer', 'Wayne Rooney', 'Thierry Henry', 'Frank Lampard'],
    answer: 'Alan Shearer',
  },
  {
    question: 'Which team logo is this?',
    imageClass: 'q2',
    options: ['Inter-miami', 'Dragon fc', 'Aston villa', 'leverkusen'],
    answer: 'leverkusen',
  },
  {
    question: 'Which player has won the Ballon d\'Or the most times?',
    options: ['Lionel Messi', 'Cristiano Ronaldo', 'Michel Platini', 'Johan Cruyff'],
    answer: 'Lionel Messi',
  },
  {
    question: 'Which club has won the most UEFA Champions League titles?',
    options: ['Real Madrid', 'Barcelona', 'Bayern Munich', 'Liverpool'],
    answer: 'Real Madrid',
  },
  {
    question: 'Which stadium is this?',
    imageClass: 'q3',
    options: ['lusail stadium', 'thani bin stadium', 'Tottenham stadium', 'West ham stadium'],
    answer: 'lusail stadium',
  },
  {
    question: 'Who is the current manager of the Liverpool football club?',
    options: ['Jurgen Klopp', 'Pep Guardiola', 'Carlo Ancelotti', 'Jose Mourinho'],
    answer: 'Jurgen Klopp',
  },
  {
    question: 'Who is this Manager?',
    imageClass: 'q4',
    options: ['Xabi alonso', 'Diego Maradona', 'Pep Guardiola', 'Xavi'],
    answer: 'Xabi alonso',
  },
];

// Remaining code (DOM elements, functions, event listeners) remains the same as previously shown.


// DOM elements
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const timerElement = document.getElementById('timer');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');


// State variables
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timeRemaining = 60; // 1 minute
let timerInterval;

// Function to shuffle array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display current question
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  // Create question element
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  // Create options element
  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  // Shuffle options
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  // Create radio buttons for options
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

  // Clear previous question and append current question and options
  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);

  // Check if the question has an associated imageClass
  if (questionData.imageClass) {
    const imageElement = document.createElement('div');
    imageElement.className = `question-image ${questionData.imageClass}`;
    quizContainer.appendChild(imageElement);
  }

  quizContainer.appendChild(optionsElement);
}

// Function to start the timer
function startTimer() {
  timerElement.innerHTML = `Time Remaining: 01:00`;
  timerInterval = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.innerHTML = `Time Remaining: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      displayResult();
    }
  }, 1000);
}

// Function to check the selected answer
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

// Function to display quiz result and show the iframe
function displayResult() {
  clearInterval(timerInterval);
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.classList.remove('hide');
  showAnswerButton.classList.remove('hide');

  // Display the score and time spent
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Time spent: ${60 - timeRemaining} seconds</p>
    <div id="iframe-container" class="iframe-container">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdbFvA8IvYX6_b1OtaAVNs35L40lSiluYlBoaXkZtKATKSaRg/viewform?embedded=true" 
              width="260" height="273" 
              frameborder="0" marginheight="0" marginwidth="0">
        Loading…
      </iframe>
    </div>
  `;

  // Show the iframe container
  document.getElementById('iframe-container').classList.remove('hide');
}





// Function to retry the quiz
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  timeRemaining = 60; // Reset timer
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.classList.add('hide');
  showAnswerButton.classList.add('hide');
  resultContainer.innerHTML = '';
  displayQuestion();
  startTimer();
}

// Function to show incorrect answers
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.classList.remove('hide');
  showAnswerButton.classList.add('hide');

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

// Event listeners for buttons
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

// Initialize quiz
displayQuestion();
startTimer();
