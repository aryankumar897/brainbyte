
// Importing necessary modules
import { NextResponse } from "next/server"; // Next.js API handler to send responses
import dbConnect from "@/utils/dbConnect"; // Utility function to establish database connection
import User from "@/models/user"; // Import the User model to interact with the 'user' collection
import { getServerSession } from "next-auth/next"; // Function to retrieve the server session (user authentication data)
import { authOptions } from "@/utils/authOptions"; // Authentication configuration options
import Subscription from "@/models/subscription"; // Import the Subscription model to interact with the 'subscription' collection

// Main function to handle GET requests
export async function GET(req, context) {
  // Establish a database connection before performing any queries
  await dbConnect();

  try {
    // Retrieve the user document from the 'user' collection based on the provided ID from the URL
    let user = await User.findOne({ _id: context?.params?.id });

    // If user is not found, the variable `user` will be null. Proceed to fetch subscription details
    const subscription = await Subscription.findOne({ userId: user?._id });

    // If no subscription is found, return an error message with a 404 status
    if (!subscription) {
      return NextResponse.json({ err: "Subscription not found" });
    }

    // If a subscription is found, return the subscription details as a JSON response
    return NextResponse.json(subscription);
  } catch (error) {
    // Catch any errors that occur during the database query or processing
    console.log(error); // Log the error for debugging purposes
    // Return a JSON response with a 500 status code and the error message
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import User from "@/models/user";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";
// import Subscription from "@/models/subscription";

// export async function GET(req, context) {
//   await dbConnect();

//   try {
//     let user = await User.findOne({ _id: context?.params?.id });

//     const subscription = await Subscription.findOne({ userId: user?._id });
//     if (!subscription) {
//       return NextResponse.json({ err: "Subscription not  found" });
//     }

//     return NextResponse.json(subscription);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ err: error.message }, { status: 500 });
//   }
// }
