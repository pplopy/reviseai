"use client";

import { useState } from "react";

export default function Dashboard() {
  const [course, setCourse] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generate = async () => {
    setLoading(true);

    const res = await fetch(
      "/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          course,
        }),
      }
    );

    const data = await res.json();

    setResult(data.content);

    setLoading(false);
  };

  return (
    <main className="max-w-5xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        RéviseAI
      </h1>

      <textarea
        value={course}
        onChange={(e) =>
          setCourse(e.target.value)
        }
        className="w-full h-60 border rounded-xl p-4"
        placeholder="Colle ton cours ici..."
      />

      <button
        onClick={generate}
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        {loading
          ? "Génération..."
          : "Générer"}
      </button>

      {result && (
        <div className="mt-8 whitespace-pre-wrap border rounded-xl p-6">
          {result}
        </div>
      )}
    </main>
  );
}