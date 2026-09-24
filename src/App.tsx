import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsIgnite from './components/WhatIsIgnite';
import WhenAndWho from './components/WhenAndWho';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import ReadyToIgnite from './components/ReadyToIgnite';
import PageNav from './components/PageNav';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import { PAGES } from './pages';

// Other pages load their code only when visited, keeping the first load small
const IgniteStructure = lazy(() => import('./components/IgniteStructure'));
const OverarchingTheme = lazy(() => import('./components/OverarchingTheme'));
const IdeaToImpact = lazy(() => import('./components/IdeaToImpact'));
const ParticipantChecklist = lazy(() => import('./components/ParticipantChecklist'));
const FAQ = lazy(() => import('./components/FAQ'));

const meta = typeof document !== 'undefined' ? document.querySelector('meta[name="description"]') : null;

// On every page change: jump to the top and set the browser tab title and description
function PageChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const page = PAGES.find((p) => p.path === pathname) ?? PAGES[0];
    document.title = page.title;
    meta?.setAttribute('content', page.description);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);

  return (
    <BrowserRouter>
      <PageChange />
      <div className="min-h-screen bg-[#f4f0e8] text-[#172220] selection:bg-[#f28c28]/30 selection:text-[#0b302e] relative">
        {/* Global Navbar with uploaded logo */}
        <Navbar onOpenRegister={() => handleOpenRegister()} />

        <main>
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            {/* Home: overview, dates, who can take part, gallery, question form */}
            <Route
              path="/"
              element={
                <>
                  <Hero onOpenRegister={() => handleOpenRegister()} />
                  <WhatIsIgnite />
                  <WhenAndWho />
                  <ReadyToIgnite onOpenRegister={() => handleOpenRegister()} />
                  <Gallery />
                  <ContactForm standalone />
                </>
              }
            />

            {/* Challenges: structure, flow chart with expandable guides, theme */}
            <Route
              path="/challenges"
              element={
                <>
                  <IgniteStructure onSelectPathway={() => handleOpenRegister()} />
                  <OverarchingTheme />
                </>
              }
            />

            {/* Journey: innovation process and participant checklist */}
            <Route
              path="/journey"
              element={
                <>
                  <IdeaToImpact />
                  <ParticipantChecklist />
                </>
              }
            />

            <Route path="/gallery" element={<Gallery />} />
            <Route
              path="/faq"
              element={
                <>
                  <FAQ />
                  <ContactForm />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>

          {/* Previous / next page and all pages */}
          <PageNav />
        </main>

        {/* Footer with Logo, Tagline, Accreditations */}
        <Footer onOpenRegister={() => handleOpenRegister()} />

        {/* Team Registration (Google Form) */}
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
