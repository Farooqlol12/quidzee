const quizData = [
  {
    question: 'What is your favorite color?',
    options: [
      { text: 'Red', hero: 'Iron Man' },
      { text: 'Blue', hero: 'Superman' },
      { text: 'Black', hero: 'Batman' },
      { text: 'Green', hero: 'Hulk' },
      { text: 'Yellow', hero: 'Wonder Woman' },
      { text: 'Silver', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'Which superpower would you prefer?',
    options: [
      { text: 'Super strength', hero: 'Hulk' },
      { text: 'Flying', hero: 'Superman' },
      { text: 'Invisibility', hero: 'Batman' },
      { text: 'Super speed', hero: 'Iron Man' },
      { text: 'Telekinesis', hero: 'Wonder Woman' },
      { text: 'Healing', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'Identify this superhero emblem:',
    imageClass: 'emblem1',
    options: [
      { text: 'Batman', hero: 'Batman' },
      { text: 'Superman', hero: 'Superman' },
      { text: 'Spiderman', hero: 'Iron Man' },
      { text: 'Ironman', hero: 'Iron Man' },
      { text: 'Wonder Woman', hero: 'Wonder Woman' },
      { text: 'Silver Surfer', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'What is your favorite hobby?',
    options: [
      { text: 'Reading', hero: 'Iron Man' },
      { text: 'Sports', hero: 'Superman' },
      { text: 'Gaming', hero: 'Batman' },
      { text: 'Traveling', hero: 'Hulk' },
      { text: 'Meditation', hero: 'Wonder Woman' },
      { text: 'Surfing', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'Identify this superhero:',
    imageClass: 'hero1',
    options: [
      { text: 'Thor', hero: 'Hulk' },
      { text: 'Hulk', hero: 'Hulk' },
      { text: 'Black Widow', hero: 'Iron Man' },
      { text: 'Captain America', hero: 'Superman' },
      { text: 'Wonder Woman', hero: 'Wonder Woman' },
      { text: 'Silver Surfer', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'Which city would you prefer to protect?',
    options: [
      { text: 'Gotham', hero: 'Batman' },
      { text: 'Metropolis', hero: 'Superman' },
      { text: 'New York', hero: 'Iron Man' },
      { text: 'Atlantis', hero: 'Wonder Woman' },
      { text: 'Asgard', hero: 'Hulk' },
      { text: 'Zen-La', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'Identify this superhero logo:',
    imageClass: 'emblem2',
    options: [
      { text: 'Batman', hero: 'Batman' },
      { text: 'Superman', hero: 'Superman' },
      { text: 'Spiderman', hero: 'Iron Man' },
      { text: 'Wonder Woman', hero: 'Wonder Woman' },
      { text: 'Hulk', hero: 'Hulk' },
      { text: 'Silver Surfer', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'What motivates you the most?',
    options: [
      { text: 'Justice', hero: 'Batman' },
      { text: 'Peace', hero: 'Superman' },
      { text: 'Adventure', hero: 'Iron Man' },
      { text: 'Strength', hero: 'Hulk' },
      { text: 'Wisdom', hero: 'Wonder Woman' },
      { text: 'Exploration', hero: 'Silver Surfer' },
    ],
  },
  {
    question: 'Identify this superhero gear:',
    imageClass: 'gear1',
    options: [
      { text: 'Batmobile', hero: 'Batman' },
      { text: 'Iron Man suit', hero: 'Iron Man' },
      { text: 'Lasso of Truth', hero: 'Wonder Woman' },
      { text: 'Mjolnir', hero: 'Hulk' },
      { text: 'Board', hero: 'Silver Surfer' },
      { text: 'Cape', hero: 'Superman' },
    ],
  },
  {
    question: 'Who is your favorite superhero?',
    options: [
      { text: 'Iron Man', hero: 'Iron Man' },
      { text: 'Superman', hero: 'Superman' },
      { text: 'Batman', hero: 'Batman' },
      { text: 'Hulk', hero: 'Hulk' },
      { text: 'Wonder Woman', hero: 'Wonder Woman' },
      { text: 'Silver Surfer', hero: 'Silver Surfer' },
    ],
  },
];

// DOM elements
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const timerContainer = document.getElementById('timer');

// State variables
let currentQuestion = 0;
let scores = {
  'Iron Man': 0,
  'Superman': 0,
  'Batman': 0,
  'Hulk': 0,
  'Wonder Woman': 0,
  'Silver Surfer': 0,
};
let timerInterval;

// Function to shuffle array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to start the timer
function startTimer(duration) {
  let timer = duration, minutes, seconds;
  timerInterval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerContainer.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      displayResult();
    }
  }, 1000);
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
    radio.value = shuffledOptions[i].hero;

    const optionText = document.createTextNode(shuffledOptions[i].text);

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
    const hero = selectedOption.value;
    scores[hero]++;
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      clearInterval(timerInterval);
      displayResult();
    }
  }
}

// Function to display quiz result
function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.classList.remove('hide');

  let maxScore = 0;
  let bestHero = '';

  for (const hero in scores) {
    if (scores[hero] > maxScore) {
      maxScore = scores[hero];
      bestHero = hero;
    }
  }

  resultContainer.innerHTML = `
    <div>You are most like ${bestHero}!</div>
    <div class="hero-result ${'hero-' + bestHero.toLowerCase().replace(' ', '')}"></div>
  `;
}


// Function to retry the quiz
function retryQuiz() {
  currentQuestion = 0;
  scores = {
    'Iron Man': 0,
    'Superman': 0,
    'Batman': 0,
    'Hulk': 0,
    'Wonder Woman': 0,
    'Silver Surfer': 0,
  };
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.classList.add('hide');
  resultContainer.innerHTML = '';
  displayQuestion();
}

// Event listeners for buttons
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);

// Initial quiz display and timer start
displayQuestion();
startTimer(120);  // 120 seconds for the quiz
