import { CircleCheck, CircleX, Layers, OctagonAlert } from 'lucide-react';
import { AI_POLICY, type PolicyBlock } from '../data/aiPolicy';

// Prohibited rules stand out (red border and shadow); permitted ones stay quiet
const RULE_STYLES = {
  permitted: { box: 'bg-[#faf8f3] border-2 border-[#0b302e]/10', title: 'text-base', icon: <CircleCheck className="w-4 h-4 text-[#047857]" aria-hidden="true" />, bullet: 'text-[#047857]' },
  prohibited: { box: 'bg-[#dc2626]/[0.07] border-3 border-[#b91c1c] shadow-[4px_4px_0px_#b91c1c]', title: 'text-lg', icon: <CircleX className="w-5 h-5 text-[#b91c1c]" aria-hidden="true" />, bullet: 'text-[#b91c1c]' },
  category: { box: 'bg-[#faf8f3] border-2 border-[#0b302e]/20', title: 'text-lg', icon: <Layers className="w-5 h-5 text-[#c2410c]" aria-hidden="true" />, bullet: 'text-[#c2410c]' },
};

function Bullets({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true" className={`mt-[9px] w-1.5 h-1.5 rounded-full bg-current shrink-0 ${className}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  switch (block.kind) {
    case 'text':
      return <p>{block.text}</p>;

    case 'clause':
      return (
        <div className="flex gap-4">
          <span className="w-10 shrink-0 font-mono text-sm font-bold text-[#c2410c] pt-0.5">{block.num}</span>
          <div className="min-w-0">
            <p>
              {block.lead && <strong className="font-display font-black text-[#c2410c]">{block.lead} </strong>}
              {block.text}
            </p>
            {block.list && <Bullets items={block.list} className="text-[#c2410c]" />}
          </div>
        </div>
      );

    case 'rule': {
      const style = RULE_STYLES[block.tone];
      return (
        <div className={`p-5 sm:p-6 rounded-2xl ${style.box}`}>
          <h4 className={`flex items-start gap-2.5 font-display font-black text-[#0b302e] leading-snug ${style.title}`}>
            <span className="mt-0.5 shrink-0">{style.icon}</span>
            <span>
              <span className="text-[#c2410c] mr-1.5">{block.num}</span>
              {block.title}
            </span>
          </h4>
          {block.meta && <p className="mt-2 font-display font-bold text-[#0b302e]">{block.meta}</p>}
          {block.paragraphs?.map((p) => <p key={p} className="mt-2">{p}</p>)}
          {block.listLabel && (
            <p className={`mt-3 font-bold ${block.tone === 'category' ? 'font-display text-[#c2410c]' : ''}`}>{block.listLabel}</p>
          )}
          {block.list && <Bullets items={block.list} className={style.bullet} />}
          {block.notes?.map((note) => <p key={note} className="mt-3 italic">{note}</p>)}
        </div>
      );
    }

    case 'list':
      return (
        <div>
          <p>{block.intro}</p>
          <Bullets items={block.items} className="text-[#c2410c]" />
        </div>
      );

    case 'callout':
      if (block.tone === 'warning') {
        return (
          <p role="note" className="flex gap-3 p-5 sm:p-6 rounded-2xl bg-[#b91c1c] text-[#faf8f3] font-semibold shadow-[4px_4px_0px_#0b302e]">
            <OctagonAlert className="w-6 h-6 shrink-0" aria-hidden="true" />
            <span>
              {block.lead && <strong className="block font-display text-lg font-black">{block.lead}</strong>}
              {block.text}
            </span>
          </p>
        );
      }
      return (
        <p className="p-5 sm:p-6 rounded-2xl bg-[#f28c28]/10 border-2 border-[#f28c28]/50 font-semibold text-[#0b302e]">
          {block.text}
        </p>
      );
  }
}

// The AI Usage Policy as a readable page, with a contents list that jumps to each section
export default function AiPolicy() {
  const { title, applicableTo, issuedBy, sections } = AI_POLICY;

  return (
    <section id="ai-policy" className="py-24 sm:py-32 relative bg-[#f4f0e8] text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest font-black text-[#c2410c]">
            IGNITE 2026–27 · Hackathon and Makeathon
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            AI Usage Policy
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">{title}</p>
          <dl className="mt-6 inline-grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-left sm:text-center">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest font-black text-[#9a3412]">Applicable to</dt>
              <dd className="font-bold text-[#0b302e]">{applicableTo}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest font-black text-[#9a3412]">Issued by</dt>
              <dd className="font-bold text-[#0b302e]">{issuedBy[0]}</dd>
            </div>
          </dl>

          {/* Headline rule, linking to the prohibited-use section */}
          <a
            href="#policy-4"
            className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-[#b91c1c] text-[#faf8f3] text-left shadow-[4px_4px_0px_#0b302e] hover:shadow-[6px_6px_0px_#f28c28] transition-shadow"
          >
            <OctagonAlert className="w-6 h-6 shrink-0" aria-hidden="true" />
            <span className="text-sm sm:text-base font-semibold">
              <strong className="font-display font-black">Most AI platforms will not be allowed.</strong>{' '}
              See what is prohibited, and the few ways AI may be used.
            </span>
          </a>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">
          {/* Contents */}
          <nav aria-label="Policy contents" className="lg:sticky lg:top-28 p-5 rounded-2xl bg-[#faf8f3] border-2 border-[#0b302e]/15">
            <span className="font-mono text-[11px] uppercase tracking-widest font-black text-[#0b302e]/80">Contents</span>
            <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-1.5 text-sm">
              {sections.map((s) => (
                <li key={s.num}>
                  <a href={`#policy-${s.num}`} className="flex gap-2 font-semibold text-[#0b302e] hover:text-[#c2410c]">
                    <span className="w-5 shrink-0 font-mono text-xs font-bold text-[#c2410c] pt-0.5">{s.num}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="min-w-0 p-6 sm:p-10 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] space-y-12">
            {sections.map((s) => (
              <article key={s.num} id={`policy-${s.num}`} className="scroll-mt-28">
                <h3 className="flex items-center gap-3 pb-3 mb-5 border-b-2 border-[#c2410c]/30 font-display text-xl sm:text-2xl font-black uppercase text-[#0b302e] tracking-tight">
                  <span className="w-9 h-9 shrink-0 rounded-full bg-[#c2410c] text-[#faf8f3] text-base flex items-center justify-center">
                    {s.num}
                  </span>
                  {s.title}
                </h3>
                <div className="space-y-4 text-[15px] leading-relaxed font-medium text-[#0b302e]/85">
                  {s.blocks.map((block, idx) => <Block key={idx} block={block} />)}
                </div>
              </article>
            ))}

            <div className="pt-6 border-t-2 border-[#0b302e]/10 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest font-black text-[#9a3412]">Issued by</span>
              {issuedBy.map((line) => (
                <p key={line} className="font-bold text-[#0b302e]">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
