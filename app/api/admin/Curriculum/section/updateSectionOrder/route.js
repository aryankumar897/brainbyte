

// Importing the NextResponse module from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a custom utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Curriculum model schema to interact with the 'Curriculum' collection in MongoDB
import Curriculum from "@/models/Curriculum";

// Async function to handle the POST request for updating sections in a curriculum
export async function POST(req, context) {
  // Connect to the MongoDB database
  await dbConnect();

  // Parsing the incoming JSON body from the request
  const body = await req.json();

  // Extracting the 'sections' (the updated sections array) and 'search' (the curriculum ID) from the request body
  const { sections, search } = body;

  // Try-catch block for handling the update process
  try {
    // Finding the curriculum by its ID (search)
    const curriculum = await Curriculum.findById(search);

    // If no curriculum is found, return an error message
    if (!curriculum) {
      return NextResponse.json({ message: "curriculum not found" });
    }

    // Updating the sections array in the curriculum document with the new sections data
    await Curriculum.updateOne({ _id: search }, { $set: { sections } });

    // Returning the updated curriculum as a JSON response
    return NextResponse.json(curriculum);

  } catch (err) {
    // If an error occurs during the process, returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Curriculum from "@/models/Curriculum";

// export async function POST(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   const { sections, search } = body;

//   //console.log("update section", body)

//   try {
//     const curriculum = await Curriculum.findById(search);

//     if (!curriculum) {
//       return NextResponse.json({ message: "curriculum  not found" });
//     }

//     // Update sections array in the curriculum document
//     await Curriculum.updateOne({ _id: search }, { $set: { sections } });

//     //console.log({ message: "Section order updated successfully." })

//     return NextResponse.json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     //console.log("updated error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
