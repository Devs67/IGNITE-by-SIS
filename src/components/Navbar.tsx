import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import IgniteLogo from './IgniteLogo';
import { PAGES } from '../pages';

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sliding active pill: it moves as soon as a link is clicked, and the page
  // changes a frame later, so the slide isn't held up by the new page rendering.
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(pathname);
  const [pill, setPill] = useState<{ x: number; width: number } | null>(null);
  const [pillReady, setPillReady] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => setActivePath(pathname), [pathname]);

  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activePath];
      setPill(el ? { x: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    // Re-measure when link sizes change (web fonts finishing loading, window resizes)
    const observer = new ResizeObserver(measure);
    Object.values(linkRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [activePath]);

  // Enable the slide transition only after the first placement (no slide-in on load)
  useEffect(() => {
    if (pill && !pillReady) requestAnimationFrame(() => setPillReady(true));
  }, [pill, pillReady]);

  const goTo = (e: React.MouseEvent, path: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // allow open-in-new-tab
    e.preventDefault();
    if (path === pathname) return;
    setActivePath(path);
    requestAnimationFrame(() => requestAnimationFrame(() => navigate(path)));
  };

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
          : 'bg-[#f4f0e8]/95 backdrop-blur-md border-b-2 border-[#0b302e]/10 py-4'
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
          <nav className="relative hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-display font-bold uppercase tracking-wide xl:tracking-wider text-[#0b302e]">
            {/* One pill that slides under the active link (transform runs on the compositor) */}
            {pill && (
              <span
                aria-hidden="true"
                className={`absolute top-0 left-0 h-full rounded-full bg-[#0b302e] shadow-[2px_2px_0px_#f28c28] ${
                  pillReady ? 'transition-[transform,width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]' : ''
                }`}
                style={{ transform: `translateX(${pill.x}px)`, width: pill.width }}
              />
            )}
            {PAGES.map((page) => {
              const isActive = page.path === activePath;
              return (
                <NavLink
                  key={page.path}
                  ref={(el) => {
                    linkRefs.current[page.path] = el;
                  }}
                  to={page.path}
                  end
                  onClick={(e) => goTo(e, page.path)}
                  className={`relative px-4 py-2 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f28c28] ${
                    isActive ? 'text-[#f4f0e8]' : 'text-[#0b302e] hover:bg-[#0b302e]/10'
                  }`}
                >
                  {page.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="ignite-btn-primary hidden sm:inline-flex !py-2.5 !px-5 text-xs font-display uppercase tracking-wider font-bold"
            >
              <span>Register Now</span>
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
                    `px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider rounded-full transition-colors ${isActive ? 'bg-[#0b302e] text-[#f4f0e8]' : 'text-[#0b302e] hover:bg-[#0b302e]/10'}`
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
                  <span>Register Now</span>
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
