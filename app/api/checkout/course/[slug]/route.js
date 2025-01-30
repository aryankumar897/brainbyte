

// Import necessary modules
import { NextResponse } from "next/server";  // Importing Next.js response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a connection to the database
import CurriculumCourse from "@/models/CurriculumCourse";  // CurriculumCourse model to interact with the 'CurriculumCourse' collection in the database

// Define the GET function to retrieve curriculum courses based on slug
export async function GET(req, context) {
  await dbConnect();  // Establish a database connection before querying the database

  try {
    // Find all curriculum courses that match the slug parameter from the URL context
    const curriculums = await CurriculumCourse.find({
      slug: context?.params?.slug,  // Search for curriculum courses with the specified slug from the URL context
    });

    // Return the found curriculum courses as a JSON response
    return NextResponse.json(curriculums);
  } catch (err) {
    // If an error occurs during the database query or any other error, catch it and return a 500 Internal Server Error response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function GET(req, context) {
//   await dbConnect();

//   try {
//     const curriculums = await CurriculumCourse.find({
//       slug: context?.params?.slug,
//     });

//     //  console.log("single request",curriculums)
//     return NextResponse.json(curriculums);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
