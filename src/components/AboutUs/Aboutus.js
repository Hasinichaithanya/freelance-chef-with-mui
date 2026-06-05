import React from "react";
import {
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  CardMedia,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PageHeader from "../Shared/PageHeader";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const chefBenefits = [
  "Expand their client base without the need for traditional advertising.",
  "Offer specialized and unique dishes to food enthusiasts.",
  "Set their own prices and work schedule, giving them full control over their freelancing career.",
  "Receive feedback and ratings from customers to help build their reputation.",
  "Access a supportive community of fellow chefs and food lovers.",
  "Gain exposure to potential clients through a well-established platform.",
  "Manage orders and bookings efficiently.",
  "Receive secure payments and financial support through our system.",
  "Enhance their culinary skills by taking advantage of our resources.",
];

const userBenefits = [
  "Discover talented chefs offering a wide variety of cuisines and specialties.",
  "Enjoy personalized culinary experiences tailored to their tastes and preferences.",
  "Directly connect with chefs to discuss menu options, dietary needs, and event details.",
  "Read reviews and ratings from other users to make informed choices.",
  "Benefit from transparent pricing and secure payment options.",
  "Experience high-quality meals prepared by professional chefs in the comfort of their homes.",
  "Book chefs for special occasions, events, or regular meal plans.",
  "Support local culinary talent and contribute to the growth of the food community.",
  "Access customer support for any queries or assistance needed during the booking process.",
];

const BenefitsList = ({ items }) => (
  <List dense disablePadding>
    {items.map((item, index) => (
      <ListItem key={index} sx={{ px: 0 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <CheckCircleOutlineIcon
            fontSize="small"
            sx={{ color: "primary.main" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={item}
          primaryTypographyProps={{ variant: "body2" }}
        />
      </ListItem>
    ))}
  </List>
);

const Aboutus = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="About Us"
        subtitle="Learn how our platform benefits chefs and food lovers"
        icon={<InfoOutlinedIcon fontSize="large" />}
        align="center"
      />

      <Grid container spacing={4}>
        {/* Chef Card */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq4S483NhzemDu4sHD7Y5sNAfS-Qi2XxB_Ew&s"
              alt="Freelancing Platform for Chefs"
              sx={{
                width: { xs: "100%", md: 360 },
                height: { xs: 220, md: "auto" },
                objectFit: "cover",
              }}
            />
            <Box sx={{ p: { xs: 3, md: 4 }, flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1.5,
                }}
              >
                Elevate Your Chef Career with Our Freelancing Platform
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2, lineHeight: 1.7 }}
              >
                Our platform provides a unique opportunity for chefs to showcase
                their culinary skills and reach a wider audience. By joining our
                freelancing platform, chefs can:
              </Typography>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                    Benefits for Chefs
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BenefitsList items={chefBenefits} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Card>
        </Grid>

        {/* User Card */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row-reverse" },
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
              alt="Connecting with Culinary Talent"
              sx={{
                width: { xs: "100%", md: 360 },
                height: { xs: 220, md: "auto" },
                objectFit: "cover",
              }}
            />
            <Box sx={{ p: { xs: 3, md: 4 }, flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1.5,
                }}
              >
                Connecting You with Culinary Talent
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2, lineHeight: 1.7 }}
              >
                Our platform is designed to provide users with a seamless and
                delightful culinary experience. By using our freelancing
                platform, users can:
              </Typography>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary" }}>
                    Benefits for Users
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BenefitsList items={userBenefits} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Aboutus;
