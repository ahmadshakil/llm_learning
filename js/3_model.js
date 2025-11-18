// Very simple word prediction model
const dictionary = {
  "Bismillah": "In the name of Allāh",
  "ar-Rahman":"the Entirely Merciful",
  "ar-Rahim":"the Especially Merciful"
};

function predictTranslation() {
  const input = document.getElementById('inputText').value.trim();
  const predictionElem = document.getElementById('prediction');
  
  if (input in dictionary) {
    predictionElem.textContent = `Translation: ${dictionary[input]}`;
  } else {
    predictionElem.textContent = "Translation not found.";
  }
}
