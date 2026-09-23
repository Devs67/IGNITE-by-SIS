import React from 'react';
import { motion } from 'motion/react';
import { Flame, Code2, Wrench, Gamepad2, Smartphone, Cog, Box, Sparkles, ChevronDown } from 'lucide-react';

interface IgniteFlowChartProps {
  activePathwayId?: string | null;
  onSelectNode: (filter: 'all' | 'junior' | 'senior' | 'hackathon' | 'makeathon', pathwayId?: string) => void;
}

export default function IgniteFlowChart({ activePathwayId, onSelectNode }: IgniteFlowChartProps) {
  return (
    <div className="w-full max-w-5xl mx-auto my-10 p-6 sm:p-10 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[8px_8px_0px_#0b302e] relative overflow-hidden">
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0b302e]/10 border border-[#0b302e]/20 text-[11px] font-mono font-bold text-[#0b302e] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#f28c28]" />
          <span>Interactive Innovation Flow Chart</span>
        </div>
        <p className="text-xs text-[#0b302e]/70 font-mono">
          Click any node below to explore and filter the respective challenge pathway
        </p>
      </div>

      {/* THE TREE STRUCTURE */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* ================= LEVEL 1: ROOT NODE (IGNITE) ================= */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectNode('all')}
          className="cursor-pointer group relative"
        >
          <div className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#0b302e] via-[#0e3f3b] to-[#0b302e] text-white border-2 border-[#0b302e] shadow-[5px_5px_0px_#f28c28] group-hover:shadow-[7px_7px_0px_#f28c28] transition-all flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f28c28] to-[#e26f1e] text-[#172220] flex items-center justify-center shadow-xs">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xs font-black tracking-widest text-[#f6a44e] uppercase">
                  SREENIDHI
                </span>
                <span className="h-1 w-4 bg-[#f28c28] rounded-full" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                IGNITE
              </h3>
            </div>
            <span className="hidden sm:inline-block ml-3 px-2 py-0.5 rounded-md bg-white/15 text-[10px] font-mono font-bold text-white/90">
              2026-27
            </span>
          </div>
        </motion.div>

        {/* Stem 1: Connecting Root to Level 2 (Desktop SVG Tree / Mobile Lines) */}
        <div className="w-full flex justify-center py-2 relative">
          <svg className="w-full max-w-2xl h-12 hidden md:block" viewBox="0 0 600 48" fill="none">
            {/* Center vertical stem down */}
            <path d="M 300 0 L 300 24" stroke="#0b302e" strokeWidth="3" strokeLinecap="round" />
            {/* Horizontal split bar */}
            <path d="M 150 24 L 450 24" stroke="#0b302e" strokeWidth="3" strokeLinecap="round" />
            {/* Left drop to Junior */}
            <path d="M 150 24 L 150 48" stroke="#0b302e" strokeWidth="3" strokeLinecap="round" />
            {/* Right drop to Senior */}
            <path d="M 450 24 L 450 48" stroke="#0b302e" strokeWidth="3" strokeLinecap="round" />
            {/* Center marker dot */}
            <circle cx="300" cy="24" r="4" fill="#f28c28" />
          </svg>
          <div className="w-0.5 h-6 bg-[#0b302e] md:hidden" />
        </div>

        {/* ================= LEVEL 2: 2 SECTIONS (JUNIOR & SENIOR) ================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl">
          
          {/* ----- LEFT BRANCH: JUNIOR ----- */}
          <div className="flex flex-col items-center">
            {/* Junior Section Node */}
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectNode('junior')}
              className="cursor-pointer group w-full sm:w-auto"
            >
              <div className="px-6 py-3 rounded-2xl bg-[#0b302e] text-white border-2 border-[#0b302e] shadow-[4px_4px_0px_#0b302e] group-hover:shadow-[6px_6px_0px_#0b302e] transition-all flex items-center justify-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8fb9aa] animate-ping" />
                <div className="text-center sm:text-left">
                  <div className="font-display text-lg font-black tracking-tight leading-tight">
                    JUNIOR
                  </div>
                  <div className="text-[10px] font-mono text-[#8fb9aa] font-bold">
                    Grade: MYP 1–3
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connecting lines from Junior to its 2 themes */}
            <div className="w-full flex justify-center py-2 relative">
              <svg className="w-full max-w-[280px] h-10 hidden sm:block" viewBox="0 0 280 40" fill="none">
                <path d="M 140 0 L 140 20" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 70 20 L 210 20" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 70 20 L 70 40" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 210 20 L 210 40" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="140" cy="20" r="3.5" fill="#0b302e" />
              </svg>
              <div className="w-0.5 h-4 bg-[#0b302e] sm:hidden" />
            </div>

            {/* LEVEL 3: In Junior, 2 Themes (Hackathon & Makeathon) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Junior Theme 1: Hackathon */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectNode('hackathon', 'junior-hackathon')}
                className={`p-3.5 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between text-left ${
                  activePathwayId === 'junior-hackathon'
                    ? 'bg-[#0b302e] text-white border-[#0b302e] shadow-[4px_4px_0px_#f28c28]'
                    : 'bg-white hover:bg-[#faf8f3] text-[#0b302e] border-[#0b302e]/25 hover:border-[#0b302e] shadow-xs hover:shadow-[4px_4px_0px_#0b302e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider bg-[#0b302e]/10 text-[#0b302e] dark:bg-white/20 dark:text-white">
                      Theme 1 · Hackathon
                    </span>
                    <Code2 className="w-3.5 h-3.5 text-[#f28c28]" />
                  </div>
                  <h4 className="font-display text-sm font-black tracking-tight leading-snug">
                    Game Development
                  </h4>
                  <p className="text-[10.5px] font-mono text-current/75 font-semibold mt-0.5">
                    Scratch / code.org
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-current/15 flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-[#f28c28]">MYP 1–3</span>
                  <span className="underline">View Guide →</span>
                </div>
              </motion.div>

              {/* Junior Theme 2: Makeathon */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectNode('makeathon', 'junior-makeathon')}
                className={`p-3.5 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between text-left ${
                  activePathwayId === 'junior-makeathon'
                    ? 'bg-[#f28c28] text-[#172220] border-[#0b302e] shadow-[4px_4px_0px_#0b302e]'
                    : 'bg-white hover:bg-[#faf8f3] text-[#0b302e] border-[#0b302e]/25 hover:border-[#0b302e] shadow-xs hover:shadow-[4px_4px_0px_#0b302e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider bg-[#f28c28]/20 text-[#c2410c]">
                      Theme 2 · Makeathon
                    </span>
                    <Wrench className="w-3.5 h-3.5 text-[#0b302e]" />
                  </div>
                  <h4 className="font-display text-sm font-black tracking-tight leading-snug">
                    Rube Goldberg Machine
                  </h4>
                  <p className="text-[10.5px] font-mono text-current/75 font-semibold mt-0.5">
                    Recycled Materials
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-current/15 flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-[#c2410c]">MYP 1–3</span>
                  <span className="underline">View Guide →</span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ----- RIGHT BRANCH: SENIOR ----- */}
          <div className="flex flex-col items-center">
            {/* Senior Section Node */}
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectNode('senior')}
              className="cursor-pointer group w-full sm:w-auto"
            >
              <div className="px-6 py-3 rounded-2xl bg-[#e26f1e] text-[#172220] border-2 border-[#0b302e] shadow-[4px_4px_0px_#0b302e] group-hover:shadow-[6px_6px_0px_#0b302e] transition-all flex items-center justify-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#172220] animate-ping" />
                <div className="text-center sm:text-left">
                  <div className="font-display text-lg font-black tracking-tight leading-tight">
                    SENIOR
                  </div>
                  <div className="text-[10px] font-mono text-[#172220]/80 font-bold">
                    Grade: MYP 4–DP 2
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connecting lines from Senior to its 2 themes */}
            <div className="w-full flex justify-center py-2 relative">
              <svg className="w-full max-w-[280px] h-10 hidden sm:block" viewBox="0 0 280 40" fill="none">
                <path d="M 140 0 L 140 20" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 70 20 L 210 20" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 70 20 L 70 40" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 210 20 L 210 40" stroke="#0b302e" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="140" cy="20" r="3.5" fill="#e26f1e" />
              </svg>
              <div className="w-0.5 h-4 bg-[#0b302e] sm:hidden" />
            </div>

            {/* LEVEL 3: In Senior, 2 Themes (Hackathon & Makeathon) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Senior Theme 1: Hackathon */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectNode('hackathon', 'senior-hackathon')}
                className={`p-3.5 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between text-left ${
                  activePathwayId === 'senior-hackathon'
                    ? 'bg-[#0b302e] text-white border-[#0b302e] shadow-[4px_4px_0px_#f28c28]'
                    : 'bg-white hover:bg-[#faf8f3] text-[#0b302e] border-[#0b302e]/25 hover:border-[#0b302e] shadow-xs hover:shadow-[4px_4px_0px_#0b302e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider bg-[#0b302e]/10 text-[#0b302e] dark:bg-white/20 dark:text-white">
                      Theme 1 · Hackathon
                    </span>
                    <Smartphone className="w-3.5 h-3.5 text-[#f28c28]" />
                  </div>
                  <h4 className="font-display text-sm font-black tracking-tight leading-snug">
                    App Development
                  </h4>
                  <p className="text-[10.5px] font-mono text-current/75 font-semibold mt-0.5">
                    Mobile &amp; Web Systems
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-current/15 flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-[#f28c28]">MYP 4–DP 2</span>
                  <span className="underline">View Guide →</span>
                </div>
              </motion.div>

              {/* Senior Theme 2: Makeathon */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectNode('makeathon', 'senior-makeathon')}
                className={`p-3.5 rounded-2xl cursor-pointer border-2 transition-all flex flex-col justify-between text-left ${
                  activePathwayId === 'senior-makeathon'
                    ? 'bg-[#f28c28] text-[#172220] border-[#0b302e] shadow-[4px_4px_0px_#0b302e]'
                    : 'bg-white hover:bg-[#faf8f3] text-[#0b302e] border-[#0b302e]/25 hover:border-[#0b302e] shadow-xs hover:shadow-[4px_4px_0px_#0b302e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider bg-[#f28c28]/20 text-[#c2410c]">
                      Theme 2 · Makeathon
                    </span>
                    <Box className="w-3.5 h-3.5 text-[#0b302e]" />
                  </div>
                  <h4 className="font-display text-sm font-black tracking-tight leading-snug">
                    CAD Design
                  </h4>
                  <p className="text-[10.5px] font-mono text-current/75 font-semibold mt-0.5">
                    Fusion 360 / SketchUp
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-current/15 flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-[#c2410c]">MYP 4–DP 2</span>
                  <span className="underline">View Guide →</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
