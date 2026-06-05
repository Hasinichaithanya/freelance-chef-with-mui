import React from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ContactForm from "../components/ContactForm/ContactForm";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Home = () => {
  const navigate = useNavigate();
  const user = Cookies.get("user");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          mb: 6,
          minHeight: { xs: 320, md: 420 },
        }}
      >
        <Box
          component="img"
          src="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
          alt="Culinary experience"
          sx={{
            width: "100%",
            height: { xs: 320, md: 420 },
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(30,41,59,0.75) 0%, rgba(245,158,11,0.45) 100%)",
          }}
        />
        {/* Content overlay */}
        <Container
          maxWidth="md"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "flex-start",
            px: { xs: 3, md: 6 },
            animation: "fadeInUp 0.7s ease-out",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            sx={{
              color: "#FFFFFF",
              fontWeight: 800,
              mb: 2,
              textAlign: isMobile ? "center" : "left",
              textShadow: "0 2px 16px rgba(0,0,0,0.2)",
              lineHeight: 1.2,
            }}
          >
            Welcome to the Chef{" "}
            <Box
              component="span"
              sx={{ color: "primary.light" }}
            >
              Freelance
            </Box>{" "}
            Platform
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 4,
              maxWidth: 520,
              fontWeight: 400,
              textAlign: isMobile ? "center" : "left",
              lineHeight: 1.6,
            }}
          >
            Discover amazing chefs and personalized culinary experiences
            tailored just for you.
          </Typography>

          {user === undefined && (
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/UserSignUp")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Get Started
            </Button>
          )}
        </Container>
      </Box>

      {/* About Us link */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button
          component={Link}
          to="/about-us"
          variant="outlined"
          startIcon={<InfoOutlinedIcon />}
          size="large"
        >
          Learn More About Us
        </Button>
      </Box>

      {/* Contact Form */}
      <ContactForm />
    </Box>
  );
};

export default Home;
