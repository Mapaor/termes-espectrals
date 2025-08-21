import React from 'react';

interface FractionProps {
  value: number;
}

export function Fraction({ value }: FractionProps) {
  // Si és enter, mostra com a subscript normal
  if (value % 1 === 0) {
    const subscriptMap: Record<string, string> = {
      '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
      '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
    };
    const subscriptText = value.toString().split('').map(digit => subscriptMap[digit] || digit).join('');
    return <span>{subscriptText}</span>;
  }
  
  // Si és fracció mitja (0.5, 1.5, 2.5, etc.)
  if (value === 0.5) {
    return (
      <span className="inline-fraction">
        <span className="num">1</span>
        <span className="slash">⁄</span>
        <span className="den">2</span>
      </span>
    );
  } else {
    // Per fraccions com 1.5, 2.5, etc. (que són n + 0.5)
    const wholePart = Math.floor(value);
    const numerator = 2 * wholePart + 1;
    return (
      <span className="inline-fraction">
        <span className="num">{numerator}</span>
        <span className="slash">⁄</span>
        <span className="den">2</span>
      </span>
    );
  }
}
