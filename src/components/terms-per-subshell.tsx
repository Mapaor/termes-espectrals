import React from "react";
import { formatTerm, calculateSubshellDegeneracy, type Term } from "@/lib/spectral-terms";

interface TermsPerSubshellProps {
  perShellTerms: Array<{
    shell: string;
    terms: Term[];
  }>;
  semiOpen?: Array<{ shell: string; e: number }>;
  showDegeneracy?: boolean;
}

export function TermsPerSubshell({ perShellTerms, semiOpen = [], showDegeneracy = false }: TermsPerSubshellProps) {
  
  const getSubshellElectrons = (shellName: string) => {
    // Extraiem la lletra de l'orbital (s, p, d, f) del nom complet (2s, 3p, etc.)
    const orbitalType = shellName.replace(/\d+/, ''); // Elimina els números
    return semiOpen.find(s => s.shell === orbitalType)?.e || 0;
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <h2 className="font-semibold mb-3">Termes per subcapa</h2>
      {perShellTerms.length === 0 ? (
        <div className="text-sm text-slate-500">
          Introdueix una configuració electrònica per veure els termes Russell-Saunders 
          generats per cada subcapa parcialment plena.
        </div>
      ) : (
        <div className="space-y-4">
          {perShellTerms.map((item, idx) => {
            const orbitalType = item.shell.replace(/\d+/, ''); // Extreu s, p, d, f
            const electrons = getSubshellElectrons(item.shell);
            const degeneracy = showDegeneracy ? calculateSubshellDegeneracy(orbitalType, electrons) : null;
            
            return (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-600">{item.shell}</span>
                  {showDegeneracy && degeneracy && (
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      𝔇 = {degeneracy}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.terms.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 text-sm"
                    >
                      {formatTerm(t)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
