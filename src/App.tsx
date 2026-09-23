import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsIgnite from './components/WhatIsIgnite';
import WhenAndWho from './components/WhenAndWho';
import IgniteStructure from './components/IgniteStructure';
import OverarchingTheme from './components/OverarchingTheme';
import IdeaToImpact from './components/IdeaToImpact';
import Gallery from './components/Gallery';
import ParticipantChecklist from './components/ParticipantChecklist';
import FAQ from './components/FAQ';
import ReadyToIgnite from './components/ReadyToIgnite';
import PageNav from './components/PageNav';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import { PAGES } from './pages';

// On every page change: jump to the top and set the browser tab title
function PageChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = (PAGES.find((p) => p.path === pathname) ?? PAGES[0]).title;
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
          <Routes>
            {/* Home: overview, dates, who can take part, gallery */}
            <Route
              path="/"
              element={
                <>
                  <Hero onOpenRegister={() => handleOpenRegister()} />
                  <WhatIsIgnite />
                  <WhenAndWho />
                  <ReadyToIgnite onOpenRegister={() => handleOpenRegister()} />
                  <Gallery />
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
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

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
