import React from "react";
import ProfileForm from "../components/Chef/ProfileForm";
import "./Dashboard.css";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box className="dashboard">
      <h2>Chef Dashboard</h2>
      <ProfileForm />
    </Box>
  );
};

export default Dashboard;
