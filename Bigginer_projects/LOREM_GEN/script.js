const tagOptions = [
    "p", "h1", "h2",
    "h3", "h4", "h5",
    "h6", "span",
];
const optionsContainer = document.querySelector(".options");
const outputContainer = document.querySelector(".output");
const tagsSelect = document.getElementById("tags");
const pgSlider = document.getElementById("pg");
const wordSlider = document.getElementById("words");
const pgValue = document.getElementById("paragraphsValue");
const wordValue = document.getElementById("wordsValue");


function createOptionsUI() {
    tagOptions.forEach(function (tag) {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = `<${tag}>`;
        tagsSelect.appendChild(option);
    });
}