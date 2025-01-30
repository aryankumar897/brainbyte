import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

// Explore data for titles and links
const exploreData = [
  { title: "Data Structure and Algorithms", link: "/dsa" },
  { title: "Practice DSA", link: "/practice-dsa" },
  { title: "Web Development", link: "/web-dev" },
  { title: "AI ML & Data Science", link: "/ai-ml" },


  { title: "Web Development", link: "/web-dev" },
  { title: "AI ML & Data Science", link: "/ai-ml" },

];

// Function to dynamically generate dark colors
const generateDarkColor = (index) => {
  const baseHue = (index * 70) % 360; // Change hue dynamically based on index
  const saturation = 50; // Moderate saturation for balance
  const lightness = 20; // Low lightness for darker tones
  return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
};


const ExploreCards = () => {
  const router = useRouter();
 
 const [categories,setCategories]=useState([])
 
  useEffect(() => {
   

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.API}/categories`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        console.log(" categories", data);
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      } finally {
      
      }
    };

    fetchCategories();






  }, []);


  return (

<>  
    <Box
      sx={{
        minHeight: "10vh", // Full viewport height for vertical centering
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Add padding for small devices
        backgroundColor: "#000",
      }}
    >

     
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        maxWidth="lg" // Restrict the width for large screens
      >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              component="h4"
              sx={{
                textAlign: { xs: "center", sm: "left" }, // Center on small devices
                marginBottom: "20px",
                fontWeight: "bold", // Optional: make the text stand out
              }}
            >
              Explore
            </Typography>
          </Grid>

          {categories.slice(2,11).map((item, index) => (
          <Grid
            item
            xs={12} // Full-width on extra-small devices
            sm={6} // Two cards per row on small devices
            md={4} // Three cards per row on medium devices
            key={index}
          >
            <Card
              sx={{
                backgroundColor: generateDarkColor(index),
                color: "white",
              
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    marginTop: "10px",
                  }}
                  onClick={() => router.push(`/content/${item?.slug.toLowerCase()}`)}
                >
                  View more →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>


  );
};

export default ExploreCards;
