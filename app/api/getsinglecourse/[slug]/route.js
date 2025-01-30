

// Import necessary modules
import { NextResponse } from "next/server";  // Importing Next.js response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a database connection
import CurriculumCourse from "@/models/CurriculumCourse";  // CurriculumCourse model to interact with the 'CurriculumCourse' collection in the database

// Define the GET function to retrieve a specific curriculum course based on a slug
export async function GET(req, context) {
  await dbConnect();  // Establish a database connection before querying the database

  try {
    // Find a single document in the 'CurriculumCourse' collection based on the 'slug' from the URL
    const curriculums = await CurriculumCourse.findOne({
      slug: context?.params?.slug,  // Access the 'slug' parameter from the URL context
    });

    // Return the found curriculum course as a JSON response
    return NextResponse.json(curriculums);
  } catch (err) {
    // If any error occurs during the query process, catch it and return an error response
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
//       slug: context?.params?.slug,
//     });

//     //  console.log("single request",curriculums)
//     return NextResponse.json(curriculums);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
