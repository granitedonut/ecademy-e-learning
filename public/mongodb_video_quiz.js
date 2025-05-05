const questions = [
    {
        question: "What type of database is MongoDB?",
        answers: [
            { text: "Relational", correct: false },
            { text: "NoSQL", correct: true },
            { text: "Graph", correct: false },
            { text: "Key-Value", correct: false }
        ]
    },
    {
        question: "Which company developed MongoDB?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Oracle", correct: false },
            { text: "MongoDB Inc.", correct: true },
            { text: "IBM", correct: false }
        ]
    },
    {
        question: "Which package manager is commonly used to install MongoDB on Windows?",
        answers: [
            { text: "npm", correct: false },
            { text: "pip", correct: false },
            { text: "brew", correct: false },
            { text: "Chocolatey", correct: true }
        ]
    },
    {
        question: "What command is used to start the MongoDB service after installation?",
        answers: [
            { text: "mongo start", correct: false },
            { text: "mongod", correct: true },
            { text: "mongo init", correct: false },
            { text: "mongos", correct: false } 
        ]
    },
    {
        question: "In MongoDB, what is a collection?",
        answers: [
            { text: "A single data record", correct: false },
            { text: "A group of documents", correct: true },
            { text: "A database schema", correct: false },
            { text: "A set of indexes", correct: false }
        ]
    },
    {
        question: "Which format does MongoDB use to store data?",
        answers: [
            { text: "JSON", correct: false },
            { text: "XML", correct: false },
            { text: "CSV", correct: false },
            { text: "BSON", correct: true }
        ]
    },
    {
        question: "What is MongoDB Compass?",
        answers: [
            { text: "A command-line tool", correct: false },
            { text: "A graphical user interface (GUI) for MongoDB", correct: true },
            { text: "A cloud service for MongoDB", correct: false },
            { text: "A mobile app", correct: false }
        ]
    },
    {
        question: "What feature of MongoDB Compass allows you to visually explore your data?",
        answers: [
            { text: "Aggregation pipeline builder", correct: false },
            { text: "Schema explorer", correct: true },
            { text: "Real-time performance panel", correct: false },
            { text: "Index analyzer", correct: false }
        ]
    },
    {
        question: "Which command is used to switch to a different database in MongoDB Shell?",
        answers: [
            { text: "use <database_name>", correct: true },
            { text: "switch <database_name>", correct: false },
            { text: "db <database_name>", correct: false },
            { text: "select <database_name>", correct: false }
        ]
    },
    {
        question: "What is the command to show all collections in the current database?",
        answers: [
            { text: "show collections", correct: true },
            { text: "list collections", correct: false },
            { text: "db.collections", correct: false },
            { text: "show all", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
