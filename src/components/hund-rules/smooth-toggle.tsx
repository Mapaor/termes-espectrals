import React from "react";

interface SmoothToggleProps {
  label: string;
  isActive: boolean;
  onToggle: (active: boolean) => void;
  disabled?: boolean;
  description?: string;
}

export function SmoothToggle({ 
  label, 
  isActive, 
  onToggle,
  disabled = false,
  description
}: SmoothToggleProps) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <div className="flex items-center justify-between">
        <label className={`text-sm font-medium ${disabled ? 'text-slate-400' : 'text-slate-700'}`}>
          {label}
        </label>
        <button
          onClick={() => !disabled && onToggle(!isActive)}
          disabled={disabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out ${
            disabled 
              ? 'bg-slate-100 cursor-not-allowed' 
              : isActive 
                ? 'bg-green-600' 
                : 'bg-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out ${
              isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      {description && (
        <p className="text-xs text-slate-500 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
