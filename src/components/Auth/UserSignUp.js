import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Alert } from "@mui/material";
import Cookies from "js-cookie";
import FormContainer from "../Shared/FormContainer";
import LocationSelect from "../Shared/LocationSelect";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const UserSignUp = () => {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
    location: "Nizamabad",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required.";
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
      name: user.name,
      email: user.mail,
      location: user.location,
      password: user.password,
    };

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      };
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/user-signup",
        options
      );
      const result = await response.json();
      if (result.message) {
        Cookies.set("userId", JSON.stringify(result.id), { expires: 10 });
        Cookies.set("user", result.user, { expires: 10 });
        navigate("/");
      } else {
        setApiError(result.Message || "Sign up failed. This email may already be registered.");
      }
    } catch (error) {
      setApiError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer
      title="Create Account"
      subtitle="Join as a customer to book chefs"
      onSubmit={handleSubmit}
    >
      {apiError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {apiError}
        </Alert>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        name="mail"
        value={user.mail}
        onChange={handleChange}
        placeholder="you@example.com"
        required
        error={Boolean(errors.mail)}
        helperText={errors.mail}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Create a password"
        required
        error={Boolean(errors.password)}
        helperText={errors.password}
      />

      <LocationSelect
        value={user.location}
        onChange={handleChange}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        startIcon={<PersonAddOutlinedIcon />}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>

      <Typography
        variant="body2"
        sx={{ textAlign: "center", color: "text.secondary", mb: 1 }}
      >
        Want to register as a Chef?{" "}
        <Typography
          component={Link}
          to="/register"
          variant="body2"
          sx={{ color: "primary.dark", fontWeight: 600 }}
        >
          Register here
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        Already have an account?{" "}
        <Typography
          component={Link}
          to="/login"
          variant="body2"
          sx={{ color: "primary.dark", fontWeight: 600 }}
        >
          Login
        </Typography>
      </Typography>
    </FormContainer>
  );
};

export default UserSignUp;
