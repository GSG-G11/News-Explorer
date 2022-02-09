const getElement = (element) => document.getElementById(element);

const searchNewsInput = getElement("search-news");
const searchNewsIcon = getElement("search-news-icon");

const searchDictionaryInput = getElement("search-dictionary");
const searchDictionaryIcon = getElement("search-dictionary-icon");

const myWord = getElement("word");
const wordAudio = getElement("audio");
const wordExamples = getElement("example");
const wordSynonyms = getElement("synonyms");

const newsContainer = document.querySelector(".news-container")
const dictionaryContainer = document.querySelector(".dictionary-container");

const wordUrl = (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
const newsUrl = (report) => `https://api.codetabs.com/v1/proxy/?quest=https://newsapi.org/v2/everything?q=${report}&from=2022-01-09&sortBy=publishedAt&apiKey=9c974a740f55477fb7c99c9f4376ad43`;

const checkLength = (parent, yourLength) => {
    return parent.children.length === yourLength;
}

searchNewsIcon.addEventListener("click", () => {
    const subject = searchNewsInput.value;

    fetch(newsUrl(subject), (data) => {
        console.log(data);
        const articles = data.articles.slice(0, 6);
        console.log(articles)
        console.log(newsContainer.children.length == 0)
        if (newsContainer.children.length == 0) {
            articles.forEach((ele, index) => {
                const card = document.createElement("div");
                card.className = "news-card"
                const title = document.createElement("a");
                title.className = "news-title"
                const article = document.createElement("p");
                article.className = "news-article"
                const image = document.createElement("img");
                image.className = "news-img"

                const icon = document.createElement("i")
                icon.className = "fas fa-map-marked-alt"
                const puplisher = document.createElement("p");
                puplisher.className = "news-puplisher"
                card.appendChild(title);
                card.appendChild(article);
                card.appendChild(image);
                card.appendChild(icon);
                card.appendChild(puplisher);
                newsContainer.appendChild(card)

                title.textContent = data.articles[index].title;
                title.setAttribute("target", "_blank")
                title.setAttribute("href", data.articles[index].url)
                article.textContent = data.articles[index].content;
                image.setAttribute("src", data.articles[index].urlToImage);
                puplisher.textContent = data.articles[index].author;
            })
        } else if (newsContainer.children.length <= 6) {
            newsContainer.textContent = '';

            articles.forEach((ele, index) => {
                const card = document.createElement("div");
                card.className = "news-card"
                const title = document.createElement("a");
                title.className = "news-title"
                const article = document.createElement("p");
                article.className = "news-article"
                const image = document.createElement("img");
                image.className = "news-img"

                const icon = document.createElement("i")
                icon.className = "fas fa-map-marked-alt"
                const puplisher = document.createElement("p");
                puplisher.className = "news-puplisher"
                card.appendChild(title);
                card.appendChild(article);
                card.appendChild(image);
                card.appendChild(icon);
                card.appendChild(puplisher);
                newsContainer.appendChild(card)

                title.textContent = data.articles[index].title;
                title.setAttribute("target", "_blank")
                title.setAttribute("href", data.articles[index].url)
                article.textContent = data.articles[index].content;
                image.setAttribute("src", data.articles[index].urlToImage);
                puplisher.textContent = data.articles[index].author;
            })
        }
    })
})

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
        if (checkLength(dictionaryContainer, 5)) {
            dictionaryContainer.removeChild(dictionaryContainer.lastChild);
        }
    }, () => {
        myWord.textContent = `Try Another Word`;
        wordAudio.src = `No Data`;
        wordSynonyms.textContent = `No Data`;
        wordExamples.textContent = `No Data`;
        if (checkLength(dictionaryContainer, 5)) {
            dictionaryContainer.removeChild(dictionaryContainer.lastChild);
        }
    }, () => {
        if (checkLength(dictionaryContainer, 4)) {
            let ele = document.createElement('h2');
            ele.textContent = "Server Error";
            dictionaryContainer.appendChild(ele);
        }
    });

})