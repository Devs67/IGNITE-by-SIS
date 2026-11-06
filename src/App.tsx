import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsIgnite from './components/WhatIsIgnite';
import WhenAndWho from './components/WhenAndWho';
import Gallery from './components/Gallery';
import Winners from './components/Winners';
import ReadyToIgnite from './components/ReadyToIgnite';
import PageNav from './components/PageNav';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import IgniteStructure from './components/IgniteStructure';
import WelcomePopup from './components/WelcomePopup';
import EventFlow from './components/EventFlow';
import { PAGES } from './pages';
import { IGNITE_DATA } from './data/igniteData';

// Other pages load their code only when visited, keeping the first load small
const OverarchingTheme = lazy(() => import('./components/OverarchingTheme'));
const IdeaToImpact = lazy(() => import('./components/IdeaToImpact'));
const ParticipantChecklist = lazy(() => import('./components/ParticipantChecklist'));
const FAQ = lazy(() => import('./components/FAQ'));
const People = lazy(() => import('./components/People'));
const Committee = lazy(() => import('./components/Committee'));
const AiPolicy = lazy(() => import('./components/AiPolicy'));
const Rubrics = lazy(() => import('./components/Rubrics'));

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
            {/* Home: welcome popup, event flow, flow chart, register / wrap-up, winners, overview, dates, who can take part, gallery */}
            <Route
              path="/"
              element={
                <>
                  <WelcomePopup />
                  <Hero onOpenRegister={() => handleOpenRegister()} />
                  <EventFlow />
                  <IgniteStructure onSelectPathway={() => handleOpenRegister()} />
                  <ReadyToIgnite onOpenRegister={() => handleOpenRegister()} />
                  {IGNITE_DATA.event.wrapped && <Winners />}
                  <WhatIsIgnite />
                  <WhenAndWho />
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

            <Route path="/ai-policy" element={<AiPolicy />} />
            <Route path="/rubrics" element={<Rubrics />} />
            <Route
              path="/gallery"
              element={
                <>
                  {IGNITE_DATA.event.wrapped && <Winners />}
                  <Gallery />
                </>
              }
            />
            <Route path="/team" element={<Committee />} />
            {/* Old address of the Team page */}
            <Route path="/committee" element={<Navigate to="/team" replace />} />
            <Route
              path="/judges"
              element={
                <People
                  title="Judges"
                  intro="The experts who will review and score every team's work."
                  people={IGNITE_DATA.judges}
                />
              }
            />
            <Route path="/faq" element={<FAQ />} />
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
