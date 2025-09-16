const allTopics = {
  "Basic Computers": [
    { question: "What does CPU stand for?", options: ["A:  Central Processing Unit", "B:  Computer Personal Unit", "C:  Central Process Utility", "D:Control Processing Unit"], answer: "Central Processing Unit" },
    { question: "Which device is used for permanent data storage?", options: ["A: RAM", "B:  ROM", "C:  Hard Disk", "D:  Cache"], answer: "Hard Disk" },
    { question: "Which of the following is an input device?", options: ["A:  Monitor", "B:  Keyboard", "C:  Printer", "D:  Speaker"], answer: "Keyboard" },
    { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Run All Memory", "Rapid Access Memory"], answer: "Random Access Memory" },
    { question: "Which one is an example of system software?", options: ["MS Word", "Windows OS", "Photoshop", "PowerPoint"], answer: "Windows OS" },
    { question: "Which memory is volatile?", options: ["ROM", "Hard Disk", "RAM", "DVD"], answer: "RAM" },
    { question: "What is the full form of URL?", options: ["Uniform Resource Locator", "Uniform Routing Link", "Universal Resource Link", "Uniform Reference Locator"], answer: "Uniform Resource Locator" },
    { question: "Which protocol is used for browsing the web?", options: ["FTP", "HTTP", "SMTP", "SNMP"], answer: "HTTP" },
    { question: "Which device displays output on screen?", options: ["Mouse", "Monitor", "Scanner", "Keyboard"], answer: "Monitor" },
    { question: "Which number system do computers use?", options: ["Decimal", "Octal", "Binary", "Hexadecimal"], answer: "Binary" }
  ],
  "C Programming": [
    { question: 'Who is considered the "father of the C language"?', options: ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Guido van Rossum"], answer: "Dennis Ritchie" },
    { question: "In which year was the C language developed?", options: ["1970", "1972", "1976", "1980"], answer: "1972" },
    { question: "Which is a correct way to declare an integer variable named count?", options: ["int count;", "count int;", "integer count;", "declare count as int;"], answer: "int count;" },
    { question: "Which symbol is used to denote a pre-processor statement in C?", options: ["!", "#", "~", ";"], answer: "#" },
    { question: "Which is the correct function to print output in C?", options: ["scan()", "print()", "printf()", "display()"], answer: "printf()" },
    { question: "Which operator is used for equality comparison in C?", options: ["=", "==", "!=", "==="], answer: "==" },
    { question: "What is the purpose of main() in a C program?", options: ["Define global variables", "Entry point of program execution", "File input/output", "Defines custom functions"], answer: "Entry point of program execution" },
    { question: "Which is correct way to initialize array numbers with 1,2,3?", options: ["int numbers[] = {1,2,3};", "int numbers[3] = (1,2,3);", "int numbers = {1,2,3};", "array numbers = [1,2,3];"], answer: "int numbers[] = {1,2,3};" },
    { question: "What does sizeof operator return?", options: ["Value of variable", "Memory address", "Size in bytes", "Number of elements"], answer: "Size in bytes" },
    { question: "Which data type is used to store a single character?", options: ["int", "float", "char", "double"], answer: "char" }
  ],
  "Python": [
    { question: "Who created Python?", options: ["James Gosling", "Dennis Ritchie", "Guido van Rossum", "Bjarne Stroustrup"], answer: "Guido van Rossum" },
    { question: "In which year was Python first released?", options: ["1989", "1991", "1995", "2000"], answer: "1991" },
    { question: "Which keyword is used to define a function in Python?", options: ["def", "func", "function", "define"], answer: "def" },
    { question: "Which of these is a Python data type?", options: ["list", "tuple", "set", "All of these"], answer: "All of these" },
    { question: "What is the output of print(2**3)?", options: ["6", "8", "9", "16"], answer: "8" },
    { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "<!-- -->"], answer: "#" },
    { question: "Which library is used for data analysis in Python?", options: ["NumPy", "Pandas", "Matplotlib", "All of these"], answer: "All of these" },
    { question: "Which function is used to get user input?", options: ["scan()", "input()", "read()", "get()"], answer: "input()" },
    { question: "Which is the correct extension of Python file?", options: [".python", ".pt", ".py", ".p"], answer: ".py" },
    { question: "What is Python mainly used for?", options: ["Web development", "AI & ML", "Data Science", "All of these"], answer: "All of these" }
  ]
};

// Global variables
let participantName = "";
let currentTopic = "Basic Computers";
let currentQuestionIndex = 0;
let currentQuestions = [];
let score = 0;
let totalTime = 1000;  // in seconds
let timerInterval;
let currentQuestionGlobalIndex = 0;

let allUserAnswers = {
  "Basic Computers": Array(10).fill(null),
  "C Programming": Array(10).fill(null),
  "Python": Array(10).fill(null)
};

// DOM Elements
const nameContainer = document.getElementById("name-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const scoreDisplay = document.getElementById("score-display");
const participantDisplay = document.getElementById("participant-display");
const correctAnswersList = document.getElementById("correct-answers-list");
const finishBtn = document.getElementById("finish");

// Start Quiz
document.getElementById("start-quiz").addEventListener("click", () => {
  const nameInput = document.getElementById("participant-name").value.trim();
  if (nameInput === "") {
    alert("Please enter your name!");
    return;
  }
  participantName = nameInput;
  nameContainer.style.display = "none";
  quizContainer.style.display = "block";
  document.getElementById("topic-buttons").style.display = "block";
  startTimer();
  switchTopic("Basic Computers");
});

// Timer
function startTimer() {
  updateTimeDisplay(totalTime);
  timerInterval = setInterval(() => {
    totalTime--;
    updateTimeDisplay(totalTime);

    if (totalTime <= 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 1000);
}

function updateTimeDisplay(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  timeEl.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Switch topic
function switchTopic(topic) {
  currentTopic = topic;
  currentQuestions = [...allTopics[topic]];
  shuffleArray(currentQuestions);
  currentQuestionIndex = 0;
  let prevTopics = Object.keys(allTopics).slice(0, Object.keys(allTopics).indexOf(topic));
  currentQuestionGlobalIndex = prevTopics.reduce((acc, t) => acc + allTopics[t].length, 0);
  loadQuestion();
}

// Topic buttons
document.querySelectorAll(".topic-btn").forEach(button => {
  button.addEventListener("click", () => {
    const topic = button.getAttribute("data-topic");
    switchTopic(topic);
  });
});

// Navigation
document.getElementById("next").addEventListener("click", () => {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex++;
    currentQuestionGlobalIndex++;
    loadQuestion();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    currentQuestionGlobalIndex--;
    loadQuestion();
  }
});

finishBtn.addEventListener("click", showResult);

// Show Results
function showResult() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  score = 0;
  correctAnswersList.innerHTML = "";

  let globalIndex = 0;
  Object.keys(allTopics).forEach(topic => {
    const topicQuestions = allTopics[topic];
    const userAnswers = allUserAnswers[topic];

    const topicHeader = document.createElement("h4");
    topicHeader.innerText = topic;
    correctAnswersList.appendChild(topicHeader);

    topicQuestions.forEach((q, idx) => {
      const li = document.createElement("li");
      const userAnswer = userAnswers[idx] || "No Answer";
      li.innerHTML = `<span class="question-text">${globalIndex + 1}. ${q.question}</span><br>
                      Correct Answer: <span class="correct-answer">${q.answer}</span><br>
                      Your Answer: <span class="${userAnswer === q.answer ? 'correct-answer' : 'wrong-answer'}">${userAnswer}</span>`;
      if (userAnswer === q.answer) score++;
      correctAnswersList.appendChild(li);
      globalIndex++;
    });
  });

  participantDisplay.innerText = participantName;
  scoreDisplay.innerText = `${score} / 30`;
}

// Shuffle helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Load Question
function loadQuestion() {
  const currentQuestion = currentQuestions[currentQuestionIndex];
  questionEl.innerHTML = `<span class="question-text">${currentQuestionGlobalIndex + 1}. ${currentQuestion.question}</span>`;
  optionsEl.innerHTML = "";

  const options = currentQuestion.options;
  const letters = ['A', 'B', 'C', 'D'];

  // Create table for options
  const table = document.createElement('table');
  const row1 = document.createElement('tr');
  const row2 = document.createElement('tr');

  for (let i = 0; i < 2; i++) {
    const td = document.createElement('td');
    const li = document.createElement('li');
    li.innerText = `${letters[i]}. ${options[i]}`;

    if (allUserAnswers[currentTopic][currentQuestionIndex] === options[i]) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      document.querySelectorAll("#options li").forEach(el => el.classList.remove("selected"));
      li.classList.add("selected");
      allUserAnswers[currentTopic][currentQuestionIndex] = options[i];
    });

    td.appendChild(li);
    row1.appendChild(td);
  }

  for (let i = 2; i < 4; i++) {
    const td = document.createElement('td');
    const li = document.createElement('li');
    li.innerText = `${letters[i]}. ${options[i]}`;

    if (allUserAnswers[currentTopic][currentQuestionIndex] === options[i]) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      document.querySelectorAll("#options li").forEach(el => el.classList.remove("selected"));
      li.classList.add("selected");
      allUserAnswers[currentTopic][currentQuestionIndex] = options[i];
    });

    td.appendChild(li);
    row2.appendChild(td);
  }

  table.appendChild(row1);
  table.appendChild(row2);
  optionsEl.appendChild(table);

  finishBtn.style.display = (currentQuestionGlobalIndex === 29) ? "inline-block" : "none";
}

