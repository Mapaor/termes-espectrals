import React from "react";

interface DegeneracyToggleProps {
  showDegeneracy: boolean;
  onToggle: (show: boolean) => void;
}

export function DegeneracyToggle({ showDegeneracy, onToggle }: DegeneracyToggleProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">
          Mostrar degeneració
        </label>
        <button
          onClick={() => onToggle(!showDegeneracy)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out ${
            showDegeneracy ? 'bg-purple-600' : 'bg-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out ${
              showDegeneracy ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      <div className="text-xs text-slate-500">
        Càlculs de degeneració per subcapes i termes espectrals
      </div>
      {showDegeneracy && (
        <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2 space-y-2">
          <p className="font-medium text-slate-700 mb-2">Fórmules utilitzades:</p>
          <div>
            <strong>Degeneració per subcapa:</strong> 𝔇<sub>subcapa</sub> = C(2(2l+1), N<sub>e</sub>)
          </div>
          <div>
            <strong>Degeneració per terme:</strong> 𝔇<sub>terme</sub> = (2L+1)(2S+1)
          </div>
          <div>
            <strong>Degeneració total:</strong> 𝔇<sub>total</sub> = ∏ 𝔇<sub>subcapa</sub>
          </div>
          <p className="text-slate-500 text-xs mt-2">
            On l és el nombre quàntic orbital, N<sub>e</sub> el nombre d&apos;electrons, 
            L i S els nombres quàntics total orbital i d&apos;espín.
          </p>
        </div>
      )}
    </div>
  );
}
