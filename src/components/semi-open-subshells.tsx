import React from "react";
import type { Subshell } from "@/lib/spectral-terms";

function toSuperscript(num: number): string {
  const superscriptMap: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return num.toString().split('').map(digit => superscriptMap[digit] || digit).join('');
}

interface SemiOpenSubshellsProps {
  semiOpen: Subshell[];
}

export function SemiOpenSubshells({ semiOpen }: SemiOpenSubshellsProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6 space-y-3">
      <div className="text-sm text-slate-600">Subcapes semi-plenes detectades</div>
      {semiOpen.length === 0 ? (
        <div className="text-sm text-slate-500">Cap (configuració tancada)</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {semiOpen.map((s, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-sm"
            >
              {s.n}{s.shell}{toSuperscript(s.e)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
