
// Importing NextResponse from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect utility to connect to MongoDB
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model to interact with the 'curriculumCourses' collection in MongoDB
import CurriculumCourse from "@/models/CurriculumCourse";

// PUT method to update an existing curriculum course by its ID
export async function PUT(req, context) {
  // Connect to MongoDB before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  // Try-catch block for error handling
  try {
    // Create an empty object to hold the update fields
    const updateFields = {};

    // Check if specific fields exist in the request body and add them to the updateFields object
    if (body.title) updateFields.title = body.title;
    if (body.about) updateFields.about = body.about;
    if (body.description) updateFields.description = body.description;
    if (body.imageUrl) updateFields.imageUrl = body.imageUrl;
    if (body.level) updateFields.level = body.level;
    if (body.videoUrl) updateFields.videoUrl = body.videoUrl;
    if (body.price) updateFields.price = body.price; // Add price if present in the request body

    // Use findByIdAndUpdate to update the course document with the specified ID
    const curriculumCourse = await CurriculumCourse.findByIdAndUpdate(
      context?.params?.id, // The ID of the curriculum course to update (from the URL params)
      { $set: updateFields }, // Use $set to update only the specified fields
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure schema validation is run before updating
      }
    );

    // Return the updated curriculum course as a JSON response
    return NextResponse.json(curriculumCourse);
  } catch (err) {
    // If an error occurs, return a 500 status code and the error message in the response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE method to delete a curriculum course by its ID
export async function DELETE(req, context) {
  // Connect to MongoDB before performing any operation
  await dbConnect();

  // Try-catch block for error handling
  try {
    // Use findByIdAndDelete to delete the curriculum course document by its ID
    const curriculumCourse = await CurriculumCourse.findByIdAndDelete(
      context.params.id // The ID of the curriculum course to delete (from the URL params)
    );

    // Return the deleted curriculum course document as a JSON response
    return NextResponse.json(curriculumCourse);
  } catch (err) {
    // If an error occurs, return a 500 status code and the error message in the response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   //console.log("put", body)

//   try {
//     // Create an update object with only the allowed fields
//     const updateFields = {};
//     if (body.title) updateFields.title = body.title;
//     if (body.about) updateFields.about = body.about;
//     if (body.description) updateFields.description = body.description;
//     if (body.imageUrl) updateFields.imageUrl = body.imageUrl;
//     if (body.level) updateFields.level = body.level;
//     if (body.videoUrl) updateFields.videoUrl = body.videoUrl;
//     if(body.price) updateFields.price=body.price


//     const curriculumCourse = await CurriculumCourse.findByIdAndUpdate(
//       context?.params?.id,

//       { $set: updateFields }, // Use $set to update only specified fields
//       {
//         new: true, // Return the updated document
//         runValidators: true, // Ensure schema validation
//       }
//     );

//     // console.log("putx", curriculumCourse)

//     return NextResponse.json(curriculumCourse);
//   } catch (err) {
//     //console.log("errorx", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   try {
//     const curriculumCourse = await CurriculumCourse.findByIdAndDelete(
//       context.params.id
//     );

//     return NextResponse.json(curriculumCourse);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
