import React from 'react';
import { Fraction } from './fraction';
import { L_TO_LETTER, SToMult, type Term } from '@/lib/spectral-terms';

interface SpectralTermProps {
  term: Term;
  jValue?: number;
  parity?: 'e' | 'o';
  className?: string;
}

function toSuperscript(num: number): string {
  const superscriptMap: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return num.toString().split('').map(digit => superscriptMap[digit] || digit).join('');
}

export function SpectralTerm({ term, jValue, parity, className = '' }: SpectralTermProps) {
  const mult = SToMult(term.S);
  const lLetter = L_TO_LETTER[term.L] || `L=${term.L}`;
  const paritySymbol = parity === 'e' ? 'ᵉ' : parity === 'o' ? 'ᵒ' : '';

  return (
    <span className={className}>
      {toSuperscript(mult)}
      {lLetter}
      {jValue !== undefined && <Fraction value={jValue} />}
      {paritySymbol}
    </span>
  );
}
