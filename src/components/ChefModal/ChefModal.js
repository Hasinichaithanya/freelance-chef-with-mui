import React, { useState } from "react";
import {
  Button,
  Typography,
  CardMedia,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import BookingModal from "../Booking/Booking";

import { v4 as uuidv4 } from "uuid";

const ChefModal = ({ chef, ChefModalIsOpen, closeChefModal }) => {
  const [isModalOpen, setBookingModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(chef.comments || []);
  const openBookingModal = (chefId) => {
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    const updatedComments = [...comments, newComment];

    try {
      const response = await fetch(
        `https://mini-project-backend-i3zm.onrender.com/update-comments/${chef._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: updatedComments }),
        }
      );

      if (response.ok) {
        setComments(updatedComments);
        setNewComment("");
      } else {
        console.error("Failed to update comments");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Dialog open={ChefModalIsOpen} onClose={closeChefModal}>
      <DialogTitle>Chef Details</DialogTitle>

      <DialogContent>
        <Typography>{chef.name || "Unknown Chef"}</Typography>
        <CardMedia
          component="img"
          src={chef.image || ""}
          alt={chef.name || "Chef"}
          className="modal-image"
        />
        <Box>
          <Typography variant="subtitle1">Description:</Typography>
          <Typography variant="subtitle2">
            {" "}
            {chef.Description || "Description not available"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Location:</Typography>
          <Typography variant="subtitle2">
            {chef.Location || "Location not available"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Experience:</Typography>
          <Typography variant="subtitle2">
            {chef.Experience || 0} years
          </Typography>
        </Box>{" "}
        <Box>
          <Typography variant="subtitle1">Mail:</Typography>
          <Typography variant="subtitle2">{chef.email}</Typography>
        </Box>
        <Box>
          {" "}
          <Typography variant="subtitle1">Specialities:</Typography>
          <List>
            {chef.Fooditems.map((item) => (
              <ListItem className="list-item" key={uuidv4()}>
                <RestaurantMenuIcon /> {item}
              </ListItem>
            )) || "Specialties not available"}
          </List>{" "}
        </Box>
        <Box>
          <Typography variant="subtitle1">Comments:</Typography>
          <List>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListItem key={index}>
                  <ArrowRightIcon />
                  {comment}
                </ListItem>
              ))
            ) : (
              <ListItem>No comments available</ListItem>
            )}
          </List>
        </Box>
        <FormControl className="form-modal" onSubmit={handleCommentSubmit}>
          <TextField
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add your comment"
          />
          <Button type="submit" variant="outlined" color="warning">
            Comment
          </Button>
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => openBookingModal(chef._id)}
          >
            Book Chef
          </Button>
        </Box>
        <DialogActions>
          <Button onClick={closeChefModal} variant="outlined" color="warning">
            Close
          </Button>
        </DialogActions>
      </DialogContent>
      <BookingModal
        isOpen={isModalOpen}
        closeModal={closeBookingModal}
        chefId={chef._id}
        items={chef.Fooditems}
      />
    </Dialog>
  );
};
export default ChefModal;
