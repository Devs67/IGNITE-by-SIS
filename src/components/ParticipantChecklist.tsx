import { useState } from 'react';
import { Check, Clock, MapPin, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

export default function ParticipantChecklist() {
  const { checklists } = IGNITE_DATA;
  const [activeTab, setActiveTab] = useState<'hackathon' | 'makeathon'>('hackathon');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentChecklist = checklists[activeTab];
  const totalItems = currentChecklist.before.length + currentChecklist.at.length;
  const completedCount = [...currentChecklist.before, ...currentChecklist.at].filter(
    (item) => checkedItems[`${activeTab}-${item.heading}`]
  ).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <section id="checklist" className="py-24 sm:py-32 relative bg-[#faf8f3] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            Participant Checklist
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">
            Everything your team needs to prepare before arriving and execute during IGNITE.
          </p>

          {/* Switcher Tab */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#f4f0e8] border-3 border-[#0b302e] mt-8 shadow-[4px_4px_0px_#0b302e]">
            <button
              onClick={() => setActiveTab('hackathon')}
              className={`px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-black transition-all ${
                activeTab === 'hackathon'
                  ? 'bg-[#0b302e] text-[#f4f0e8] shadow-md'
                  : 'text-[#0b302e] hover:text-[#f28c28]'
              }`}
            >
              Hackathon Checklist
            </button>
            <button
              onClick={() => setActiveTab('makeathon')}
              className={`px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-black transition-all ${
                activeTab === 'makeathon'
                  ? 'bg-[#f28c28] text-[#172220] shadow-md'
                  : 'text-[#0b302e] hover:text-[#f28c28]'
              }`}
            >
              Makeathon Checklist
            </button>
          </div>

          {/* Readiness Tracker Bar */}
          <div className="max-w-md mx-auto mt-6 p-3 rounded-2xl bg-[#f4f0e8] border-2 border-[#0b302e]/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0b302e]">
              <Trophy className="w-4 h-4 text-[#f28c28]" />
              <span>Readiness: {completedCount}/{totalItems} items ({progressPercent}%)</span>
            </div>
            <div className="w-28 h-2.5 bg-[#0b302e]/15 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#f28c28] to-[#10b981]"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* The Two-Stage Checklist Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Column 1: Before IGNITE */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-[#f4f0e8] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e]"
          >
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#0b302e]/10 mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#c2410c] font-black block">
                  Phase 01
                </span>
                <h3 className="text-xl font-display font-black text-[#0b302e]">
                  Before IGNITE
                </h3>
              </div>
              <div className="p-2.5 rounded-xl bg-[#f28c28]/20 text-[#c2410c]">
                <Clock className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-3.5">
              {currentChecklist.before.map((item, idx) => {
                const itemId = `${activeTab}-${item.heading}`;
                const isChecked = !!checkedItems[itemId];

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleCheck(itemId)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-[#10b981]/15 border-[#10b981] shadow-xs'
                        : 'bg-white border-[#0b302e]/15 hover:border-[#0b302e] shadow-xs'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-[#10b981] border-[#10b981] text-white'
                          : 'border-[#0b302e]/40 bg-[#f4f0e8]'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <span
                        className={`text-sm font-bold block ${
                          isChecked
                            ? 'line-through text-[#0b302e]/50'
                            : 'text-[#0b302e]'
                        }`}
                      >
                        {item.heading}
                      </span>
                      <p className="text-xs text-[#0b302e]/75 font-medium mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: At / During IGNITE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-[#f4f0e8] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e]"
          >
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#0b302e]/10 mb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#0b302e] font-black block">
                  Phase 02
                </span>
                <h3 className="text-xl font-display font-black text-[#0b302e]">
                  At IGNITE
                </h3>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0b302e]/15 text-[#0b302e]">
                <MapPin className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-3.5">
              {currentChecklist.at.map((item, idx) => {
                const itemId = `${activeTab}-${item.heading}`;
                const isChecked = !!checkedItems[itemId];

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleCheck(itemId)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-[#10b981]/15 border-[#10b981] shadow-xs'
                        : 'bg-white border-[#0b302e]/15 hover:border-[#0b302e] shadow-xs'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-[#10b981] border-[#10b981] text-white'
                          : 'border-[#0b302e]/40 bg-[#f4f0e8]'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <span
                        className={`text-sm font-bold block ${
                          isChecked
                            ? 'line-through text-[#0b302e]/50'
                            : 'text-[#0b302e]'
                        }`}
                      >
                        {item.heading}
                      </span>
                      <p className="text-xs text-[#0b302e]/75 font-medium mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
