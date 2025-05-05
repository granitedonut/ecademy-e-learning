const questions = [
    {
        question: "What is the primary goal of ethical hacking?",
        answers: [
            { text: "To gain unauthorized access to systems", correct: false },
            { text: "To exploit security vulnerabilities for personal gain", correct: false },
            { text: "To find and fix security vulnerabilities in a system", correct: true },
            { text: "To create security vulnerabilities for testing purposes", correct: false }
        ]
    },
    {
        question: "Which term is used to describe a hacker who performs security tests with permission?",
        answers: [
            { text: "Black-hat hacker", correct: false },
            { text: "White-hat hacker", correct: true },
            { text: "Gray-hat hacker", correct: false },
            { text: "Script kiddie", correct: false }
        ]
    },
    {
        question: "What is a common tool used by ethical hackers to perform network scanning?",
        answers: [
            { text: "Nmap", correct: true },
            { text: "Wireshark", correct: false },
            { text: "Metasploit", correct: false },
            { text: "John the Ripper", correct: false }
        ]
    },
    {
        question: "Which of the following is an example of a reconnaissance technique used in ethical hacking?",
        answers: [
            { text: "SQL injection", correct: false },
            { text: "Social engineering", correct: false },
            { text: "Buffer overflow", correct: false },
            { text: "Port scanning", correct: true }
        ]
    },
    {
        question: "What is the purpose of a vulnerability assessment in ethical hacking?",
        answers: [
            { text: "To exploit vulnerabilities to gain unauthorized access", correct: false },
            { text: "To identify and document security weaknesses", correct: true },
            { text: "To install malware on a system", correct: false },
            { text: "To perform denial-of-service attacks", correct: false }
        ]
    },
    {
        question: "Which legal document typically authorizes an ethical hacker to test a system for vulnerabilities?",
        answers: [
            { text: "End User License Agreement (EULA)", correct: false },
            { text: "Non-Disclosure Agreement (NDA)", correct: false },
            { text: "Penetration Testing Agreement", correct: true },
            { text: "Terms of Service (ToS)", correct: false }
        ]
    },
    {
        question: "What is a common method for ethical hackers to ensure their activities are legal and authorized?",
        answers: [
            { text: "Performing hacking activities without notifying anyone", correct: false },
            { text: "Using social engineering techniques to bypass security", correct: false },
            { text: "Obtaining written consent from the system owner", correct: true },
            { text: "Accessing public information without permission", correct: false }
        ]
    },
    {
        question: "Which of the following is a key principle of ethical hacking?",
        answers: [
            { text: "Respecting privacy and confidentiality", correct: true },
            { text: "Causing disruption to the target system", correct: false },
            { text: "Publishing vulnerabilities without disclosure", correct: false },
            { text: "Using hacking skills for illegal activities", correct: false }
        ]
    },
    {
        question: "What is the role of a penetration test in ethical hacking?",
        answers: [
            { text: "To passively monitor network traffic", correct: false },
            { text: "To actively simulate attacks to find vulnerabilities", correct: true },
            { text: "To install and run antivirus software", correct: false },
            { text: "To analyze data breaches after they occur", correct: false }
        ]
    },
    {
        question: "Which of the following is a common ethical hacking certification?",
        answers: [
            { text: "Certified Information Systems Auditor (CISA)", correct: false },
            { text: "Certified Ethical Hacker (CEH)", correct: true },
            { text: "Certified Network Defender (CND)", correct: false },
            { text: "Certified Information Systems Security Professional (CISSP)", correct: false }
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
