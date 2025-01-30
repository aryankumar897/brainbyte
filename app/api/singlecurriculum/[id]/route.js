
// Import necessary modules
import { NextResponse } from "next/server"; // For sending JSON responses in Next.js API routes
import dbConnect from "@/utils/dbConnect"; // For connecting to the MongoDB database
import Curriculum from "@/models/Curriculum"; // The Curriculum model to interact with the Curriculum collection

// Main GET function for fetching a single curriculum by its ID
export async function GET(req, context) {
  // Establish a connection to the database
  await dbConnect();

  try {
    // Fetch a curriculum by its unique ID
    const curriculum = await Curriculum.findOne({ _id: context?.params?.id });

    // Return the curriculum data in the JSON response
    return NextResponse.json(curriculum);
  } catch (err) {
    // In case of an error, return the error message with a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";

// export async function GET(req, context) {
//   await dbConnect();

//   try {
//     const curriculums = await Curriculum.findOne({ _id: context?.params?.id });

//     //  console.log("single request",curriculums)
//     return NextResponse.json(curriculums);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
