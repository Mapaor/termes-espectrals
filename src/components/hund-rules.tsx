import React from "react";
import { 
  formatTermWithJ, 
  formatTermWithJAndParity,
  type TermWithJ 
} from "@/lib/spectral-terms";
import { useHundSorting } from "@/hooks/use-hund-sorting";
import { SmoothToggle, OrderedTermsDisplay } from "./hund-rules/";

interface HundRulesProps {
  combinedWithJ: TermWithJ[];
  parity: 'e' | 'o';
  showParity: boolean;
  applyRule1: boolean;
  applyRule2: boolean;
  applyRule3: boolean;
  onToggleRule1: (apply: boolean) => void;
  onToggleRule2: (apply: boolean) => void;
  onToggleRule3: (apply: boolean) => void;
  semiOpen: Array<{ shell: string; e: number }>;
}

interface FineStructureTerm {
  term: TermWithJ['term'];
  jValue: number;
  formatted: string;
  S: number;
  L: number;
}

export function HundRules({
  combinedWithJ,
  parity,
  showParity,
  applyRule1,
  applyRule2,
  applyRule3,
  onToggleRule1,
  onToggleRule2,
  onToggleRule3,
  semiOpen,
}: HundRulesProps) {
  
  // Recollim tots els termes d'estructura fina
  const allFineStructureTerms: FineStructureTerm[] = combinedWithJ.flatMap((termWithJ) =>
    termWithJ.jValues.map((jValue) => ({
      term: termWithJ.term,
      jValue,
      formatted: showParity
        ? formatTermWithJAndParity(termWithJ.term, jValue, parity)
        : formatTermWithJ(termWithJ.term, jValue),
      S: termWithJ.term.S,
      L: termWithJ.term.L,
    }))
  );

  const { sortedTerms, showSeparators, hasRulesApplied } = useHundSorting({
    formattedTerms: allFineStructureTerms,
    applyRule1,
    applyRule2,
    applyRule3,
    semiOpen,
  });

  const handleToggleRule2 = (apply: boolean) => {
    if (apply && !applyRule1) return; // No es pot activar sense la regla 1
    if (!apply) {
      // Si desactivem la regla 2, també desactivem la 3
      onToggleRule3(false);
    }
    onToggleRule2(apply);
  };

  const handleToggleRule3 = (apply: boolean) => {
    if (apply && !applyRule2) return; // No es pot activar sense la regla 2
    onToggleRule3(apply);
  };

  const handleToggleRule1 = (apply: boolean) => {
    if (!apply) {
      // Si desactivem la regla 1, també desactivem la 2 i 3
      onToggleRule2(false);
      onToggleRule3(false);
    }
    onToggleRule1(apply);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <h2 className="font-semibold mb-4">Regles de Hund per ordenació energètica</h2>
      
      {allFineStructureTerms.length === 0 ? (
        <div className="text-sm text-slate-500">
          Activa l&apos;estructura fina per aplicar les regles de Hund 
          i determinar l&apos;ordre energètic dels nivells.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls per les regles */}
          <div className="grid md:grid-cols-3 gap-4">
            <SmoothToggle
              label="Aplicar regla 1"
              isActive={applyRule1}
              onToggle={handleToggleRule1}
              description="Màxima multiplicitat (menor energia)"
            />
            
            <SmoothToggle
              label="Aplicar regla 2"
              isActive={applyRule2}
              onToggle={handleToggleRule2}
              disabled={!applyRule1}
              description="Major L si mateixa multiplicitat"
            />
            
            <SmoothToggle
              label="Aplicar regla 3"
              isActive={applyRule3}
              onToggle={handleToggleRule3}
              disabled={!applyRule2}
              description="Ordenació per menor J si capa més externa ≤mig plena, per major J si >mig plena"
            />
          </div>

          {/* Termes d'estructura fina ordenats */}
          <OrderedTermsDisplay
            sortedTerms={sortedTerms}
            showSeparators={showSeparators}
            hasRulesApplied={hasRulesApplied}
            parity={parity}
            showParity={showParity}
          />
        </div>
      )}
      
      <div className="mt-4 text-xs text-slate-500">
        <p>
          <strong>Regles de Hund:</strong> (1) Màxima multiplicitat, (2) Major L per mateixa multiplicitat, 
          (3) Si subcapa més externa ≤mig plena: menor J; si subcapa més externa &gt;mig plena: major J.
        </p>
        <p className="mt-1">
          Aquestes regles determinen l&apos;ordre energètic i identifiquen l&apos;estat fonamental.
        </p>
      </div>
    </div>
  );
}
