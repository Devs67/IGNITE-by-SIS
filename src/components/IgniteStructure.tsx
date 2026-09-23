import { Gamepad2, Smartphone, Cog, Box, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

interface IgniteStructureProps {
  onSelectPathway?: (pathwayId: string) => void;
}

export default function IgniteStructure({ onSelectPathway }: IgniteStructureProps) {
  const { pathways } = IGNITE_DATA;

  const getPathwayIcon = (id: string) => {
    switch (id) {
      case 'junior-hackathon':
        return <Gamepad2 className="w-9 h-9 stroke-[2]" />;
      case 'senior-hackathon':
        return <Smartphone className="w-9 h-9 stroke-[2]" />;
      case 'junior-makeathon':
        return <Cog className="w-9 h-9 stroke-[2]" />;
      case 'senior-makeathon':
        return <Box className="w-9 h-9 stroke-[2]" />;
      default:
        return <Box className="w-9 h-9 stroke-[2]" />;
    }
  };

  const getCardTheme = (index: number) => {
    switch (index) {
      case 0:
        return {
          iconBox: 'bg-[#0b302e]/10 text-[#0b302e] border-[#0b302e]/30',
          badge: 'bg-[#0b302e] text-[#f4f0e8]',
          glow: 'group-hover:border-[#0b302e]',
        };
      case 1:
        return {
          iconBox: 'bg-[#0b302e]/10 text-[#0b302e] border-[#0b302e]/30',
          badge: 'bg-[#0b302e] text-[#f4f0e8]',
          glow: 'group-hover:border-[#0b302e]',
        };
      case 2:
        return {
          iconBox: 'bg-[#f28c28]/15 text-[#f28c28] border-[#f28c28]/40',
          badge: 'bg-[#f28c28] text-[#172220]',
          glow: 'group-hover:border-[#f28c28]',
        };
      case 3:
      default:
        return {
          iconBox: 'bg-[#f28c28]/15 text-[#f28c28] border-[#f28c28]/40',
          badge: 'bg-[#f28c28] text-[#172220]',
          glow: 'group-hover:border-[#f28c28]',
        };
    }
  };

  return (
    <section id="structure" className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220] overflow-hidden">
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
            <span>Page 04 · Architecture</span>
          </motion.span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            IGNITE Structure
          </h2>
          <p className="text-base sm:text-xl text-[#0b302e]/80 mt-3 font-medium">
            Four challenge pathways. One spirit of innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {pathways.map((pathway, idx) => {
            const theme = getCardTheme(idx);
            return (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group p-6 sm:p-7 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] hover:shadow-[12px_12px_0px_#0b302e] transition-all duration-300 flex flex-col justify-between ${theme.glow}`}
              >
                <div>
                  {/* Floating Animated Icon */}
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-18 h-18 rounded-2xl ${theme.iconBox} border-2 flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {getPathwayIcon(pathway.id)}
                  </motion.div>

                  <div className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-mono font-black uppercase tracking-wider mb-2.5 ${theme.badge}`}>
                      {pathway.division} {pathway.type}
                    </span>
                    <h3 className="text-xl font-display font-black text-[#0b302e] mb-1.5 leading-snug">
                      {pathway.subtitle}
                    </h3>
                    <p className="text-xs font-mono text-[#0b302e]/70 font-bold mb-4">
                      ({pathway.tools})
                    </p>
                    <span className="inline-block text-[11px] font-mono px-3 py-1 rounded-md bg-[#f4f0e8] border border-[#0b302e]/20 text-[#0b302e] font-bold">
                      Grade: {pathway.gradeLevel}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-[#0b302e]/10 mt-6 text-center">
                  <a
                    href="#challenges"
                    onClick={() => onSelectPathway?.(pathway.id)}
                    className="inline-flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider text-[#0b302e] group-hover:text-[#f28c28] transition-colors"
                  >
                    <span>View Challenge Guide</span>
                    <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
