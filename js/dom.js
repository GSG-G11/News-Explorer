const myWord = document.getElementById("word");
const wordAudio = document.getElementById("audio");
const wordExamples = document.getElementById("example");
const wordSynonyms = document.getElementById("synonyms");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/see";
fetch(url, (data) => {
  console.log(data);
  console.log(data[0].meanings[0].definitions[0].example);
  myWord.textContent = `${data[0].word} (${data[0].phonetic}) (${data[0].meanings[0].partOfSpeech})`;
  wordAudio.src = data[0].phonetics[0].audio;
  wordSynonyms.textContent =data[0].meanings[0].definitions[0].synonyms;
  wordExamples.textContent = data[0].meanings[0].definitions[0].example;
});
