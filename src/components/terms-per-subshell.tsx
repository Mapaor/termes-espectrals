import React from "react";
import { formatTerm, type Term } from "@/lib/spectral-terms";

interface TermsPerSubshellProps {
  perShellTerms: Array<{
    shell: string;
    terms: Term[];
  }>;
}

export function TermsPerSubshell({ perShellTerms }: TermsPerSubshellProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <h2 className="font-semibold mb-3">Termes per subcapa</h2>
      {perShellTerms.length === 0 ? (
        <div className="text-sm text-slate-500">—</div>
      ) : (
        <div className="space-y-4">
          {perShellTerms.map((item, idx) => (
            <div key={idx}>
              <div className="text-sm text-slate-600 mb-1">{item.shell}</div>
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
          ))}
        </div>
      )}
    </div>
  );
}
