import { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import IgniteFlowChart from './IgniteFlowChart';

const SEEN_KEY = 'ignite-welcome-seen';

interface WelcomePopupProps {
  onOpenRegister: () => void;
}

// Shown once per visit when someone lands on Home: the challenge flow chart,
// plus Register and Know More buttons
export default function WelcomePopup({ onOpenRegister }: WelcomePopupProps) {
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

  const register = () => {
    close();
    onOpenRegister();
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
        className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#f4f0e8] text-[#172220] border-3 border-[#0b302e] shadow-[8px_8px_0px_#f28c28] flex flex-col overflow-hidden"
      >
        <div className="px-5 sm:px-8 pt-5 sm:pt-6 pb-4 flex items-start justify-between gap-4 border-b-2 border-[#0b302e]/15">
          <div>
            <h2 id="welcome-title" className="font-display text-2xl sm:text-3xl font-black text-[#0b302e] tracking-tight">
              Four challenges. One IGNITE.
            </h2>
            <p className="text-sm text-[#0b302e]/75 font-medium mt-1">Find your division and pick your challenge.</p>
          </div>
          <button
            onClick={close}
            className="p-2 shrink-0 rounded-xl text-[#0b302e] hover:bg-[#f28c28] hover:text-[#172220] transition-colors border-2 border-[#0b302e]/20"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 sm:px-6">
          <IgniteFlowChart onSelectPathway={register} />
        </div>

        <div className="px-5 sm:px-8 py-4 border-t-2 border-[#0b302e]/15 bg-[#faf8f3] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            onClick={knowMore}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#0b302e] bg-[#faf8f3] text-[#0b302e] font-display text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-[#0b302e] hover:text-[#f4f0e8] transition-colors"
          >
            Know More
          </button>
          <button
            onClick={register}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f28c28] hover:bg-[#e26f1e] text-[#172220] border-2 border-[#0b302e] font-display text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#0b302e] transition-colors"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
