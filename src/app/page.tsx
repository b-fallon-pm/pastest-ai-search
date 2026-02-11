"use client";

import { useState, useEffect, useRef } from "react";

// ── Hardcoded data keyed by condition ──────────────────────────────────────────

type ResultData = {
  keyConcepts: { title: string; body: string }[];
  niceHighlights: { guideline: string; points: string[] }[];
  pastestContent: { type: string; title: string; meta: string }[];
  learningPath: { step: number; title: string; description: string }[];
};

const RESULTS: Record<string, ResultData> = {
  default: {
    keyConcepts: [
      {
        title: "Pathophysiology",
        body: "Diabetic ketoacidosis (DKA) results from an absolute or relative insulin deficiency combined with counter-regulatory hormone excess. The triad of uncontrolled hyperglycaemia, metabolic acidosis, and increased total body ketone concentration characterises the condition.",
      },
      {
        title: "Precipitating Factors",
        body: "The most common precipitants include infection (30-40%), non-compliance with insulin therapy (15-20%), and new-onset diabetes. Other triggers include myocardial infarction, stroke, pancreatitis, and drugs such as corticosteroids and SGLT2 inhibitors.",
      },
      {
        title: "Diagnostic Criteria",
        body: "DKA is defined by: blood glucose > 11 mmol/L (or known diabetes), pH < 7.3 and/or bicarbonate < 15 mmol/L, and ketonaemia ≥ 3.0 mmol/L or significant ketonuria (2+ on dipstick). Severity is graded by pH: mild (7.25-7.30), moderate (7.00-7.24), and severe (< 7.00).",
      },
      {
        title: "Key Management Principles",
        body: "Treatment follows a fixed-rate IV insulin infusion (0.1 units/kg/hr), aggressive fluid resuscitation with 0.9% saline, potassium replacement guided by serum levels, and identification and treatment of the underlying cause. Cerebral oedema is the most feared complication, particularly in children.",
      },
    ],
    niceHighlights: [
      {
        guideline: "NICE NG17 — Type 1 Diabetes in Adults",
        points: [
          "Suspect DKA in any person with type 1 diabetes who is unwell, and measure blood ketones urgently",
          "Use a fixed-rate intravenous insulin infusion based on weight (0.1 units/kg/hour)",
          "Do not stop long-acting insulin analogues during DKA treatment",
          "Measure venous blood gas, blood ketones, and capillary glucose at least every 1-2 hours",
          "Involve the diabetes specialist team within 24 hours of admission",
        ],
      },
      {
        guideline: "Joint British Diabetes Societies — DKA Guidelines",
        points: [
          "Target a fall in ketones of 0.5 mmol/L/hr and a rise in bicarbonate of 3.0 mmol/L/hr",
          "Add 10% glucose when blood glucose falls below 14 mmol/L",
          "Potassium replacement should begin when serum K+ is below 5.5 mmol/L",
          "Resolution is defined as pH > 7.3, bicarbonate > 15 mmol/L, and ketones < 0.6 mmol/L",
        ],
      },
    ],
    pastestContent: [
      {
        type: "SBA",
        title: "A 22-year-old Type 1 diabetic presents with vomiting, abdominal pain, and Kussmaul respiration. Blood glucose 28 mmol/L, pH 7.1. What is the most important initial management step?",
        meta: "Endocrinology · 847 attempts · 72% correct",
      },
      {
        type: "SBA",
        title: "Which electrolyte abnormality is most critical to monitor during DKA treatment and can cause fatal cardiac arrhythmias if uncorrected?",
        meta: "Endocrinology · 1,203 attempts · 65% correct",
      },
      {
        type: "SBA",
        title: "A patient with DKA has a serum potassium of 3.1 mmol/L on admission. What should be done before starting insulin?",
        meta: "Endocrinology · 562 attempts · 58% correct",
      },
      {
        type: "EMQ",
        title: "Match the acid-base disturbance to the clinical scenario: DKA, renal tubular acidosis, lactic acidosis, salicylate poisoning",
        meta: "Clinical Chemistry · 1,456 attempts · 61% correct",
      },
      {
        type: "SBA",
        title: "What is the most common precipitant of diabetic ketoacidosis in a known Type 1 diabetic?",
        meta: "Endocrinology · 2,104 attempts · 78% correct",
      },
      {
        type: "Mock Exam",
        title: "Endocrine Emergencies — 30 Question Practice Paper",
        meta: "Covers DKA, hyperosmolar state, thyroid storm, adrenal crisis · 45 min",
      },
    ],
    learningPath: [
      {
        step: 1,
        title: "Understand the Basics",
        description:
          "Review pathophysiology of insulin deficiency, ketogenesis, and the anion gap metabolic acidosis. Start with the Key Concepts above, then attempt the foundational SBAs.",
      },
      {
        step: 2,
        title: "Master the Management",
        description:
          "Work through the NICE and JBDS guidelines. Focus on fluid protocols, insulin dosing, potassium replacement thresholds, and resolution criteria. Attempt the management-focused questions.",
      },
      {
        step: 3,
        title: "Test Under Exam Conditions",
        description:
          "Complete the Endocrine Emergencies mock paper under timed conditions. Review any incorrect answers, then revisit the EMQ-style questions to consolidate pattern recognition.",
      },
    ],
  },
};

