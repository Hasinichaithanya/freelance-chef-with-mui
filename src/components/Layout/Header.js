import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Layout.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isLoggedIn = Cookies.get("userId");
  const user = Cookies.get("user");
  const navigate = useNavigate();
  // console.log(isLoggedIn, user);
  const handleLogOut = () => {
    Cookies.remove(user);
    Cookies.remove(isLoggedIn);
    navigate("/");
  };
  const mobileMenu = () => {
    setIsMobile((prev) => !prev);
  };

  return (
    <>
      <nav className="header-container-desktop">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1719422571/chef_logo_wtmpko.png"
            alt="logo"
            className="logo"
          />
        </Link>
        <List className="ul-items-desktop">
          {/* <ListItem> */}
          <Link to="/" className="list-item">
            Home
          </Link>
          {/* </ListItem>
          <ListItem> */}
          <Link to="/browse-chefs" className="list-item">
            All Chefs
          </Link>
          {/* </ListItem>
          <ListItem> */}
          <Link to="/about-us" className="list-item">
            About Us
          </Link>
          {/* </ListItem>
          <ListItem> */}
          {!isLoggedIn && (
            <Link to="/UserSignUp" className="list-item">
              Sign Up
            </Link>
          )}
          {/* </ListItem>
          <ListItem> */}
          {user === "Chef" && (
            <Link to="/dashboard" className="list-item">
              Dashboard
            </Link>
          )}
          {/* </ListItem>
          <ListItem> */}
          {user === "user" && (
            <Link to="/orders" className="list-item">
              Orders
            </Link>
          )}
          {/* </ListItem>
          <ListItem> */}
          {user === "user" && (
            <Link to="/user-profile" className="list-item">
              Profile
            </Link>
          )}
          {/* </ListItem>
          <ListItem> */}
          {user !== "undefined" && (
            <Button onClick={handleLogOut} color="black">
              Logout
            </Button>
          )}
          {/* </ListItem>{" "} */}
        </List>
      </nav>
      <nav className="header-container-mobile">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlnpuom7o/image/upload/v1719422571/chef_logo_wtmpko.png"
            alt="logo"
            className="logo"
          />
        </Link>

        <button type="button" onClick={mobileMenu}>
          <MenuOutlinedIcon />
        </button>
      </nav>
      <div className="menu-items">
        {isMobile && (
          <List className="mobile-nav-items">
            {/* <ListItem> */}
            <Link to="/" className="list-item list-item-mobile">
              Home
            </Link>
            {/* </ListItem>
            <ListItem> */}
            <Link to="/browse-chefs" className="list-item list-item-mobile">
              All Chefs
            </Link>
            {/* </ListItem>
            <ListItem> */}
            {!isLoggedIn && (
              <Link to="/UserSignUp" className="list-item list-item-mobile">
                Sign Up
              </Link>
            )}
            {/* </ListItem>
            <ListItem> */}{" "}
            {user === "Chef" && (
              <Link to="/dashboard" className="list-item list-item-mobile">
                Dashboard
              </Link>
            )}
            {/* </ListItem>
            <ListItem> */}
            {user === "user" && (
              <Link to="/orders" className="list-item list-item-mobile">
                Orders
              </Link>
            )}
            {/* </ListItem>
            <ListItem>
              {" "} */}
            {user === "user" && (
              <Link to="/user-profile" className="list-item list-item-mobile">
                Profile
              </Link>
            )}
            {/* </ListItem>
            <ListItem> */}
            {user !== "undefined" && (
              <Button onClick={handleLogOut} color="warning">
                Logout
              </Button>
            )}
            {/* </ListItem> */}
          </List>
        )}
      </div>
    </>
  );
};

export default Header;
