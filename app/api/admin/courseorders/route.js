
// Importing the NextResponse object from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing the dbConnect utility to establish a connection to the database
import dbConnect from "@/utils/dbConnect";

// Importing the CourseOrder model, which represents the course order data
import CourseOrder from "@/models/courseorder";

// Defining the GET function to handle GET requests and retrieve course orders
export async function GET() {
  // Establishing a connection to the database using dbConnect
  await dbConnect();

  // A try-catch block to handle potential errors during the process
  try {
    // Fetching all course orders, sorted by the createdAt field in descending order (latest first)
    const order = await CourseOrder.find({}).sort({ createdAt: -1 });

    // Returning the fetched orders as a JSON response
    return NextResponse.json(order);
  } catch (err) {
    // If an error occurs, it catches and returns a 500 status with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CourseOrder from "@/models/courseorder";

// export async function GET() {
//   await dbConnect();

//   try {
//     const order = await CourseOrder.find({}).sort({ createdAt: -1 });

//     return NextResponse.json(order);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
