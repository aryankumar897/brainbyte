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
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
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
import Share from "./Share";

const ResponsiveComponent = ({ content, plan }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [modalOpen, setModalOpen] = useState(false);
  const [summarizedContent, setSummarizedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadinggain, setLoadinggain] = useState(false);
  const [modalGainOpen, setModalGainOpen] = useState(false);
  const [contentGain, setContentGain] = useState("");


  const [chatModalOpen, setChateModalOpen] = useState(false);
  console.log("contentx", content);

  const date = content?.date ? new Date(content.date) : null;

  // Check if the date is valid
  const formattedDate =
    date && !isNaN(date) ? format(date, "dd MMM, yyyy") : "Invalid Date";

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      const language = lang && hljs.getLanguage(lang) ? lang : "js";
      try {
        const highlightedCode = hljs.highlight(str, { language }).value;
        return `
        <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 12px; padding-left: 30px; border-radius: 8px; overflow-x: auto;">
          <code style="font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.5;">
            ${highlightedCode}
          </code>
        </pre>`;
      } catch (error) {
        return "";
      }
    },
  });

  const renderedContent = content?.content
    ? md.render(String(content.content))
    : "No content available";

  const handleSummarize = async () => {
    if (content?.content) {
      setLoading(true); // Show loading spinner
      try {
        const prompt = `Summarize this content atleast 250 word: ${renderedContent}`;
        const summary = await runAi(prompt); // Pass renderedContent with additional text

        console.log("summ", summary);
        setSummarizedContent(summary);
        setModalOpen(true);
      } catch (error) {
        console.log("Error summarizing:", error);
        setSummarizedContent("Error summarizing the content.");
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }
  };



  const handleGain = async () => {
    if (content?.content) {
      setLoadinggain(true); // Show loading spinner
      try {
        const prompt = `Gain in-depth knowledge  or  explain  in deep: ${renderedContent}`;
        const summary = await runAi(prompt); // Pass renderedContent with additional text

        console.log("summ", summary);
        setContentGain(summary);
        setModalGainOpen(true);
      } catch (error) {
        console.log("Error summarizing:", error);
        setContentGain("Error summarizing the content.");
      } finally {
        setLoadinggain(false); // Hide loading spinner
      }
    }
  };




  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          padding: 1,
          backgroundColor: "#212121",
          color: "#fff",
          width: isMobile ? "100%" : "990px",
          margin: "auto",
          marginTop: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? 2 : 0,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {content?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Last Updated: {"         "}
            {formattedDate}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          {plan ? (
            <>
              {" "}




              <Tooltip title="Summarize Article" arrow>
                <IconButton
                  size="small"
                  sx={{ color: "#fff", "&:hover": { color: "#f0c14b" } }}
                  onClick={handleSummarize} // Trigger summarization
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <AutoAwesomeIcon />
                  )}
                </IconButton>
              </Tooltip>


              <Tooltip title="Gain in-depth knowledge" arrow>
                <IconButton
                  size="small"
                  sx={{ color: "#fff", "&:hover": { color: "#f0c14b" } }}
                  onClick={handleGain} // Trigger summarization
                >
                  {loadinggain ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <FlutterDashIcon/>
                  )}
                </IconButton>
              </Tooltip>




              {/* Chat Button with Tooltip */}
              <Tooltip title="Open Chat" arrow>
                <IconButton
                  size="small"
                  sx={{ color: "#fff", "&:hover": { color: "#f0c14b" } }}
                  onClick={() => setChateModalOpen(true)} // Open chat modal
                >
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : null}

          <Share />
        </Box>
      </Box>
      <Divider
        sx={{
          height: "3px",
          width: isMobile ? "100%" : "990px",
          margin: "auto",
          backgroundColor: "white",
        }}
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >

        <Box
          sx={{
            backgroundColor: "#212121",
            color: "#fff",
            padding: 4,

            maxWidth: 900,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "linear-gradient(to right, #f093fb, #f5576c)", // Gradient color effect

              textAlign: "center",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow for a modern look
              padding: "10px",
              borderRadius: "8px",
              background: "linear-gradient(to right, #4caf50, #81c784)",
            }}
          >
            Summarized Content
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.3rem", // Font size (can adjust as per preference)
              fontWeight: "400", // Regular weight
              fontStyle: "italic", // Italic text for emphasis (can be removed if not needed)
              lineHeight: "1.6", // Adjusted line height for better readability
              color: "#fff", // Text color for better contrast
              textAlign: "left", // Align text to the left (can change to 'center' if needed)
              marginTop: 1, // Adds margin from previous elements
              marginBottom: 2, // Adds margin after text for spacing
              maxHeight: "500px", // Set a maximum height for the scrollable area
              overflowY: "auto", // Enable vertical scrolling when content overflows
              padding: "10px", // Optional: add padding to make the content more spacious
              border: "1px solid #ddd", // Optional: border to distinguish the scrollable area
              borderRadius: "8px", // Optional: rounded corners for the scrollable container
            }}
          >
            {<ReactMarkdown>{summarizedContent}</ReactMarkdown> ||
              "No summary available."}
          </Typography>

          <Button
            sx={{
              width: "100%", // Full width
              marginTop: 2,
              color: "#4caf50", // Green text color
              border: "2px solid #4caf50", // Outline effect with green color
              background: "transparent", // Transparent background for outline
              padding: "12px", // Increased padding for a bigger button
              borderRadius: "8px", // Rounded corners
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
              "&:hover": {
                background: "linear-gradient(to right, #4caf50, #81c784)", // Green gradient on hover
                color: "#fff", // White text on hover
                border: "2px solid #81c784", // Light green outline on hover
                transform: "scale(1.05)", // Slight scale-up on hover
              },
              transition: "all 0.3s ease", // Smooth transition for hover effect
            }}
            onClick={() => setModalOpen(false)}
          >
            Close
          </Button>
        </Box>


        
      </Modal>



      <Modal
        open={chatModalOpen}
        onClose={() => setChateModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#212121",
            color: "#fff",
            padding: 4,
            width: "80%", // Set width to 80% of the viewport width (adjust as needed)
            maxWidth: "1100px", // Max width to ensure it doesn’t get too wide on large screens
            textAlign: "center",
            maxHeight: "90vh", // Restricts height to 90% of the viewport
            overflowY: "auto", // Enables vertical scrolling
            borderRadius: "8px", // Smooth corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "linear-gradient(to right, #f093fb, #f5576c)",
              textAlign: "center",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "10px",
              borderRadius: "8px",
              background: "linear-gradient(to right, #4caf50, #81c784)",
            }}
          >
            Comment Content
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              p: 5,
              margin: "0 auto",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
              "& iframe": {
                borderRadius: "12px",
                border: "none",
              },
            }}
          >
            <DiscussionEmbed
              shortname="news-c4690aq87t"
              config={{
                url: `${process.env.CLIENT_URL}/explain/${content?.slug}`,
                identifier: content?._id,
                title: content?.title,
                language: "en",
                debug: true,
              }}
            />
          </Box>
          <Button
            sx={{
              width: "100%",
              marginTop: 2,
              color: "#4caf50",
              border: "2px solid #4caf50",
              background: "transparent",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                background: "linear-gradient(to right, #4caf50, #81c784)",
                color: "#fff",
                border: "2px solid #81c784",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={() => setChateModalOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>




      <Modal
        open={modalGainOpen}
        onClose={() => setModalGainOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "#212121",
            color: "#fff",
            padding: 4,

            maxWidth: 900,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "linear-gradient(to right, #f093fb, #f5576c)", // Gradient color effect

              textAlign: "center",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow for a modern look
              padding: "10px",
              borderRadius: "8px",
              background: "linear-gradient(to right, #4caf50, #81c784)",
            }}
          >
           ✔️ Gain in-depth knowledge with premium content
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.3rem", // Font size (can adjust as per preference)
              fontWeight: "400", // Regular weight
              fontStyle: "italic", // Italic text for emphasis (can be removed if not needed)
              lineHeight: "1.6", // Adjusted line height for better readability
              color: "#fff", // Text color for better contrast
              textAlign: "left", // Align text to the left (can change to 'center' if needed)
              marginTop: 1, // Adds margin from previous elements
              marginBottom: 2, // Adds margin after text for spacing
              maxHeight: "500px", // Set a maximum height for the scrollable area
              overflowY: "auto", // Enable vertical scrolling when content overflows
              padding: "10px", // Optional: add padding to make the content more spacious
              border: "1px solid #ddd", // Optional: border to distinguish the scrollable area
              borderRadius: "8px", // Optional: rounded corners for the scrollable container
            }}
          >
            {<ReactMarkdown>{contentGain}</ReactMarkdown> ||
              "No Gain in-depth knowledge with premium content available."}
          </Typography>

          <Button
            sx={{
              width: "100%", // Full width
              marginTop: 2,
              color: "#4caf50", // Green text color
              border: "2px solid #4caf50", // Outline effect with green color
              background: "transparent", // Transparent background for outline
              padding: "12px", // Increased padding for a bigger button
              borderRadius: "8px", // Rounded corners
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
              "&:hover": {
                background: "linear-gradient(to right, #4caf50, #81c784)", // Green gradient on hover
                color: "#fff", // White text on hover
                border: "2px solid #81c784", // Light green outline on hover
                transform: "scale(1.05)", // Slight scale-up on hover
              },
              transition: "all 0.3s ease", // Smooth transition for hover effect
            }}
            onClick={() => setModalGainOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>


    </>
  );
};

export default ResponsiveComponent;
