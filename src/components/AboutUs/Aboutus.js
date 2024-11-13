import React from "react";
<<<<<<< HEAD
import {
  Card, Accordion, AccordionDetails,
  AccordionSummary, Container, CardMedia,
  Typography, Box, List, ListItem
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
=======
>>>>>>> e814dd919dcb57d43fbbad08a9b7e57c15b53b1d
import "./aboutus.css";

const Aboutus = () => {
  return (
<<<<<<< HEAD
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
=======
    <div>
      <section class="about-section">
        <div class="about-content">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq4S483NhzemDu4sHD7Y5sNAfS-Qi2XxB_Ew&s"
            height="250"
            width="400"
            alt="Freelancing Platform for Chefs"
          />
          <div class="text-content">
            <h2>Elevate Your Chef Career with Our Freelancing Platform</h2>
            <p>
              Our platform provides a unique opportunity for chefs to showcase
              their culinary skills and reach a wider audience. By joining our
              freelancing platform, chefs can:
            </p>
            <ul>
              <li>
                Expand their client base without the need for traditional
                advertising.
              </li>
              <li>Offer specialized and unique dishes to food enthusiasts.</li>
              <li>
                Set their own prices and work schedule, giving them full control
                over their freelancing career.
              </li>
              <li>
                Receive feedback and ratings from customers to help build their
                reputation.
              </li>
              <li>
                Access a supportive community of fellow chefs and food lovers.
              </li>
              <li>
                Gain exposure to potential clients through a well-established
                platform.
              </li>
              <li>Manage orders and bookings efficiently.</li>
              <li>
                Receive secure payments and financial support through our
                system.
              </li>
              <li>
                Enhance their culinary skills by taking advantage of our
                resources.
              </li>
            </ul>
          </div>
        </div>
        <br></br>
        <div class="about-content">
          <div class="text-content">
            <h2>Connecting You with Culinary Talent</h2>
            <p>
              Our platform is designed to provide users with a seamless and
              delightful culinary experience. By using our freelancing platform,
              users can:
            </p>
            <ul>
              <li>
                Discover talented chefs offering a wide variety of cuisines and
                specialties.
              </li>
              <li>
                Enjoy personalized culinary experiences tailored to their tastes
                and preferences.
              </li>
              <li>
                Directly connect with chefs to discuss menu options, dietary
                needs, and event details.
              </li>
              <li>
                Read reviews and ratings from other users to make informed
                choices.
              </li>
              <li>
                Benefit from transparent pricing and secure payment options.
              </li>
              <li>
                Experience high-quality meals prepared by professional chefs in
                the comfort of their homes.
              </li>
              <li>
                Book chefs for special occasions, events, or regular meal plans.
              </li>
              <li>
                Support local culinary talent and contribute to the growth of
                the food community.
              </li>
              <li>
                Access customer support for any queries or assistance needed
                during the booking process.
              </li>
            </ul>
          </div>
          <img
            src="https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg"
            height="350"
            width="400"
            alt="How It's Useful to Users"
          />
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Freelancing Platform for Chefs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Aboutus;
>>>>>>> e814dd919dcb57d43fbbad08a9b7e57c15b53b1d
