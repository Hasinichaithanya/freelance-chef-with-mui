import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AppButton from "../Shared/AppButton/AppButton";
import useApi from "../../hooks/useApi";
import "./ContactForm.css";

const ContactForm = () => {
  const { execute } = useApi();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!userName.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!userEmail.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!userMessage.trim()) {
      newErrors.message = "Message is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const object = {
      name: userName.trim(),
      mail: userEmail.trim(),
      message: userMessage.trim(),
    };

    try {
      const result = await execute("/contact-us", "POST", object);
      if (result.message) {
        setOpen(true);
        setUserEmail("");
        setUserMessage("");
        setUserName("");
        setErrors({});
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper
      elevation={0}
      className="contact-form-paper"
      sx={{ borderColor: "divider" }}
    >
      <Box className="contact-form-header">
        <Box className="contact-form-icon-circle">
          <EmailOutlinedIcon className="contact-form-icon" />
        </Box>
        <Typography variant="h5" className="contact-form-title" sx={{ color: "text.primary" }}>
          Contact Us
        </Typography>
        <Typography variant="body2" className="contact-form-subtitle" sx={{ color: "text.secondary" }}>
          We'd love to hear from you
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          multiline
          rows={4}
          error={Boolean(errors.message)}
          helperText={errors.message}
          required
        />
        <AppButton
          type="submit"
          startIcon={<SendOutlinedIcon />}
          className="contact-form-submit-btn"
        >
          Send Message
        </AppButton>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          className="contact-form-success-alert"
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ContactForm;
