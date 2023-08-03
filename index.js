

/* check if there is nothing stored */
let localStorageLength = localStorage.length;

/* add the selectedItem variable */
let selectedQuizStringified = JSON.stringify("none");
localStorage.setItem("selectedQuiz", selectedQuizStringified);

/* create button function */
function openCreatePage() {
    window.location.href = "create.html";
}

/* find how many quizzes are saved */
let quizzesSaved = localStorage.length - 1;
/* set parent element */
const indexMain = document.getElementById("indexMain");

/* creating buttons for quizzes */
for (i = 0; i < localStorageLength; i++) {
    /* grab quiz out of local storage */
    let quizKey = localStorage.key(i);
    let quizStringified = localStorage.getItem(quizKey);
    let quiz = JSON.parse(quizStringified);
    /* check if it just grabbed the selected quiz */
    if (quiz !== "none") {
        /* create the quiz buttons */
        let button = document.createElement("button");
        let buttonValue = quiz[0];
        button.setAttribute('onclick', 'openQuizPage("' + buttonValue +'")');
        button.textContent = buttonValue;
        /* create div for the buttons */
        let div = document.createElement("div");
        /* create div for the more buttons */
        moreButtonsDiv = document.createElement("div");
        moreButtonsDiv.setAttribute("class", "moreButtonsDiv");
        moreButtonsDiv.setAttribute("id", "moreButtonsDiv" + buttonValue);
        /* create the more button */
        let moreButton = document.createElement("button");
        moreButton.setAttribute("class", "moreButton");
        moreButton.setAttribute("onclick", 'moreButton("' + buttonValue + '")');
        /* add the image for the more button */
        let moreButtonImg =  document.createElement("img");
        moreButtonImg.setAttribute("src", "media/moreButton.png");
        moreButtonImg.setAttribute("class", "moreButtonImg");
        /* create the delete button */
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "deleteButton");
        deleteButton.setAttribute("onclick", 'deleteButton("' + buttonValue + '")');
        deleteButton.textContent = "Delete";
        /* create the edit button */
        let editButton = document.createElement("button");
        editButton.setAttribute("class", "editButton");
        editButton.setAttribute("onclick", "editButton()");
        editButton.textContent = "Edit";
        /* create the close button */
        let closeButton = document.createElement("button");
        closeButton.setAttribute("class", "closeButton")
        closeButton.setAttribute("onclick", "closeButton('" + buttonValue + "')");
        closeButton.textContent = "Close";
        /* add them to parent element */
        moreButton.appendChild(moreButtonImg);
        div.appendChild(button);
        div.appendChild(moreButton);
        moreButtonsDiv.appendChild(editButton);
        moreButtonsDiv.appendChild(deleteButton);
        moreButtonsDiv.appendChild(closeButton);
        div.appendChild(moreButtonsDiv);
        indexMain.appendChild(div);
    } 
}

/* quiz button is clicked function */
function openQuizPage(quizTitle) {
    let quizTitleStringified = JSON.stringify(quizTitle);
    localStorage.setItem("selectedQuiz", quizTitleStringified)
    window.location.href = "quiz.html";
}

/* more button is clicked function */
function moreButton(quizTitle) {
    /* save which quiz was selected */
    let quizTitleStringified = JSON.stringify(quizTitle);
    localStorage.setItem("selectedQuiz", quizTitleStringified)
    /* display the more button div */
    let moreButtonsDiv = document.getElementById("moreButtonsDiv" + quizTitle);
    moreButtonsDiv.style.display = "flex";
}

/* edit button function */
function editButton() {
    window.location.href = "edit.html";
}

/* close button function */ 
function closeButton(quizTitle) {
    let moreButtonsDiv = document.getElementById("moreButtonsDiv" + quizTitle);
    moreButtonsDiv.style.display = "none";
}

/* delete button function */
function deleteButton(quizTitle) {
    for (i = 0; i < localStorageLength; i++) {
        /* grab quiz out of local storage */
        let quizKey = localStorage.key(i);
        let quizStringified = localStorage.getItem(quizKey);
        let quiz = JSON.parse(quizStringified);
        let quizName = quiz[0];
        /* check if it is the right quiz */
        if (quizName === quizTitle) {
            localStorage.removeItem(quizKey);
            location.reload();
            break;
        }
    }
}


// variables we'll need 
let clickCount = 0;
// logo button function 
function logoButton() {
    clickCount += 1;
    if (clickCount === 69) {
        window.location.href = "logs.html";
    }
}