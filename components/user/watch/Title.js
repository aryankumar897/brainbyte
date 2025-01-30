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
//import Share from "./Share";

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

  const date = content ? new Date(content?.date) : null;

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
