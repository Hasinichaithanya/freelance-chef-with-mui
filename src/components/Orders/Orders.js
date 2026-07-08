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
import useApi from "../../hooks/useApi";
import PageHeader from "../Shared/PageHeader/PageHeader";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import "./Orders.css";

const Orders = () => {
  const { loading, execute } = useApi();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const id = Cookies.get("userId");

    const fetchProfile = async () => {
      if (!id) return;
      try {
        const data = await execute(`/get-user?id=${id.slice(1, -1)}`, "GET");
        setOrders(data.userDetails.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Box className="orders-page">
      <PageHeader
        title="Your Orders"
        subtitle="View your booking history"
        icon={<ShoppingBagOutlinedIcon fontSize="large" />}
      />

      {loading ? (
        <Stack spacing={2}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="orders-skeleton-content">
                <Skeleton variant="circular" width={72} height={72} />
                <Box className="orders-skeleton-body">
                  <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                  <Skeleton
                    variant="rectangular"
                    height={28}
                    width="80%"
                    className="orders-skeleton-bar"
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : orders.length > 0 ? (
        <Stack spacing={2}>
          {orders.map((order, index) => (
            <Card key={index} sx={{ overflow: "visible" }}>
              <CardContent className="orders-card-content">
                {/* Chef Info */}
                <Box className="orders-chef-info">
                  <Avatar
                    src={order.image}
                    alt={order.chefName}
                    className="orders-chef-avatar"
                  />
                  <Typography variant="body2" className="orders-chef-name">
                    {order.chefName}
                  </Typography>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  className="orders-vertical-divider"
                />

                {/* Order Details */}
                <Box className="orders-detail-body">
                  <Stack spacing={1}>
                    <Box className="orders-detail-row">
                      <CurrencyRupeeIcon fontSize="small" sx={{ color: "primary.main" }} />
                      <Typography variant="body2" className="orders-cost">
                        Rs. {order.cost}
                      </Typography>
                    </Box>
                    <Box className="orders-detail-row">
                      <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                      <Typography variant="body2">{order.date}</Typography>
                    </Box>
                    <Box className="orders-detail-row">
                      <AccessTimeOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                      <Typography variant="body2">{order.time}</Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" className="orders-items-label">
                      Ordered Items
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {order.selectedItems.map((item, i) => (
                        <Chip
                          key={i}
                          label={item}
                          size="small"
                          className="orders-item-chip"
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
        <Box className="orders-empty">
          <InboxOutlinedIcon className="orders-empty-icon" />
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
