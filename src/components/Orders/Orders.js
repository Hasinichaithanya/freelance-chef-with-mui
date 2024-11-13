import React, { useState, useEffect } from "react";
import { Typography, CardMedia, Box } from "@mui/material";

import Cookies from "js-cookie";
import "./order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const id = Cookies.get("userId");
    console.log(id);

    const fetchProfile = async () => {
      if (!id) {
        console.error("User ID is invalid or not found in cookies");
        return;
      }
      const url =
        "https://mini-project-backend-i3zm.onrender.com/get-user?id=" +
        id.slice(1, -1);
      console.log(url);
      try {
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log(data.userDetails.orders);
        setOrders(data.userDetails.orders || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const renderOrder = (orders) => {
    return (
      <>
        {orders.map((order) => {
          return (
            <Box className="order-item">
              <Box className="image-container">
                {" "}
                <CardMedia
                  component="img"
                  src={order.image}
                  alt="order-image"
                  className="order-image"
                />
                <Typography>{order.chefName}</Typography>
              </Box>
              <Box>
                {" "}
                <Typography>Order: Rs. {order.cost}</Typography>
                <Typography>Time: {order.time}</Typography>
                <Typography>Date: {order.date}</Typography>
              </Box>{" "}
              <Box>
                <Typography>Ordered Items:</Typography>
                <ul>
                  {order.selectedItems.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </Box>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <Box className="profile-form-container">
      {orders.length > 0 ? renderOrder(orders) : "No orders"}
    </Box>
  );
};

export default Orders;
