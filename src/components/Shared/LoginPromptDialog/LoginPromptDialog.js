import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import AppButton from "../AppButton/AppButton";

/**
 * LoginPromptDialog – reusable modal that prompts unauthenticated users
 * to log in or sign up before performing a protected action.
 *
 * Props:
 *   open       {boolean}  – controls dialog visibility
 *   onClose    {Function} – called when the dialog should close
 *   message    {string}   – optional custom body text
 */
const LoginPromptDialog = ({
  open,
  onClose,
  message = "You need to be logged in to perform this action. Would you like to sign in or register now?",
}) => {
  const navigate = useNavigate();

  const handleClose = () => onClose();

  const handleSignUp = () => {
    onClose();
    navigate("/UserSignUp");
  };

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="login-prompt-title"
    >
      <DialogTitle id="login-prompt-title">Login Required</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleClose} color="inherit">
          Cancel
        </AppButton>
        <AppButton variant="outlined" onClick={handleSignUp}>
          Sign Up
        </AppButton>
        <AppButton onClick={handleLogin}>Login</AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPromptDialog;
