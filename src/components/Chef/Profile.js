import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
<<<<<<< HEAD
import { v4 as uuidv4 } from "uuid";
import BookingModal from "../Booking/Booking";

import Modal from "react-modal";
import "./Chef.css";

Modal.setAppElement("#root"); // Ensure this line is present

const ChefProfile = ({ chef = {} }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(chef.comments || []);
  const [likes, setLikes] = useState(chef.likes || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChefId, setSelectedChefId] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const openBookingModal = (chefId) => {
    setSelectedChefId(chefId);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
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
=======
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Button, Stack } from "@mui/material";
import ChefModal from "../ChefModal/ChefModal";
import "./Chef.css";

const ChefProfile = ({ chef = {} }) => {
  // console.log(chef);
  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [likes, setLikes] = useState(chef.likes || 0);
  // const [selectedChefId, setSelectedChefId] = useState("");

  const openChefModal = () => {
    console.log("Opening ChefModal...", ChefModalIsOpen);
    setChefModalIsOpen(true);
  };

  const closeChefModal = () => {
    setChefModalIsOpen(false);
  };

  // const handleCommentChange = (event) => {
  //   setNewComment(event.target.value);
  // };

  // const handleCommentSubmit = async (event) => {
  //   event.preventDefault();
  //   if (newComment.trim() === "") return;

  //   const updatedComments = [...comments, newComment];

  //   try {
  //     const response = await fetch(
  //       `https://mini-project-backend-i3zm.onrender.com/update-comments/${chef._id}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ comments: updatedComments }),
  //       }
  //     );

  //     if (response.ok) {
  //       setComments(updatedComments);
  //       setNewComment("");
  //     } else {
  //       console.error("Failed to update comments");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
>>>>>>> e814dd919dcb57d43fbbad08a9b7e57c15b53b1d

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://mini-project-backend-i3zm.onrender.com/update-likes/${chef._id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setLikes(likes + 1);
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="chef-profile">
      <img src={chef.image || ""} alt={chef.name || "Chef"} />
      <h3>{chef.name || "Unknown Chef"}</h3> <hr />
      <p>
        <b>Specialities:</b>
        {chef.Fooditems.map((item) => (
          <li className="list-item" key={uuidv4()}>
            {item},
          </li>
        )) || "Specialties not available"}
      </p>
      <hr />
      <p>
        <strong>
          <i>Exp: </i>
        </strong>
        {chef.Experience || 0} years
      </p>{" "}
      <hr />
      <p>
        <b>
          <i>Cost: </i>
        </b>
        {chef.cost || "Cost not available"} per meal
      </p>{" "}
      <hr />
      <div className="btns-container">
        <button onClick={handleLike}>
          {likes} <AiOutlineLike />
        </button>
        <br />
        <button onClick={openModal} className="more-btn">
          More
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chef Details"
      >
        <h2>{chef.name || "Unknown Chef"}</h2>
        <img
          src={chef.image || ""}
          alt={chef.name || "Chef"}
          className="modal-image"
        />
        <p>
          <strong>Location:</strong> {chef.Location || "Location not available"}
        </p>
        <p>
          <strong>Experience:</strong> {chef.Experience || 0} years
        </p>
        <p>
          <strong>Mail: </strong>
          {chef.email}
        </p>
        <p>
          <strong>Specialties:</strong>{" "}
          {chef.Fooditems
            ? chef.Fooditems.join(", ")
            : "Specialties not available"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {chef.Description || "Description not available"}
        </p>
        <p>
          <strong>Comments:</strong>
        </p>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment, index) => <li key={index}>{comment}</li>)
          ) : (
            <li>No comments available</li>
          )}
        </ul>
        <form className="form-modal" onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add your comment"
          />
          <button type="submit" className="modal-btn">
            Comment
          </button>
        </form>
        <button
          className="modal-btn"
          onClick={() => openBookingModal(chef._id)}
        >
          Book Chef
        </button>
        <BookingModal
          isOpen={isModalOpen}
          closeModal={closeBookingModal}
          chefId={selectedChefId}
          items={chef.Fooditems}
        />
        <button onClick={closeModal} className="modal-btn">
          Close
        </button>
      </Modal>
    </div>
=======
    <Card className="chef-profile">
      <CardMedia
        component="img"
        src={chef.image || ""}
        alt={chef.name || "Chef"}
      />
      <CardContent>
        <Typography variant="subtitle1">
          {chef.name || "Unknown Chef"}
        </Typography>{" "}
        {/* <hr /> */}
        <hr />
        <Typography variant="subtitle2">
          <strong>
            <i>Exp: </i>
          </strong>
          {chef.Experience || 0} years
        </Typography>{" "}
        <hr />
        <Typography variant="subtitle2">
          <b>
            <i>Cost: </i>
          </b>
          Rs.{chef.cost || "Cost not available"} / meal
        </Typography>{" "}
        <hr />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="warning" onClick={handleLike}>
            {likes} <AiOutlineLike />
          </Button>
          <br />
          <Button variant="outlined" onClick={openChefModal} color="warning">
            More
          </Button>
        </Stack>
        <ChefModal
          chef={chef}
          ChefModalIsOpen={ChefModalIsOpen}
          closeChefModal={closeChefModal}
        />
      </CardContent>
    </Card>
>>>>>>> e814dd919dcb57d43fbbad08a9b7e57c15b53b1d
  );
};

export default ChefProfile;
