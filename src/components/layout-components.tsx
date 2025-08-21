import React from "react";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Càlcul de termes espectrals
      </h1>
      <a
        href="#"
        className="text-sm text-slate-600 hover:text-slate-900 underline decoration-dotted"
        onClick={(e) => e.preventDefault()}
        title="Basat en acoblament L–S (Russell–Saunders) i la taula proporcionada"
      >
        (prototip)
      </a>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="text-xs text-slate-500 pt-2">
      Nota: Aquest prototip empra acoblament L–S (Russell–Saunders) i ignora
      escissions fines (J) i regles de paritat/Pauli més detallades.
    </footer>
  );
}
