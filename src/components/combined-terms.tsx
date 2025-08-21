import React from "react";
import { 
  formatTerm, 
  formatTermWithParity, 
  calculateTermDegeneracy,
  calculateTotalDegeneracy,
  type LabeledTerm, 
  type TermWithJ 
} from "@/lib/spectral-terms";
import { SpectralTerm } from "./spectral-term";

interface CombinedTermsProps {
  combinedWithJ: TermWithJ[];
  parity: 'e' | 'o';
  showParity: boolean;
  showFineStructure: boolean;
  showDegeneracy?: boolean;
  semiOpen?: Array<{ shell: string; e: number }>;
  onToggleFineStructure: (show: boolean) => void;
}

export function CombinedTerms({ 
  combinedWithJ, 
  parity, 
  showParity, 
  showFineStructure, 
  showDegeneracy = false,
  semiOpen = [],
  onToggleFineStructure 
}: CombinedTermsProps) {

  const formatMainTerm = (term: LabeledTerm) => {
    return showParity
      ? formatTermWithParity(term, parity)
      : formatTerm(term);
  };

  const totalDegeneracy = showDegeneracy ? calculateTotalDegeneracy(semiOpen) : null;

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Termes espectrals àtom</h2>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-700">Estructura fina</label>
          <button
            onClick={() => onToggleFineStructure(!showFineStructure)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out ${
              showFineStructure ? 'bg-green-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out ${
                showFineStructure ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      
      {combinedWithJ.length === 0 ? (
        <div className="text-sm text-slate-500">
          Els termes de diferents subcapes es combinaran automàticament 
          seguint les regles de Russell-Saunders.
        </div>
      ) : (
        <div className="space-y-3">
          {combinedWithJ.map((termWithJ, i) => {
            const termDegeneracy = showDegeneracy ? calculateTermDegeneracy(termWithJ.term) : null;
            const fineStructureDegeneracy = showFineStructure ? termWithJ.jValues.length : null;
            
            return (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
                    {formatMainTerm(termWithJ.term)}
                  </span>
                  {showDegeneracy && termDegeneracy && (
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      𝔇 = {termDegeneracy}
                    </span>
                  )}
                  {showFineStructure && fineStructureDegeneracy && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      J-nivells: {fineStructureDegeneracy}
                    </span>
                  )}
                </div>
                
                {showFineStructure && termWithJ.jValues.length > 0 && (
                  <div className="ml-4 flex flex-wrap gap-2">
                    {termWithJ.jValues.map((jValue, jIndex) => (
                      <span
                        key={jIndex}
                        className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm"
                      >
                        <SpectralTerm 
                          term={termWithJ.term}
                          jValue={jValue}
                          parity={showParity ? parity : undefined}
                        />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {combinedWithJ.length > 0 && (
        <div className="mt-4 space-y-1">
          <p className="text-xs text-slate-500">
            Calculats amb la regla d&apos;addició: S ∈ {"{|S₁−S₂|,…,S₁+S₂}"}, L ∈{" "}
            {"{|L₁−L₂|,…,L₁+L₂}"} en salts d&apos;1.
          </p>
          {showFineStructure && (
            <p className="text-xs text-slate-500">
              Estructura fina: J ∈ {"{|L−S|,…,L+S}"} per acoblament spin-òrbita.
            </p>
          )}
          {showDegeneracy && totalDegeneracy && (
            <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-purple-800">
                Degeneració total de l&apos;àtom: 𝔇 = {totalDegeneracy.toLocaleString()}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Nombre total d&apos;estats possibles per aquesta configuració electrònica.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
