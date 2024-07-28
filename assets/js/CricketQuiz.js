const cricketQuizData = [
  {
    question: 'Who holds the record for the highest individual score in a single Test inning?',
    options: ['Brian Lara', 'Sachin Tendulkar', 'Donald Bradman', 'Virender Sehwag'],
    answer: 'Brian Lara',
  },
  {
    question: 'Identify this cricket stadium:',
    imageClass: 'stadium1', // CSS class for the image
    options: ['Melbourne Cricket Ground', 'Lord\'s Cricket Ground', 'Eden Gardens', 'Old Trafford'],
    answer: 'Lord\'s Cricket Ground',
  },
  {
    question: 'Who is known as the "Sultan of Swing"?',
    options: ['Wasim Akram', 'Glenn McGrath', 'James Anderson', 'Shaun Pollock'],
    answer: 'Wasim Akram',
  },
  {
    question: 'Which player has scored the fastest century in ODI cricket?',
    options: ['AB de Villiers', 'Shahid Afridi', 'Chris Gayle', 'Virat Kohli'],
    answer: 'AB de Villiers',
  },
  {
    question: 'Identify this legendary cricketer:',
    imageClass: 'player1', // CSS class for the image
    options: ['Sunil Gavaskar', 'Viv Richards', 'Allan Border', 'Javed Miandad'],
    answer: 'Viv Richards',
  },
  {
    question: 'Which bowler has taken the most wickets in Test cricket?',
    options: ['Shane Warne', 'Muttiah Muralitharan', 'Anil Kumble', 'James Anderson'],
    answer: 'Muttiah Muralitharan',
  },
  {
    question: 'Identify this famous moment:',
    imageClass: 'moment1', // CSS class for the image
    options: ['Kapil Dev lifting the 1983 World Cup', 'MS Dhoni hitting the winning six in 2011', 'Imran Khan lifting the 1992 World Cup', 'Ricky Ponting celebrating a century'],
    answer: 'Kapil Dev lifting the 1983 World Cup',
  },
  {
    question: 'Which cricketer is known as the "Little Master"?',
    options: ['Sachin Tendulkar', 'Sunil Gavaskar', 'Virat Kohli', 'Rahul Dravid'],
    answer: 'Sunil Gavaskar',
  },
  {
    question: 'Which team holds the record for the highest score in a single ODI match?',
    options: ['England', 'Australia', 'India', 'South Africa'],
    answer: 'England',
  },
  {
    question: 'Identify this cricketer known for 100 international centuries:',
    imageClass: 'player2', // CSS class for the image
    options: ['Ricky Ponting', 'Virat Kohli', 'Sachin Tendulkar', 'Jacques Kallis'],
    answer: 'Sachin Tendulkar',
  },
];

// DOM elements
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const timerContainer = document.getElementById('timer');

// State variables
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timer;
let timeLeft = 60; // 1 minute in seconds

// Function to shuffle array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to start the timer
function startTimer() {
  timerContainer.innerHTML = `Time left: ${timeLeft} seconds`;
  timer = setInterval(() => {
    timeLeft--;
    timerContainer.innerHTML = `Time left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      displayResult();
    }
  }, 1000);
}

// Function to display current question
function displayQuestion() {
  const questionData = cricketQuizData[currentQuestion];

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

// Function to check the selected answer
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === cricketQuizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: cricketQuizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: cricketQuizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < cricketQuizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

// Function to display quiz result and show the iframe
function displayResult() {
  clearInterval(timer);
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.classList.remove('hide');
  showAnswerButton.classList.remove('hide');

  // Display the score and time spent
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${cricketQuizData.length}!</p>
    <p>Time spent: ${60 - timeLeft} seconds</p>
    <div id="iframe-container" class="iframe-container">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd92i41At13b9n2plgQpa05eOiAlD9tcEVVhL7mO3B32Png6A/viewform?embedded=true" 
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
  timeLeft = 60;
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.classList.add('hide');
  showAnswerButton.classList.add('hide');
  resultContainer.innerHTML = '';
  displayQuestion();
  startTimer();
}

// Function to show correct answers
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
    <p>You scored ${score} out of ${cricketQuizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

// Event listeners for buttons
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

// Initial quiz display
displayQuestion();
startTimer();
