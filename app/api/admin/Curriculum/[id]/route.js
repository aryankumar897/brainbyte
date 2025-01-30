

// Importing the NextResponse module from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a custom utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Curriculum model schema to interact with the 'Curriculum' collection in MongoDB
import Curriculum from "@/models/Curriculum";

// Async function to handle the PUT request for updating an existing curriculum
export async function PUT(req, context) {
  // Connect to the MongoDB database
  await dbConnect();

  // Parsing the incoming JSON body from the request
  const body = await req.json();

  try {
    // Using the curriculum's ID (from the URL params) to find and update the curriculum
    // 'new: true' ensures that the updated document is returned, rather than the old one
    const curriculum = await Curriculum.findByIdAndUpdate(
      context.params.id,  // The ID of the curriculum to update, taken from the URL parameters
      body,  // The updated curriculum data from the request body
      { new: true }  // Return the updated document, not the original one
    );

    // Returning the updated curriculum as a JSON response
    return NextResponse.json(curriculum);
  } catch (err) {
    // Handling any errors that occur during the update process
    // Returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// Async function to handle the DELETE request for deleting an existing curriculum
export async function DELETE(req, context) {
  // Connect to the MongoDB database
  await dbConnect();

  try {
    // Using the curriculum's ID (from the URL params) to find and delete the curriculum
    const curriculum = await Curriculum.findByIdAndDelete(context.params.id);

    // Returning the deleted curriculum as a JSON response
    return NextResponse.json(curriculum);
  } catch (err) {
    // Handling any errors that occur during the deletion process
    // Returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Curriculum from "@/models/Curriculum";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();
//   try {
//     const curriculum = await Curriculum.findByIdAndUpdate(
//       context.params.id,
//       body,
//       { new: true }
//     );

//     return NextResponse.json(curriculum);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   try {
//     const curriculum = await Curriculum.findByIdAndDelete(context.params.id);

//     return NextResponse.json(curriculum);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
