"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CircularProgress, useMediaQuery, Typography } from "@mui/material"; // For loading spinner and media queries
import { motion } from "framer-motion"; // For animations

const SubscriptionDetails = () => {
  const { data } = useSession();

  const [subscription, setSubscription] = useState(null);
  const [remainingDays, setRemainingDays] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Media query to detect small screens
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (!data?.user?._id) return;
    fetchSubscription();
  }, [data?.user?._id]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/user/billing/${data?.user?._id}`
      );
      const dataa = await response.json();

      if (response.ok) {
        const endDate = new Date(dataa.endDate);
        const today = new Date();
        const diffTime = Math.abs(endDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setSubscription(dataa);
        setRemainingDays(diffDays);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error");
    }
  };

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
