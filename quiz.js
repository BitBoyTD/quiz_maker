

/* variabels that we'll need */
let score = 0;
let currentQuestion = 1;
let localStorageLength = localStorage.length;
let selectedQuiz = "who gives a shit";
let selectedQuizName;
/* find the selected quiz */
for (i = 0; i < localStorageLength; i++) {
    let selectedQuizKey = localStorage.key(i);
    let selectedQuizStringified = localStorage.getItem(selectedQuizKey);
    selectedQuizName = JSON.parse(selectedQuizStringified);
    if (selectedQuizName[1].length === 1) {
        i = localStorageLength;
    }
}
/* check which quiz it was from */
for (i = 0; i < localStorageLength; i++) {
    /* grab quiz out of local storage */
    let quizKey = localStorage.key(i);
    let quizStringified = localStorage.getItem(quizKey);
    let quiz = JSON.parse(quizStringified);
    let quizName = quiz[0];
    /* check if it is the right quiz */
    if (quizName === selectedQuizName) {
        selectedQuiz = quiz;
        i = localStorageLength;
    }
}
/* find amount of questions in the quiz */
const questionCount = selectedQuiz.length - 1;
/* set the title to the h1 element */
const titleDisplay = document.getElementById("titleDisplay");
titleDisplay.textContent = selectedQuiz[0];
/* set the value of question and answer 1 */
const questionDisplay1 = document.getElementById("questionDisplay1");
questionDisplay1.textContent = selectedQuiz[currentQuestion].question;

/* submit button function */
function submitButton() {
    /* tell them if the previous question was right or wrong */
    let currentAnswerInputId = "answerInput" + currentQuestion;
    let currentAnswerInput = document.getElementById(currentAnswerInputId);
    let currentAnswer = selectedQuiz[currentQuestion].answer;
    if (currentAnswerInput.value.toLowerCase() === currentAnswer.toLowerCase() || 
        currentAnswerInput.value.toLowerCase() === currentAnswer.toLowerCase() + " " ) {
            /* if it's right */
            currentAnswerInput.style.outline = "solid green 0.2rem";
            score += 1;
    }
    else {
        /* if it's wrong */
        currentAnswerInput.style.outline = "solid red 0.2rem";
    }

    if (currentQuestion < questionCount) {
        /* display next question display and answer input */
        currentQuestion += 1;
        /* create new question */
        let QuestionValue = selectedQuiz[currentQuestion].question;
        let newQuestion = document.createElement("p");
        let newQuestionId = "questionDisplay" + currentQuestion;
        newQuestion.id = newQuestionId;
        newQuestion.rows = "5";
        newQuestion.textContent = QuestionValue;
        /* create label */
        let labelValue = "Question " + currentQuestion;
        let newLabel = document.createElement("label");
        newLabel.setAttribute("for", newQuestionId);
        newLabel.textContent = labelValue;
        /* create new answer input */
        let newAnswer = document.createElement("textarea");
        let newAnswerId = "answerInput" + currentQuestion;
        newAnswer.id = newAnswerId;
        newAnswer.rows = "5";
        newAnswer.placeholder = "answer here";
        newAnswer.spellcheck = false;
        /* add them to div */
        const parent = document.getElementById("form");
        parent.appendChild(newLabel);
        parent.appendChild(newQuestion);
        parent.appendChild(newAnswer);
    }
    else {
        /* display score */
        const resultDisplay = document.getElementById("resultDisplay");
        resultDisplay.textContent = "Score: "+score+"/"+questionCount;
        resultDisplay.style.display = "block";
        const submitButton = document.getElementById("submitButton");
        submitButton.style.display = "none";
        /* display buttons */
        const answerButton = document.getElementById("answerButton");
        answerButton.style.display = "block";
        const restartButton = document.getElementById("restartButton");
        restartButton.style.display = "block";
        const editButton = document.getElementById("editButton");
        editButton.style.display = "block";
    }
}

const restartButton = () => {
    window.location.reload();
};

// answer button function
function answerButton() {
    for (i=1; i<= questionCount; i++) {
        let answer = selectedQuiz[i].answer;
        let answerInput = document.getElementById("answerInput"+i);
        let userAnswer = answerInput.value;
        let lowerUserAnswer = userAnswer.toLowerCase();
        let lowerAnswer = answer.toLowerCase();
        if (lowerAnswer !== lowerUserAnswer) {
            answerInput.value = userAnswer + "\n\n" + answer;
        }
    }
}

const editButton = () => {
    window.location.href = "edit.html";
}