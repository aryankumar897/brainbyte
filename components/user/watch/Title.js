import { DiscussionEmbed } from "disqus-react";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Modal,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { format } from "date-fns";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Divider from "@mui/material/Divider";
import { runAi } from "@/ai/ai";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import ReactMarkdown from "react-markdown";
//import Share from "./Share";

const ResponsiveComponent = ({ content, plan }) => {

// Import the theme from Material-UI to access theme properties
const theme = useTheme(); 

// Check if the screen width is small (typically for mobile devices)
const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

// State to control the visibility of the summary modal
const [modalOpen, setModalOpen] = useState(false);

// State to store the summarized content
const [summarizedContent, setSummarizedContent] = useState("");

// State to manage loading status while summarizing content
const [loading, setLoading] = useState(false);

// Additional loading state for another process (possibly for gaining content)
const [loadinggain, setLoadinggain] = useState(false);

// State to control the visibility of a modal related to content gain
const [modalGainOpen, setModalGainOpen] = useState(false);

// State to store content for the content gain modal
const [contentGain, setContentGain] = useState("");

// State to control the visibility of a chat modal
const [chatModalOpen, setChateModalOpen] = useState(false);

// Log content to the console (potential debugging tool)
console.log("contentx", content);

// Convert the content date into a Date object if it exists; otherwise, set it to null
const date = content ? new Date(content?.date) : null;

// Format the date into "dd MMM, yyyy" format (e.g., "25 Jan, 2025")
// If the date is invalid, return "Invalid Date"
const formattedDate =
  date && !isNaN(date) ? format(date, "dd MMM, yyyy") : "Invalid Date";

// Create an instance of MarkdownIt with specific options
const md = new MarkdownIt({
  html: true, // Allow HTML tags inside markdown content
  linkify: true, // Automatically convert links into clickable URLs
  typographer: true, // Improve typography (e.g., smart quotes, ellipses)
  
  // Custom syntax highlighting for code blocks
  highlight: (str, lang) => {
    // Check if the language exists in highlight.js; default to JavaScript if not found
    const language = lang && hljs.getLanguage(lang) ? lang : "js";
    
    try {
      // Highlight the code block using highlight.js
      const highlightedCode = hljs.highlight(str, { language }).value;
      
      // Return the highlighted code wrapped in a styled <pre> and <code> block
      return `
      <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 12px; padding-left: 30px; border-radius: 8px; overflow-x: auto;">
        <code style="font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.5;">
          ${highlightedCode}
        </code>
      </pre>`;
    } catch (error) {
      // Return an empty string in case of an error
      return "";
    }
  },
});

// Convert markdown content (if available) into HTML
const renderedContent = content?.content
  ? md.render(String(content.content)) // Render markdown as HTML
  : "No content available"; // Default message if content is missing

// Function to summarize content using AI
const handleSummarize = async () => {
  if (content?.content) { // Ensure there is content before proceeding
    setLoading(true); // Set loading to true to show a spinner
    
    try {
      // Create a prompt for AI to summarize the content with at least 250 words
      const prompt = `Summarize this content at least 250 words: ${renderedContent}`;
      
      // Call the AI function to generate a summary
      const summary = await runAi(prompt);

      console.log("summ", summary); // Log the summary result
      
      // Store the summarized content in state
      setSummarizedContent(summary);

      // Open the summary modal to display the result
      setModalOpen(true);
    } catch (error) {
      console.log("Error summarizing:", error); // Log errors if any occur
      
      // Display an error message if summarization fails
      setSummarizedContent("Error summarizing the content.");
    } finally {
      setLoading(false); // Set loading to false to hide the spinner
    }
  }
};






















  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const [modalOpen, setModalOpen] = useState(false);
  // const [summarizedContent, setSummarizedContent] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [loadinggain, setLoadinggain] = useState(false);
  // const [modalGainOpen, setModalGainOpen] = useState(false);
  // const [contentGain, setContentGain] = useState("");

  // const [chatModalOpen, setChateModalOpen] = useState(false);
  // console.log("contentx", content);

  // const date = content ? new Date(content?.date) : null;

  // // Check if the date is valid
  // const formattedDate =
  //   date && !isNaN(date) ? format(date, "dd MMM, yyyy") : "Invalid Date";

  // const md = new MarkdownIt({
  //   html: true,
  //   linkify: true,
  //   typographer: true,
  //   highlight: (str, lang) => {
  //     const language = lang && hljs.getLanguage(lang) ? lang : "js";
  //     try {
  //       const highlightedCode = hljs.highlight(str, { language }).value;
  //       return `
  //       <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 12px; padding-left: 30px; border-radius: 8px; overflow-x: auto;">
  //         <code style="font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.5;">
  //           ${highlightedCode}
  //         </code>
  //       </pre>`;
  //     } catch (error) {
  //       return "";
  //     }
  //   },
  // });

  // const renderedContent = content?.content
  //   ? md.render(String(content.content))
  //   : "No content available";

  // const handleSummarize = async () => {
  //   if (content?.content) {
  //     setLoading(true); // Show loading spinner
  //     try {
  //       const prompt = `Summarize this content atleast 250 word: ${renderedContent}`;
  //       const summary = await runAi(prompt); // Pass renderedContent with additional text

  //       console.log("summ", summary);
  //       setSummarizedContent(summary);
  //       setModalOpen(true);
  //     } catch (error) {
  //       console.log("Error summarizing:", error);
  //       setSummarizedContent("Error summarizing the content.");
  //     } finally {
  //       setLoading(false); // Hide loading spinner
  //     }
  //   }
  // };





//never use
  // const handleGain = async () => {
  //   if (content?.content) {
  //     setLoadinggain(true); // Show loading spinner
  //     try {
  //       const prompt = `Gain in-depth knowledge  or  explain  in deep: ${renderedContent}`;
  //       const summary = await runAi(prompt); // Pass renderedContent with additional text

  //       console.log("summ", summary);
  //       setContentGain(summary);
  //       setModalGainOpen(true);
  //     } catch (error) {
  //       console.log("Error summarizing:", error);
  //       setContentGain("Error summarizing the content.");
  //     } finally {
  //       setLoadinggain(false); // Hide loading spinner
  //     }
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          //justifyContent: "center", // Centers horizontally
          // alignItems: "center", // Centers vertically
          backgroundColor: "#212121",
          color: "#fff",
          width: isMobile ? "100%" : "900px",
          margin: "auto", // Centers horizontally within the parent container
          marginTop: 6,
          textAlign: isMobile ? "center" : "left", // Adjust text alignment based on device
          // padding: 2, // Add padding for spacing
        }}
      >
        {/* Title and Last Updated */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start", // Adjust alignment per device
            marginBottom: isMobile ? 1 : 0,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {content?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Last Updated: {"         "}
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          height: "5px",
          width: isMobile ? "100%" : "900px",
          margin: "auto",
          backgroundColor: "white",
        }}
      />
    </>
  );
};

export default ResponsiveComponent;
