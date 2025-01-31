"use client"; // Ensure this is at the top for Next.js to handle the client-side component

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';


export default function ProfileUpdateForm() {


// Define state variables to store user input and related data
const [name, setName] = useState(''); // Stores the user's name input.
const [email, setEmail] = useState(''); // Stores the user's email input.
const [password, setPassword] = useState(''); // Stores the user's password input.
const [confirmPassword, setConfirmPassword] = useState(''); // Stores the confirmation password input.
const [profileImage, setProfileImage] = useState(null); // Stores the selected image file (before upload).
const [profileImagePreview, setProfileImagePreview] = useState(''); // Stores the image preview URL.
const [errors, setErrors] = useState({}); // Stores validation errors for form fields.
const [serverMessage, setServerMessage] = useState(''); // Stores messages from the server (success/error).
const [isSuccess, setIsSuccess] = useState(false); // Tracks if form submission was successful or not.


// useEffect hook runs after the component mounts (only once) to fetch user data from the server.
useEffect(() => {
    fetchUserData(); // Call the function to fetch user data from the API.
}, []); // Empty dependency array means this useEffect runs only once when the component is first loaded.


// Function to fetch user data from the server API.
const fetchUserData = async () => {
    try {
        const response = await fetch(`${process.env.API}/user/profile`); // Make a GET request to fetch user data.
        
        // Check if the response is unsuccessful (status code not in 200 range).
        if (!response.ok) {
            throw new Error('Failed to fetch user data'); // Throw an error if response fails.
        }

        const data = await response.json(); // Convert the response into JSON format.

        // Update state with fetched user details.
        setEmail(data?.email); // Set email from API response.
        setName(data?.name); // Set name from API response.
        setProfileImagePreview(data?.image); // Set profile image preview from API response.

    } catch (error) {
        console.log('Error fetching user data:', error); // Log the error in case of failure.
    }
};


// Function to validate form input fields.
const validateForm = () => {
    const errors = {}; // Create an empty object to store validation errors.

    // Check if name field is empty.
    if (!name) errors.name = 'Name is required';

    // Validate email field.
    if (!email) {
        errors.email = 'Email is required'; // Check if email is empty.
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid'; // Use regex to validate email format.
    }

    // Check if password is provided.
    if (!password) errors.password = 'Password is required';

    // Check if password and confirmPassword match.
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setErrors(errors); // Update state with validation errors.
    
    return Object.keys(errors).length === 0; // Return true if there are no validation errors.
};


// Function to handle profile image selection.
const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file.

    if (file) {
        setProfileImage(file); // Store the selected file in state.

        const reader = new FileReader(); // Create a FileReader to read the file.
        reader.onloadend = () => {
            setProfileImagePreview(reader.result); // Update the preview with the base64 URL of the image.
        };
        reader.readAsDataURL(file); // Convert the image file to a Data URL.
    }
};


// Function to upload an image to Cloudinary and return the uploaded image URL.
const uploadImageToCloudinary = async (image) => {
    const formData = new FormData(); // Create FormData object to send the image file.
    formData.append('file', image); // Attach the image file.
    formData.append('upload_preset', 'ml_default'); // Attach the Cloudinary upload preset.

    // Make a POST request to Cloudinary's API to upload the image.
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, { 
        method: 'POST', // HTTP method is POST since we are uploading data.
        body: formData, // Attach the form data containing the image.
    });

    const data = await response.json(); // Convert response into JSON format.
    return data.secure_url; // Return the URL of the uploaded image.
};


