import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import Cookies from "js-cookie";
import useApi from "../../hooks/useApi";
import PasswordFields from "../Shared/PasswordFields";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

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
  const id = Cookies.get("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        const data = await execute(`/get-user?id=${id.slice(1, -1)}`, "GET");
        setProfile(data.userDetails || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 540,
          p: { xs: 3, sm: 5 },
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 1.5,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              mb: 2,
            }}
          >
            <PersonOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
          </Box>
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            Your Profile
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Manage your account information
          </Typography>
        </Box>

        {updateSuccess && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
            Profile updated successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="location"
            value={profile.location}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
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
