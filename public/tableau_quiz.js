const questions = [
    {
        question: "What is Tableau primarily used for?",
        answers: [
            { text: "Database management", correct: false },
            { text: "Data visualization", correct: true },
            { text: "Web development", correct: false },
            { text: "Network security", correct: false }
        ]
    },
    {
        question: "Which file format is used to save Tableau workbooks?",
        answers: [
            { text: ".twb", correct: true },
            { text: ".xlsx", correct: false },
            { text: ".csv", correct: false },
            { text: ".tde", correct: false }
        ]
    },
    {
        question: "What is a Tableau Dashboard?",
        answers: [
            { text: "A collection of visualizations", correct: true },
            { text: "A single data visualization", correct: false },
            { text: "A Tableau workbook file", correct: false },
            { text: "A server connection", correct: false }
        ]
    },
    {
        question: "Which Tableau feature allows combining data from different sources?",
        answers: [
            { text: "Data Blending", correct: true },
            { text: "Data Joining", correct: false },
            { text: "Data Extraction", correct: false },
            { text: "Cross Filtering", correct: false }
        ]
    },
    {
        question: "Which Tableau product is used to share dashboards online?",
        answers: [
            { text: "Tableau Desktop", correct: false },
            { text: "Tableau Server", correct: true },
            { text: "Tableau Public", correct: false },
            { text: "Tableau Prep", correct: false }
        ]
    },
    {
        question: "What is the default aggregation for numeric fields in Tableau?",
        answers: [
            { text: "Sum", correct: true },
            { text: "Average", correct: false },
            { text: "Count", correct: false },
            { text: "Median", correct: false }
        ]
    },
    {
        question: "Which chart type is best for showing trends over time in Tableau?",
        answers: [
            { text: "Bar chart", correct: false },
            { text: "Line chart", correct: true },
            { text: "Pie chart", correct: false },
            { text: "Scatter plot", correct: false }
        ]
    },
    {
        question: "What is a Tableau Story?",
        answers: [
            { text: "A narrative presentation of dashboards", correct: true },
            { text: "A collection of data sources", correct: false },
            { text: "A single worksheet", correct: false },
            { text: "A Tableau workbook extension", correct: false }
        ]
    },
    {
        question: "Which of the following allows you to filter data in Tableau?",
        answers: [
            { text: "Parameters", correct: false },
            { text: "Aggregations", correct: false },
            { text: "Dimensions", correct: false },
            { text: "Filters", correct: true }
        ]
    },
    {
        question: "What does Tableau use to extract and store data?",
        answers: [
            { text: "Data Extract Engine", correct: false },
            { text: "Tableau Server", correct: false },
            { text: "Hyper Engine", correct: true },
            { text: "SQL Engine", correct: false }
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

    if (score > 6) {
        const viewCertificateButton = document.createElement("a");
        viewCertificateButton.href = "tabcert.html"; // Replace with the certificate page URL
        viewCertificateButton.innerHTML = "View Certificate";
        viewCertificateButton.classList.add(
            "px-4", 
            "py-2", 
            "text-sm", 
            "font-medium", 
            "text-white", 
            "bg-green-600", 
            "rounded-md", 
            "hover:bg-green-500", 
            "mt-4", 
            "block", 
            "text-center"
        );
        document.querySelector(".quiz").appendChild(viewCertificateButton);
    } else {
        nextButton.innerHTML = "Try Again";
        nextButton.style.display = "block";
    }
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

