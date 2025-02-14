import React from "react";
import { Typography, Button, CardMedia } from "@mui/material";
import "./Home.css";
import ContactForm from "../components/ContactForm/ContactForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/UserSignUp");
  };
  const user = Cookies.get("user");
  return (
    <div className="home">
      <CardMedia
        component="img"
        src="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
        alt="Image"
      />
      <div className="content">
        <Typography variant="h5" fontWeight="bold" color="orange">
          Welcome to the Chef Freelance Platform
        </Typography>

        <Typography
          variant="body1"
          fontWeight="semibold"
          color="orange"
          sx={{ marginTop: 3 }}
          className="tag-line"
        >
          Discover amazing chefs and personalized culinary experiences.
        </Typography>
        {user === undefined && (
          <Button
            href="#"
            variant="contained"
            sx={{
              marginTop: 10,
              marginBottom: -5,
              padding: "10px 20px",
              backgroundColor: "#f9a300",
              color: "white",
              fontWeight: "bold",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#f9a300",
              },
            }}
            onClick={handleButtonClick}
          >
            Register
          </Button>
        )}
      </div>
      <div className="mobile-intro">
        <Typography variant="h5" fontWeight="bold" color="orange">
          Welcome to the Chef Freelance Platform
        </Typography>

        <Typography
          variant="body1"
          fontWeight="semibold"
          color="orange"
          sx={{ marginTop: 3 }}
          className="tag-line"
        >
          Discover amazing chefs and personalized culinary experiences.
        </Typography>
      </div>
      <Link to="/about-us">
        <Button color="primary" variant="contained" sx={{ marginTop: "20px" }}>
          About Us
        </Button>
      </Link>

      <ContactForm />
    </div>
  );
};

export default Home;
