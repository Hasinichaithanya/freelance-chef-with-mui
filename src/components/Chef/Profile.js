import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Button, Stack } from "@mui/material";
import ChefModal from "../ChefModal/ChefModal";
import "./Chef.css";

const ChefProfile = ({ chef = {} }) => {
  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [likes, setLikes] = useState(chef.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const openChefModal = () => {
    console.log("Opening ChefModal...", ChefModalIsOpen);
    setChefModalIsOpen(true);
  };

  const closeChefModal = () => {
    setChefModalIsOpen(false);
  };

  const handleLike = async () => {
    try {
      setIsLiked((prev) => !prev);
      const response = await fetch(
        `https://mini-project-backend-i3zm.onrender.com/update-likes/${chef._id}`,
        {
          method: "POST",
          body: JSON.stringify({ isLiked }),
        }
      );

      if (response.ok) {
        if (isLiked) {
          setLikes(likes + 1);
        } else setLikes(likes - 1);
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
  );
};

export default ChefProfile;
