
import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: (view: 'HOME' | 'FUNNEL') => void;
  onHomeClick: () => void;
  onServicesClick: () => void;
  onContactClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onHomeClick,
  onServicesClick,
  onContactClick,
}) => {
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
    </nav>
  );
};

export default Navbar;
