import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import AppButton from "../../Shared/AppButton/AppButton";
import FormContainer from "../../Shared/FormContainer/FormContainer";

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
      <AppButton
        fullWidth
        type="submit"
        size="lg"
        className="order-form-submit-btn"
      >
        Place Order
      </AppButton>
    </FormContainer>
  );
};

export default OrderForm;
