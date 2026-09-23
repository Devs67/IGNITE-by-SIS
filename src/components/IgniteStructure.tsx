import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import IgniteFlowChart from './IgniteFlowChart';

interface IgniteStructureProps {
  onSelectPathway: (pathwayId: string) => void;
}

export default function IgniteStructure({ onSelectPathway }: IgniteStructureProps) {
  return (
    <section id="structure" className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220] overflow-clip">
      {/* Subtle geometric circles in background */}
      <div className="absolute -top-32 right-10 w-80 h-80 rounded-full border-[30px] border-[#8fb9aa]/20 pointer-events-none -z-0" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 rounded-full border-[40px] border-[#f28c28]/10 pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f28c28]/15 border border-[#f28c28]/30 font-mono text-xs uppercase tracking-widest text-[#c2410c] font-bold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture</span>
          </motion.span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            IGNITE Structure
          </h2>
          <p className="text-base sm:text-xl text-[#0b302e]/80 mt-3 font-medium">
            Four challenge pathways. One spirit of innovation.
          </p>
        </div>

        {/* ================= OFFICIAL FLOW CHART HERE ================= */}
        {/* Hierarchy: IGNITE -> Junior & Senior -> Hackathon & Makeathon (Game Dev, Rube Goldberg, App Dev, CAD) */}
        <IgniteFlowChart onSelectPathway={onSelectPathway} />
      </div>
    </section>
  );
}
