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
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import { runAi } from "@/ai/ai";

import dynamic from "next/dynamic";

// Dynamically import ReactPlayer (ensures it’s client-side only)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Content = ({ content, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // For responsiveness

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,

    highlight: (str, lang) => {
      const language = lang && hljs.getLanguage(lang) ? lang : "js"; // Fallback to plaintext
      try {
        const highlightedCode = hljs.highlight(str, { language }).value;
        return `
        <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 12px; padding-left: 30px; border-radius: 8px; overflow-x: auto;">
          <code style="font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.5;">
            ${highlightedCode}
          </code>
        </pre>`;
      } catch (error) {
        return ""; // Return an empty string if highlighting fails
      }
    },
  });

  const renderedContent = content?.content
    ? md.render(String(content.content)) // Ensure valid string input
    : "No content available";

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
            {/* Heading */}
            {/* <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              fontSize: isMobile ? "18px" : "22px",
            }}
          >
            Similar Reads
          </Typography> */}

            {/* Content */}
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
              {/* Read Time */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                <AccessTimeIcon sx={{ fontSize: "22px" }} />
                <Typography variant="caption">
                  {readingTime(renderedContent).text}
                </Typography>
              </Box>

              <CardContent sx={{ flex: 1, padding: "0px" }}>
                {/* Article Title */}

                {/* Article Description */}
                <Box
                  sx={{
                    color: "#fff",
                    marginBottom: 1,
                    fontSize: isMobile ? "16px" : "18px",
                  }}
                >
                  <div className="markdown-preview">
                    <div
                      style={{
                        fontSize: isMobile ? "16px" : "18px", // Dynamic font size
                        fontStyle: "normal",
                        letterSpacing: "0.5px", // Letter spacing
                        lineHeight: "1.6", // Line height
                        wordSpacing: "1px", // Optional word spacing for better readability
                     
                     
                      }}
                      dangerouslySetInnerHTML={{ __html: renderedContent }}
                    />
                  </div>
                </Box>

                {content && content?.videourl ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "80vh",
                      padding: "16px",
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
                  </Box>
                ) : (
                  <Box sx={{ padding: "16px", textAlign: "center" }}>
                    <p>No video available for this lecture.</p>
                  </Box>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </>
  );
};

export default Content;
