import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";

const EngagingCourseCard = () => {
  return (

<Box 
     
 >
    <Grid
      container
      spacing={2}
      sx={{
        padding: { xs: 2, sm: 4 },
        alignItems: "center",
        
      }}

     
    >
      {/* Left Section (Image) */}
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/pic8.jpeg" // Replace with your image URL
          alt="Create an Engaging Course"
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Grid>

      {/* Right Section (Text Content) */}
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          Create an Engaging Course
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          Whether you've been teaching for years or are teaching for the first
          time, you can make an engaging course. We've compiled resources and
          best practices to help you get to the next level, no matter where
          you're starting.
        </Typography>

        {/* Link Button */}
        <Button
          variant="text"
          sx={{
            color: "blueviolet",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Get Started
        </Button>
      </Grid>
    </Grid>

</Box>
  );
};

export default EngagingCourseCard;
