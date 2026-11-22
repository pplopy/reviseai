export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 border-b">
      <h1 className="text-2xl font-bold text-blue-600">
        RéviseAI
      </h1>

      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Commencer
      </a>
    </nav>
  );
}