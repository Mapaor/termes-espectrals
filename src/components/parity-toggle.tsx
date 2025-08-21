import React from "react";

interface ParityToggleProps {
  showParity: boolean;
  onToggle: (show: boolean) => void;
  parity: 'e' | 'o';
}

export function ParityToggle({ showParity, onToggle, parity }: ParityToggleProps) {
  const parityText = parity === 'e' ? 'even (parella)' : 'odd (senar)';
  
  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">
          Mostrar paritat
        </label>
        <button
          onClick={() => onToggle(!showParity)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            showParity ? 'bg-sky-600' : 'bg-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              showParity ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      <div className="text-xs text-slate-500">
        Paritat de l&apos;àtom: <span className="font-medium">{parityText}</span>
      </div>
      {showParity && (
        <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2">
          La paritat es calcula com (-1)<sup>Σlᵢ</sup> on lᵢ és el nombre quàntic orbital 
          de cada electró en subcapes semi-plenes.
        </div>
      )}
    </div>
  );
}
