import { useEffect, useRef, useState } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { IGNITE_DATA } from '../data/igniteData';
import identifyWebm from '../assets/videos/identify.webm';
import identifyMp4 from '../assets/videos/identify.mp4';
import ideateWebm from '../assets/videos/ideate.webm';
import ideateMp4 from '../assets/videos/ideate.mp4';
import designWebm from '../assets/videos/design.webm';
import designMp4 from '../assets/videos/design.mp4';
import createWebm from '../assets/videos/create.webm';
import createMp4 from '../assets/videos/create.mp4';
import testWebm from '../assets/videos/test.webm';
import testMp4 from '../assets/videos/test.mp4';
import presentWebm from '../assets/videos/present.webm';
import presentMp4 from '../assets/videos/present.mp4';

// Looping icon video: plays while on screen, pauses when scrolled away
function IconVideo({ webm, mp4 }: { webm: string; mp4: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React doesn't set the `muted` attribute, which browsers require for autoplay
    el.muted = true;
    el.setAttribute('muted', '');
    let visible = false;
    const playIfVisible = () => {
      if (visible) el.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) playIfVisible();
      else el.pause();
    });
    observer.observe(el);
    // Retry once the video has loaded, in case it came into view first
    el.addEventListener('canplay', playIfVisible);
    return () => {
      observer.disconnect();
      el.removeEventListener('canplay', playIfVisible);
    };
  }, []);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="w-full h-full object-cover"
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}

export default function IdeaToImpact() {
  const { journey } = IGNITE_DATA;
  const [activeStep, setActiveStep] = useState<string>('01');

  const getStepIcon = (num: string) => {
    switch (num) {
      case '01':
        return <IconVideo webm={identifyWebm} mp4={identifyMp4} />;
      case '02':
        return <IconVideo webm={ideateWebm} mp4={ideateMp4} />;
      case '03':
        return <IconVideo webm={designWebm} mp4={designMp4} />;
      case '04':
        return <IconVideo webm={createWebm} mp4={createMp4} />;
      case '05':
        return <IconVideo webm={testWebm} mp4={testMp4} />;
      case '06':
        return <IconVideo webm={presentWebm} mp4={presentMp4} />;
      default:
        return <Lightbulb className="w-8 h-8 stroke-[2.5]" />;
    }
  };

  const getStepDetails = (num: string) => {
    switch (num) {
      case '01':
        return {
          desc: 'Empathize with end users, observe everyday pain points, and pinpoint a clear, authentic problem worth solving.',
          deliverable: 'Problem Statement & Needs Assessment',
        };
      case '02':
        return {
          desc: 'Brainstorm unconstrained solutions, combine divergent perspectives, and map high-impact possibilities.',
          deliverable: 'Concept Mindmap & Initial Sketches',
        };
      case '03':
        return {
          desc: 'Draft wireframes, architectural blueprints, mechanical CAD models, and user workflow diagrams.',
          deliverable: 'Schematics, CAD / Wireframe Blueprints',
        };
      case '04':
        return {
          desc: 'Sprint through development and fabrication: write code, assemble hardware, calibrate kinetic components.',
          deliverable: 'Working Prototype / Functional Beta',
        };
      case '05':
        return {
          desc: 'Subject the build to iterative trials, identify edge cases, stress-test under real conditions, and refine.',
          deliverable: 'Trial Logs & Performance Tweaks',
        };
      case '06':
        return {
          desc: 'Demonstrate the tangible value, articulate the engineering logic, and inspire the jury with storytelling.',
          deliverable: 'Live Stage Pitch & Demonstration',
        };
      default:
        return {
          desc: 'Execute innovation step.',
          deliverable: 'Milestone achievement',
        };
    }
  };

  return (
    <section id="idea-to-impact" className="py-24 sm:py-32 relative bg-[#f4f0e8] border-t-2 border-[#0b302e]/10 text-[#172220] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            From Idea to Impact
          </h2>
          <p className="text-base sm:text-xl text-[#0b302e]/80 mt-3 font-medium">
            Identify a challenge, explore ideas, design your solution, build and test it, refine your work, and present your final creation with impact.
          </p>
        </div>

        {/* 6 Step Interactive Journey Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 max-w-6xl mx-auto mb-10">
          {journey.map((step, idx) => {
            const isTeal = idx % 2 === 0;
            const isSelected = activeStep === step.num;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => setActiveStep(step.num)}
                className={`p-5 sm:p-6 rounded-3xl cursor-pointer border-3 transition-all duration-300 text-center flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-[#0b302e] text-[#f4f0e8] border-[#0b302e] shadow-[8px_8px_0px_#f28c28]'
                    : 'bg-[#faf8f3] text-[#172220] border-[#0b302e] shadow-[4px_4px_0px_#0b302e] hover:shadow-[7px_7px_0px_#0b302e]'
                }`}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-lg ${
                        isSelected
                          ? 'bg-[#f28c28] text-[#172220]'
                          : isTeal
                          ? 'bg-[#0b302e] text-[#f4f0e8]'
                          : 'bg-[#f28c28] text-[#172220]'
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#f6a44e] animate-ping' : 'bg-transparent'}`} />
                  </div>

                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex items-center justify-center mb-4 mx-auto border-2 transition-transform duration-300 group-hover:scale-110 ${
                      isSelected
                        ? 'bg-white/10 text-[#f6a44e] border-white/20'
                        : isTeal
                        ? 'bg-[#0b302e]/10 text-[#0b302e] border-[#0b302e]/20'
                        : 'bg-[#f28c28]/15 text-[#f28c28] border-[#f28c28]/30'
                    }`}
                  >
                    {getStepIcon(step.num)}
                  </div>
                </div>

                <h3 className={`text-sm sm:text-base font-display font-black leading-tight ${isSelected ? 'text-white' : 'text-[#0b302e]'}`}>
                  {step.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Step Deep Dive Card */}
        {(() => {
          const current = journey.find((s) => s.num === activeStep) || journey[0];
          const details = getStepDetails(current.num);
          return (
            <motion.div
              key={current.num}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[6px_6px_0px_#0b302e] flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#0b302e] text-[#f6a44e] flex items-center justify-center shrink-0 shadow-md">
                  {getStepIcon(current.num)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-[#c2410c] uppercase">
                      Stage {current.num} Focus
                    </span>
                    <span className="text-xs font-bold text-[#0b302e]/40">·</span>
                    <span className="font-display text-xs font-extrabold text-[#0b302e]">
                      Official Framework
                    </span>
                  </div>
                  <h4 className="text-xl font-display font-black text-[#0b302e]">
                    {current.title} Phase
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0b302e]/80 mt-1 font-medium max-w-xl">
                    {details.desc}
                  </p>
                </div>
              </div>

              <div className="sm:text-right shrink-0 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#0b302e]/10">
                <span className="font-mono text-[10px] uppercase font-bold text-[#0b302e]/80 block mb-1">
                  Primary Milestone
                </span>
                <span className="inline-block px-3.5 py-1.5 rounded-xl bg-[#f28c28]/20 border border-[#f28c28]/40 font-display text-xs font-black text-[#9a3412]">
                  {details.deliverable}
                </span>
              </div>
            </motion.div>
          );
        })()}

      </div>
    </section>
  );
}
