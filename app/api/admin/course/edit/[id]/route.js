

// Importing the NextResponse object from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing the dbConnect utility to establish a connection to the database
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model, which represents the curriculum course data
import CurriculumCourse from "@/models/CurriculumCourse";

// Defining the GET function to handle GET requests and retrieve a single curriculum course
export async function GET(req, context) {
  // Establishing a connection to the database using dbConnect
  await dbConnect();

  // Uncommented console.log for debugging purposes
  // console.log("course eedit page",context?.params?.id )

  // A try-catch block to handle potential errors during the process
  try {
    // Fetching a single curriculum course document based on the ID from the request context
    const curriculumCourse = await CurriculumCourse.findOne({
      _id: context?.params?.id, // Using the ID from the request context (URL parameter)
    });

    // Returning the fetched curriculum course as a JSON response
    return NextResponse.json(curriculumCourse);
  } catch (err) {
    // If an error occurs, it catches and returns a 500 status with the error message
    // console.log("error", err)
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function GET(req, context) {
//   await dbConnect();

//   //console.log("course eedit page",context?.params?.id )

//   try {
//     const curriculumCourse = await CurriculumCourse.findOne({
//       _id: context?.params?.id,
//     });

//     return NextResponse.json(curriculumCourse);
//   } catch (err) {
//     //console.log("error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
