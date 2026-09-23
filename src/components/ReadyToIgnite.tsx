import { ArrowRight, Sparkles, Calendar, MapPin, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import IgniteLogo from './IgniteLogo';
import { IGNITE_DATA } from '../data/igniteData';

interface ReadyToIgniteProps {
  onOpenRegister: () => void;
}

export default function ReadyToIgnite({ onOpenRegister }: ReadyToIgniteProps) {
  const { event } = IGNITE_DATA;

  return (
    <section className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl sm:rounded-[40px] bg-gradient-to-br from-[#0b302e] via-[#0e3f3b] to-[#072422] text-[#f4f0e8] border-3 border-[#0b302e] shadow-[10px_10px_0px_#f28c28] p-8 sm:p-16 text-center relative overflow-hidden"
        >
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f28c28]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#f6a44e] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Page 10 · Final Call to Action</span>
            </div>

            <div className="flex justify-center mb-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f28c28] to-[#e26f1e] text-[#172220] flex items-center justify-center shadow-lg"
              >
                <Flame className="w-9 h-9 fill-current" />
              </motion.div>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-black text-[#f4f0e8] tracking-tight leading-tight">
              Ready to ignite?
            </h2>

            <p className="text-xl sm:text-3xl font-display font-black text-[#f6a44e]">
              Hackathon &amp; Makeathon
            </p>

            <p className="text-base sm:text-xl text-[#f4f0e8]/90 leading-relaxed font-medium max-w-2xl mx-auto">
              "{event.finalCall}"
            </p>

            <div className="pt-2 pb-4 flex items-center justify-center gap-4 text-xs sm:text-sm font-mono text-[#8fb9aa] font-bold flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#f6a44e]" />
                {event.dates}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8fb9aa]" />
                {event.school}
              </span>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl bg-[#f28c28] hover:bg-[#e26f1e] text-[#172220] font-display text-sm sm:text-base font-black tracking-wider uppercase shadow-[0_10px_30px_rgba(242,140,40,0.5)] transition-all"
              >
                <span>Step Into IGNITE</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
