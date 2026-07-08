import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Alert, TextField, Typography } from "@mui/material";
import AppButton from "../../Shared/AppButton/AppButton";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { getLocation } from "../../../services/locationService";
import FormContainer from "../../Shared/FormContainer/FormContainer";
import LocationSelect from "../../Shared/LocationSelect/LocationSelect";
import "./UserSignUp.css";

const UserSignUp = () => {
  const { execute } = useApi();
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
    location: "Nizamabad",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [locationError, setLocationError] = useState("");
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
      const result = await execute("/user-signup", "POST", object);
      if (result.message) {
        Cookies.set("userId", result.id, { expires: 10 });
        Cookies.set("user", result.user, { expires: 10 });
        navigate("/");
      } else {
        setApiError(
          result.Message ||
          "Sign up failed. This email may already be registered."
        );
      }
    } catch (error) {
      setApiError("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleLocationClick = async () => {
    setLocationError("");
    try {
      const { locationName } = await getLocation();
      // Store coords as a readable string for display; adjust to your API's expected format
      console.log(locationName)
      setUser((prev) => ({
        ...prev,
        location: locationName.city
      }));
    } catch (err) {
      setLocationError(err.message);
    }
  };
  return (
    <FormContainer
      title="Create Account"
      subtitle="Join as a customer to book chefs"
      onSubmit={handleSubmit}
    >
      {apiError && (
        <Alert severity="error" className="usersignup-alert">
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
        onLocationClick={handleLocationClick}
      />
      {locationError && (
        <Alert severity="warning" className="usersignup-alert">
          {locationError}
        </Alert>
      )}

      <AppButton
        fullWidth
        type="submit"
        size="lg"
        startIcon={<PersonAddOutlinedIcon />}
        className="usersignup-submit-btn"
      >
        Sign Up
      </AppButton>

      <Typography variant="body2" className="usersignup-footer-text auth-link-text">
        Want to register as a Chef?{" "}
        <Typography
          component={Link}
          to="/register"
          variant="body2"
          className="usersignup-footer-link"
        >
          Register here
        </Typography>
      </Typography>
      <Typography variant="body2" className="usersignup-footer-text--last auth-link-text">
        Already have an account?{" "}
        <Typography
          component={Link}
          to="/login"
          variant="body2"
          className="usersignup-footer-link"
        >
          Login
        </Typography>
      </Typography>
    </FormContainer>
  );
};

export default UserSignUp;
