// ==========================
// Quiz Data
// ==========================
const allTopics = {
  "SQL": [
    { question: "Which SQL command is used to retrieve data from a database?", options: ["GET", "SELECT", "EXTRACT", "FETCH"], answer: "SELECT" },
    { question: "Which clause is used to filter rows in SQL?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], answer: "WHERE" },
    { question: "What does the PRIMARY KEY constraint do?", options: ["Allows NULL values", "Ensures uniqueness", "Creates index only", "Stores duplicate rows"], answer: "Ensures uniqueness" },
    { question: "Which SQL function returns the number of rows?", options: ["COUNT()", "SUM()", "LENGTH()", "ROWNUM()"], answer: "COUNT()" },
    { question: "Which operator is used for pattern matching in SQL?", options: ["BETWEEN", "LIKE", "IN", "EXISTS"], answer: "LIKE" },
    { question: "What is the default sorting order of ORDER BY?", options: ["Descending", "Ascending", "Random", "Depends on index"], answer: "Ascending" },
    { question: "Which SQL statement is used to remove a table?", options: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE", "TRUNCATE TABLE"], answer: "DROP TABLE" },
    { question: "What is a foreign key in SQL?", options: ["Unique identifier", "Link between tables", "Temporary column", "Auto increment column"], answer: "Link between tables" },
    { question: "Which SQL clause groups rows based on a column?", options: ["ORDER BY", "GROUP BY", "PARTITION BY", "JOIN"], answer: "GROUP BY" },
    { question: "Which command is used to update existing records?", options: ["CHANGE", "UPDATE", "MODIFY", "ALTER"], answer: "UPDATE" }
  ],
  "Python": [
    { question: "What type of programming language is Python?", options: ["Compiled", "Interpreted", "Assembly", "Machine"], answer: "Interpreted" },
    { question: "Which of these is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], answer: "Tuple" },
    { question: "What does the len() function do?", options: ["Counts only numbers", "Returns length of object", "Finds memory size", "Counts only strings"], answer: "Returns length of object" },
    { question: "Which keyword is used to handle exceptions?", options: ["try", "except", "catch", "throw"], answer: "except" },
    { question: "What is the output of bool('False') in Python?", options: ["False", "True", "Error", "None"], answer: "True" },
    { question: "Which library is used for numerical computations?", options: ["NumPy", "Flask", "Django", "Tkinter"], answer: "NumPy" },
    { question: "Which method is used to add an item to a list?", options: ["add()", "append()", "insert()", "push()"], answer: "append()" },
    { question: "What is the default return value of a Python function without return?", options: ["0", "None", "False", "Empty string"], answer: "None" },
    { question: "Which symbol is used for floor division in Python?", options: ["/", "//", "%", "**"], answer: "//" },
    { question: "Which Python keyword defines an anonymous function?", options: ["def", "func", "lambda", "inline"], answer: "lambda" }
  ],
  "DSA": [
    { question: "Which data structure uses FIFO principle?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: "O(log n)" },
    { question: "Which traversal visits nodes in Left-Root-Right order?", options: ["Preorder", "Inorder", "Postorder", "Level order"], answer: "Inorder" },
    { question: "Which sorting algorithm has the best average time complexity?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], answer: "Merge Sort" },
    { question: "Which data structure is used in recursion?", options: ["Queue", "Stack", "Array", "Graph"], answer: "Stack" },
    { question: "What is the maximum number of nodes in a binary tree of height h?", options: ["2^h - 1", "h^2", "h * 2", "h!"], answer: "2^h - 1" },
    { question: "Which algorithm is used for shortest path in graphs?", options: ["DFS", "BFS", "Dijkstra’s", "Kruskal’s"], answer: "Dijkstra’s" },
    { question: "Which operation is not possible in a stack?", options: ["Push", "Pop", "Peek", "Enqueue"], answer: "Enqueue" },
    { question: "Which data structure is best for implementing LRU cache?", options: ["Stack", "LinkedHashMap", "Queue", "HashSet"], answer: "LinkedHashMap" },
    { question: "Which searching algorithm is best for unsorted data?", options: ["Binary Search", "Linear Search", "DFS", "BFS"], answer: "Linear Search" }
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

