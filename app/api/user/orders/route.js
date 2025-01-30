

// Importing necessary modules
import { NextResponse } from "next/server"; // Next.js API handler for sending responses
import dbConnect from "@/utils/dbConnect"; // Import the function for connecting to the database
import { getServerSession } from "next-auth/next"; // Import function to get the server session (user authentication)
import { authOptions } from "@/utils/authOptions"; // Import authentication options configuration
import Order from "@/models/order"; // Import the Order model to interact with the 'order' collection in the database

// Main function to handle GET requests
export async function GET(req, context) {
  // Establish a database connection before querying
  await dbConnect();

  // Get the current user session, which holds user data (like user ID) from authentication
  const session = await getServerSession(authOptions);

  try {
    // Fetch all orders for the current user (based on the user ID stored in the session)
    const order = await Order.find({ userId: session?.user?._id });

    // Return the list of orders as a JSON response
    return NextResponse.json(order);
  } catch (error) {
    // Catch any errors that occur during the database query or processing
    // Log the error (in this case, commented out), and return a JSON response with a 500 status code and the error message
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import { getServerSession } from "next-auth/next";

// import { authOptions } from "@/utils/authOptions";

// import Order from "@/models/order";

// export async function GET(req, context) {
//   await dbConnect();

//   const session = await getServerSession(authOptions);

//   try {
//     const order = await Order.find({ userId: session?.user?._id });

//     return NextResponse.json(order);
//   } catch (error) {
//     // console.log(error)
//     return NextResponse.json({ err: error.message }, { status: 500 });
//   }
// }
