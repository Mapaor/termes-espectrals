import React, { useState } from "react";
import { formatTerm, calculateSubshellDegeneracy, type Term } from "@/lib/spectral-terms";

interface TermsPerSubshellProps {
  perShellTerms: Array<{
    shell: string;
    terms: Term[];
  }>;
  semiOpen?: Array<{ shell: string; e: number }>;
  showDegeneracy?: boolean;
}

export function TermsPerSubshell({ perShellTerms, semiOpen = [], showDegeneracy = false }: TermsPerSubshellProps) {
  const [showModal, setShowModal] = useState(false);
  
  const getSubshellElectrons = (shellName: string) => {
    // Extraiem la lletra de l'orbital (s, p, d, f) del nom complet (2s, 3p, etc.)
    const orbitalType = shellName.replace(/\d+/, ''); // Elimina els números
    return semiOpen.find(s => s.shell === orbitalType)?.e || 0;
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <h2 className="font-semibold mb-3">Termes espectrals per subcapa</h2>
      {perShellTerms.length === 0 ? (
        <div className="text-sm text-slate-500">
          Introdueix una configuració electrònica per veure els termes Russell-Saunders 
          generats per cada subcapa parcialment plena.
        </div>
      ) : (
        <div className="space-y-4">
          {perShellTerms.map((item, idx) => {
            // Extreu la subcapa (ex: '3d' de '3d9')
            const subcapa = item.shell.match(/^\d+[spdf]/)?.[0] || item.shell;
            const orbitalType = item.shell.replace(/\d+/, ''); // Manté per compatibilitat amb la lògica existent
            const electrons = getSubshellElectrons(item.shell);
            const degeneracy = showDegeneracy ? calculateSubshellDegeneracy(orbitalType, electrons) : null;
            return (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-600">{subcapa}</span>
                  {showDegeneracy && degeneracy && (
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      𝔇 = {degeneracy}
                    </span>
                  )}
                </div>
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
            );
          })}
        </div>
      )}
      
      {perShellTerms.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-slate-500">
            Obtinguts utilitzant la{" "}
            <button 
              onClick={() => setShowModal(true)}
              className="hover:text-slate-400 transition-all duration-100 ease-in-out underline cursor-pointer"
            >
              taula de referència
            </button>
            {""}.
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full h-[80vh] relative animate-in zoom-in-95 duration-300 ease-out flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold z-10 transition-colors duration-150"
            >
              ✕
            </button>
            
            {/* Modal header */}
            <div className="p-6 pb-4 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">Taula de termes espectrals per subcapes</h3>
            </div>
            
            {/* Modal content - scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-300 text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">
                        Configuració Electrònica
                      </th>
                      <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-700">
                        Termes Singlet (¹L)
                      </th>
                      <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-700">
                        Termes Doublet (²L)
                      </th>
                      <th className="border border-slate-300 px-3 py-2 text-center font-semibold text-slate-700">
                        Termes Triplet (³L)
                      </th>
                      <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-700">
                        Termes Quartet (⁴L)
                      </th>
                      <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-700">
                        Termes Quintet (⁵L)
                      </th>
                      <th className="border border-slate-300 px-2 py-2 text-center font-semibold text-slate-700">
                        Termes Sextet (⁶L)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">ns¹</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">²S</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">ns²</td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">¹S</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">np¹, np⁵</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">²P</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">np², np⁴</td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">¹S, ¹D</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">³P</td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">np³</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">²P, ²D</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center font-mono">⁴S</td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">np⁶</td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">¹S</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">nd¹, nd⁹</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">²D</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">nd², nd⁸</td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">¹S, ¹D, ¹G</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">³P, ³F</td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">nd³, nd⁷</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">²P, ²D, ²F, ²G, ²H</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center font-mono">⁴P, ⁴F</td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">nd⁴, nd⁶</td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">¹S, ¹D, ¹F, ¹G, ¹I</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">³P, ³D, ³F, ³G, ³H</td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center font-mono">⁵D</td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">nd⁵</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">²S, ²P, ²D, ²F, ²G, ²H, ²I</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center font-mono">⁴P, ⁴D, ⁴F, ⁴G</td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center font-mono">⁶S</td>
                    </tr>
                    <tr className="hover:bg-slate-25">
                      <td className="border border-slate-300 px-3 py-2 font-mono text-slate-700">nd¹⁰</td>
                      <td className="border border-slate-300 px-3 py-2 text-center font-mono">¹S</td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-3 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                      <td className="border border-slate-300 px-2 py-2 text-center text-slate-400"></td>
                    </tr>
                  </tbody>
                  <caption className="text-slate-600 text-xs py-2 mb-1 caption-bottom text-center italic">
                  Taula: Termes espectrals per subcapa compatibles amb el principi d&apos;exclusió de Pauli.
                    
                    
                  </caption>
                </table>
              </div>
              
              {/* Reference citation */}
              <div className="mt-2 pt-2">
                <p className="text-sm text-slate-500 text-center">
                  La original es troba a <a href="https://www.if.ufrj.br/~ginette/2017-FIW476/livros%20e%20artigos/Physics_of_atoms_and_molecules_Bransden_Joachain.pdf#page=353" className="hover:text-slate-400 transition-all duration-100 ease-in-out underline cursor-pointer">
                  Physics of Atoms and Molecules (Bransden, 1990)</a>, pàg. 345.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
