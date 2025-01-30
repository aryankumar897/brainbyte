import React, { useState } from "react";

import { Box, Button, Typography, IconButton, Grid, TextField, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import SlideshowIcon from "@mui/icons-material/Slideshow";


import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EditIcon from "@mui/icons-material/Edit"; // For Edit functionality
import DeleteIcon from "@mui/icons-material/Delete"; // For Delete functionality
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
const CurriculumEditor = () => {

  const [showContentSelector, setShowContentSelector] = useState(false);
  const [showResourceSelector, setShowResourceSelector] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isResourcesVisible, setIsResourcesVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
    setShowResourceSelector(false)
    setShowContentSelector(false)
  };

  const toggleDescriptionClose = () => {
    setIsDescriptionVisible(false);

  }

  const toggleContentSelector = () => {
    setShowContentSelector(!showContentSelector);
    setShowResourceSelector(false)
    setIsDescriptionVisible(false);
  };

  const toggleResourceSelector = () => {
    setShowResourceSelector(!showResourceSelector)
    setShowContentSelector(false)
    setIsDescriptionVisible(false);
  }



  const toggleResources = () => {
    setIsResourcesVisible(!isResourcesVisible);
    setShowResourceSelector(false)

  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleResourcesClose = () => {
    setIsResourcesVisible(false);

  }


  return (

    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
          backgroundColor: "#212121",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* Section */}
        <Box
          sx={{
            backgroundColor: "#212121",
            border: "1px solid #E0E0E0",
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "4px",

          


          }}
        >

<Box  


            sx={{
             
              "&:hover .hover-iconss": {
                display: "flex", // Show icons on hover
              },


            }}

    >
          {/* Section Header */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
          >
            <DescriptionIcon sx={{ marginRight: "8px", color: "#000000" }} />
            Section 1: Introduction

            <Box
              className="hover-iconss"
              sx={{
                display: "none", // Hidden by default
                alignItems: "center",
                marginLeft: "8px",
                gap: "8px",
              }}
            >
              <IconButton
                size="small"
                sx={{ color: "#fff",
                  zIndex: 9999,
                
                 }}
                onClick={() => console.log("Edit clicked")}
              >
                <EditIcon sx={{ fontSize: "20px", color: "#fff" }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: "#fff", zIndex: 9999, }}
                onClick={() => console.log("Delete clicked")}
              >
                <DeleteIcon sx={{ fontSize: "20px", color: "#fff" }} />
              </IconButton>

                <IconButton
                  size="small"
                  sx={{ color: "#333333", marginLeft: "400px" }} // Pushed to the right
                  onClick={() => console.log("Drag clicked")}
                >
                  <DragIndicatorIcon sx={{ fontSize: "20px", color: "#fff" }} />
                </IconButton>
            </Box>



          </Typography>

          </Box>






          

          {/* Lecture */}
  
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              border: "1px solid #E0E0E0",
              padding: "8px",
              position: "relative",
              "&:hover .hover-icons": {
                display: "flex", // Show icons on hover
              },
            }}
          >
            {/* Left Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon
                sx={{
                  marginRight: "8px",
                  color: "#fff",
                  fontSize: "20px",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Lecture 1:{" "}
                <DescriptionIcon
                  sx={{
                    marginLeft: "4px",
                    marginRight: "8px",
                    color: "#000000",
                  }}
                />
                Introduction
              </Typography>

              {/* Edit and Delete Icons - Hidden by default */}
              <Box
                className="hover-icons"
                sx={{
                  display: "none", // Hidden by default
                  alignItems: "center",
                  marginLeft: "8px",
                  gap: "8px",
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: "#333333",
                  }}
                  onClick={() => console.log("Edit clicked")}
                >
                  <EditIcon sx={{ fontSize: "20px" ,color:"#fff" }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "#333333",
                  }}
                  onClick={() => console.log("Delete clicked")}
                >
                  <DeleteIcon sx={{ fontSize: "20px", color: "#fff" }} />
                </IconButton>
              </Box>
            </Box>

            {/* Right Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {!showContentSelector && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={toggleContentSelector}
                  startIcon={<AddIcon sx={{ color: "#FFFFFF" }} />}
                  sx={{
                    textTransform: "none",


                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#FFFFFF", // Text color white
                    border: "1px solid #E0E0E0",

                  }}
                >
                  Content
                </Button>
              )}

              {showResourceSelector ? (
                <IconButton onClick={toggleResourceSelector}>
                  <CloseIcon
                    sx={{
                      fontSize: "30px",
                      color: "#FFFFFF",
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={toggleResourceSelector}>
                  <ExpandMoreIcon
                    sx={{
                      fontSize: "30px",
                      color: "#FFFFFF",
                    }}
                  />
                </IconButton>
              )}




              <IconButton
            //   onClick={toggleResourceSelector}
              
              >
                <DragIndicatorIcon 
                  sx={{
                    fontSize: "30px",
                    color: "#FFFFFF",
                  }}
                />
              </IconButton>
            </Box>
          </Box>


          {/* Curriculum Item */}
          <Button
            variant="outlined"
            startIcon={<AddIcon sx={{ color: "#FFFFFF" }} />}
            size="small"
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 500,
              color: "#FFFFFF", // Text color white
              marginTop: "8px",

              border: "1px solid #E0E0E0",
            }}
          >
            Curriculum item
          </Button>
        </Box>

        {/* Add Section */}
        <Box sx={{ textAlign: "left" }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "20px",
              fontWeight: 500,
              color: "#FFFFFF", // Text color white
              border: "1px solid #E0E0E0",

            }}
          >
            Section
          </Button>
        </Box>
      </Box>





    </>

  );
};

export default CurriculumEditor;


