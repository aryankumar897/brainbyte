
// Importing NextResponse from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect utility to connect to MongoDB
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model to interact with the 'curriculumCourses' collection in MongoDB
import CurriculumCourse from "@/models/CurriculumCourse";

// POST method to add a new section to a curriculum course
export async function POST(req) {
  // Connect to MongoDB before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  // Destructure the search and newSection properties from the request body
  const { search, newSection } = body;

  // Try-catch block for error handling
  try {
    // Find the curriculum course by its ID using the search value
    const curriculum = await CurriculumCourse.findById({ _id: search });

    // If the curriculum course is not found, return a 404 error response
    if (!curriculum) {
      return NextResponse.json({ err: "not found" });
    }

    // Assign the newSection object from the request body to a new variable
    const newSectionx = newSection;

    // Add the new section to the curriculum's sections array
    curriculum.sections.push(newSectionx);

    // Save the updated curriculum course document to the database
    const saved = await curriculum.save();

    // Get the newly added section by accessing the last element in the sections array
    const newlyAddedSection = curriculum.sections[curriculum.sections.length - 1];

    // Return the newly added section as a JSON response
    return NextResponse.json({ newlyAddedSection });
  } catch (err) {
    // If an error occurs during the process, return a 500 status code and the error message in the response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function POST(req) {
//   await dbConnect();

//   const body = await req.json();

//   const { search, newSection } = body;

 

//   try {
//     const curriculum = await CurriculumCourse.findById({ _id: search });

//     if (!curriculum) {
//       return NextResponse.json({ err: "not found" });
//     }

//     const newSectionx = newSection;
//     curriculum.sections.push(newSectionx);

   

//     const saved = await curriculum.save();

    
//     const newlyAddedSection =
//       curriculum.sections[curriculum.sections.length - 1];

    
//     return NextResponse.json({ newlyAddedSection });
//   } catch (err) {
//     // console.log("error saving course section  ", err);
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
