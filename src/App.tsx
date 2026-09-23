import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsIgnite from './components/WhatIsIgnite';
import WhenAndWho from './components/WhenAndWho';
import IgniteStructure from './components/IgniteStructure';
import OverarchingTheme from './components/OverarchingTheme';
import ChallengesDetailSection, { type PathwayFilter } from './components/ChallengesDetailSection';
import IdeaToImpact from './components/IdeaToImpact';
import ParticipantChecklist from './components/ParticipantChecklist';
import FAQ from './components/FAQ';
import ReadyToIgnite from './components/ReadyToIgnite';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPathwayId, setSelectedPathwayId] = useState('junior-hackathon');

  const handleOpenRegister = (pathwayId?: string) => {
    if (pathwayId) {
      setSelectedPathwayId(pathwayId);
    }
    setIsRegisterOpen(true);
  };

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
    <div className="min-h-screen bg-[#f4f0e8] text-[#172220] selection:bg-[#f28c28]/30 selection:text-[#0b302e] relative">
      {/* Global Navbar with uploaded logo */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Content strictly following Pages 1 through 10 of the attached document */}
      <main>
        {/* Page 1 & Overview: Hero with Logo, Title, Dates, School, Accreditations */}
        <Hero onOpenRegister={() => handleOpenRegister()} />

        {/* Page 2: What is IGNITE? (Definition, Hackathon & Makeathon) */}
        <WhatIsIgnite />

        {/* Page 3: When & Who? (Event Flow, Categories, Grade Levels, Themes) */}
        <WhenAndWho />

        {/* Page 4: IGNITE Structure (4 Challenge Pathways) */}
        <IgniteStructure
          onSelectPathway={(id) => handleOpenRegister(id)}
          activePathwayId={highlightedPathwayId}
          onSelectNode={handleFlowChartSelect}
        />

        {/* Page 5: Overarching Theme (Engage, Challenge, Connect) */}
        <OverarchingTheme />

        {/* Pages 6 & 7: Junior & Senior Challenges Details */}
        <ChallengesDetailSection
          onRegisterPathway={(id) => handleOpenRegister(id)}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          highlightedPathwayId={highlightedPathwayId}
          setHighlightedPathwayId={setHighlightedPathwayId}
        />

        {/* Page 8: From Idea to Impact (6-Step Innovation Journey) */}
        <IdeaToImpact />

        {/* Page 9: Participant Checklist (Before IGNITE & At IGNITE) */}
        <ParticipantChecklist />

        {/* FAQs */}
        <FAQ />

        {/* Page 10: Ready to ignite? (Final Call to Action) */}
        <ReadyToIgnite onOpenRegister={() => handleOpenRegister()} />
      </main>

      {/* Footer with Logo, Tagline, Accreditations */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Team Registration & Official Pass Generation */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        defaultPathwayId={selectedPathwayId}
      />
    </div>
  );
}
