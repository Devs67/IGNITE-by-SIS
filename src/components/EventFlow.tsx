import { ArrowRight, Bot, ClipboardCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { IGNITE_DATA } from '../data/igniteData';

// The two-day schedule, one card per day, with links to the AI policy and judging rubrics
export default function EventFlow() {
  const { event, eventFlow } = IGNITE_DATA;

  return (
    <section id="event-flow" className="py-24 sm:py-32 relative bg-[#faf8f3] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            Event Flow
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">
            {event.subtitle} · {event.dates}
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#0b302e]">
            <MapPin className="w-4 h-4 text-[#c2410c]" aria-hidden="true" />
            New Design Block, {event.school}, Moinabad
          </p>
        </div>

        {/* One card per day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {eventFlow.map((day, dayIdx) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: dayIdx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#f4f0e8] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e]"
            >
              <div className="flex items-center gap-3 pb-4 border-b-2 border-[#0b302e]/10 mb-6">
                <span
                  className={`px-3.5 py-1.5 rounded-xl font-display text-sm font-black uppercase tracking-wider ${
                    dayIdx === 0 ? 'bg-[#0b302e] text-[#f4f0e8]' : 'bg-[#f28c28] text-[#172220]'
                  }`}
                >
                  {day.day}
                </span>
                <h3 className="text-xl font-display font-black text-[#0b302e]">{day.date}</h3>
              </div>

              {/* Timeline */}
              <ol className="relative">
                {day.sessions.map((session, idx) => (
                  <li key={`${session.time}-${session.title}`} className="relative pl-8 pb-5 last:pb-0">
                    {idx < day.sessions.length - 1 && (
                      <span aria-hidden="true" className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-[#0b302e]/15" />
                    )}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1 w-4 h-4 rounded-full border-3 ${
                        session.highlight ? 'bg-[#f28c28] border-[#0b302e]' : 'bg-[#faf8f3] border-[#0b302e]'
                      }`}
                    />
                    <span className="block font-mono text-xs font-bold text-[#c2410c]">{session.time}</span>
                    <span className={`block font-display text-lg font-black leading-tight ${session.highlight ? 'text-[#c2410c]' : 'text-[#0b302e]'}`}>
                      {session.title}
                    </span>
                    {session.detail && (
                      <span className="block text-sm text-[#0b302e]/75 font-medium mt-0.5">{session.detail}</span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>

        {/* Before the event: the AI rules and how teams are judged */}
        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { to: '/ai-policy', icon: <Bot className="w-5 h-5 stroke-[2.5]" />, title: 'AI Usage Policy', detail: 'What AI can and can’t be used for' },
            { to: '/rubrics', icon: <ClipboardCheck className="w-5 h-5 stroke-[2.5]" />, title: 'Judging Rubrics', detail: 'How judges score each challenge' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group p-5 rounded-2xl bg-[#f4f0e8] border-2 border-[#0b302e]/20 hover:border-[#0b302e] hover:shadow-[4px_4px_0px_#f28c28] transition-all flex items-center gap-4"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#f28c28]/15 text-[#c2410c] border-2 border-[#f28c28]/40 flex items-center justify-center">
                {link.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-display text-lg font-black text-[#0b302e]">{link.title}</span>
                <span className="block text-sm text-[#0b302e]/75 font-medium">{link.detail}</span>
              </span>
              <ArrowRight className="w-5 h-5 shrink-0 text-[#0b302e] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
