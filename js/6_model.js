const url = "http://localhost:11434/v1";
let chunkEmbeddings = [];
let embeddingsStored = false;
async function embedBatch(texts){
  
  const englishOnlyTexts = texts
    .map(removeArabic)
    .filter(t => t.length > 20); // skip very short or empty texts

  if (englishOnlyTexts.length === 0) return;

  const res = await fetch(`${url}/embeddings`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama3.2",
    input: englishOnlyTexts
    })
  });
const data = await res.json();
chunkEmbeddings.push(...data.data.map(d => d.embedding));

}
async function storeEmbeddings(){
  console.log("Chunks size::::"+chunks.length);
  for (let i = 0; i < chunks.length; i += 10) {
    const batch = chunks.slice(i, i + 10);
    await embedBatch(batch);
    console.log("processed embeddings ::::"+chunkEmbeddings.length);
  }
  
  
}

function getRelevantChunks(queryEmbedding, topK = 3) {
  const scored = chunkEmbeddings.map((emb, idx) => ({
    idx,
    score: cosineSim(queryEmbedding, emb)
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(s => chunks[s.idx]);
}

// Translate function with RAG
async function translateWithRAG(input) {
  // Generate embedding for input
  const res = await fetch(`${url}/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, model: "llama3.2" })
  });
  const data = await res.json();
  const queryEmbedding = data.data[0].embedding;

  // Retrieve top 3 relevant chunks
  const relevantText = getRelevantChunks(queryEmbedding, 3).join("\n");
  console.log("relevantText:::::"+relevantText);

  // Send to LLM for translation
  const prompt = `Translate the following Arabic phrase to English using the reference text below:\nReference:\n${relevantText}\nPhrase: "${input}"`;

  const payload = {
    model: "llama3.2",
    prompt: prompt,
    max_tokens: 150
  };

  try {
    const response = await fetch(`${url}/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return result.choices[0].text.trim();
  } catch (err) {
    console.error("LLM error:", err);
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
  
  
  if (!pdfLoaded) {
    predictionElem.textContent = "Parsing Pdf...";
    await extractPdfText();
    pdfLoaded = true;
  }
  
    if (!embeddingsStored) {
     predictionElem.textContent = "Storing Embeddings...";
     await storeEmbeddings();
     embeddingsStored = true;
  }
  
  
  const translation = await translateWithRAG(input);
  predictionElem.textContent = `[RAG LLM Translation] ${translation}`;
}

function removeArabic(text) {
  // Unicode range for Arabic: 0600–06FF
  return text.replace(/[\u0600-\u06FF]+/g, '').trim();
}