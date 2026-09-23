import { useRef } from 'react';
import { Quote, ArrowRight, Code2, Wrench, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

export type PathwayFilter = 'all' | 'junior' | 'senior' | 'hackathon' | 'makeathon';

interface ChallengesDetailProps {
  onRegisterPathway?: (pathwayId: string) => void;
  activeFilter: PathwayFilter;
  setActiveFilter: (filter: PathwayFilter) => void;
  highlightedPathwayId: string | null;
  setHighlightedPathwayId: (pathwayId: string | null) => void;
}

export default function ChallengesDetailSection({
  onRegisterPathway,
  activeFilter,
  setActiveFilter,
  highlightedPathwayId,
  setHighlightedPathwayId,
}: ChallengesDetailProps) {
  const { pathways } = IGNITE_DATA;
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredPathways = pathways.filter((p) => {
    if (highlightedPathwayId) {
      // If a specific leaf was clicked, let all cards in that division show or just that card
      if (activeFilter === 'junior') return p.division === 'Junior';
      if (activeFilter === 'senior') return p.division === 'Senior';
      if (activeFilter === 'hackathon') return p.type === 'Hackathon';
      if (activeFilter === 'makeathon') return p.type === 'Makeathon';
      return true;
    }
    if (activeFilter === 'junior') return p.division === 'Junior';
    if (activeFilter === 'senior') return p.division === 'Senior';
    if (activeFilter === 'hackathon') return p.type === 'Hackathon';
    if (activeFilter === 'makeathon') return p.type === 'Makeathon';
    return true;
  });

  return (
    <div id="challenges" className="scroll-mt-28">
        {/* Interactive Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {[
            { id: 'all', label: 'All Pathways (4)' },
            { id: 'junior', label: 'Junior (MYP 1–3)' },
            { id: 'senior', label: 'Senior (MYP 4–DP 2)' },
            { id: 'hackathon', label: 'Hackathon Track' },
            { id: 'makeathon', label: 'Makeathon Track' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id && !highlightedPathwayId;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setHighlightedPathwayId(null);
                  setActiveFilter(tab.id as any);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all duration-200 border-2 ${
                  isActive
                    ? 'bg-[#0b302e] text-[#f4f0e8] border-[#0b302e] shadow-[4px_4px_0px_#f28c28]'
                    : 'bg-[#f4f0e8] text-[#0b302e] border-[#0b302e]/15 hover:border-[#0b302e]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Animated Challenge Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredPathways.map((p) => {
              const isHackathon = p.type === 'Hackathon';
              const isHighlighted = highlightedPathwayId === p.id;

              return (
                <motion.div
                  key={p.id}
                  id={`pathway-card-${p.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className={`rounded-3xl bg-[#faf8f3] border-3 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    isHighlighted
                      ? 'border-[#f28c28] shadow-[10px_10px_0px_#f28c28] ring-4 ring-[#f28c28]/40 scale-[1.01]'
                      : 'border-[#0b302e] shadow-[7px_7px_0px_#0b302e] hover:shadow-[12px_12px_0px_#0b302e]'
                  }`}
                >
                  {/* Pathway Header Strip */}
                  <div
                    className={`p-5 sm:p-6 border-b-3 border-[#0b302e] flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isHackathon
                        ? 'bg-gradient-to-r from-[#0b302e] to-[#134e4a] text-white'
                        : 'bg-gradient-to-r from-[#ea580c] to-[#f28c28] text-[#172220]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-black uppercase tracking-wider">
                          {p.division} {p.type}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight">
                        {p.subtitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-lg bg-black/15 backdrop-blur-xs whitespace-nowrap">
                        {p.gradeLevel}
                      </span>
                      <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-lg bg-white/20 backdrop-blur-xs whitespace-nowrap">
                        {p.tools}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 bg-[#f4f0e8]/50">
                    {/* Guiding Quote Box */}
                    <div className="p-5 rounded-2xl bg-white border-2 border-[#0b302e]/15 shadow-sm relative">
                      <p className="text-sm sm:text-base font-display font-bold text-[#0b302e] leading-relaxed italic pr-6">
                        "{p.quote}"
                      </p>
                    </div>

                    {/* Criteria / Directions Pills */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#0b302e] font-extrabold flex items-center gap-1.5">
                          <span>Core Directions &amp; Criteria:</span>
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {p.directions.map((d, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-white border-2 border-[#0b302e]/10 hover:border-[#0b302e]/40 transition-colors flex items-start gap-3"
                          >
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-mono font-black uppercase shrink-0 mt-0.5 ${
                                isHackathon
                                  ? 'bg-[#0b302e] text-[#f4f0e8]'
                                  : 'bg-[#f28c28] text-[#172220]'
                              }`}
                            >
                              {d.label}
                            </span>
                            <p className="text-xs sm:text-sm text-[#0b302e]/90 font-medium leading-relaxed">
                              {d.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 border-t-3 border-[#0b302e]/15 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs font-mono text-[#0b302e]/70 font-semibold">
                      <span>Division: {p.division}</span>
                      <span className="mx-2">·</span>
                      <span className="text-[#0b302e] font-bold">{p.gradeLevel}</span>
                    </div>

                    <button
                      onClick={() => onRegisterPathway?.(p.id)}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs font-black uppercase tracking-wider transition-all shadow-[3px_3px_0px_#0b302e] hover:shadow-[5px_5px_0px_#0b302e] ${
                        isHackathon
                          ? 'bg-[#0b302e] text-[#f4f0e8] hover:bg-[#134e4a]'
                          : 'bg-[#f28c28] text-[#172220] hover:bg-[#e26f1e]'
                      }`}
                    >
                      <span>Select Pathway</span>
                      <span className="font-bold text-sm">→</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
    </div>
  );
}
