import React, { useState } from "react";

interface ConfigurationInputProps {
  value: string;
  onChange: (value: string) => void;
  errors: string[];
}

export function ConfigurationInput({ value, onChange, errors }: ConfigurationInputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    const urlInput = value.replace(/ /g, '_').replace(/\^/g, '^');
    const url = new URL(window.location.href);
    url.searchParams.set('input', urlInput);
    
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar URL:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">
          Configuració electrònica
        </label>
        <button
          onClick={handleCopyUrl}
          className="flex items-center gap-2 text-xs bg-sky-100 hover:bg-sky-200 text-sky-700 px-3 py-1 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copiat!
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Compartir URL
            </>
          )}
        </button>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder="Ex.: 1s^2 2s^2 2p^5 3s^1"
      />
      <div className="space-y-1 text-xs text-slate-500">
        <p>
          <strong>Format:</strong> Subcapes separades per espais amb exponents (^). 
          Ex: <code className="bg-slate-100 px-1 rounded">1s^2 2s^2 2p^5 3s^1</code>
        </p>
        <p>
          <strong>Suportades:</strong> Orbitals s, p i d. 
          Només electrons de valència (subcapes parcialment plenes).
        </p>
        <p>
          <strong>Compartir:</strong> Utilitza el botó &quot;Compartir URL&quot; per generar un enllaç amb aquesta configuració.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mt-2 rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-800">
          <div className="font-semibold mb-1">Errors de sintaxi</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {errors.map((er, i) => (
              <li key={i}>{er}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
