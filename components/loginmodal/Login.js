import React, { useState, useEffect } from "react";
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

import { signIn } from "next-auth/react";

import { toast } from "react-toastify";


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



// State to track the active tab, either Sign In (0) or Sign Up (1)
const [activeTab, setActiveTab] = useState(0);

// State to store form data, including user name, email, password, and organization (for Sign Up)
const [form, setForm] = useState({
  name: "", // User's name
  email: "", // User's email
  password: "", // User's password
  organization: "", // User's organization (only required for Sign Up)
});

// State to store any validation errors that may occur during form submission
const [errors, setErrors] = useState({});

// State to track whether the form submission is currently loading (e.g., waiting for server response)
const [loading, setLoading] = useState(false);

// State to store the reCAPTCHA token, which is required for Sign Up
const [recaptchaToken, setRecaptchaToken] = useState(null);


// This function handles the changes in the form inputs (like name, email, password) as the user types
const handleChange = (e) => {
  setForm({
    ...form, // Keep the previous values
    [e.target.name]: e.target.value, // Update the field that changed
  });
};

// This function validates the Register form to make sure all required fields are filled out and are correct
const validateForm = () => {
  const errors = {}; // Create an empty object to store validation error messages

  // Check if 'name' field is not empty
  if (!form.name) errors.name = "Name is required"; 
  
  // Check if 'email' field is not empty and matches a valid email format using regex
  if (!form.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) // Regular expression to check if email format is valid
    errors.email = "Invalid email format";

  // Check if 'password' field is not empty and has at least 6 characters
  if (!form.password) errors.password = "Password is required";
  else if (form.password.length < 6) // Minimum password length validation
    errors.password = "Password must be at least 6 characters";

  // If we're on the 'Sign Up' tab (activeTab === 1), check if the 'organization' field is filled
  if (activeTab === 1 && !form.organization) 
    errors.organization = "Organization is required";

  // If we're on the 'Sign Up' tab, also check if the reCAPTCHA has been completed
  if (activeTab === 1 && !recaptchaToken)
    errors.recaptcha = "Please complete the reCAPTCHA";

  return errors; // Return the errors object, which contains any validation errors
};

// This function validates the Login form to ensure email and password are filled out correctly
const validateLoginForm = () => {
  const errors = {}; // Initialize an empty errors object

  // Check if 'email' is provided and matches a valid format
  if (!form.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) // Validate email format using regular expression
    errors.email = "Invalid email format";

  // Check if 'password' is provided and has a minimum length of 6 characters
  if (!form.password) errors.password = "Password is required";
  else if (form.password.length < 6)
    errors.password = "Password must be at least 6 characters";

  return errors; // Return the errors object
};

// This function handles the form submission for registration (Sign Up)
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior to handle it manually

  // Validate the form before submitting
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors); // If there are errors, update the errors state to display them
    return; // Stop further execution if the form is invalid
  }

  setLoading(true); // Set the loading state to true while waiting for the server response

  try {
    // Create a new data object that includes the form data and the reCAPTCHA token
    const data = { ...form, recaptchaToken };

    // Send a POST request to the server to register the user, passing the data as JSON
    const response = await fetch(`${process.env.API}/register`, {
      method: "POST", // HTTP method for the request
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
      body: JSON.stringify(data), // Send the form data as a JSON string
    });

    // Wait for the response and parse it as JSON
    const result = await response.json();

    // Check if the registration was successful (HTTP status 200)
    if (response.ok) {
      toast.success(result?.msg); // Display a success message (result.msg contains the message)
      setRecaptchaToken(null); // Reset the reCAPTCHA token after successful registration
      handleClose(); // Close the registration modal or form
    } else {
      toast.error(result?.err); // If the response contains an error, display the error message
    }
  } catch (error) {
    toast.error("Error connecting to the server!"); // If there was an error making the request, show a generic error
  } finally {
    setLoading(false); // Set loading to false when the request is finished (either success or failure)
  }
};

// This function handles the form submission for login (Sign In)
const handleLogin = async (e) => {
  e.preventDefault(); // Prevent default form submission to handle it manually

  // Validate the Login form before submitting
  const validationErrors = validateLoginForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors); // Update errors state if validation fails
    return; // Stop further execution if the form is invalid
  }

  setLoading(true); // Set loading state to true to indicate that the login process is ongoing

  try {
    // Extract the email and password from the form data
    const email = form.email;
    const password = form.password;

    // Use the 'signIn' function (likely from NextAuth) to attempt logging in
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect after login
      email,
      password, // Pass the email and password for authentication
    });

    // If the login is unsuccessful, display the error message from the result
    if (!result.ok) {
      toast.error(result?.error); 
    } else {
      toast.success("Login successfully"); // Show a success message if login is successful
      setRecaptchaToken(null); // Reset the reCAPTCHA token after successful login
      handleClose(); // Close the login modal or form
    }
  } catch (error) {
    toast.error("Error connecting to the server!"); // If there was an error with the login request, show an error message
  } finally {
    setLoading(false); // Set loading state to false when the login process is complete
  }
};
















  // const [activeTab, setActiveTab] = useState(0); // 0 = Sign In, 1 = Sign Up
  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   organization: "",
  // });
  // const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [recaptchaToken, setRecaptchaToken] = useState(null);

 
 
  // // Handle form input changes
  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // // Validate the Register form fields
  // const validateForm = () => {
  //   const errors = {};
  //   if (!form.name) errors.name = "Name is required";
  //   if (!form.email) errors.email = "Email is required";
  //   else if (!/\S+@\S+\.\S+/.test(form.email))
  //     errors.email = "Invalid email format";

  //   if (!form.password) errors.password = "Password is required";
  //   else if (form.password.length < 6)
  //     errors.password = "Password must be at least 6 characters";

  //   if (activeTab === 1 && !form.organization)
  //     errors.organization = "Organization is required";

  //   if (activeTab === 1 && !recaptchaToken)
  //     errors.recaptcha = "Please complete the reCAPTCHA";

  //   return errors;
  // };

  // // Validate the Register form fields
  // const validateLoginForm = () => {
  //   const errors = {};

  //   if (!form.email) errors.email = "Email is required";
  //   else if (!/\S+@\S+\.\S+/.test(form.email))
  //     errors.email = "Invalid email format";

  //   if (!form.password) errors.password = "Password is required";
  //   else if (form.password.length < 6)
  //     errors.password = "Password must be at least 6 characters";

  //   return errors;
  // };

  // // Handle form  register submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const data = { ...form, recaptchaToken };

  //     const response = await fetch(`${process.env.API}/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       toast.success(result?.msg);
  //       setRecaptchaToken(null);
  //       handleClose();
  //     } else {
  //       toast.error(result?.err);
  //     }
  //   } catch (error) {
  //     toast.error("Error connecting to the server!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Handle form  register submission
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateLoginForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const email = form.email;
  //     const password = form.password;

  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     if (!result.ok) {
  //       toast.error(result?.error);
  //     } else {
  //       toast.success("Login successfully");
  //       setRecaptchaToken(null);
  //       handleClose();
  //     }
  //   } catch (error) {
  //     toast.error("Error connecting to the server!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };






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
              onClick={() => signIn("google")}
            >
              Log In with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{ marginRight: "8px", backgroundColor: "blue" }}
              onClick={() => signIn("facebook")}
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
              onClick={() => signIn("linkedin")}
            >
              Log In with LinkedIn
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{ marginRight: "8px", backgroundColor: "black" }}
              onClick={() => signIn("github")}
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
      {recaptchaToken && <CaptchaProtectionPopup />}
    </>
  );
};

export default LoginModal;
