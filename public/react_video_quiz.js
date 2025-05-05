const questions = [
    {
        question: "What is the primary purpose of React?",
        answers: [
            { text: "To manage state in applications", correct: false },
            { text: "To handle routing in applications", correct: false },
            { text: "To build user interfaces", correct: true },
            { text: "To handle server-side operations", correct: false }
        ]
    },
    {
        question: "What is a 'component' in React?",
        answers: [
            { text: "A function that returns HTML", correct: false },
            { text: "A JavaScript library for managing state", correct: false },
            { text: "A part of the UI that can be reused", correct: true },
            { text: "A method for handling user events", correct: false }
        ]
    },
    {
        question: "How do you create a functional component in React?",
        answers: [
            { text: "By defining a class that extends React.Component", correct: false },
            { text: "By using a function that returns JSX", correct: true },
            { text: "By creating a new instance of React.Component", correct: false },
            { text: "By using the createComponent method", correct: false }
        ]
    },
    {
        question: "Which hook is used to manage local state in functional components?",
        answers: [
            { text: "useEffect", correct: false },
            { text: "useContext", correct: false },
            { text: "useState", correct: true },
            { text: "useReducer", correct: false }
        ]
    },
    {
        question: "How can you pass data from a parent component to a child component in React?",
        answers: [
            { text: "Using context", correct: false },
            { text: "Using props", correct: true },
            { text: "Using state", correct: false },
            { text: "Using a global store", correct: false }
        ]
    },
    {
        question: "What does JSX stand for in React?",
        answers: [
            { text: "JavaScript XML", correct: true },
            { text: "JavaScript XSL", correct: false },
            { text: "JavaScript Syntax Extension", correct: false },
            { text: "JavaScript Extended Language", correct: false }
        ]
    },
    {
        question: "What is the purpose of the useEffect hook in React?",
        answers: [
            { text: "To manage state in functional components", correct: false },
            { text: "To perform side effects in functional components", correct: true },
            { text: "To handle user inputs", correct: false },
            { text: "To manage component lifecycle", correct: false }
        ]
    },
    {
        question: "What does the key prop do in a list of elements in React?",
        answers: [
            { text: "It sets a unique identifier for each element in the list", correct: true },
            { text: "It defines the HTML element type", correct: false },
            { text: "It determines the component’s style", correct: false },
            { text: "It controls the visibility of the element", correct: false }
        ]
    },
    {
        question: "Which method is used to update the state in a class component?",
        answers: [
            { text: "setState()", correct: true },
            { text: "updateState()", correct: false },
            { text: "changeState()", correct: false },
            { text: "modifyState()", correct: false }
        ]
    },
    {
        question: "What is the purpose of the ReactDOM.render() method?",
        answers: [
            { text: "To create a new React component", correct: false },
            { text: "To render a component into the DOM", correct: true },
            { text: "To manage the state of a component", correct: false },
            { text: "To handle routing in a React application", correct: false }
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
