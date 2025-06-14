import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import ReactMarkdown from "react-markdown";
import { runAi } from "@/ai/ai";
import SendIcon from '@mui/icons-material/Send'; // Add an icon to the button

const AIAssistant = () => {


// State to track loading status (used to show/hide a spinner when AI is processing)
const [loading, setLoading] = useState(false);

// State to store user input (question or text to be processed)
const [userInput, setUserInput] = useState('');

// State to store AI-generated summarized content
const [summarizedContent, setSummarizedContent] = useState('');

// Function to handle AI-based summarization
const handleSummarize = async () => {
  if (userInput) { // Ensure user has entered some input
    setLoading(true); // Set loading state to show a spinner while processing

    try {
      // Construct the AI prompt using the user’s input
      const prompt = `Provide the best answer to this question: ${userInput}`;

      // Call the AI function to generate a response
      const summary = await runAi(prompt);

      console.log("Summarized content:", summary); // Log the AI-generated response for debugging

      // Update state with the AI-generated summary
      setSummarizedContent(summary);
    } catch (error) {
      console.log("Error summarizing:", error); // Log any errors encountered

      // Display an error message if summarization fails
      setSummarizedContent("Error summarizing the content.");
    } finally {
      setLoading(false); // Reset loading state to hide the spinner
    }
  }
};
















  // const [loading, setLoading] = useState(false);
  // const [userInput, setUserInput] = useState('');
  // const [summarizedContent, setSummarizedContent] = useState('');


 

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
    <Box
      sx={{
        backgroundColor: "#212121",
        color: "#fff",
        padding: 4,
        maxWidth: 900,
        textAlign: "center",
        margin: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "white", // Gradient color effect
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow for a modern look
          padding: "10px",
          borderRadius: "8px",
          background: "#8A12FC",
        }}
      >
        Ask AI Assistant
      </Typography>

  {/* Display answer Content */}
  <Box
        sx={{
          marginTop: 3,
          marginBottom:3,
          padding: 2,
          backgroundColor: "#333",
          borderRadius: "8px",
          maxHeight: "500px",
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



      {/* Text Field for User Input */}
      <Box
        sx={{
          display: "flex", // Use flexbox to align the input and button
          flexDirection: "row", // Horizontal layout (side by side)
          gap: 2, // Add gap between TextField and Button
          marginBottom: 2,
        }}
      >
        {/* Text Field for User Input */}
        <TextField
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
         
         
          InputLabelProps={{
            style: { color: '#8A12FC' },
          }}
          sx={{
            flex: 1, // Make the text field take the available space

            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC',
                color:"white",
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC',
                color:"white",
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC',
                color:"white",
              },
            },
          }}


          placeholder="Type your content here..."
        />

        {/* Send Button */}
        <Button
          onClick={handleSummarize}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            color: "#8A12FC",
            border: "2px solid #8A12FC",
            background: "transparent",
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          
            transition: "all 0.3s ease",
          }}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              <SendIcon sx={{ marginRight: 1 ,color:"#8A12FC" }} /> {/* Icon on the left of the text */}
              Send
            </>
          )}
        </Button>
      </Box>
    
    </Box>
  );
};

export default AIAssistant;
