import ContactForm from './components/ContactForm';

// ... existing App component code

<div className="contact-section">
   {/* Other contact section content */}  
   <ContactForm />  
   {contactSubmitted && <div>Your message has been sent!</div>}
</div>
// ... existing state and handleContactSubmit function