import React, { useState } from "react";
import { Card, Box, Button, Snackbar } from "@mui/material";
import "./ContactForm.css";

const ContactForm = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleFocus = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const object = {
      name: userName,
      mail: userEmail,
      message: userMessage,
    };
    console.log(object);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    };

    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/contact-us",
        options
      );
      const result = await response.json();
      console.log(result);
      if (result.message) {
        setOpen(true);
        setUserEmail("");
        setUserMessage("");
        setUserName("");
      } else {
        console.error("Login failed:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card className="contact-form-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <Box className="form-group">
          <label
            htmlFor="name"
            className={userName || focus.name ? "shrink" : ""}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onFocus={() => handleFocus("name")}
            onBlur={() => handleBlur("name")}
            required
          />
        </Box>
        <Box className="form-group">
          <label
            htmlFor="email"
            className={userEmail || focus.email ? "shrink" : ""}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            required
          />
        </Box>
        <Box className="form-group">
          <label
            htmlFor="message"
            className={userMessage || focus.message ? "shrink" : ""}
          >
            Message:
          </label>
          <textarea
            id="message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onFocus={() => handleFocus("message")}
            onBlur={() => handleBlur("message")}
            required
          ></textarea>
        </Box>
        <Button type="submit">Submit</Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Message Sent"
      />
    </Card>
  );
};

export default ContactForm;
