import React from "react";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Calculadora de termes espectrals
      </h1>
      <div className="text-right">
        <div className="text-sm text-slate-600">
          Acoblament Russell-Saunders (L-S)
        </div>
        <div className="text-xs text-slate-500">
          Termes espectrals • Estructura fina • Regles de Hund
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="text-xs text-slate-500 pt-6 border-t border-slate-200">
      <div className="text-center space-y-3">
        {/* Links amb icones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Link Notion */}
          <a 
            href="https://fisicaubwiki.notion.site/24e11a9761ab8066b66dfe7ad8fa637b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-90 px-3 py-2 rounded-lg transition-all duration-300 ease-out group"
          >
            <div className="w-4 h-4 flex items-center justify-center bg-slate-100 rounde transition-all duration-300 ease-out">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.268-.187z"/>
              </svg>
            </div>
            <span className="font-medium group-hover:underline transition-all duration-300 ease-out">Teoria física atòmica</span>
          </a>

          {/* Link GitHub */}
          <a 
            href="https://github.com/Mapaor/termes-espectrals"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg transition-all duration-300 ease-out group"
          >
            <div className="w-4 h-4 flex items-center justify-center bg-slate-100 rounded transition-all duration-300 ease-out">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span className="font-medium group-hover:underline transition-all duration-300 ease-out">Codi font</span>
          </a>
        </div>

        {/* Informació addicional */}
        <div className="pt-2 text-slate-400">
          <p>Martí Pardo (2025) — MIT Licence</p>
        </div>
      </div>
    </footer>
  );
}
