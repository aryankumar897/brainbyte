import React from "react";
import { Box, Typography, Divider, Button,CircularProgress , 

    useTheme,
    useMediaQuery,


  } from "@mui/material";
import { DiscussionEmbed } from "disqus-react";

const AskBox = ({content,loading}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          size={80} // Makes it larger
          sx={{
            color: "purple", // Sets the color to purple
            animation: "spin 2s linear infinite", // Adds custom animation
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(180deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </Box>
    );
  }



  return (
    <Box
      sx={{


        flexDirection: isMobile ? "column" : "row",

        width: isMobile ? "100%" : "900px",
        margin: "auto", // Centers horizontally within the parent container
        //marginTop: 10,
        textAlign: isMobile ? "center" : "left", // Adjust text alignment based on device
        color: "white",




        backgroundColor: "#212121",
       
        padding: 4,
     
       
        textAlign: "center",
       height:"auto",
        overflowY: "auto",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
     

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
            url: `${process.env.CLIENT_URL}/dashboard/user/watch?search=${content?.slug}`,
            identifier: content?._id,
            title: content?.title,
            language: "en",
            debug: true,
          }}
        />
      </Box>

     
    </Box>
  );
};

export default AskBox;
