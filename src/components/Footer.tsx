import { ArrowUp } from 'lucide-react';
import IgniteLogo from './IgniteLogo';
import { IGNITE_DATA } from '../data/igniteData';

interface FooterProps {
  onOpenRegister: () => void;
}

export default function Footer({ onOpenRegister }: FooterProps) {
  const { event, accreditations } = IGNITE_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t-2 border-[#0b302e] bg-[#172220] text-[#f4f0e8]/80 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Official Logo & Event Statement */}
          <div className="md:col-span-2 space-y-4">
            <div className="inline-block p-4 rounded-2xl bg-[#faf8f3]">
              <IgniteLogo variant="horizontal" className="h-10" />
            </div>

            <p className="text-xs text-[#f4f0e8]/75 max-w-sm leading-relaxed font-medium">
              {event.definition}
            </p>

            <div className="pt-2 text-[11px] text-[#f6a44e] font-display font-extrabold uppercase tracking-widest">
              {event.dates} · {event.school}
            </div>

            {/* Accreditations Strip from Page 1 */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              {accreditations.map((acc, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#8fb9aa]"
                >
                  {acc.label}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Document Navigation */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#8fb9aa] font-bold mb-3">
              Document Sections
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#what-is-ignite" className="hover:text-[#f6a44e] transition-colors">
                  What is IGNITE?
                </a>
              </li>
              <li>
                <a href="#when-and-who" className="hover:text-[#f6a44e] transition-colors">
                  When & Who? (Event Flow)
                </a>
              </li>
              <li>
                <a href="#structure" className="hover:text-[#f6a44e] transition-colors">
                  IGNITE Structure (4 Pathways)
                </a>
              </li>
              <li>
                <a href="#theme" className="hover:text-[#f6a44e] transition-colors">
                  Overarching Theme
                </a>
              </li>
              <li>
                <a href="#challenges" className="hover:text-[#f6a44e] transition-colors">
                  Junior & Senior Challenges
                </a>
              </li>
              <li>
                <a href="#idea-to-impact" className="hover:text-[#f6a44e] transition-colors">
                  From Idea to Impact
                </a>
              </li>
              <li>
                <a href="#checklist" className="hover:text-[#f6a44e] transition-colors">
                  Participant Checklist
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Take Part & Action */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#8fb9aa] font-bold mb-3">
              Participation
            </h4>
            <div className="space-y-3">
              <button
                onClick={onOpenRegister}
                className="ignite-btn-primary !py-2.5 !px-5 text-xs font-display font-bold uppercase tracking-wider block"
              >
                Ready to Ignite?
              </button>
              <p className="text-[11px] text-[#f4f0e8]/60 font-medium">
                "Turn your ideas into something that engages, challenges, and connects."
              </p>
              <div className="text-[11px] text-[#8fb9aa] font-mono font-semibold pt-2">
                Venue: Sreenidhi International School
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-[#f4f0e8]/50">
            © 2026 Sreenidhi International School. Sreenidhi IGNITE 2026-27.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-[#f6a44e] font-display font-bold tracking-widest uppercase">
              KINDLE THE INNOVATION WITHIN
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#f28c28] hover:text-[#172220] text-[#f4f0e8] border border-white/10 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
