/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const BookingModal = ({ isOpen, closeModal, chefId, items }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (item) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          `https://mini-project-backend-i3zm.onrender.com/bookings/${chefId}`,
          { method: "GET" }
        );
        const res = await response.json();
        if (response.status == 200) {
          setBookedDates(res.bookings);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };
    fetchDates();
  }, [chefId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("user");
    if (!userId) {
      navigate("/UserSignUp");
      return;
    }
    try {
      await bookChef();
      closeModal();
    } catch (error) {
      console.error("Error booking chef:", error);
    }
  };

  const bookChef = async () => {
    try {
      const id = Cookies.get("userId");
      const userId = id.slice(1, -1);
      await fetch(
        "https://mini-project-backend-i3zm.onrender.com/send-mail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chefId, userId, date, time, selectedItems }),
        }
      );
    } catch (error) {
      console.error("Error booking chef:", error);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (bookedDates.includes(selectedDate)) {
      alert("This date is already booked. Please select another date.");
      setDate("");
    } else {
      setDate(selectedDate);
    }
  };

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Book Chef
        <IconButton onClick={closeModal} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="form"
          onSubmit={handleBooking}
          id="booking-form"
        >
          {/* Date */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
            >
              <CalendarTodayOutlinedIcon
                fontSize="small"
                sx={{ color: "primary.main" }}
              />
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Select Date
              </Typography>
            </Box>
            <TextField
              fullWidth
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
              onKeyDown={(e) => e.preventDefault()}
            />
          </Box>

          {/* Time */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
            >
              <AccessTimeOutlinedIcon
                fontSize="small"
                sx={{ color: "primary.main" }}
              />
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Select Time
              </Typography>
            </Box>
            <TextField
              fullWidth
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Items */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
            >
              <RestaurantMenuIcon
                fontSize="small"
                sx={{ color: "primary.main" }}
              />
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Select Items
              </Typography>
            </Box>
            <Stack spacing={0.5}>
              {items.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedItems.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                      sx={{
                        color: "divider",
                        "&.Mui-checked": { color: "primary.main" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item}
                    </Typography>
                  }
                  sx={{
                    ml: 0,
                    borderRadius: 2,
                    px: 1,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={closeModal} variant="outlined">
          Cancel
        </Button>
        <Button
          type="submit"
          form="booking-form"
          variant="contained"
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
