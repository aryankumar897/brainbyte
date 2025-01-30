

// Import necessary modules
import { NextResponse } from "next/server"; // To send JSON responses in Next.js API routes
import dbConnect from "@/utils/dbConnect"; // Utility function to connect to the MongoDB database
import CurriculumCourse from "@/models/CurriculumCourse"; // CurriculumCourse model to interact with curriculum course data in MongoDB

// Main GET function to retrieve the latest 6 curriculum courses
export async function GET() {
  // Connect to the database
  await dbConnect();

  try {
    // Fetch the latest 6 curriculum courses, sorted by creation date in descending order
    const curriculums = await CurriculumCourse.find({})
      .sort({ createdAt: -1 }) // Sort by 'createdAt' field, with the most recent first
      .limit(6); // Limit the results to 6 records

    // Return the fetched curriculum courses as a JSON response
    return NextResponse.json(curriculums);
  } catch (err) {
    // Handle any errors that occur during the database query
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function GET() {
//   await dbConnect();

//   try {
//     const curriculums = await CurriculumCourse.find({})
//       .sort({ createdAt: -1 })
//       .limit(6);

//     return NextResponse.json(curriculums);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
