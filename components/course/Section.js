import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

// Data for cards
const topics = [
  { title: "Analysis of Algorithms", link: "/analysis" },
  { title: "Array", link: "/array" },
  { title: "Linked List", link: "/linked-list" },
  { title: "Searching Algorithms", link: "/searching" },
  { title: "Stack", link: "/stack" },
  { title: "Sorting Algorithms", link: "/sorting" },

];


const ResponsiveDSASection = ({ color, title,data}) => {

  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          minHeight: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#000", // Matches dark theme
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          maxWidth="lg"
        >
          {/* Title Section with View All Button */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="h5"
              component="h4"
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
             {title}
          
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "white",
                textTransform: "none",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => router.push("/view-all")}
            >
              View All →
            </Button>
          </Grid>

          {/* Cards */}
          {data&&  data.slice(1,10).map((topic, index) => (
            <Grid
              item
              xs={12} // Full width for extra small devices
              sm={6} // Two cards per row for small devices
              md={4} // Three cards per row for medium devices
              key={index}
            >
              <Card
                sx={{
                  backgroundColor:color,
                  color: "white",
                  height: "120px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)", // Slight zoom effect
                    transition: "all 0.3s ease",
                  },
                }}
               // onClick={() => router.push(topic.subtitle    ||topic.subcategoryId.slug )}
             
                onClick={() => {
                  const link = topic?.subtitle 
                  if (link) {
                    window.open(link, "_blank"); // Opens the link in a new tab
                  }
                }}
             
             
             >
                <CardContent>
                  <Typography variant="h6">{topic.title || topic.subcategoryId.name  }</Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      marginTop: "10px",
                    }}
                  >
                    Learn More →
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





export default ResponsiveDSASection;
