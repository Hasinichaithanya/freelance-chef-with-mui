import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import ContactForm from "../../components/ContactForm/ContactForm";
import AppButton from "../../components/Shared/AppButton/AppButton";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const user = Cookies.get("user");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      {/* Hero Section */}
      <Box className="home-hero">
        <Box
          component="img"
          src="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
          alt="Culinary experience"
          className="home-hero__image"
        />
        {/* Gradient overlay */}
        <Box className="home-hero__overlay" />
        {/* Content overlay */}
        <Container
          maxWidth="md"
          className="home-hero__content"
          sx={{ alignItems: isMobile ? "center" : "flex-start" }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            className="home-hero__title"
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Welcome to the Chef{" "}
            <Box component="span" className="home-hero__title--accent">
              Freelance
            </Box>{" "}
            Platform
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            className="home-hero__subtitle"
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Discover amazing chefs and personalized culinary experiences
            tailored just for you.
          </Typography>

          {user === undefined && (
            <AppButton
              size="lg"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/UserSignUp")}
            >
              Get Started
            </AppButton>
          )}
        </Container>
      </Box>

      {/* About Us link */}
      <Box className="home-about-link">
        <AppButton
          variant="outlined"
          size="lg"
          component={Link}
          to="/about-us"
          startIcon={<InfoOutlinedIcon />}
        >
          Learn More About Us
        </AppButton>
      </Box>

      {/* Contact Form */}
      <ContactForm />
    </Box>
  );
};

export default Home;
