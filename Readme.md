# Program

- Collection of instructions directing a computer to perform tasks.

- Processes input and produces output based on explicit rules.

- Follows step-by-step instructions from a programmer.

# Language Model (LM)

- A type of program that learns patterns from large text data.

- Generates or predicts language instead of following explicit rules.

- Infers context to produce human-like responses.


# LM vs Traditional Program (Simple Comparison)

 ⭐ 1. How it is built
	
	
| Traditional Program                             | Language Model                                     |
|-------------------------------------------------|--------------------------------------------------|
| Written manually by a programmer               | Created by training on massive text data        |
| Behavior defined by rules (if/else, loops, functions) | Behavior emerges from patterns learned by the model |
| Deterministic (same input → same output)       | Often probabilistic (same input → may vary)     |

⭐ 2. How it works

| Traditional Program           | Language Model                                      |
|-------------------------------|---------------------------------------------------|
| Follows explicit instructions | Predicts the next word based on learned patterns |
| Logic is fixed                | Logic is learned and stored in parameters        |
| Requires precise input        | Can understand messy, natural human language     |


⭐ 3. Where knowledge comes from

| Traditional Program           | Language Model                        |
|-------------------------------|--------------------------------------|
| Programmed knowledge          | Learned knowledge from training data |
| Cannot generalize beyond code | Can generalize, infer, reason        |


# Visual Code Extension (Ctrl+Shift+X)
- Live Server by Ritwick Dey

# Install Ollama 

- Go to the official Ollama download page:
    https://ollama.com/download

- Run the installer and follow the instructions. It will install Ollama and add it to your system PATH.

# Pull Model
 - ollama pull llama3.2
 - ollama pull hf.co/nomic-ai/nomic-embed-text-v2-moe-gguf

# Test Model

ollama run llama3.2

http://localhost:11434/v1/completions
http://localhost:11434/v1/embeddings

# What is Prompt Engineering?

**Prompt engineering** is the practice of **carefully designing and structuring inputs (prompts) given to a language model (like GPT or any LLM) to get the most accurate, relevant, or useful output**. Think of it as “programming” the model using words instead of code.

---

## 1. Why it matters
Language models don’t “know” what you want inherently—they generate text based on patterns learned during training. The way you phrase your request strongly affects the output.

Example:
- **Vague prompt:** `"Tell me about cats"` → might give a generic paragraph.  
- **Engineered prompt:** `"Write a 3-paragraph essay about the history of domestic cats, including their role in ancient Egypt and modern society"` → more structured and useful result.

---

## 2. Techniques in Prompt Engineering

- **Instruction clarity:** Be explicit about what you want.  
  Example: `"Summarize the following article in 5 bullet points."`

- **Context provision:** Provide background or examples.  
  Example: `"Here is a sample of an email. Write a similar email inviting a friend to a birthday party."`

- **Format control:** Specify the output format.  
  Example: `"Generate a JSON object containing name, age, and email from this text."`

- **Step-by-step prompting:** Ask the model to reason step by step.  
  Example: `"Solve this math problem step by step: 45 × 37"`

---

## 3. Applications

- Writing code or debugging code.
- Generating content like essays, summaries, or reports.
- Chatbots or customer support automation.
- Data extraction and transformation.
- Scientific or technical reasoning.

---

## 4. Why it’s a skill
Good prompt engineering can drastically reduce errors, make outputs more relevant, and even save costs (for models you pay per token).  

Essentially, you’re **programming with language instead of code**.

---



# Assignments

- Install and explore community project -> https://github.com/infiniflow/ragflow
- Install and explore (https://medium.com/@luongnv89/setting-up-claude-code-locally-with-a-powerful-open-source-model-a-step-by-step-guide-for-mac-84cf9ab7302f)

# Projects
- Translation Service based on AI specially for Arabic/Urdu Scripts
- - Switch to dedicated translation language model: Helsinki-NLP instead of Mistral-7B-Instruct
- Custom desktop tool like claude with bigger context window for code generation
