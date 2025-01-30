
// Import necessary modules and functions
import { NextResponse } from "next/server"; // Import Next.js response handling
import Stripe from "stripe"; // Import Stripe API library for handling payments
import dbConnect from "@/utils/dbConnect"; // Import utility function for database connection

import CurriculumCourse from "@/models/CurriculumCourse"; // Import curriculum course model to fetch course data

import { getServerSession } from "next-auth/next"; // Import function to get the current session from NextAuth
import { authOptions } from "@/utils/authOptions"; // Import authentication options for NextAuth
import User from "@/models/user"; // Import user model to fetch user data from the database

// Initialize a Stripe instance with the secret key (make sure to replace it with a secure key in production)
const stripeInstance = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
);

// Define the POST request handler
export async function POST(req, context) {
  // Connect to the database
  await dbConnect();

  // Retrieve the current server-side session using NextAuth authentication options
  const session = await getServerSession(authOptions);

  try {
    // Find the user in the database using the user ID from the session
    const user = await User.findOne({ _id: session?.user?._id });

    // If the user is not found, return an error response
    if (!user) {
      return NextResponse.json({ err: "user not found" }, { status: 500 });
    }

    // Fetch the course details based on the course slug passed in the URL parameters
    const course = await CurriculumCourse.findOne({
      slug: context.params.id, // Use the course slug from the context
    }).sort({
      createdAt: -1, // Sort the courses by creation date in descending order
    });

    // Log the fetched course for debugging purposes
    console.log(course);

    // Create a new Stripe checkout session to initiate the payment process
    const sessions = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"], // Define the accepted payment methods (only cards in this case)
      line_items: [
        {
          price_data: {
            currency: "INR", // Set the currency to INR (Indian Rupee)
            product_data: {
              name: course.title, // Set the name of the course as the product name
            },
            unit_amount: parseFloat(course.price) * 100, // Convert the course price to the smallest currency unit (cents)
          },
          quantity: 1, // Only one unit of the course is purchased
        },
      ],
      mode: "payment", // Set the mode to "payment" (one-time payment)

      // URLs to redirect users after successful or canceled payments
      success_url:
        "http://localhost:3000/dashboard/user/stripe/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/dashboard/user/stripe/cancel",

      // Customer email, passed from the user data
      customer_email: user?.email,

      // Metadata to store additional information like course ID
      metadata: {
        course_id: course._id.toString(), // Store the course ID as metadata (to link with the payment)
      },
    });

    // Log the created Stripe session URL for debugging purposes
    console.log(sessions);

    // Return the Stripe session URL to redirect the user to the payment page
    return NextResponse.json({ id: sessions.url });

  } catch (err) {
    // Catch and log any errors during the process
    console.log(err);

    // Return the error message as a JSON response with a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}









































// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";

// import { getServerSession } from "next-auth/next";

// import { authOptions } from "@/utils/authOptions";
// import User from "@/models/user";


// const stripeInstance = new Stripe(
//   "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
// );

// export async function POST(req, context) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
//   try {

//     const user = await User.findOne({ _id: session?.user?._id });

//     if (!user) {
//       return NextResponse.json({ err: "user not found" }, { status: 500 });
//     }


//     const course = await CurriculumCourse.findOne({
//       slug: context.params.id,
//     }).sort({
//       createdAt: -1,
//     });

// console.log(course)



//     const sessions = await stripeInstance.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "INR", // Ensure the currency is INR
//             product_data: {
//               name: course.title, // Make sure 'leble' is the correct field name for the plan label
//             },
//             unit_amount: parseFloat(course.price) * 100, // Convert price to smallest currency unit
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",

//       success_url:
//         "http://localhost:3000/dashboard/user/stripe/success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "http://localhost:3000/dashboard/user/stripe/cancel",
//       customer_email: user?.email,
     
//       metadata: {
//         course_id: course._id.toString(),
//       },
//     });

//     console.log(sessions);

//     return NextResponse.json({ id: sessions.url });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// //https://docs.stripe.com/testing#international-cards
