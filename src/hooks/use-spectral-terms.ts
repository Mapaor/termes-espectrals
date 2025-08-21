import { useMemo } from "react";
import {
  parseConfig,
  isClosed,
  termsForSubshell,
  combineMany,
  calculateParity,
  calculateJValues,
  type Subshell,
  type Term,
  type LabeledTerm,
  type TermWithJ,
} from "@/lib/spectral-terms";

interface UseSpectralTermsResult {
  semiOpen: Subshell[];
  perShellTerms: Array<{
    shell: string;
    terms: Term[];
  }>;
  combined: LabeledTerm[];
  combinedWithJ: TermWithJ[];
  parity: 'e' | 'o';
  errors: string[];
}

export function useSpectralTerms(input: string): UseSpectralTermsResult {
  return useMemo(() => {
    const { subshells, errors } = parseConfig(input);
    const semiOpen = subshells.filter((s) => s.e > 0 && !isClosed(s));
    const parity = calculateParity(semiOpen);

    // Terme global ¹S si cap subcapa és semi-plena
    if (semiOpen.length === 0 && subshells.length > 0) {
      const defaultTerm = { label: "¹S", S: 0, L: 0 };
      return {
        semiOpen,
        perShellTerms: [],
        combined: [defaultTerm],
        combinedWithJ: [{
          term: defaultTerm,
          jValues: calculateJValues(0, 0)
        }],
        parity: 'e', // Configuració tancada sempre té paritat even
        errors,
      };
    }

    const perShellTerms = semiOpen.map((s) => ({
      shell: `${s.n}${s.shell}${s.e > 1 ? s.e.toString() : ''}`,
      terms: termsForSubshell(s.shell, s.e),
    }));

    const termSets = perShellTerms.map((x) => x.terms);
    const combined = combineMany(termSets);
    
    // Calcular valors J per cada terme
    const combinedWithJ = combined.map((term) => ({
      term,
      jValues: calculateJValues(term.S, term.L)
    }));

    return { semiOpen, perShellTerms, combined, combinedWithJ, parity, errors };
  }, [input]);
}
