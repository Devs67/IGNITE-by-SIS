import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Flame, Calendar, Bell, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

// Target: October 15, 2026, 09:00:00 IST (Indian Standard Time: UTC+5:30)
const TARGET_DATE = new Date('2026-10-15T09:00:00+05:30').getTime();

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });
  const [copiedReminder, setCopiedReminder] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isLive: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('IGNITE 2026: Hackathon & Makeathon at Sreenidhi');
    const details = encodeURIComponent(
      'IGNITE 2026-27: Kindle the Innovation Within. A flagship marathon featuring Junior and Senior Hackathons & Makeathons.'
    );
    const location = encodeURIComponent('Sreenidhi International School, Hyderabad, Telangana, India');
    // Start: 2026-10-15 09:00 IST -> 20261015T033000Z
    // End: 2026-10-16 18:00 IST -> 20261016T123000Z
    const dates = '20261015T033000Z/20261016T123000Z';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="relative my-6 sm:my-8 max-w-2xl mx-auto px-2">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#f28c28]/40 via-[#10b981]/30 to-[#f28c28]/40 blur-xl opacity-75 animate-pulse -z-10" />

      {/* Main Glass Card */}
      <div className="relative p-5 sm:p-7 rounded-3xl bg-[#082423]/90 backdrop-blur-xl border-2 border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Subtle interior decorative mesh */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#f4f0e8 1px, transparent 1px), linear-gradient(90deg, #f4f0e8 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Top Header Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pb-4 border-b border-white/15 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f28c28] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f28c28]" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-[#f6a44e] uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Event Kickoff Countdown</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCalendar}
              title="Add to Google Calendar"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] sm:text-[11px] font-mono font-bold text-white/90 hover:text-white transition-all shadow-xs"
            >
              <Calendar className="w-3 h-3 text-[#f28c28]" />
              <span>Add to Calendar</span>
            </button>

            <span className="hidden sm:inline-block font-mono text-[10px] text-white/50">
              15 Oct 2026 · 09:00 AM IST
            </span>
          </div>
        </div>

        {/* Time Units Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-5 pb-3 relative z-10">
          {units.map((unit, idx) => {
            const paddedValue = String(unit.value).padStart(2, '0');
            const isSeconds = unit.label === 'Seconds';

            return (
              <div key={unit.label} className="flex flex-col items-center">
                {/* Digit Display Tile */}
                <div className="relative w-full aspect-square max-w-[110px] rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/25 shadow-inner flex flex-col items-center justify-center overflow-hidden group">
                  
                  {/* Subtle highlight sheen */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-white/[0.06] rounded-t-2xl pointer-events-none" />
                  
                  {/* Glowing vertical separator */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/40 shadow-[0_1px_0px_rgba(255,255,255,0.1)]" />

                  {/* Animated Flip/Slide Numbers */}
                  <div className="relative h-10 sm:h-14 flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={paddedValue}
                        initial={{ y: 8, opacity: 0.2, filter: 'blur(2px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -8, opacity: 0.2, filter: 'blur(2px)' }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className={`font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-none select-none ${
                          isSeconds
                            ? 'text-[#f6a44e] drop-shadow-[0_2px_12px_rgba(242,140,40,0.6)]'
                            : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
                        }`}
                      >
                        {paddedValue}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Ambient indicator dot */}
                  {isSeconds && (
                    <motion.span 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute bottom-1.5 sm:bottom-2 w-1.5 h-1.5 rounded-full bg-[#f28c28]"
                    />
                  )}
                </div>

                {/* Unit Label */}
                <span className="mt-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#8fb9aa] uppercase">
                  {unit.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Status Banner */}
        <div className="mt-2 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-center relative z-10">
          <Flame className="w-3.5 h-3.5 text-[#f28c28] fill-current animate-bounce" />
          <span className="font-display text-[11px] sm:text-xs font-bold text-white/80">
            {timeLeft.isLive
              ? 'IGNITE is happening right now!'
              : 'Prepare your team · Two days of innovation at Sreenidhi'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#f6a44e]" />
        </div>

      </div>
    </div>
  );
}
