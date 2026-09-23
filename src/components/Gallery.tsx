import { Camera } from 'lucide-react';
import { motion } from 'motion/react';
import openingAssembly from '../assets/images/gallery/opening-assembly.webp';
import arrivalCheckIn from '../assets/images/gallery/arrival-check-in.webp';
import prototypingOnPaper from '../assets/images/gallery/prototyping-on-paper.webp';
import buildingTogether from '../assets/images/gallery/building-together.webp';
import buildStation from '../assets/images/gallery/build-station.webp';
import showcaseTable from '../assets/images/gallery/showcase-table.webp';
import judgesTable from '../assets/images/gallery/judges-table.webp';
import campusWalk from '../assets/images/gallery/campus-walk.webp';

const photos = [
  { src: openingAssembly, caption: 'Opening assembly', span: 'col-span-2 row-span-2' },
  { src: arrivalCheckIn, caption: 'Arrival & check-in', span: '' },
  { src: prototypingOnPaper, caption: 'Prototyping on paper', span: '' },
  { src: buildingTogether, caption: 'Building together', span: '' },
  { src: buildStation, caption: 'Setting up the build station', span: '' },
  { src: showcaseTable, caption: 'Showcasing handmade creations', span: 'col-span-2' },
  { src: judgesTable, caption: 'Judges reviewing projects', span: '' },
  { src: campusWalk, caption: 'Across the SIS campus', span: '' },
];

export default function Gallery() {
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

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-4 sm:gap-5 max-w-6xl mx-auto">
          {photos.map((photo, idx) => (
            <motion.figure
              key={photo.caption}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl border-3 border-[#0b302e] shadow-[5px_5px_0px_#0b302e] hover:shadow-[8px_8px_0px_#f28c28] transition-shadow ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-[#0b302e]/90 to-transparent font-display text-xs sm:text-sm font-bold text-[#f4f0e8]">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>
    </section>
  );
}
