"use client";

import { useState } from "react";

export default function Dashboard() {
  const [course, setCourse] = useState("");
  const [tab, setTab] = useState("resume");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course,
        }),
      });

      const data = await res.json();

      console.log("Réponse API :", data);

      if (!res.ok) {
        alert(
          data.error || "Erreur serveur"
        );
        return;
      }

      const cleaned = data.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      console.log(parsed);

      setResult(parsed);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        RéviseAI
      </h1>

      <textarea
        value={course}
        onChange={(e) =>
          setCourse(e.target.value)
        }
        placeholder="Colle ton cours ici..."
        className="w-full h-64 border rounded-xl p-4"
      />

      <button
        onClick={generate}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        {loading
          ? "⏳ Génération..."
          : "Générer"}
      </button>

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => setTab("resume")}
          className="border px-4 py-2 rounded"
        >
          Résumé
        </button>

        <button
          onClick={() => setTab("quiz")}
          className="border px-4 py-2 rounded"
        >
          Quiz
        </button>

        <button
          onClick={() =>
            setTab("flashcards")
          }
          className="border px-4 py-2 rounded"
        >
          Flashcards
        </button>

        <button
          onClick={() =>
            setTab("exercices")
          }
          className="border px-4 py-2 rounded"
        >
          Exercices
        </button>
      </div>

      <div className="mt-6 border rounded-xl p-6">

        {tab === "resume" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Résumé
            </h2>

            <p>
              {result?.resume ||
                "Aucun résumé"}
            </p>
          </div>
        )}

        {tab === "quiz" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Quiz
            </h2>

            {Array.isArray(
              result?.quiz
            ) ? (
              <div className="space-y-4">
                {result.quiz.map(
                  (
                    q: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border p-4 rounded"
                    >
                      <p className="font-bold">
                        {q.question}
                      </p>

                      <ul className="mt-2">
                        {q.options?.map(
                          (
                            option: string,
                            i: number
                          ) => (
                            <li key={i}>
                              • {option}
                            </li>
                          )
                        )}
                      </ul>

                      <details className="mt-3">
                        <summary>
                          Voir la réponse
                        </summary>

                        <p>
                          ✅{" "}
                          {
                            q.reponse_correcte
                          }
                        </p>

                        <p>
                          {q.explication}
                        </p>
                      </details>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>Aucun quiz.</p>
            )}
          </div>
        )}

        {tab === "flashcards" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Flashcards
            </h2>

            {Array.isArray(
              result?.flashcards
            ) ? (
              <div className="space-y-4">
                {result.flashcards.map(
                  (
                    card: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border p-4 rounded"
                    >
                      <h3 className="font-bold">
                        {card.recto}
                      </h3>

                      <p className="mt-2">
                        {card.verso}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>
                Aucune flashcard.
              </p>
            )}
          </div>
        )}

        {tab === "exercices" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Exercices
            </h2>

            {Array.isArray(
              result?.exercices
            ) ? (
              <div className="space-y-4">
                {result.exercices.map(
                  (
                    exo: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border p-4 rounded"
                    >
                      <h3 className="font-bold">
                        {exo.titre}
                      </h3>

                      <p className="mt-2">
                        {exo.enonce}
                      </p>

                      <span className="inline-block mt-2 text-sm bg-blue-100 px-2 py-1 rounded">
                        {exo.niveau}
                      </span>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>
                Aucun exercice.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}