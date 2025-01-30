"use client";

import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useRouter } from "next/navigation";


// Example tab data with routes
const tabData = [
  { label: "Web Tech", route: "/web-tech" },
  { label: "Foundational Courses", route: "/foundational-courses" },
  { label: "Data Science", route: "/data-science" },
  { label: "Practice Problem", route: "/practice-problem" },
  { label: "Python", route: "/python" },
  { label: "Machine Learning", route: "/machine-learning" },
  { label: "JavaScript", route: "/javascript" },
  { label: "System Design", route: "/system-design" },
  { label: "Django", route: "/django" },
  { label: "DevOps", route: "/devops" },
  { label: "Tutorial", route: "/tutorial" },
  { label: "Java", route: "/java" },
  { label: "C", route: "/c" },
  { label: "C++", route: "/c++" },
  { label: "React", route: "/react" },
  { label: "Django", route: "/django" },
  { label: "DevOps", route: "/devops" },
  { label: "Tutorial", route: "/tutorial" },
  { label: "Java", route: "/java" },
  { label: "C", route: "/c" },
  { label: "C++", route: "/c++" },
  { label: "React", route: "/react" },
];

const ScrollableTabs = () => {
  const [value, setValue] = useState(0);
 
  const [subcategories, setSubcategories] = useState([]);
  const theme = useTheme();
 
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens
  const router = useRouter(); // Next.js router for navigation

  const handleChange = (event, newValue) => {
    setValue(newValue);
 
    const selectedSlug = subcategories[newValue]?.slug;
    if (selectedSlug) {
      router.push(`/content/${selectedSlug.toLowerCase()}`);
    }
  };
  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/subcategory`);
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("subcategories", subcategories);

  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1c", // Dark background color
        color: "#fff", // Default text color
        padding: "10px 0",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        // scrollButtons="auto"

        //  variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none", // Remove underline
          },
          "& .MuiTabs-scrollButtons": {
            color: "#fff", // Scroll button color
            "&:hover": {
              color: "#00ff00", // Hover color for scroll buttons
            },
            "& svg": {
              fontSize: "3rem", // Increase the size of the icons
            },
          },
        }}
      >
        {subcategories.map((tab, index) => (
          <Tab
            key={index}
            label={tab.name}
            sx={{
              textTransform: "none",
              fontSize: isSmallScreen ? "14px" : "19px", // Increased font size
              fontWeight: 600,
              "&.Mui-selected": {
                color: "#fff !important", // Force white for the selected tab
              },
              color: value === index ? "#fff" : "#fff", // Active tab is white, others are gray
              "&:hover": {
                color: "#00ff00", // Green text on hover
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ScrollableTabs;
