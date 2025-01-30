import { Box, Grid, Card } from "@mui/material";
import React, { useEffect, useState } from "react";

//import Footer from "@/components/footer/Footer";
import Accordionleft from "./Accordion";
//import Centerads from "@/components/categorysingle/Centerads";
import Content from "./Content";
import Title from "./Title";
//import SimilarReads from "@/components/categorysingle/SimilarReads";
//import Advertisement from "@/components/categorysingle/Advertisement";
import Advertisementtop from "@/components/categorysingle/Advertisementtop";
//import { useSession } from "next-auth/react";
//import Advertisementbottam from "@/components/categorysingle/Advertisementbottam";
import Navbar from "@/components/navbar/Navbar";
import RightAi  from "./RightAi"
export default function LodashLayout({ content, loading }) {

 const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // This ensures the component is mounted before rendering
  }, []);

  if (!isMounted) return null; // Avoid rendering during SSR




  return (
    <>
      <Box
        sx={{
          bgcolor: "#212121",
          height: "120vh", // Full height for visual balance
        }}
      >
        <Box
          sx={{
            bgcolor: "#212121",
            color: "#fff",
            // height: "120vh", // Full height for visual balance
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Main Content Layout */}
          <Grid
            container
            spacing={2}
            sx={{
              margin: "auto",
              // maxWidth: "1200px", // Limit content width for larger screens
              //  padding: "16px",
            }}
          >
            {/* Left Side - Accordion */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Align accordion content to the left
              }}
            >
              <Accordionleft />
            </Grid>

            {/* Right Side - Content */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Title Component */}
              <Title content={content} loading={loading} />

              {/* Main Content */}
              <Content content={content} loading={loading} />

              {/* Similar Reads */}
            </Grid>

            {/* Right Ads Section */}
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                //  bgcolor: "#1e1e1e",
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Card
                sx={{ maxWidth: 400, bgcolor: "#212121", color: "#fff" }}
              >
<RightAi/>

              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
