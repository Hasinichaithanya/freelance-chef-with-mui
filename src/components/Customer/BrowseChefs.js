/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "@mui/material/Skeleton";
import ChefProfile from "../Chef/Profile";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import "./Customer.css";

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
      // console.log(data.chefsList);
      setChefs(data.chefsList);
      setFilteredChefs(sortChefsByCost(data.chefsList));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrMsg("Could not fetch the data, try once again!");
      setIsLoading(false);
    }
  };

  const sortChefsByCost = (chefsList) => {
    return chefsList.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.cost - b.cost;
      } else {
        return b.cost - a.cost;
      }
    });
  };

  const filterAndSortChefs = () => {
    console.log(chefs);
    let filteredList = chefs.filter((chef) => {
      const foodItems =
        typeof chef.Fooditems === "string"
          ? chef.Fooditems
          : chef.Fooditems.join(", ");
      return foodItems.toLowerCase().includes(searchTerm.toLowerCase());
    });
    filteredList = sortChefsByCost(filteredList);
    setFilteredChefs(filteredList);

    if (filteredList.length === 0) {
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

  return (
    <Box className="browse-chefs">
      <Box>
        <input
          type="text"
          placeholder="Search by food items..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="select-options"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Cost: Low to High</option>
          <option value="desc">Cost: High to Low</option>
        </select>
      </Box>
      {isLoading ? (
        // <div>
        //   <Spinner animation="border" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </Spinner>
        // </div>
        <Grid container rowSpacing={2}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Grid
              key={index}
              // spacing={3}
              // rowSpacing={5}
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              size={{ xs: 6, md: 3 }}
            >
              <Skeleton
                variant="circular"
                width={100}
                height={100}
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                width={210}
                height={100}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={210}
                height={100}
                animation="wave"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {filteredChefs.length > 0 ? (
            <div className="chefs">
              {filteredChefs.map((chef) => (
                <ChefProfile key={uuidv4()} chef={chef} />
              ))}
            </div>
          ) : (
            <p>{errMsg}</p>
          )}
        </>
      )}
    </Box>
  );
};

export default BrowseChefs;
