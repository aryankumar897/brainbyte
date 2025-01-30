

// Importing NextResponse from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect utility to connect to MongoDB
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model to interact with the 'curriculumCourses' collection in MongoDB
import CurriculumCourse from "@/models/CurriculumCourse";

// POST method to update the sections order in the curriculum
export async function POST(req, context) {

  // Connect to MongoDB before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  // Destructure sections and search from the request body
  const { sections, search } = body;

  // Try-catch block for error handling
  try {
    // Find the curriculum course by its ID using the search value
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum course is not found, return an error message
    if (!curriculum) {
      return NextResponse.json({ message: "curriculum not found" });
    }

    // Update the sections array in the curriculum document with the new order (from the request body)
    await CurriculumCourse.updateOne(
      { _id: search }, // Find the curriculum by its ID (from the search value)
      { $set: { sections } } // Set the new sections array
    );

    // Return the updated curriculum course as a JSON response
    return NextResponse.json(curriculum);

  } catch (err) {
    // If an error occurs during the update process, return a 500 status code and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";


// export async function POST(req, context) {

//   await dbConnect()

//   const body = await req.json();

//   const  {
//     sections,
//     search,
//   }=body

//  //console.log("update section", body)


//   try {

   
//     const curriculum = await CurriculumCourse.findById(search);

//     if (!curriculum) {
//       return NextResponse.json({ message: "curriculum  not found" });
//     }


//   // Update sections array in the curriculum document
//   await CurriculumCourse.updateOne(
//     { _id: search },
//     { $set: { sections } }
//   );

//    //console.log({ message: "Section order updated successfully." })

  
//   return  NextResponse.json(curriculum);


//    // return NextResponse.json(curriculum)


//   } catch (err) {
//  //console.log("updated error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 })
//   }



// }

