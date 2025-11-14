# Program
A software program is a set of instructions written in a programming language that tells a computer how to perform specific tasks.

# LM (Language Model)

LM is a Program?

A Language Model (LM) is a computer program that takes input and creates output

But the way it works is completely different from a normal (traditional) program.

# LM vs Traditional Program (Simple Comparison)

 1. How it is built
	
	
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



# Projects
- Translation Service based on AI specially for Arabic/Urdu Scripts
- - Switch to dedicated translation language model: Helsinki-NLP instead of Mistral-7B-Instruct
- Custom desktop tool like claude with bigger context window for code generation

# Assignments

- Install and explore community project -> https://github.com/infiniflow/ragflow
- Install and explore (https://medium.com/@luongnv89/setting-up-claude-code-locally-with-a-powerful-open-source-model-a-step-by-step-guide-for-mac-84cf9ab7302f)