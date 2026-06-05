import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Alert } from "@mui/material";
import Cookies from "js-cookie";
import useApi from "../../hooks/useApi";
import FormContainer from "../Shared/FormContainer";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const Login = () => {
  const { execute } = useApi();
  const [user, setUser] = useState({ mail: "", password: "" });
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

    const object = { email: user.mail, password: user.password };

    try {
      const result = await execute("/login", "POST", object);
      if (result.message) {
        Cookies.set("userId", JSON.stringify(result.id), { expires: 10 });
        Cookies.set("user", result.user, { expires: 10 });
        navigate("/");
        setErrors({});
      } else {
        setErrors({ loginError: result.Message });
      }
    } catch (error) {
      setErrors({ loginError: "Something went wrong. Please try again." });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer
      title="Welcome Back"
      subtitle="Sign in to your account"
      onSubmit={handleSubmit}
    >
      {errors.loginError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {errors.loginError}
        </Alert>
      )}

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
        placeholder="Enter your password"
        required
        error={Boolean(errors.password)}
        helperText={errors.password}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        startIcon={<LoginOutlinedIcon />}
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </Button>

      <Typography
        variant="body2"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        Don't have an account?{" "}
        <Typography
          component={Link}
          to="/register"
          variant="body2"
          sx={{ color: "primary.dark", fontWeight: 600 }}
        >
          Sign Up
        </Typography>
      </Typography>
    </FormContainer>
  );
};

export default Login;
