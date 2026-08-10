const API_URL = 'https://words.dev-apis.com/word-of-the-day'
const WORD_VALIDATION = 'https://words.dev-apis.com/validate-word'

const headline = document.querySelector('h1')
const alertMessage = document.createElement("h2")
const inputElement = document.querySelector("input");
const inputDisplay = document.getElementsByClassName("input-display");
const isSpan = document.querySelectorAll("span");
const isWord = document.querySelectorAll("p");
const wordRows = Array.from(isWord);
let currentLetterIndex = 0;
const wordOfTheDay = await fetchWordOfTheDay();

function getActiveRow() {
    return document.querySelector('p.active');
}

function getActiveSpans() {
    const activeRow = getActiveRow();
    return activeRow ? activeRow.querySelectorAll('span') : [];
}
// console.log("🚀 ~ wordOfTheDay:", wordOfTheDay)a
let userAnswer = null;


async function fetchWordOfTheDay () {
    try {
        let response = await fetch (API_URL);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    }
    catch (error) {
        console.log(error)
        console.error(error.message);
    }
}

function keyboardClick (clickedButton) {
    if (isLetter(clickedButton) && getActiveRow()) {
        addLetter(clickedButton);
        currentLetterIndex++;
        console.log('Letter Added', currentLetterIndex);
    } else if ((clickedButton === 'Backspace' || clickedButton === 'Delete') && currentLetterIndex > 0) {
        deleteLetter();
        currentLetterIndex--;
        console.log('Backspace or Delete', 'currentLetterIndex is ' + currentLetterIndex);
    } else if (clickedButton === 'Enter') {
        submitAnswer ()
        console.log(`Answer submitted: ${userAnswer}`)
    } else {
        console.log("SIXTH or Its not a letter");
    }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function deleteLetter () {
    const activeSpans = getActiveSpans();
    if (currentLetterIndex <= 0 || activeSpans.length === 0) {
        return;
    }

    activeSpans[currentLetterIndex - 1].textContent = '';
}

function addLetter (clickedButton) {
    const activeSpans = getActiveSpans();
    if (activeSpans.length === 0 || currentLetterIndex >= activeSpans.length) {
        return;
    }

    activeSpans[currentLetterIndex].textContent = clickedButton;
}

function submitAnswer () {
    const activeRow = getActiveRow();
    if (!activeRow) {
        alertMessage.textContent = "No active row to submit.";
        if (!headline.contains(alertMessage)) {
            headline.append(alertMessage);
        }
        return;
    }

    const activeSpans = activeRow.querySelectorAll('span');
    const answer = Array.from(activeSpans).map((span) => span.textContent).join('');

    if (answer.length !== 5) {
        alertMessage.textContent = "Word must consist of 5 letters";
        if (!headline.contains(alertMessage)) {
            headline.append(alertMessage);
        }
        return;
    }

    userAnswer = answer;
    alertMessage.style.display = "none";
    moveActiveClass();
    currentLetterIndex = 0;
}

function moveActiveClass () {
    const wordsArray = Array.from(isWord);
    const currentlyActive = wordsArray.findIndex(element => element.classList.contains('active'));

    const nextIndex = currentlyActive === -1 ? 0 : currentlyActive + 1;
    if (nextIndex >= wordsArray.length) {
        return null;
    }

    if (currentlyActive >= 0) {
        wordsArray[currentlyActive].classList.remove('active');
    }

    const nextWord = wordsArray[nextIndex];
    nextWord.classList.add('active');
    return nextWord;
}


function init () {
    if (!getActiveRow() && wordRows.length > 0) {
        wordRows[0].classList.add('active');
    }

    inputElement.addEventListener("keydown", function (event) {
        keyboardClick(event.key);
    })
}

init ()