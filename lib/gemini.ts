import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function generateContent(
  course: string
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.8-flash",
  });

  const prompt = `
Tu es RéviseAI.

Analyse le cours suivant :

${course}

Retourne UNIQUEMENT un JSON valide.

Format exact :

{
  "resume": "texte",
  "quiz": [
    {
      "question": "texte",
      "options": [
        "option A",
        "option B",
        "option C",
        "option D"
      ],
      "reponse_correcte": "texte",
      "explication": "texte"
    }
  ],
  "flashcards": [
    {
      "recto": "texte",
      "verso": "texte"
    }
  ],
  "exercices": [
    {
      "titre": "texte",
      "enonce": "texte",
      "niveau": "facile"
    }
  ]
}

Contraintes :
- JSON uniquement
- Aucune balise markdown
- Aucune explication hors JSON
- 4 quiz
- 5 flashcards
- 3 exercices
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
}