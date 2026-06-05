import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import FormContainer from "../Shared/FormContainer";

const OrderForm = ({ chef }) => {
  const [order, setOrder] = useState({
    dish: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer
      title={`Order from ${chef.name}`}
      maxWidth={400}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Dish Name"
        name="dish"
        value={order.dish}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Quantity"
        name="quantity"
        type="number"
        value={order.quantity}
        onChange={handleChange}
        inputProps={{ min: 1 }}
        required
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Place Order
      </Button>
    </FormContainer>
  );
};

export default OrderForm;
