const questions = [
    {
        question: "What are the primary concepts covered in the video series?",
        answers: [
            { text: "Object-oriented programming and algorithms", correct: false },
            { text: "Object movement, dot product, and distance comparison", correct: true },
            { text: "Web development and database management", correct: false },
            { text: "Network security and data encryption", correct: false }
        ]
    },
    {
        question: "How do the videos in the series build on each other? Provide an example.",
        answers: [
            { text: "Each video covers an unrelated topic.", correct: false },
            { text: "Each video introduces a new programming language.", correct: false },
            { text: "Each video builds on previous concepts of object movement and vector mathematics.", correct: true },
            { text: "Each video teaches a new web development framework.", correct: false }
        ]
    },
    {
        question: "Explain the basic principles of object movement discussed in 'Object Movement 1.'",
        answers: [
            { text: "Object rotation and scaling", correct: false },
            { text: "Linear and non-linear motion", correct: true },
            { text: "Object creation and deletion", correct: false },
            { text: "Color transitions and animations", correct: false }
        ]
    },
    {
        question: "What are some common techniques used to animate object movement in web development?",
        answers: [
            { text: "Using loops and conditional statements", correct: false },
            { text: "Applying CSS transitions and keyframes", correct: true },
            { text: "Utilizing SQL queries", correct: false },
            { text: "Implementing user authentication", correct: false }
        ]
    },
    {
        question: "Define the dot product and describe its significance in vector mathematics.",
        answers: [
            { text: "A measure of vector length", correct: false },
            { text: "A scalar representing the product of two vectors' magnitudes and the cosine of the angle between them", correct: true },
            { text: "A method to find the cross product", correct: false },
            { text: "A technique for vector normalization", correct: false }
        ]
    },
    {
        question: "How can the dot product be applied to determine the angle between two vectors?",
        answers: [
            { text: "By dividing the sum of the vectors by their difference", correct: false },
            { text: "By calculating the product of their magnitudes", correct: false },
            { text: "By using the inverse cosine of the dot product divided by the product of the magnitudes of the vectors", correct: true },
            { text: "By subtracting one vector from the other", correct: false }
        ]
    },
    {
        question: "What advanced concepts of object movement are introduced in 'Object Movement 2'?",
        answers: [
            { text: "Gravity and collision detection", correct: true },
            { text: "Database indexing and querying", correct: false },
            { text: "Object inheritance and polymorphism", correct: false },
            { text: "File handling and input/output operations", correct: false }
        ]
    },
    {
        question: "Describe a practical application of the object movement techniques discussed in this video.",
        answers: [
            { text: "Encrypting sensitive data", correct: false },
            { text: "Animating characters in a video game", correct: true },
            { text: "Designing a responsive website layout", correct: false },
            { text: "Implementing machine learning algorithms", correct: false }
        ]
    },
    {
        question: "Summarize the key takeaways from 'Object Movement 3.'",
        answers: [
            { text: "Integrating social media APIs", correct: false },
            { text: "Advanced animation techniques for smooth transitions and complex movements", correct: true },
            { text: "Creating and managing user sessions", correct: false },
            { text: "Building a RESTful API", correct: false }
        ]
    },
    {
        question: "How can combining the techniques from 'Object Movement 1' and 'Object Movement 3' enhance animation in web development?",
        answers: [
            { text: "By reducing the number of animations used", correct: false },
            { text: "By ensuring animations are synchronized and more visually appealing", correct: true },
            { text: "By adding more static elements to the web page", correct: false },
            { text: "By focusing solely on backend improvements", correct: false }
        ]
    },
    {
        question: "Explain the method of distance comparison covered in the 'Distance Comparison' video.",
        answers: [
            { text: "Using Euclidean distance to measure the space between two points", correct: true },
            { text: "Comparing the sizes of two files", correct: false },
            { text: "Measuring the speed of two algorithms", correct: false },
            { text: "Calculating the time complexity of a function", correct: false }
        ]
    },
    {
        question: "Why is distance comparison important in animations and interactive web elements?",
        answers: [
            { text: "To determine the length of code", correct: false },
            { text: "To measure the accuracy of search results", correct: false },
            { text: "To create realistic animations and interactions based on user input", correct: true },
            { text: "To analyze network traffic patterns", correct: false }
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
