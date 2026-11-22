import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function generateContent(
  course: string,
  level: string
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.8-flash",
  });

  const prompt = `
Tu es RéviseAI.

Cours :

${course}

Niveau demandé :

${level}

Règles :

Compréhension :
- définitions
- concepts fondamentaux
- questions simples

Application :
- exercices classiques
- méthodes standard

Approfondissement :
- réflexion
- raisonnements
- démonstrations simples

Olympiades :
- problèmes difficiles
- créativité
- démonstrations poussées

Recherche :
- généralisations
- conjectures
- variantes

Retourne UNIQUEMENT ce JSON :

{
  "resume":"texte",

  "quiz":[
    {
      "question":"texte",
      "options":[
        "A",
        "B",
        "C",
        "D"
      ],
      "reponse_correcte":"texte",
      "explication":"texte"
    }
  ],

  "flashcards":[
    {
      "recto":"texte",
      "verso":"texte"
    }
  ],

  "exercices":[
    {
      "titre":"texte",
      "enonce":"texte",
      "niveau":"${level}"
    }
  ]
}

Aucun markdown.
Aucune explication hors JSON.
`;

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
}