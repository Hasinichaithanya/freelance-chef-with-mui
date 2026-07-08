import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { Alert, Box, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import useGenerateDescription from "../../../hooks/useGenerateDescription";
import { getLocation } from "../../../services/locationService";
import AppButton from "../../Shared/AppButton/AppButton";
import FormContainer from "../../Shared/FormContainer/FormContainer";
import LocationSelect from "../../Shared/LocationSelect/LocationSelect";
import "./Register.css";



const Register = () => {
  const { execute } = useApi();
  const { generateDescription, aiDescError, isGenerating } = useGenerateDescription();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    specialties: "",
    experience: "",
    pricePerMeal: "",
    photo: "",
    mail: "",
    password: "",
    fooditems: "",
    location: "Nizamabad",
  });
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = "Name is required.";
    if (!profile.mail) {
      newErrors.mail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(profile.mail)) {
      newErrors.mail = "Email address is invalid.";
    }
    if (!profile.password) newErrors.password = "Password is required.";
    if (!profile.experience || isNaN(profile.experience))
      newErrors.experience = "Experience must be a number.";
    if (!profile.pricePerMeal || isNaN(profile.pricePerMeal))
      newErrors.pricePerMeal = "Price per meal must be a number.";
    if (!profile.fooditems) newErrors.fooditems = "Food items are required.";
    if (!image.image) newErrors.image = "Image is required.";
    if (!profile.specialties)
      newErrors.specialties = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handlGenerateDescription = async () => {
    const description = await generateDescription({
      experience: profile.experience,
      fooditems: profile.fooditems,
    });
    if (description) {
      setProfile((prev) => ({ ...prev, specialties: description }));
    }

  };

  const handleLocationClick = async () => {
    setLocationError("");
    try {
      const { locationName } = await getLocation();
      setProfile((prev) => ({
        ...prev,
        location: locationName.city
      }));
    } catch (err) {
      setLocationError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const object = {
      name: profile.name,
      email: profile.mail,
      cost: profile.pricePerMeal,
      image: image.image,
      Location: profile.location,
      Experience: profile.experience,
      Fooditems: profile.fooditems.split(","),
      Description: profile.specialties,
      Password: profile.password,
    };

    try {
      setIsSubmitted(true);
      const result = await execute("/register", "POST", object);
      if (result) {
        Cookies.set("userId", JSON.stringify(result.chefDetails.id), {
          expires: 10,
        });
        Cookies.set("user", "Chef", { expires: 10 });
        navigate("/");
      } else {
        setIsSubmitted(false);
        console.error("Registration failed:", result);
      }
    } catch (error) {
      setIsSubmitted(false);
      console.error("Error:", error);
    }
  };



  return (
    <FormContainer
      title="Register as a Chef"
      subtitle="Create your chef profile and start cooking"
      maxWidth={540}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Enter your name"
        error={Boolean(errors.name)}
        helperText={errors.name}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        name="mail"
        value={profile.mail}
        onChange={handleChange}
        placeholder="you@example.com"
        error={Boolean(errors.mail)}
        helperText={errors.mail}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        name="password"
        value={profile.password}
        onChange={handleChange}
        placeholder="Create a password"
        error={Boolean(errors.password)}
        helperText={errors.password}
        required
      />

      <Box className="field-row">
        <TextField
          fullWidth
          margin="normal"
          label="Experience (years)"
          type="number"
          name="experience"
          value={profile.experience}
          onChange={handleChange}
          error={Boolean(errors.experience)}
          helperText={errors.experience}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price per Meal (₹)"
          type="number"
          name="pricePerMeal"
          value={profile.pricePerMeal}
          onChange={handleChange}
          error={Boolean(errors.pricePerMeal)}
          helperText={errors.pricePerMeal}
          required
        />
      </Box>

      <LocationSelect value={profile.location} onChange={handleChange} onLocationClick={handleLocationClick} errorMesage={locationError} />

      <TextField
        fullWidth
        margin="normal"
        label="Food Items"
        name="fooditems"
        value={profile.fooditems}
        onChange={handleChange}
        placeholder="e.g. Biryani, Paneer Tikka, Pasta"
        error={Boolean(errors.fooditems)}
        helperText={errors.fooditems || "Separate items with commas"}
        required
      />

      <Box className="register-upload-section">
        <p className="upload-label">
          <CloudUploadOutlinedIcon fontSize="small" />
          Upload your photo
        </p>
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImage({ image: base64 })}
        />
        {errors.image && (
          <Alert severity="error" className="register-alert">
            {errors.image}
          </Alert>
        )}
      </Box>

      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="specialties"
        value={profile.specialties}
        onChange={handleChange}
        placeholder="Tell us about yourself and your cooking style"
        multiline
        rows={3}
        error={Boolean(errors.specialties)}
        helperText={errors.specialties}
        required
      />
      <AppButton startIcon={<AutoAwesomeIcon />} variant="outlined" onClick={handlGenerateDescription} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "AI"}
      </AppButton>
      {aiDescError && <Typography color="error">{aiDescError}</Typography>}
      <AppButton
        fullWidth
        type="submit"
        size="lg"
        startIcon={<RestaurantOutlinedIcon />}
        disabled={isSubmitted}
        className="register-submit-btn"
      >
        {isSubmitted ? "Registering..." : "Register"}
      </AppButton>
    </FormContainer>
  );
};

export default Register;
