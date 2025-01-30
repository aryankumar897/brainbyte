
// Import necessary modules and functions
import { NextResponse } from "next/server"; // Import Next.js response handling to return HTTP responses
import dbConnect from "@/utils/dbConnect"; // Import database connection utility
import CurriculumCourse from "@/models/CurriculumCourse"; // Import the model for courses (to fetch course data from the database)
import Razorpay from "razorpay"; // Import Razorpay SDK for payment gateway integration

// Initialize Razorpay instance using the key and secret from environment variables
var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Set the Razorpay key ID from environment variables
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Set the Razorpay key secret from environment variables
});

// Define the GET request handler to create a Razorpay order for a course
export async function GET(req, context) {
  // Establish a connection to the database before performing any operations
  await dbConnect();

  try {
    // Retrieve the course based on the provided slug (course identifier)
    const course = await CurriculumCourse.findOne({
      slug: context.params.id, // Find the course based on the URL slug
    }).sort({
      createdAt: -1, // Sort by creation date in descending order to get the most recent course
    });

    // Define the options for the Razorpay order
    const options = {
      amount: course.price * 100, // Convert the course price to the smallest unit (paise) for Razorpay
      currency: "INR", // Set the currency to INR (Indian Rupee)
      receipt: "course_receipt", // Define a unique receipt identifier for the order
      notes: {
        course_id: course?._id, // Attach the course ID in the notes to be used later (e.g., for tracking the course)
      },
    };

    // Create the Razorpay order using the specified options
    const order = await razorpay.orders.create(options);

    console.log("order RAZORPAY", order); // Log the created Razorpay order for debugging purposes

    // Return the order details as a JSON response
    return NextResponse.json(order);
  } catch (err) {
    // If there's an error, log it and return an error response with the error message
    console.log("ERROR", err); // Log the error for debugging
    return NextResponse.json({ err: err.message }, { status: 500 }); // Return an error response with status 500 (internal server error)
  }
}































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";

// import Razorpay from "razorpay";
// var razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function GET(req,context) {
//   await dbConnect();
  
//   try {
    
//       const course = await CurriculumCourse.findOne({
//           slug: context.params.id,
//         }).sort({
//           createdAt: -1,
//         });


//     const options = {
//       amount: course.price * 100, //amount in smallest currency unit
//       currency: "INR",
//       receipt: "course_receipt",
//       notes: {
//         course_id: course?._id,
//       },
//     };

//     const order = await razorpay.orders.create(options);

//     console.log("order RAZORPAY", order);

//     return NextResponse.json(order);
//   } catch (err) {

//      console.log("ERROR", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
