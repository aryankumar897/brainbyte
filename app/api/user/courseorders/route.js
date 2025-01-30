
// Importing necessary modules
import { NextResponse } from "next/server"; // Next.js API handler to send responses
import dbConnect from "@/utils/dbConnect"; // Utility function to establish database connection
import { getServerSession } from "next-auth/next"; // Function to retrieve the server session (user authentication data)
import { authOptions } from "@/utils/authOptions"; // Authentication configuration options
import CourseOrder from "@/models/courseorder"; // Import the CourseOrder model to interact with the 'courseorder' collection

// Main function to handle GET requests
export async function GET() {
  // Establish a database connection before performing any queries
  await dbConnect();

  // Get the current user session to access user-specific information like user ID
  const session = await getServerSession(authOptions);

  try {
    // Fetch all course orders for the currently logged-in user
    // The query filters orders where the user_id matches the logged-in user's ID, and sorts them by creation date in descending order
    const order = await CourseOrder.find({ user_id: session?.user?._id }).sort({
      createdAt: -1, // Sort orders by creation date, most recent first
    });

    // Return the orders as a JSON response
    return NextResponse.json(order);
  } catch (err) {
    // Catch any errors that occur during the database query or processing
    // Return a JSON response with a 500 status code and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";
// import CourseOrder from "@/models/courseorder";

// export async function GET() {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
//   try {
//     const order = await CourseOrder.find({ user_id: session?.user?._id }).sort({
//       createdAt: -1,
//     });

//     return NextResponse.json(order);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
