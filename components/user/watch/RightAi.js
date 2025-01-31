import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { runAi } from "@/ai/ai";
import SendIcon from "@mui/icons-material/Send"; // Add an icon to the button

import { Chip } from "@mui/material";

const Advertisement = () => {


// State to track the loading status (shows a spinner when AI is processing)
const [loading, setLoading] = useState(false);

// State to store user input (question or text that needs summarization)
const [userInput, setUserInput] = useState("");

// State to store the summarized content returned by AI
const [summarizedContent, setSummarizedContent] = useState("");

// Access the Material-UI theme for styling and responsiveness
const theme = useTheme();

// Check if the screen size is small (used for responsive UI adjustments)
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// Function to handle the summarization process
const handleSummarize = async () => {
  if (userInput) { // Ensure there is user input before proceeding
    setLoading(true); // Set loading state to show a spinner

    try {
      // Construct the AI prompt using the user's input
      const prompt = `Provide the best answer to this question: ${userInput}`;
      
      // Call the AI function to generate a response
      const summary = await runAi(prompt);

      console.log("Summarized content:", summary); // Log the response for debugging
      
      // Update state with the AI-generated summary
      setSummarizedContent(summary);
    } catch (error) {
      console.log("Error summarizing:", error); // Log errors if any occur
      
      // Display an error message if summarization fails
      setSummarizedContent("Error summarizing the content.");
    } finally {
      setLoading(false); // Reset loading state to hide the spinner
    }
  }
};
















  // const [loading, setLoading] = useState(false);
  // const [userInput, setUserInput] = useState("");
  // const [summarizedContent, setSummarizedContent] = useState("");
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const handleSummarize = async () => {
  //   if (userInput) {
  //     setLoading(true); // Show loading spinner
  //     try {
  //       const prompt = ` provide  best  answer to this question ${userInput}`;
  //       const summary = await runAi(prompt); // Call AI function for summarization

  //       console.log("Summarized content:", summary);
  //       setSummarizedContent(summary); // Update state with summary
  //     } catch (error) {
  //       console.log("Error summarizing:", error);
  //       setSummarizedContent("Error summarizing the content.");
  //     } finally {
  //       setLoading(false); // Hide loading spinner
  //     }
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "90%" : "250px",
          height: isMobile ? "250px" : "600px",
          margin: "auto",
          marginTop: "9",
          borderRadius: "8px",
          overflow: "hidden",
          //  cursor: 'pointer',
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#212121",
            color: "#fff",
            padding: 2,
            maxWidth: 900,
            textAlign: "center",
            margin: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "white",
                textAlign: "center",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                padding: "10px",
                borderRadius: "8px",
                background: "#8A12FC",
                marginRight: 2, // Add spacing between the text and the chip
              }}
            >
              Ask AI Assistant{" "}
              <Chip
                label="Beta"
                sx={{
                  backgroundColor: "yellow", // Yellow background for the "Beta" chip
                  color: "black", // Text color
                  fontWeight: "bold",
                  padding: "8px 12px",
                  borderRadius: "12px",
                }}
              />
            </Typography>
          </Box>

          {/* Display answer Content */}
          <Box
            sx={{
              marginTop: 3,
              marginBottom: 3,
              padding: 2,
              backgroundColor: "#333",
              borderRadius: "8px",
              height: "900px",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.3rem",
                fontWeight: "400",
                fontStyle: "italic",
                lineHeight: "1.6",
                color: "#fff",
                textAlign: "left",
              }}
            >
              {/* you should use this avaiding hydretion  error */}

              {/* <div dangerouslySetInnerHTML={{ __html: summarizedContent }} /> */}

              {summarizedContent ? (
                <ReactMarkdown>{summarizedContent}</ReactMarkdown>
              ) : (
                "Your answer will appear here"
              )}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Text Field for User Input */}
      <TextField
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        fullWidth
        sx={{
          flex: 1, // Make the text field take the available space
          mb: 3,
          padding: 2,
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "yellow",
              color: "white",
            },
            "&:hover fieldset": {
              borderColor: "yellow",
              color: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "yellow",
              color: "white",
            },
          },
        }}
        placeholder="Type your content here..."
      />

      {/* Send Button */}
      <Button
        fullWidth
        onClick={handleSummarize}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          color: "yellow",
          border: "2px solid yellow",
          background: "transparent",
          borderRadius: "8px",
          fontWeight: "bold",

          paddingRight: "14px",
          transition: "all 0.3s ease",
        }}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <CircularProgress size={24} color="yellow" />
        ) : (
          <>
            <SendIcon sx={{ marginRight: 1, color: "yellow" }} />{" "}
            {/* Icon on the left of the text */}
            Send
          </>
        )}
      </Button>
    </>
  );
};

export default Advertisement;
