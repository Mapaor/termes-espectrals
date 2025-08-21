"use client";

import React, { useState } from "react";
import { useSpectralTerms } from "@/hooks/use-spectral-terms";
import {
  ConfigurationInput,
  SemiOpenSubshells,
  TermsPerSubshell,
  CombinedTerms,
  ParityToggle,
  Header,
  Footer,
} from "@/components";

export default function Home() {
  const [input, setInput] = useState("1s^2 2s^1 2p^1");
  const [showParity, setShowParity] = useState(false);
  const [showFineStructure, setShowFineStructure] = useState(false);
  const { semiOpen, perShellTerms, combinedWithJ, parity, errors } = useSpectralTerms(input);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Header />

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <ConfigurationInput
              value={input}
              onChange={setInput}
              errors={errors}
            />
          </div>

          <aside className="md:col-span-1">
            <SemiOpenSubshells semiOpen={semiOpen} />
          </aside>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TermsPerSubshell perShellTerms={perShellTerms} />
          </div>

          <aside className="md:col-span-1">
            <ParityToggle 
              showParity={showParity}
              onToggle={setShowParity}
              parity={parity}
            />
          </aside>
        </div>

        <section>
          <CombinedTerms 
            combinedWithJ={combinedWithJ} 
            parity={parity}
            showParity={showParity}
            showFineStructure={showFineStructure}
            onToggleFineStructure={setShowFineStructure}
          />
        </section>

        <Footer />
      </div>
    </div>
  );
}
