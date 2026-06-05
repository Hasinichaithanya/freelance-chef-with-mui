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
  Alert,
  Snackbar,
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
  const [errors, setErrors] = useState({});
  const [dateConflictAlert, setDateConflictAlert] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
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
        if (response.ok) {
          const res = await response.json();
          setBookedDates(res.bookings);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };
    fetchDates();
  }, [chefId]);

  const validateForm = () => {
    const newErrors = {};
    if (!date) newErrors.date = "Please select a date.";
    if (!time) newErrors.time = "Please select a time.";
    if (selectedItems.length === 0)
      newErrors.items = "Please select at least one item.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");
    if (!userId) {
      navigate("/UserSignUp");
      return;
    }
    if (!validateForm()) return;
    try {
      await bookChef();
      setSuccessSnackbar(true);
      setTimeout(() => {
        closeModal();
        setDate("");
        setTime("");
        setSelectedItems([]);
        setErrors({});
      }, 1500);
    } catch (error) {
      console.error("Error booking chef:", error);
    }
  };

  const bookChef = async () => {
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
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (bookedDates.includes(selectedDate)) {
      setDateConflictAlert(true);
      setDate("");
    } else {
      setDate(selectedDate);
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  };

  const handleClose = () => {
    closeModal();
    setDate("");
    setTime("");
    setSelectedItems([]);
    setErrors({});
    setDateConflictAlert(false);
  };

  return (
    <>
      <Dialog open={isOpen} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Book Chef
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            component="form"
            onSubmit={handleBooking}
            id="booking-form"
          >
            {/* Date Conflict Alert */}
            {dateConflictAlert && (
              <Alert
                severity="warning"
                onClose={() => setDateConflictAlert(false)}
                sx={{ mb: 2, borderRadius: 2 }}
              >
                This date is already booked. Please select another date.
              </Alert>
            )}

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
                error={Boolean(errors.date)}
                helperText={errors.date}
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
                onChange={(e) => {
                  setTime(e.target.value);
                  setErrors((prev) => ({ ...prev, time: undefined }));
                }}
                required
                error={Boolean(errors.time)}
                helperText={errors.time}
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
              {errors.items && (
                <Alert severity="error" sx={{ mb: 1.5, borderRadius: 2 }}>
                  {errors.items}
                </Alert>
              )}
              <Stack spacing={0.5}>
                {items.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={selectedItems.includes(item)}
                        onChange={() => {
                          handleCheckboxChange(item);
                          setErrors((prev) => ({ ...prev, items: undefined }));
                        }}
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
          <Button onClick={handleClose} variant="outlined">
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

      <Snackbar
        open={successSnackbar}
        autoHideDuration={3000}
        onClose={() => setSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2 }}
          onClose={() => setSuccessSnackbar(false)}
        >
          Chef booked successfully! You'll receive a confirmation email shortly.
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookingModal;
