import { useState } from 'react';
import { Target, Mountain, Users, Sparkles, ArrowRight, Zap, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

export default function OverarchingTheme() {
  const { overarchingTheme } = IGNITE_DATA;
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const getPillarDetails = (id: string) => {
    switch (id) {
      case 'engage':
        return {
          icon: Target,
          gradient: 'from-[#0b302e] to-[#134e4a]',
          accentColor: '#8fb9aa',
          borderHover: 'hover:border-[#8fb9aa]',
          tag: 'Curiosity & User Experience',
          focus: 'Intuitive design, immersive mechanics, and spark.',
          example: 'How does your project immediately grip the user and invite them to interact?',
        };
      case 'challenge':
        return {
          icon: Mountain,
          gradient: 'from-[#c2410c] to-[#ea580c]',
          accentColor: '#f28c28',
          borderHover: 'hover:border-[#f28c28]',
          tag: 'Problem-Solving & Depth',
          focus: 'Complex logic, robust engineering, and overcoming hurdles.',
          example: 'What meaningful obstacle or real-world dilemma does your solution tackle?',
        };
      case 'connect':
        return {
          icon: Users,
          gradient: 'from-[#0b302e] to-[#047857]',
          accentColor: '#34d399',
          borderHover: 'hover:border-[#34d399]',
          tag: 'Community & Shared Value',
          focus: 'Social impact, collaboration, and bridging communities.',
          example: 'How does your innovation build bonds and leave an enduring positive footprint?',
        };
      default:
        return {
          icon: Target,
          gradient: 'from-[#0b302e] to-[#134e4a]',
          accentColor: '#8fb9aa',
          borderHover: 'hover:border-[#8fb9aa]',
          tag: 'Innovation',
          focus: 'Creative execution.',
          example: 'Make an impact.',
        };
    }
  };

  return (
    <section id="theme" className="py-24 sm:py-32 relative bg-gradient-to-b from-[#f4f0e8] via-[#faf8f3] to-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220] overflow-hidden">
      {/* Background Animated Geometric Accent Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#8fb9aa]/10 via-[#f28c28]/10 to-[#8fb9aa]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f28c28]/15 border border-[#f28c28]/30 font-mono text-xs uppercase tracking-widest text-[#c2410c] font-bold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Page 05 · The Guiding Philosophy</span>
          </motion.span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight mb-6">
            Overarching Theme
          </h2>

          {/* Statement Card with Glowing Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0b302e] via-[#0d3f3c] to-[#082624] text-[#f4f0e8] border-2 border-[#0b302e] shadow-[8px_8px_0px_#f28c28] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f28c28]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <Zap className="w-8 h-8 text-[#f6a44e] mb-3 animate-bounce" />
              <p className="text-xl sm:text-3xl font-display font-extrabold leading-snug tracking-tight text-center max-w-3xl">
                "{overarchingTheme.statement}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3 Animated Interactive Pillar Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {overarchingTheme.pillars.map((pillar, idx) => {
            const details = getPillarDetails(pillar.id);
            const Icon = details.icon;
            const isHovered = hoveredPillar === pillar.id;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                className={`group rounded-3xl overflow-hidden bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] hover:shadow-[12px_12px_0px_#0b302e] transition-all duration-300 flex flex-col justify-between ${details.borderHover}`}
              >
                {/* Header Strip with Dynamic Gradient */}
                <div
                  className={`py-4 px-6 text-center font-display text-base font-black tracking-widest uppercase text-white bg-gradient-to-r ${details.gradient} shadow-sm flex items-center justify-center gap-2`}
                >
                  <Icon className="w-4 h-4 text-white/90" />
                  <span>{pillar.title}</span>
                </div>

                {/* Body Tile */}
                <div className="p-8 sm:p-9 flex-1 flex flex-col items-center text-center justify-between">
                  {/* Interactive Animated Icon Container */}
                  <div className="relative mb-6">
                    <motion.div
                      animate={{
                        rotate: isHovered ? [0, 8, -8, 0] : 0,
                        scale: isHovered ? 1.12 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-20 h-20 rounded-2xl bg-white border-2 border-[#0b302e] shadow-[4px_4px_0px_#0b302e] group-hover:shadow-[6px_6px_0px_#0b302e] flex items-center justify-center transition-all"
                    >
                      <Icon className="w-10 h-10 stroke-[2.5]" style={{ color: details.accentColor }} />
                    </motion.div>
                  </div>

                  {/* Core Description from document */}
                  <div className="space-y-3 mb-6">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#c2410c] block">
                      {details.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-[#0b302e] leading-snug">
                      {pillar.description}
                    </h3>
                  </div>

                  {/* Student Inquiry Prompt on Card */}
                  <div className="w-full pt-5 border-t-2 border-[#0b302e]/10 text-left bg-[#f4f0e8]/80 p-4 rounded-xl">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#0b302e]/60 block mb-1">
                      Guiding Question:
                    </span>
                    <p className="text-xs text-[#0b302e]/90 font-semibold leading-relaxed">
                      {details.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
