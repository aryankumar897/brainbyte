


// Import necessary modules
import { NextResponse } from "next/server";  // To handle the responses for the API route
import dbConnect from "@/utils/dbConnect";  // Function to connect to the database
import SubCategory from "@/models/subcategory";  // Import the SubCategory model to interact with the subcategory collection

// PUT function to update a subcategory
export async function PUT(req, context) {
  // Establish a connection to the database
  await dbConnect();

  // Parse the request body to extract the updated subcategory data
  const body = await req.json();
  
  try {
    // Spread the body to get all update fields
    const { ...updateBody } = body;

    // Find the subcategory by ID (from context.params.id) and update it with the new data
    const updatingSubCategory = await SubCategory.findByIdAndUpdate(
      context.params.id,  // Get the ID from the request context
      updateBody,  // Update with the new data
      { new: true }  // Return the updated document
    );

    // Return the updated subcategory as a JSON response
    return NextResponse.json(updatingSubCategory);
  } catch (err) {
    // If there's an error during the update, return the error message with a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE function to delete a subcategory
export async function DELETE(req, context) {
  // Establish a connection to the database
  await dbConnect();

  try {
    // Find the subcategory by ID (from context.params.id) and delete it
    const deletingSubCategory = await SubCategory.findByIdAndDelete(
      context.params.id  // Get the ID from the request context
    );

    // Return the deleted subcategory as a JSON response
    return NextResponse.json(deletingSubCategory);
  } catch (err) {
    // If there's an error during the deletion, return the error message with a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}










































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import SubCategory from "@/models/subcategory";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();
//   try {
//     // console.log( "xx",  body);
//     //    console.log("xx", context.params.id);
//     const { ...updateBody } = body;
//     const updatingSubCategory = await SubCategory.findByIdAndUpdate(
//       context.params.id,
//       updateBody,
//       { new: true }
//     );

//     return NextResponse.json(updatingSubCategory);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   try {
//     const deletingSubCategory = await SubCategory.findByIdAndDelete(
//       context.params.id
//     );

//     return NextResponse.json(deletingSubCategory);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
