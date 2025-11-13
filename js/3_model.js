// Very simple word prediction model
const languageModel = {
  "Bismillah": "In the name of Allāh",
  "ar-Rahman":"the Entirely Merciful",
  "ar-Rahim":"the Especially Merciful"
};

function predictTranslation() {
  const input = document.getElementById('inputText').value.trim();
  const predictionElem = document.getElementById('prediction');
  
  if (input in languageModel) {
    predictionElem.textContent = `Translation: ${languageModel[input]}`;
  } else {
    predictionElem.textContent = "Translation not found.";
  }
}
