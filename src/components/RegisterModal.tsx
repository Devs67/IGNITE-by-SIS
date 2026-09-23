import { X, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import IgniteLogo from './IgniteLogo';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScgqh2kHVoaYCsLhsKj3ZyObzNA1MS-LOvCfohdOE0kpd7iGg/viewform';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0b302e]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#faf8f3] text-[#172220] border-2 border-[#0b302e] shadow-[8px_8px_0px_#0b302e] overflow-hidden flex flex-col h-[92vh]"
      >
        {/* Top bar with official logo */}
        <div className="p-6 border-b-2 border-[#0b302e]/15 flex items-center justify-between bg-[#f4f0e8]">
          <div className="flex items-center gap-3">
            <IgniteLogo variant="horizontal" className="h-9" />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#0b302e] hover:bg-[#f28c28] hover:text-[#172220] transition-colors border-2 border-[#0b302e]/20"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Registration form (Google Forms) */}
        <iframe
          src={`${FORM_URL}?embedded=true`}
          title="IGNITE 2026–27 Registration Form"
          className="w-full flex-1 bg-white"
          loading="lazy"
        >
          Loading…
        </iframe>

        <div className="px-6 py-3 border-t-2 border-[#0b302e]/15 bg-[#f4f0e8] text-center">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-[#0b302e] hover:text-[#f28c28] transition-colors"
          >
            <span>Form not loading? Open it in a new tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
