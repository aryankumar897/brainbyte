// Importing NextResponse from next/server to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Category model to interact with the "Category" collection
import Category from "@/models/category";

// PUT method for updating an existing category
export async function PUT(req, context) {
  // Establishing a connection to the database
  await dbConnect();

  // Parsing the incoming request body as JSON
  const body = await req.json();

  try {
    // Destructuring the _id field from the body to separate it from the fields to be updated
    const { _id, ...updateBody } = body; // Excluding _id from the update body, since the _id is used in the query

    // Finding the category by its ID (from context.params.id) and updating it with the new data (updateBody)
    const updatingCategory = await Category.findByIdAndUpdate(
      context.params.id, // The category ID to update, coming from the URL parameters
      updateBody, // The fields to update (without _id)
      { new: true } // Returning the updated document instead of the original one
    );

    // Returning the updated category as a JSON response
    return NextResponse.json(updatingCategory);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE method for deleting a category
export async function DELETE(req, context) {
  // Establishing a connection to the database
  await dbConnect();

  try {
    // Finding the category by its ID (from context.params.id) and deleting it
    const deletingCategory = await Category.findByIdAndDelete(
      context.params.id // The category ID to delete, coming from the URL parameters
    );

    // Returning the deleted category as a JSON response
    return NextResponse.json(deletingCategory);
  } catch (err) {
    // If an error occurs, returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import Category from "@/models/category";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();
//   try {
//     // console.log( "xx",  body);
//     //    console.log("xx", context.params.id);
//     const { _id, ...updateBody } = body;
//     const updatingCategory = await Category.findByIdAndUpdate(
//       context.params.id,
//       updateBody,
//       { new: true }
//     );

//     return NextResponse.json(updatingCategory);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   try {
//     const deletingCategory = await Category.findByIdAndDelete(
//       context.params.id
//     );

//     return NextResponse.json(deletingCategory);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
