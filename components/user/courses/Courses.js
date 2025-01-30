"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CircularProgress ,Button} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import Navbar  from  "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const courses = [
  {
    title: "GfG 160",
    subtitle: "Tech Career Roadmap",
    description: "GfG 160 - 160 Days of Problem Solving",
    level: "Beginner to Advance",
    link: "/gfg160",
    color: "#1a8b77",
    rating: "⭐ 4.6",
    bgImage: "/images/pic1.png",
  },
  {
    title: "DSA to Development",
    subtitle: "A Complete Guide",
    description: "DSA to Development: A Complete Guide",
    level: "Beginner to Advance",
    link: "/dsa-development",
    color: "#16755f",
    rating: "⭐ 4.4",
    bgImage: "/images/pic2.png",
  },
  {
    title: "Backend",
    subtitle: "Development",
    description: "JAVA Backend Development - Live",
    level: "Intermediate and Advance",
    link: "/backend-development",
    color: "#746eb6",
    rating: "⭐ 4.7",
    bgImage: "/images/pic3.png",
  },
];

const CoursesGrid = () => {
  const router = useRouter();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.API}/user/courses`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();

      
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  

 // Display loading indicator while data is loading
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
  




 


  if (error) return <p>Error: {error}</p>;

 

  return (
    <>



   <Box
        sx={{
          padding: "20px",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
       
        <Typography
          variant="h5"
          component="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Your Courses
        </Typography>

  
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          maxWidth="lg" // Restrict the width for large screens
        >
          {course.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
              
                <Box
                  sx={{
                    position: "relative",
                    height: "200px",
                    backgroundImage: `url(${
                      course?.course_id?.imageUrl || "/images/pic3.png"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    ⭐ 4.6
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "8px",
                      left: "16px",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      { course?.course_id?.title}
                    </Typography>
                    
                  </Box>
                </Box>

      
                <Box
                  sx={{
                    backgroundColor: "#212121",
                    color: "#fff",
                    padding: "1rem",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "start",
                  }}
                >
                  <Typography variant="body2">
                    { course?.course_id?.description.substring(0, 100)}
                  </Typography>
               
                  <Typography
                    variant="caption"
                    sx={{
                      marginTop: "8px",
                      display: "block",

                      color: "#00e67a",
                    }}
                  >
                    { course?.course_id?.level}
                  </Typography>
 
 
 


                  <Box marginTop="1rem">
                    <Button
                      variant="text"
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                      onClick={() =>
                        router.push(`/dashboard/user/watch?search=${course?.course_id?.slug}`)
                      }
                      endIcon={<ArrowForwardIcon />}
                    >
                      View Now
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

       
      </Box> 





    </>
  );
};

export default CoursesGrid;
