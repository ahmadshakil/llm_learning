const languageModel = {
  "Bismillah": "In the name of Allāh",
  "ar-Rahman":"the Entirely Merciful",
  "ar-Rahim":"the Especially Merciful"
};

// Simple function to calculate Levenshtein distance (edit distance)
function levenshteinDistance(a, b) {
  const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
  }
  return dp[a.length][b.length];
}

function findClosestWord(input) {
  let minDistance = Infinity;
  let closestWord = null;
  for (const word of Object.keys(languageModel)) {
    const dist = levenshteinDistance(input, word);
    if (dist < minDistance) {
      minDistance = dist;
      closestWord = word;
    }
  }
  // You can set a maximum threshold for distance to avoid irrelevant suggestions
  if (minDistance <= 3) return closestWord;
  return null;
}

function predictTranslation() {
  const inputElem = document.getElementById('inputText');
  const predictionElem = document.getElementById('prediction');
  
  let input = inputElem.value.trim();

  if (!input) {
    predictionElem.textContent = "Please enter a word to translate.";
    return;
  }

  // Normalize Arabic input - could be added here if needed
  
  if (input in languageModel) {
    predictionElem.textContent = `[translate:${input}] Translation: ${languageModel[input]}`;
  } else {
    const closest = findClosestWord(input);
    if (closest) {
      predictionElem.textContent = `No exact match found. Did you mean [translate:${closest}]? Translation: ${languageModel[closest]}`;
    } else {
      predictionElem.textContent = "Translation not found.";
    }
  }
}
