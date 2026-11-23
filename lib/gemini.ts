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
Tu es RéviseAI, un professeur expert du lycée français.

Analyse le cours suivant :

${course}

Niveau demandé :

${level}

Guide de difficulté :

Compréhension :
- définitions
- vocabulaire
- notions essentielles
- questions simples

Application :
- exercices classiques
- calculs directs
- méthodes du cours

Approfondissement :
- raisonnement
- mise en relation des notions
- problèmes plus compliqués
- démonstrations simples

Olympiades :
- problèmes difficiles
- créativité mathématique
- stratégies de résolution
- démonstrations avancées

Retourne UNIQUEMENT un JSON valide.

Format EXACT :

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
      "niveau": "Facile"
    },
    {
      "titre": "texte",
      "enonce": "texte",
      "niveau": "Moyen"
    },
    {
      "titre": "texte",
      "enonce": "texte",
      "niveau": "Difficile"
    }
  ]
}

Règles obligatoires :

- Respecter le programme du lycée français.
- Produire exactement 4 quiz.
- Produire exactement 5 flashcards.
- Produire exactement 3 exercices.
- Les exercices doivent être adaptés au niveau demandé.
- Aucun markdown.
- Aucun texte en dehors du JSON.
- Aucun bloc \`\`\`json.
- Uniquement du JSON valide.
`;

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
}