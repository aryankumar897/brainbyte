"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileImage  from "@/components/user/profileimage/ProfileImage"

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.API}/user/courseorders`);
        if (!response.ok) {
          throw new Error("Error fetching orders");
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
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
   

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4, textAlign: "center" }}>
        {error}
      </Alert>
    );
  }

  return (

<>

<ProfileImage/>

          {/* {JSON.stringify({orders},null,4)} */}

          <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography
        variant={isMobile ? "h5" : "h3"}
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#8A12FC",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Your Course Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          No orders found.
        </Typography>
      ) : (
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "purple",
                  "& > *": { color: "white", fontWeight: "bold" },
                }}
              >
                <TableCell sx={{ color: 'white', fontWeight: 'bold'}}     >Order ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold'}}  >Course Name</TableCell>
                <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >Payment Provider</TableCell>
                <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >Payment Status</TableCell>
                <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >Transaction ID</TableCell>
                <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >Total Price</TableCell>
                <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} 
                sx={{
                    transition: "background-color 0.3s ease", // Smooth transition effect
                    "&:hover": {
                      backgroundColor: "purple", // Light gray color on hover
                      cursor: "pointer", // Pointer cursor for hover effect
                      transition: "background-color 0.3s ease", // Smooth transition
                   
                    },
                  }}
                
                >
                  <TableCell   sx={{ color: 'white', fontWeight: 'bold'}}  >{order.order_id}</TableCell>
                  <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >{order.course_name}</TableCell>
                  <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >{order.payment_provider}</TableCell>
                  <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >{order.payment_status}</TableCell>
                  <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >{order.transaction_id.substring(0, 10)}...</TableCell>
                  <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >${order.amount}</TableCell>
                  <TableCell  sx={{ color: 'white', fontWeight: 'bold'}}  >
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>


</>

  );
};

export default Orders;
