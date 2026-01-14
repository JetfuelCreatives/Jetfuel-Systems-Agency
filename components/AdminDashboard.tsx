
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_LEADS, MOCK_PROJECTS } from '../constants';
import { ProjectStatus } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'kanban'>('leads');

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.STRATEGY: return 'bg-gray-500';
      case ProjectStatus.DESIGN: return 'bg-purple-500';
      case ProjectStatus.DEVELOPMENT: return 'bg-sky-500';
      case ProjectStatus.TESTING: return 'bg-yellow-500';
      case ProjectStatus.DEPLOYED: return 'bg-green-500';
    }
  };

  // Fixed: Added 'as const' to ease to satisfy Framer Motion type requirements
  const tabContentVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.4, ease: "easeOut" as const }
  };

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2 uppercase tracking-tight text-white">Mission Control</h1>
            <p className="text-gray-400">Welcome back, Sarah. 3 new opportunities awaiting ignition.</p>
          </div>
          <div className="flex bg-gray-900 rounded-xl p-1 border border-white/5">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'bg-sky-500 text-black shadow-lg shadow-sky-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              Leads Inbox
            </button>
            <button 
              onClick={() => setActiveTab('kanban')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'kanban' ? 'bg-sky-500 text-black shadow-lg shadow-sky-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              Operations Board
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'leads' ? (
            <motion.div key="leads" {...tabContentVariants} className="glass rounded-3xl overflow-hidden border border-white/5">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Lead Identity</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Category</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Budget Range</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Timeline</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_LEADS.map(lead => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-6">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-xs text-gray-500 font-mono tracking-tighter">{lead.email}</div>
                      </td>
                      <td className="px-6 py-6 text-sm font-semibold text-white">{lead.projectType}</td>
                      <td className="px-6 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${lead.budget.includes('10,000') || lead.budget.includes('Over') ? 'text-green-400 bg-green-400/10 border border-green-400/20' : 'text-sky-400 bg-sky-400/10 border border-sky-400/20'}`}>
                          {lead.budget}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-300">{lead.timeline}</td>
                      <td className="px-6 py-6 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-800 rounded-full border border-white/10">{lead.status}</span>
                      </td>
                      <td className="px-6 py-6">
                        <button className="text-sky-400 hover:text-sky-300 font-bold text-xs uppercase tracking-widest">Detail View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div key="kanban" {...tabContentVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[ProjectStatus.DESIGN, ProjectStatus.DEVELOPMENT, ProjectStatus.TESTING, ProjectStatus.DEPLOYED].map(status => (
                <div key={status} className="space-y-4">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status)}`} />
                    {status}
                  </h3>
                  {MOCK_PROJECTS.filter(p => p.status === status).map(project => (
                    <div key={project.id} className="glass p-5 rounded-2xl cursor-grab active:cursor-grabbing hover:border-sky-500/50 transition-all border border-white/5 transform-gpu">
                      <h4 className="font-bold mb-3 text-sm text-white">{project.title}</h4>
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter text-gray-500">
                        <span>Deadline {project.deadline}</span>
                        <span className="text-sky-400">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 border border-dashed border-white/10 rounded-xl text-gray-500 hover:border-sky-500/30 hover:text-sky-400 text-[10px] font-bold uppercase tracking-widest transition-all">
                    + Deploy New Project
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
