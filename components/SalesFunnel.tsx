import React, { useState } from 'react';
// Fixed: Removed duplicate and incorrect package import for framer-motion components
import { motion, AnimatePresence } from 'framer-motion';

interface SalesFunnelProps {
  onComplete: () => void;
}

const SalesFunnel: React.FC<SalesFunnelProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    budget: '',
    timeline: '',
    name: '',
    email: ''
  });

  const steps = [
    { title: "Project Type", options: ["Website", "Mobile App", "UI/UX Design", "Custom Software"] },
    { title: "Budget Range", options: ["Under R3,000", "R3,000 - R5,000", "R5,000 - R10,000", "Over R10,000"] },
    { title: "Timeline", options: ["Urgent (< 1mo)", "1-3 Months", "Flexible (3mo+)"] },
    { title: "Contact Details", fields: true }
  ];

  const handleOptionSelect = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-400 uppercase tracking-[0.3em] font-bold">Step {step} of 4</span>
            <span className="text-xs text-sky-400 font-bold uppercase tracking-widest">{Math.round((step / 4) * 100)}% Ignite</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-sky-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl -z-0" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold font-heading mb-8">{steps[step - 1].title}</h2>
              
              {step < 4 ? (
                <div className="grid grid-cols-1 gap-4">
                  {steps[step - 1].options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(step === 1 ? 'type' : step === 2 ? 'budget' : 'timeline', option)}
                      className="p-6 text-left border border-white/10 rounded-2xl hover:border-sky-500 hover:bg-sky-500/10 transition-all group flex justify-between items-center"
                    >
                      <span className="text-lg font-semibold group-hover:text-sky-400">{option}</span>
                      <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-sky-500 group-hover:shadow-[0_0_10px_rgba(14,165,233,0.8)] transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sky-500 outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Work Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-sky-500 outline-none transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-400 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-sky-500/20 text-black uppercase tracking-widest"
                  >
                    Ignite My Project
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
              ← Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesFunnel;