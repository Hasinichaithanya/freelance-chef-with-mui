import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Header from "./components/Layout/Header/Header";
import Home from "./pages/Home/Home";
import UserSignUp from "./components/Auth/UserSignUp/UserSignUp";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import BrowseChefs from "./components/Customer/BrowseChefs/BrowseChefs";
import ChefDashboard from "./pages/Dashboard/ChefDashboard";
import PrivateRoute from "./components/Shared/PrivateRoute/PrivateRoute";
import Aboutus from "./components/AboutUs/Aboutus";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Orders from "./components/Orders/Orders";
import "./App.css";

const App = () => {
  const isAuthenticated = true;

  return (
    <Router>
      <Box className="app-shell">
        <Header />
        <Container maxWidth="lg" component="main" className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/UserSignUp" element={<UserSignUp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/browse-chefs" element={<BrowseChefs />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/user-profile" element={<UserDashboard />} />
            <Route
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/dashboard" element={<ChefDashboard />} />
            </Route>
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
