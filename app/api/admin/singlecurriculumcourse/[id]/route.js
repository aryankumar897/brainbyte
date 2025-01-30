

// Import necessary modules
import { NextResponse } from "next/server";  // To handle the responses for the API route
import dbConnect from "@/utils/dbConnect";  // Function to connect to the database
import CurriculumCourse from "@/models/CurriculumCourse";  // Import the CurriculumCourse model to interact with the CurriculumCourse collection

// GET function to retrieve a curriculum course by ID
export async function GET(req, context) {
  // Establish a connection to the database
  await dbConnect();

  try {
    // Find a curriculum course by ID (from context.params.id)
    const curriculums = await CurriculumCourse.findOne({
      _id: context?.params?.id,  // Get the ID from the request context
    });

    // Return the found curriculum course as a JSON response
    return NextResponse.json(curriculums);
  } catch (err) {
    // If there's an error, return the error message with a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function GET(req, context) {
//   await dbConnect();

//   try {
//     const curriculums = await CurriculumCourse.findOne({
//       _id: context?.params?.id,
//     });

//     //  console.log("single request",curriculums)
//     return NextResponse.json(curriculums);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
