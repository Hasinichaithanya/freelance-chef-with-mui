import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Divider,
  Skeleton,
} from "@mui/material";
import Cookies from "js-cookie";
import PageHeader from "../Shared/PageHeader";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = Cookies.get("userId");

    const fetchProfile = async () => {
      if (!id) return;
      const url =
        "https://mini-project-backend-i3zm.onrender.com/get-user?id=" +
        id.slice(1, -1);
      try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setOrders(data.userDetails.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      <PageHeader
        title="Your Orders"
        subtitle="View your booking history"
        icon={<ShoppingBagOutlinedIcon fontSize="large" />}
      />

      {isLoading ? (
        <Stack spacing={2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Skeleton variant="circular" width={72} height={72} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                  <Skeleton variant="rectangular" height={28} width="80%" sx={{ borderRadius: 2 }} />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : orders.length > 0 ? (
        <Stack spacing={2}>
          {orders.map((order, index) => (
            <Card key={index} sx={{ overflow: "visible" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  alignItems: { sm: "center" },
                }}
              >
                {/* Chef Info */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 100,
                  }}
                >
                  <Avatar
                    src={order.image}
                    alt={order.chefName}
                    sx={{
                      width: 72,
                      height: 72,
                      mb: 1,
                      border: "2px solid",
                      borderColor: "primary.light",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, textAlign: "center" }}
                  >
                    {order.chefName}
                  </Typography>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: "none", sm: "block" } }}
                />

                {/* Order Details */}
                <Box sx={{ flex: 1 }}>
                  <Stack spacing={1}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <CurrencyRupeeIcon
                        fontSize="small"
                        sx={{ color: "primary.main" }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Rs. {order.cost}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <CalendarTodayOutlinedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography variant="body2">{order.date}</Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <AccessTimeOutlinedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography variant="body2">{order.time}</Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", mb: 0.5, display: "block" }}
                    >
                      Ordered Items
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {order.selectedItems.map((item, i) => (
                        <Chip
                          key={i}
                          label={item}
                          size="small"
                          sx={{
                            backgroundColor: "primary.light",
                            color: "secondary.dark",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            color: "text.secondary",
          }}
        >
          <InboxOutlinedIcon sx={{ fontSize: 64, color: "divider", mb: 2 }} />
          <Typography variant="h6">No orders yet</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Your bookings will appear here once you book a chef
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Orders;
