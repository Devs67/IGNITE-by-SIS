import { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

export default function FAQ() {
  const { faqs } = IGNITE_DATA;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f28c28]/15 border border-[#f28c28]/30 font-mono text-xs uppercase tracking-widest text-[#c2410c] font-bold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Questions &amp; Answers</span>
          </motion.span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            FAQs
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">
            Everything you need to know before you ignite.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl bg-[#faf8f3] border-3 border-[#0b302e] transition-shadow ${
                  isOpen ? 'shadow-[6px_6px_0px_#f28c28]' : 'shadow-[4px_4px_0px_#0b302e]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f28c28] rounded-2xl"
                >
                  <span className="font-display text-base sm:text-lg font-black text-[#0b302e]">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-[#f28c28] text-[#172220] rotate-45' : 'bg-[#0b302e] text-[#f4f0e8]'
                    }`}
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#0b302e]/80 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
