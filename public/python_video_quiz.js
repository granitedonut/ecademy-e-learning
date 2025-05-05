const questions = [
    {
        question: "Which of the following is a valid variable name in Python?",
        answers: [
            { text: "2nd_variable", correct: false },
            { text: "second-variable", correct: false },
            { text: "second_variable", correct: true },
            { text: "second variable", correct: false }
        ]
    },
    {
        question: "What is the output of the following code snippet?",
        answers: [
            { text: "Hello", correct: false },
            { text: "World", correct: false },
            { text: ", Wor", correct: true },
            { text: "World!", correct: false }
        ]
    },
    {
        question: "What keyword is used to define a function in Python?",
        answers: [
            { text: "func", correct: false },
            { text: "define", correct: false },
            { text: "function", correct: false },
            { text: "def", correct: true }
        ]
    },
    {
        question: "How do you concatenate two strings in Python?",
        answers: [
            { text: "string1 + string2", correct: true },
            { text: "string1 & string2", correct: false },
            { text: "string1.concat(string2)", correct: false },
            { text: "string1.append(string2)", correct: false }
        ]
    },
    {
        question: "What is the output of the following code snippet?",
        answers: [
            { text: "[1, 2, 3, 4]", correct: true },
            { text: "[1, 2, 3]", correct: false },
            { text: "Error", correct: false },
            { text: "[4, 1, 2, 3]", correct: false }
        ]
    },
    {
        question: "Which of the following is used to handle exceptions in Python?",
        answers: [
            { text: "try and catch", correct: false },
            { text: "try and except", correct: true },
            { text: "error and catch", correct: false },
            { text: "throw and catch", correct: false }
        ]
    },
    {
        question: "How do you create a dictionary in Python?",
        answers: [
            { text: "dict = {key: value}", correct: true },
            { text: "dict = [key: value]", correct: false },
            { text: "dict = (key, value)", correct: false },
            { text: "dict = key => value", correct: false }
        ]
    },
    {
        question: "What does the len() function do in Python?",
        answers: [
            { text: "Returns the length of an object", correct: true },
            { text: "Converts an object to a string", correct: false },
            { text: "Finds the minimum value in an object", correct: false },
            { text: "Finds the maximum value in an object", correct: false }
        ]
    },
    {
        question: "How do you create a class in Python?",
        answers: [
            { text: "class MyClass:", correct: true },
            { text: "create class MyClass:", correct: false },
            { text: "new class MyClass:", correct: false },
            { text: "define class MyClass:", correct: false }
        ]
    },
    {
        question: "What is the purpose of the self keyword in Python classes?",
        answers: [
            { text: "Refers to the class itself", correct: false },
            { text: "Refers to the instance of the class", correct: true },
            { text: "Refers to the parent class", correct: false },
            { text: "Refers to a global variable", correct: false }
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
