
// Import necessary modules
import { NextResponse } from "next/server";  // Import Next.js's response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a connection to the database
import Category from "@/models/Category";  // Category model to interact with the 'Category' collection in the database

// Define the GET function to retrieve data from the Category collection
export async function GET() {
  await dbConnect();  // Establish a database connection before querying

  try {
    // Query the Category collection to get all documents, sorted by the 'createdAt' field in descending order (newest first)
    const category = await Category.find({}).sort({ createdAt: -1 });

    // Return the retrieved data as a JSON response
    return NextResponse.json(category);
  } catch (err) {
    // If an error occurs during the query or any other step, return a 500 Internal Server Error response with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import Category from "@/models/Category";

// export async function GET() {
//   await dbConnect();

//   try {
//     const category = await Category.find({}).sort({ createdAt: -1 });

//     return NextResponse.json(category);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
