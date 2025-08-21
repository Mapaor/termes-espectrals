import React from "react";
import type { LabeledTerm } from "@/lib/spectral-terms";
import { SpectralTerm } from "../spectral-term";

interface FineStructureTerm {
  term: LabeledTerm;
  jValue: number;
  formatted: string;
  S: number;
  L: number;
  parity?: 'e' | 'o';
}

interface OrderedTermsDisplayProps {
  sortedTerms: FineStructureTerm[];
  showSeparators: "none" | "byS" | "bySL" | "all";
  hasRulesApplied: boolean;
  parity?: 'e' | 'o';
  showParity?: boolean;
}

export function OrderedTermsDisplay({ 
  sortedTerms, 
  showSeparators, 
  hasRulesApplied,
  parity,
  showParity = false
}: OrderedTermsDisplayProps) {
  
  // Determinar si cal mostrar separador entre dos termes consecutius
  const shouldShowSeparator = (current: FineStructureTerm, next: FineStructureTerm): boolean => {
    if (showSeparators === "all") return true;
    if (showSeparators === "byS") {
      return Math.abs(current.S - next.S) > 1e-9;
    }
    if (showSeparators === "bySL") {
      return Math.abs(current.S - next.S) > 1e-9 || current.L !== next.L;
    }
    return false;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-700 mb-3">
        {hasRulesApplied 
          ? "Termes ordenats per energia (fonamental → excitat):"
          : "Tots els termes d'estructura fina:"
        }
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        {sortedTerms.map((fineTermData, index) => (
          <React.Fragment key={index}>
            <span
              className={`px-2.5 py-1 rounded-full border text-sm ${
                index === 0 && hasRulesApplied
                  ? 'bg-green-50 text-green-700 border-green-200 font-medium'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              <SpectralTerm 
                term={fineTermData.term}
                jValue={fineTermData.jValue}
                parity={showParity ? parity : undefined}
              />
              {index === 0 && hasRulesApplied && (
                <span className="ml-1 text-xs">(fonamental)</span>
              )}
            </span>
            {index < sortedTerms.length - 1 && 
             shouldShowSeparator(fineTermData, sortedTerms[index + 1]) && (
              <span className="text-slate-400 text-sm">&lt;</span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {hasRulesApplied && (
        <div className="mt-3 text-xs text-slate-600 bg-green-50 rounded-lg p-2">
          <strong>Interpretació:</strong> Els termes estan ordenats d&apos;esquerra a dreta 
          per energia creixent. El primer terme (verd) és l&apos;estat fonamental de l&apos;àtom.
        </div>
      )}
    </div>
  );
}
