// --- Utilitats de física atòmica --- //

// Map de L numèric -> lletra espectroscòpica (sense J)
export const L_TO_LETTER = [
  "S", // 0
  "P", // 1
  "D", // 2
  "F", // 3
  "G", // 4
  "H", // 5
  "I", // 6
  "K", // 7
  "L", // 8
  "M", // 9
  "N", // 10
  "O", // 11
  "Q", // 12
];

export interface Term {
  S: number;
  L: number;
}

export interface LabeledTerm extends Term {
  label: string;
}

export interface Subshell {
  n: number;
  shell: string;
  e: number;
  raw: string;
}

export function multToS(mult: number): number {
  return (mult - 1) / 2; // 2S+1 = mult
}

export function SToMult(S: number): number {
  return 2 * S + 1; // enter garantit si S és integer o semi-integer en passos de 1/2
}

// Taula de termes per subcapa semi-plena (seguint la taula proporcionada).
// Retorna una llista de { S, L } per a una subcapa concreta (s, p, d)
export function termsForSubshell(shell: string, electrons: number): Term[] {
  // Normalitza configuracions equivalents (forats): p^5 ≡ p^1, p^4 ≡ p^2, d^9 ≡ d^1, etc.
  if (shell === "p") {
    if (electrons === 5) electrons = 1;
    if (electrons === 4) electrons = 2;
  }
  if (shell === "d") {
    if (electrons === 9) electrons = 1;
    if (electrons === 8) electrons = 2;
    if (electrons === 7) electrons = 3;
    if (electrons === 6) electrons = 4;
  }

  const out: Term[] = [];
  const push = (mult: number, L: number) => out.push({ S: multToS(mult), L });

  if (shell === "s") {
    if (electrons === 1) {
      // ns^1 → ²S
      push(2, 0);
    }
    // ns^2 és tancada → no retorna res (ignoreu subcapa plena)
  }

  if (shell === "p") {
    if (electrons === 1) {
      // np^1 → ²P
      push(2, 1);
    } else if (electrons === 2) {
      // np^2 → ¹S, ¹D, ³P
      push(1, 0);
      push(1, 2);
      push(3, 1);
    } else if (electrons === 3) {
      // np^3 → ²P, ²D, ⁴S
      push(2, 1);
      push(2, 2);
      push(4, 0);
    }
    // p^6 és tancada → no s'inclou
  }

  if (shell === "d") {
    if (electrons === 1) {
      // nd^1 → ²D
      push(2, 2);
    } else if (electrons === 2) {
      // nd^2 → ¹S, ¹D, ¹G, ³P, ³F
      push(1, 0);
      push(1, 2);
      push(1, 4);
      push(3, 1);
      push(3, 3);
    } else if (electrons === 3) {
      // nd^3 → ²P, ²D, ²F, ²G, ²H, ⁴P, ⁴F
      push(2, 1);
      push(2, 2);
      push(2, 3);
      push(2, 4);
      push(2, 5);
      push(4, 1);
      push(4, 3);
    } else if (electrons === 4) {
      // nd^4 → ¹S, ¹D, ¹F, ¹G, ¹I, ³P, ³D, ³F, ³G, ³H, ⁵D
      push(1, 0);
      push(1, 2);
      push(1, 3);
      push(1, 4);
      push(1, 6);
      push(3, 1);
      push(3, 2);
      push(3, 3);
      push(3, 4);
      push(3, 5);
      push(5, 2);
    } else if (electrons === 5) {
      // nd^5 → ²S, ²P, ²D, ²F, ²G, ²H, ²I, ⁴P, ⁴D, ⁴F, ⁶S
      push(2, 0);
      push(2, 1);
      push(2, 2);
      push(2, 3);
      push(2, 4);
      push(2, 5);
      push(2, 6);
      push(4, 1);
      push(4, 2);
      push(4, 3);
      push(6, 0);
    }
    // d^10 és tancada → no s'inclou
  }

  // Elimina duplicats exactes
  const key = (t: Term) => `${t.S}|${t.L}`;
  const uniq = [...new Map(out.map((t) => [key(t), t])).values()];
  return uniq;
}

