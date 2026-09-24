import { Calendar, MapPin, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import IgniteLogo from './IgniteLogo';
import CountdownTimer from './CountdownTimer';
import { IGNITE_DATA } from '../data/igniteData';

const MotionLink = motion.create(Link);

interface HeroProps {
  onOpenRegister: () => void;
}

export default function Hero({ onOpenRegister }: HeroProps) {
  const { event, accreditations } = IGNITE_DATA;

  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-radial-[at_50%_0%] from-[#0f3d3a] via-[#0b302e] to-[#082423] text-[#f4f0e8]">
      {/* Background Animated Tech Grid & Floating Particles */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#f4f0e8 1px, transparent 1px), linear-gradient(90deg, #f4f0e8 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient Animated Light Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
          x: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-[#f28c28] blur-[120px] pointer-events-none -z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
          y: [0, -40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full bg-[#10b981] blur-[140px] pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Master Showcase: Official IGNITE Logo Spotlight */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
            className="inline-block relative mb-8"
          >
            {/* Ambient Backlight for Logo */}
            <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-r from-[#f28c28]/40 via-[#8fb9aa]/30 to-[#f28c28]/40 blur-xl opacity-70 animate-pulse" />

            {/* Official Logo Card: Clean, Crisp, Exactly matching uploaded branding */}
            <div className="relative px-8 py-8 sm:px-14 sm:py-10 rounded-[32px] bg-[#faf8f3] border-4 border-[#faf8f3] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] group">
              <IgniteLogo variant="full" />
              
              {/* Subtle metallic shine border effect */}
              <div className="absolute inset-0 rounded-[28px] border border-[#0b302e]/10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Event Track & Edition Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#f6a44e] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Edition 2026-27 · Innovation Marathon</span>
              <Sparkles className="w-4 h-4" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white">
              Hackathon <span className="text-[#f28c28]">&amp;</span> Makeathon
            </h2>

            {/* Date & Location Badges with Hover Micro-interactions */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2 pb-4 flex-wrap">
              {/* Highlighted event date */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-2xl bg-[#f28c28] border-2 border-[#f6a44e] shadow-[5px_5px_0px_#0b302e] text-[#172220] transition-all cursor-default"
              >
                <div className="p-2 rounded-xl bg-[#0b302e] text-[#f6a44e]">
                  <Calendar className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0b302e]">
                    Save the date
                  </span>
                  <span className="block font-display text-lg sm:text-2xl font-black tracking-tight">{event.dates}</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/25 backdrop-blur-md shadow-lg text-xs sm:text-sm font-display font-bold text-white transition-all cursor-default"
              >
                <div className="p-1.5 rounded-lg bg-[#10b981]/20 text-[#8fb9aa]">
                  <MapPin className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>{event.school}</span>
              </motion.div>
            </div>

            {/* Core Definition Quote from Slide 2 */}
            <div className="max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-sm shadow-inner">
              <p className="text-sm sm:text-lg text-white/95 leading-relaxed font-medium">
                "{event.definition}"
              </p>
            </div>

            {/* Premium Animated Countdown Timer */}
            <CountdownTimer />
          </motion.div>

          {/* Interactive Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenRegister}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f28c28] via-[#e26f1e] to-[#f28c28] text-[#172220] font-display text-sm font-black uppercase tracking-wider shadow-[0_10px_30px_rgba(242,140,40,0.4)] hover:shadow-[0_15px_40px_rgba(242,140,40,0.6)] transition-all"
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </motion.button>

            <MotionLink
              whileHover={{ scale: 1.04, y: -2 }}
              to="/challenges"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-display text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all"
            >
              <span>Explore Challenges</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </MotionLink>
          </motion.div>

          {/* Accreditations: one quiet static line */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest">
            <span className="text-[#8fb9aa]/70 font-bold">Accredited by</span>
            {accreditations.map((acc) => (
              <span key={acc.label} className="flex items-center gap-3 text-[#f4f0e8]/80 font-bold">
                <span className="text-[#f28c28]">·</span>
                {acc.label.replace(' Accredited', '')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
