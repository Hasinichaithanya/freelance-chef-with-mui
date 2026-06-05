import React from "react";
import { Container } from "@mui/material";
import ProfileForm from "../components/Chef/ProfileForm";
import PageHeader from "../components/Shared/PageHeader";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const Dashboard = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PageHeader
        title="Chef Dashboard"
        subtitle="Manage your profile, view orders, and track engagement"
        icon={<DashboardOutlinedIcon fontSize="large" />}
      />
      <ProfileForm />
    </Container>
  );
};

export default Dashboard;
