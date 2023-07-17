


let questionCounter = 1;
let finalArray = [];
    
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
    /* find parent element */
    const inputSection = document.getElementById("inputSection");
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
    questionInput.id = questionId;
    /* create the answer input */
    const answerInput = document.createElement("textarea");
    answerInput.placeholder = "answer here";
    answerInput.rows = 5;
    answerInput.id = answerId;
    /* and them to the parent div */
    labelDeleteDiv.appendChild(label);
    labelDeleteDiv.appendChild(deleteButton);
    inputSection.appendChild(labelDeleteDiv);  
    inputSection.appendChild(questionInput);
    inputSection.appendChild(answerInput);
}

/* finish quiz button */
function finishQuiz() {
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
        titleInput.value = "";
        titleInput.placeholder = "Title In Use";
    }
    /* check if title has a value */
    else if (titleInput.value.length < 3) {
        titleInput.style.outline = "solid red 0.2rem";
        titleInput.value = "";
        titleInput.placeholder = "Title Too Short";
    }
    else {
        /* set name of array */
        finalArray.push(titleInput.value);
        /* while loop time */
        let arrayLength = finalArray.length;
        for(let i = 1; i <= questionCounter; i++) {
            let arrayLength = finalArray.length;
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
                let label = document.getElementById("label" + i);
                label.remove();
                let labelDeleteDiv = document.getElementById("labelDeleteDiv" + i);
                labelDeleteDiv.remove();
                let deleteButton = document.getElementById("deleteButton" + i);
                deleteButton.remove();
            }
        }

        // Lower the question counter
        questionCounter -= 1;
    }
}






