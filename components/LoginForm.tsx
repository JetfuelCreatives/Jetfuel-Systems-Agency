
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRole } from '../types';

interface LoginFormProps {
  role: UserRole;
  onBack: () => void;
  onSuccess: () => void;
  onSignUpClick: () => void;
}

type LoginView = 'login' | 'forgot' | 'success';

const LoginForm: React.FC<LoginFormProps> = ({ role, onBack, onSuccess, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<LoginView>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock transmission delay
    setTimeout(() => {
      setIsLoading(false);
      setView('success');
    }, 1500);
  };

  const isAdmin = role === UserRole.ADMIN;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] -z-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full glass p-10 md:p-12 rounded-[2.5rem] border border-white/10 relative z-10"
      >
        <AnimatePresence mode="wait">
          {view === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="flex items-center gap-1 mb-6">
                  <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-red-600 animate-pulse shadow-[0_0_10px_#ef4444]' : 'bg-sky-500 animate-pulse shadow-[0_0_10px_#0ea5e9]'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                    {isAdmin ? 'High Security Access' : 'System Neural Link'}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold font-heading uppercase tracking-tight mb-3">
                  {isAdmin ? 'Command Center' : 'Client Portal'}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {isAdmin ? 'Verify credentials for operational authority.' : 'Enter your coordinates to access project telemetry.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm font-medium"
                    placeholder="name@jetfuel.io"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Password</label>
                    <button 
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-[9px] font-bold uppercase tracking-[0.1em] text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input 
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm font-medium"
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full group bg-sky-500 hover:bg-sky-400 disabled:bg-sky-900 disabled:text-gray-500 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs text-black transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center gap-3 mt-4"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-black rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  ) : (
                    <>
                      Initialize Link
                      <div className={`w-1 h-1 rounded-full ${isAdmin ? 'bg-red-600' : 'bg-black'} group-hover:scale-150 transition-all`} />
                    </>
                  )}
                </button>
              </form>

              {!isAdmin && (
                <div className="mt-8 text-center">
                  <button 
                    onClick={onSignUpClick}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-sky-400 transition-colors"
                  >
                    New to JetFuel? Create Account
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {view === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6">
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full shadow-[0_0_10px_#0ea5e9]" />
                </div>
                
                <h2 className="text-2xl font-bold font-heading uppercase tracking-tight mb-3">
                  Credential Recovery
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  Input your signal address to receive a encrypted reset link.
                </p>
              </div>

              <form onSubmit={handleResetRequest} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 px-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm font-medium"
                    placeholder="name@jetfuel.io"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full group bg-sky-500 hover:bg-sky-400 disabled:bg-sky-900 disabled:text-gray-500 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs text-black transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center gap-3"
                >
                  {isLoading ? 'Transmitting...' : 'Send Recovery Link'}
                </button>

                <button 
                  type="button"
                  onClick={() => setView('login')}
                  className="w-full text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-colors py-2"
                >
                  Return to Login
                </button>
              </form>
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-sky-500/20">
                <div className="w-3 h-3 bg-sky-500 rounded-full animate-ping" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 uppercase">Link Transmitted</h3>
              <p className="text-gray-400 font-light mb-8">
                A security key has been sent to <span className="text-sky-400 font-medium">{email}</span>. Check your inbox to complete recovery.
              </p>
              <button 
                onClick={() => setView('login')}
                className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Return to Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={onBack}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
          >
            ← Abort Operation
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
