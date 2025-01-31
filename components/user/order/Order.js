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
import ProfileImage from "@/components/user/profileimage/ProfileImage";

const Orders = () => {

  
  // State to manage orders, loading status, and errors
  const [orders, setOrders] = useState([]); // Stores the fetched orders from API
  const [loading, setLoading] = useState(true); // Tracks whether data is being loaded
  const [error, setError] = useState(null); // Stores any error messages from API requests

  // Get the theme object from Material-UI
  const theme = useTheme();

  // Determine if the screen size is mobile (small screens) using Material-UI's breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // useEffect runs once when the component mounts to fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Make a request to fetch user orders from the API
        const response = await fetch(`${process.env.API}/user/orders`);

        // If response status is not OK (not in the 200-299 range), throw an error
        if (!response.ok) {
          throw new Error("Error fetching orders"); // Custom error message
        }

        // Parse the JSON response
        const data = await response.json();

        // Update state with fetched orders
        setOrders(data);

        // Set loading to false since data is now available
        setLoading(false);
      } catch (err) {
        // If an error occurs, store the error message and stop loading
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders(); // Call the fetchOrders function when the component is mounted
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // If data is still being loaded, display a loading spinner
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" // Full height to center the spinner vertically
      >
        <CircularProgress /> {/* MUI loading spinner */}
      </Box>
    );
  }

  // If an error occurred during the API call, display an error message
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4, textAlign: "center" }}>
        {error} {/* Show the error message */}
      </Alert>
    );
  }

  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch(`${process.env.API}/user/orders`);
  //       if (!response.ok) {
  //         throw new Error("Error fetching orders");
  //       }

  //       const data = await response.json();
  //       setOrders(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  // if (loading) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       height="100vh"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Alert severity="error" sx={{ mt: 4, textAlign: "center" }}>
  //       {error}
  //     </Alert>
  //   );
  // }

  return (
    <>
      <ProfileImage />
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
          Your Orders
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
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Payment Method
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Payment Status
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Transaction ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Total Price
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Order Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{
                      transition: "background-color 0.3s ease", // Smooth transition effect
                      "&:hover": {
                        backgroundColor: "purple", // Light gray color on hover
                        cursor: "pointer", // Pointer cursor for hover effect
                        transition: "background-color 0.3s ease", // Smooth transition
                      },
                    }}
                  >
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order._id}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.orderStatus}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.paymentMethod}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.paymentStatus}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      {order.transactionId.substring(0, 10)}...
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      ${order.totalPrice}
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
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
