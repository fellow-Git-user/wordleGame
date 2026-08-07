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
            console.log(index, element)
            isSpan[clickCount].textContent = event 

        })

        // inputDisplay.textContent += event
        // console.log("🚀 ~ keyboardClick ~ inputDisplay.textContent.length:", inputDisplay.textContent.length)
        // console.log("veikia", event)
    } else {
        console.log("SIXTH or Its not a letter")
    }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function init () {
    inputElement.addEventListener("keydown", function (event) {
        keyboardClick(event.key);
        clickCount++
        console.log("🚀 ~ clickCount:", clickCount)
    })
}

// getWordOfTheDay ()

init ()