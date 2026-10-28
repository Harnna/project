"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <h1 className="text-xl font-bold text-cyan-400">MyBrand.</h1>
        <nav className="flex gap-6 text-sm text-slate-400 font-medium">
          <a href="#about" className="hover:text-cyan-400 transition">About</a>
          <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <span className="px-3 py-1 text-xs font-semibold bg-cyan-950 text-cyan-400 rounded-full border border-cyan-800 mb-6">
          Next.js + Tailwind CSS
        </span>
        <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Welcome to My New <span className="text-cyan-400">Website</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl">
          Sarkvats e Next.js App Router-ov ev React components-ov:
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => alert("Ashxatum e!")}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition shadow-lg shadow-cyan-500/20"
          >
            Click Ara
          </button>
          <a 
            href="#projects" 
            className="px-6 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold rounded-lg transition"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Copyright 2026 My Website. Built with Next.js.
      </footer>
    </div>
  );
}