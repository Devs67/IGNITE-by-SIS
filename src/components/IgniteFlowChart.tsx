import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Code2, Wrench, Smartphone, Box, X } from 'lucide-react';
import IgniteLogo from './IgniteLogo';
import { IGNITE_DATA } from '../data/igniteData';

type Division = 'Junior' | 'Senior';
type Selection = { kind: 'leaf'; id: string } | { kind: 'division'; division: Division } | null;

interface IgniteFlowChartProps {
  onSelectPathway: (pathwayId: string) => void;
}

// Width the tree is laid out at; narrower screens scale it down to fit
const TREE_WIDTH = 896;
const LINE = '#0b302e';

// Short tile labels and icons for each challenge (full details come from IGNITE_DATA)
const TILES: Record<string, { short: string; icon: ReactNode; theme: string }> = {
  'junior-hackathon': { short: 'Scratch / code.org', icon: <Code2 className="w-3.5 h-3.5 text-[#f28c28]" />, theme: 'Theme 1 · Hackathon' },
  'junior-makeathon': { short: 'Recycled Materials', icon: <Wrench className="w-3.5 h-3.5 text-[#0b302e]" />, theme: 'Theme 2 · Makeathon' },
  'senior-hackathon': { short: 'Mobile & Web Systems', icon: <Smartphone className="w-3.5 h-3.5 text-[#f28c28]" />, theme: 'Theme 1 · Hackathon' },
  'senior-makeathon': { short: 'Fusion 360 / SketchUp', icon: <Box className="w-3.5 h-3.5 text-[#0b302e]" />, theme: 'Theme 2 · Makeathon' },
};

// Connector between one parent (centred above) and two children laid out in a
// 2-column grid with the given gap. Lines run edge to edge, so they always meet
// the boxes above and below.
function Branch({ gap, dot = LINE, thickness = 3 }: { gap: string; dot?: string; thickness?: number }) {
  const inset = `calc((100% - ${gap}) / 4)`; // centre of each grid column
  return (
    <div className="relative w-full h-10" aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-1/2 -translate-x-1/2" style={{ width: thickness, background: LINE }} />
      <span className="absolute top-1/2 -translate-y-1/2" style={{ left: inset, right: inset, height: thickness, background: LINE }} />
      <span className="absolute top-1/2 bottom-0 -translate-x-1/2" style={{ left: inset, width: thickness, background: LINE }} />
      <span className="absolute top-1/2 bottom-0 translate-x-1/2" style={{ right: inset, width: thickness, background: LINE }} />
      <span className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: dot }} />
    </div>
  );
}

