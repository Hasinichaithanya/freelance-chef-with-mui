import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import Cookies from "js-cookie";
import useApi from "../../hooks/useApi";
import PasswordFields from "../Shared/PasswordFields/PasswordFields";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AppButton from "../Shared/AppButton/AppButton";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { execute } = useApi();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [id, setId] = useState('')
  // const id = Cookies.get("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = Cookies.get("userId");
      console.log(userId)
      setId(userId)
      if (!userId) return;
      try {
        const data = await execute(`/get-user?id=${userId}`, "GET");
        setProfile(data.userDetails || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await execute("/chef-profile", "PUT", profile);
      if (response) {
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await execute("/change-password", "PUT", {
        user: "user",
        id,
        oldPassword,
        newPassword,
      });
      if (response) {
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <Box className="user-dashboard-wrapper">
      <Paper
        elevation={0}
        className="user-dashboard-paper"
        sx={{ borderColor: "divider" }}
      >
        <Box className="user-dashboard-header">
          <Box className="user-dashboard-icon-circle">
            <PersonOutlinedIcon className="user-dashboard-icon" />
          </Box>
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            Your Profile
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Manage your account information
          </Typography>
        </Box>

        {updateSuccess && (
          <Alert severity="success" className="user-dashboard-success-alert">
            Profile updated successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField fullWidth margin="normal" label="Name" name="name" value={profile.name} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={profile.email} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Location" name="location" value={profile.location} onChange={handleChange} />
          <AppButton
            type="submit"

            startIcon={<SaveOutlinedIcon />}
            className="user-dashboard-save-btn"
          >
            Save Changes
          </AppButton>
        </Box>

        <PasswordFields
          oldPassword={oldPassword}
          newPassword={newPassword}
          onOldPasswordChange={(e) => setOldPassword(e.target.value)}
          onNewPasswordChange={(e) => setNewPassword(e.target.value)}
          onSubmit={handlePasswordChange}
        />
      </Paper>
    </Box>
  );
};

export default UserDashboard;
