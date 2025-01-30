
// Importing the NextResponse object from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing the dbConnect utility to establish a connection to the database
import dbConnect from "@/utils/dbConnect";

// Importing the Order model, which represents the order data
import Order from "@/models/order";

// Defining the GET function which handles GET requests to fetch all orders
export async function GET(req, context) {
  // Establishing a connection to the database using dbConnect
  await dbConnect();

  // A try-catch block to handle potential errors during the process
  try {
    // Fetching all order documents from the Order collection
    const order = await Order.find({});

    // Returning the fetched orders as a JSON response
    return NextResponse.json(order);
  } catch (error) {
    // If an error occurs, it catches and returns a 500 status with the error message
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}


























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Order from "@/models/order";

// export async function GET(req, context) {
//   await dbConnect();

//   try {
//     const order = await Order.find({});

//     return NextResponse.json(order);
//   } catch (error) {
//     // console.log(error)
//     return NextResponse.json({ err: error.message }, { status: 500 });
//   }
// }
