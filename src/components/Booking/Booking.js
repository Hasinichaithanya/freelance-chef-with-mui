/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, InputLabel, Checkbox } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import "./Booking.css";

const BookingModal = ({ isOpen, closeModal, chefId, items }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);

  const navigate = useNavigate();
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  useEffect(() => {
    console.log(chefId);
    const fetchDates = async () => {
      const response = await fetch(
        `https://mini-project-backend-i3zm.onrender.com/bookings/${chefId}`,
        {
          method: "GET",
        }
      );
      const res = await response.json();
      console.log(res.bookings);

      if (response.status == 200) {
        setBookedDates(res.bookings);
      }
    };
    fetchDates();
  }, [chefId]);
  const handleBooking = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("user");
    if (!userId) {
      console.error("Login to book the chef");
      navigate("/UserSignUp");
    }
    try {
      bookChef();
      closeModal();
    } catch (error) {
      console.error("Error booking chef:", error);
    }
  };

  const bookChef = async () => {
    try {
      const id = Cookies.get("userId");
      const userId = id.slice(1, -1);
      console.log(userId);
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/send-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chefId, userId, date, time, selectedItems }),
        }
      );
      console.log(response);
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
    <Dialog open={isOpen} maxWidth="md" fullWidth={true}>
      <Typography variant="subtitle1">Book Chef</Typography>
      <DialogTitle>Book Chef</DialogTitle>
      <DialogContent>
        <Box onSubmit={handleBooking} className="form">
          <Box className="form-group">
            <InputLabel>Date:</InputLabel>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              variant="outlined"
              className="time-input"
              min={new Date().toISOString().split("T")[0]}
              onKeyDown={(e) => e.preventDefault()}
            />
          </Box>
          <Box className="form-group">
            <InputLabel>Time:</InputLabel>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="time-input"
            />
          </Box>
          <Box className="form-group">
            <InputLabel>Items:</InputLabel>
            {items.map((item, index) => (
              <Box key={index} className="checkbox-group">
                <Checkbox
                  // type="checkbox"
                  id={item}
                  value={item}
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="checkbox"
                />
                <InputLabel htmlFor={item} className="checkbox-label">
                  {item}
                </InputLabel>
              </Box>
            ))}
          </Box>
          <Box className="form-group" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="warning">
              Book
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <Box>
        <DialogActions>
          {" "}
          <Button onClick={closeModal} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default BookingModal;
