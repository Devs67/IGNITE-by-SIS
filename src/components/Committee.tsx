import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Linkedin, Megaphone, Package, Quote, UserRound, Users, Wallet, Wrench, X } from 'lucide-react';
import { IGNITE_DATA, type Person, type StudentTeam } from '../data/igniteData';
import { initials } from './People';
import IgniteLogo from './IgniteLogo';

const TBA = 'To be announced';

const TEAM_ICONS: Record<StudentTeam['icon'], typeof Users> = {
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

function LeaderCard({ person, delay }: { person: Person; delay: number }) {
  return (
    <motion.div
      {...reveal(delay)}
      className="p-3 rounded-3xl border-3 border-[#0b302e] bg-[#b3d5c9] text-[#0b302e] shadow-[6px_6px_0px_#0b302e] flex gap-4"
    >
      {/* Photo fills the tile's height, with only a small gap to the edges */}
      {person.photo ? (
        <div className="relative w-32 min-h-32 sm:w-36 sm:min-h-36 shrink-0">
          <img
            src={person.photo}
            alt={person.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full rounded-2xl object-cover object-top border-3 border-[#0b302e]"
          />
        </div>
      ) : (
        <Avatar name={person.name} className="w-32 min-h-32 sm:w-36 sm:min-h-36 rounded-2xl text-3xl bg-[#0b302e] text-[#f6a44e]" />
      )}
      {/* Role on top, then the name, then the quote */}
      <div className="min-w-0 py-3 pr-4">
        <p className="font-mono text-xs uppercase tracking-widest font-black text-[#0b302e]/80">{person.role}</p>
        <h3 className="font-display text-2xl font-black tracking-tight leading-tight mt-1">{person.name || TBA}</h3>
        {person.quote && (
          <blockquote className="mt-3 flex gap-2 text-sm font-medium leading-relaxed text-[#0b302e]/85">
            <Quote className="w-4 h-4 shrink-0 mt-0.5 text-[#0b302e] stroke-[2.5]" aria-hidden="true" />
            <p>{person.quote}</p>
          </blockquote>
        )}
      </div>
    </motion.div>
  );
}

// What the popup shows: a heading and one or more people with a short description each
interface Profile {
  name: string;
  label: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
  mentoring?: string;
}

interface Popup {
  title: string;
  subtitle: string;
  people: Profile[];
}

// Clickable tile: lifts on hover, opens its popup on click or Enter/Space
const TILE =
  'relative rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] text-[#0b302e] cursor-pointer transition-[scale,translate,box-shadow] duration-200 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[9px_9px_0px_#f28c28] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f28c28]/60';

const opens = (onOpen: () => void) => ({
  role: 'button',
  tabIndex: 0,
  onClick: onOpen,
  onKeyDown: (e: ReactKeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  },
});

// Bottom row of a tile: says it opens, with an optional role tag on the left
function TileHint({ label, tag }: { label: string; tag?: string }) {
  return (
    <p className="mt-4 pt-3 border-t-2 border-[#0b302e]/10 flex items-center gap-1 text-xs font-bold text-[#0b302e]/70">
      {tag && (
        <span className="font-mono text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full bg-[#0b302e] text-[#f6a44e]">
          {tag}
        </span>
      )}
      <span className={tag ? 'ml-auto' : 'flex-1'}>{label}</span>
      <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
    </p>
  );
}

// Frosted-glass pill naming the student team a teacher mentors.
// The fixed corner radius keeps it a pill on one line and a tidy box if the name wraps.
function MentorPill({ team }: { team: string }) {
  return (
    <span className="inline-block font-mono text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-[14px] bg-white/55 text-[#0b302e] border border-[#0b302e]/20 shadow-[0_2px_8px_rgba(11,48,46,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]">
      Mentor · {team}
    </span>
  );
}

interface TileProps {
  tileRef: (el: HTMLDivElement | null) => void;
  onHover: (hovering: boolean) => void;
  onOpen: () => void;
}

// Popup with a fuller description of each person on the clicked tile
function ProfilePopup({ popup, onClose }: { popup: Popup; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const single = popup.people.length === 1;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0b302e]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={popup.title}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] rounded-3xl bg-[#faf8f3] text-[#0b302e] border-2 border-[#0b302e] shadow-[8px_8px_0px_#f28c28] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b-2 border-[#0b302e]/15 flex items-start justify-between gap-4 bg-[#f4f0e8]">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-black tracking-tight leading-tight">{popup.title}</h3>
            <p className="text-sm text-[#0b302e]/75 font-medium mt-1">{popup.subtitle}</p>
          </div>
          <button
            autoFocus
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl text-[#0b302e] hover:bg-[#f28c28] hover:text-[#172220] transition-colors border-2 border-[#0b302e]/20"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Several people: one column each (two across), picture on top, write-up below.
            One person: picture on the left, write-up on the right. */}
        <ul className={`overflow-y-auto p-6 grid grid-cols-1 gap-6 ${single ? '' : 'sm:grid-cols-2'}`}>
          {popup.people.map((person) => (
            <li key={person.name + person.label} className={single ? 'sm:flex sm:items-start sm:gap-6' : ''}>
              {person.photo ? (
                <img
                  src={person.photo}
                  alt=""
                  className={`w-full ${single ? 'h-72 sm:w-56 shrink-0' : 'h-44'} rounded-2xl object-cover object-top border-3 border-[#0b302e]`}
                />
              ) : (
                <Avatar
                  name={person.name}
                  className={`w-full ${single ? 'h-72 sm:w-56' : 'h-44'} rounded-2xl bg-[#0b302e] text-[#f6a44e] text-4xl`}
                />
              )}
              <div className={single ? 'mt-3 sm:mt-0 min-w-0' : 'mt-3'}>
                <p className="font-mono text-[11px] uppercase tracking-widest font-black text-[#c2410c]">{person.label}</p>
                <h4 className="font-display text-lg font-black leading-tight mt-0.5">{person.name || TBA}</h4>
                {person.mentoring && (
                  <p className="mt-2">
                    <MentorPill team={person.mentoring} />
                  </p>
                )}
                {person.bio ? (
                  person.bio.split('\n\n').map((paragraph) => (
                    <p key={paragraph} className="mt-2 text-sm font-medium leading-relaxed text-[#0b302e]/85">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#0b302e]/55">Details coming soon.</p>
                )}
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm font-bold underline decoration-[#f28c28] decoration-2 underline-offset-4"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// Event coordinators: one tile above the wheel, one student on each side
function CoordinatorsCard({ people, tileRef, onHover, onOpen }: TileProps & { people: Person[] }) {
  return (
    <motion.div
      {...reveal(0.2)}
      {...opens(onOpen)}
      ref={tileRef}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`max-w-3xl mx-auto p-5 ${TILE}`}
    >
      <p className="text-center">
        <span className="inline-block font-mono text-[11px] uppercase tracking-widest font-black px-3 py-1 rounded-full bg-[#0b302e] text-[#f6a44e]">
          Event Coordinators
        </span>
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 md:divide-x-2 md:divide-[#0b302e]/10">
        {people.map((person, idx) => (
          <div
            key={person.role}
            className={`flex items-center gap-3.5 ${idx % 2 ? 'md:flex-row-reverse md:text-right md:pl-5' : 'md:pr-5'}`}
          >
            {person.photo ? (
              <img
                src={person.photo}
                alt={person.name}
                loading="lazy"
                className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl object-cover object-top border-3 border-[#0b302e]"
              />
            ) : (
              <Avatar name={person.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0b302e] text-[#f6a44e] text-xl" />
            )}
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-widest font-black text-[#c2410c]">{person.role}</p>
              <h3 className="font-display text-lg font-black tracking-tight leading-tight mt-0.5">{person.name || TBA}</h3>
              {person.grade && (
                <span className="inline-block mt-1.5 font-mono text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-[#0b302e]/10">
                  {person.grade}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <TileHint label="About the coordinators" />
    </motion.div>
  );
}

// Design Department card: photo or initials, name, the team they mentor and an optional
// LinkedIn link, with the role tag in the About row. Clicking it opens the popup.
function DesignCard({ person, head, delay, onOpen }: { person: Person; head: boolean; delay: number; onOpen: () => void }) {
  return (
    <motion.div {...reveal(delay)} {...opens(onOpen)} className={`p-6 sm:p-7 flex flex-col ${TILE}`}>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-4">
          {person.photo ? (
            <img
              src={person.photo}
              alt={person.name}
              loading="lazy"
              className="w-20 h-20 shrink-0 rounded-2xl object-cover object-top border-2 border-[#0b302e]"
            />
          ) : (
            <Avatar name={person.name} className="w-20 h-20 rounded-2xl bg-[#0b302e] text-[#f6a44e] text-xl" />
          )}
          <div className="min-w-0 flex-1">
            <h4 className={`font-display font-black leading-tight ${head ? 'text-2xl' : 'text-xl'}`}>{person.name || TBA}</h4>
            {person.mentoring && (
              <p className="mt-2">
                <MentorPill team={person.mentoring} />
              </p>
            )}
          </div>
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="shrink-0 w-11 h-11 rounded-xl border-2 border-[#0b302e] flex items-center justify-center hover:bg-[#f28c28] transition-colors"
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
            </a>
          )}
        </div>
        {/* A line from their write-up, across the full width of the card */}
        {person.quote && (
          <blockquote className="mt-4 flex gap-2 text-sm font-medium leading-relaxed text-[#0b302e]/85">
            <Quote className="w-4 h-4 shrink-0 mt-0.5 text-[#c2410c] stroke-[2.5]" aria-hidden="true" />
            <p>{person.quote}</p>
          </blockquote>
        )}
      </div>
      <TileHint label="About" tag={person.role} />
    </motion.div>
  );
}

interface TeamCardProps extends TileProps {
  team: StudentTeam;
  delay: number;
  className: string;
}

function TeamCard({ team, delay, className, tileRef, onHover, onOpen }: TeamCardProps) {
  const Icon = TEAM_ICONS[team.icon];

  return (
    <motion.div
      {...reveal(delay)}
      {...opens(onOpen)}
      ref={tileRef}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`p-6 ${TILE} ${className}`}
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

      <ul className="mt-4 pt-4 border-t-2 border-[#0b302e]/10 space-y-2.5 text-sm font-semibold">
        {team.members.length === 0 ? (
          <li className="text-[#0b302e]/60 font-medium">{TBA}</li>
        ) : (
          team.members.map((member) => (
            <li key={member.name} className="flex items-center gap-3">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt=""
                  loading="lazy"
                  className="w-10 h-10 shrink-0 rounded-xl object-cover object-top border-2 border-[#0b302e]"
                />
              ) : (
                <Avatar name={member.name} className="w-10 h-10 rounded-xl bg-[#0b302e] text-[#f6a44e] text-xs" />
              )}
              <span className="flex-1 min-w-0">{member.name}</span>
              {member.grade && (
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-[#0b302e]/10 text-[#0b302e]">
                  {member.grade}
                </span>
              )}
            </li>
          ))
        )}
      </ul>
      <TileHint label="About the team" />
    </motion.div>
  );
}

interface Wheel {
  cx: number;
  cy: number;
  ring: number;
  ends: { x: number; y: number }[];
}

// Rows the centre circle spans: one per pair of tiles beside it
const CENTRE_ROWS = ['lg:row-span-1', 'lg:row-span-1', 'lg:row-span-2', 'lg:row-span-3', 'lg:row-span-4'];

// The student committee: coordinators tile on top, then the teams around the centre
// circle. Every tile is joined to the circle by a line that glows while the tile is
// hovered. Teams sit in pairs either side; an odd last team goes below the circle.
// Below the lg breakpoint there are no lines and the tiles simply stack.
interface StudentCommitteeProps {
  coordinators: Person[];
  teams: StudentTeam[];
  onOpen: (popup: Popup) => void;
}

function StudentCommittee({ coordinators, teams, onOpen }: StudentCommitteeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const centreRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [wheel, setWheel] = useState<Wheel | null>(null);

  // Work out where the lines run, and again whenever the layout changes size
  useEffect(() => {
    const wrap = wrapRef.current;
    const centre = centreRef.current;
    if (!wrap || !centre) return;
    const measure = () => {
      const cx = centre.offsetLeft + centre.offsetWidth / 2;
      const cy = centre.offsetTop + centre.offsetHeight / 2;
      setWheel({
        cx,
        cy,
        ring: centre.offsetWidth / 2 + 18,
        // Each line ends at the middle of the tile edge that faces the centre
        ends: tileRefs.current.map((tile) => {
          if (!tile) return { x: cx, y: cy };
          const right = tile.offsetLeft + tile.offsetWidth;
          // Tile above or below the circle: join its bottom or top edge
          if (tile.offsetLeft < cx && cx < right) {
            return { x: cx, y: tile.offsetTop < cy ? tile.offsetTop + tile.offsetHeight : tile.offsetTop };
          }
          return { x: right < cx ? right : tile.offsetLeft, y: tile.offsetTop + tile.offsetHeight / 2 };
        }),
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  const oddLast = teams.length % 2 === 1;
  const studentCount = coordinators.length + teams.reduce((sum, team) => sum + team.members.length, 0);
  // Line 0 belongs to the coordinators tile, lines 1+ to the teams
  const tile = (idx: number, popup: Popup): TileProps => ({
    tileRef: (el) => {
      tileRefs.current[idx] = el;
    },
    onHover: (hovering) => setHovered(hovering ? idx : null),
    onOpen: () => onOpen(popup),
  });
  const coordinatorsPopup: Popup = {
    title: 'Event Coordinators',
    subtitle: 'Lead the plan and keep both days on schedule',
    people: coordinators.map((person) => ({
      ...person,
      label: [person.role, person.grade].filter(Boolean).join(' · '),
    })),
  };

  return (
    <div ref={wrapRef} className="relative mt-6 max-w-6xl mx-auto">
      {wheel && (
        <svg aria-hidden="true" className="hidden lg:block absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          <circle cx={wheel.cx} cy={wheel.cy} r={wheel.ring} fill="none" stroke="#0b302e" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="5 7" />
          {wheel.ends.map((end, idx) => {
            const active = hovered === idx;
            const length = Math.hypot(end.x - wheel.cx, end.y - wheel.cy) || 1;
            // Where this line crosses the dashed ring
            const dotX = wheel.cx + ((end.x - wheel.cx) / length) * wheel.ring;
            const dotY = wheel.cy + ((end.y - wheel.cy) / length) * wheel.ring;
            return (
              <g
                key={idx}
                className="transition-all duration-200"
                style={{ filter: active ? 'drop-shadow(0 0 6px #f28c28)' : 'none' }}
              >
                <line
                  x1={wheel.cx}
                  y1={wheel.cy}
                  x2={end.x}
                  y2={end.y}
                  className="transition-all duration-200"
                  stroke={active ? '#f28c28' : '#0b302e'}
                  strokeOpacity={active ? 1 : 0.3}
                  strokeWidth={active ? 4 : 2}
                  strokeDasharray={active ? undefined : '5 7'}
                  strokeLinecap="round"
                />
                <circle
                  cx={dotX}
                  cy={dotY}
                  r={active ? 7 : 5}
                  className="transition-all duration-200"
                  fill={active ? '#f28c28' : '#8fb9aa'}
                  stroke="#0b302e"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>
      )}

      <CoordinatorsCard people={coordinators} {...tile(0, coordinatorsPopup)} />

      <div className="mt-6 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-14">
        <motion.div
          {...reveal()}
          ref={centreRef}
          className={`relative sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 ${CENTRE_ROWS[Math.floor(teams.length / 2)]} lg:place-self-center lg:w-72 lg:h-72 xl:w-80 xl:h-80 lg:rounded-full p-8 lg:p-6 rounded-3xl bg-[#0b302e] text-[#f4f0e8] border-3 border-[#0b302e] shadow-[6px_6px_0px_#f28c28] text-center flex flex-col items-center justify-center`}
        >
          <span className="inline-block p-3 lg:p-2.5 rounded-2xl bg-[#faf8f3]">
            <IgniteLogo variant="horizontal" className="h-14 lg:h-11 xl:h-12" />
          </span>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-2xl font-black tracking-tight leading-tight mt-4 lg:mt-3">
            Student Organising Committee
          </h3>
          <p className="font-mono text-xs lg:text-[10px] uppercase tracking-widest font-black text-[#8fb9aa] mt-4 lg:mt-2">
            Student leaders. Big ideas. Real impact.
          </p>
          <p className="text-xs font-medium text-[#f4f0e8]/70 mt-2 lg:mt-1.5">
            {teams.length} teams · {studentCount} students
          </p>
        </motion.div>

        {teams.map((team, idx) => (
          <TeamCard
            key={team.name}
            team={team}
            delay={(idx % 2) * 0.1}
            className={oddLast && idx === teams.length - 1 ? 'lg:col-start-2' : ''}
            {...tile(idx + 1, {
              title: team.name,
              subtitle: team.focus,
              people: team.members.map((member) => ({ ...member, label: member.grade })),
            })}
          />
        ))}
      </div>
    </div>
  );
}

// Team page: school leaders, the student teams, and the Design Department
export default function Committee() {
  const { leaders, coordinators, studentTeams, design } = IGNITE_DATA.committee;
  const [designHead, ...designTeam] = design;
  const [popup, setPopup] = useState<Popup | null>(null);
  const designPopup = (person: Person): Popup => ({
    title: 'Design Department',
    subtitle: 'Design. Create. Make it happen.',
    people: [{ ...person, label: person.role }],
  });

  return (
    <section className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            Meet the Team
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">The people bringing IGNITE to life.</p>
        </div>

        {/* Head of School and Secondary School Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {leaders.map((person, idx) => (
            <LeaderCard key={person.role} person={person} delay={idx * 0.1} />
          ))}
        </div>

        <StudentCommittee coordinators={coordinators} teams={studentTeams} onOpen={setPopup} />

        {/* Design Department: head across the top, facilitators below */}
        {designHead && (
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl sm:text-4xl font-black text-[#0b302e] tracking-tight">Design Department</h3>
              <p className="font-mono text-xs uppercase tracking-widest font-black text-[#c2410c] mt-2">Design. Create. Make it happen.</p>
            </div>

            <DesignCard person={designHead} head delay={0} onOpen={() => setPopup(designPopup(designHead))} />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {designTeam.map((person, idx) => (
                <DesignCard
                  key={`${person.role}-${idx}`}
                  person={person}
                  head={false}
                  delay={idx * 0.1}
                  onOpen={() => setPopup(designPopup(person))}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {popup && <ProfilePopup popup={popup} onClose={() => setPopup(null)} />}
    </section>
  );
}
