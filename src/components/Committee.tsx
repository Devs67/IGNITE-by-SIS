import { motion } from 'motion/react';
import { ClipboardList, Crown, Megaphone, Package, Quote, UserRound, Users, Wallet, Wrench } from 'lucide-react';
import { IGNITE_DATA, type Person, type StudentTeam } from '../data/igniteData';
import { initials } from './People';

const TBA = 'To be announced';

const TEAM_ICONS: Record<StudentTeam['icon'], typeof Users> = {
  event: ClipboardList,
  logistics: Package,
  finance: Wallet,
  participants: Users,
  technical: Wrench,
  media: Megaphone,
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
});

// Initials badge, or a person icon while the name is still to be announced
function Avatar({ name, className }: { name: string; className: string }) {
  return (
    <span aria-hidden="true" className={`shrink-0 flex items-center justify-center font-display font-black ${className}`}>
      {name ? initials(name) : <UserRound className="w-1/2 h-1/2 stroke-[2.5]" />}
    </span>
  );
}

function LeaderCard({ person, dark, delay }: { person: Person; dark: boolean; delay: number }) {
  return (
    <motion.div
      {...reveal(delay)}
      className={`p-7 rounded-3xl border-3 border-[#0b302e] ${
        dark
          ? 'bg-[#0b302e] text-[#f4f0e8] shadow-[6px_6px_0px_#f28c28]'
          : 'bg-[#faf8f3] text-[#0b302e] shadow-[6px_6px_0px_#0b302e]'
      }`}
    >
      <div className="flex items-center gap-4">
        <Avatar
          name={person.name}
          className={`w-16 h-16 rounded-2xl text-xl ${dark ? 'bg-[#f28c28] text-[#0b302e]' : 'bg-[#0b302e] text-[#f6a44e]'}`}
        />
        <div className="min-w-0">
          <p className={`font-mono text-xs uppercase tracking-widest font-black ${dark ? 'text-[#8fb9aa]' : 'text-[#c2410c]'}`}>
            {person.role}
          </p>
          <h3 className="font-display text-2xl font-black tracking-tight leading-tight mt-1">{person.name || TBA}</h3>
        </div>
      </div>
      {person.quote && (
        <blockquote className={`mt-5 flex gap-3 text-sm font-medium leading-relaxed ${dark ? 'text-[#f4f0e8]/85' : 'text-[#0b302e]/80'}`}>
          <Quote className="w-5 h-5 shrink-0 text-[#f28c28] stroke-[2.5]" aria-hidden="true" />
          <p>{person.quote}</p>
        </blockquote>
      )}
    </motion.div>
  );
}

function TeamCard({ team, delay }: { team: StudentTeam; delay: number }) {
  const Icon = TEAM_ICONS[team.icon];
  const hasMembers = team.members.length > 0;

  return (
    <motion.div
      {...reveal(delay)}
      className="p-6 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] text-[#0b302e]"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border-2 bg-[#f28c28]/15 text-[#c2410c] border-[#f28c28]/40">
          <Icon className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-black leading-tight">{team.name}</h3>
          <p className="text-sm text-[#0b302e]/75 font-medium mt-1">{team.focus}</p>
        </div>
      </div>

      <ul className="mt-4 pt-4 border-t-2 border-[#0b302e]/10 space-y-2 text-sm font-semibold">
        {!team.lead && !hasMembers ? (
          <li className="text-[#0b302e]/60 font-medium">{TBA}</li>
        ) : (
          <>
            {team.lead && (
              <li className="flex items-center gap-2">
                {team.lead}
                {hasMembers && (
                  <span className="font-mono text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded-full bg-[#0b302e] text-[#f6a44e]">
                    Lead
                  </span>
                )}
              </li>
            )}
            {team.members.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </>
        )}
      </ul>
    </motion.div>
  );
}

// Organising committee: school leaders, the student teams, and the Design Department
export default function Committee() {
  const { leaders, studentTeams, design } = IGNITE_DATA.committee;
  const [designHead, ...designTeam] = design;

  return (
    <section className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            Organising Committee
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">The people bringing IGNITE to life.</p>
        </div>

        {/* Head of School and Secondary School Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {leaders.map((person, idx) => (
            <LeaderCard key={person.role} person={person} dark={idx === 0} delay={idx * 0.1} />
          ))}
        </div>

        {/* Student teams around the centre card (one column on phones) */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <motion.div
            {...reveal()}
            className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-center p-8 rounded-3xl bg-[#0b302e] text-[#f4f0e8] border-3 border-[#0b302e] shadow-[6px_6px_0px_#f28c28] text-center"
          >
            <Users className="w-10 h-10 mx-auto text-[#f6a44e] stroke-[2.5]" aria-hidden="true" />
            <h3 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight mt-4">
              Student Organising Committee
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest font-black text-[#8fb9aa] mt-4">
              Student leaders. Big ideas. Real impact.
            </p>
          </motion.div>

          {studentTeams.map((team, idx) => (
            <TeamCard key={team.name} team={team} delay={(idx % 2) * 0.1} />
          ))}
        </div>

        {/* Design Department: head, then facilitators */}
        {designHead && (
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl sm:text-4xl font-black text-[#0b302e] tracking-tight">Design Department</h3>
              <p className="font-mono text-xs uppercase tracking-widest font-black text-[#c2410c] mt-2">Design. Create. Make it happen.</p>
            </div>

            <motion.div
              {...reveal()}
              className="max-w-md mx-auto p-6 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#f28c28] flex items-center gap-4 text-[#0b302e]"
            >
              <span aria-hidden="true" className="w-14 h-14 shrink-0 rounded-2xl bg-[#0b302e] text-[#f6a44e] flex items-center justify-center">
                <Crown className="w-7 h-7 stroke-[2.5]" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-widest font-black text-[#c2410c]">{designHead.role}</p>
                <h4 className="font-display text-xl font-black leading-tight mt-1">{designHead.name || TBA}</h4>
              </div>
            </motion.div>

            {designTeam.length > 0 && (
              <>
                <div aria-hidden="true" className="w-[3px] h-10 bg-[#0b302e]/25 mx-auto" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {designTeam.map((person, idx) => (
                    <motion.div
                      key={`${person.role}-${idx}`}
                      {...reveal(idx * 0.1)}
                      className="p-6 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] flex items-center gap-4"
                    >
                      <Avatar name={person.name} className="w-14 h-14 rounded-2xl bg-[#0b302e] text-[#f6a44e] text-lg" />
                      <div className="min-w-0">
                        <h4 className="font-display text-lg font-black text-[#0b302e] leading-tight">{person.name || TBA}</h4>
                        <p className="text-sm text-[#0b302e]/75 font-medium mt-1">{person.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
