
// Importing the NextResponse object from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing the dbConnect utility to establish a connection to the database
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model, which represents the curriculum course data
import CurriculumCourse from "@/models/CurriculumCourse";

// Defining the GET function which handles GET requests to fetch a single curriculum course
export async function GET(req, context) {
  // Establishing a connection to the database using dbConnect
  await dbConnect();

  // A try-catch block to handle potential errors during the process
  try {
    // Fetching a single curriculum course document based on the ID from the request context
    const curriculums = await CurriculumCourse.findOne({
      _id: context?.params?.id,  // Using the ID passed in the request URL parameters
    });

    // Returning the found curriculum course as a JSON response
    return NextResponse.json(curriculums);
  } catch (err) {
    // If an error occurs, it catches and returns a 500 status with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function GET(req, context) {
//   await dbConnect();
//   //console.log("single request course===================-==============================")
//   try {
//     const curriculums = await CurriculumCourse.findOne({
//       _id: context?.params?.id,
//     });

//     //console.log("single request course",curriculums)
//     return NextResponse.json(curriculums);
//   } catch (err) {
//     // console.log("single request course error",err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
