import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion } from 'motion/react';

// Thumbnails (1000px) for the grid, large (2000px) versions for the full-screen viewer
const thumbs = import.meta.glob<string>('../assets/images/gallery/*.webp', { eager: true, import: 'default' });
const larges = import.meta.glob<string>('../assets/images/gallery/large/*.webp', { eager: true, import: 'default' });
const thumb = (name: string) => thumbs[`../assets/images/gallery/${name}.webp`];
const large = (name: string) => larges[`../assets/images/gallery/large/${name}.webp`];

const photos = [
  { name: 'welcome-to-ignite', caption: 'Welcome to IGNITE', span: 'col-span-2 row-span-2' },
  { name: 'student-hosts', caption: 'Student hosts on stage', span: '' },
  { name: 'arrival-check-in', caption: 'Arrival & check-in', span: '' },
  { name: 'prototyping-on-paper', caption: 'Prototyping on paper', span: '' },
  { name: 'building-together', caption: 'Building together', span: '' },
  { name: 'opening-assembly', caption: 'Opening assembly', span: 'col-span-2' },
  { name: 'wiring-the-builds', caption: 'Wiring up the builds', span: '' },
  { name: 'crafting-prototypes', caption: 'Crafting prototypes', span: '' },
  { name: 'build-station', caption: 'Setting up the build station', span: '' },
  { name: 'design-team', caption: 'The IGNITE design team', span: '' },
  { name: 'showcase-table', caption: 'Showcasing handmade creations', span: 'col-span-2' },
  { name: 'match-and-mount-wall', caption: 'Match & Mount challenge wall', span: '' },
  { name: 'components-on-display', caption: 'Components on display', span: '' },
  { name: 'campus-walk', caption: 'Across the SIS campus', span: 'col-span-2' },
];

// Full-screen photo viewer with previous/next arrows, keyboard and swipe support
function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (step: number) => void }) {
  const photo = photos[index];
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNav(-1);
      if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onNav]);

  // Preload the neighbours so the arrows feel instant
  useEffect(() => {
    for (const step of [-1, 1]) {
      const next = photos[(index + step + photos.length) % photos.length];
      new Image().src = large(next.name);
    }
  }, [index]);

  const arrow =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#f28c28] text-[#172220] border-2 border-[#0b302e] shadow-[4px_4px_0px_#0b302e] hover:bg-[#f6a44e] flex items-center justify-center transition-colors';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-[60] bg-[#0b302e]/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Top bar: counter + close */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-[#f4f0e8]">
        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest">
          {index + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-[#f28c28] hover:text-[#172220] border border-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Photo with arrows on either side */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-3 sm:px-24">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
          className={`${arrow} left-2 sm:left-6`}
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>

        <motion.img
          key={photo.name}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={large(photo.name)}
          alt={photo.caption}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-full object-contain rounded-2xl border-3 border-[#f4f0e8] shadow-2xl select-none"
          draggable={false}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
          className={`${arrow} right-2 sm:right-6`}
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* Caption */}
      <p className="text-center px-4 py-5 font-display text-base sm:text-lg font-bold text-[#f4f0e8]">
        {photo.caption}
      </p>
    </div>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const nav = useCallback(
    (step: number) => setOpenIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length)),
    [],
  );

  return (
    <section id="gallery" className="py-24 sm:py-32 relative bg-[#faf8f3] border-t-2 border-[#0b302e]/10 text-[#172220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f28c28]/15 border border-[#f28c28]/30 font-mono text-xs uppercase tracking-widest text-[#c2410c] font-bold mb-3"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Gallery</span>
          </motion.span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#0b302e] tracking-tight">
            IGNITE in Action
          </h2>
          <p className="text-base sm:text-lg text-[#0b302e]/80 mt-3 font-medium">
            Moments of making, building, and presenting from the IGNITE floor.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense auto-rows-[150px] sm:auto-rows-[200px] gap-4 sm:gap-5 max-w-6xl mx-auto">
          {photos.map((photo, idx) => (
            <motion.figure
              key={photo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl border-3 border-[#0b302e] shadow-[5px_5px_0px_#0b302e] hover:shadow-[8px_8px_0px_#f28c28] transition-shadow ${photo.span}`}
            >
              <button
                onClick={() => setOpenIndex(idx)}
                className="block w-full h-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f28c28]"
                aria-label={`View photo: ${photo.caption}`}
              >
                <img
                  src={thumb(photo.name)}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[#0b302e]/90 to-transparent font-display text-xs sm:text-sm font-bold text-[#f4f0e8]">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>

      {openIndex !== null && <Lightbox index={openIndex} onClose={close} onNav={nav} />}
    </section>
  );
}
