import { useState } from 'react';
import { Award, ExternalLink, Sparkles, Trophy } from 'lucide-react';
import { CHALLENGES, SHOWCASE_TEAMS, type ChallengeKey, type ShowcaseTeam } from '../data/showcase';

const firstName = (full: string) => full.split(/\s+/)[0];

// Teams without a name are shown by their members' first names
export const teamName = (team: ShowcaseTeam) => {
  if (team.name) return team.name;
  const names = team.members.map(firstName);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0];
};

const challengeLabel = (team: ShowcaseTeam) =>
  team.challenge ? `${CHALLENGES[team.challenge].name}` : team.event;

const PLACE = { 1: '1st place', 2: '2nd place', 3: '3rd place' } as const;
const MEDAL = { 1: 'bg-[#f6c453]', 2: 'bg-[#d9dedc]', 3: 'bg-[#e3a77a]' } as const;

function TeamCard({ team, featured = false }: { team: ShowcaseTeam; featured?: boolean }) {
  const level = team.challenge ? CHALLENGES[team.challenge].level : null;
  return (
    <article
      className={`p-5 sm:p-6 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] flex flex-col gap-3 min-w-0 ${
        featured ? 'shadow-[6px_6px_0px_#f28c28]' : 'shadow-[5px_5px_0px_#0b302e]'
      }`}
    >
      {team.video && (
        <video
          src={team.video}
          controls
          playsInline
          preload="metadata"
          aria-label={`Project video by ${teamName(team)}`}
          className="w-full rounded-2xl border-2 border-[#0b302e] bg-[#0b302e]"
        />
      )}

      <div className="flex flex-wrap gap-2">
        {team.award && (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#0b302e] font-display text-xs font-black text-[#0b302e] ${MEDAL[team.award]}`}>
            <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
            {PLACE[team.award]}
          </span>
        )}
        {team.mention && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#0b302e] bg-[#f28c28] font-display text-xs font-black text-[#0b302e]">
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            Special mention
          </span>
        )}
        <span className="px-2.5 py-0.5 rounded-full border-2 border-[#0b302e] font-mono text-[11px] font-bold text-[#0b302e]">
          {challengeLabel(team)}
        </span>
        {level && (
          <span className="px-2.5 py-0.5 rounded-full border-2 border-[#0b302e]/30 font-mono text-[11px] font-bold text-[#0b302e]/80">
            {level}
          </span>
        )}
      </div>

      <div>
        <h3 className={`font-display font-black text-[#0b302e] leading-tight ${featured ? 'text-2xl' : 'text-xl'}`}>
          {teamName(team)}
        </h3>
        {team.project && <p className="mt-1 font-bold text-[#c2410c]">Project: {team.project}</p>}
        {team.mention && (
          <p className="mt-2 inline-block px-2.5 py-1 rounded-lg bg-[#fde3c8] border-2 border-[#f28c28] font-mono text-xs text-[#0b302e]">
            {team.mention}
          </p>
        )}
        <p className="mt-1 text-sm text-[#0b302e]/70 font-medium">{team.school}</p>
      </div>

      <ul className="text-sm text-[#172220] font-medium space-y-0.5">
        {team.members.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      {team.link && (
        <a
          href={team.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f28c28] hover:bg-[#f6a44e] border-2 border-[#0b302e] shadow-[3px_3px_0px_#0b302e] font-display text-sm font-black text-[#0b302e] transition-colors"
        >
          {team.linkLabel ?? 'See the project'}
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

type Filter = 'all' | 'Junior' | 'Senior' | ChallengeKey;
const FILTERS: [Filter, string][] = [
  ['all', 'All teams'],
  ['Junior', 'Junior'],
  ['Senior', 'Senior'],
  ...(Object.keys(CHALLENGES) as ChallengeKey[]).map((k) => [k, CHALLENGES[k].name] as [Filter, string]),
];

const matches = (team: ShowcaseTeam, f: Filter) =>
  f === 'all' || team.challenge === f || (team.challenge && CHALLENGES[team.challenge].level === f);

// The Showcase page: winners, special mentions, then every team
export default function Showcase() {
  const [filter, setFilter] = useState<Filter>('all');

  const teams = SHOWCASE_TEAMS;
  const students = teams.reduce((n, t) => n + t.members.length, 0);
  const schools = new Set(teams.map((t) => t.school)).size;
  // Award winners, by challenge then place
  const winners = (Object.keys(CHALLENGES) as ChallengeKey[]).flatMap((k) =>
    teams.filter((t) => t.challenge === k && t.award).sort((a, b) => a.award! - b.award!),
  );
  const mentions = teams.filter((t) => t.mention);
  const shown = teams.filter((t) => matches(t, filter));

  const heading = 'text-2xl sm:text-4xl font-display font-black text-[#0b302e] tracking-tight';

  return (
    <section className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            Showcase
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">
            Every team that took part in IGNITE 2026-27, and the work they built over two days.
          </p>
        </div>

        <dl className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {[
            [teams.length, 'teams'],
            [students, 'students'],
            [schools, 'schools'],
            [4, 'challenges'],
          ].map(([value, label]) => (
            <div key={label} className="px-5 py-3 rounded-2xl bg-[#faf8f3] border-2 border-[#0b302e] min-w-[120px] text-center">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-black text-[#0b302e] tabular-nums leading-none">{value}</dd>
              <p aria-hidden="true" className="text-sm text-[#0b302e]/70 font-medium mt-1">{label}</p>
            </div>
          ))}
        </dl>

        {winners.length > 0 && (
          <div className="mb-16">
            <h2 className={`${heading} mb-6`}>Winners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {winners.map((t) => (
                <TeamCard key={teamName(t)} team={t} featured={t.award === 1} />
              ))}
            </div>
          </div>
        )}

        {mentions.length > 0 && (
          <div className="mb-16">
            <h2 className={`${heading} mb-6`}>Special mentions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentions.map((t) => (
                <TeamCard key={teamName(t)} team={t} />
              ))}
            </div>
          </div>
        )}

        {winners.length === 0 && mentions.length === 0 && (
          <div className="max-w-xl mx-auto mb-16 p-8 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#f28c28] text-center">
            <Sparkles className="w-8 h-8 mx-auto text-[#c2410c]" aria-hidden="true" />
            <p className="mt-4 font-display text-xl font-black text-[#0b302e]">Winners and special mentions coming soon</p>
            <p className="mt-2 text-sm text-[#0b302e]/75 font-medium">The judges' results will appear here.</p>
          </div>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <h2 className={heading}>All teams</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter teams">
            {FILTERS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
                className={`px-3.5 py-1.5 rounded-full border-2 border-[#0b302e] text-sm font-bold transition-colors ${
                  filter === value ? 'bg-[#0b302e] text-[#f4f0e8]' : 'bg-[#faf8f3] text-[#0b302e] hover:bg-[#f28c28]/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((t) => (
            <TeamCard key={teamName(t) + t.school} team={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
