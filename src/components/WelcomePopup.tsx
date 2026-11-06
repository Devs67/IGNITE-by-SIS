import { useEffect, useState } from 'react';
import { X, ArrowRight, CalendarClock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { IGNITE_DATA } from '../data/igniteData';

// New key so visitors who closed the old registration popup still see this one
const SEEN_KEY = 'ignite-live-seen';

// Shown once per visit when someone lands on Home: registration is closed and
// the event is live, with buttons to the event flow and the challenges
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

  const seeEventFlow = () => {
    close();
    document.getElementById('event-flow')?.scrollIntoView({ behavior: 'smooth' });
  };

  const knowMore = () => {
    close();
    navigate('/challenges');
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
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#f4f0e8] text-[#172220] border-3 border-[#0b302e] shadow-[8px_8px_0px_#f28c28]"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#0b302e] hover:bg-[#f28c28] hover:text-[#172220] transition-colors border-2 border-[#0b302e]/20"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="px-6 sm:px-10 pt-10 pb-8 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#0b302e]/10 text-[#0b302e] font-mono text-[11px] uppercase tracking-widest font-black">
            Registration is closed
          </span>

          <h2 id="welcome-title" className="mt-5 font-display text-4xl sm:text-5xl font-black text-[#0b302e] tracking-tight">
            We’re live!
          </h2>
          <span className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#b91c1c] text-[#faf8f3] font-display text-xs font-black uppercase tracking-widest">
            <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-[#faf8f3] animate-ping opacity-75" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#faf8f3]" />
            </span>
            Live now
          </span>

          <p className="mt-5 text-base sm:text-lg text-[#0b302e]/80 font-medium">
            {event.title} {event.subtitle} is happening now. Thank you to every team that signed up.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-1.5 text-sm font-bold text-[#0b302e]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="w-4 h-4 text-[#c2410c]" aria-hidden="true" />
              {event.dates}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#c2410c]" aria-hidden="true" />
              New Design Block
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-10 py-4 border-t-2 border-[#0b302e]/15 bg-[#faf8f3] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            onClick={knowMore}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#0b302e] bg-[#faf8f3] text-[#0b302e] font-display text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-[#0b302e] hover:text-[#f4f0e8] transition-colors"
          >
            See the Challenges
          </button>
          <button
            onClick={seeEventFlow}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f28c28] hover:bg-[#e26f1e] text-[#172220] border-2 border-[#0b302e] font-display text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#0b302e] transition-colors"
          >
            <span>See the Event Flow</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
