import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
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
import useApi from "../../hooks/useApi";
import AppButton from "../Shared/AppButton/AppButton";
import "./Booking.css";

const BookingModal = ({ isOpen, closeModal, chefId, items }) => {
  const { execute } = useApi();
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
        const res = await execute(`/bookings/${chefId}`, "GET");
        setBookedDates(res.bookings);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };
    fetchDates();
  }, [chefId, execute]);

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
    await execute("/send-mail", "POST", {
      chefId,
      userId,
      date,
      time,
      selectedItems,
    });
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
        <DialogTitle className="booking-dialog-title-row">
          Book Chef
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box component="form" onSubmit={handleBooking} id="booking-form">
            {/* Date Conflict Alert */}
            {dateConflictAlert && (
              <Alert
                severity="warning"
                onClose={() => setDateConflictAlert(false)}
                className="booking-conflict-alert"
              >
                This date is already booked. Please select another date.
              </Alert>
            )}

            {/* Date */}
            <Box className="booking-section">
              <Box className="booking-section-header">
                <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography variant="subtitle2" className="booking-section-label">
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
            <Box className="booking-section">
              <Box className="booking-section-header">
                <AccessTimeOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography variant="subtitle2" className="booking-section-label">
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
              <Box className="booking-items-header">
                <RestaurantMenuIcon fontSize="small" sx={{ color: "primary.main" }} />
                <Typography variant="subtitle2" className="booking-section-label">
                  Select Items
                </Typography>
              </Box>
              {errors.items && (
                <Alert severity="error" className="booking-alert">
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
                      <Typography variant="body2" className="booking-checkbox-label">
                        {item}
                      </Typography>
                    }
                    className="booking-checkbox-item"
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions className="booking-dialog-actions">
          <AppButton onClick={handleClose} variant="outlined">
            Cancel
          </AppButton>
          <AppButton type="submit" form="booking-form" >
            Confirm Booking
          </AppButton>
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
          className="booking-success-alert"
          onClose={() => setSuccessSnackbar(false)}
        >
          Chef booked successfully! You'll receive a confirmation email shortly.
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookingModal;