// Function to handle form submission when the user clicks the submit button.
const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    setServerMessage(''); // Clear any previous server messages.

    // Validate the form fields before submitting the data.
    if (!validateForm()) return; // Stop submission if validation fails.

    let imageUrl = ''; // Variable to store the uploaded image URL.

    // If a profile image was selected, upload it to Cloudinary.
    if (profileImage) {
        imageUrl = await uploadImageToCloudinary(profileImage); // Upload image and store the URL.
        setIsSuccess(true); // Mark success as true.
        setServerMessage("Image uploaded successfully"); // Update message.
    }

    // Prepare the request body with user data.
    const requestBody = {
        name, // User's name.
        email, // User's email.
        password, // User's password.
        profileImage: imageUrl, // Use the uploaded image URL.
    };

    // Send the user profile update request to the backend API.
    const response = await fetch(`${process.env.API}/user/profile`, {
        method: 'POST', // Use POST method to send data.
        headers: {
            'Content-Type': 'application/json', // Specify JSON content type.
        },
        body: JSON.stringify(requestBody), // Convert request body to JSON format.
    });

    const data = await response.json(); // Parse the server response.

    // Handle the server response based on success or failure.
    if (!response.ok) {
        setIsSuccess(false); // Set success state to false.
        setServerMessage(data.err); // Display the error message from the server.
    } else {
        setIsSuccess(true); // Set success state to true.
        setServerMessage(data.msg); // Display the success message from the server.
        setPassword(""); // Clear password field after successful submission.
        setConfirmPassword(""); // Clear confirm password field.
    }
};
























    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [profileImage, setProfileImage] = useState(null);
    // const [profileImagePreview, setProfileImagePreview] = useState('');
    // const [errors, setErrors] = useState({});
    // const [serverMessage, setServerMessage] = useState('');
    // const [isSuccess, setIsSuccess] = useState(false);


    // useEffect(() => {

    //     // Call the function to fetch data
    //     fetchUserData();
    // }, []); // Empty dependency array means this useEffect runs once when the component mounts



    // // Define an async function to fetch the data
    // const fetchUserData = async () => {
    //     try {
    //         const response = await fetch(`${process.env.API}/user/profile`); // Adjust the endpoint to your API
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user data');
    //         }
    //         const data = await response.json();

    //         setEmail(data?.email)
    //         setName(data?.name)
    //         setProfileImagePreview(data?.image)


    //     } catch (error) {
    //         console.log('Error fetching user data:', error);
    //     }
    // };






    // const validateForm = () => {
    //     const errors = {};
    //     if (!name) errors.name = 'Name is required';
    //     if (!email) {
    //         errors.email = 'Email is required';
    //     } else if (!/\S+@\S+\.\S+/.test(email)) {
    //         errors.email = 'Email is invalid';
    //     }
    //     if (!password) errors.password = 'Password is required';
    //     if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfileImage(file);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfileImagePreview(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const uploadImageToCloudinary = async (image) => {
    //     const formData = new FormData();
    //     formData.append('file', image);
    //     formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset

    //     const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, { // Replace with your Cloudinary cloud name
    //         method: 'POST',
    //         body: formData,
    //     });

    //     const data = await response.json();
    //     return data.secure_url; // Return the image URL
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setServerMessage('');
    //     if (!validateForm()) return;

    //     let imageUrl = '';
    //     if (profileImage) {
    //         imageUrl = await uploadImageToCloudinary(profileImage);
    //         setIsSuccess(true);
    //         setServerMessage("image upload ");

    //     }

    //     const requestBody = {
    //         name,
    //         email,
    //         password,
    //         profileImage: imageUrl,
    //     };

    //     const response = await fetch(`${process.env.API}/user/profile`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(requestBody),
    //     });

    //     const data = await response.json();
    //     if (!response.ok) {
    //         setIsSuccess(false);
    //         setServerMessage(data.err);
    //     } else {
    //         setIsSuccess(true);
    //         setServerMessage(data.msg);
    //         setPassword("")
    //         setConfirmPassword("")
    //     }
    // };

    return (
        <>
            <Box sx={{
                backgroundImage: 'url(/images/pic2.png)',


                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',



            }}   >

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Column layout for xs (extra small) and row layout for sm (small) and above
                        gap: 2,
                        maxWidth: 900,
                        margin: '0 auto',
                        padding: 2, // Add padding for better spacing on smaller screens
                        overflow: 'hidden',


                      //  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                       
                      backgroundColor: 'rgba(31, 15, 15, 0.6)',
                       
                        marginTop: "29px",
                        padding: '40px',
                        color: "white"



                        // Prevents image overflow on smaller screens
                    }}
                >
                    <Box
                        sx={{
                            order: { xs: 2, sm: 1 }, // Reverse order for xs and normal order for sm and above
                            flex: { xs: 'none', sm: 1 }, // No flex for xs, 1 for sm and above
                            textAlign: { xs: 'center', sm: 'left' }, // Center align for xs, left align for sm and above
                        }}
                    >
                        {profileImagePreview && (
                            <Box mt={2} textAlign="center">
                                <div className="image-container">
                                    <img src={profileImagePreview} alt="Profile Preview" className="profile-image" />
                                </div>
                            </Box>
                        )}
                    </Box>
                    <Box
                        sx={{
                            order: { xs: 1, sm: 2 }, // Reverse order for xs and normal order for sm and above
                            flex: { xs: 1, sm: 2 }, // 1 for xs, 2 for sm and above
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Update Profile
                        </Typography>
                        {serverMessage && (
                            <Alert severity={isSuccess ? 'success' : 'error'}>{serverMessage}</Alert>
                        )}
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                          
                            InputLabelProps={{
                                style: { color: '#8A12FC' },
                              }}
                              sx={{
                                mb:3,
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                },
                              }}

                        />
                        <TextField
                            label="Email"
                            variant="outlined"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth

                            InputLabelProps={{
                                style: { color: '#8A12FC' },
                              }}
                              sx={{
                                mb:3,
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                },
                              }}

                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            fullWidth
                          
                            InputLabelProps={{
                                style: { color: '#8A12FC' },
                              }}
                              sx={{
                                mb:3,
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                },
                              }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            fullWidth
                            InputLabelProps={{
                                style: { color: '#8A12FC' },
                              }}
                              sx={{
                                mb:3,
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#8A12FC',
                                  },
                                },
                              }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            
          sx={{
            backgroundColor: "#8A12FC",
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC',
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC',
                backgroundColor: "#8A12FC",
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC',
              },
            },
          }}

                        >
                            Upload Profile Image
                            <input
                                type="file"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        <Button type="submit"
                            variant="contained"
                         
          sx={{
            backgroundColor: "#8A12FC",
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#8A12FC',
              },
              '&:hover fieldset': {
                borderColor: '#8A12FC',
                backgroundColor: "#8A12FC",
              },
              '&.Mui-focused fieldset': {
                borderColor: '#8A12FC',
              },
            },
          }}

                        >
                            Update Profile
                        </Button>
                    </Box>
                    <style jsx>{`
                .image-container {
                    width: 280px;
                    height: 280px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-top:50px;
                    display: inline-block;
                    padding: 5px; /* Space between the image and border */
                    background: linear-gradient(45deg, rgba(238, 130, 238, 1), rgba(255, 192, 203, 1), rgba(255, 165, 0, 1));
                    background-size: 200% 200%;
                    animation: gradientAnimation 2s ease infinite;
                }
                .profile-image {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
                @keyframes gradientAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
                </Box>


            </Box>
         
        </>
    );
}