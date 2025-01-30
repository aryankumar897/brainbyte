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
import Sidebar from "@/components/sidebar/Sidebar";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.API}/admin/alluser`);
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
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
        🌟 All Registered Users 🌟
      </Typography>
      {users.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          No users found.
        </Typography>
      ) : (
        <TableContainer sx={{ mt: 2 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "purple", "& > *": { color: "white", fontWeight: "bold" } }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold'}}   >Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >Role</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >Organization</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >Registered  At</TableCell>

              </TableRow>
            </TableHead>
            <TableBody   sx={{ backgroundColor: "black",}}       >
              {users.map((user) => (
                <TableRow
                  key={user.email}
                  sx={{
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "purple",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    },
                  }}
                >
                  <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >{user.name}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >{user.email}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >{user.role}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >{user.organization || "N/A"}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold'}} >{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>

<Sidebar/>

</>

  );
};

export default Users;
