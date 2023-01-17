const container = document.querySelector(".container");
const searchInput = container.querySelector("input");
const infoText = container.querySelector(".info-text");
const synonyms = container.querySelector(".word-synonyms .list");
const volumnIcon = container.querySelector(".word i");
let audio;
const removeIcon = container.querySelector(".search-box span");
function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>"`;
  } else {
    container.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
    let phonetics = `${result[0].meanings[0].partOfSpeech} ${
      result[0].phonetic || result[0].phonetics[1].text
    }`;
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word-meaning span").innerText =
      definitions.definition;
    document.querySelector(".word-example span").innerText =
      definitions.example;
    document.querySelector(".word span").innerText = phonetics;
    audio = new Audio(result[0].phonetics[0].audio);
    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      let synonymsArr = result[0].meanings[0].synonyms;
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";
      for (let i = 0; i < synonymsArr.length; i++) {
        let tag = `<span onclick = search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]}, </span>`;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    }
  }
}
function search(word) {
  searchInput.value = word;
  fetchApi(word);
}
function fetchApi(word) {
  container.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}
searchInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

volumnIcon.addEventListener("click", () => {
  audio.play();
});
removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
});
