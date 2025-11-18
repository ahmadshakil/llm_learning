async function translateWithLLM(input) {
  const url = "http://localhost:11434/v1/completions";

  const payload = {
    model: "llama3.2",
    prompt: `Translate this Arabic roman phrase to English:\n"${input}"`,
    max_tokens: 60
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (err) {
    console.error("LLM API error:", err);
    return "Translation failed.";
  }
}

async function predictTranslation() {
  const inputElem = document.getElementById('inputText');
  const predictionElem = document.getElementById('prediction');

  let input = inputElem.value.trim();
  if (!input) {
    predictionElem.textContent = "Please enter a word to translate.";
    return;
  }

  predictionElem.textContent = "Translating...";
  const translation = await translateWithLLM(input);
  predictionElem.textContent = `[LLM Translation] ${translation}`;
}