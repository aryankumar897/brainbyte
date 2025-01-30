

// Importing necessary modules from Next.js and utilities
import { NextResponse } from "next/server";  // Next.js response handler
import dbConnect from "@/utils/dbConnect";  // Custom MongoDB connection utility
import Curriculum from "@/models/Curriculum";  // Curriculum model to interact with the database

// POST function to update the sections order within a curriculum
export async function POST(req, context) {
  // Establish a connection to the MongoDB database
  await dbConnect();

  // Parsing the request body to extract the new sections order and the curriculum ID
  const body = await req.json();
  const { sections, search } = body;

  try {
    // Find the curriculum document by its ID
    const curriculum = await Curriculum.findById(search);

    // If curriculum is not found, return an error response with status 404
    if (!curriculum) {
      return NextResponse.json({ message: "Curriculum not found" }, { status: 404 });
    }

    // Update the sections array in the curriculum document with the new order
    await Curriculum.updateOne({ _id: search }, { $set: { sections } });

    // Return the updated curriculum in the response
    return NextResponse.json(curriculum);
  } catch (err) {
    // If an error occurs during the process, return an error response with status 500
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

//     //console.log({ message: "Section order lacture updated successfully." })

//     return NextResponse.json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     //console.log("updated error lacture order", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
