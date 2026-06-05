/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  InputAdornment,
  Skeleton,
  Card,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import Cookies from "js-cookie";
import ChefProfile from "../Chef/Profile";
import PageHeader from "../Shared/PageHeader";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

const BrowseChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [filteredChefs, setFilteredChefs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChefs();
  }, []);

  useEffect(() => {
    filterAndSortChefs();
  }, [searchTerm, sortOrder]);

  const fetchChefs = async () => {
    try {
      const response = await fetch(
        "https://mini-project-backend-i3zm.onrender.com/get-all"
      );
      const data = await response.json();
      const loggedInUserId = Cookies.get("userId");
      const filteredChefsList = data.chefsList.filter((chef) => {
        if (loggedInUserId) {
          return chef._id !== loggedInUserId.slice(1, -1);
        }
        return chef;
      });
      setChefs(filteredChefsList);
      setFilteredChefs(sortChefsByCost(filteredChefsList));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrMsg("Could not fetch the data, try once again!");
      setIsLoading(false);
    }
  };

  const sortChefsByCost = (chefsList) => {
    return [...chefsList].sort((a, b) => {
      return sortOrder === "asc" ? a.cost - b.cost : b.cost - a.cost;
    });
  };

  const filterAndSortChefs = () => {
    let filteredList = chefs.filter((chef) => {
      const foodItems =
        typeof chef.Fooditems === "string"
          ? chef.Fooditems
          : chef.Fooditems.join(", ");
      return foodItems.toLowerCase().includes(searchTerm.toLowerCase());
    });
    filteredList = sortChefsByCost(filteredList);
    setFilteredChefs(filteredList);

    if (filteredList.length === 0 && chefs.length > 0) {
      setErrMsg("No chefs match your search criteria.");
    } else {
      setErrMsg("");
    }
  };

  const handleSearch = (event) => {
    const input = event.target.value;
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(input)) {
      setSearchTerm(input);
    }
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const renderSkeletons = () => (
    <Grid container spacing={3}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card sx={{ p: 3, textAlign: "center" }}>
            <Skeleton
              variant="circular"
              width={120}
              height={120}
              sx={{ mx: "auto", mb: 2 }}
            />
            <Skeleton variant="text" width="60%" sx={{ mx: "auto", mb: 1 }} />
            <Skeleton variant="text" width="80%" sx={{ mx: "auto", mb: 1 }} />
            <Skeleton
              variant="rectangular"
              height={36}
              width="50%"
              sx={{ mx: "auto", borderRadius: 2 }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ py: 2 }}>
      <PageHeader
        title="Browse Chefs"
        subtitle="Find the perfect chef for your next meal"
        icon={<RestaurantOutlinedIcon fontSize="large" />}
      />

      {/* Search & Filter Bar */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <TextField
          fullWidth
          placeholder="Search by food items..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: { sm: 400 } }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <SortIcon fontSize="small" /> Sort by Cost
            </Box>
          </InputLabel>
          <Select
            value={sortOrder}
            onChange={handleSortOrderChange}
            label="Sort by Cost xxx"
          >
            <MenuItem value="asc">Cost: Low to High</MenuItem>
            <MenuItem value="desc">Cost: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Content */}
      {isLoading ? (
        renderSkeletons()
      ) : filteredChefs.length > 0 ? (
        <Grid container spacing={3}>
          {filteredChefs.map((chef) => (
            <Grid key={uuidv4()} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ChefProfile chef={chef} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <RestaurantOutlinedIcon
            sx={{ fontSize: 64, color: "divider", mb: 2 }}
          />
          <Typography variant="h6">{errMsg || "No chefs available"}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BrowseChefs;
