const questions = [
    {
        question: "What does a firewall primarily do in a network?",
        answers: [
            { text: "Encrypt data", correct: false },
            { text: "Block unauthorized access", correct: true },
            { text: "Manage bandwidth", correct: false },
            { text: "Perform data backups", correct: false }
        ]
    },
    {
        question: "What is the main purpose of an Intrusion Detection System (IDS)?",
        answers: [
            { text: "To prevent malware attacks", correct: false },
            { text: "To detect unauthorized access", correct: true },
            { text: "To enforce encryption", correct: false },
            { text: "To provide secure file storage", correct: false }
        ]
    },
    {
        question: "Which of the following is a common method for securing wireless networks?",
        answers: [
            { text: "HTTP", correct: false },
            { text: "WEP", correct: false },
            { text: "WPA2", correct: true },
            { text: "Telnet", correct: false }
        ]
    },
    {
        question: "What is the process of converting plaintext into an unreadable format called?",
        answers: [
            { text: "Encryption", correct: true },
            { text: "Decryption", correct: false },
            { text: "Hashing", correct: false },
            { text: "Authentication", correct: false }
        ]
    },
    {
        question: "What kind of attack involves overwhelming a network with excessive traffic to make a service unavailable?",
        answers: [
            { text: "Phishing", correct: false },
            { text: "Denial of Service (DoS)", correct: true },
            { text: "Man-in-the-middle attack", correct: false },
            { text: "SQL injection", correct: false }
        ]
    },
    {
        question: "Which protocol is used for secure communication over the internet?",
        answers: [
            { text: "HTTP", correct: false },
            { text: "FTP", correct: false },
            { text: "HTTPS", correct: true },
            { text: "SMTP", correct: false }
        ]
    },
    {
        question: "What is a VPN primarily used for?",
        answers: [
            { text: "Encrypting emails", correct: false },
            { text: "Secure remote access to a network", correct: true },
            { text: "Blocking viruses", correct: false },
            { text: "Monitoring network traffic", correct: false }
        ]
    },
    {
        question: "What is the primary function of a Public Key Infrastructure (PKI)?",
        answers: [
            { text: "To manage digital certificates and encryption keys", correct: true },
            { text: "To scan for malware", correct: false },
            { text: "To block phishing attacks", correct: false },
            { text: "To secure physical access to servers", correct: false }
        ]
    },
    {
        question: "Which of the following attacks attempts to steal sensitive information by disguising as a trustworthy entity?",
        answers: [
            { text: "Phishing", correct: true },
            { text: "Ransomware", correct: false },
            { text: "Denial of Service (DoS)", correct: false },
            { text: "Brute force attack", correct: false }
        ]
    },
    {
        question: "Which security mechanism ensures that only authorized users can access certain data?",
        answers: [
            { text: "Encryption", correct: false },
            { text: "Access control", correct: true },
            { text: "VPN", correct: false },
            { text: "Firewall", correct: false }
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
