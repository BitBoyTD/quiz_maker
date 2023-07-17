/* varibles we'll need */
let selectedQuizName = "idk yet";
let selectedQuiz = "idk yet either";
let localStorageLength = localStorage.length;
let finalArray = [];
let questionCounter = 1;

/* find which quiz was selected */
for (i = 0; i < localStorageLength; i++) {
    let selectedQuizKey = localStorage.key(i);
    let selectedQuizStringified = localStorage.getItem(selectedQuizKey);
    selectedQuizName = JSON.parse(selectedQuizStringified);
    if (selectedQuizName[1].length === 1) {
        i = localStorageLength;
    }
}
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

/* set the values of question 1 and answer 1 */
const questionInput1 = document.getElementById("questionInput1");
questionInput1.textContent = selectedQuiz[1].question;
const answerInput1 = document.getElementById("answerInput1");
answerInput1.textContent = selectedQuiz[1].answer;
/* set value of title input */
const titleInput = document.getElementById("titleInput");
titleInput.value = selectedQuiz[0];


/* variables we need */
const form = document.getElementById("form");
/* generate textarea elements */
for (let i = 2; i <= selectedQuiz.length; i++) {
    /* create the label delete div */
    let labelDeleteDiv = document.createElement("div")
    labelDeleteDiv.setAttribute("class", "labelDeleteDiv");
    labelDeleteDiv.setAttribute("id", "labelDeleteDiv" + i);
    /* create the label */
    let label = document.createElement("label");
    label.setAttribute("for", "questionInput" + i);
    label.textContent = "Question " + i;
    label.setAttribute("id", "label" + i);
    /* create the delete button */
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", "deleteButton(" + i + ")");
    deleteButton.setAttribute("id", "deleteButton" + i);
    /* create the question */
    let question = document.createElement("textarea");
    question.textContent = selectedQuiz[i].question;
    question.setAttribute("rows", "5");
    question.setAttribute("id", "questionInput"+i);
    question.setAttribute("type", "text");
    question.setAttribute("placeholder", "question here");
    questionCounter += 1;
    /* create the answer input */
    let answer = document.createElement("textarea");
    answer.textContent = selectedQuiz[i].answer;
    answer.setAttribute("rows", "5");
    answer.setAttribute("id", "answerInput"+i);
    answer.setAttribute("type", "text");
    answer.setAttribute("placeholder", "answer here");

    /* append children */
    labelDeleteDiv.appendChild(label);
    labelDeleteDiv.appendChild(deleteButton);
    form.appendChild(labelDeleteDiv);
    form.appendChild(question);
    form.appendChild(answer);
}

/* finish quiz button */
function finishQuiz() {
    /* delete the old quiz */
    for (i = 0; i < localStorage.length; i++) {
        /* grab quiz out of local storage */
        let quizKey = localStorage.key(i);
        let quizStringified = localStorage.getItem(quizKey);
        let quiz = JSON.parse(quizStringified);
        let quizName = quiz[0];
        /* check if it is the right quiz */
        if (quizName === selectedQuizName) {
            localStorage.removeItem(quizKey);
        }
    }

    /* save the new one */
    const titleInput = document.getElementById("titleInput");
    const titleInputValue = titleInput.value;
    let savedQuizName;
    const localStorageLength = localStorage.length;
    /* check if title is equal to another title already saved */
    for (let i = 0; i < localStorageLength; i++) {
        /* grab quiz out of local storage */
        let quizKey = localStorage.key(i);
        let quizStringified = localStorage.getItem(quizKey);
        let quiz = JSON.parse(quizStringified);
        let quizName = quiz[0];
        /* check if it is the same as another one */
        if (quizName === titleInputValue) {
            savedQuizName = quizName;
            i = localStorageLength;
        }
    }
    /* check if it's already in use */
    if (titleInputValue === savedQuizName) {
        titleInput.style.outline = "solid red 0.2rem";
        titleInput.value = "Title is already in use";
    }
    /* check if title has a value */
    else if (titleInput.value.length < 3) {
        titleInput.style.outline = "solid red 0.2rem";
        titleInput.value = "Title needs at least 3 letters";
    }
    else {
        /* set name of array */
        finalArray.push(titleInput.value);
        /* while loop time */
        let arrayLength = finalArray.length;
        for(let i = 1; i <= questionCounter; i++) {
            arrayLength = finalArray.length;
            /* find question input value */
            let questionId = "questionInput"+ i;
            let questionInputValue = document.getElementById(questionId).value;
            /* find answer input value */
            let answerId = "answerInput"+ i;
            let answerInputValue = document.getElementById(answerId).value;
            /* put it in the array object */
            let arrayObject = {};
            arrayObject.question = questionInputValue;
            arrayObject.answer = answerInputValue;
            /* put the array object in */
            finalArray.push(arrayObject);
        }
        /* save it to local storage */
        const quizName = finalArray[0];
        const finalArrayStringified = JSON.stringify(finalArray);
        localStorage.setItem(quizName, finalArrayStringified);

        /* go to the home page */
        window.location.href = "index.html";
    }
    
}

