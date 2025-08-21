import React from "react";

interface ConfigurationInputProps {
  value: string;
  onChange: (value: string) => void;
  errors: string[];
}

export function ConfigurationInput({ value, onChange, errors }: ConfigurationInputProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6 space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Configuració electrònica
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder="Ex.: 1s^2 2s^1 2p^1"
      />
      <p className="text-xs text-slate-500">
        Separats per espais. Només orbitals s, p i d. Exponent amb ^.
      </p>

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
