import { useCallback, useState } from 'react';
import { School, Trophy, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Lightbox } from './Gallery';
import { IGNITE_DATA } from '../data/igniteData';

// Photos are named after the challenge id (junior-hackathon, senior-makeathon…):
// 1200px versions for the cards, 2400px versions for the full-screen viewer
const thumbs = import.meta.glob<string>('../assets/images/winners/*.webp', { eager: true, import: 'default' });
const larges = import.meta.glob<string>('../assets/images/winners/large/*.webp', { eager: true, import: 'default' });

// Winning team of each challenge, in the order shown
const order = ['junior-hackathon', 'senior-hackathon', 'junior-makeathon', 'senior-makeathon'];

const winners = order.map((id) => {
  const pathway = IGNITE_DATA.pathways.find((p) => p.id === id)!;
  const team = IGNITE_DATA.event.winners[id];
  return {
    name: id,
    title: pathway.title,
    subtitle: pathway.subtitle,
    team,
    caption: `Winners: ${pathway.title} (${pathway.subtitle}): ${team.team}, ${team.school}`,
    thumb: thumbs[`../assets/images/winners/${id}.webp`],
    src: larges[`../assets/images/winners/large/${id}.webp`],
  };
});

export default function Winners() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const nav = useCallback(
    (step: number) => setOpenIndex((i) => (i === null ? i : (i + step + winners.length) % winners.length)),
    [],
  );

  return (
    <section id="winners" className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f28c28] to-[#e26f1e] text-[#172220] flex items-center justify-center border-2 border-[#0b302e] shadow-[4px_4px_0px_#0b302e]">
              <Trophy className="w-7 h-7 stroke-[2.5]" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            Our Winners
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">
            Congratulations to the winning teams of IGNITE 2026–27.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {winners.map((winner, idx) => (
            <motion.figure
              key={winner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group overflow-hidden rounded-3xl border-3 border-[#0b302e] bg-[#faf8f3] shadow-[6px_6px_0px_#0b302e] hover:shadow-[9px_9px_0px_#f28c28] transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(idx)}
                className="block w-full aspect-[3/2] overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#f28c28]"
                aria-label={`View photo: ${winner.caption}`}
              >
                <img
                  src={winner.thumb}
                  alt={winner.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
              <figcaption className="px-5 sm:px-6 py-4 sm:py-5 border-t-3 border-[#0b302e]">
                <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg sm:text-xl font-black text-[#0b302e] leading-tight">
                    {winner.title}
                  </p>
                  <p className="font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#9a3412] mt-1">
                    {winner.subtitle}
                  </p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f28c28] text-[#172220] border-2 border-[#0b302e] font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                  <Trophy className="w-3.5 h-3.5 stroke-[2.5]" />
                  Winner
                </span>
                </div>

                {/* Team, school and members */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-[#0b302e]/20">
                  <p className="font-display text-2xl sm:text-[1.7rem] font-black text-[#c2410c] leading-tight">
                    {winner.team.team}
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 text-sm sm:text-base font-bold text-[#0b302e]">
                    <School className="w-4 h-4 shrink-0 text-[#0b302e]/70" aria-hidden="true" />
                    {winner.team.school}
                  </p>
                  <div className="mt-3 flex items-start gap-2">
                    <Users className="w-4 h-4 shrink-0 mt-1.5 text-[#0b302e]/70" aria-label="Team members" />
                    <ul className="flex flex-wrap gap-1.5">
                      {winner.team.members.map((member) => (
                        <li
                          key={member}
                          className="px-2.5 py-1 rounded-full bg-[#0b302e]/[0.06] border border-[#0b302e]/15 text-xs sm:text-sm font-semibold text-[#0b302e]"
                        >
                          {member}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>

      {openIndex !== null && <Lightbox photos={winners} index={openIndex} onClose={close} onNav={nav} />}
    </section>
  );
}
