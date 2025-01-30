import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {  toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import VideoUploader from "./UploadVideo";





export default function FormPage({ content, loading }) {


  const [formData, setFormData] = useState({
    
    title: "",
    about: "",
    description: "",
    image: null,
    imageUrl: "", // Cloudinary uploaded image URL
    level: "", // For user-selected level
    videoUrl:"",
    price:""
  });

  const [preview, setPreview] = useState(null); // For image preview
  const [isUploading, setIsUploading] = useState(false); // For upload status

  // Populate the form with server data when content is ready
  useEffect(() => {
    if (content) {
      setFormData((prev) => ({
        ...prev,
        title: content.title || "",
        about: content.about || "",
        description: content.description || "",
        imageUrl: content.imageUrl || "", // Populate the image URL if available
        level: content.level || "", // Populate the level if available
      videoUrl:content.videoUrl||"",
      price:content.price ||""
     
      }));

      // Set image preview if imageUrl is provided
      if (content.imageUrl) {
        setPreview(content.imageUrl);
      }
    }
  }, [content]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file)); // Generate a preview URL for the image

      // Upload to Cloudinary
      setIsUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace with your Cloudinary cloud name
          {
            method: "POST",
            body: uploadFormData,
          }
        );
        const data = await res.json();
        setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
       
       
        setIsUploading(false);
      } catch (error) {
        console.log("Error uploading image:", error);
        setIsUploading(false);
      }
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await fetch(`${process.env.API}/admin/curriculumCourse/${content?._id}` , {
        method: "PUT", // Change to "PUT" if you're updating existing data
        headers: {
          "Content-Type": "application/json", // Inform the server we're sending JSON
        },
        body: JSON.stringify(formData), // Convert form data to JSON string
      });
  
      if (!response.ok) {
        toast.error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json(); // Parse the JSON response from the server
     // console.log("Data successfully submitted:", result);
  
     toast.success("Data successfully submitted")
      // Reset the form or perform further actions
    
    
      setFormData({
        title: "",
        about: "",
        description: "",
        image: null,
        imageUrl: "",
        level: "",
        videoUrl:null,
        price:""
      });

      setPreview(null); // Clear the image preview
    } catch (error) {
      console.log("Failed to submit form:", error.message);
      toast.error("There was an error submitting the form. Please try again.");
    }
  };
  

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
   
 
  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",

        color: "#fff",
      }}
    >
     
      <Typography variant="h5" textAlign="center" gutterBottom>
      <EditIcon 
         sx={{
          marginTop: 2,

          backgroundColor: "#8A12FC",
          color: "white",
        }}
      
      />   {formData?.title}
        {/* {JSON.stringify(formData)} */}
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            input: { color: "white" },
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

        {/* About Field */}
        <TextField
          fullWidth
          label="About"
          name="about"
          value={formData.about}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          multiline
          rows={2}
          InputLabelProps={{
            style: { color: "#8A12FC" },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "white", // Input text color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC", // Focus border color
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          InputLabelProps={{
            style: { color: "#8A12FC" }, // Label color
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "white", // Input text color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC", // Focus border color
              },
            },
          }}
        />

        {/* Level Selection */}
        <FormControl
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": {
              color: "#8A12FC", // Label color, dimmed if disabled
            },
            "&:hover .MuiInputLabel-root": {
              color: "#8A12FC", // Hover label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#8A12FC", // Focused label color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC", // Focused border color
              },
            },
            "& .MuiSvgIcon-root": {
              color: "#8A12FC", // Icon color
            },
            "&:hover .MuiSvgIcon-root": {
              color: "#8A12FC", // Icon hover color
            },
            "&.Mui-focused .MuiSvgIcon-root": {
              color: "#8A12FC", // Icon focus color
            },
          }}
        >
          <InputLabel id="level-label">Level</InputLabel>
          <Select
            labelId="level-label"
            id="level-select"
            name="level"
            value={formData.level}
            onChange={handleChange}
            sx={{
              color: "#fff", // Selected text color
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "#F4F4F4", // Dropdown background
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      color: "white",
                      bgcolor: "#8A12FC", // Hover background for dropdown items
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="Beginner Level">Beginner Level</MenuItem>
            <MenuItem value="Advanced Level">Advanced Level</MenuItem>
            <MenuItem value="All Levels">All Levels</MenuItem>
          </Select>
        </FormControl>








  {/* Course Price Selection */}
  <FormControl
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": {
              color: "#8A12FC", // Label color, dimmed if disabled
            },
            "&:hover .MuiInputLabel-root": {
              color: "#8A12FC", // Hover label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#8A12FC", // Focused label color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#8A12FC", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#8A12FC", // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8A12FC", // Focused border color
              },
            },
            "& .MuiSvgIcon-root": {
              color: "#8A12FC", // Icon color
            },
            "&:hover .MuiSvgIcon-root": {
              color: "#8A12FC", // Icon hover color
            },
            "&.Mui-focused .MuiSvgIcon-root": {
              color: "#8A12FC", // Icon focus color
            },
          }}
        >
          <InputLabel id="level-label">Price</InputLabel>
          <Select
            labelId="level-label"
            id="level-select"
            name="price"
            value={formData.price}
            onChange={handleChange}
            sx={{
              color: "#fff", // Selected text color
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "#F4F4F4", // Dropdown background
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      color: "white",
                      bgcolor: "#8A12FC", // Hover background for dropdown items
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="9">$9.99</MenuItem>
            <MenuItem value="99">$99.99</MenuItem>
            <MenuItem value="999">$9999.99</MenuItem>
            <MenuItem value="999">$999999.99</MenuItem>
            <MenuItem value="999">$99999999.99</MenuItem>





          </Select>
        </FormControl>




        {/* Image Upload Field */}
        <Box marginY={2}>
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "#8A12FC",
              color: "white",
            }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        {/* Image Preview */}
        {preview && (
          <Box marginY={2} textAlign="center">
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          </Box>
        )}

        {/* Uploading Indicator */}
        {isUploading && (
          <Typography
            variant="body2"
            sx={{
              color: "white",
            }}
            textAlign="center"
          >
            Uploading image to Cloudinary...
          </Typography>
        )}

        <VideoUploader
        formData={formData}

       setFormData={setFormData}


        
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2,

            backgroundColor: "#8A12FC",
            color: "white",
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
