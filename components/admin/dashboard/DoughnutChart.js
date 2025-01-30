import React, { useEffect, useState } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import { Card, CardContent, Typography, Grid } from "@mui/material";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const ChartDashboard = () => {
  const [chartData, setChartData] = useState({
    categoryCount: 0,
    subCategoryCount: 0,
    userCount: 0,
    adminCount: 0,
    orderCount: 0,
  });

  const fetchChartData = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/count`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  // Data for Doughnut Chart
  const doughnutData = {
    labels: ["Categories", "Subcategories", "Users", "Admins", "Orders"],
    datasets: [
      {
        label: "Counts",
        data: [
          chartData.categoryCount,
          chartData.subCategoryCount,
          chartData.userCount,
          chartData.adminCount,
          chartData.orderCount,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", // Vibrant red
          "rgba(54, 162, 235, 0.8)", // Bright blue
          "rgba(255, 206, 86, 0.8)", // Sunny yellow
          "rgba(75, 192, 192, 0.8)", // Cool green
          "rgba(153, 102, 255, 0.8)", // Soft purple
        ],
        borderColor: ["rgba(255, 255, 255, 1)"], // White borders
        borderWidth: 2,
      },
    ],
  };

  // Data for Polar Area Chart
  const polarData = {
    labels: ["Categories", "Subcategories", "Users", "Admins", "Orders"],
    datasets: [
      {
        label: "Counts",
        data: [
          chartData.categoryCount,
          chartData.subCategoryCount,
          chartData.userCount,
          chartData.adminCount,
          chartData.orderCount,
        ],
        backgroundColor: [
          "rgba(255, 105, 180, 0.8)", // Pink
          "rgba(0, 255, 255, 0.8)", // Cyan
          "rgba(50, 205, 50, 0.8)", // Lime
          "rgba(255, 191, 0, 0.8)", // Amber
          "rgba(75, 0, 130, 0.8)", // Indigo
        ],
        borderColor: ["rgba(255, 255, 255, 1)"], // White borders
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white", // White text
        },
      },
    },
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: "100vh",
        backgroundColor: "#000000", // Black background
        padding: 4,
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Left Side - Doughnut Chart */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            backgroundColor: "black",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom sx={{ color: "white" }}>
              🌟 Dynamic Doughnut Chart 🌟
            </Typography>
            <div style={{ height: "600px" }}>
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side - Polar Area Chart */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            backgroundColor: "black",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom sx={{ color: "white" }}>
              🌟 Dynamic Polar Area Chart 🌟
            </Typography>
            <div style={{ height: "600px" }}>
              <PolarArea data={polarData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartDashboard;
