
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SalesFunnel from './components/SalesFunnel';
import ClientPortal from './components/ClientPortal';
import AdminDashboard from './components/AdminDashboard';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { UserRole } from './types';
import { motion, AnimatePresence } from 'framer-motion';

type AppView = 'HOME' | 'PORTAL' | 'ADMIN' | 'FUNNEL' | 'LOGIN' | 'SIGNUP';

// Optimized: More lenient margin triggers animations earlier for a faster feel
const sectionAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [loginTarget, setLoginTarget] = useState<UserRole>(UserRole.GUEST);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setRole(UserRole.GUEST);
      setCurrentView('HOME');
    }
  };

  const initiateLogin = (target: UserRole) => {
    setLoginTarget(target);
    setCurrentView('LOGIN');
  };

  const handleLoginSuccess = () => {
    setRole(loginTarget);
    setCurrentView(loginTarget === UserRole.ADMIN ? 'ADMIN' : 'PORTAL');
  };

  const handleSignUpSuccess = () => {
    setRole(UserRole.CLIENT);
    setCurrentView('PORTAL');
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'HOME') {
      setCurrentView('HOME');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    if (currentView === 'HOME') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('HOME');
      window.scrollTo({ top: 0 });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const inputClasses = `w-full transition-all text-sm outline-none focus:border-sky-500 px-5 py-4 rounded-2xl border ${
    isDarkMode 
      ? 'bg-black/40 border-white/5 text-white placeholder-gray-600' 
      : 'bg-white/90 border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
  }`;

  const renderHome = () => (
    <div className="min-h-screen bg-black transition-colors duration-400">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-center px-6">
        {/* Background elements removed for a clean look */}
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 max-w-5xl"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
            <span className="text-sky-400 font-bold uppercase tracking-[0.4em] text-[10px]">High-Velocity Digital Engineering</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold font-heading leading-none mb-10 tracking-tighter text-white">
            <span className="text-white">JET</span><span className="text-transparent bg-clip-text bg-gradient-to-b from-sky-400 to-sky-700 relative">FUEL<div className="absolute right-0 bottom-4 w-4 h-4 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] hidden md:block" /></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed font-light">
            We build high-performance digital systems for brands that refuse to be ordinary, and provide growth-focused digital experiences that set you apart.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <button 
              onClick={() => setCurrentView('FUNNEL')}
              className="group bg-sky-500 hover:bg-sky-400 px-12 py-6 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:scale-105 text-black uppercase tracking-widest flex items-center gap-3"
            >
              Start Your Project
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full group-hover:scale-150 transition-all" />
            </button>
            <button 
              onClick={() => scrollToSection('services-section')}
              className="glass px-12 py-6 rounded-full font-bold text-lg hover:bg-white/10 transition-all border border-white/5 uppercase tracking-widest text-sm"
            >
              Explore Dossier
            </button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-12 animate-bounce z-20">
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1.5">
            <div className="w-1 h-1.5 bg-sky-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Core Operations Section */}
      <section id="operations-section" className="py-40 px-6 md:px-12 max-w-7xl mx-auto relative border-t border-white/5">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-sky-500 to-transparent opacity-30" />
        
        <motion.div {...sectionAnimation} className="text-center mb-28">
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight uppercase text-white">Core Operations</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "System Architecture", 
              desc: "Building rock-solid backends and high-speed infrastructures using low-latency modern technology stacks.",
              icon: "01"
            },
            { 
              title: "Hyper-UX Design", 
              desc: "Tactile, high-fidelity interfaces engineered to convert massive scale traffic into loyal brand advocates.",
              icon: "02"
            },
            { 
              title: "Digital Dominance", 
              desc: "Full-scale brand identity systems designed to occupy the gap between market demand and competition.",
              icon: "03"
            }
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-sky-500/30 transition-all jet-glow group relative h-full flex flex-col transform-gpu"
            >
              <div className="text-5xl font-bold text-gray-900 mb-8 group-hover:text-sky-500/20 transition-colors font-heading tracking-tighter">{service.icon}</div>
              <h3 className="text-xl font-bold mb-6 tracking-tight uppercase leading-tight">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-sm flex-grow">{service.desc}</p>
              <div className="mt-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Inquire</span>
                <div className="w-1 h-1 bg-red-600 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...sectionAnimation} className="mt-40 flex flex-col items-center gap-6 text-center">
            <div className="h-px w-20 bg-white/10" />
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Internal System Testing</p>
            <div className="flex gap-6">
                <button onClick={() => initiateLogin(UserRole.CLIENT)} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 px-6 py-2 rounded-lg hover:border-sky-500/50 hover:text-sky-400 transition-all">Client Profile</button>
                <button onClick={() => initiateLogin(UserRole.ADMIN)} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 px-6 py-2 rounded-lg hover:border-sky-500/50 hover:text-sky-400 transition-all">Admin Profile</button>
            </div>
        </motion.div>
      </section>

      {/* Detailed Services Section */}
      <section id="services-section" className="py-28 bg-zinc-950 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnimation} className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-sky-500" />
              <span className="text-sky-400 font-bold uppercase tracking-[0.4em] text-[10px]">End-to-End Solutions</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tighter uppercase text-white">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed font-light">
              Everything You Need to Dominate Digital. From concept to launch and beyond, we provide end-to-end solutions that transform your digital presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            {[
              {
                title: "Web Development",
                description: "We build lightning-fast, scalable websites and web applications using the latest technologies. From simple landing pages to complex platforms, we deliver code that performs.",
                included: [
                  "Custom web applications",
                  "E-commerce platforms",
                  "API development & integration",
                  "Performance optimization",
                  "Responsive design"
                ]
              },
              {
                title: "Web Design",
                description: "Our designs don't just look beautiful—they convert. We create intuitive, user-centered interfaces that guide visitors toward action and keep them coming back.",
                included: [
                  "UI/UX design",
                  "Interactive prototypes",
                  "Design systems",
                  "Mobile-first approach",
                  "Accessibility compliance"
                ]
              },
              {
                title: "Graphics & Branding",
                description: "Your brand is more than a logo—it's an experience. We craft bold visual identities that capture your essence and make lasting impressions.",
                included: [
                  "Logo design",
                  "Brand guidelines",
                  "Marketing collateral",
                  "Social media assets",
                  "Packaging design"
                ]
              },
              {
                title: "Digital Monetization & Growth Strategy",
                description: "Growth without strategy is just luck. We develop data-driven approaches to help you monetize your digital presence and scale sustainably.",
                included: [
                  "Conversion rate optimization",
                  "Funnel architecture",
                  "Revenue stream mapping",
                  "Data analytics implementation",
                  "Growth hacking & scaling"
                ]
              }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="glass p-8 md:p-10 rounded-[2rem] border border-white/5 flex flex-col lg:flex-row gap-10 group hover:border-sky-500/20 transition-all transform-gpu"
              >
                <div className="lg:w-2/3">
                  <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6 uppercase tracking-tight text-white group-hover:text-sky-400 transition-colors">{s.title}</h3>
                  <p className="text-base text-gray-400 mb-8 leading-relaxed font-light">{s.description}</p>
                  <button 
                    onClick={() => setCurrentView('FUNNEL')}
                    className="bg-white text-black font-bold uppercase tracking-widest text-[10px] px-8 py-4 rounded-full hover:bg-sky-500 transition-all hover:scale-105"
                  >
                    Get Started
                  </button>
                </div>
                <div className="lg:w-1/3">
                  <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.4em] mb-8">What's Included</h4>
                  <ul className="space-y-4">
                    {s.included.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-red-600 rounded-full" />
                        <span className="text-gray-300 font-medium text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps to Completion Section */}
      <section id="roadmap-section" className="py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...sectionAnimation} className="mb-24 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-sky-500" />
              <span className="text-sky-400 font-bold uppercase tracking-[0.4em] text-[10px]">Operational Roadmap</span>
              <div className="h-px w-10 bg-sky-500" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tighter uppercase text-white">Steps to Completion</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
              Our systematic approach ensures every project moves from concept to deployment with military precision and creative excellence.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "Initial intelligence gathering. We deep-dive into your brand, market, and technical requirements to build a roadmap for success."
                },
                {
                  step: "02",
                  title: "Design",
                  description: "Architectural blueprinting. We map out user flows, design systems, and technical stacks to ensure a rock-solid foundation."
                },
                {
                  step: "03",
                  title: "Development",
                  description: "High-velocity engineering. Our team builds your solution using cutting-edge technologies with iterative feedback loops."
                },
                {
                  step: "04",
                  title: "Deployment",
                  description: "Mission deployment. Final stress testing, optimization, and seamless transition to your production environment."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative group"
                >
                  <div className="glass p-8 rounded-3xl border border-white/5 hover:border-sky-500/40 transition-all relative z-10 h-full bg-zinc-950/50 transform-gpu text-white">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-8 group-hover:bg-sky-500 group-hover:text-black transition-all">
                      <span className="font-heading font-black text-xl tracking-tighter text-sky-400 group-hover:text-inherit">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-4 uppercase tracking-tight text-white">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">{item.description}</p>
                  </div>
                  {/* Azure Pulse Point */}
                  <div className="absolute top-1/2 -right-4 w-2 h-2 bg-sky-500 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block -translate-y-1/2 z-20" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Optimized for Scroll Performance & Light Mode */}
      <section id="contact-section" className="py-40 px-6 md:px-12 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
        {/* Simplified Background Glow for performance */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full -z-0 will-change-transform" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-sky-500" />
                <span className="text-sky-400 font-bold uppercase tracking-[0.4em] text-[10px]">Transmission Point</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold font-heading mb-10 tracking-tighter uppercase leading-none text-white">
                Establish<br/>
                <span className="text-sky-400">Contact</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed font-light mb-12 max-w-lg">
                Ready to accelerate your project? Our intelligence officers are standing by to process your inquiry.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/10 transform-gpu shadow-sm">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">HQ Coordinates</p>
                    <p className="text-white font-medium">Pretoria, South Africa</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/10 transform-gpu shadow-sm">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full shadow-[0_0_10px_#0ea5e9]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Neural Mail</p>
                    <p className="text-white font-medium">jetfuelcreatives@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Optimized Form Container with transform-gpu & Light Mode Enhancements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "20px" }}
              transition={{ duration: 0.5 }}
              className="glass p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl transform-gpu will-change-transform"
            >
              {contactSubmitted ? (
                <div className="py-20 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-sky-500/20">
                    <div className="w-3 h-3 bg-sky-500 rounded-full animate-ping" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 uppercase text-white">Transmission Received</h3>
                  <p className="text-gray-400 font-light">Your inquiry has been logged into the neural network. Stand by for response.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-[0.2em] px-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Identity</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Name"
                        className={inputClasses}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-bold uppercase tracking-[0.2em] px-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Signal Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="Email"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-[0.2em] px-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Mission Objective</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Subject"
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-[0.2em] px-1 ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>Message Body</label>
                    <textarea 
                      required
                      placeholder="How can we assist your trajectory?"
                      className={`${inputClasses} h-32 resize-none`}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-400 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs text-black transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center gap-3"
                  >
                    Send Transmission
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen selection:bg-sky-500/30">
      <Navbar 
        currentRole={role} 
        onNavigate={(view) => {
          if (view === 'HOME') handleHomeClick();
          else if (view === 'PORTAL') initiateLogin(UserRole.CLIENT);
          else setCurrentView(view);
        }} 
        onServicesClick={() => scrollToSection('services-section')}
        onContactClick={() => scrollToSection('contact-section')}
        onLogout={handleLogout} 
        onHomeClick={handleHomeClick}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {currentView === 'HOME' && renderHome()}
          {currentView === 'FUNNEL' && <SalesFunnel onComplete={() => setCurrentView('HOME')} />}
          {currentView === 'LOGIN' && (
            <LoginForm 
              role={loginTarget} 
              onBack={() => setCurrentView('HOME')} 
              onSuccess={handleLoginSuccess}
              onSignUpClick={() => setCurrentView('SIGNUP')}
            />
          )}
          {currentView === 'SIGNUP' && (
            <SignUpForm 
              onBack={() => setCurrentView('HOME')}
              onLoginClick={() => setCurrentView('LOGIN')}
              onSuccess={handleSignUpSuccess}
            />
          )}
          {currentView === 'PORTAL' && <ClientPortal />}
          {currentView === 'ADMIN' && <AdminDashboard />}
        </motion.div>
      </AnimatePresence>

      <footer className={`py-20 border-t text-center relative overflow-hidden transition-colors duration-400 ${isDarkMode ? 'border-white/5 bg-black/50' : 'border-slate-200 bg-slate-50'}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 blur-[100px] -z-0 transition-opacity ${isDarkMode ? 'bg-sky-500/5 opacity-100' : 'bg-sky-500/10 opacity-40'}`} />
        <div className="relative z-10">
          <div className="flex justify-center gap-12 mb-10">
            <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-sky-400 transition-colors">X-Social</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-sky-400 transition-colors">LinkedIn</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-sky-400 transition-colors">Dribbble</a>
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-gray-700' : 'text-slate-400'}`}>
            &copy; 2024 JETFUEL SYSTEMS. HIGH-VELOCITY DIGITAL OPS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
