import { IGNITE_DATA } from '../data/igniteData';

interface EventStatsProps {
  // dark: on the green hero; light: on cream cards
  tone: 'dark' | 'light';
}

// The event in numbers (students, categories, judges, schools), as four tiles
export default function EventStats({ tone }: EventStatsProps) {
  const { stats } = IGNITE_DATA.event;
  const dark = tone === 'dark';

  return (
    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-col-reverse items-center justify-center py-4 sm:py-5 rounded-2xl ${
            dark
              ? 'bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/25 shadow-inner'
              : 'bg-[#faf8f3] border-2 border-[#0b302e]'
          }`}
        >
          <dt className={`mt-1.5 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase ${dark ? 'text-[#8fb9aa]' : 'text-[#9a3412]'}`}>
            {stat.label}
          </dt>
          <dd className={`font-display font-black text-4xl sm:text-5xl tracking-tight leading-none ${dark ? 'text-white' : 'text-[#0b302e]'}`}>
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
