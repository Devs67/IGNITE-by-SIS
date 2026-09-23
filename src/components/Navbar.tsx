import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, NavLink } from 'react-router';
import IgniteLogo from './IgniteLogo';
import { PAGES } from '../pages';

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f4f0e8]/95 backdrop-blur-md border-b-2 border-[#0b302e]/15 shadow-sm py-2.5'
          : 'bg-[#f4f0e8]/60 backdrop-blur-xs py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with uploaded branding */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f28c28] rounded-lg"
          >
            <IgniteLogo variant="horizontal" className="h-12" />
          </Link>

          {/* Page links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 text-xs font-display font-bold uppercase tracking-wide xl:tracking-wider text-[#0b302e]">
            {PAGES.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                end
                className={({ isActive }) =>
                  `${isActive ? 'text-[#f28c28]' : 'text-[#0b302e]/85'} hover:text-[#f28c28] transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f28c28] rounded`
                }
              >
                {page.label}
              </NavLink>
            ))}
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="ignite-btn-primary hidden sm:inline-flex !py-2.5 !px-5 text-xs font-display uppercase tracking-wider font-bold"
            >
              <span>Ready to Ignite?</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0b302e] hover:text-[#f28c28] hover:bg-[#0b302e]/5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f28c28]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b-2 border-[#0b302e]/15 bg-[#faf8f3] px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-2.5">
              {PAGES.map((page) => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 text-xs font-display font-bold uppercase tracking-wider ${isActive ? 'text-[#f28c28] bg-[#0b302e]/5' : 'text-[#0b302e]'} hover:text-[#f28c28] hover:bg-[#0b302e]/5 rounded-lg transition-colors`
                  }
                >
                  {page.label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-[#0b302e]/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full ignite-btn-primary !py-3 text-xs uppercase font-bold"
                >
                  <span>Ready to Ignite?</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
