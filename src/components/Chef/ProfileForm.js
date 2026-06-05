import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import FileBase64 from "react-file-base64";
import Cookies from "js-cookie";
import useApi from "../../hooks/useApi";
import PasswordFields from "../Shared/PasswordFields";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const ProfileForm = () => {
  const { execute } = useApi();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    cost: "",
    image: "",
    Location: "",
    Experience: "",
    Description: "",
    password: "",
    likes: 0,
    Fooditems: [],
    comments: [],
  });
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const id = Cookies.get("userId");

    const fetchProfile = async () => {
      if (!id) return;
      try {
        const data = await execute(`/get-chef?id=${id.slice(1, -1)}`, "GET");
        setProfile(data.chefDetails || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [execute]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = ({ base64 }) => {
    setProfile((prev) => ({ ...prev, image: base64 }));
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
    const id = Cookies.get("userId");
    if (!id) return;
    try {
      const response = await execute("/change-password", "PUT", {
        user: "chef",
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Update Profile Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
          Update Profile
        </Typography>

        {updateSuccess && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
            Profile updated successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Avatar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 3,
            }}
          >
            <Avatar
              src={profile.image}
              alt={profile.name}
              sx={{
                width: 80,
                height: 80,
                border: "3px solid",
                borderColor: "primary.light",
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <CloudUploadOutlinedIcon fontSize="small" />
                Change photo
              </Typography>
              <FileBase64 multiple={false} onDone={handleImageUpload} />
            </Box>
          </Box>

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

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Cost per Meal (₹)"
              name="cost"
              type="number"
              value={profile.cost}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Experience (years)"
              name="Experience"
              type="number"
              value={profile.Experience}
              onChange={handleChange}
            />
          </Box>

          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="Location"
            value={profile.Location}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Food Items"
            name="Fooditems"
            value={profile.Fooditems}
            onChange={handleChange}
            helperText="Separate items with commas"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="Description"
            value={profile.Description}
            onChange={handleChange}
            multiline
            rows={3}
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

      {/* Profile Details Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
          Profile Details
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip
            icon={<FavoriteIcon />}
            label={`${profile.likes || 0} Likes`}
            variant="outlined"
            color="error"
          />
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Comments */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <CommentOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6">Comments</Typography>
          </Box>
          {profile.comments && profile.comments.length > 0 ? (
            <List dense>
              {profile.comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={comment}
                    sx={{
                      "& .MuiListItemText-primary": {
                        backgroundColor: "background.default",
                        p: 1.5,
                        borderRadius: 2,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
              No comments yet
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Orders */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <ShoppingBagOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6">Orders</Typography>
          </Box>
          {profile.orders && profile.orders.length > 0 ? (
            <List dense>
              {profile.orders.map((order, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: "background.default",
                    borderRadius: 2,
                    mb: 1,
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <ListItemText
                    primary={`Date: ${order.date} — Time: ${order.time}`}
                    secondary={
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ mt: 1, flexWrap: "wrap", gap: 0.5 }}
                      >
                        {order.selectedItems.map((item, i) => (
                          <Chip
                            key={i}
                            label={item}
                            size="small"
                            sx={{
                              backgroundColor: "primary.light",
                              color: "secondary.dark",
                            }}
                          />
                        ))}
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
              No orders yet
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileForm;
