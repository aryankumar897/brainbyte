// components/CourseControls.js
import React, { useState } from "react";
import { Box,
   Button, 
   TextField, 
   Dialog,
   DialogTitle,
    DialogContent,
    DialogActions
   } from "@mui/material";
import CourseCard from "./CourseCard";

const CourseControls = () => {
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state
  const [title, setTitle] = useState(""); // Title state

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a course title.");
      return;
    }

    try {
      const response = await fetch(`${process.env.API}/Curriculum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        alert("Course added successfully.");
        setTitle(""); // Reset title input
        handleClose(); // Close the dialog
      } else {
        alert("Failed to add the course.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          padding: 2,
          bgcolor: "#212121",
        }}
      >
        {/* Search Box */}
        <TextField
          variant="outlined"
          placeholder="Search your courses"
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            input: { color: "white", fontSize: "1.2rem", height: "2rem" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC",
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC",
              },
            },
            width: "400px",
          }}
        />

        {/* New Course Button */}
        <Button
          variant="contained"
          color="secondary"
          sx={{
            bgcolor: "purple",
            ":hover": { bgcolor: "darkviolet" },
            whiteSpace: "nowrap",
            padding: "12px 24px",
            fontSize: "1.1rem",
          }}
          onClick={handleOpen}
        >
          New course
        </Button>
      </Box>

      {/* Dialog for Adding New Course */}
      <Dialog
        PaperProps={{
          sx: {
            bgcolor: "#212121",
            color: "white",
          },
        }}
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              style: { color: "#8A12FC" },
            }}
            sx={{
              input: { color: "white", fontSize: "1.2rem", height: "2rem" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#8A12FC",
                },
                "&:hover fieldset": {
                  borderColor: "#8A12FC",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8A12FC",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#fff",
              bgcolor: "red",
              ":hover": { bgcolor: "darkred" },
              whiteSpace: "nowrap",
              padding: "12px 24px",
              fontSize: "1.1rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{
              color: "#fff",
              bgcolor: "purple",
              ":hover": { bgcolor: "darkviolet" },
              whiteSpace: "nowrap",
              padding: "12px 24px",
              fontSize: "1.1rem",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <CourseCard />
    </>
  );
};

export default CourseControls;
