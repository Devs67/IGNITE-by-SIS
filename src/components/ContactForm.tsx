import { useState, type FormEvent } from 'react';
import { Send, Mail, Instagram, CheckCircle2 } from 'lucide-react';
import { IGNITE_DATA } from '../data/igniteData';

// Messages are forwarded to the contact email by FormSubmit (no backend on GitHub Pages).
// The first message ever sent triggers a one-time activation email to that inbox.
const endpoint = (email: string) => `https://formsubmit.co/ajax/${email}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-xl bg-white border-2 border-[#0b302e]/20 focus:border-[#0b302e] focus:outline-none focus:ring-2 focus:ring-[#f28c28]/40 px-4 py-3 text-sm sm:text-base text-[#0b302e] placeholder:text-[#0b302e]/50';
const label = 'block font-display text-sm font-bold text-[#0b302e] mb-1.5';

export default function ContactForm() {
  const { contactEmail, instagram, instagramHandle } = IGNITE_DATA.event;
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey')) return; // bot trap
    data.set('_subject', `IGNITE website question from ${data.get('name')}`);
    data.set('_template', 'table');
    setStatus('sending');
    try {
      // Plain form data (no JSON content type) keeps this a simple request with no CORS pre-check
      const res = await fetch(endpoint(contactEmail), {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="pb-24 sm:pb-32 bg-[#f4f0e8] text-[#172220]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#faf8f3] border-3 border-[#0b302e] shadow-[7px_7px_0px_#0b302e] overflow-hidden grid grid-cols-1 md:grid-cols-5">
          {/* Left: intro + other ways to reach us */}
          <div className="md:col-span-2 p-7 sm:p-9 bg-[#0b302e] text-[#f4f0e8]">
            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight">Still have a question?</h2>
            <p className="mt-3 text-sm sm:text-base text-[#f4f0e8]/85 font-medium leading-relaxed">
              Ask us anything about registration, the challenges, rules or taking part. We'll reply by email.
            </p>
            <div className="mt-7 space-y-3">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
              >
                <Mail className="w-5 h-5 shrink-0 text-[#f6a44e]" aria-hidden="true" />
                <span className="text-sm font-bold break-all">{contactEmail}</span>
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
              >
                <Instagram className="w-5 h-5 shrink-0 text-[#f6a44e]" aria-hidden="true" />
                <span className="text-sm font-bold">{instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Right: the form */}
          <div className="md:col-span-3 p-7 sm:p-9">
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8" role="status">
                <CheckCircle2 className="w-12 h-12 text-[#0b302e]" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-black text-[#0b302e]">Thanks! Your question has been sent.</h3>
                <p className="mt-2 text-sm text-[#0b302e]/80 font-medium">We'll get back to you by email soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-bold text-[#0b302e] underline decoration-[#f28c28] decoration-2 underline-offset-4"
                >
                  Ask another question
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cf-name" className={label}>Your name</label>
                    <input id="cf-name" name="name" required autoComplete="name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className={label}>Your email</label>
                    <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-school" className={label}>
                    School <span className="font-medium text-[#0b302e]/70">(optional)</span>
                  </label>
                  <input id="cf-school" name="school" autoComplete="organization" className={field} />
                </div>
                <div>
                  <label htmlFor="cf-message" className={label}>Your question</label>
                  <textarea id="cf-message" name="message" required rows={4} className={`${field} resize-y`} />
                </div>
                {/* Hidden from people; bots that fill it in are ignored */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {status === 'error' && (
                  <p className="text-sm font-medium text-[#9a3412]" role="alert">
                    Sorry, your question couldn't be sent. Please email us at{' '}
                    <a href={`mailto:${contactEmail}`} className="font-bold underline">{contactEmail}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#f28c28] hover:bg-[#e26f1e] disabled:opacity-60 text-[#172220] font-display text-sm font-black uppercase tracking-wider border-2 border-[#0b302e] shadow-[3px_3px_0px_#0b302e] transition-colors"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {status === 'sending' ? 'Sending…' : 'Send Question'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
