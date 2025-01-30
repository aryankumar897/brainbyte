import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, useTheme,
    useMediaQuery, } from "@mui/material";
import { Line } from "react-chartjs-2";

import DoughnutChart from './DoughnutChart';
import AllOrder from "./AllOrder"
import Analytics from "./Analytics"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [data, setData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Fetch data from the server-side API
    const fetchRevenueData = async () => {
      try {
        const response = await fetch(`${process.env.API}/admin/dashboard`);
        const revenueData = await response.json();
        setData(revenueData);  // Set the fetched data to state
      } catch (error) {
        console.log('Error fetching revenue data:', error);
      }
    };

    fetchRevenueData();
  }, []);  // Empty dependency array means this runs only once when the component mounts

   console.log("data revenue", data)
  // If data is not available yet, you can show a loading indicator
  if (!data) {
    return (
      <Card
        style={{
          marginLeft: '70px',
          padding: '10px',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            style={{
              marginBottom: '20px',
              color: '#00FF7F',
              textAlign: 'center',
              textShadow: '1px 1px 4px rgba(255, 255, 255, 0.7)',
            }}
          >
            Loading Revenue Report...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#FFD700',
        },
      },
      tooltip: {
        backgroundColor: '#00BFFF',
        titleColor: '#FFF',
        bodyColor: '#000',
        borderColor: '#FFD700',
        borderWidth: 1,
        callbacks: {
          label: (context) => `$${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Months',
          color: '#32CD32',
        },
        ticks: {
          color: '#32CD32',
        },
        grid: {
          color: 'rgba(50, 205, 50, 0.2)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Earnings ($)',
          color: '#FFA500',
        },
        beginAtZero: true,
        ticks: {
            color: '#FFA500',
            stepSize: 100,  // Defines the interval between ticks (0, 100, 200, etc.)
            min: 0,         // Start from 0
            max: 5000,       // You can adjust this based on your data
          },
        // ticks: {
        //   color: '#FFA500',
        // },
        grid: {
          color: 'rgba(255, 165, 0, 0.2)',
        },
      },
    },
  };

  return (

<>
    <Card
      style={{ 


        marginTop: isMobile ? "0" : "0", // explicitly set all margin values
        marginBottom: isMobile ? "0" : "0",
        marginLeft: isMobile ? "0" : "70px",
        marginRight: isMobile ? "0" : "0", // Add any missing margins here
        padding: '10px',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          style={{
            marginBottom: '20px',
            color: '#00FF7F',
            textAlign: 'center',
            textShadow: '1px 1px 4px rgba(255, 255, 255, 0.7)',
          }}
        >
          Revenue Report (Last 12 Months)
        </Typography>
        <div style={{ height: '400px' }}>
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>

<DoughnutChart/>
<AllOrder/>
<Analytics/>
</>

  );
};

export default RevenueChart;
