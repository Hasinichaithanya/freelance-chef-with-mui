import React from "react";
import {
  Card, Accordion, AccordionDetails,
  AccordionSummary, Container, CardMedia,
  Typography, Box, List, ListItem
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./aboutus.css";

const Aboutus = () => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" padding={2} gap={4}>

        {/* First Card */}
        <Card className="card-container">
          <CardMedia
            component="img"
            className="imageContainer"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq4S483NhzemDu4sHD7Y5sNAfS-Qi2XxB_Ew&s"
            alt="Freelancing Platform for Chefs"
          />
          <Container className="detailsContainer">
            <Typography variant="h5" className="coloredTitle">
              Elevate Your Chef Career with Our Freelancing Platform
            </Typography>
            <Typography variant="body2" sx={{ color: "black", marginTop: "8px" }}>
              Our platform provides a unique opportunity for chefs to showcase
              their culinary skills and reach a wider audience. By joining our
              freelancing platform, chefs can:
            </Typography>

            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Benefits for Chefs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>Expand their client base without the need for traditional advertising.</ListItem>
                  <ListItem>Offer specialized and unique dishes to food enthusiasts.</ListItem>
                  <ListItem>Set their own prices and work schedule, giving them full control over their freelancing career.</ListItem>
                  <ListItem>Receive feedback and ratings from customers to help build their reputation.</ListItem>
                  <ListItem>Access a supportive community of fellow chefs and food lovers.</ListItem>
                  <ListItem>Gain exposure to potential clients through a well-established platform.</ListItem>
                  <ListItem>Manage orders and bookings efficiently.</ListItem>
                  <ListItem>Receive secure payments and financial support through our system.</ListItem>
                  <ListItem>Enhance their culinary skills by taking advantage of our resources.</ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Container>
        </Card>
        {/* Second Card */}
        <Card className="card-container">
          <Container className="detailsContainer">
            <Typography variant="h5" className="coloredTitle">
              Connecting You with Culinary Talent
            </Typography>
            <Typography variant="body2" sx={{ color: "black", marginTop: "8px" }}>
              Our platform is designed to provide users with a seamless and
              delightful culinary experience. By using our freelancing platform,
              users can:
            </Typography>

            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Benefits for users</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>Discover talented chefs offering a wide variety of cuisines and specialties.</ListItem>
                  <ListItem>Enjoy personalized culinary experiences tailored to their tastes and preferences.</ListItem>
                  <ListItem>Directly connect with chefs to discuss menu options, dietary needs, and event details.</ListItem>
                  <ListItem>Read reviews and ratings from other users to make informed choices.</ListItem>
                  <ListItem>Benefit from transparent pricing and secure payment options.</ListItem>
                  <ListItem>Experience high-quality meals prepared by professional chefs in the comfort of their homes.</ListItem>
                  <ListItem>Book chefs for special occasions, events, or regular meal plans.</ListItem>
                  <ListItem>Support local culinary talent and contribute to the growth of the food community.</ListItem>
                  <ListItem>Access customer support for any queries or assistance needed during the booking process.</ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Container>
          <CardMedia
            component="img"
            className="imageContainer"
            image="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
            alt="Freelancing Platform for Chefs"
          />
        </Card>
      </Box>
    </Container>
  );
};

export default Aboutus;
