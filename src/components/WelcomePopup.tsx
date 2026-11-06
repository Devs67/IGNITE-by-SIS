import { useEffect, useState } from 'react';
import { X, PartyPopper, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import EventStats from './EventStats';
import { IGNITE_DATA } from '../data/igniteData';

// New key so visitors who closed the earlier wrap-up popup see it again with the winners button
const SEEN_KEY = 'ignite-winners-seen';

// Shown once per visit when someone lands on Home: the event has wrapped up,
// with its numbers and buttons to the winners and the judges
export default function WelcomePopup() {
  const { event } = IGNITE_DATA;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {}
    if (seen) return;
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {}
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const goTo = (path: string) => {
    close();
    navigate(path);
  };

  // The winners section is on Home, below the wrap-up, so just scroll down to it
  const showWinners = () => {
    close();
    requestAnimationFrame(() => document.getElementById('winners')?.scrollIntoView({ behavior: 'smooth' }));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0b302e]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={close}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#f4f0e8] text-[#172220] border-3 border-[#0b302e] shadow-[8px_8px_0px_#f28c28]"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#0b302e] hover:bg-[#f28c28] hover:text-[#172220] transition-colors border-2 border-[#0b302e]/20"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="px-5 sm:px-10 pt-16 sm:pt-10 pb-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f28c28]/20 text-[#9a3412] font-mono text-[11px] uppercase tracking-widest font-black">
            <PartyPopper className="w-4 h-4" aria-hidden="true" />
            {event.title} · {event.dates}
          </span>

          <h2 id="welcome-title" className="mt-5 font-display text-4xl sm:text-5xl font-black text-[#0b302e] tracking-tight">
            That’s a wrap!
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#0b302e]/80 font-medium">
            Thank you for making IGNITE 2026–27 unforgettable.
          </p>

          <div className="mt-7">
            <EventStats tone="light" />
          </div>
        </div>

        <div className="px-5 sm:px-10 py-4 border-t-2 border-[#0b302e]/15 bg-[#faf8f3] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            onClick={() => goTo('/judges')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#0b302e] bg-[#faf8f3] text-[#0b302e] font-display text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-[#0b302e] hover:text-[#f4f0e8] transition-colors"
          >
            Meet the Judges
          </button>
          <button
            onClick={showWinners}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f28c28] hover:bg-[#e26f1e] text-[#172220] border-2 border-[#0b302e] font-display text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#0b302e] transition-colors"
          >
            <Trophy className="w-4 h-4 stroke-[2.5]" />
            <span>Meet Our Winners</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
