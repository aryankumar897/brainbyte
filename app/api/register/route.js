
// Import necessary modules
import { NextResponse } from "next/server";  // Importing Next.js response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish database connection
import User from "@/models/user";  // User model for interacting with the 'User' collection in the database
import bcrypt from "bcrypt";  // Bcrypt for hashing passwords securely
import fetch from "node-fetch";  // Fetch API to make HTTP requests (used for reCAPTCHA verification)

// verifyRecaptcha function with retry mechanism and proper error handling
const verifyRecaptcha = async (token, retries = 3) => {
  const secretKey = "6LevkGgbAAAAANz5VCkNLtxc1QQnz77J08QA5kU1";  // Your reCAPTCHA secret key
  const url = "https://www.google.com/recaptcha/api/siteverify";  // reCAPTCHA verification URL
  const params = `secret=${secretKey}&response=${token}`;  // Forming the body of the POST request

  // Retry mechanism for reCAPTCHA verification
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Make a POST request to reCAPTCHA API
      const response = await fetch(url, {
        method: "POST",  // HTTP method
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",  // Content type for the POST request
        },
        body: params,  // Sending the parameters (secret & token)
      });
      const data = await response.json();  // Parse the response data

      console.log("datax", data);  // Log the response data for debugging
      if (data.success) {  // Check if reCAPTCHA verification was successful
        return true;  // Return true if verification was successful
      } else {
        console.log(`reCAPTCHA verification failed: ${data["error-codes"]}`);  // Log any error codes if verification failed
        return false;  // Return false if verification failed
      }
    } catch (error) {  // Handle any errors during the fetch request
      console.log(`Attempt ${attempt + 1} failed: ${error.message}`);  // Log the error message and attempt number
      if (attempt === retries - 1) {  // If all attempts failed, throw an error
        throw new Error("All reCAPTCHA verification attempts failed");
      }
    }
  }
};

// Main POST function to handle user registration
export async function POST(req) {
  await dbConnect();  // Establish a database connection
  const body = await req.json();  // Parse the incoming JSON request body
  const { name, email, password, recaptchaToken, organization } = body;  // Destructure values from the request body
  console.log({ name, email, password, recaptchaToken, organization });  // Log the incoming data for debugging

  try {
    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If email exists, return an error response
      return NextResponse.json(
        { err: "Email already in use" },
        { status: 500 }
      );
    }

    // Call the verifyRecaptcha function to validate the reCAPTCHA token
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      console.log("reCAPTCHA verification failed");  // Log if verification fails
      // Return an error response if reCAPTCHA verification fails
      return NextResponse.json({
        err: "reCAPTCHA verification failed. Please try again.",
      });
    }

    // If reCAPTCHA passes, continue with user registration

    console.log("reCAPTCHA verification ");  // Log that reCAPTCHA passed

    // Hash the password securely before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the provided data and hashed password
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      organization,
    }).save();  // Save the new user to the database

    // Return a success message if user is registered successfully
    return NextResponse.json({ msg: "User registered successfully" });
  } catch (err) {
    console.log(err);  // Log any errors that occur during the registration process
    // Return an error response with the error message if something goes wrong
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}


















































// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import User from "@/models/user";
// import bcrypt from "bcrypt";
// import fetch from "node-fetch";

// // verifyRecaptcha function with retry mechanism and proper error handling
// const verifyRecaptcha = async (token, retries = 3) => {
//   const secretKey = "6LevkGgbAAAAANz5VCkNLtxc1QQnz77J08QA5kU1";
//   const url = "https://www.google.com/recaptcha/api/siteverify";
//   const params = `secret=${secretKey}&response=${token}`;

//   for (let attempt = 0; attempt < retries; attempt++) {
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: params,
//       });
//       const data = await response.json();

//       console.log("datax", data);
//       if (data.success) {
//         return true;
//       } else {
//         console.log(`reCAPTCHA verification failed: ${data["error-codes"]}`);
//         return false;
//       }
//     } catch (error) {
//       console.log(`Attempt ${attempt + 1} failed: ${error.message}`);
//       if (attempt === retries - 1) {
//         throw new Error("All reCAPTCHA verification attempts failed");
//       }
//     }
//   }
// };

// export async function POST(req) {
//   await dbConnect();
//   const body = await req.json();
//   const { name, email, password, recaptchaToken, organization } = body;
//   console.log({ name, email, password, recaptchaToken, organization });

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { err: "Email already in use" },
//         { status: 500 }
//       );
//     }

//     const isHuman = await verifyRecaptcha(recaptchaToken);
//     if (!isHuman) {
//       console.log("reCAPTCHA verification failed");
//       return NextResponse.json({
//         err: "reCAPTCHA verification failed. Please try again.",
//       });
//     }
//     // Generate activation token

//     console.log("reCAPTCHA verification ");

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await new User({
//       name,
//       email,
//       password: hashedPassword,

//       organization,
//     }).save();

//     // console.log("user saved successfully", user);

//     return NextResponse.json({ msg: "User registered  successfully" });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
