import React, { useState, useEffect } from "react";

import { Box, Typography, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BuildIcon from "@mui/icons-material/Build";
import GridViewIcon from "@mui/icons-material/GridView";
import ArticleIcon from "@mui/icons-material/Article";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CodeIcon from "@mui/icons-material/Code";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const phases = [
  {
    phase: "Phase 01",
    title: "Application Process & Onboarding",
    steps: [
      { step: "Step 01", title: "Application Submission", icon: <CheckCircleIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
      { step: "Step 02", title: "Selection & Enrollment", icon: <PersonAddIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
    ],
  },
  {
    phase: "Phase 02",
    title: "Learning Journey I",
    steps: [
      { step: "Step 01", title: "Programming Languages (C++, JAVA, Python)", icon: <CodeIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
      { step: "Step 02", title: "DSA (Basic to Advanced)", icon: <MergeTypeIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
      { step: "Step 03", title: "Mock Tests", icon: <AssignmentTurnedInIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
    ],
  },
  {
    phase: "Phase 04",
    title: "Learning Journey II",
    steps: [
      { step: "Step 01", title: "Choose Your Technology",
         icon: <ArrowForwardIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
      { step: "Step 02", title: "Development & Training",
         icon: <BuildIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
      { step: "Step 03", title: "Live Project(s) Building",
         icon: <GridViewIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
    ],
  },
  {
    phase: "Phase 05",
    title: "Become Job Ready",
    steps: [
      { step: "Step 01", title: "Resume Assistance",
         icon: <ArticleIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
      { step: "Step 02", title: "Mock Interview", 
        icon: <GroupsIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> },
    ],
  },
];

const CourseJourney = ({ course}) => {




   const [phase1, setPhase1] = useState(null);
   const [phase2, setPhase2] = useState(null);
   const [phase3, setPhase3] = useState(null);
   const [phase4, setPhase4] = useState(null);
 
   useEffect(() => {
     // Assuming the input data is passed as `courseData` prop
     const data =  course?.sections|| [];
 
     // Safely assign data to each state variable
     setPhase1(data[0] || null);
     setPhase2(data[1] || null);
     setPhase3(data[2] || null);
     setPhase4(data[3] || null);
   }, [course]);


   const transformedPhaseData = {
    phase: "Phase 1",
    title: phase1?.title,
    steps: phase1?.lectures?.slice(0, 2).map((lecture, index) => ({
      step: `Step ${index + 1}`,
      title: lecture?.title,
      icon: index === 0 ? <CheckCircleIcon sx={{ color: "#00FF66", marginRight: "8px" }}/>  :  <PersonAddIcon sx={{ color: "#00FF66", marginRight: "8px" }} />,
    })),
  }



  const transformedPhase2Data = {
    phase: "Phase 2",
    title: phase2?.title || "Default Title",
    steps: phase2?.lectures?.slice(0, 3).map((lecture, index) => ({
      step: `Step ${index + 1}`,
      title: lecture?.title,
      icon: index === 0 ? (
        <CodeIcon sx={{ color: "#00FF66", marginRight: "8px" }} />
      ) : index === 1 ? (
        <MergeTypeIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> 
      ) : (
        <AssignmentTurnedInIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> 
      ),
    })) || [],
  };


  const transformedPhase3Data = {
    phase: "Phase 3",
    title: phase3?.title || "Default Title",
    steps: phase3?.lectures?.slice(0, 3).map((lecture, index) => ({
      step: `Step ${index + 1}`,
      title: lecture?.title,
      icon: index === 0 ? (
        <ArrowForwardIcon sx={{ color: "#00FF66", marginRight: "8px" }} />
      ) : index === 1 ? (
        <BuildIcon sx={{ color: "#00FF66", marginRight: "8px" }} />
      ) : (
        <GridViewIcon sx={{ color: "#00FF66", marginRight: "8px" }} />
      ),
    })) || [],
  };
  


  const transformedPhase4Data = {
    phase: "Phase 4",
    title: phase4?.title || "Default Title",
    steps: phase4?.lectures?.slice(0, 2).map((lecture, index) => ({
      step: `Step ${index + 1}`,
      title: lecture?.title,
      icon: index === 0 ? 
      <ArticleIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> 
       : 
       <GroupsIcon sx={{ color: "#00FF66", marginRight: "8px" }} /> 
        ,

    })) || [],
  };
  





  return (
    <Box
      sx={{
        padding: "32px",
        backgroundColor: "#212121",
        color: "#FFFFFF",
      }}
    >

{/* {JSON.stringify({phase3},null,4)} */}

{/* {JSON.stringify({phase2},null,4)}

{JSON.stringify({phase3},null,4)}
{JSON.stringify({phase4},null,4)} */}

      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          borderBottom: "2px solid #00FF66",
          display: "inline-block",
          marginBottom: "24px",
        }}
      >
        Course Journey
      </Typography>




      {/* Render Phases Dynamically */}


 {/* Render Phases1 Dynamically */}
    
        <Box
       
          sx={{
            marginBottom: "32px",
            border: "1px solid #333",
            borderRadius: "8px",
            position: "relative",
            padding: "24px",
          }}
        >
          {/* Phase Label */}
          <Typography
            variant="subtitle1"
            sx={{
              position: "absolute",
              top: "-14px",
              left: "16px",
              backgroundColor: "#0B1120",
              color: "#00FF66",
              fontWeight: "bold",
              padding: "0 8px",
            }}
          >
            {transformedPhaseData.phase}
          </Typography>

          {/* Phase Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            {transformedPhaseData.title}
          </Typography>

          {/* Steps */}
          <Grid container spacing={4}>
            {  transformedPhaseData?.steps?.map((stepData, stepIndex) => (
              <Grid item xs={12} sm={4} key={stepIndex}>
                <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
                  {stepData?.icon}
                  <Typography>
                    <strong>{stepData?.step}:</strong> {stepData?.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
    
 {/* Render Phases2 Dynamically */}


        <Box
       
       sx={{
         marginBottom: "32px",
         border: "1px solid #333",
         borderRadius: "8px",
         position: "relative",
         padding: "24px",
       }}
     >
       {/* Phase Label */}
       <Typography
         variant="subtitle1"
         sx={{
           position: "absolute",
           top: "-14px",
           left: "16px",
           backgroundColor: "#0B1120",
           color: "#00FF66",
           fontWeight: "bold",
           padding: "0 8px",
         }}
       >
         {transformedPhase2Data.phase}
       </Typography>

       {/* Phase Title */}
       <Typography
         variant="h6"
         sx={{
           fontWeight: "bold",
           marginBottom: "24px",
         }}
       >
         {transformedPhase2Data.title}
       </Typography>

       {/* Steps */}
       <Grid container spacing={4}>
         {  transformedPhase2Data?.steps?.map((stepData, stepIndex) => (
           <Grid item xs={12} sm={4} key={stepIndex}>
             <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
               {stepData?.icon}
               <Typography>
                 <strong>{stepData?.step}:</strong> {stepData?.title}
               </Typography>
             </Box>
           </Grid>
         ))}
       </Grid>
     </Box>
  {/* Render Phases3 Dynamically */}

  <Box
       
       sx={{
         marginBottom: "32px",
         border: "1px solid #333",
         borderRadius: "8px",
         position: "relative",
         padding: "24px",
       }}
     >
       {/* Phase Label */}
       <Typography
         variant="subtitle1"
         sx={{
           position: "absolute",
           top: "-14px",
           left: "16px",
           backgroundColor: "#0B1120",
           color: "#00FF66",
           fontWeight: "bold",
           padding: "0 8px",
         }}
       >
         {transformedPhase3Data.phase}
       </Typography>

       {/* Phase Title */}
       <Typography
         variant="h6"
         sx={{
           fontWeight: "bold",
           marginBottom: "24px",
         }}
       >
         {transformedPhase3Data.title}
       </Typography>

       {/* Steps */}
       <Grid container spacing={4}>
         {  transformedPhase3Data?.steps?.map((stepData, stepIndex) => (
           <Grid item xs={12} sm={4} key={stepIndex}>
             <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
               {stepData?.icon}
               <Typography>
                 <strong>{stepData?.step}:</strong> {stepData?.title}
               </Typography>
             </Box>
           </Grid>
         ))}
       </Grid>
     </Box>

{/* Render Phases4 Dynamically */}


<Box
       
       sx={{
         marginBottom: "32px",
         border: "1px solid #333",
         borderRadius: "8px",
         position: "relative",
         padding: "24px",
       }}
     >
       {/* Phase Label */}
       <Typography
         variant="subtitle1"
         sx={{
           position: "absolute",
           top: "-14px",
           left: "16px",
           backgroundColor: "#0B1120",
           color: "#00FF66",
           fontWeight: "bold",
           padding: "0 8px",
         }}
       >
         {transformedPhase4Data.phase}
       </Typography>

       {/* Phase Title */}
       <Typography
         variant="h6"
         sx={{
           fontWeight: "bold",
           marginBottom: "24px",
         }}
       >
         {transformedPhase4Data.title}
       </Typography>

       {/* Steps */}
       <Grid container spacing={4}>
         {  transformedPhase4Data?.steps?.map((stepData, stepIndex) => (
           <Grid item xs={12} sm={4} key={stepIndex}>
             <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
               {stepData?.icon}
               <Typography>
                 <strong>{stepData?.step}:</strong> {stepData?.title}
               </Typography>
             </Box>
           </Grid>
         ))}
       </Grid>
     </Box>


<h2> real</h2>









{phases.map((phaseData, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: "32px",
            border: "1px solid #333",
            borderRadius: "8px",
            position: "relative",
            padding: "24px",
          }}
        >
          {/* Phase Label */}
          <Typography
            variant="subtitle1"
            sx={{
              position: "absolute",
              top: "-14px",
              left: "16px",
              backgroundColor: "#0B1120",
              color: "#00FF66",
              fontWeight: "bold",
              padding: "0 8px",
            }}
          >
            {phaseData.phase}
          </Typography>

          {/* Phase Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            {phaseData.title}
          </Typography>

          {/* Steps */}
          <Grid container spacing={4}>
            {phaseData.steps.map((stepData, stepIndex) => (
              <Grid item xs={12} sm={4} key={stepIndex}>
                <Box display="flex" alignItems="center" sx={{ marginBottom: "8px" }}>
                  {stepData.icon}
                  <Typography>
                    <strong>{stepData.step}:</strong> {stepData.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}


    </Box>
  );
};

export default CourseJourney;
