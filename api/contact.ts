import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Serverless endpoint to send contact form submissions via Gmail (App Password)
// Environment variables required (do NOT commit these):
// - GMAIL_USER: Gmail address (e.g. youraddress@gmail.com)
// - GMAIL_PASS: Gmail App Password (required for third-party SMTP access)
// - CONTACT_TO: Destination email (defaults to jetfuelcreatives@gmail.com)
// - CONTACT_FROM: Optional From address (defaults to GMAIL_USER)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required fields: name, email, message' });
      return;
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;
    const to = process.env.CONTACT_TO || 'jetfuelcreatives@gmail.com';
    const from = process.env.CONTACT_FROM || user;

    if (!user || !pass) {
      console.error('GMAIL_USER/GMAIL_PASS not set');
      res.status(500).json({ error: 'Email not configured' });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    const mailOptions = {
      from,
      to,
      replyTo: email,
      subject: subject ? `Website Contact: ${subject}` : `Website Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
            `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
            (subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : '') +
            `<hr/><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('sendMail error', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
}

function escapeHtml(unsafe: string) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}