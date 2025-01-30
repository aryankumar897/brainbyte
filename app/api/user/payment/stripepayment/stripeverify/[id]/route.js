
// Import necessary modules and functions
import { NextResponse } from "next/server"; // Import Next.js response handling
import dbConnect from "@/utils/dbConnect"; // Import database connection utility
import { getServerSession } from "next-auth/next"; // Import function to get the current session
import { v4 as uuidv4 } from "uuid"; // Import function to generate unique IDs (UUID)
import { authOptions } from "@/utils/authOptions"; // Import authentication options for NextAuth

import Stripe from "stripe"; // Import Stripe API library for handling payments
import CourseOrder from "@/models/courseorder"; // Import course order model to store order details
import UserCourse from "@/models/usercourse"; // Import user course model to store the user's course data
import CurriculumCourse from "@/models/CurriculumCourse"; // Import curriculum course model to fetch course details

// Initialize Stripe instance with a secret key (do not expose secret keys in production)
const stripeInstance = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
);

// Define an asynchronous function to handle GET requests
export async function GET(req, context) {
  // Connect to the database
  await dbConnect();

  // Retrieve the server-side session using NextAuth authentication options
  const session = await getServerSession(authOptions);

  try {
    // Retrieve the Stripe session details using the session ID passed in the context
    const stripesession = await stripeInstance.checkout.sessions.retrieve(
      context?.params?.id // Retrieve session ID from URL params (provided by Stripe)
    );

    // Log the retrieved Stripe session for debugging purposes
    console.log("stripesession ", stripesession);

    // Calculate the total payment amount from the Stripe session (in cents, convert to dollars)
    const value = stripesession?.amount_total ? stripesession.amount_total / 100 : 0;

    // Extract course_id from metadata in the Stripe session
    const sess = stripesession?.metadata?.course_id;
    const course_id = stripesession?.metadata?.course_id;

    // Fetch the course details from the CurriculumCourse model based on course_id
    const course = await CurriculumCourse.findOne({
      _id: course_id,
    }).sort({
      createdAt: -1, // Sort by creation date in descending order (latest course)
    });

    // Check if the payment was successful (payment_status should be "paid")
    if (stripesession && stripesession?.payment_status === "paid") {

      // Create a new CourseOrder entry to store payment details
      const orders = await CourseOrder.create({
        user_id: session?.user?._id, // Associate the order with the current user
        course_name: course?.title, // Store the course name
        transaction_id: sess, // Store the transaction ID from Stripe
        order_id: uuidv4(), // Generate a unique order ID using UUID
        payment_provider: "Stripe", // Set the payment provider to Stripe
        amount: value, // Store the total amount paid
        payment_status: "paid", // Set payment status as "paid"
      });

      // Create a new UserCourse entry to associate the user with the purchased course
      const usercourse = await UserCourse.create({
        user_id: session?.user?._id, // Associate the course with the current user
        course_id: course_id, // Store the course ID
      });

      // Log the newly created order and user course for debugging purposes
      console.log("orders", orders);
      console.log("usercourse", usercourse);

    } else {
      // If payment is not successful, return an error response
      return NextResponse.json(
        { err: "payment failed, try again" }, // Error message
        { status: 500 } // HTTP status code for server error
      );
    }

    // If payment is successful, return a success response
    return NextResponse.json({ success: "payment success" }, { status: 200 });

  } catch (err) {
    // Catch any errors during the process and log them for debugging
    console.log("payment", err);

    // Return an error response with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}











































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { v4 as uuidv4 } from "uuid";
// import { authOptions } from "@/utils/authOptions";

// import Stripe from "stripe";
// import CourseOrder from "@/models/courseorder";
// import UserCourse from "@/models/usercourse";
// import CurriculumCourse from "@/models/CurriculumCourse";

// const stripeInstance = new Stripe(
//   "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
// );

// export async function GET(req, context) {
//   await dbConnect();
//   //const body = await req.json();
//  // const { sessionid } = body;

//   const session = await getServerSession(authOptions);
//   try {
//     const stripesession = await stripeInstance.checkout.sessions.retrieve(
//       context?.params?.id
//     );

//     console.log("stripesession ", stripesession);


  
    
//     const value = stripesession?.amount_total ? stripesession.amount_total / 100 : 0;

//     const sess = stripesession?.metadata?.course_id;
//     const course_id = stripesession?.metadata?.course_id;

//  const course = await CurriculumCourse.findOne({
//       _id: course_id ,
//     }).sort({
//       createdAt: -1,
//     });




//     if (stripesession && stripesession?.payment_status === "paid") {
     
     
     
//       const orders = await CourseOrder.create({
//         user_id: session?.user?._id,
//         course_name: course?.title,
//         transaction_id: sess,
//         order_id: uuidv4(),
//         payment_provider: "Stripe",
//         amount: value,

//         payment_status: "paid",
//       });

//       const usercourse = await UserCourse.create({
//         user_id: session?.user?._id,
//         course_id: course_id,
//       });


//       console.log("orders", orders);
//       console.log("usercourse", usercourse);


      
//     } else {
//       return NextResponse.json(
//         { err: "payment  faield try again" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: "payment success" }, { status: 200 });

//     //    return NextResponse.json(order)
//   } catch (err) {
//     console.log("payment", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
