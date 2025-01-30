"use client"; // Ensure this is at the top for Next.js to handle the client-side component

import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';


export default function ProfileUpdateForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('');
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);





    useEffect(() => {

        // Call the function to fetch data
        fetchUserData();
    }, []); // Empty dependency array means this useEffect runs once when the component mounts



    // Define an async function to fetch the data
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${process.env.API}/user/profile`); // Adjust the endpoint to your API
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();

            setEmail(data?.email)
            setName(data?.name)
            setProfileImagePreview(data?.image)


        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };






    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!password) errors.password = 'Password is required';
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToCloudinary = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset

        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, { // Replace with your Cloudinary cloud name
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.secure_url; // Return the image URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerMessage('');
        if (!validateForm()) return;

        let imageUrl = '';
        if (profileImage) {
            imageUrl = await uploadImageToCloudinary(profileImage);
            setIsSuccess(true);
            setServerMessage("image upload ");

        }

        const requestBody = {
            name,
            email,
            password,
            profileImage: imageUrl,
        };

        const response = await fetch(`${process.env.API}/user/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!response.ok) {
            setIsSuccess(false);
            setServerMessage(data.err);
        } else {
            setIsSuccess(true);
            setServerMessage(data.msg);
            setPassword("")
            setConfirmPassword("")
        }
    };

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