/* new question button function */
function newQuestion() {
    /* update question counter */
    questionCounter += 1;
    /* set id values */
    const labelText = "Question " + questionCounter;
    const questionId = "questionInput" + questionCounter;
    const answerId = "answerInput" + questionCounter;
    /* create the label delete div */
    const labelDeleteDiv = document.createElement("div");
    labelDeleteDiv.setAttribute("class", "labelDeleteDiv");
    labelDeleteDiv.setAttribute("id", "labelDeleteDiv" + questionCounter);
    /* create question label */
    const label = document.createElement("label");
    label.setAttribute("for", questionId);
    label.textContent = labelText;
    label.setAttribute("id", "label"+questionCounter);
    /* create the delete button */
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", "deleteButton(" + questionCounter + ")");
    deleteButton.setAttribute("id", "deleteButton" + questionCounter);
    /* create the question input */
    const questionInput = document.createElement("textarea");
    questionInput.placeholder = "question here";
    questionInput.rows = 5;
    questionInput.setAttribute("id", questionId);
    /* create the answer input */
    const answerInput = document.createElement("textarea");
    answerInput.placeholder = "answer here";
    answerInput.rows = 5;
    answerInput.setAttribute('id', answerId);
    /* and them to the parent div */
    labelDeleteDiv.appendChild(label);
    labelDeleteDiv.appendChild(deleteButton);
    form.appendChild(labelDeleteDiv);  
    form.appendChild(questionInput);
    form.appendChild(answerInput);
}

/* delete button function */
function deleteButton(questionNumber) {
    if (questionNumber === questionCounter) {
        // Lower the question counter
        questionCounter -= 1;

        // Remove elements for the deleted question
        let label = document.getElementById("label" + questionNumber);
        label.remove();
        let labelDeleteDiv = document.getElementById("labelDeleteDiv" + questionNumber);
        labelDeleteDiv.remove();
        let question = document.getElementById("questionInput" + questionNumber);
        question.remove();
        let answer = document.getElementById("answerInput" + questionNumber);
        answer.remove();
        let deleteButton = document.getElementById("deleteButton" + questionNumber);
        deleteButton.remove();
    } else {
        for (let i = questionNumber; i <= questionCounter; i++) {
            if (i !== questionCounter) {
                // Variables we'll need
                let nextQuestionNumber = i + 1;

                // Current question that we're changing
                let question = document.getElementById("questionInput" + i);
                let answer = document.getElementById("answerInput" + i);

                // Next question that we're stealing from
                let nextQuestion = document.getElementById("questionInput" + nextQuestionNumber);
                let nextAnswer = document.getElementById("answerInput" + nextQuestionNumber);

                // Switch the values
                question.value = nextQuestion.value;
                answer.value = nextAnswer.value;

                // Update the ID attributes
                question.id = "questionInput" + i;
                answer.id = "answerInput" + i;
            } else {
                // Current question that we're removing
                let question = document.getElementById("questionInput" + i);
                let answer = document.getElementById("answerInput" + i);
                question.remove();
                answer.remove();
                let deleteButton = document.getElementById("deleteButton" + i);
                deleteButton.remove();
                let label = document.getElementById("label" + i);
                label.remove();
                let labelDeleteDiv = document.getElementById("labelDeleteDiv" + i);
                labelDeleteDiv.remove();
            }
        }

        // Lower the question counter
        questionCounter -= 1;
    }
}

