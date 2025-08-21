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
    // Determinar l'estat d'ocupació de la subcapa més externa per aplicar la regla 3 de Hund
    const isOutermostSubshellMoreThanHalfFilled = () => {
      if (semiOpen.length === 0) return false;
      
      // Trobar la subcapa amb el nivell principal més alt (més externa)
      const outermostSubshell = semiOpen.reduce((outer, current) => {
        const outerLevel = parseInt(outer.shell[0]);
        const currentLevel = parseInt(current.shell[0]);
        
        // Si mateix nivell, comparem s < p < d < f
        if (outerLevel === currentLevel) {
          const subshellOrder = { 's': 0, 'p': 1, 'd': 2, 'f': 3 };
          const outerSubtype = outer.shell.slice(1);
          const currentSubtype = current.shell.slice(1);
          return subshellOrder[currentSubtype as keyof typeof subshellOrder] > 
                 subshellOrder[outerSubtype as keyof typeof subshellOrder] ? current : outer;
        }
        
        return currentLevel > outerLevel ? current : outer;
      });
      
      const maxElectrons = outermostSubshell.shell.includes('s') ? 2 : 
                          outermostSubshell.shell.includes('p') ? 6 : 
                          outermostSubshell.shell.includes('d') ? 10 : 14;
      
      // Retorna true si la subcapa més externa té més de la meitat d'electrons
      // Exemples: 3p^4 (4 de 6) = false (≤ mig plena), 3p^5 (5 de 6) = true (> mig plena)
      return outermostSubshell.e > maxElectrons / 2;
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
      // Regla 3: Per mateixa S i L, ordenem per J segons ocupació de la subcapa més externa
      const moreThanHalf = isOutermostSubshellMoreThanHalfFilled();
      sortedTerms.sort((a, b) => {
        // Primer ordenem per S (major S = menor energia)
        if (Math.abs(a.S - b.S) > 1e-9) {
          return b.S - a.S;
        }
        // Després per L (major L = menor energia per mateixa S)
        if (a.L !== b.L) {
          return b.L - a.L;
        }
        // Finalment per J segons la regla 3 de Hund:
        // Si subcapa més externa ≤ mig plena: menor J = menor energia
        // Si subcapa més externa > mig plena: major J = menor energia
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
