"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CircularProgress, useMediaQuery, Typography } from "@mui/material"; // For loading spinner and media queries
import { motion } from "framer-motion"; // For animations

const SubscriptionDetails = () => {


// Import the useSession hook to get the current user's session data
const { data } = useSession(); // Retrieves session data, including user information if logged in

// State variables to manage subscription details and UI state
const [subscription, setSubscription] = useState(null); // Stores the user's subscription details
const [remainingDays, setRemainingDays] = useState(null); // Stores the number of days left in the subscription
const [isLoading, setIsLoading] = useState(true); // Tracks whether the subscription data is being loaded

// Media query to detect small screens
const isSmallScreen = useMediaQuery("(max-width: 600px)"); // Checks if the screen width is 600px or less

// Effect to fetch subscription data when the user ID is available
useEffect(() => {
  if (!data?.user?._id) return; // If the user is not logged in or no ID is found, do nothing
  fetchSubscription(); // Call function to fetch subscription details
}, [data?.user?._id]); // Runs when the user's ID changes (e.g., after login)

// Function to fetch the user's subscription details from the API
const fetchSubscription = async () => {
  try {
    // Make an API request to get the subscription details for the logged-in user
    const response = await fetch(
      `${process.env.API}/user/billing/${data?.user?._id}`
    );
    
    const dataa = await response.json(); // Parse the JSON response

    if (response.ok) { // Check if the response is successful (status 200)
      const endDate = new Date(dataa.endDate); // Convert the subscription end date string to a Date object
      const today = new Date(); // Get the current date
      
      // Calculate the difference in milliseconds and convert it to days
      const diffTime = Math.abs(endDate - today); 
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      setSubscription(dataa); // Store the subscription data in state
      setRemainingDays(diffDays); // Store the number of remaining days in state
      setIsLoading(false); // Set loading state to false after fetching data
    }
  } catch (error) {
    setIsLoading(false); // Stop loading if there's an error
    console.log("error"); // Log the error to the console
  }
};















  // const { data } = useSession();

  // const [subscription, setSubscription] = useState(null);
  // const [remainingDays, setRemainingDays] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // // Media query to detect small screens
  // const isSmallScreen = useMediaQuery("(max-width: 600px)");

  // useEffect(() => {
  //   if (!data?.user?._id) return;
  //   fetchSubscription();
  // }, [data?.user?._id]);

  // const fetchSubscription = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.API}/user/billing/${data?.user?._id}`
  //     );
  //     const dataa = await response.json();

  //     if (response.ok) {
  //       const endDate = new Date(dataa.endDate);
  //       const today = new Date();
  //       const diffTime = Math.abs(endDate - today);
  //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //       setSubscription(dataa);
  //       setRemainingDays(diffDays);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log("error");
  //   }
  // };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: isSmallScreen ? "10px" : "0", // Add padding for smaller devices
        }}
      >
        <div
          style={{
            padding: isSmallScreen ? "20px" : "40px",
            borderRadius: "12px",
            height: isSmallScreen ? "auto" : "500px",
            width: isSmallScreen ? "100%" : "900px",
            margin: "0 auto",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            border: "2px solid yellow",
          }}
        >
          <div
            style={{
              backgroundColor: "#212121",
              borderRadius: "8px",
              padding: "20px",
              border: "2px solid yellow",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: isSmallScreen ? "200px" : "500px",
                  padding: "20px",
                }}
              >
                <CircularProgress
                  color="secondary"
                  size={isSmallScreen ? 40 : 80}
                />
              </div>
            ) : (
              <>
                {subscription && (
                  <>
                    <Typography
                      variant={isSmallScreen ? "h5" : "h3"}
                      style={{
                        color: "yellow",
                        fontWeight: "bold",

                        textAlign: "center",
                        marginTop: "10",
                      }}
                    >
                      Subscription Details
                    </Typography>

                    <motion.p
                      style={{
                        marginBottom: "10px",
                        fontSize: isSmallScreen ? "16px" : "20px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <strong>Plan:</strong> {subscription.plan || "Premium"}
                    </motion.p>
                    <motion.p
                      style={{
                        marginBottom: "10px",
                        fontSize: isSmallScreen ? "16px" : "20px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <strong>Start Date:</strong>{" "}
                      {new Date(subscription.startDate).toLocaleDateString() ||
                        ""}
                    </motion.p>
                    <motion.p
                      style={{
                        marginBottom: "10px",
                        fontSize: isSmallScreen ? "16px" : "20px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <strong>End Date:</strong>{" "}
                      {new Date(subscription.endDate).toLocaleDateString() ||
                        ""}
                    </motion.p>
                    <motion.p
                      style={{
                        marginBottom: "10px",
                        fontSize: isSmallScreen ? "16px" : "20px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <strong>Price:</strong> {subscription.price || ""}$
                    </motion.p>
                  </>
                )}
                {remainingDays !== null && (
                  <motion.p
                    style={{
                      marginTop: "20px",
                      fontSize: isSmallScreen ? "20px" : "26px",
                      color: "#d32f2f",
                      fontWeight: "bold",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <strong>
                      Subscription expires in {remainingDays} days
                    </strong>
                  </motion.p>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SubscriptionDetails;