// ── Typewriter effect ──────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 12, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      setDone(false);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayed, done };
}

// ── Loading skeleton ───────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-6 px-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div
            className="h-5 rounded-md animate-shimmer"
            style={{
              width: `${40 + i * 15}%`,
              background:
                "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
              animationDelay: `${i * 0.15}s`,
            }}
          />
          <div
            className="h-4 rounded-md animate-shimmer"
            style={{
              width: `${80 - i * 10}%`,
              background:
                "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
              animationDelay: `${i * 0.15 + 0.1}s`,
            }}
          />
          <div
            className="h-4 rounded-md animate-shimmer"
            style={{
              width: `${60 + i * 5}%`,
              background:
                "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
              animationDelay: `${i * 0.15 + 0.2}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────

function Section({
  title,
  icon,
  delay,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ── Concept card with typewriter ───────────────────────────────────────────────

function ConceptCard({
  concept,
  index,
  active,
}: {
  concept: { title: string; body: string };
  index: number;
  active: boolean;
}) {
  const { displayed, done } = useTypewriter(concept.body, 8, active);

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <h3 className="text-sm font-semibold text-teal-700 mb-2 uppercase tracking-wide">
        {concept.title}
      </h3>
      <p className="text-sm text-slate-700 leading-relaxed">
        {active ? displayed : ""}
        {active && !done && (
          <span className="inline-block w-0.5 h-4 bg-teal-600 ml-0.5 align-text-bottom animate-cursor-blink" />
        )}
      </p>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function Home() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const data = RESULTS.default;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmitted(true);
    setLoading(true);
    setShowResults(false);
    setActiveConceptIndex(0);

    // Simulate AI processing time
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1800);
  };

  // Cascade concept card typewriters
  useEffect(() => {
    if (!showResults) return;
    if (activeConceptIndex >= data.keyConcepts.length - 1) return;
    const timer = setTimeout(() => {
      setActiveConceptIndex((i) => i + 1);
    }, data.keyConcepts[activeConceptIndex].body.length * 8 + 400);
    return () => clearTimeout(timer);
  }, [showResults, activeConceptIndex, data.keyConcepts]);

  const handleReset = () => {
    setQuery("");
    setSubmitted(false);
    setLoading(false);
    setShowResults(false);
    setActiveConceptIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center">
              <svg
                className="w-4.5 h-4.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
            <span className="text-base font-semibold text-slate-900 tracking-tight">
              Pastest <span className="text-teal-600">AI Search</span>
            </span>
          </button>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Prototype
          </span>
        </div>
      </header>

      {/* Hero / Search */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          submitted ? "pt-6" : "pt-24 sm:pt-36"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {!submitted && (
            <div className="text-center mb-8 animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                What do you need to learn?
              </h1>
              <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
                Search any medical condition or topic. Our AI will build a personalised
                study brief with guidelines, key concepts, and practice questions.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <div
              className={`flex items-center rounded-2xl border bg-white shadow-lg transition-all duration-300 ${
                submitted
                  ? "border-slate-200 shadow-sm"
                  : "border-slate-300 shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-teal-400"
              }`}
            >
              <svg
                className="w-5 h-5 text-slate-400 ml-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. diabetic ketoacidosis, heart failure, asthma..."
                className={`flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 px-3 ${
                  submitted ? "py-3 text-sm" : "py-4 text-base"
                }`}
              />
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="mr-2 px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-medium hover:from-teal-700 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Analysing
                  </span>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>

          {!submitted && (
            <div className="flex flex-wrap justify-center gap-2 mt-5 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              {["Diabetic Ketoacidosis", "Heart Failure", "Pneumonia", "Acute Kidney Injury"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion.toLowerCase())}
                    className="px-3.5 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors cursor-pointer border border-teal-200/60"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && <LoadingSkeleton />}

      {/* Results */}
      {showResults && (
        <div
          ref={resultsRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-10"
        >
          {/* Search summary */}
          <div className="animate-fade-in-up text-sm text-slate-500 flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
            AI-generated study brief for <span className="font-semibold text-slate-700">&ldquo;{query}&rdquo;</span>
          </div>

          {/* 1. Key Concepts */}
          <Section title="Key Concepts" icon={
            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          } delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.keyConcepts.map((concept, i) => (
                <ConceptCard
                  key={i}
                  concept={concept}
                  index={i}
                  active={i <= activeConceptIndex}
                />
              ))}
            </div>
          </Section>

          {/* 2. NICE Highlights */}
          <Section title="NICE Highlights" icon={
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          } delay={150}>
            <div className="space-y-4">
              {data.niceHighlights.map((nh, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100 + 200}ms` }}
                >
                  <h3 className="text-sm font-semibold text-blue-800 mb-3">
                    {nh.guideline}
                  </h3>
                  <ul className="space-y-2">
                    {nh.points.map((point, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-slate-700">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* 3. Pastest Content */}
          <Section title="Pastest Questions & Resources" icon={
            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          } delay={300}>
            <div className="space-y-3">
              {data.pastestContent.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:border-violet-200 hover:shadow-sm transition-all cursor-pointer group animate-fade-in-up"
                  style={{ animationDelay: `${i * 80 + 350}ms` }}
                >
                  <span
                    className={`shrink-0 mt-0.5 px-2 py-0.5 text-[11px] font-bold rounded-md uppercase tracking-wider ${
                      item.type === "SBA"
                        ? "bg-violet-100 text-violet-700"
                        : item.type === "EMQ"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 group-hover:text-violet-700 transition-colors leading-snug">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{item.meta}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-violet-400 mt-1 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              ))}
            </div>
          </Section>

          {/* 4. Suggested Learning Path */}
          <Section title="Suggested Learning Path" icon={
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          } delay={450}>
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-[23px] top-12 bottom-12 w-0.5 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-300 hidden sm:block" />

              <div className="space-y-4">
                {data.learningPath.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start animate-fade-in-up"
                    style={{ animationDelay: `${i * 120 + 500}ms` }}
                  >
                    <div className="relative z-10 shrink-0 w-[47px] h-[47px] rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-base shadow-md">
                      {step.step}
                    </div>
                    <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5">
                      <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Footer CTA */}
          <div className="animate-fade-in-up text-center pt-4" style={{ animationDelay: "700ms" }}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg cursor-pointer hover:from-teal-700 hover:to-emerald-700 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              Start Learning Path
            </div>
            <p className="text-xs text-slate-400 mt-3">
              This is a prototype. Content is illustrative and not clinically validated.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
