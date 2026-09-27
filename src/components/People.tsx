import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { Person } from '../data/igniteData';

interface PeopleProps {
  title: string;
  intro: string;
  people: Person[];
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !/^(dr|mr|mrs|ms|prof)\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

// A page listing people (organising committee, judges) as cards
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {people.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                className="p-6 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] flex items-center gap-4"
              >
                <span
                  aria-hidden="true"
                  className="w-14 h-14 shrink-0 rounded-2xl bg-[#0b302e] text-[#f6a44e] flex items-center justify-center font-display text-lg font-black"
                >
                  {initials(person.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-black text-[#0b302e] leading-tight">{person.name}</h3>
                  <p className="text-sm text-[#0b302e]/75 font-medium mt-1">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
