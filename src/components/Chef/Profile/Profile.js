import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Cookies from "js-cookie";
import useApi from "../../../hooks/useApi";
import ChefModal from "../../ChefModal/ChefModal";
import AppButton from "../../Shared/AppButton/AppButton";
import LoginPromptDialog from "../../Shared/LoginPromptDialog/LoginPromptDialog";
import "./Profile.css";

const ChefProfile = ({ chef = {} }) => {
  const { execute } = useApi();
  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [likes, setLikes] = useState(chef.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const openChefModal = () => setChefModalIsOpen(true);
  const closeChefModal = () => setChefModalIsOpen(false);

  const handleLike = async () => {
    try {
      const newLiked = !isLiked;
      setIsLiked(newLiked);
      const response = await execute(`/update-likes/${chef._id}`, "POST", {
        isLiked: newLiked,
      });
      if (response) {
        setLikes((prev) => (newLiked ? prev + 1 : prev - 1));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUser = (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");
    if (!userId) {
      setLoginPromptOpen(true);
      return;
    }
    handleLike();
  };

  return (
    <>
      <Card className="chef-card">
        {/* Chef Image */}
        <Box className="chef-card__avatar-wrapper">
          <Avatar
            src={chef.image || ""}
            alt={chef.name || "Chef"}
            className="chef-card__avatar"
          />
        </Box>

        <CardContent className="chef-card__content" sx={{ pt: 1, flexGrow: 1 }}>
          <Typography variant="h6" className="chef-card__name">
            {chef.name || "Unknown Chef"}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            className="chef-card__chips"
          >
            <Chip
              icon={<WorkOutlineIcon />}
              label={`${chef.Experience || 0} yrs`}
              size="small"
              variant="outlined"
              sx={{ borderColor: "divider" }}
            />
            <Chip
              icon={<CurrencyRupeeIcon />}
              label={`${chef.cost || "N/A"} / meal`}
              size="small"
              className="chef-card__chip--price"
            />
          </Stack>
        </CardContent>

        <Divider />

        <CardActions className="chef-card__actions">
          <AppButton
            variant="outlined"
            size="small"
            onClick={handleUser}
            startIcon={
              isLiked ? (
                <FavoriteIcon sx={{ color: "error.main" }} />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            className={`chef-card__like-btn${isLiked ? " chef-card__like-btn--active" : ""}`}
          >
            {likes}
          </AppButton>
          <AppButton size="small" onClick={openChefModal}>
            Details
          </AppButton>
        </CardActions>
      </Card>

      <ChefModal
        chef={chef}
        ChefModalIsOpen={ChefModalIsOpen}
        closeChefModal={closeChefModal}
      />

      <LoginPromptDialog
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        message="You need to be logged in to like a chef's profile. Would you like to sign in or register now?"
      />
    </>
  );
};

export default ChefProfile;