// Combinació de termes (regla d'addició)
export function combineTwo(termSetA: Term[], termSetB: Term[]): LabeledTerm[] {
  const results = new Map<string, LabeledTerm>(); // clau per etiqueta

  const addLabel = (S: number, L: number) => {
    const mult = SToMult(S);
    const Lletter = L_TO_LETTER[L] || `L=${L}`;
    const label = `^${mult}${Lletter}`;
    results.set(label, { label, S, L });
  };

  for (const a of termSetA) {
    for (const b of termSetB) {
      const Smin = Math.abs(a.S - b.S);
      const Smax = a.S + b.S;
      // Pas de 1 en unitats de S (conserva paritat de mig)
      for (let S = Smin; S <= Smax + 1e-9; S += 1) {
        // Ajust arrodoniment per mig enters
        const Sfixed = Math.round(S * 2) / 2;
        const Lmin = Math.abs(a.L - b.L);
        const Lmax = a.L + b.L;
        for (let L = Lmin; L <= Lmax; L += 1) {
          addLabel(Sfixed, L);
        }
      }
    }
  }
  return [...results.values()].sort((x, y) => x.L - y.L || y.S - x.S);
}

export function combineMany(termSets: Term[][]): LabeledTerm[] {
  if (termSets.length === 0) return [];
  if (termSets.length === 1) {
    return termSets[0].map((t) => ({
      label: `^${SToMult(t.S)}${L_TO_LETTER[t.L] || `L=${t.L}`}`,
      S: t.S,
      L: t.L,
    }));
  }
  let acc: Term[] = termSets[0];
  for (let i = 1; i < termSets.length; i++) {
    acc = combineTwo(acc, termSets[i]).map(({ S, L }) => ({ S, L }));
  }
  // Dedupliquem i ordenem
  const map = new Map<string, LabeledTerm>();
  for (const t of acc) {
    const label = `^${SToMult(t.S)}${L_TO_LETTER[t.L] || `L=${t.L}`}`;
    map.set(label, { label, ...t });
  }
  return [...map.values()].sort((x, y) => x.L - y.L || y.S - x.S);
}

// Parser de configuracions: "1s^2 2s^1 2p^1"
export function parseConfig(input: string): { subshells: Subshell[]; errors: string[] } {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  const subshells: Subshell[] = [];
  const errors: string[] = [];

  for (const tok of tokens) {
    const m = tok.match(/^(\d+)([spdf])(\^\d+)?$/i);
    if (!m) {
      errors.push(`Input invàlid: \`${tok}\``);
      continue;
    }
    const n = parseInt(m[1], 10);
    const shell = m[2].toLowerCase();
    const e = m[3] ? parseInt(m[3].slice(1), 10) : 1; // si no hi ha ^, assumim 1

    if (shell === "f") {
      errors.push(`No es permet l'orbital f (\`${tok}\`).`);
      continue;
    }

    const max = shell === "s" ? 2 : shell === "p" ? 6 : shell === "d" ? 10 : 0;
    if (e < 0 || e > max) {
      errors.push(`Nombre d'electrons fora de límit a \`${tok}\` (màx ${max}).`);
      continue;
    }

    subshells.push({ n, shell, e, raw: tok });
  }

  // Ordenem per n i tipus (s<p<d)
  const order: Record<string, number> = { s: 0, p: 1, d: 2 };
  subshells.sort((a, b) => a.n - b.n || order[a.shell] - order[b.shell]);
  return { subshells, errors };
}

export function isClosed({ shell, e }: Subshell): boolean {
  return (
    (shell === "s" && e === 2) ||
    (shell === "p" && e === 6) ||
    (shell === "d" && e === 10)
  );
}

// Utilitats per formatejat Unicode
function toSuperscript(num: number): string {
  const superscriptMap: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return num.toString().split('').map(digit => superscriptMap[digit] || digit).join('');
}

function toSubscript(num: number): string {
  const subscriptMap: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };
  return num.toString().split('').map(digit => subscriptMap[digit] || digit).join('');
}

