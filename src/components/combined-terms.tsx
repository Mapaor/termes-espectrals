import React, { useState } from "react";
import { 
  formatTerm, 
  formatTermWithJ, 
  formatTermWithParity, 
  formatTermWithJAndParity,
  type LabeledTerm, 
  type TermWithJ 
} from "@/lib/spectral-terms";

interface CombinedTermsProps {
  combinedWithJ: TermWithJ[];
  parity: 'e' | 'o';
  showParity: boolean;
}

export function CombinedTerms({ combinedWithJ, parity, showParity }: CombinedTermsProps) {
  const [showFineStructure, setShowFineStructure] = useState(false);

  const formatTermDisplay = (term: LabeledTerm, jValue?: number) => {
    if (showFineStructure && jValue !== undefined) {
      return showParity 
        ? formatTermWithJAndParity(term, jValue, parity)
        : formatTermWithJ(term, jValue);
    } else {
      return showParity
        ? formatTermWithParity(term, parity)
        : formatTerm(term);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Termes combinats (àtom)</h2>
        <button
          onClick={() => setShowFineStructure(!showFineStructure)}
          className={`text-xs px-2 py-1 rounded-md transition-colors ${
            showFineStructure 
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          {showFineStructure ? 'Amagar' : 'Mostrar'} estructura fina
        </button>
      </div>
      
      {combinedWithJ.length === 0 ? (
        <div className="text-sm text-slate-500">— (esperant entrada vàlida)</div>
      ) : (
        <div className="space-y-4">
          {!showFineStructure ? (
            <div className="flex flex-wrap gap-2">
              {combinedWithJ.map((termWithJ, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm"
                >
                  {formatTermDisplay(termWithJ.term)}
                </span>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {combinedWithJ.map((termWithJ, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    {formatTermDisplay(termWithJ.term)} → J ∈ {"{"}
                    {termWithJ.jValues.join(', ')}{"}"}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {termWithJ.jValues.map((jValue, jIndex) => (
                      <span
                        key={jIndex}
                        className="px-2 py-1 text-xs rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200"
                      >
                        {formatTermDisplay(termWithJ.term, jValue)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {combinedWithJ.length > 0 && (
        <div className="mt-3 space-y-1">
          <p className="text-xs text-slate-500">
            Construïts amb la regla d&apos;addició: S ∈ {"{|S₁−S₂|,…,S₁+S₂}"}, L ∈{" "}
            {"{|L₁−L₂|,…,L₁+L₂}"} en salts d&apos;1.
          </p>
          {showFineStructure && (
            <p className="text-xs text-slate-500">
              Estructura fina: J ∈ {"{|L−S|,…,L+S}"} per acoblament spin-òrbita.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
