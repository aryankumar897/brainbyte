// pages/index.js
import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Icon for Ask Question
import SmartToyIcon from "@mui/icons-material/SmartToy"; // Icon for AI Assistant
import Ask from  "./ask"
import AIAssistant from "./AiAssistant"
const Home = (   {   content,
    loading   }     ) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Divider
        sx={{
          height: "5px",
          width: isMobile ? "100%" : "900px",
          marginTop: "20px",
          // margin: "auto",
          backgroundColor: "white",
        }}
      />

      <Box
        sx={{
          // display: "flex",
          flexDirection: isMobile ? "column" : "row",

          width: isMobile ? "100%" : "900px",
          margin: "auto", // Centers horizontally within the parent container
          //marginTop: 10,
          textAlign: isMobile ? "center" : "left", // Adjust text alignment based on device
          color: "white",
        }}
      >
        {/* Tabs Section */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          variant="fullWidth"
          textColor="inherit"
          // indicatorColor="primary"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#8A12FC", // Custom purple color for the indicator
            },
            marginTop: "30px",
            // bgcolor: "yellow",
            borderRadius: "8px",
          }}
        >
          <Tab
            icon={<HelpOutlineIcon />} // Icon for Ask Question
            iconPosition="start" // Position icon before label
            label="Ask Question"
            sx={{
              color: "white", // Default text color
              "&:hover": {
                bgcolor: "#8A12FC",
                color: "white",
              },
              "&.Mui-selected": {
                color: "white",
                fontWeight: "bold",
                backgroundColor: "#8A12FC", // Custom purple color for the indicator
              },
            }}
          />
          <Tab
            icon={<SmartToyIcon />} // Icon for AI Assistant
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                AI Assistant
                <Chip
                  label="Beta"
                  size="small"
                  sx={{
                    bgcolor: "#FFD700", // Gold color for the Beta chip
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    height: "20px",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            }
            iconPosition="start" // Position icon before label
            sx={{
              color: "white", // Default text color
              "&:hover": {
                bgcolor: "#8A12FC",
                color: "white",
              },
              "&.Mui-selected": {
                color: "white",
                fontWeight: "bold",
                backgroundColor: "#8A12FC", // Custom purple color for the indicator
              },
            }}
          />
        </Tabs>

        {/* Tab Content */}
        <Box>
          {activeTab === 0 && (
            <Box>

                <Ask
                content={content}
                loading={loading}
                
                />
             
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              {/* <Typography variant="h6" gutterBottom>
                AI Assistant
              </Typography>
              <Typography variant="body1">
                Interact with the AI assistant for quick and automated help.
              </Typography> */}
<AIAssistant/>



            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
