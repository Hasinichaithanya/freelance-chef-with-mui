import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import RestaurantIcon from "@mui/icons-material/RestaurantOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAddOutlined";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLoggedIn = Cookies.get("userId");
  const user = Cookies.get("user");
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogOut = () => {
    Cookies.remove("user");
    Cookies.remove("userId");
    navigate("/");
    setDrawerOpen(false);
  };

  const navItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "All Chefs", path: "/browse-chefs", icon: <RestaurantIcon /> },
    { label: "About Us", path: "/about-us", icon: <InfoIcon /> },
  ];

  if (!isLoggedIn) {
    navItems.push({
      label: "Sign Up",
      path: "/UserSignUp",
      icon: <PersonAddIcon />,
    });
  }

  if (user === "Chef") {
    navItems.push({
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    });
  }

  if (user === "user") {
    navItems.push({
      label: "Orders",
      path: "/orders",
      icon: <ShoppingBagIcon />,
    });
    navItems.push({
      label: "Profile",
      path: "/user-profile",
      icon: <AccountCircleIcon />,
    });
  }

  const isActive = (path) => location.pathname === path;

  const desktopNav = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          sx={{
            color: isActive(item.path) ? "primary.contrastText" : alpha("#FFFFFF", 0.85),
            fontWeight: isActive(item.path) ? 700 : 500,
            fontSize: "0.9rem",
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: isActive(item.path)
              ? alpha("#FFFFFF", 0.15)
              : "transparent",
            "&:hover": {
              backgroundColor: alpha("#FFFFFF", 0.12),
              transform: "none",
              boxShadow: "none",
            },
          }}
        >
          {item.label}
        </Button>
      ))}
      {user !== undefined && (
        <Button
          onClick={handleLogOut}
          variant="outlined"
          startIcon={<LogoutIcon />}
          sx={{
            ml: 1,
            color: "#FFFFFF",
            borderColor: alpha("#FFFFFF", 0.4),
            "&:hover": {
              borderColor: "#FFFFFF",
              backgroundColor: alpha("#FFFFFF", 0.1),
              transform: "none",
              boxShadow: "none",
            },
          }}
        >
          Logout
        </Button>
      )}
    </Box>
  );

  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: "background.paper",
          borderRadius: "20px 0 0 20px",
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.dark",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: isActive(item.path) ? 600 : 400 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {user !== undefined && (
          <>
            <Divider sx={{ my: 1 }} />
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogOut}
                sx={{
                  borderRadius: 2,
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.error.main, 0.06),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          minHeight: { xs: 64, md: 72 },
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "opacity 0.2s",
            "&:hover": { opacity: 0.85 },
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1719422571/chef_logo_wtmpko.png"
            alt="Chef Freelance Logo"
            sx={{ height: { xs: 40, md: 48 } }}
          />
        </Box>

        {isMobile ? (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "#FFFFFF" }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        ) : (
          desktopNav
        )}
      </Toolbar>
      {mobileDrawer}
    </AppBar>
  );
};

export default Header;
