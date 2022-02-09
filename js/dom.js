const getElement = (element) => document.getElementById(element);

const searchNewsInput = getElement("search-news");
const searchNewsIcon = getElement("search-news-icon");

const searchDictionaryInput = getElement("search-dictionary");
const searchDictionaryIcon = getElement("search-dictionary-icon");

const myWord = getElement("word");
const wordAudio = getElement("audio");
const wordExamples = getElement("example");
const wordSynonyms = getElement("synonyms");

const dictionaryContainer = document.querySelector(".dictionary-container");

const wordUrl = (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

const checkLength = (parent, yourLength, operator) => {
    if (operator === 'grater than') {
        return parent.children.length > yourLength;
    } else if (operator === 'less than') {
        return parent.children.length < yourLength;
    } else if (operator === 'equal') {
        return parent.children.length === yourLength;
    }
}

searchDictionaryIcon.addEventListener("click", () => {
    const word = searchDictionaryInput.value;

    fetch(wordUrl(word), (data) => {
        const synonymsArr = data[0].meanings[0].definitions[0].synonyms;

        myWord.textContent = `${data[0].word} (${data[0].phonetic}) (${data[0].meanings[0].partOfSpeech})`;
        wordAudio.src = data[0].phonetics[0].audio;

        if (synonymsArr.length == 0) {
            wordSynonyms.textContent = `No Synonyms`;
        } else {
            wordSynonyms.textContent = synonymsArr.join(', ');
        }
        if (data[0].meanings[0].definitions[0].example == null) {
            wordExamples.textContent = `No Examples`;
        } else {
            wordExamples.textContent = data[0].meanings[0].definitions[0].example;
        }
        if (checkLength(dictionaryContainer, 5, 'equal')) {
            dictionaryContainer.removeChild(dictionaryContainer.lastChild);
        }
    }, () => {
        myWord.textContent = `Try Another Word`;
        wordAudio.src = `No Data`;
        wordSynonyms.textContent = `No Data`;
        wordExamples.textContent = `No Data`;
        if (checkLength(dictionaryContainer, 5, 'equal')) {
            dictionaryContainer.removeChild(dictionaryContainer.lastChild);
        }
    }, () => {
        if (checkLength(dictionaryContainer, 4, 'equal')) {
            let ele = document.createElement('h2');
            ele.textContent = "Server Error";
            dictionaryContainer.appendChild(ele);
        }
    });

})