import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { Person } from '../data/igniteData';

interface PeopleProps {
  title: string;
  intro: string;
  people: Person[];
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !/^(dr|mr|mrs|ms|prof)\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

// A page listing people (judges) as cards
export default function People({ title, intro, people }: PeopleProps) {
  return (
    <section className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">{intro}</p>
        </div>

        {people.length === 0 ? (
          <div className="max-w-xl mx-auto p-8 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#f28c28] text-center">
            <Sparkles className="w-8 h-8 mx-auto text-[#c2410c]" aria-hidden="true" />
            <p className="mt-4 font-display text-xl font-black text-[#0b302e]">Announced soon</p>
            <p className="mt-2 text-sm text-[#0b302e]/75 font-medium">Check back closer to the event.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {people.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.1 }}
                className="p-4 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] flex flex-col"
              >
                {/* Portrait photo, or initials while there is none */}
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    className="w-full aspect-[4/5] rounded-2xl object-cover object-top border-2 border-[#0b302e]"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="w-full aspect-[4/5] rounded-2xl bg-[#0b302e] text-[#f6a44e] flex items-center justify-center font-display text-4xl font-black"
                  >
                    {initials(person.name)}
                  </span>
                )}
                <div className="px-2 pt-4 pb-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest font-black text-[#c2410c]">
                    Judge {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-black text-[#0b302e] leading-tight mt-1">{person.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider font-black text-[#0b302e]/80 mt-2">{person.role}</p>
                  {person.organisation && (
                    <p className="text-sm italic font-semibold text-[#0b302e]/75 mt-1">{person.organisation}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
