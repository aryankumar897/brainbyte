

import { Card, CardContent, Typography, Grid } from "@mui/material";
import CourseOrder from "./CourseOrder"
import Order from "./Order"
const ChartDashboard = () => {
 
  
  return (
    <Grid
      container
      spacing={1}
      sx={{
        height: "100vh",
        backgroundColor: "#000000", // Black background
        padding: 10,
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Left Side - Doughnut Chart */}
      <Grid item xs={12} md={7}>
        <Card
          sx={{
            backgroundColor: "black",
          //  padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardContent>
            
            <div style={{ height: "auto" }}>

             <CourseOrder/>


            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side - Polar Area Chart */}
      <Grid item xs={12} md={5}>
        <Card
          sx={{
            backgroundColor: "black",
         //   padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardContent>
           
            <div style={{ height: "auto" }}>
            <Order/>

            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartDashboard;