// Formata el valor J com a fracció amb subscripts (mantenim per compatibilitat)
function formatJValue(j: number): string {
  // Si J és un nombre enter, retorna com a subscript normal
  if (j % 1 === 0) {
    return toSubscript(j);
  }
  
  // Si J és una fracció mitja, usa caràcters Unicode
  const fractionMap: Record<string, string> = {
    '0.5': '₁⁄₂',         
    '1.5': '₃⁄₂',         
    '2.5': '₅⁄₂',         
    '3.5': '₇⁄₂',         
    '4.5': '₉⁄₂',         
    '5.5': '₁₁⁄₂',        
    '6.5': '₁₃⁄₂',        
    '7.5': '₁₅⁄₂',        
    '8.5': '₁₇⁄₂',        
    '9.5': '₁₉⁄₂',        
  };
  
  const jStr = j.toString();
  return fractionMap[jStr] || toSubscript(j);
}

export interface TermWithJ {
  term: LabeledTerm;
  jValues: number[];
}

export interface TermWithParity extends LabeledTerm {
  parity: 'e' | 'o';
}

// Càlcul de paritat basada en les subcapes semi-plenes
export function calculateParity(semiOpenSubshells: Subshell[]): 'e' | 'o' {
  const totalL = semiOpenSubshells.reduce((sum, subshell) => {
    const lValue = subshell.shell === 's' ? 0 : subshell.shell === 'p' ? 1 : subshell.shell === 'd' ? 2 : 0;
    return sum + (lValue * subshell.e);
  }, 0);
  
  return totalL % 2 === 0 ? 'e' : 'o';
}

// Càlcul dels valors J per acoblament spin-òrbita
export function calculateJValues(S: number, L: number): number[] {
  const jMin = Math.abs(L - S);
  const jMax = L + S;
  const jValues: number[] = [];
  
  for (let j = jMin; j <= jMax; j += 1) {
    jValues.push(j);
  }
  
  return jValues;
}

// Funcions per calcular degeneració
function binomialCoefficient(n: number, k: number): number {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;
  
  // Optimització: C(n,k) = C(n,n-k)
  if (k > n - k) k = n - k;
  
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return Math.round(result);
}

export function calculateSubshellDegeneracy(shell: string, electrons: number): number {
  // D_capa = C(2(2l+1), Ne)
  const lValues: Record<string, number> = { 's': 0, 'p': 1, 'd': 2, 'f': 3 };
  const l = lValues[shell] ?? 0;
  const maxOrbitals = 2 * (2 * l + 1); // Nombre màxim d'electrons
  return binomialCoefficient(maxOrbitals, electrons);
}

export function calculateTermDegeneracy(term: Term): number {
  // D_terme = (2L+1)(2S+1)
  return (2 * term.L + 1) * (2 * term.S + 1);
}

export function calculateTotalDegeneracy(semiOpen: Array<{ shell: string; e: number }>): number {
  // D = ∏ D_capa
  return semiOpen.reduce((total, subshell) => {
    const degeneracy = calculateSubshellDegeneracy(subshell.shell, subshell.e);
    return total * degeneracy;
  }, 1);
}

// Formatejat de termes amb diferents opcions
export function formatTerm(t: Term): string {
  const mult = SToMult(t.S);
  const lLetter = L_TO_LETTER[t.L] || `L=${t.L}`;
  return `${toSuperscript(mult)}${lLetter}`;
}

export function formatTermWithJ(t: Term, j: number): string {
  const mult = SToMult(t.S);
  const lLetter = L_TO_LETTER[t.L] || `L=${t.L}`;
  return `${toSuperscript(mult)}${lLetter}${formatJValue(j)}`;
}

export function formatTermWithParity(t: Term, parity: 'e' | 'o'): string {
  const mult = SToMult(t.S);
  const lLetter = L_TO_LETTER[t.L] || `L=${t.L}`;
  const paritySymbol = parity === 'e' ? 'ᵉ' : 'ᵒ';
  return `${toSuperscript(mult)}${lLetter}${paritySymbol}`;
}

export function formatTermWithJAndParity(t: Term, j: number, parity: 'e' | 'o'): string {
  const mult = SToMult(t.S);
  const lLetter = L_TO_LETTER[t.L] || `L=${t.L}`;
  const paritySymbol = parity === 'e' ? 'ᵉ' : 'ᵒ';
  return `${toSuperscript(mult)}${lLetter}${formatJValue(j)}${paritySymbol}`;
}
