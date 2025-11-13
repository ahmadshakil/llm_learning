const url = "http://localhost:11434/v1";
let chunkEmbeddings = [];
let embeddingsStored = false;
async function storeEmbeddings(){
    for (const chunk of chunks) {
    const payload = {
      model: "llama3.2", 
      prompt: `Generate embedding vector for semantic search:\n${chunk}`,
      max_tokens: 1
    };
    try {
      const res = await fetch(`${url}/embeddings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: chunk, model: "llama3.2" })
      });
      const data = await res.json();
      chunkEmbeddings.push(data.data[0].embedding);
    } catch (err) {
      console.error("Embedding error:", err);
    }
  }
  console.log("Chunks size::::"+chunks.length);
  console.log("chunkEmbeddings size::::"+chunkEmbeddings.length);

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
     await extractPdfText();
     embeddingsStored = true;
  }
  
  
  const translation = await translateWithRAG(input);
  predictionElem.textContent = `[RAG LLM Translation] ${translation}`;
}

