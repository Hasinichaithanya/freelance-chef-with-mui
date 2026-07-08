import React from "react";
import { Container } from "@mui/material";
import ChefProfileForm from "../../components/Chef/ProfileForm/ChefProfileForm";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import "./ChefDashboard.css";

const ChefDashboard = () => {
  return (
    <Container maxWidth="md" className="dashboard-container">
      <PageHeader
        title="Chef Dashboard"
        subtitle="Manage your profile, view orders, and track engagement"
        icon={<DashboardOutlinedIcon fontSize="large" />}
      />
      <ChefProfileForm />
    </Container>
  );
};

export default ChefDashboard;
