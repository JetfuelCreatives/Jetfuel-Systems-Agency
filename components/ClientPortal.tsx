
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PROJECTS, MOCK_USER } from '../constants';
import { Project } from '../types';
import { getProjectAssistantResponse } from '../services/gemini';

const ClientPortal: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(MOCK_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'files'>('overview');
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userMsg = aiQuery;
    setAiMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setAiQuery('');
    setAiLoading(true);

    const context = `Project: ${selectedProject.title}, Status: ${selectedProject.status}, Progress: ${selectedProject.progress}%`;
    const response = await getProjectAssistantResponse(userMsg, context);
    
    setAiMessages(prev => [...prev, { role: 'ai', content: response || "I'm sorry, I couldn't process that." }]);
    setAiLoading(false);
  };

  // Fixed: Added 'as const' to ease to satisfy Framer Motion type requirements
  const tabContentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: "easeOut" as const }
  };

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Project Selector */}
        <aside className="lg:w-1/3 space-y-6">
          <header className="mb-8 text-white">
            <h1 className="text-3xl font-bold font-heading uppercase tracking-tight">System Access: {MOCK_USER.name.split(' ')[0]}</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">Monitoring project trajectory.</p>
          </header>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Active Operations</h3>
            {MOCK_PROJECTS.map(p => (
              <button 
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`w-full text-left glass p-6 rounded-2xl transition-all border ${selectedProject.id === p.id ? 'border-sky-500 bg-sky-500/5' : 'border-white/5 hover:border-white/20'} transform-gpu`}
              >
                <h4 className="font-bold text-lg mb-4 text-white">{p.title}</h4>
                <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${p.progress}%` }}
                    className="absolute top-0 left-0 h-full bg-sky-500" 
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white">
                  <span className="text-gray-500">PHASE: <span className="text-white">{p.status}</span></span>
                  <span className="text-sky-400">{p.progress}%</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="lg:w-2/3 flex flex-col gap-6">
          <div className="flex bg-gray-900/50 rounded-2xl p-1 w-fit border border-white/5">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-sky-500 text-black shadow-lg shadow-sky-500/20' : 'text-gray-400 hover:text-white'}`}>Overview</button>
            <button onClick={() => setActiveTab('messages')} className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'messages' ? 'bg-sky-500 text-black shadow-lg shadow-sky-500/20' : 'text-gray-400 hover:text-white'}`}>Intelligence</button>
            <button onClick={() => setActiveTab('files')} className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'files' ? 'bg-sky-500 text-black shadow-lg shadow-sky-500/20' : 'text-gray-400 hover:text-white'}`}>Assets</button>
          </div>

          <div className="glass rounded-3xl p-8 min-h-[500px] flex flex-col border border-white/5 overflow-hidden transform-gpu">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" {...tabContentVariants} className="space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div>
                      <h2 className="text-2xl font-bold font-heading mb-3 uppercase tracking-tight text-white">{selectedProject.title}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{selectedProject.description}</p>
                    </div>
                    <div className="bg-sky-500/5 border border-sky-500/20 px-6 py-3 rounded-2xl text-center shrink-0">
                      <div className="text-[10px] text-sky-400 uppercase font-bold tracking-[0.2em] mb-1">Target Deployment</div>
                      <div className="font-heading font-bold text-lg text-white">{new Date(selectedProject.deadline).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h4 className="text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">Latest Logs</h4>
                      <ul className="space-y-6 text-white">
                        <li className="flex gap-4">
                          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                          <div>
                            <p className="text-sm font-semibold">V2 Design Mockups uploaded</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">2 hours ago</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                          <div>
                            <p className="text-sm font-semibold">System architecture approved</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Yesterday</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-sky-500/5 border border-sky-500/10 p-6 rounded-2xl relative overflow-hidden group">
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                           <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                           <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em]">JetFuel AI Copilot</h4>
                        </div>
                        <div className="max-h-40 overflow-y-auto mb-6 space-y-3 pr-2 scrollbar-thin text-white">
                          {aiMessages.length === 0 ? (
                            <p className="text-gray-400 text-xs italic leading-relaxed">"System online. How can I assist with your trajectory today, Alex?"</p>
                          ) : (
                            aiMessages.map((m, i) => (
                              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                                <span className={`inline-block px-3 py-2 rounded-xl text-xs ${m.role === 'user' ? 'bg-sky-500 text-black font-bold' : 'bg-white/10 text-gray-300'}`}>
                                  {m.content}
                                </span>
                              </div>
                            ))
                          )}
                          {aiLoading && <div className="animate-pulse text-sky-400 text-[10px] font-bold uppercase tracking-widest">Processing Intelligence...</div>}
                        </div>
                        <form onSubmit={handleAiAsk} className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Query system intelligence..."
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-sky-500 transition-colors text-white"
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                          />
                          <button type="submit" className="bg-sky-500 px-4 py-2 rounded-xl text-[10px] font-bold uppercase text-black hover:bg-sky-400 transition-all">Send</button>
                        </form>
                      </div>
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 blur-3xl -z-0 group-hover:bg-sky-500/20 transition-all" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div key="messages" {...tabContentVariants} className="flex flex-col h-full">
                  <div className="flex-1 space-y-8 mb-8 text-white">
                    <div className="flex gap-4">
                      <img src="https://picsum.photos/seed/sarah/40/40" className="w-10 h-10 rounded-full grayscale hover:grayscale-0 transition-all border border-white/10" />
                      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl max-w-[85%]">
                        <p className="text-[10px] text-sky-400 font-bold uppercase tracking-widest mb-2">Sarah (Operations Lead)</p>
                        <p className="text-sm leading-relaxed text-gray-200">Hi Alex! I've just uploaded the high-speed prototypes for the homepage. Let me know what you think of the new hero section transition.</p>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600 mt-4 block">10:45 AM // System Log</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-8">
                    <div className="flex gap-4">
                      <textarea 
                        placeholder="Input message to command center..."
                        className="flex-1 bg-black/50 border border-white/10 rounded-2xl p-5 outline-none focus:border-sky-500 resize-none h-28 text-sm transition-colors text-white"
                      />
                      <button className="bg-sky-500 px-10 rounded-2xl font-bold uppercase text-xs tracking-widest text-black hover:bg-sky-400 transition-all shrink-0">Transmit</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'files' && (
                <motion.div key="files" {...tabContentVariants} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'V2_Prototypes.fig', size: '45MB', type: 'DESIGN' },
                      { name: 'Architecture_Spec.pdf', size: '2.1MB', type: 'CORE' },
                      { name: 'Logo_Pack_Final.zip', size: '150MB', type: 'ASSETS' }
                    ].map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-sky-500/40 transition-all group cursor-pointer w-full text-white">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-sky-500/5 rounded-2xl flex items-center justify-center text-sky-400 font-bold text-xs tracking-tighter group-hover:bg-sky-500 group-hover:text-black transition-all border border-sky-500/20">
                            {file.name.split('.').pop()?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm tracking-tight">{file.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mt-1">{file.size} • {file.type}</p>
                          </div>
                        </div>
                        <button className="text-sky-500 font-bold text-[10px] uppercase tracking-widest hover:text-sky-300 transition-colors bg-sky-500/10 px-4 py-2 rounded-lg">Retrieve</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientPortal;
