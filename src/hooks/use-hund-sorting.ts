import { useMemo } from "react";
import type { TermWithJ } from "@/lib/spectral-terms";

interface FineStructureTerm {
  term: TermWithJ['term'];
  jValue: number;
  formatted: string;
  S: number;
  L: number;
}

interface UseHundSortingProps {
  formattedTerms: FineStructureTerm[];
  applyRule1: boolean;
  applyRule2: boolean;
  applyRule3: boolean;
  semiOpen: Array<{ shell: string; e: number }>;
}

export function useHundSorting({
  formattedTerms,
  applyRule1,
  applyRule2,
  applyRule3,
  semiOpen,
}: UseHundSortingProps) {
  
  const result = useMemo(() => {
    // Determinar si les subcapes estan més de mig plenes
    const isMoreThanHalfFilled = () => {
      let totalElectrons = 0;
      let totalForats = 0;
      
      semiOpen.forEach(subshell => {
        const maxElectrons = subshell.shell === 's' ? 2 : subshell.shell === 'p' ? 6 : 10;
        totalElectrons += subshell.e;
        totalForats += (maxElectrons - subshell.e);
      });
      
      return totalElectrons > totalForats;
    };

    // Aplicar regles d'ordenació amb lògica més precisa
    const sortedTerms = [...formattedTerms];
    let showSeparators: "none" | "byS" | "bySL" | "all" = "none";
    
    if (applyRule1) {
      // Regla 1: Major multiplicitat (major S) té menor energia
      sortedTerms.sort((a, b) => b.S - a.S);
      
      // Només mostrem separadors si hi ha diferents multiplicitats
      const uniqueS = new Set(sortedTerms.map(t => t.S));
      if (uniqueS.size > 1 && !applyRule2 && !applyRule3) {
        showSeparators = "byS";
      }
    }
    
    if (applyRule2) {
      // Regla 2: Per mateixa S, major L té menor energia
      sortedTerms.sort((a, b) => {
        if (Math.abs(a.S - b.S) < 1e-9) {
          return b.L - a.L;
        }
        return b.S - a.S;
      });
      
      // Mostrem separadors entre grups de mateixa S i L si no s'aplica regla 3
      if (!applyRule3) {
        showSeparators = "bySL";
      }
    }
    
    if (applyRule3) {
      // Regla 3: Per mateixa S i L, ordenem per J segons ocupació
      const moreThanHalf = isMoreThanHalfFilled();
      sortedTerms.sort((a, b) => {
        // Primer ordenem per S (major S = menor energia)
        if (Math.abs(a.S - b.S) > 1e-9) {
          return b.S - a.S;
        }
        // Després per L (major L = menor energia per mateixa S)
        if (a.L !== b.L) {
          return b.L - a.L;
        }
        // Finalment per J (segons regla de Hund per mateixa S i L)
        // Si subcapa ≤ mig plena: menor J = menor energia (ordre ascendent)
        // Si subcapa > mig plena: major J = menor energia (ordre descendent)
        return moreThanHalf ? (b.jValue - a.jValue) : (a.jValue - b.jValue);
      });
      
      // Ara sí mostrem tots els separadors
      showSeparators = "all";
    }

    return {
      sortedTerms,
      showSeparators,
      hasRulesApplied: applyRule1 || applyRule2 || applyRule3,
    };
  }, [formattedTerms, applyRule1, applyRule2, applyRule3, semiOpen]);

  return {
    sortedTerms: result.sortedTerms,
    showSeparators: result.showSeparators,
    hasRulesApplied: result.hasRulesApplied,
  };
}
