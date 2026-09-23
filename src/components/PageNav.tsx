import { Link, useLocation } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PAGES } from '../pages';

// Shown at the end of every page: previous / next page, plus all pages as buttons
export default function PageNav() {
  const { pathname } = useLocation();
  const index = Math.max(0, PAGES.findIndex((p) => p.path === pathname));
  const prev = PAGES[index - 1];
  const next = PAGES[index + 1];

  return (
    <nav
      aria-label="Page navigation"
      className="py-16 sm:py-20 bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Previous / Next */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {prev ? (
            <Link
              to={prev.path}
              className="group p-6 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[5px_5px_0px_#0b302e] hover:shadow-[8px_8px_0px_#f28c28] transition-shadow flex items-center gap-4"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#0b302e] text-[#f4f0e8] flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </span>
              <span className="text-left">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-[#0b302e]/60 font-bold">
                  Previous
                </span>
                <span className="block font-display text-xl font-black text-[#0b302e]">{prev.label}</span>
                <span className="block text-xs text-[#0b302e]/70 font-medium mt-0.5">{prev.blurb}</span>
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next && (
            <Link
              to={next.path}
              className="group p-6 rounded-3xl bg-[#0b302e] text-[#f4f0e8] border-3 border-[#0b302e] shadow-[5px_5px_0px_#f28c28] hover:shadow-[8px_8px_0px_#f28c28] transition-shadow flex items-center justify-end gap-4 sm:col-start-2"
            >
              <span className="text-right">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-[#8fb9aa] font-bold">
                  Next
                </span>
                <span className="block font-display text-xl font-black">{next.label}</span>
                <span className="block text-xs text-[#f4f0e8]/75 font-medium mt-0.5">{next.blurb}</span>
              </span>
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#f28c28] text-[#172220] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </span>
            </Link>
          )}
        </div>

        {/* All pages */}
        <div className="mt-10 text-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#0b302e]/60 font-bold">
            All pages
          </span>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {PAGES.map((page, i) => {
              const isCurrent = i === index;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`px-4 py-2 rounded-xl border-2 font-display text-xs sm:text-sm font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#0b302e] text-[#f4f0e8] border-[#0b302e] shadow-[3px_3px_0px_#f28c28]'
                      : 'bg-[#faf8f3] text-[#0b302e] border-[#0b302e]/20 hover:border-[#0b302e]'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60 mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                  {page.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
