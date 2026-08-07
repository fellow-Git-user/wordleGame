const API_URL = 'https://words.dev-apis.com/word-of-the-day'
const WORD_VALIDATION = 'https://words.dev-apis.com/validate-word'

const inputElement = document.querySelector("input")
const inputDisplay = document.getElementById("input-display")
const isSpan = document.querySelectorAll("span")
// console.log("🚀 ~ isSpan:", isSpan)

// isSpan.forEach((element, index) => {
//     console.log(isSpan[index] = element.textContent + 'baa')
// })

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
    if (isLetter(event) && inputDisplay.textContent.length < 5) {
        for(i = 0; i < 5; i++) {
            isSpan.forEach((element, index) => {
                isSpan[index] = element.textContent + event;
                console.log("🚀 ~ keyboardClick ~ isSpan[index] = element.textContent + event;:", isSpan[index] = element.textContent + event)
            })
        }
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
    })
}

// getWordOfTheDay ()

init ()