import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!user.mail) {
      newErrors.mail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.mail)) {
      newErrors.mail = "Email address is invalid.";
    }
    if (!user.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const object = {
      email: user.mail,
      password: user.password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    };

    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/login",
        options
      );
      const result = await response.json();
      console.log(result);
      if (result.message) {
        Cookies.set("userId", JSON.stringify(result.id), {
          expires: 10,
        });
        Cookies.set("user", result.user, {
          expires: 10,
        });
        navigate("/");
        setErrors({});
      } else {
        console.error("Login failed:", result);
        setErrors({
          loginError: result.Message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({
        loginError: error.Message,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <Box
      className="auth-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth="400px"
      >
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          variant="outlined"
          name="mail"
          value={user.mail}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          error={Boolean(errors.mail)}
          helperText={errors.mail}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "orange",
            color: "white",
            marginTop: 2,
            "&:hover": {
              backgroundColor: "#ff8c00",
            },
          }}
        >
          Login
        </Button>
      </Box>

      <Typography variant="body2" sx={{ marginTop: 2 }}>
        <Link to="/register">Don't have an account? Sign Up!</Link>
      </Typography>
      {errors && <Typography color="red">{errors.loginError}</Typography>}
    </Box>
  );
};

export default Login;
