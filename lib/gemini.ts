import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function generateContent(course: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
Tu es un professeur expert.

Cours :

${course}

Génère :

# Résumé

# Quiz
10 questions

# Flashcards
10 cartes

# Exercices
5 exercices

Réponds en français.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}