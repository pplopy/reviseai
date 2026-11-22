export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold text-blue-600">
        RéviseAI
      </h1>

      <p className="mt-4 text-xl text-center max-w-2xl">
        Transforme tes cours en résumés,
        quiz, flashcards et exercices grâce à l'IA.
      </p>

      <a
        href="/dashboard"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Commencer
      </a>
    </main>
  );
}