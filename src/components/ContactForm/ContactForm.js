import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const ContactForm = () => {
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

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    };

    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/contact-us",
        options
      );
      const result = await response.json();
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
      sx={{
        maxWidth: 480,
        mx: "auto",
        my: 6,
        p: { xs: 3, sm: 4 },
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Box
          sx={{
            display: "inline-flex",
            p: 1.5,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            mb: 2,
          }}
        >
          <EmailOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
          Contact Us
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
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
        <Button
          type="submit"
          variant="contained"
          startIcon={<SendOutlinedIcon />}
          sx={{ mt: 2 }}
        >
          Send Message
        </Button>
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
          sx={{ borderRadius: 2 }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ContactForm;
