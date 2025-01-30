

// Import necessary modules
import { NextResponse } from "next/server"; // Next.js API handler to send responses
import dbConnect from "@/utils/dbConnect"; // Utility function to establish database connection
import Subscription from "@/models/subscription"; // Subscription model for interacting with subscription collection
import Order from "@/models/order"; // Order model for interacting with order collection
import UserCourse from "@/models/usercourse"; // UserCourse model for interacting with user-course data
import { getServerSession } from "next-auth/next"; // Function to retrieve the session (authentication data) for the user
import { authOptions } from "@/utils/authOptions"; // Authentication configuration options

// Main GET function to fetch user-specific data
export async function GET() {
  // Connect to the database before running any queries
  await dbConnect();

  // Retrieve the session data for the current user (authentication context)
  const session = await getServerSession(authOptions);

  // If the session or user data is not available (i.e., user is not logged in), return a 401 Unauthorized error
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized: User not logged in." },
      { status: 401 }
    );
  }

  // Extract the user ID from the session to fetch user-specific data
  const userId = session?.user?._id;

  try {
    // Fetch the counts of subscriptions, orders, and courses related to the user
    const userSubscriptionCount = await Subscription.countDocuments({ userId });
    const userOrderCount = await Order.countDocuments({ userId });
    const userCourseCount = await UserCourse.countDocuments({ user_id: userId });

    // For debugging: Log the counts for the user (can be removed in production)
    console.log("ccccc", {
      userSubscriptionCount,
      userOrderCount,
      userCourseCount,
    });

    // Return the counts as a JSON response
    return NextResponse.json({
      userSubscriptionCount,
      userOrderCount,
      userCourseCount,
    });
  } catch (error) {
    // If an error occurs during the queries, catch it and return the error with a 500 status
    console.error("Error fetching user-specific counts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
































// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Subscription from "@/models/subscription";
// import Order from "@/models/order";
// import UserCourse from "@/models/usercourse";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";

// export async function GET() {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return NextResponse.json(
//       { error: "Unauthorized: User not logged in." },
//       { status: 401 }
//     );
//   }

//   const userId = session?.user?._id;

//   try {
//     // User-specific counts
//     const userSubscriptionCount = await Subscription.countDocuments({ userId });
//     const userOrderCount = await Order.countDocuments({ userId });
//     const userCourseCount = await UserCourse.countDocuments({user_id: userId });



//  console.log("ccccc", {
//   userSubscriptionCount,
//   userOrderCount,
//   userCourseCount,
// })

//     return NextResponse.json({
//       userSubscriptionCount,
//       userOrderCount,
//       userCourseCount,
//     });
//   } catch (error) {
//     console.error("Error fetching user-specific counts:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
