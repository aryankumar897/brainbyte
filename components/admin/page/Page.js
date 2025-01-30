import React from "react";
import EngagingCourseCard from "./EngagingCourseCard"
import VideoAndAudienceCards from "./VideoAndAudienceCards"
import Sidebar from "@/components/sidebar/Sidebar";
import { Box } from "@mui/material";

const ResponsiveCards = () => {
  return (
  <>  
      <Sidebar />

      <Box pl={12}  mx="auto"

      >

        <EngagingCourseCard />
        <VideoAndAudienceCards />

      </Box>
     


  </>
  );
};

export default ResponsiveCards;
