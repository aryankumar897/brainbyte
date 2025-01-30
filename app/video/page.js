
"use client"
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VideoUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoURL, setVideoURL] = useState("");
  const [buffer, setBuffer] = useState(10); // Buffer state to simulate buffering effect




  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxSizeInMB = 100; // Set max file size in MB

    if (selectedFile && selectedFile.size > maxSizeInMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeInMB}MB. Please upload a smaller file.`);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setVideoURL("");
    setUploadProgress(0);
    setBuffer(10); // Reset buffer on new file
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
            if (progress % 5 === 0 && buffer < 100) {
              setBuffer(buffer + 1 + Math.random() * 10); // Simulate buffering
            }
          },
        }
      );

      setVideoURL(response.data.secure_url);
      setUploadProgress(0); // Reset progress bar after success
      setBuffer(100); // Set buffer to 100 once upload is successful
      console.log("Upload successful!");
    } catch (error) {
      console.log("Error uploading video:", error.response || error.message);
      console.log("Upload failed. Please try again.");
    }
  };

  const handleRemoveVideo = () => {
    setFile(null);
    setVideoURL("");
    setUploadProgress(0);
    setBuffer(10); // Reset buffer when removing video
  };

  return (
    
    <Card
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 4,
        borderRadius: 2,
        bgcolor: "#122121",
        color: "white",

      }}
    >
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          🎥 Video Uploader
        </Typography>
  {/* Custom Button-style File Input */}
  
{/* Custom Button-style File Input with File Name Display */}

<Button
          variant="outlined" // Set variant to "outlined"
          color="primary" // Set color to blue (primary)
          component="label"
          sx={{
            width: "100%",
            p: 2,
            borderRadius: 1,
            mt: 2,
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd", // Border for visual style
            fontSize: "1rem", // Button text size
            overflow: "hidden", // To prevent text overflow
            textOverflow: "ellipsis", // To show ellipsis for long file names
          }}
        >
          {file ? file.name : "Select Video"}
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            hidden // Hide the default file input
          />
        </Button>






        {uploadProgress > 0 && (
          <Box
            sx={{
              mt: 3,
              position: "relative",
              width: "100%",
              height: 30,
              borderRadius: 4,
              backgroundColor: "#122121",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <LinearProgress
              variant="buffer"
              value={uploadProgress}
              valueBuffer={buffer}
              sx={{
                height: "100%",
                borderRadius: 4,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#8A12FC", // Modern green color
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#fff",
                fontWeight: "bold",
                lineHeight: "40px", // Align text vertically in progress bar
              }}
            >
              {uploadProgress}%
            </Typography>
          </Box>
        )}

        {videoURL && (
          <Box sx={{ mt: 3, position: "relative" }}>
            <Typography variant="subtitle1">Uploaded Video:</Typography>
            <video
              src={videoURL}
              controls
              style={{
                width: "100%",
                borderRadius: "8px",
                marginTop: "10px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <IconButton
              aria-label="remove video"
              onClick={handleRemoveVideo}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "rgba(240, 13, 13, 0.8)",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                "&:hover": { background: "red" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
        fullWidth
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
          sx={{
            textTransform: "capitalize",
            px: 3,
            py: 1.5,
            mt: 2,
            borderRadius: 2,
         backgroundColor: "#8A12FC",
          }}


        
        >
          Upload Video
        </Button>
      </CardActions>
    </Card>
  );
};

export default VideoUploader;
