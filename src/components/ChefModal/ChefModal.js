import React, { useState } from "react";

import {
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
  Tooltip,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import BookingModal from "../../components/Booking/Booking";
import useApi from "../../hooks/useApi";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import AppButton from "../Shared/AppButton/AppButton";
import LoginPromptDialog from "../Shared/LoginPromptDialog/LoginPromptDialog";
import "./ChefModal.css";

const ChefModal = ({ chef, ChefModalIsOpen, closeChefModal }) => {
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
        <DialogTitle className="chef-modal-title-row">
          Chef Details
          <IconButton onClick={closeChefModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Chef Header */}
          <Box className="chef-modal-chef-header">
            <Avatar
              src={chef.image || ""}
              alt={chef.name || "Chef"}
              className="chef-modal-avatar"
            />
            <Typography variant="h5" className="chef-modal-chef-name">
              {chef.name || "Unknown Chef"}
            </Typography>
          </Box>

          {/* Info Grid */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Box className="chef-modal-info-row">
              <LocationOnOutlinedIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="caption" className="chef-modal-info-label">
                  Location
                </Typography>
                <Typography variant="body2" className="chef-modal-info-value">
                  {chef.location || "Not available"}
                </Typography>
              </Box>
            </Box>
            <Box className="chef-modal-info-row">
              <WorkOutlineIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="caption" className="chef-modal-info-label">
                  Experience
                </Typography>
                <Typography variant="body2" className="chef-modal-info-value">
                  {chef.experience || 0} years
                </Typography>
              </Box>
            </Box>
            <Box className="chef-modal-info-row">
              <EmailOutlinedIcon sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="caption" className="chef-modal-info-label">
                  Email
                </Typography>
                <Typography variant="body2" className="chef-modal-info-value">
                  {chef.email}
                </Typography>
              </Box>
            </Box>
          </Stack>

          {/* Description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" className="chef-modal-about-label">
              About
            </Typography>
            <Typography variant="body2" className="chef-modal-about-text">
              {chef.description || "Description not available"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Specialties */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" className="chef-modal-section-label">
              Specialties
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {chef.foodItems.map((item) => (
                <Chip
                  key={uuidv4()}
                  icon={<RestaurantMenuIcon />}
                  label={item}
                  variant="outlined"
                  className="chef-modal-specialty-chip"
                />
              )) || "Not available"}
            </Stack>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Comments */}
          <Box sx={{ mb: 2 }}>
            <Box className="chef-modal-comments-header">
              <ChatBubbleOutlineIcon fontSize="small" sx={{ color: "primary.main" }} />
              <Typography variant="subtitle2" className="chef-modal-comments-label">
                Comments ({comments.length})
              </Typography>
            </Box>
            {comments.length > 0 ? (
              <List dense disablePadding>
                {comments.map((comment, index) => (
                  <ListItem key={index} className="chef-modal-comment-item">
                    <ListItemText
                      primary={comment}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" className="chef-modal-no-comments">
                No comments yet
              </Typography>
            )}

            {/* Add Comment */}
            <Box className="chef-modal-add-comment">
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
                  <AppButton

                    size="small"
                    onClick={handleCommentSubmit}
                    className="chef-modal-send-btn"
                  >
                    <SendIcon fontSize="small" />
                  </AppButton>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions className="chef-modal-dialog-actions">
          <AppButton onClick={closeChefModal} variant="outlined">
            Close
          </AppButton>
          <Tooltip
            title={user === "Chef" ? "Chefs cannot book other chefs" : ""}
            arrow
          >
            <span>
              <AppButton

                onClick={openBookingModal}
                disabled={user === "Chef"}
              >
                Book Chef
              </AppButton>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <BookingModal
        isOpen={isModalOpen}
        closeModal={closeBookingModal}
        chefId={chef._id}
        items={chef.foodItems}
      />

      <LoginPromptDialog
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
      />
    </>
  );
};

export default ChefModal;
