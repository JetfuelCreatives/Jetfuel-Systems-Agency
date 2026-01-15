import React, { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Submission failed');
      }

      setSuccess(true);
      // clear form
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-20 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-sky-500/20">
          <div className="w-3 h-3 bg-sky-500 rounded-full animate-ping" />
        </div>
        <h3 className="text-2xl font-bold font-heading mb-4 uppercase text-white">Transmission Received</h3>
        <p className="text-gray-400 font-light">Your inquiry was sent — we’ll reply to the address you provided.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] px-1 text-slate-500">Identity</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] px-1 text-slate-500">Signal Address</label>
          <input
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="email@company.io"
            className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] px-1 text-slate-500">Mission Objective</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          type="text"
          placeholder="Subject"
          className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] px-1 text-slate-500">Message Body</label>
        <textarea
          required
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can we assist your trajectory?"
          className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-sky-500 transition-all text-sm h-32 resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-500 hover:bg-sky-400 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs text-black transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] flex items-center justify-center gap-3"
      >
        {loading ? 'Transmitting...' : 'Send Transmission'}
        <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
      </button>
    </form>
  );
};

export default ContactForm;