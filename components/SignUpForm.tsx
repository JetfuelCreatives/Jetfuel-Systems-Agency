
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SignUpFormProps {
  onBack: () => void;
  onLoginClick: () => void;
  onSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onBack, onLoginClick, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Security mismatch: Passwords do not align.");
      return;
    }
    
    setIsLoading(true);
    // Mocking account creation and neural link synchronization
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => onSuccess(), 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/5 blur-[160px] -z-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full glass p-10 md:p-12 rounded-[2.5rem] border border-white/10 relative z-10"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="flex items-center gap-1 mb-6">
                  <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_#38bdf8]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                    Neural Identity Setup
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold font-heading uppercase tracking-tight mb-3">
                  Join JetFuel
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  Establish your operational identity to start fueling your brand.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">Full Identity</label>
                  <input 
                    required
                    type="text"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">Signal Address</label>
                  <input 
                    required
                    type="email"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm"
                    placeholder="email@company.io"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">Secure Key</label>
                    <input 
                      required
                      type="password"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm"
                      placeholder="••••"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">Verify Key</label>
                    <input 
                      required
                      type="password"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm"
                      placeholder="••••"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full group bg-sky-500 hover:bg-sky-400 disabled:bg-sky-900 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs text-black transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center gap-3 mt-4"
                >
                  {isLoading ? 'Synchronizing...' : (
                    <>
                      Initialize Account
                      <div className="w-1 h-1 bg-black rounded-full group-hover:scale-150 transition-all" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={onLoginClick}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-sky-400 transition-colors"
                >
                  Already registered? Sign In
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-sky-500/30">
                <div className="w-4 h-4 bg-sky-500 rounded-full animate-ping" />
              </div>
              <h3 className="text-3xl font-bold font-heading mb-4 uppercase">Identity Established</h3>
              <p className="text-gray-400 font-light">Welcome to the network, {formData.name.split(' ')[0]}. Preparing your command center...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={onBack}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
          >
            ← Abort Mission
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
