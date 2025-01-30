

// Importing NextResponse for handling HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the CateWithSubCate model to interact with the "CateWithSubCate" collection
import CateWithSubCate from "@/models/catewithsubcate";

// PUT function to update a document in the "CateWithSubCate" collection
export async function PUT(req, context) {
  // Establishing a connection to the database
  await dbConnect();

  // Parsing the incoming request body as JSON
  const body = await req.json();

  // A try-catch block to handle potential errors during the update operation
  try {
    // Finding the document by its ID (from the URL parameter) and updating it with the new data from the request body
    // The "new: true" option ensures that the returned document is the updated one
    const updatingCategory = await CateWithSubCate.findByIdAndUpdate(
      context.params.id,  // The ID of the document to update, extracted from the URL params
      body,  // The new data to update the document with
      { new: true }  // Return the updated document instead of the original one
    );

    // Returning the updated document as a JSON response
    return NextResponse.json(updatingCategory);
  } catch (err) {
    // If an error occurs, catching it and returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE function to delete a document from the "CateWithSubCate" collection
export async function DELETE(req, context) {
  // Establishing a connection to the database
  await dbConnect();

  // A try-catch block to handle potential errors during the delete operation
  try {
    // Finding the document by its ID (from the URL parameter) and deleting it
    const deletingCategory = await CateWithSubCate.findByIdAndDelete(
      context.params.id  // The ID of the document to delete, extracted from the URL params
    );

    // Returning the deleted document (or null if not found) as a JSON response
    return NextResponse.json(deletingCategory);
  } catch (err) {
    // If an error occurs, catching it and returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CateWithSubCate from "@/models/catewithsubcate";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   try {
//     const updatingCategory = await CateWithSubCate.findByIdAndUpdate(
//       context.params.id,
//       body,
//       { new: true }
//     );
//     //console.log("updating categoryx" , updatingCategory)

//     return NextResponse.json(updatingCategory);
//   } catch (err) {
//     //console.log(err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   try {
//     const deletingCategory = await CateWithSubCate.findByIdAndDelete(
//       context.params.id
//     );

//     return NextResponse.json(deletingCategory);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
