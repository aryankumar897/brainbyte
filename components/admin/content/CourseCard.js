import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SourceIcon from "@mui/icons-material/Source";
import RefreshIcon from "@mui/icons-material/Refresh";


import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";




const CourseCard = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]); // State for all courses
  const [hoverIndex, setHoverIndex] = useState(null); // Track which card is hovered
  const [editOpen, setEditOpen] = useState(false); // State for edit dialog
  const [deleteOpen, setDeleteOpen] = useState(false); // State for delete dialog
  const [currentCourse, setCurrentCourse] = useState(null); // Course being edited/deleted
  const [newTitle, setNewTitle] = useState(""); // New title for edit
  const [loading, setLoading] = useState(true); // Loader state
  const [actionLoading, setActionLoading] = useState(false); // Loader for edit/delete actions

  // Fetch courses from the server
  useEffect(() => {
    fetchCourses();
  }, []);

  
  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.API}/Curriculum`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast.error("Error fetching courses");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for the Edit Modal
  const handleEditOpen = (course) => {
    setCurrentCourse(course);
    setNewTitle(course.title);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = async () => {
    try {
      setActionLoading(true);
      const response = await fetch(
        `${process.env.API}/Curriculum/${currentCourse._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle }),
        }
      );
      if (response.ok) {
        const updatedCourse = await response.json();
        setCourses((prev) =>
          prev.map((course) =>
            course._id === updatedCourse._id ? updatedCourse : course
          )
        );
        toast.success("Course updated successfully");
        setEditOpen(false);
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      toast.error("Error updating course");
      console.error("Error updating course:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Handlers for the Delete Modal
  const handleDeleteOpen = (course) => {
    setCurrentCourse(course);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      setActionLoading(true);
      const response = await fetch(
        `${process.env.API}/Curriculum/${currentCourse._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCourses((prev) =>
          prev.filter((course) => course._id !== currentCourse._id)
        );
        toast.success("Course deleted successfully");
        setDeleteOpen(false);
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      toast.error("Error deleting course");
      console.error("Error deleting course:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchCourses}
          disabled={loading}
          sx={{
            bgcolor: "#8A12FC",
            ":hover": { bgcolor: "#6a0fba" },
            color: "#fff",
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Reload"}
        </Button>
      </Box>

      {courses.map((course, index) => (
        <Box
          key={course._id}
          sx={{
            padding: 2,
            mt: 2,
            bgcolor: "#212121",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
            },
            width: "100%",
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    bgcolor: "#e0e0e0",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.8rem", color: "black" }}
                  >
                    Image
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fff" }}
                >
                  {course.title}
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {hoverIndex === index ? (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="Source">
                    <IconButton
                      size="large"
                      sx={{ color: "green" }}
                      onClick={() =>
                        router.push(
                          `/dashboard/admin/create/content/curriculumeditorcontent?search=${course._id}`
                        )
                      }
                    >
                      <SourceIcon sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      sx={{ color: "purple" }}
                      onClick={() => handleEditOpen(course)}
                    >
                      <EditIcon  sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      sx={{ color: "red" }}
                      onClick={() => handleDeleteOpen(course)}
                    >
                      <DeleteIcon  sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  color="#fff"
                  sx={{ fontWeight: "bold" }}
                >
                  Finish your Topic
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      ))}

      {/* Edit Dialog */}
      <Dialog
        PaperProps={{ sx: { bgcolor: "#212121", color: "white" } }}
        open={editOpen}
        onClose={handleEditClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Course Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            InputLabelProps={{ style: { color: "#8A12FC" } }}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#8A12FC" },
                "&:hover fieldset": { borderColor: "#8A12FC" },
                "&.Mui-focused fieldset": { borderColor: "#8A12FC" },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditClose}
            sx={{ color: "#fff", bgcolor: "red" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            sx={{ color: "#fff", bgcolor: "purple" }}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        PaperProps={{ sx: { bgcolor: "#212121", color: "white" } }}
        open={deleteOpen}
        onClose={handleDeleteClose}
      >
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the course titled "
            {currentCourse?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClose}
            sx={{ color: "#fff", bgcolor: "purple" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{ color: "#fff", bgcolor: "red" }}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseCard;
