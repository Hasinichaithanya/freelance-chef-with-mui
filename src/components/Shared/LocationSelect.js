import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const LOCATIONS = [
  "Nizamabad",
  "Banjara Hills",
  "Jubilee Hills",
  "Charminar",
  "Secunderabad",
  "Karimnagar",
  "Warangal",
  "Khammam",
];

const LocationSelect = ({ value, onChange, name = "location", required = true, fullWidth = true, margin = "normal" }) => {
  return (
    <FormControl fullWidth={fullWidth} margin={margin} variant="outlined">
      <InputLabel>Location</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label="Location"
        required={required}
      >
        {LOCATIONS.map((loc) => (
          <MenuItem key={loc} value={loc}>
            {loc}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { LOCATIONS };
export default LocationSelect;