export default function IgniteFlowChart({ onSelectPathway }: IgniteFlowChartProps) {
  const { pathways } = IGNITE_DATA;
  const [selection, setSelection] = useState<Selection>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [scale, setScale] = useState(1);
  const [treeHeight, setTreeHeight] = useState<number | undefined>(undefined);
  const [link, setLink] = useState<{ x: number; top: number; height: number } | null>(null);

  const selectedLeaf = selection?.kind === 'leaf' ? pathways.find((p) => p.id === selection.id) : undefined;
  const activeDivision: Division | null =
    selection?.kind === 'division' ? selection.division : selectedLeaf ? (selectedLeaf.division as Division) : null;

  // Scale the tree down on narrow screens so the whole chart stays visible
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      const s = Math.min(1, outer.clientWidth / TREE_WIDTH);
      setScale(s);
      setTreeHeight(inner.offsetHeight * s);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  // Line from the selected tile down to its details panel
  useLayoutEffect(() => {
    const card = cardRef.current;
    const panel = panelRef.current;
    const tile = selectedLeaf ? tileRefs.current[selectedLeaf.id] : null;
    if (!card || !panel || !tile) {
      setLink(null);
      return;
    }
    const measure = () => {
      const c = card.getBoundingClientRect();
      const t = tile.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      setLink({ x: t.left + t.width / 2 - c.left, top: t.bottom - c.top, height: Math.max(0, p.top - t.bottom) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    return () => observer.disconnect();
  }, [selectedLeaf, scale]);

  const selectLeaf = (id: string) => {
    setSelection((cur) => (cur?.kind === 'leaf' && cur.id === id ? null : { kind: 'leaf', id }));
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
  };

  const selectDivision = (division: Division) =>
    setSelection((cur) => (cur?.kind === 'division' && cur.division === division ? null : { kind: 'division', division }));

  const renderTile = (id: string) => {
    const p = pathways.find((x) => x.id === id)!;
    const t = TILES[id];
    const isHack = p.type === 'Hackathon';
    const isOpen = selectedLeaf?.id === id;
    const dimmed = activeDivision !== null && activeDivision !== p.division;
    return (
      <motion.div
        key={id}
        ref={(el) => {
          tileRefs.current[id] = el;
        }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => selectLeaf(id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectLeaf(id);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        className={`p-3.5 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between text-left ${
          dimmed ? 'opacity-40' : ''
        } ${
          isOpen
            ? isHack
              ? 'bg-[#0b302e] text-white border-[#0b302e] shadow-[4px_4px_0px_#f28c28]'
              : 'bg-[#f28c28] text-[#172220] border-[#0b302e] shadow-[4px_4px_0px_#0b302e]'
            : 'bg-white hover:bg-[#faf8f3] text-[#0b302e] border-[#0b302e]/25 hover:border-[#0b302e] shadow-xs hover:shadow-[4px_4px_0px_#0b302e]'
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span
              className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider ${
                isHack
                  ? isOpen ? 'bg-white/20 text-white' : 'bg-[#0b302e]/10 text-[#0b302e]'
                  : isOpen ? 'bg-[#0b302e]/15 text-[#0b302e]' : 'bg-[#f28c28]/20 text-[#9a3412]'
              }`}
            >
              {t.theme}
            </span>
            {t.icon}
          </div>
          <h3 className="font-display text-sm font-black tracking-tight leading-snug">{p.subtitle}</h3>
          <p className="text-[10.5px] font-mono text-current/75 font-semibold mt-0.5">{t.short}</p>
        </div>
        <div className="mt-2.5 pt-2 border-t border-current/15 flex items-center justify-between text-[10px] font-mono font-bold">
          <span className={isOpen ? (isHack ? 'text-[#f28c28]' : 'text-[#0b302e]') : 'text-[#c2410c]'}>{p.gradeLevel}</span>
          <span className="underline">{isOpen ? 'Hide Guide ↑' : 'View Guide ↓'}</span>
        </div>
      </motion.div>
    );
  };

  const renderDivision = (division: Division) => {
    const isJunior = division === 'Junior';
    const dimmed = activeDivision !== null && activeDivision !== division;
    return (
      <motion.div
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => selectDivision(division)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectDivision(division);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={selection?.kind === 'division' && selection.division === division}
        className={`cursor-pointer group w-auto transition-opacity ${dimmed ? 'opacity-40' : ''}`}
      >
        <div
          className={`px-6 py-3 rounded-2xl border-2 border-[#0b302e] shadow-[4px_4px_0px_#0b302e] group-hover:shadow-[6px_6px_0px_#0b302e] transition-all flex items-center justify-center gap-3 ${
            isJunior ? 'bg-[#0b302e] text-white' : 'bg-[#e26f1e] text-[#172220]'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isJunior ? 'bg-[#8fb9aa]' : 'bg-[#172220]'}`} />
          <div className="text-left">
            <div className="font-display text-lg font-black tracking-tight leading-tight">{division.toUpperCase()}</div>
            <div className={`text-[10px] font-mono font-bold ${isJunior ? 'text-[#8fb9aa]' : 'text-[#172220]/80'}`}>
              Grade: {isJunior ? 'MYP 1–3' : 'MYP 4–DP 2'}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      ref={cardRef}
      className="w-full max-w-5xl mx-auto my-10 p-4 sm:p-10 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[8px_8px_0px_#0b302e] relative overflow-hidden"
    >
      {/* Decorative background grid and glow */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0b302e 1px, transparent 1px), linear-gradient(90deg, #0b302e 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-0 right-1/4 w-80 h-40 bg-[#f28c28]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Flow Chart Header Badge */}
      <div className="text-center mb-8 relative z-10">
        <p className="text-xs text-[#0b302e]/70 font-mono">
          Click a challenge to open its guide right here
        </p>
      </div>

      {/* THE TREE — laid out at desktop width, then scaled down to fit smaller screens */}
      <div ref={outerRef} className="relative z-10 flex justify-center items-start" style={{ height: treeHeight }}>
        <div
          ref={innerRef}
          className="flex flex-col items-center shrink-0 origin-top"
          style={{ width: TREE_WIDTH, transform: `scale(${scale})` }}
        >
          {/* LEVEL 1: ROOT NODE (IGNITE) */}
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelection(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelection(null);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Show all challenges"
            className="cursor-pointer group relative"
          >
            <div className="px-6 py-3 rounded-2xl bg-[#faf8f3] border-2 border-[#0b302e] shadow-[5px_5px_0px_#f28c28] group-hover:shadow-[7px_7px_0px_#f28c28] transition-all flex items-center gap-4">
              <IgniteLogo variant="horizontal" className="h-16" />
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#0b302e] text-[11px] font-mono font-bold text-[#f4f0e8]">
                2026-27
              </span>
            </div>
          </motion.div>

          {/* LEVEL 2: JUNIOR & SENIOR */}
          <div className="w-full max-w-4xl">
            <Branch gap="3rem" dot="#f28c28" />
            <div className="grid grid-cols-2 gap-12">
              {(['Junior', 'Senior'] as Division[]).map((division) => (
                <div key={division} className="flex flex-col items-center">
                  {renderDivision(division)}
                  {/* LEVEL 3: HACKATHON & MAKEATHON */}
                  <Branch gap="0.875rem" thickness={2.5} dot={division === 'Junior' ? LINE : '#e26f1e'} />
                  <div className="w-full grid grid-cols-2 gap-3.5">
                    {renderTile(`${division.toLowerCase()}-hackathon`)}
                    {renderTile(`${division.toLowerCase()}-makeathon`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Line from the selected tile to its guide */}
      {link && (
        <span
          aria-hidden="true"
          className="absolute z-10 -translate-x-1/2 pointer-events-none"
          style={{ left: link.x, top: link.top, height: link.height, width: 3, background: LINE }}
        />
      )}

      {/* Expanded guide for the selected challenge */}
      {selectedLeaf && (
          <motion.div
            key={selectedLeaf.id}
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 mt-8 rounded-3xl border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] overflow-hidden bg-[#f4f0e8]"
          >
            {/* Header strip */}
            <div
              className={`p-5 sm:p-6 border-b-3 border-[#0b302e] flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedLeaf.type === 'Hackathon'
                  ? 'bg-gradient-to-r from-[#0b302e] to-[#134e4a] text-white'
                  : 'bg-gradient-to-r from-[#ea580c] to-[#f28c28] text-[#172220]'
              }`}
            >
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-wider">
                  {selectedLeaf.division} {selectedLeaf.type}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight">{selectedLeaf.subtitle}</h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-lg bg-black/15 whitespace-nowrap">
                  {selectedLeaf.gradeLevel}
                </span>
                <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-lg bg-white/20">{selectedLeaf.tools}</span>
                <button
                  onClick={() => setSelection(null)}
                  className="p-1.5 rounded-lg bg-black/15 hover:bg-black/25 transition-colors"
                  aria-label="Close guide"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2 p-5 rounded-2xl bg-white border-2 border-[#0b302e]/15 shadow-sm self-start">
                <p className="text-sm sm:text-base font-display font-bold text-[#0b302e] leading-relaxed italic">
                  "{selectedLeaf.quote}"
                </p>
              </div>

              <div className="md:col-span-3 space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#0b302e] font-extrabold block">
                  Core Directions &amp; Criteria:
                </span>
                {selectedLeaf.directions.map((d) => (
                  <div
                    key={d.label}
                    className="p-3.5 rounded-xl bg-white border-2 border-[#0b302e]/10 flex items-start gap-3"
                  >
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-black uppercase shrink-0 mt-0.5 ${
                        selectedLeaf.type === 'Hackathon' ? 'bg-[#0b302e] text-[#f4f0e8]' : 'bg-[#f28c28] text-[#172220]'
                      }`}
                    >
                      {d.label}
                    </span>
                    <p className="text-xs sm:text-sm text-[#0b302e]/90 font-medium leading-relaxed">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 border-t-3 border-[#0b302e]/15 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-mono text-[#0b302e]/70 font-semibold">
                <span>Division: {selectedLeaf.division}</span>
                <span className="mx-2">·</span>
                <span className="text-[#0b302e] font-bold">{selectedLeaf.gradeLevel}</span>
              </div>
              <button
                onClick={() => onSelectPathway(selectedLeaf.id)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs font-black uppercase tracking-wider transition-all shadow-[3px_3px_0px_#0b302e] hover:shadow-[5px_5px_0px_#0b302e] ${
                  selectedLeaf.type === 'Hackathon'
                    ? 'bg-[#0b302e] text-[#f4f0e8] hover:bg-[#134e4a]'
                    : 'bg-[#f28c28] text-[#172220] hover:bg-[#e26f1e]'
                }`}
              >
                <span>Select Pathway</span>
                <span className="font-bold text-sm">→</span>
              </button>
            </div>
          </motion.div>
        )}
    </div>
  );
}
