// ==========================
// Quiz Data
// ==========================
const allTopics = {
  "Basic Computers": [
    { question: "Which part of the computer performs calculations and logic operations?", options: ["CPU", "RAM", "ROM", "Hard Disk"], answer: "CPU" },
    { question: "What does BIOS stand for?", options: ["Basic Integrated Operating System", "Basic Input Output System", "Binary Input Output Setup", "Basic Internal Output Service"], answer: "Basic Input Output System" },
    { question: "Which storage device is fastest?", options: ["Hard Disk Drive", "Solid State Drive", "CD-ROM", "Magnetic Tape"], answer: "Solid State Drive" },
    { question: "Which key is used to refresh a webpage in Windows?", options: ["F2", "F5", "Ctrl + R", "Esc"], answer: "F5" },
    { question: "Which company developed the Windows operating system?", options: ["Apple", "Microsoft", "IBM", "Google"], answer: "Microsoft" },
    { question: "What is the full form of IP?", options: ["Internet Protocol", "Internal Processing", "Input Process", "Information Path"], answer: "Internet Protocol" },
    { question: "Which of these is an open-source operating system?", options: ["Windows", "Linux", "MacOS", "Solaris"], answer: "Linux" },
    { question: "Which device connects a computer to the internet?", options: ["Router", "Monitor", "Keyboard", "Scanner"], answer: "Router" },
    { question: "Which file extension is used for Microsoft Excel?", options: [".docx", ".xlsx", ".pptx", ".pdf"], answer: ".xlsx" },
    { question: "What is the brain of the computer?", options: ["Motherboard", "Processor", "RAM", "Hard Disk"], answer: "Processor" }
  ],

  "C Programming": [
    { question: "Which header file is needed for printf() function?", options: ["<stdio.h>", "<conio.h>", "<stdlib.h>", "<string.h>"], answer: "<stdio.h>" },
    { question: "Which loop executes at least once?", options: ["for loop", "while loop", "do-while loop", "nested loop"], answer: "do-while loop" },
    { question: "Which operator is used to access value at a pointer?", options: ["*", "&", "->", "%"], answer: "*" },
    { question: "Which keyword is used to stop a loop?", options: ["exit", "stop", "break", "end"], answer: "break" },
    { question: "What is the default return type of a function in C?", options: ["float", "int", "void", "char"], answer: "int" },
    { question: "Which function is used to get a character input in C?", options: ["scanf()", "getch()", "getchar()", "cin"], answer: "getchar()" },
    { question: "Which storage class makes a variable accessible only within the same file?", options: ["auto", "static", "extern", "register"], answer: "static" },
    { question: "What is the size of int in most 32-bit systems?", options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"], answer: "4 bytes" },
    { question: "Which function is used to allocate memory dynamically in C?", options: ["malloc()", "calloc()", "realloc()", "All of these"], answer: "All of these" },
    { question: "What does the symbol '&&' mean in C?", options: ["OR", "NOT", "AND", "Bitwise AND"], answer: "AND" }
  ],

  "Python": [
    { question: "Which keyword is used to create a class in Python?", options: ["def", "function", "class", "struct"], answer: "class" },
    { question: "Which collection type is immutable?", options: ["list", "tuple", "set", "dictionary"], answer: "tuple" },
    { question: "What is the output of len('OpenAI')?", options: ["4", "5", "6", "7"], answer: "6" },
    { question: "Which keyword is used for exception handling?", options: ["catch", "try", "throw", "except"], answer: "try" },
    { question: "Which module is used for mathematical operations in Python?", options: ["math", "os", "sys", "re"], answer: "math" },
    { question: "Which keyword is used to create a generator in Python?", options: ["yield", "return", "generate", "next"], answer: "yield" },
    { question: "What is the output of type(3.0)?", options: ["int", "float", "double", "number"], answer: "float" },
    { question: "Which built-in function is used to find maximum value?", options: ["largest()", "max()", "maximum()", "biggest()"], answer: "max()" },
    { question: "Which library is used for data visualization?", options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"], answer: "Matplotlib" },
    { question: "Which statement is true about Python?", options: ["It is statically typed", "It uses indentation to define blocks", "It does not support OOP", "It is only for AI"], answer: "It uses indentation to define blocks" }
  ]
};


// ==========================
// State Variables
// ==========================
let participantName = "";
let currentTopic = "Basic Computers";
let currentQuestionIndex = 0;
let currentQuestions = [];
let score = 0;
let totalTime = 30 * 60; // 30 minutes in seconds
let timerInterval;
let currentQuestionGlobalIndex = 0;

let allUserAnswers = {
  "Basic Computers": Array(10).fill(null),
  "C Programming": Array(10).fill(null),
  "Python": Array(10).fill(null)
};

// ==========================
// DOM Elements
// ==========================
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

// ==========================
// Start Quiz
// ==========================
document.getElementById("start-quiz").addEventListener("click", () => {
  const nameInput = document.getElementById("participant-name").value.trim();
  if (nameInput === "") {
    alert("Please enter your name!");
    return;
  }
  participantName = nameInput;

  // Hide name input, show quiz
  nameContainer.style.display = "none";
  quizContainer.style.display = "block";
  document.getElementById("topic-buttons").style.display = "flex";

  startTimer();
  switchTopic("Basic Computers");
});

// ==========================
// Timer Functions
// ==========================
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
  timeEl.innerText = `⏳ ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// ==========================
// Topic Switching
// ==========================
function switchTopic(topic) {
  currentTopic = topic;
  currentQuestions = [...allTopics[topic]];
  currentQuestionIndex = 0;

  // Calculate global index
  let prevTopics = Object.keys(allTopics).slice(
    0,
    Object.keys(allTopics).indexOf(topic)
  );
  currentQuestionGlobalIndex = prevTopics.reduce(
    (acc, t) => acc + allTopics[t].length,
    0
  );

  loadQuestion();
}

document.querySelectorAll(".topic-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const topic = button.getAttribute("data-topic");
    switchTopic(topic);
  });
});

// ==========================
// Navigation
// ==========================
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

// ==========================
// Show Results
// ==========================
function showResult() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  score = 0;
  correctAnswersList.innerHTML = "";

  let globalIndex = 0;
  Object.keys(allTopics).forEach((topic) => {
    const topicQuestions = allTopics[topic];
    const userAnswers = allUserAnswers[topic];

    const topicHeader = document.createElement("h4");
    topicHeader.innerText = topic;
    correctAnswersList.appendChild(topicHeader);

    topicQuestions.forEach((q, idx) => {
      const li = document.createElement("li");
      const userAnswer = userAnswers[idx] || "No Answer";
      li.innerHTML = `<span class="question-text">${globalIndex + 1}. ${
        q.question
      }</span><br>
                      ✅ Correct: <span class="correct-answer">${q.answer}</span><br>
                      ✏ Your Answer: <span class="${
                        userAnswer === q.answer
                          ? "correct-answer"
                          : "wrong-answer"
                      }">${userAnswer}</span>`;
      if (userAnswer === q.answer) score++;
      correctAnswersList.appendChild(li);
      globalIndex++;
    });
  });

  participantDisplay.innerText = participantName;
  scoreDisplay.innerText = `${score} / 30`;
}

// ==========================
// Load Question
// ==========================
function loadQuestion() {
  const currentQuestion = currentQuestions[currentQuestionIndex];
  questionEl.innerHTML = `<span class="question-text">${
    currentQuestionGlobalIndex + 1
  }. ${currentQuestion.question}</span>`;
  optionsEl.innerHTML = "";

  const options = currentQuestion.options;
  const letters = ["A", "B", "C", "D"];

  options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.innerText = `${letters[i]}. ${opt}`;

    // If already answered
    if (allUserAnswers[currentTopic][currentQuestionIndex] === opt) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      // Clear other selections
      document
        .querySelectorAll("#options li")
        .forEach((el) => el.classList.remove("selected"));
      li.classList.add("selected");

      // Save user answer
      allUserAnswers[currentTopic][currentQuestionIndex] = opt;
    });

    optionsEl.appendChild(li);
  });

  // Show finish button only at last question
  finishBtn.style.display =
    currentQuestionGlobalIndex === 29 ? "inline-block" : "none";
}
