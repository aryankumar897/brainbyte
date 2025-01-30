import React, { useState,useEffect } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Divider,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import ReCAPTCHA from "react-google-recaptcha";

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react"

const CaptchaProtectionPopup = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "rgb(33, 179, 255)",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        zIndex: 9999, // Ensure it's on top
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzHPIg1vi9om7i-Uo1drOVBBytptqaXrqtZWr8Q_PGyWsmTy2QSUSrOGd9S27Ma3fNroA&usqp=CAU"
        alt="reCAPTCHA logo"
        style={{ height: "60px", padding: "10px 10px" }}
      />
      protected by Google reCAPTCHA.
      {hovered && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          <a
            href="https://policies.google.com/privacy?hl=en"
            style={{ color: "#fff" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </Typography>
      )}
    </Box>
  );
};

const LoginModal = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState(0); // 0 = Sign In, 1 = Sign Up
  const [form, setForm] = useState({
    name:"",
    email: "",
    password: "",
    organization: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  
  const { data: session, status } = useSession()
  const router = useRouter()
 console.log("session=============",session)
 const [redirecting, setRedirecting] = useState(false);
  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Validate the Register form fields
  const validateForm = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Invalid email format";

    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (activeTab === 1 && !form.organization)
      errors.organization = "Organization is required";

    if (activeTab === 1 && !recaptchaToken)
      errors.recaptcha = "Please complete the reCAPTCHA";

    return errors;
  };

  // Validate the Register form fields
  const validateLoginForm = () => {
    const errors = {};
  
    if (!form.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Invalid email format";

    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters";

   
    
    return errors;
  };


  // Handle form  register submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {

 const  data={...form,recaptchaToken}

      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
       toast.success(result?.msg)
       setRecaptchaToken(null)
        handleClose();
      } else {
        toast.error(result?.err)
      
      }
    } catch (error) {
      toast.error("Error connecting to the server!")
     
    } finally {
      setLoading(false);
    }
  };


  // Handle form  register submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
 const  email=form.email
  const password=form.password

      const result = await signIn('credentials', {


        redirect: false,
        email,
  password,
    })
     
      if (!result.ok) {
        toast.error(result?.error)




      } else {
      
        toast.success("Login successfully")
        setRecaptchaToken(null)
         handleClose();
  

        
      }
    } catch (error) {
      toast.error("Error connecting to the server!")
     
    } finally {
      setLoading(false);
    }
  };

  
 

  

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            maxWidth: 600,
            margin: "auto",
            marginTop: "4%",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#000",
              }}
            >
              Please Login To Continue
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Tabs
            value={activeTab}
            onChange={(e, value) => setActiveTab(value)}
            centered
            sx={{
              borderTop: "2px solid green",
              "& .MuiTabs-indicator": { backgroundColor: "#00A651" },
              "& .MuiTab-root": {
                textTransform: "none",
                color: "#000",
              },
              "& .Mui-selected": { color: "#00A651 !important" },
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          <form 
        
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          activeTab === 1 ? handleSubmit(e) : handleLogin(e);
        }}
          
          >

          {activeTab === 1 && (
              <TextField
                fullWidth
                label="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
              />
            )}





            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            {activeTab === 1 && (
              <TextField
                fullWidth
                label="Institution/Organization"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                error={!!errors.organization}
                helperText={errors.organization}
                margin="normal"
              />
            )}

            {activeTab === 1 && (
              <ReCAPTCHA
                sitekey="6LevkGgbAAAAAAisYTVPCnpe_pZNn_6KQrn0OFHi"
                onChange={setRecaptchaToken}
              />
            )}

            {activeTab === 1 && errors.recaptcha && (
              <p style={{ color: "red" }}>{errors.recaptcha}</p>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <div
                className="g-recaptcha"
                data-sitekey="your-recaptcha-site-key"
                style={{ transform: "scale(0.9)" }}
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#00A651",
                color: "#fff",
                ":hover": { backgroundColor: "#007a3e" },
              }}
              disabled={loading}
            >
              {loading
                ? activeTab === 0
                  ? "Signing In..."
                  : "Signing Up..."
                : activeTab === 0
                ? "Sign In"
                : "Sign Up"}
            </Button>
          </form>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{ marginRight: "8px", backgroundColor: "red" }}
              onClick={() => signIn('google')}

           
           >
               Log In with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{ marginRight: "8px", backgroundColor: "blue" }}
          
              onClick={() => signIn('facebook')}
          >
              Log In with Facebook
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{ marginRight: "8px", backgroundColor: "black" }}
          
              onClick={() => signIn('linkedin')}
          >
             Log In with  LinkedIn
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{ marginRight: "8px", backgroundColor: "black" }}
           
              onClick={() => signIn('github')}
           >
          Log In with GitHub
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 2,
              fontSize: "1.1rem",
              color: "black", // Set text color to black
              backgroundColor: "transparent", // Ensure background is none
            }}
          >
            By creating this account, you agree to our Privacy Policy & Cookie
            Policy
          </Typography>
        </Box>
      </Modal>
      {   recaptchaToken && <CaptchaProtectionPopup />}
    </>
  );
};

export default LoginModal;
