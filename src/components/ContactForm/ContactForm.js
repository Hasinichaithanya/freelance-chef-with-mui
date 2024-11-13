import React, { useState } from 'react';
import { Card } from '@mui/material';
import './ContactForm.css';

const ContactForm = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [focus, setFocus] = useState({ name: false, email: false, message: false });

  const handleFocus = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="contact-form-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label 
            htmlFor="name" 
            className={userName || focus.name ? 'shrink' : ''}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            required
          />
        </div>
        <div className="form-group">
          <label 
            htmlFor="email" 
            className={userEmail || focus.email ? 'shrink' : ''}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            required
          />
        </div>
        <div className="form-group">
          <label 
            htmlFor="message" 
            className={userMessage || focus.message ? 'shrink' : ''}
          >
            Message:
          </label>
          <textarea
            id="message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Card>
  );
};

export default ContactForm;
