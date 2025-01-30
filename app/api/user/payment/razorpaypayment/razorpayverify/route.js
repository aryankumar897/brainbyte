


// Import necessary modules and functions
import { NextResponse } from "next/server"; // Import Next.js response handling to return HTTP responses
import dbConnect from "@/utils/dbConnect"; // Import database connection utility
import { getServerSession } from "next-auth/next"; // Import function to retrieve the current server-side session using NextAuth
import { v4 as uuidv4 } from "uuid"; // Import UUID generation function for creating unique IDs
import { authOptions } from "@/utils/authOptions"; // Import authentication options for NextAuth configuration

import Razorpay from "razorpay"; // Import Razorpay SDK to integrate Razorpay payment gateway

// Import models for interacting with database collections
import CourseOrder from "@/models/courseorder"; // Import course order model to track purchases
import UserCourse from "@/models/usercourse"; // Import user course model to associate users with purchased courses
import CurriculumCourse from "@/models/CurriculumCourse"; // Import curriculum course model to retrieve course details

// Initialize Razorpay instance with the secret and key from environment variables
var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Set the Razorpay key ID from the environment variables
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Set the Razorpay key secret from the environment variables
});

// Define the POST request handler for processing Razorpay payment notifications
export async function POST(req) {
  // Connect to the database before performing any operations
  await dbConnect();

  // Parse the incoming request body, which contains the Razorpay payment ID
  const body = await req.json();
  const { razorpay_payment_id } = body; // Extract the payment ID from the body

  // Retrieve the session data to get the current authenticated user
  const session = await getServerSession(authOptions);

  try {
    // Fetch the payment details from Razorpay using the provided payment ID
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    console.log("payment razorpay", payment); // Log the payment details for debugging purposes

    // Convert the payment amount from paise (smallest unit) to rupees (main currency unit)
    const value = payment.amount / 100;

    // Retrieve the course ID from the Razorpay payment metadata (notes)
    const courseId = payment.notes.course_id;

    // Find the course from the database using the course ID
    const course = await CurriculumCourse.findOne({
      _id: courseId, // Search by the course ID
    }).sort({
      createdAt: -1, // Sort by creation date in descending order to get the most recent course
    });

    // Check if the payment status is "captured" (successful)
    if (payment && payment.status === "captured") {
      // Create a new course order record to track the purchase
      const orders = await CourseOrder.create({
        user_id: session?.user?._id, // Use the current user's ID from the session
        course_name: course?.title, // Set the course name from the fetched course data
        transaction_id: courseId, // Use the course ID as the transaction ID (or replace with actual payment transaction ID)
        order_id: uuidv4(), // Generate a unique order ID using UUID
        payment_provider: `${payment?.method || "razorpay"}`, // Set the payment method (default to Razorpay)
        amount: value, // Set the amount paid (in rupees)
        payment_status: "paid", // Mark the payment status as "paid"
      });

      // Create a user course record to associate the user with the purchased course
      const usercourse = await UserCourse.create({
        user_id: session?.user?._id, // Use the current user's ID
        course_id: course?._id, // Set the course ID
      });

      // Log the successful order and user course creation for debugging
      console.log("orders", orders);
      console.log("usercourse", usercourse);
    } else {
      // If the payment is not successful (not captured), return an error response
      return NextResponse.json(
        { failed: "payment failed, try again" }, // Provide a failure message
        { status: 500 } // Return a 500 status code indicating an internal server error
      );
      console.log("payment verification failed", payment); // Log the failed payment verification for debugging
    }

    // If everything went well, return a success response
    return NextResponse.json({ success: "payment success" }, { status: 200 });

    // Uncomment the line below to return the order if needed (optional)
    // return NextResponse.json(order);
  } catch (err) {
    // Catch any errors during the process and log them
    console.log("payment", err);

    // Return a failure response with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}


















































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { v4 as uuidv4 } from "uuid";
// import { authOptions } from "@/utils/authOptions";

// import Razorpay from "razorpay";

// import CourseOrder from "@/models/courseorder";
// import UserCourse from "@/models/usercourse";

// import CurriculumCourse from "@/models/CurriculumCourse";

// var razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(req) {
//   await dbConnect();
//   const body = await req.json();
//   const { razorpay_payment_id } = body;

//   const session = await getServerSession(authOptions);
//   try {
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);
//  console.log("payment  razorpay"  , payment)

//     const value = payment.amount/100;

//     const courseId = payment.notes.course_id;

//     const course = await CurriculumCourse.findOne({
//       _id: courseId,
//     }).sort({
//       createdAt: -1,
//     });

//     if (payment && payment.status === "captured") {
//       const orders = await CourseOrder.create({
//         user_id: session?.user?._id,
//         course_name: course?.title,
//         transaction_id:courseId,
//         order_id: uuidv4(),
//         payment_provider: `${payment?.method || "razorpay" }`,
//         amount: value,

//         payment_status: "paid",
//       });

//       const usercourse = await UserCourse.create({
//         user_id: session?.user?._id,
//         course_id: course?._id,
//       });
//     } else {
//       return NextResponse.json(
//         { failed: "payment  faield try again" },
//         { status: 500 }
//       );
//       console.log("payment verificatiom faield  ", payment);
//     }

//     return NextResponse.json({ success: "payment success" }, { status: 200 });

//     //    return NextResponse.json(order)
//   } catch (err) {
//     console.log("payment", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
