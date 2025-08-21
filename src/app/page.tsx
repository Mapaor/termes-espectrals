"use client";

import React, { useState } from "react";
import { useSpectralTerms } from "@/hooks/use-spectral-terms";
import {
  ConfigurationInput,
  SemiOpenSubshells,
  TermsPerSubshell,
  CombinedTerms,
  ParityToggle,
  DegeneracyToggle,
  HundRules,
  Header,
  Footer,
} from "@/components";

export default function Home() {
  const [input, setInput] = useState("1s^2 2s^1 2p^1");
  const [showParity, setShowParity] = useState(false);
  const [showDegeneracy, setShowDegeneracy] = useState(false);
  const [showFineStructure, setShowFineStructure] = useState(false);
  const [applyRule1, setApplyRule1] = useState(false);
  const [applyRule2, setApplyRule2] = useState(false);
  const [applyRule3, setApplyRule3] = useState(false);
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
            <TermsPerSubshell 
              perShellTerms={perShellTerms} 
              semiOpen={semiOpen}
              showDegeneracy={showDegeneracy}
            />
          </div>

          <aside className="md:col-span-1 space-y-4">
            <ParityToggle 
              showParity={showParity}
              onToggle={setShowParity}
              parity={parity}
            />
            <DegeneracyToggle
              showDegeneracy={showDegeneracy}
              onToggle={setShowDegeneracy}
            />
          </aside>
        </div>

        <section>
          <CombinedTerms 
            combinedWithJ={combinedWithJ} 
            parity={parity}
            showParity={showParity}
            showDegeneracy={showDegeneracy}
            showFineStructure={showFineStructure}
            semiOpen={semiOpen}
            onToggleFineStructure={setShowFineStructure}
          />
        </section>

        <section>
          <HundRules
            combinedWithJ={combinedWithJ}
            parity={parity}
            showParity={showParity}
            applyRule1={applyRule1}
            applyRule2={applyRule2}
            applyRule3={applyRule3}
            onToggleRule1={setApplyRule1}
            onToggleRule2={setApplyRule2}
            onToggleRule3={setApplyRule3}
            semiOpen={semiOpen}
          />
        </section>

        <Footer />
      </div>
    </div>
  );
}
