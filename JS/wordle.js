const API_URL = 'https://words.dev-apis.com/word-of-the-day'
const WORD_VALIDATION = 'https://words.dev-apis.com/validate-word'

async function getWordOfTheDay () {
    try {
        let response = await fetch (API_URL);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let word = await response.json();
        console.log(word)
    }
    catch {
        console.log(error)
        console.error(error.message);
    }
}

getWordOfTheDay ()