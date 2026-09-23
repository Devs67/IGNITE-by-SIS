import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsIgnite from './components/WhatIsIgnite';
import WhenAndWho from './components/WhenAndWho';
import IgniteStructure from './components/IgniteStructure';
import OverarchingTheme from './components/OverarchingTheme';
import ChallengesDetailSection, { type PathwayFilter } from './components/ChallengesDetailSection';
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

  // Flow chart (in IGNITE Structure) drives the filters in the Challenges section
  const [activeFilter, setActiveFilter] = useState<PathwayFilter>('all');
  const [highlightedPathwayId, setHighlightedPathwayId] = useState<string | null>(null);

  const handleFlowChartSelect = (filter: PathwayFilter, pathwayId?: string) => {
    setActiveFilter(filter);
    setHighlightedPathwayId(pathwayId ?? null);
    // Smooth scroll to the specific card, or to the challenges section
    setTimeout(() => {
      const el = document.getElementById(pathwayId ? `pathway-card-${pathwayId}` : 'challenges');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: pathwayId ? 'center' : 'start' });
      }
    }, 100);
  };

  return (
    <BrowserRouter>
      <PageChange />
      <div className="min-h-screen bg-[#f4f0e8] text-[#172220] selection:bg-[#f28c28]/30 selection:text-[#0b302e] relative">
        {/* Global Navbar with uploaded logo */}
        <Navbar onOpenRegister={() => handleOpenRegister()} />

        <main>
          <Routes>
            {/* Home: overview, dates, who can take part */}
            <Route
              path="/"
              element={
                <>
                  <Hero onOpenRegister={() => handleOpenRegister()} />
                  <WhatIsIgnite />
                  <WhenAndWho />
                  <ReadyToIgnite onOpenRegister={() => handleOpenRegister()} />
                </>
              }
            />

            {/* Challenges: structure, flow chart, challenge guides, theme */}
            <Route
              path="/challenges"
              element={
                <>
                  <IgniteStructure
                    activePathwayId={highlightedPathwayId}
                    onSelectNode={handleFlowChartSelect}
                  >
                    {/* Junior & Senior Challenge guides */}
                    <ChallengesDetailSection
                      onRegisterPathway={() => handleOpenRegister()}
                      activeFilter={activeFilter}
                      setActiveFilter={setActiveFilter}
                      highlightedPathwayId={highlightedPathwayId}
                      setHighlightedPathwayId={setHighlightedPathwayId}
                    />
                  </IgniteStructure>
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
