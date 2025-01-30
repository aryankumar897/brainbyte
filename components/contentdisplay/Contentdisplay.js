import { useState,useEffect } from "react";
import {
  Box,
  Grid,
 
  Card,
  CardContent,
} from "@mui/material";


import Footer from '@/components/footer/Footer';

import Accordionleft from "@/components/categorysingle/Accordion";
import Centerads from  "@/components/categorysingle/Centerads"
import Content from "@/components/categorysingle/Content"
import Title from "@/components/categorysingle/Title"
import SimilarReads from "@/components/categorysingle/SimilarReads.js";
import Advertisement from  "@/components/categorysingle/Advertisement"

import Advertisementtop from  "@/components/categorysingle/Advertisementtop"
import { useSession } from 'next-auth/react';
import Advertisementbottam from  "@/components/categorysingle/Advertisementbottam"
import { useRouter } from 'next/navigation'
import Navbar from  "@/components/navbar/Navbar"

export default function LodashLayout({content,loading}) {

  const router = useRouter()
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [plan,setPlan]=useState(false)
  useEffect(() => {
      if (!data?.user?._id) return;
      fetchSubscription();
  }, [data]);

  const fetchSubscription= async () => {

      const userId = data?.user?._id;

      try {
          const response = await fetch(`${process.env.API}/user/active/${userId}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
          });
          const data = await response.json();
          if (!response.ok) {
            toast.error(data?.err);
              router.push("/pricing")

          } else {



            setPlan(data?.msg)
              console.log(data);
              setIsLoading(false)

          }


      } catch (err) {
          console.log(err);
        
          setIsLoading(false)

      }
  };


  return (

<>
<Navbar/>

    <Box sx={{ bgcolor: "#212121", color: "#fff", minHeight: "100vh", }}>
      <Grid container spacing={1}>
        {/* Left Accordion Menu */}
        <Grid
          item
          xs={12}
          md={3}
        
        >

        
         <Accordionleft


/>
        
       
        </Grid>

        {/* Center Content */}
        <Grid item xs={12} md={7} >
      
        


          {plan ? (
              null
            ) : (
              <>
                 <Centerads/>
              </>
            )}



          <Title
           content={content} 
           plan={plan}
         loading={loading}
        
            />
<Content

content={content} 
loading={loading}


/>


          <SimilarReads/>
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
          sx={{ maxWidth: 300, bgcolor: "#212121", color: "#fff" }}
          
          >
            <CardContent>
        



              {plan ? (
              null
            ) : (
              <>
                 <Advertisement/>
              <Advertisementtop/>
              <Advertisementbottam/>
              
              <Advertisement/>
              <Advertisementtop/>
              </>
            )}

            </CardContent>
          </Card>
        </Grid>
     
     
     
      </Grid>

      {/* Floating Menu Icon for Mobile */}
      <Footer/>
    </Box>
</>

  );
}
