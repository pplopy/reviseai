export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto py-20 text-center">

      <h1 className="text-6xl font-bold">
        Révise plus vite grâce à l'IA
      </h1>

      <p className="mt-6 text-xl text-gray-600">
        Transforme tes cours en
        résumés, quiz, flashcards et
        exercices.
      </p>

      <a
        href="/dashboard"
        className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Essayer gratuitement
      </a>
    </section>
  );
}