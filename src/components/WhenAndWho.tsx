import { Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';

export default function WhenAndWho() {
  const { event } = IGNITE_DATA;

  const facts = [
    {
      label: 'When',
      icon: <Calendar className="w-6 h-6 stroke-[2.5]" />,
      title: event.dates,
      detail: 'Two days of building, testing, and presenting',
    },
    {
      label: 'Where',
      icon: <MapPin className="w-6 h-6 stroke-[2.5]" />,
      title: 'New Design Block',
      detail: 'SIS campus, Sreenidhi International School',
    },
    {
      label: 'Who',
      icon: <Users className="w-6 h-6 stroke-[2.5]" />,
      title: 'MYP 1 – DP 2',
      detail: 'Junior (MYP 1–3) and Senior (MYP 4–DP 2) divisions',
    },
  ];

  return (
    <section id="when-and-who" className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            When &amp; Who?
          </h2>
        </div>

        {/* When / Where / Who */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {facts.map((fact, idx) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-7 rounded-3xl border-3 border-[#0b302e] ${
                idx === 0
                  ? 'bg-[#0b302e] text-[#f4f0e8] shadow-[6px_6px_0px_#f28c28]'
                  : 'bg-[#faf8f3] text-[#0b302e] shadow-[6px_6px_0px_#0b302e]'
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
                    idx === 0
                      ? 'bg-white/10 text-[#f6a44e] border-white/20'
                      : 'bg-[#f28c28]/15 text-[#c2410c] border-[#f28c28]/40'
                  }`}
                >
                  {fact.icon}
                </div>
                <span
                  className={`font-mono text-xs uppercase tracking-widest font-black ${
                    idx === 0 ? 'text-[#8fb9aa]' : 'text-[#c2410c]'
                  }`}
                >
                  {fact.label}
                </span>
              </div>
              <h3 className="font-display text-2xl font-black tracking-tight leading-tight">{fact.title}</h3>
              <p className={`text-sm font-medium leading-relaxed mt-2 ${idx === 0 ? 'text-[#f4f0e8]/80' : 'text-[#0b302e]/75'}`}>
                {fact.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
