import React from "react";
import { Typography, Button } from "@mui/material";
import "./Home.css";
import ContactForm from "../components/ContactForm/ContactForm";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/UserSignUp');
  };

  return (
    <div className="home">
      <img
        src="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
        alt="Image"
      />
      <div className="content">
        <Typography variant="h5" fontWeight="bold" color="white">
          Welcome to the Chef Freelance Platform
        </Typography>
        <Typography variant="body2" fontWeight="semibold" color="white" sx={{ marginTop: 3 }}>
          Discover amazing chefs and personalized culinary experiences.
        </Typography>
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
              backgroundColor: "#f9a300"
            }
          }}
          onClick={handleButtonClick}
        >
          Register
        </Button>
      </div>
      <ContactForm />
    </div>
  );
};

export default Home;
