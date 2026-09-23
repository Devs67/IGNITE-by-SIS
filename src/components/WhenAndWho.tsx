import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

export default function WhenAndWho() {
  const { event, eventFlow } = IGNITE_DATA;

  return (
    <section id="when-and-who" className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f28c28]/15 border border-[#f28c28]/30 font-mono text-xs uppercase tracking-widest text-[#c2410c] font-bold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Timeline &amp; Participation</span>
          </motion.span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            When &amp; Who?
          </h2>

          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#0b302e] text-[#f4f0e8] font-mono text-sm sm:text-base font-bold mt-6 shadow-[5px_5px_0px_#f28c28]"
          >
            <Calendar className="w-5 h-5 text-[#f6a44e]" />
            <span>{event.dates}</span>
          </motion.div>
        </div>

        {/* Animated 5-step Event Flow from Page 3 */}
        <div className="max-w-5xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c2410c] font-black block mb-6 text-center">
              OFFICIAL EVENT FLOW
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 items-center">
              {eventFlow.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className="p-4 rounded-2xl bg-[#f4f0e8] border-2 border-[#0b302e]/25 group-hover:border-[#0b302e] group-hover:bg-white text-center transition-all shadow-xs">
                    <span className="font-mono text-[10px] sm:text-xs text-[#0b302e]/60 font-bold block">
                      {step.step}
                    </span>
                    <span className="font-display text-xs sm:text-sm font-black text-[#0b302e] block mt-1">
                      {step.title}
                    </span>
                  </div>

                  {idx < eventFlow.length - 1 && (
                    <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-[#f28c28] font-black text-base animate-pulse">
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
