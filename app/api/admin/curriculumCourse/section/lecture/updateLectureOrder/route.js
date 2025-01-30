

// Import the NextResponse object from the "next/server" module for handling API responses in Next.js.
import { NextResponse } from "next/server";

// Import the dbConnect utility function to establish a connection with the MongoDB database.
import dbConnect from "@/utils/dbConnect";

// Import the CurriculumCourse model to interact with the CurriculumCourse collection in MongoDB.
import CurriculumCourse from "@/models/CurriculumCourse";

// The POST function handles adding or updating sections in a curriculum document.
export async function POST(req, context) {
  // Connect to the MongoDB database.
  await dbConnect();

  // Parse the incoming JSON request body.
  const body = await req.json();

  // Destructure the body to extract the sections array and the search ID.
  const { sections, search } = body;

  try {
    // Find the curriculum document by its ID (using the search criteria passed in the body).
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum is not found, return an error message.
    if (!curriculum) {
      return NextResponse.json({ message: "curriculum not found" });
    }

    // Update the sections array in the curriculum document using MongoDB's updateOne method.
    await CurriculumCourse.updateOne(
      { _id: search }, // Find the document by ID
      { $set: { sections } } // Update the sections field with the new sections array
    );

    // Return the updated curriculum document as a JSON response.
    return NextResponse.json(curriculum);
  } catch (err) {
    // If an error occurs, catch the error and return a 500 status code with the error message.
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

  
  
//   return  NextResponse.json(curriculum);


  

//   } catch (err) {
//  //console.log("updated error lacture order", err)
//     return NextResponse.json({ err: err.message }, { status: 500 })
//   }



// }

