import { ArrowUp, ArrowUpRight, Calendar, Instagram, Mail, MapPin } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import IgniteLogo from './IgniteLogo';
import { PAGES } from '../pages';
import { IGNITE_DATA } from '../data/igniteData';

interface FooterProps {
  onOpenRegister: () => void;
}

const heading = 'font-mono text-[11px] uppercase tracking-widest text-[#8fb9aa] font-bold mb-4';
const link = 'text-[#f4f0e8]/85 hover:text-[#f6a44e] transition-colors';

export default function Footer({ onOpenRegister }: FooterProps) {
  const { event, accreditations } = IGNITE_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t-2 border-[#0b302e] bg-[#172220] text-[#f4f0e8]/80 text-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1.2fr_1fr] gap-10 lg:gap-12 mb-14">
          {/* About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block p-5 rounded-3xl bg-[#faf8f3]" aria-label="Sreenidhi IGNITE home">
              <IgniteLogo variant="horizontal" className="h-24" />
            </Link>
            <p className="text-[#f4f0e8]/75 leading-relaxed max-w-xs">{event.definition}</p>
            <ul className="space-y-1.5 text-[#f6a44e] font-display font-bold">
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                {event.dates}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                {event.school}
              </li>
            </ul>
          </div>

          {/* Pages */}
          <nav aria-label="Footer">
            <h2 className={heading}>Pages</h2>
            <ul className="flex flex-wrap lg:flex-col gap-2">
              {PAGES.map((page) => (
                <li key={page.path} className="w-36">
                  <NavLink
                    to={page.path}
                    end
                    className={({ isActive }) =>
                      `block w-full text-center px-4 py-1.5 rounded-full border font-display text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'bg-[#f28c28] text-[#172220] border-[#f28c28]'
                          : 'bg-white/5 text-[#f4f0e8]/90 border-white/15 hover:bg-white/15 hover:border-white/30'
                      }`
                    }
                  >
                    {page.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="space-y-3.5">
              <li>
                <a href={`mailto:${event.contactEmail}`} className={`${link} flex items-center gap-2.5 break-all`}>
                  <Mail className="w-4 h-4 shrink-0 text-[#f6a44e]" aria-hidden="true" />
                  {event.contactEmail}
                </a>
              </li>
              <li>
                <a href={event.instagram} target="_blank" rel="noopener noreferrer" className={`${link} flex items-center gap-2.5`}>
                  <Instagram className="w-4 h-4 shrink-0 text-[#f6a44e]" aria-hidden="true" />
                  {event.instagramHandle}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#f6a44e]" aria-hidden="true" />
                <span>
                  <span className="block text-[#f4f0e8]/85 leading-relaxed">{event.address}</span>
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 font-bold text-[#f6a44e] hover:underline"
                  >
                    Get directions
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Register */}
          <div>
            <h2 className={heading}>Register</h2>
            <p className="text-[#f4f0e8]/85">
              <span className="block font-display text-lg font-black text-[#f4f0e8]">{event.registrationFee}</span>
              <span className="block mt-0.5">Prizes {event.prizeMoney.toLowerCase()}</span>
            </p>
            <button
              onClick={onOpenRegister}
              className="ignite-btn-primary mt-5 !py-2.5 !px-5 text-xs font-display font-bold uppercase tracking-wider"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#f4f0e8]/60 text-center md:text-left">
          <p>© 2026 Sreenidhi International School · Design Department</p>
          <p className="font-mono text-[11px] tracking-wider text-[#8fb9aa]/90">
            {accreditations.map((acc) => acc.label.replace(' Accredited', '')).join(' · ')}
          </p>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#f28c28] hover:text-[#172220] text-[#f4f0e8] border border-white/10 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
