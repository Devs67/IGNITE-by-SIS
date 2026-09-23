import { Cpu, Lightbulb, Sparkles, ArrowRight, Eye, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

export default function WhatIsIgnite() {
  const { event, eventTypes } = IGNITE_DATA;
  const hackathon = eventTypes.find((e) => e.type === 'Hackathon')!;
  const makeathon = eventTypes.find((e) => e.type === 'Makeathon')!;

  return (
    <section id="what-is-ignite" className="py-24 sm:py-32 relative bg-[#faf8f3] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f28c28]/15 border border-[#f28c28]/30 font-mono text-xs uppercase tracking-widest text-[#c2410c] font-bold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Page 02 · Vision &amp; Foundations</span>
          </motion.span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            What is IGNITE?
          </h2>
          <p className="text-lg sm:text-2xl text-[#0b302e]/85 mt-4 font-semibold leading-relaxed max-w-3xl mx-auto">
            {event.definition}
          </p>
          <p className="text-sm sm:text-base text-[#0b302e]/75 mt-6 font-medium leading-relaxed max-w-3xl mx-auto">
            {event.about.split('Design Department').map((part, i) => (
              <span key={i}>
                {i > 0 && (
                  <span className="font-extrabold text-[#c2410c] bg-[#f28c28]/15 px-1.5 py-0.5 rounded-md">
                    Design Department
                  </span>
                )}
                {part}
              </span>
            ))}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Hackathon Box with Motion and 3D lift */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0b302e] via-[#0d3f3c] to-[#082624] text-[#f4f0e8] border-3 border-[#0b302e] shadow-[7px_7px_0px_#0b302e] hover:shadow-[12px_12px_0px_#0b302e] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 text-[#f6a44e] border-2 border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8 stroke-[2.5]" />
              </div>

              <span className="font-mono text-xs uppercase tracking-wider text-[#8fb9aa] font-black block mb-1">
                Event Type 01
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-[#f4f0e8] mb-2">
                Hackathon
              </h3>
              <p className="font-display text-sm font-extrabold text-[#f6a44e] uppercase tracking-wider mb-4">
                {hackathon.theme}
              </p>
              <p className="text-sm sm:text-base text-[#f4f0e8]/90 font-medium leading-relaxed">
                {hackathon.description}
              </p>
              <p className="text-sm text-[#f4f0e8]/70 font-medium leading-relaxed mt-3">
                {hackathon.detail}
              </p>
            </div>

            <div className="pt-8 border-t border-white/15 mt-8 flex items-center justify-between text-xs font-mono text-[#8fb9aa] font-bold">
              <span>Category: {hackathon.category}</span>
              <span className="px-3 py-1 rounded-md bg-white/10 text-white font-mono">
                {hackathon.gradeLevel}
              </span>
            </div>
          </motion.div>

          {/* Makeathon Box with Signature Curved Corner & Motion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -8 }}
            className="rounded-3xl rounded-tr-[70px] sm:rounded-tr-[90px] p-8 sm:p-10 bg-gradient-to-br from-[#f28c28] via-[#e26f1e] to-[#ea580c] text-[#172220] border-3 border-[#0b302e] shadow-[7px_7px_0px_#0b302e] hover:shadow-[12px_12px_0px_#0b302e] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#0b302e] text-[#f4f0e8] border-2 border-[#0b302e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 stroke-[2.5]" />
              </div>

              <span className="font-mono text-xs uppercase tracking-wider text-[#0b302e]/70 font-black block mb-1">
                Event Type 02
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-[#0b302e] mb-2">
                Makeathon
              </h3>
              <p className="font-display text-sm font-extrabold text-[#0b302e] uppercase tracking-wider mb-4">
                {makeathon.theme}
              </p>
              <p className="text-sm sm:text-base text-[#172220]/90 font-semibold leading-relaxed">
                {makeathon.description}
              </p>
              <p className="text-sm text-[#172220]/80 font-medium leading-relaxed mt-3">
                {makeathon.detail}
              </p>
            </div>

            <div className="pt-8 border-t border-black/15 mt-8 flex items-center justify-between text-xs font-mono text-[#0b302e] font-black">
              <span>Category: {makeathon.category}</span>
              <span className="px-3 py-1 rounded-md bg-black/15 text-[#0b302e] font-mono">
                {makeathon.gradeLevel}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          {[
            { label: 'Vision', icon: <Eye className="w-6 h-6 stroke-[2.5]" />, text: event.vision },
            { label: 'Mission', icon: <Target className="w-6 h-6 stroke-[2.5]" />, text: event.mission },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-3xl p-8 sm:p-10 bg-[#f4f0e8] border-3 border-[#0b302e] shadow-[7px_7px_0px_#f28c28]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#f28c28]/15 text-[#c2410c] border-2 border-[#f28c28]/40 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-[#0b302e] uppercase tracking-tight">
                  {item.label}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#0b302e]/85 font-medium leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
