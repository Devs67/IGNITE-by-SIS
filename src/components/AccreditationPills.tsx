import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface AccreditationItem {
  id: string;
  name: string;
  sub: string;
  icon: typeof Globe;
  gradient: string;
  border: string;
  glow: string;
  accentDot: string;
}

const ACCREDITATIONS: AccreditationItem[] = [
  {
    id: 'ib',
    name: 'IB CONTINUUM',
    sub: 'PYP · MYP · DP World School',
    icon: Globe,
    gradient: 'from-[#0f2b5c] via-[#1e40af] to-[#2563eb]',
    border: 'border-blue-300/40',
    glow: 'shadow-[0_4px_20px_rgba(37,99,235,0.4)]',
    accentDot: 'bg-[#60a5fa]',
  },
  {
    id: 'neasc',
    name: 'NEASC ACCREDITED',
    sub: 'New England Association of Schools',
    icon: Award,
    gradient: 'from-[#78350f] via-[#b45309] to-[#d97706]',
    border: 'border-amber-300/40',
    glow: 'shadow-[0_4px_20px_rgba(217,119,6,0.4)]',
    accentDot: 'bg-[#fcd34d]',
  },
  {
    id: 'cis',
    name: 'CIS ACCREDITED',
    sub: 'Council of International Schools',
    icon: ShieldCheck,
    gradient: 'from-[#064e3b] via-[#047857] to-[#10b981]',
    border: 'border-emerald-300/40',
    glow: 'shadow-[0_4px_20px_rgba(16,185,129,0.4)]',
    accentDot: 'bg-[#6ee7b7]',
  },
  {
    id: 'google',
    name: 'GOOGLE FOR EDUCATION',
    sub: 'Certified Reference School',
    icon: Sparkles,
    gradient: 'from-[#1e293b] via-[#0f172a] to-[#334155]',
    border: 'border-sky-300/40',
    glow: 'shadow-[0_4px_20px_rgba(56,189,248,0.35)]',
    accentDot: 'bg-[#38bdf8]',
  },
];

export default function AccreditationPills() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Automatically cycle active spotlight from one pill to another every 2.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ACCREDITATIONS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden py-3">
      {/* 1. Interactive Spotlight Grid (Desktop/Tablet) with jumping active indicator */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {ACCREDITATIONS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeIdx === idx;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                animate={{
                  scale: isActive ? 1.05 : 0.98,
                  y: isActive ? -4 : 0,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="relative cursor-pointer group"
              >
                {/* Glowing Aura when active */}
                {isActive && (
                  <motion.div
                    layoutId="activePillGlow"
                    className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#f28c28] via-[#e26f1e] to-[#8fb9aa] opacity-70 blur-md -z-10 animate-pulse"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                  />
                )}

                <div
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-white font-mono text-[11px] sm:text-xs font-bold bg-gradient-to-r ${item.gradient} border ${item.border} ${item.glow} backdrop-blur-md transition-all duration-300 shadow-md`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    {isActive && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${item.accentDot}`} />
                  </span>

                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-white/90" />

                  <span className="tracking-wider uppercase whitespace-nowrap drop-shadow-xs">
                    {item.name}
                  </span>

                  {/* Active highlight tag */}
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="hidden md:inline-block text-[9px] font-sans font-medium px-2 py-0.5 rounded-full bg-white/20 text-white/95"
                    >
                      {item.sub}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Seamless Infinite Animated Moving Ribbon (ticker glides continuously) */}
      <div className="mt-4 relative w-full overflow-hidden mask-gradient">
        <motion.div
          className="flex items-center gap-4 w-max"
          animate={{
            x: [0, -1200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
        >
          {/* Double array for infinite loop without gap */}
          {[...ACCREDITATIONS, ...ACCREDITATIONS, ...ACCREDITATIONS].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`marquee-${index}`}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-white font-mono text-[10px] font-bold bg-gradient-to-r ${item.gradient} border ${item.border} opacity-90 shadow-sm shrink-0`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.accentDot}`} />
                <Icon className="w-3 h-3 text-white/80" />
                <span className="tracking-wider">{item.name}</span>
                <span className="text-white/40">·</span>
                <span className="text-[9px] text-white/80 font-normal font-sans">{item.sub}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
