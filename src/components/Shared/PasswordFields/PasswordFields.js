import React from "react";
import { Box, TextField, Typography, Divider } from "@mui/material";
import AppButton from "../AppButton/AppButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./PasswordFields.css";

const PasswordFields = ({
  oldPassword,
  newPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onSubmit,
}) => {
  return (
    <Box className="password-fields-section">
      <Divider sx={{ mb: 4 }} />
      <Box className="password-fields-header">
        <LockOutlinedIcon sx={{ color: "primary.main" }} />
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          Change Password
        </Typography>
      </Box>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Current Password"
          type="password"
          variant="outlined"
          placeholder="Enter your current password"
          value={oldPassword}
          onChange={onOldPasswordChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          variant="outlined"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={onNewPasswordChange}
          required
        />
        <AppButton
          type="submit"
          variant="outlined"
          className="password-fields-submit-btn"
        >
          Update Password
        </AppButton>
      </Box>
    </Box>
  );
};

export default PasswordFields;
