"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CircularProgress,
  CardActionArea,
  CardContent,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  Add,
  ListAlt,
  Assessment,
  ShoppingCart,
  People,
  Settings,
  BarChart,
} from "@mui/icons-material";

import Order from "@/components/user/order/Order"
import CourseOrder from "@/components/user/courseorder/CourseOrder"



const Home = () => {

// State variables
const [data, setData] = useState(null); // Stores fetched analytics data
const [loading, setLoading] = useState(true); // Tracks if data is still being fetched

// useEffect runs once when the component mounts to fetch analytics data
useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch analytics data from the API
      const response = await fetch(`${process.env.API}/user/analytics`);

      // Convert the response into JSON format
      const result = await response.json();

      // Log the data for debugging purposes
      console.log("data---", result);

      // Update state with fetched data
      setData(result);

      // Set loading to false as data is now available
      setLoading(false);
    } catch (error) {
      // Log error message in case of an error
      console.error("Failed to fetch data", error);

      // Stop loading even if an error occurs
      setLoading(false);
    }
  };

  fetchData(); // Call the function to fetch data when the component is mounted
}, []); // Empty dependency array ensures the effect runs only once

// Define an array of pages with their names, icons, and respective analytics counts
const pages = [
  {
    name: "Subscriptions",
    icon: <BarChart />, // Subscription analytics icon
    count: data?.userSubscriptionCount, // Fetches subscription count from data
  },
  {
    name: "Orders",
    icon: <ShoppingCart />, // Orders analytics icon
    count: data?.userOrderCount, // Fetches order count from data
  },
  {
    name: "User Courses",
    icon: <People />, // User courses analytics icon
    count: data?.userCourseCount, // Fetches user course count from data
  },
];

// If data is still being loaded, display a centered loading spinner
if (loading) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height for vertical centering
      }}
    >
      <CircularProgress /> {/* MUI loading spinner */}
    </Box>
  );
}

// If data is null (failed to load), display an error message
if (!data) {
  return (
    <Typography
      variant="h6"
      sx={{
        textAlign: "center",
        marginTop: "2rem", // Adds space from the top
      }}
    >
      Failed to load data {/* Display message when API call fails */}
    </Typography>
  );
}



  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${process.env.API}/user/analytics`);
  //       const result = await response.json();
  //        console.log("data---",result)
  //       setData(result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch data", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const pages = [
   
  //   { name: "Subscriptions", icon: <BarChart />, count: data?.userSubscriptionCount },
  //   { name: "Orders", icon: <ShoppingCart />, count: data?.userOrderCount},
  //   { name: "User Courses", icon: <People />, count: data?.userCourseCount},
   
  // ];

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (!data) {
  //   return (
  //     <Typography
  //       variant="h6"
  //       sx={{
  //         textAlign: "center",
  //         marginTop: "2rem",
  //       }}
  //     >
  //       Failed to load data
  //     </Typography>
  //   );
  // }





  return (
<>

    <Box
      sx={{
        backgroundColor: "black",
        color: "#fff",
        textAlign: "center",
        py: 4,
        px: 15,
      }}
    >
      {/* Hero Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Welcome to the Analytics Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            lineHeight: 1.6,
            color: "#d1d1d1",
            maxWidth: "480px",
            mx: "auto",
          }}
        >
          View insights on orders, users, subscriptions, and more in one place.
        </Typography>
      </Box>

      {/* Responsive Cards */}
      <Grid container spacing={3} justifyContent="center">
        {pages.map((page, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4} // 3 items per row
          >
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: 2,
                backgroundColor: "#1a1a1a",
                color: "#fff",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "#333",
                },
              }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <Box sx={{ fontSize: 48, color: "#ff8a00" }}>{page.icon}</Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    {page.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, color: "#d1d1d1" }}
                  >
                    {page.count || "N/A"}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>


<Box 


sx={{
  backgroundColor: "black",
  color: "#fff",
  textAlign: "center",
  py: 4,
  px: 15,
}}


>   

<Order/>
<CourseOrder/>
</Box>
</>

  );
};

export default Home;
