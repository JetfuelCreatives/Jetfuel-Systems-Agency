
import React from 'react';
import { UserRole } from '../types';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentRole: UserRole;
  onNavigate: (view: 'HOME' | 'PORTAL' | 'ADMIN' | 'FUNNEL') => void;
  onLogout: () => void;
  onHomeClick: () => void;
  onServicesClick: () => void;
  onContactClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentRole, 
  onNavigate, 
  onLogout, 
  onHomeClick,
  onServicesClick,
  onContactClick,
  isDarkMode,
  onToggleTheme
}) => {
  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  const navLinkClasses = "text-sm font-bold hover:text-sky-400 transition-colors uppercase tracking-[0.2em] relative group py-2";
  const underlineClasses = "absolute bottom-0 left-0 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#0ea5e9]";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={onHomeClick}
      >
        <div className="flex items-center gap-0 font-heading font-bold text-2xl tracking-tighter">
          <span className="text-white">JET</span>
          <div className="flex items-center relative">
            <span className="text-sky-400">F</span>
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-1.5 h-1.5 bg-red-600 rounded-full absolute left-[0.45rem] top-[0.8rem] shadow-[0_0_10px_#ef4444]" 
            />
            <span className="text-sky-400">UEL</span>
          </div>
        </div>
      </motion.div>

      <div className="hidden md:flex items-center gap-8">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHomeClick} 
          className={navLinkClasses}
        >
          Home
          <motion.span className={underlineClasses} />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onServicesClick} 
          className={navLinkClasses}
        >
          Services
          <motion.span className={underlineClasses} />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContactClick} 
          className={navLinkClasses}
        >
          Contact
          <motion.span className={underlineClasses} />
        </motion.button>

        <motion.button 
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(14,165,233,0.4)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('FUNNEL')} 
          className="bg-sky-500 hover:bg-sky-400 px-6 py-2 rounded-full text-[10px] font-black transition-all text-black uppercase tracking-[0.2em] border border-sky-400/50"
        >
          Start Project
        </motion.button>
      </div>

      <div className="flex items-center gap-6">
        {currentRole === UserRole.GUEST ? (
          <motion.button 
            whileHover={{ color: '#38bdf8' }}
            onClick={() => onNavigate('PORTAL')} 
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 transition-colors"
          >
            Client Login
          </motion.button>
        ) : (
          <div className="flex items-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => onNavigate(currentRole === UserRole.ADMIN ? 'ADMIN' : 'PORTAL')}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 hover:text-sky-300 transition-colors"
            >
              {currentRole === UserRole.ADMIN ? 'Command Center' : 'Dashboard'}
            </motion.button>
            <motion.button 
              whileHover={{ color: '#ffffff' }}
              onClick={handleLogoutClick}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        )}

        {/* Theme Toggle Button Moved After Login Section */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleTheme}
          className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          )}
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
