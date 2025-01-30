import React from "react";
import readingTime from "reading-time";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import { runAi } from "@/ai/ai";
import Tab  from  "./Tab"
import dynamic from "next/dynamic";

// Dynamically import ReactPlayer (ensures it’s client-side only)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Content = ({ content, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For responsiveness

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#212121", // Dark background
          padding: 3,
          color: "#fff",
        }}
      >
        {/* Show loader if loading */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px", // Adjust based on design
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1e1e1e",
                marginBottom: 2,
                padding: 2,
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <CardContent>
                {/* Article Title */}


                {content && content?.videourl ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "60vh",
                      //  padding: "16px",
                      backgroundColor: "#212121",
                    }}
                  >
                    <ReactPlayer
                      url={content?.videourl}
                      width="100%"
                      height="100%"
                      controls
                      light={true}
                      playing={false}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 2,
                        fontSize: isMobile ? "18px" : "22px",
                        color: "white",
                      }}
                    >
                      {content?.title}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      padding: "16px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <p>No video available for this lecture.</p>
                  </Box>
                )}


              </CardContent>
      

              <Tab
              content={content}
              loading={loading}
              />
            </Card>
          </>
        )}
      </Box>
    </>
  );
};

export default Content;
