import React from "react";

interface DegeneracyToggleProps {
  showDegeneracy: boolean;
  onToggle: (show: boolean) => void;
}

export function DegeneracyToggle({ showDegeneracy, onToggle }: DegeneracyToggleProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">Mostrar degeneració</h3>
          <p className="text-xs text-slate-500 mt-1">
            Mostra la degeneració per capa, terme i total
          </p>
        </div>
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
      
      {showDegeneracy && (
        <div className="mt-4 text-xs text-slate-600 space-y-2">
          <div>
            <strong>Degeneració per capa:</strong> 𝔇<sub>capa</sub> = C(2(2l+1), N<sub>e</sub>)
          </div>
          <div>
            <strong>Degeneració per terme:</strong> 𝔇<sub>terme</sub> = (2L+1)(2S+1)
          </div>
          <div>
            <strong>Degeneració total:</strong> 𝔇 = ∏ 𝔇<sub>capa</sub>
          </div>
        </div>
      )}
    </div>
  );
}
