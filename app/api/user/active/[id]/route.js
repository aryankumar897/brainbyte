
// Import necessary modules
import { NextResponse } from "next/server"; // For sending JSON responses in Next.js API routes
import dbConnect from "@/utils/dbConnect"; // Utility function to connect to the database
import { getServerSession } from "next-auth/next"; // To get the session of the logged-in user
import { authOptions } from "@/utils/authOptions"; // Authentication configuration
import Subscription from "@/models/subscription"; // Subscription model to interact with subscription collection
import User from "@/models/user"; // User model to interact with user data

// Main POST function to handle subscription validation
export async function POST(req, context) {
  // Connect to the database
  await dbConnect();

  // Get the current user session from the request
  const sessions = await getServerSession(authOptions);

  try {
    // Retrieve the user from the database based on the session ID
    const user = await User.findOne({ _id: sessions?.user?._id });

    // Check if the user trying to access is the same user whose ID is in the request context
    const res = context?.params?.id?.toString() === user?._id?.toString();

    // Log the result of the user ID match check
    console.log("res******", res);

    // If the user IDs do not match, return an "Unauthorized access" error
    if (!res) {
      return NextResponse.json({ err: "unauthorized access" }, { status: 500 });
    }

    // If the user is authenticated, check their subscription status
    const subscription = await Subscription.findById(user?.subscription);

    // Check if the subscription exists and is still active (hasn't expired)
    if (subscription && subscription.endDate > new Date()) {
      // If the subscription is still valid, return a success response (msg: true)
      return NextResponse.json({ msg: true }, { status: 200 });
    } else {
      // If the subscription is expired or does not exist, return an error
      return NextResponse.json(
        { err: "subscription expired or don't have any active subscription" },
        { status: 500 }
      );
    }
  } catch (error) {
    // If any error occurs during the process, log it and return a 500 error response with the error message
    console.log(error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}













































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import { getServerSession } from "next-auth/next";

// import { authOptions } from "@/utils/authOptions";

// import Subscription from "@/models/subscription";

// import User from "@/models/user";

// export async function POST(req, context) {
//   await dbConnect();

//   const sessions = await getServerSession(authOptions);

//   try {
//     const user = await User.findOne({ _id: sessions?.user?._id });

//     const res = context?.params?.id?.toString() === user?._id?.toString();

//     console.log("res******", res);

//     if (!res) {
//       return NextResponse.json({ err: "unauthorized access" }, { status: 500 });
//     }

//     const subscription = await Subscription.findById(user?.subscription);

//     if (subscription && subscription.endDate > new Date()) {
//       return NextResponse.json({ msg: true }, { status: 200 });
//     } else {
//       return NextResponse.json(
//         { err: "subscription expired  or  dont have any active subscription" },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({ err: error.message }, { status: 500 });
//   }
// }
