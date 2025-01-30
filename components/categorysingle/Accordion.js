"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
  Divider,
  CircularProgress, // Import CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Content from "./Content";

export default function LodashAccordion() {
  const pathname = usePathname(); // Get the full path
  const slug = pathname.split("/").pop(); // Extract the last part of the path

  const [showAccordion, setShowAccordion] = useState(true); // Toggle visibility for smaller devices
  const router = useRouter();
  const [curriculum, setCurriculum] = useState([]); // Holds fetched data
  const [loading, setLoading] = useState(false); // State to handle loading indicator

  useEffect(() => {
    if (slug) {
      fetchCurriculum(slug);
    }
  }, [slug]);

  const fetchCurriculum = async (slug) => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch(`${process.env.API}/accordion/${slug}`);
      const data = await response.json();
      const sections = data?.sections || [];

      console.log("fetching curriculum sections:", sections);
      setCurriculum(sections);
    } catch (error) {
      console.log("Error fetching curriculum:", error);
    }
    setLoading(false); // Set loading to false after data is fetched
  };

  const handleContentSelection = (lecture) => {
    router.push(`/content/${lecture.slug}`);
  };

  return (
    <>
      {/* Accordion Section */}
      <Box
        sx={{
          zIndex: 1,
          bgcolor: "#212121",
          color: "#fff",
          width: "400px",
          height: "100vh", // Full viewport height
          //  position: "fixed", // Keeps it fixed on the left
          overflowY: "auto", // Adds vertical scrollbar when content overflows
          borderRight: "1px solid #333",
          display: { xs: showAccordion ? "block" : "none", md: "block" },
        }}
      >
        {/* Show loading spinner while fetching data */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress color="inherit" />{" "}
            {/* Displaying loading spinner */}
          </Box>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFD700", // Golden button
                color: "#000",
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: "bold",
                width: "100%", // Full-width button
                padding: "12px 24px", // Adjust padding for a more stylish look
                // Rounded corners for a modern style
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a soft shadow
                "&:hover": {
                  bgcolor: "#FFC107",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Slightly larger shadow on hover
                },
              }}
            >
              Go Premium
            </Button>

            <Divider
              sx={{
                height: "5px",
                width: "100%",
                margin: "auto",
                backgroundColor: "black",
              }}
            />

            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFD700", // Golden button
                color: "#000",

                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: "bold",
                width: "100%", // Full-width button
                padding: "12px 24px", // Adjust padding for a more stylish look
                // Rounded corners for a modern style
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a soft shadow
                "&:hover": {
                  bgcolor: "#FFC107",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Slightly larger shadow on hover
                },
              }}
            >
              Go Courses
            </Button>

            {curriculum?.map((item, index) => (
              <Accordion
                key={index}
                disableGutters
                sx={{
                  bgcolor: "inherit",
                  color: "inherit",
                  borderBottom: "1px solid #333",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                >
                  <Typography
                    style={{
                      fontSize: "22px", // Dynamic font size
                      fontStyle: "normal",
                      letterSpacing: "0.5px", // Letter spacing
                      lineHeight: "1.6", // Line height
                      wordSpacing: "1px", // Optional word spacing for better readability
                    }}
                  >
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item?.lectures?.map((lecture, i) => (
                    <Typography
                      key={i}
                      sx={{
                        mb: 1,
                        cursor: "pointer",
                        "&:hover": { color: "#008000" },
                      }}
                      style={{
                        fontSize: "20px", // Dynamic font size
                        fontStyle: "normal",
                        letterSpacing: "0.5px", // Letter spacing
                        lineHeight: "1.1", // Line height
                        wordSpacing: "1px", // Optional word spacing for better readability
                      }}
                      onClick={() => handleContentSelection(lecture)}
                    >
                      {lecture.title}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>

      {/* Floating Menu Icon for Small Devices */}
      <IconButton
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { md: "none" },
          bgcolor: "#333",
          color: "#fff",
          zIndex: 10,
          "&:hover": {
            bgcolor: "#444",
          },
        }}
        onClick={() => setShowAccordion(!showAccordion)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}

// const accordionData = [
//   {
//     title: "Lodash Introduction",
//     children: ["Overview", "Getting Started"],
//   },
//   {
//     title: "Lodash Array",
//     children: ["Array Functions", "Array Manipulations"],
//   },
//   {
//     title: "Lodash Collection",
//     children: ["Collection Functions", "Iterating Collections"],
//   },
//   {
//     title: "Lodash Date",
//     children: ["Date Utilities"],
//   },
//   {
//     title: "Lodash Function",
//     children: ["Function Bindings", "Debouncing"],
//   },
//   {
//     title: "Lodash lang",
//     children: ["Language Utilities"],
//   },
//   {
//     title: "Lodash Math",
//     children: ["Math Utilities"],
//   },
//   {
//     title: "Lodash Number",
//     children: ["Number Utilities"],
//   },
//   {
//     title: "Lodash Object",
//     children: ["Object Manipulation"],
//   },
//   {
//     title: "Lodash Seq",
//     children: ["Sequence Functions"],
//   },

//   {
//     title: "Lodash Introduction",
//     children: ["Overview", "Getting Started"],
//   },
//   {
//     title: "Lodash Array",
//     children: ["Array Functions", "Array Manipulations"],
//   },
//   {
//     title: "Lodash Collection",
//     children: ["Collection Functions", "Iterating Collections"],
//   },
//   {
//     title: "Lodash Date",
//     children: ["Date Utilities"],
//   },
//   {
//     title: "Lodash Function",
//     children: ["Function Bindings", "Debouncing"],
//   },
//   {
//     title: "Lodash lang",
//     children: ["Language Utilities"],
//   },
//   {
//     title: "Lodash Math",
//     children: ["Math Utilities"],
//   },
//   {
//     title: "Lodash Number",
//     children: ["Number Utilities"],
//   },
//   {
//     title: "Lodash Object",
//     children: ["Object Manipulation"],
//   },
//   {
//     title: "Lodash Seq",
//     children: ["Sequence Functions"],
//   },
// ];
