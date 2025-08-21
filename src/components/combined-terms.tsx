import React from "react";
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
  showFineStructure: boolean;
  onToggleFineStructure: (show: boolean) => void;
}

export function CombinedTerms({ 
  combinedWithJ, 
  parity, 
  showParity, 
  showFineStructure, 
  onToggleFineStructure 
}: CombinedTermsProps) {

  const formatMainTerm = (term: LabeledTerm) => {
    return showParity
      ? formatTermWithParity(term, parity)
      : formatTerm(term);
  };

  const formatFineTerm = (term: LabeledTerm, jValue: number) => {
    return showParity 
      ? formatTermWithJAndParity(term, jValue, parity)
      : formatTermWithJ(term, jValue);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Termes combinats (àtom)</h2>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-700">Estructura fina</label>
          <button
            onClick={() => onToggleFineStructure(!showFineStructure)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showFineStructure ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showFineStructure ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      
      {combinedWithJ.length === 0 ? (
        <div className="text-sm text-slate-500">— (esperant entrada vàlida)</div>
      ) : (
        <div className="space-y-3">
          {combinedWithJ.map((termWithJ, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
                  {formatMainTerm(termWithJ.term)}
                </span>
              </div>
              
              {showFineStructure && termWithJ.jValues.length > 0 && (
                <div className="ml-4 flex flex-wrap gap-2">
                  {termWithJ.jValues.map((jValue, jIndex) => (
                    <span
                      key={jIndex}
                      className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm"
                    >
                      {formatFineTerm(termWithJ.term, jValue)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {combinedWithJ.length > 0 && (
        <div className="mt-4 space-y-1">
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
