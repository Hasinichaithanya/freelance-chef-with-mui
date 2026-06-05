import React from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const PasswordFields = ({
  oldPassword,
  newPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onSubmit,
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ mb: 4 }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
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
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
        >
          Update Password
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordFields;
