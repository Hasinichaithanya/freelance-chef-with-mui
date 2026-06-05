import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Cookies from "js-cookie";
import ChefModal from "../ChefModal/ChefModal";

const ChefProfile = ({ chef = {} }) => {
  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [likes, setLikes] = useState(chef.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const openChefModal = () => setChefModalIsOpen(true);
  const closeChefModal = () => setChefModalIsOpen(false);

  const handleLike = async () => {
    try {
      const newLiked = !isLiked;
      setIsLiked(newLiked);
      const response = await fetch(
        `https://mini-project-backend-i3zm.onrender.com/update-likes/${chef._id}`,
        {
          method: "POST",
          body: JSON.stringify({ isLiked: newLiked }),
        }
      );
      if (response.ok) {
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
      <Card
        sx={{
          width: { xs: "100%", sm: 260 },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Chef Image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
            pb: 1,
          }}
        >
          <Avatar
            src={chef.image || ""}
            alt={chef.name || "Chef"}
            sx={{
              width: 120,
              height: 120,
              border: "3px solid",
              borderColor: "primary.light",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Box>

        <CardContent sx={{ textAlign: "center", pt: 1, flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 1.5,
            }}
          >
            {chef.name || "Unknown Chef"}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ mb: 1.5 }}
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
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "& .MuiChip-icon": { color: "primary.contrastText" },
              }}
            />
          </Stack>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "center", p: 1.5, gap: 1 }}>
          <Button
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
            sx={{
              borderColor: isLiked ? "error.main" : "divider",
              color: isLiked ? "error.main" : "text.secondary",
              "&:hover": {
                borderColor: "error.main",
                backgroundColor: "rgba(239,68,68,0.04)",
                transform: "none",
                boxShadow: "none",
              },
            }}
          >
            {likes}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={openChefModal}
          >
            Details
          </Button>
        </CardActions>
      </Card>

      <ChefModal
        chef={chef}
        ChefModalIsOpen={ChefModalIsOpen}
        closeChefModal={closeChefModal}
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
            You need to be logged in to like a chef's profile. Would you like to sign in or register now?
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

export default ChefProfile;
