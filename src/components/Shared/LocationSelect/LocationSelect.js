import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  FormControl,
  InputLabel,
  TextField,
  Typography
} from "@mui/material";
import AppButton from "../AppButton/AppButton";
import "./LocationSelect.css";

// const LOCATIONS = [
//   "Nizamabad",
//   "Banjara Hills",
//   "Jubilee Hills",
//   "Charminar",
//   "Secunderabad",
//   "Karimnagar",
//   "Warangal",
//   "Khammam",
//   "Hyderabad"
// ];

const LocationSelect = ({
  value,
  onChange,
  onLocationClick,
  name = "location",
  required = true,
  fullWidth = true,
  margin = "normal",
  errorMesage
}) => {
  return (
    <FormControl fullWidth={fullWidth} margin={margin} variant="outlined">
      <InputLabel>Location</InputLabel>
      <Box className="location-select-row">
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          label="Location"
          required={required}
          fullWidth
        >
          {/* {LOCATIONS.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))} */}
        </TextField>
        <AppButton
          variant="outlined"
          iconOnly
          className="location-select-btn"
          onClick={onLocationClick}
          type="button"
        >
          <LocationOnIcon />
        </AppButton>
      </Box>
      {errorMesage && <Typography color="error" variant="body2" sx={{ ml: 1 }}>{errorMesage}</Typography>}
    </FormControl>
  );
};

// export { LOCATIONS };
export default LocationSelect;
