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

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API}/admin/analytics`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pages = [
    { name: "Categories", icon: <Dashboard />, count: data?.categoryCount },
    { name: "Subcategories", icon: <Inventory />, count: data?.subCategoryCount },
    {
      name: "Categories with Subcategories",
      icon: <Add />,
      count: data?.cateWithSubCateCount,
    },
    { name: "Subscriptions", icon: <BarChart />, count: data?.subscriptionCount },
    { name: "Orders", icon: <ShoppingCart />, count: data?.orderCount },
    { name: "User Courses", icon: <People />, count: data?.orderCourseCount },
    { name: "Curriculums", icon: <ListAlt />, count: data?.curriculumCount },
    {
      name: "Curriculum Courses",
      icon: <Assessment />,
      count: data?.curriculumCourseCount,
    },
    { name: "Users", icon: <People />, count: data?.userCount },
    { name: "Admins", icon: <Settings />, count: data?.userAdminCount },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        Failed to load data
      </Typography>
    );
  }

  return (
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
          View insights on categories, users, subscriptions, and more in one place.
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
  );
};

export default Home;
