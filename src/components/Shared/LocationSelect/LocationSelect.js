import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
    </FormControl>
  );
};

// export { LOCATIONS };
export default LocationSelect;
