import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Copy, Check, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import IgniteLogo from './IgniteLogo';
import { IGNITE_DATA } from '../data/igniteData';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPathwayId?: string;
}

interface Member {
  name: string;
  email: string;
}

export default function RegisterModal({
  isOpen,
  onClose,
  defaultPathwayId = 'junior-hackathon',
}: RegisterModalProps) {
  const { pathways, event } = IGNITE_DATA;
  const [step, setStep] = useState(1);
  const [selectedPathwayId, setSelectedPathwayId] = useState(defaultPathwayId);
  const [teamName, setTeamName] = useState('');
  const [schoolName, setSchoolName] = useState('Sreenidhi International School');
  const [gradeLevel, setGradeLevel] = useState('MYP 1');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { name: '', email: '' },
  ]);
  const [generatedPassId, setGeneratedPassId] = useState('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (defaultPathwayId) {
      setSelectedPathwayId(defaultPathwayId);
    }
  }, [defaultPathwayId]);

  if (!isOpen) return null;

  const selectedPathway = pathways.find((p) => p.id === selectedPathwayId) || pathways[0];

  const handleAddMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: '', email: '' }]);
    }
  };

  const handleRemoveMember = (idx: number) => {
    setMembers(members.filter((_, i) => i !== idx));
  };

  const handleMemberChange = (idx: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[idx][field] = value;
    setMembers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = selectedPathway.division === 'Junior' ? 'JR' : 'SR';
    const typeCode = selectedPathway.type === 'Hackathon' ? 'HACK' : 'MAKE';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const passId = `IGNITE-2026-${code}-${typeCode}-${randomSuffix}`;
    setGeneratedPassId(passId);
    setStep(4);
  };

  const handleCopyId = () => {
    if (generatedPassId) {
      navigator.clipboard.writeText(generatedPassId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0b302e]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#faf8f3] text-[#172220] border-2 border-[#0b302e] shadow-[8px_8px_0px_#0b302e] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top bar with official logo */}
        <div className="p-6 border-b-2 border-[#0b302e]/15 flex items-center justify-between bg-[#f4f0e8]">
          <div className="flex items-center gap-3">
            <IgniteLogo variant="horizontal" className="h-9" />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#0b302e] hover:bg-[#f28c28] hover:text-[#172220] transition-colors border-2 border-[#0b302e]/20"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Stepper Progress */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#f4f0e8]/50 border-b border-[#0b302e]/10 flex items-center justify-between text-xs font-mono">
            <span className={step >= 1 ? 'text-[#f28c28] font-bold' : 'text-[#0b302e]/40'}>
              01 Pathway
            </span>
            <span className="text-[#0b302e]/30">→</span>
            <span className={step >= 2 ? 'text-[#f28c28] font-bold' : 'text-[#0b302e]/40'}>
              02 Team & School
            </span>
            <span className="text-[#0b302e]/30">→</span>
            <span className={step >= 3 ? 'text-[#f28c28] font-bold' : 'text-[#0b302e]/40'}>
              03 Members
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-display font-extrabold text-[#0b302e]">
                  Step 1: Choose Your Challenge Pathway
                </h3>
                <p className="text-xs text-[#0b302e]/70 mt-1 font-medium">
                  Select one of the 4 pathways outlined in the IGNITE Structure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {pathways.map((p) => {
                  const isSelected = selectedPathwayId === p.id;
                  const isHackathon = p.type === 'Hackathon';
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedPathwayId(p.id);
                        setGradeLevel(p.division === 'Junior' ? 'MYP 1' : 'MYP 4');
                      }}
                      className={`p-4 rounded-2xl text-left border-2 transition-all relative ${
                        isSelected
                          ? isHackathon
                            ? 'bg-[#0b302e] text-[#f4f0e8] border-[#0b302e] shadow-[4px_4px_0px_#f28c28]'
                            : 'bg-[#f28c28] text-[#172220] border-[#0b302e] shadow-[4px_4px_0px_#0b302e]'
                          : 'bg-[#f4f0e8] text-[#0b302e] border-[#0b302e]/15 hover:border-[#0b302e] shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-mono text-xs font-bold ${isSelected && isHackathon ? 'text-[#f6a44e]' : 'text-[#0b302e]'}`}>
                          {p.division} {p.type}
                        </span>
                        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/10">
                          {p.gradeLevel}
                        </span>
                      </div>
                      <h4 className="text-sm font-display font-extrabold mb-1">
                        {p.subtitle}
                      </h4>
                      <p className="text-[11px] opacity-80 font-medium">
                        {p.tools}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="ignite-btn-primary"
                >
                  <span>Continue to Team Details</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-display font-extrabold text-[#0b302e]">
                  Step 2: Team & Grade Affiliation
                </h3>
                <p className="text-xs text-[#0b302e]/70 mt-1 font-medium">
                  {selectedPathway.division} Pathway ({selectedPathway.gradeLevel})
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0b302e] mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#f4f0e8] border-2 border-[#0b302e]/20 rounded-xl text-[#0b302e] placeholder-[#0b302e]/40 focus:outline-none focus:border-[#f28c28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b302e] mb-1">
                    School / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#f4f0e8] border-2 border-[#0b302e]/20 rounded-xl text-[#0b302e] focus:outline-none focus:border-[#f28c28]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0b302e] mb-1">
                      Grade Level ({selectedPathway.gradeLevel}) *
                    </label>
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#f4f0e8] border-2 border-[#0b302e]/20 rounded-xl text-[#0b302e] focus:outline-none focus:border-[#f28c28]"
                    >
                      {selectedPathway.division === 'Junior' ? (
                        <>
                          <option value="MYP 1">MYP 1</option>
                          <option value="MYP 2">MYP 2</option>
                          <option value="MYP 3">MYP 3</option>
                        </>
                      ) : (
                        <>
                          <option value="MYP 4">MYP 4</option>
                          <option value="MYP 5">MYP 5</option>
                          <option value="DP 1">DP 1</option>
                          <option value="DP 2">DP 2</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b302e] mb-1">
                      Lead Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#f4f0e8] border-2 border-[#0b302e]/20 rounded-xl text-[#0b302e] focus:outline-none focus:border-[#f28c28]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b302e] mb-1">
                    Lead Student Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@school.edu.in"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#f4f0e8] border-2 border-[#0b302e]/20 rounded-xl text-[#0b302e] focus:outline-none focus:border-[#f28c28]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#0b302e] hover:text-[#f28c28]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!teamName || !leaderName || !leaderEmail) return;
                    setStep(3);
                  }}
                  className="ignite-btn-primary"
                >
                  <span>Continue to Members</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-display font-extrabold text-[#0b302e]">
                    Step 3: Team Members
                  </h3>
                  <p className="text-xs text-[#0b302e]/70 mt-0.5 font-medium">
                    Total team size: {1 + members.length} student(s).
                  </p>
                </div>
                {members.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="text-xs font-bold text-[#f28c28] hover:underline"
                  >
                    + Add Member
                  </button>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f4f0e8] border-2 border-[#0b302e]/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#f28c28]">Lead</span>
                  <p className="text-xs font-bold text-[#0b302e]">{leaderName || 'Lead Student'}</p>
                  <p className="text-[11px] text-[#0b302e]/70">{leaderEmail}</p>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#0b302e]/50">Member #1</span>
              </div>

              <div className="space-y-3">
                {members.map((member, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#f4f0e8] border-2 border-[#0b302e]/15 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#0b302e]/70">
                        Member #{idx + 2}
                      </span>
                      {members.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-[11px] font-bold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className="px-3 py-2 text-xs bg-[#faf8f3] border-2 border-[#0b302e]/20 rounded-xl text-[#0b302e] focus:outline-none focus:border-[#f28c28]"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={member.email}
                        onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                        className="px-3 py-2 text-xs bg-[#faf8f3] border-2 border-[#0b302e]/20 rounded-xl text-[#0b302e] focus:outline-none focus:border-[#f28c28]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#0b302e] hover:text-[#f28c28]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="ignite-btn-primary"
                >
                  <span>Confirm Registration</span>
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#8fb9aa]/20 border-2 border-[#8fb9aa] text-[#0b302e] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#0b302e]">
                  Ready to ignite!
                </h3>
                <p className="text-xs text-[#0b302e]/70 max-w-md mx-auto mt-1 font-medium">
                  {event.finalCall}
                </p>
              </div>

              {/* Digital Pass with exact logo */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#0b302e] text-[#f4f0e8] border-2 border-[#0b302e] shadow-[6px_6px_0px_#f28c28] text-left relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3">
                  <IgniteLogo variant="horizontal" className="h-8" />
                  <QrCode className="w-7 h-7 text-[#8fb9aa]" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#f4f0e8]/60">Pass ID:</span>
                    <div className="flex items-center gap-1.5 font-mono text-[#f6a44e] font-bold">
                      <span>{generatedPassId}</span>
                      <button
                        onClick={handleCopyId}
                        className="p-1 hover:text-white"
                        title="Copy Reference"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-[#8fb9aa]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#f4f0e8]/60">Team:</span>
                    <span className="text-white font-bold">{teamName || 'Innovators'}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#f4f0e8]/60">Pathway:</span>
                    <span className="text-white font-bold">
                      {selectedPathway.title} — {selectedPathway.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#f4f0e8]/60">Grade Level:</span>
                    <span className="text-white font-medium">{gradeLevel}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#f4f0e8]/60">Date:</span>
                    <span className="text-white font-medium">{event.dates}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#f4f0e8]/60">Venue:</span>
                    <span className="text-white font-medium">{schoolName}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-[#8fb9aa] font-mono font-bold">
                  <span>{event.subtitle}</span>
                  <span className="text-[#f6a44e]">CONFIRMED</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="ignite-btn-primary"
                >
                  Done & Return to Summit
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
