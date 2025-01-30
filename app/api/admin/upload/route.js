

// Import necessary modules
import { NextResponse } from "next/server";  // Import Next.js's response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a connection to the database
import cloudinary from "cloudinary";  // Import the Cloudinary module for image uploading

// Configure Cloudinary using environment variables (sensitive data like API keys)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Cloud name for Cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY,  // API key for Cloudinary
  api_secret: process.env.CLOUDINARY_API_SECRET,  // API secret for Cloudinary
});

// Define the POST function to handle image upload requests
export async function POST(req) {
  // Get the 'image' from the request body (assumes the body is a JSON containing the image data)
  const { image } = await req.json();
  
  // Establish a database connection before performing any operations
  await dbConnect();

  try {
    // Upload the image to Cloudinary using the uploader module
    const result = await cloudinary.uploader.upload(image);
    
    // Return the secure URL of the uploaded image in the response
    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    // If any error occurs during the image upload, return the error message and status code 500
    return NextResponse.json(
      {
        err: err.message,  // Provide the error message to the client
      },
      {
        status: 500,  // Internal server error status code
      }
    );
  }
}



























// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   const { image } = await req.json();
//   await dbConnect();
//   try {
//     const result = await cloudinary.uploader.upload(image);
//     //console.log("image upload response => ", result);
//     return NextResponse.json({ url: result.secure_url });
//   } catch (err) {
//     // console.log("image upload error => ", err);
//     return NextResponse.json(
//       {
//         err: err.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
