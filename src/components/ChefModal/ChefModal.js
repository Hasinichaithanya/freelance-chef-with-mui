import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  TextField,
  Avatar,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import BookingModal from "../Booking/Booking";
import useApi from "../../hooks/useApi";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const ChefModal = ({ chef, ChefModalIsOpen, closeChefModal }) => {
  const navigate = useNavigate();
  const { execute } = useApi();
  const [isModalOpen, setBookingModalOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(chef.comments || []);
  const user = Cookies.get("user");
  const userId = Cookies.get("userId");

  const openBookingModal = () => {
    if (!userId) {
      setLoginPromptOpen(true);
      return;
    }
    setBookingModalOpen(true);
  };
  const closeBookingModal = () => setBookingModalOpen(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!userId) {
      setLoginPromptOpen(true);
      return;
    }
    if (newComment.trim() === "") return;
    const updatedComments = [...comments, newComment];

    try {
      const response = await execute(`/update-comments/${chef._id}`, "POST", {
        comments: updatedComments,
      });
      if (response) {
        setComments(updatedComments);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog
        open={ChefModalIsOpen}
        onClose={closeChefModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Chef Details
          <IconButton onClick={closeChefModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Chef Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              src={chef.image || ""}
              alt={chef.name || "Chef"}
              sx={{
                width: 140,
                height: 140,
                border: "4px solid",
                borderColor: "primary.light",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {chef.name || "Unknown Chef"}
            </Typography>
          </Box>

          {/* Info Grid */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <LocationOnOutlinedIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Location
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {chef.Location || "Not available"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <WorkOutlineIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Experience
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {chef.Experience || 0} years
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <EmailOutlinedIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Email
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {chef.email}
                </Typography>
              </Box>
            </Box>
          </Stack>

          {/* Description */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", mb: 0.5 }}
            >
              About
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
              {chef.Description || "Description not available"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Specialties */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", mb: 1 }}
            >
              Specialties
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {chef.Fooditems.map((item) => (
                <Chip
                  key={uuidv4()}
                  icon={<RestaurantMenuIcon />}
                  label={item}
                  variant="outlined"
                  sx={{ borderColor: "primary.light", mb: 0.5 }}
                />
              )) || "Not available"}
            </Stack>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Comments */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
            >
              <ChatBubbleOutlineIcon
                fontSize="small"
                sx={{ color: "primary.main" }}
              />
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Comments ({comments.length})
              </Typography>
            </Box>
            {comments.length > 0 ? (
              <List dense disablePadding>
                {comments.map((comment, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      backgroundColor: "background.default",
                      borderRadius: 2,
                      mb: 0.5,
                      px: 2,
                    }}
                  >
                    <ListItemText
                      primary={comment}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", ml: 1 }}
              >
                No comments yet
              </Typography>
            )}

            {/* Add Comment */}
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add your comment..."
              />
              <Tooltip
                title={user === undefined ? "Click to comment" : ""}
                arrow
              >
                <span>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCommentSubmit}
                    sx={{ minWidth: "auto", px: 2 }}
                  >
                    <SendIcon fontSize="small" />
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeChefModal} variant="outlined">
            Close
          </Button>
          <Tooltip
            title={user === "Chef" ? "Chefs cannot book other chefs" : ""}
            arrow
          >
            <span>
              <Button
                variant="contained"
                onClick={openBookingModal}
                disabled={user === "Chef"}
              >
                Book Chef
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <BookingModal
        isOpen={isModalOpen}
        closeModal={closeBookingModal}
        chefId={chef._id}
        items={chef.Fooditems}
      />

      <Dialog
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        aria-labelledby="login-prompt-title"
      >
        <DialogTitle id="login-prompt-title" sx={{ fontWeight: 700 }}>
          Login Required
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            You need to be logged in to perform this action. Would you like to
            sign in or register now?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setLoginPromptOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setLoginPromptOpen(false);
              navigate("/UserSignUp");
            }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setLoginPromptOpen(false);
              navigate("/login");
            }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChefModal;
