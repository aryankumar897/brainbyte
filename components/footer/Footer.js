"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  Twitter,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Footer = () => {

// Use useMediaQuery hook to determine if the screen size is small (max-width: 600px)
const isSmallScreen = useMediaQuery("(max-width:600px)");

// Use the router from next/router to handle navigation
const router = useRouter();

// State hook to store category data fetched from the API
const [categorydata, setCategoryData] = useState([]);

// State hook to manage loading state (for showing loading indicators)
const [loading, setLoading] = useState(false);

// Function to fetch curriculum data (categories with subcategories)
const fetchCurriculum = async () => {
  setLoading(true); // Set loading to true before starting the fetch
  try {
    // Fetch data from the API endpoint for categories and subcategories
    const response = await fetch(
      `${process.env.API}/homepage/catwithsubcate`
    );

    // Parse the JSON data returned from the server
    const data = await response.json();

    // Set the fetched data to the state (categorydata)
    setCategoryData(data || []);
  } catch (error) {
    // If there's an error during the fetch, log it to the console
    console.error("Error fetching categories:", error);
  } finally {
    // Set loading to false after the fetch completes
    setLoading(false);
  }
};

// useEffect hook to call fetchCurriculum once when the component mounts
useEffect(() => {
  fetchCurriculum(); // Fetch category data when the component is mounted
}, []); // Empty dependency array means this effect runs once after initial render

// Transform the fetched category data to a more structured format
const formattedCategories = categorydata.reduce((acc, item) => {
  // Destructure category and subcategory names and slugs
  const categoryName = item.categoryId.name;
  const categorySlug = item.categoryId.slug;
  const subcategoryName = item.subcategoryId.name;
  const subcategorySlug = item.subcategoryId.slug;

  // Check if the category already exists in the accumulator
  let category = acc.find((c) => c.name === categoryName);

  // If category doesn't exist, create a new category and add to accumulator
  if (!category) {
    category = { name: categoryName, slug: categorySlug, subcategories: [] };
    acc.push(category);
  }

  // Check if the subcategory already exists within the found category
  let subcategory = category.subcategories.find(
    (sc) => sc.name === subcategoryName
  );

  // If subcategory doesn't exist, create a new subcategory and add it to the category
  if (!subcategory) {
    subcategory = { name: subcategoryName, slug: subcategorySlug };
    category.subcategories.push(subcategory);
  }

  // Return the updated accumulator (array of formatted categories)
  return acc;
}, []); // Initial accumulator is an empty array












  // const isSmallScreen = useMediaQuery("(max-width:600px)");
  // const router = useRouter();

  // const [categorydata, setCategoryData] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const fetchCurriculum = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${process.env.API}/homepage/catwithsubcate`
  //     );
  //     const data = await response.json();
  //     setCategoryData(data || []);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCurriculum();
  // }, []);

  // const formattedCategories = categorydata.reduce((acc, item) => {
  //   const categoryName = item.categoryId.name;
  //   const categorySlug = item.categoryId.slug;
  //   const subcategoryName = item.subcategoryId.name;
  //   const subcategorySlug = item.subcategoryId.slug;

  //   let category = acc.find((c) => c.name === categoryName);
  //   if (!category) {
  //     category = { name: categoryName, slug: categorySlug, subcategories: [] };
  //     acc.push(category);
  //   }

  //   let subcategory = category.subcategories.find(
  //     (sc) => sc.name === subcategoryName
  //   );
  //   if (!subcategory) {
  //     subcategory = { name: subcategoryName, slug: subcategorySlug };
  //     category.subcategories.push(subcategory);
  //   }

  //   return acc;
  // }, []);











  return (
    <Box
      sx={{
        bgcolor: "#212121",
        color: "white",
        py: 4,
        px: isSmallScreen ? 2 : 8,
      }}
    >
      <Grid container spacing={4}>
        {/* Social Media and Branding Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "green" }}>
            BrainyBytes
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Corporate & Communications Address: A-143, 9th Floor, Sovereign
            Corporate Tower, Sector-136, Noida, Uttar Pradesh.
          </Typography>
          {/* Responsive App Store Buttons */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              gap: 2,
              justifyContent: "start",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              style={{ maxWidth: "150px", height: "auto" }}
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              style={{ maxWidth: "150px", height: "auto" }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <YouTube />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Twitter />
            </IconButton>
          </Box>
        </Grid>

        {/* Footer Links */}
        {loading ? (
          <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "green" }} />
          </Grid>
        ) : (
          formattedCategories.map((section, index) => (
            <Grid item xs={12} sm={4} md={2} key={index}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  display: "block",
                  color: "green",
                  textDecoration: "none",
                  fontSize: isSmallScreen ? "18px" : "20px",
                  fontStyle: "normal",
                  letterSpacing: "0.5px",
                  lineHeight: "1.6",
                  wordSpacing: "1px",
                  cursor: "pointer",
                  "&:hover": { color: "green" },
                  mb: 0.5,
                }}
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                onClick={() => router.push(`/content/${section?.slug}`)}
              >
                {section?.name}
              </Typography>
              {section.subcategories.map((link, linkIndex) => (
                <Typography
                  key={linkIndex}
                  onClick={() => router.push(`/content/${link?.slug}`)}
                  sx={{
                    cursor: "pointer",
                    display: "block",
                    color: "white",
                    textDecoration: "none",
                    fontSize: isSmallScreen ? "16px" : "18px",
                    fontStyle: "normal",
                    "&:hover": { color: "green" },
                    mb: 0.5,
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Footer;
