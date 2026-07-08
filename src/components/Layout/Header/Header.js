import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  AppBar,
  Toolbar,
  Box,
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
} from "@mui/material";
import AppButton from "../../Shared/AppButton/AppButton";
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
import "./Header.css";

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
    navItems.push({ label: "Sign Up", path: "/UserSignUp", icon: <PersonAddIcon /> });
  }

  if (user?.toLowerCase() === "chef") {
    navItems.push({ label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> });
  }

  if (user?.toLowerCase() === "user") {
    navItems.push({ label: "Orders", path: "/orders", icon: <ShoppingBagIcon /> });
    navItems.push({ label: "Profile", path: "/user-profile", icon: <AccountCircleIcon /> });
  }

  const isActive = (path) => location.pathname === path;

  const desktopNav = (
    <Box className="header-nav">
      {navItems.map((item) => (
        <AppButton
          key={item.path}
          variant="ghost"
          component={Link}
          to={item.path}
          active={isActive(item.path)}
          className="header-nav-btn"
        >
          {item.label}
        </AppButton>
      ))}
      {user !== undefined && (
        <AppButton
          variant="outlined"
          onClick={handleLogOut}
          startIcon={<LogoutIcon />}
          className="header-logout-btn"
        >
          Logout
        </AppButton>
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
      <Box className="header-drawer-close-row">
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List className="header-drawer-list">
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding className="header-drawer-item">
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              selected={isActive(item.path)}
              className="header-drawer-item-btn"
            >
              <ListItemIcon className="header-drawer-icon">
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
                className="header-drawer-logout-btn"
              >
                <ListItemIcon className="header-drawer-logout-icon">
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
    <AppBar position="sticky" className="header-appbar">
      <Toolbar className="header-toolbar">
        <Box component={Link} to="/" className="header-logo-link">
          <Box
            component="img"
            src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1719422571/chef_logo_wtmpko.png"
            alt="Chef Freelance Logo"
            className="header-logo-image"
          />
        </Box>

        {isMobile ? (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            className="header-menu-icon-btn"
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
