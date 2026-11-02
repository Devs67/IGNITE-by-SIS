import { Fragment, useState } from 'react';
import { Link } from 'react-router';
import { Bot, OctagonAlert } from 'lucide-react';
import { RUBRICS, RUBRIC_LEVELS } from '../data/rubrics';

// Level colours, 4 (Excellent) to 1 (Beginning), matching the printed rubric sheets
const LEVEL_STYLES = [
  'bg-[#0b302e] text-[#f4f0e8]',
  'bg-[#2f6b52] text-[#f4f0e8]',
  'bg-[#f28c28] text-[#172220]',
  'bg-[#8a5a14] text-[#f4f0e8]',
];

// Shows **bold** spans from the rubric text
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? <strong key={i} className="font-display font-black text-[#0b302e]">{part}</strong> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}

// Judging rubrics for the four challenges, one tab per challenge
export default function Rubrics() {
  const [activeId, setActiveId] = useState(RUBRICS[0].id);
  const rubric = RUBRICS.find((r) => r.id === activeId) ?? RUBRICS[0];
  const hasAiCriterion = rubric.criteria.some((c) => c.title === 'AI Usage Policy');

  return (
    <section id="rubrics" className="py-24 sm:py-32 relative bg-[#f4f0e8] text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title and challenge tabs */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            Judging Rubrics
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">
            How the judges score every team, criterion by criterion.
          </p>

          <div role="tablist" aria-label="Challenge" className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-[#faf8f3] border-3 border-[#0b302e] mt-8 shadow-[4px_4px_0px_#0b302e]">
            {RUBRICS.map((r) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={r.id === activeId}
                onClick={() => setActiveId(r.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-display text-xs sm:text-sm font-black transition-all ${
                  r.id === activeId ? 'bg-[#0b302e] text-[#f4f0e8] shadow-md' : 'text-[#0b302e] hover:text-[#c2410c]'
                }`}
              >
                {r.title}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header band */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b302e] text-[#f4f0e8] border-3 border-[#0b302e] shadow-[6px_6px_0px_#f28c28] flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">{rubric.title}</h3>
              <p className="text-sm font-semibold text-[#f4f0e8]/80 mt-1">{rubric.subtitle}</p>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest font-black text-[#f6a44e]">
              {rubric.criteria.length} criteria · out of {rubric.criteria.length * 4}
            </span>
          </div>

          {/* Disclaimer, when the challenge has one */}
          {rubric.disclaimer && (
            <p role="note" className="flex items-start gap-3 p-4 sm:px-6 rounded-2xl bg-[#b91c1c] text-[#faf8f3] text-sm sm:text-base font-semibold shadow-[4px_4px_0px_#0b302e]">
              <OctagonAlert className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="font-display font-black uppercase tracking-wide mr-1.5">Disclaimer:</strong>
                {rubric.disclaimer}
              </span>
            </p>
          )}

          {/* Statement of inquiry / theme, and directions / challenge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rubric.context.map((c) => (
              <div key={c.label} className="p-5 sm:p-6 rounded-2xl bg-[#f28c28]/10 border-2 border-[#f28c28]/40">
                <span className="font-mono text-[11px] uppercase tracking-widest font-black text-[#9a3412]">{c.label}</span>
                <p className="mt-2 text-sm sm:text-base font-medium text-[#0b302e]/85 leading-relaxed">
                  <Rich text={c.text} />
                </p>
              </div>
            ))}
          </div>

          {/* Rubric table (tablet and up) */}
          <div className="hidden md:block rounded-3xl border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] overflow-hidden bg-[#faf8f3]">
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] p-3 text-left font-display font-black uppercase tracking-wide bg-[#172220] text-[#f4f0e8]">Criteria</th>
                  {RUBRIC_LEVELS.map((level, i) => (
                    <th key={level} scope="col" className={`p-3 font-display font-black uppercase tracking-wide ${LEVEL_STYLES[i]}`}>{level}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rubric.criteria.map((c, idx) => (
                  <tr key={c.title} className="border-t-2 border-[#0b302e]/10 align-top">
                    <th scope="row" className="p-3 text-left bg-[#f28c28]/10">
                      <span className="block font-display font-black text-[#0b302e]">{idx + 1}. {c.title}</span>
                      <span className="block mt-0.5 text-xs italic font-semibold text-[#9a3412]">{c.question}</span>
                    </th>
                    {c.levels.map((text, i) => (
                      <td key={i} className="p-3 font-medium text-[#0b302e]/85 leading-snug border-l-2 border-[#0b302e]/10">
                        <Rich text={text} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rubric cards (phones) */}
          <div className="md:hidden space-y-4">
            {rubric.criteria.map((c, idx) => (
              <div key={c.title} className="p-5 rounded-2xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[4px_4px_0px_#0b302e]">
                <h4 className="font-display text-lg font-black text-[#0b302e]">{idx + 1}. {c.title}</h4>
                <p className="text-xs italic font-semibold text-[#9a3412]">{c.question}</p>
                <dl className="mt-4 space-y-3">
                  {c.levels.map((text, i) => (
                    <div key={i}>
                      <dt className={`inline-block px-2.5 py-0.5 rounded-lg font-display text-[11px] font-black uppercase tracking-wide ${LEVEL_STYLES[i]}`}>
                        {RUBRIC_LEVELS[i]}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-[#0b302e]/85 leading-snug">
                        <Rich text={text} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* How to judge and grade bands */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#faf8f3] border-2 border-[#f28c28]/60">
              <h4 className="font-display text-base font-black uppercase text-[#0b302e]">How to judge</h4>
              <ol className="mt-3 space-y-2 text-sm font-medium text-[#0b302e]/85">
                {rubric.howToJudge.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-display font-black text-[#c2410c]">{i + 1}.</span>
                    <span><Rich text={step} /></span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-[#faf8f3] border-2 border-[#f28c28]/60">
              <h4 className="font-display text-base font-black uppercase text-[#0b302e]">
                Grade bands <span className="text-[#0b302e]/70">(out of {rubric.criteria.length * 4})</span>
              </h4>
              <ul className="mt-3 space-y-2">
                {rubric.bands.map((band, i) => (
                  <li key={band.label} className="flex items-center gap-3">
                    <span className={`w-16 py-1 rounded-lg text-center font-display text-sm font-black ${LEVEL_STYLES[i]}`}>{band.range}</span>
                    <span className="font-display font-black text-[#0b302e]">{band.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {hasAiCriterion && (
            <Link
              to="/ai-policy"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0b302e] underline decoration-[#f28c28] decoration-2 underline-offset-4 hover:text-[#c2410c]"
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
              Read the AI Usage Policy behind criterion 6
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
