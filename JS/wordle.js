const API_URL = 'https://words.dev-apis.com/word-of-the-day'
const WORD_VALIDATION = 'https://words.dev-apis.com/validate-word'

const inputElement = document.querySelector("input")
const inputDisplay = document.getElementsByClassName("input-display")
const isSpan = document.querySelectorAll("span")
let clickCount = 0;



async function getWordOfTheDay () {
    try {
        let response = await fetch (API_URL);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let word = await response.json();
        console.log(word.word)
    }
    catch {
        console.log(error)
        console.error(error.message);
    }
}

function keyboardClick (event) {
    if (isLetter(event) && clickCount < 25) {
        isSpan.forEach((element, index) => {
            isSpan[clickCount].textContent = event 
        })
    } else if (event === 'Backspace' || event === 'Delete') {
        deleteLetter()
        console.log('Backspace or Delete')
    } else {
        console.log("SIXTH or Its not a letter")
    }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function deleteLetter (){
    isSpan.forEach((element, index) => {
        isSpan[clickCount - 1].textContent = '';
    })
}

function init () {
    inputElement.addEventListener("keydown", function (event) {
        keyboardClick(event.key);
        if (clickCount !== 0 && (event.key === "Backspace" || event.key === "Delete")) {
            clickCount--
            console.log("🚀 ~ clickCount:", clickCount)
        }  else if (clickCount !==  25) {
            clickCount++
            console.log("🚀 ~ clickCount:", clickCount)
        }
        
    })
}

// getWordOfTheDay ()

init ()