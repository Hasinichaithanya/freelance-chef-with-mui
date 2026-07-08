import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  Alert,
  Avatar,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import useApi from "../../../hooks/useApi";
import useGenerateDescription from "../../../hooks/useGenerateDescription";
import AppButton from "../../Shared/AppButton/AppButton";
import PasswordFields from "../../Shared/PasswordFields/PasswordFields";
import "./ChefProfileForm.css";

const ChefProfileForm = () => {
  const { execute } = useApi();
  const { generateDescription, aiDescError, isGenerating } = useGenerateDescription();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    cost: "",
    image: "",
    location: "",
    experience: "",
    description: "",
    likes: 0,
    foodItems: [],
    comments: [],
  });
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [, setId] = useState('')

  useEffect(() => {
    const userId = Cookies.get("userId");
    setId(userId)
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const data = await execute(`/get-chef?id=${userId}`, "GET");
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

  const handlGenerateDescription = async () => {
    const payload = {
      experience: profile.experience,
      cuisines: profile.foodItems,
    }
    const description = await generateDescription(payload);
    if (description) {
      setProfile((prev) => ({ ...prev, description: description }));
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
    <Box className="profile-form-stack">
      {/* Update Profile Section */}
      <Paper
        elevation={0}
        className="profile-form-paper"
        sx={{ borderColor: "divider" }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
          Update Profile
        </Typography>

        {updateSuccess && (
          <Alert severity="success" className="profile-form-success-alert">
            Profile updated successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Avatar */}
          <Box className="profile-form-avatar-row">
            <Avatar
              src={profile.image}
              alt={profile.name}
              className="profile-form-avatar"
            />
            <Box>
              <p className="upload-label">
                <CloudUploadOutlinedIcon fontSize="small" />
                Change photo
              </p>
              <FileBase64 multiple={false} onDone={handleImageUpload} />
            </Box>
          </Box>

          <TextField fullWidth margin="normal" label="Name" name="name" value={profile.name} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={profile.email} onChange={handleChange} />

          <Box className="field-row">
            <TextField fullWidth margin="normal" label="Cost per Meal (₹)" name="cost" type="number" value={profile.cost} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Experience (years)" name="experience" type="number" value={profile.experience} onChange={handleChange} />
          </Box>

          <TextField fullWidth margin="normal" label="Location" name="location" value={profile.location} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Food Items" name="foodItems" value={profile.foodItems} onChange={handleChange} helperText="Separate items with commas" />
          <TextField fullWidth margin="normal" label="Description" name="description" value={profile.description} onChange={handleChange} multiline rows={3} />
          <AppButton startIcon={<AutoAwesomeIcon />} variant="outlined" onClick={handlGenerateDescription} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "AI"}
          </AppButton>
          {aiDescError && <Typography color="error">{aiDescError}</Typography>}
          <Box>
            <AppButton
              type="submit"
              startIcon={<SaveOutlinedIcon />}
              className="profile-form-save-btn"
            >
              Save Changes
            </AppButton>
          </Box>

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
        className="profile-form-paper"
        sx={{ borderColor: "divider" }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
          Profile Details
        </Typography>

        <Stack direction="row" spacing={2} className="profile-form-stats">
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
          <Box className="profile-form-section-header">
            <CommentOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6">Comments</Typography>
          </Box>
          {profile.comments && profile.comments.length > 0 ? (
            <List dense>
              {profile.comments.map((comment, index) => (
                <ListItem key={index} className="profile-form-comment-item">
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" className="profile-form-no-content">
              No comments yet
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Orders */}
        <Box>
          <Box className="profile-form-section-header">
            <ShoppingBagOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6">Orders</Typography>
          </Box>
          {profile.orders && profile.orders.length > 0 ? (
            <List dense>
              {profile.orders.map((order, index) => (
                <ListItem key={index} className="profile-form-order-item">
                  <ListItemText
                    primary={`Date: ${order.date} — Time: ${order.time}`}
                    secondary={
                      <Stack
                        direction="row"
                        spacing={0.5}
                        className="profile-form-order-chips"
                      >
                        {order.selectedItems.map((item, i) => (
                          <Chip
                            key={i}
                            label={item}
                            size="small"
                            className="profile-form-order-chip"
                          />
                        ))}
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" className="profile-form-no-content">
              No orders yet
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ChefProfileForm;
