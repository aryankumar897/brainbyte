
// Importing necessary modules from Next.js and utilities
import { NextResponse } from "next/server";  // Next.js response handler
import dbConnect from "@/utils/dbConnect";  // Custom MongoDB connection utility
import Curriculum from "@/models/Curriculum";  // Curriculum model to interact with the database

// PUT function to update lecture content within a section
export async function PUT(req, context) {
  // Establish a connection to the MongoDB database
  await dbConnect();

  // Parsing the request body to extract updated lecture data, section ID, and curriculum ID
  const body = await req.json();

  try {
    const { lacturebody, sectionId, search } = body;

    // Find the curriculum by its ID
    const curriculum = await Curriculum.findById(search);

    // If the curriculum is not found, return an error message
    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the section within the curriculum by its ID
    const section = curriculum.sections.id(sectionId);

    // If the section is not found, return an error message
    if (!section) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the lecture within the section by its ID
    const lectureIndex = section.lectures.findIndex(
      (lecture) => lecture._id.toString() === context.params.id.toString()
    );

    // If the lecture is not found, return a 404 error with a message
    if (lectureIndex === -1) {
      return NextResponse.json({ message: "Lecture not found" });
    }

    // Update the lecture with the new content from the request body
    section.lectures[lectureIndex] = lacturebody;  // Replace the lecture data with the updated body

    // Save the updated curriculum document to the database
    await curriculum.save();

    // Return the updated curriculum as a JSON response
    return NextResponse.json(curriculum);
  } catch (err) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Curriculum from "@/models/Curriculum";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   //console.log("body", body);
//   //console.log("req", context.params.id);

//   try {
//     const { lacturebody, sectionId, search } = body;

//     const curriculum = await Curriculum.findById(search);

//     if (!curriculum) {
//       return NextResponse.json({ message: "Section not found" });
//     }

//     const section = curriculum.sections.id(sectionId);

//     if (section === -1) {
//       return NextResponse.json({ message: "Section not found" });
//     }

//     const lectureIndex = section.lectures.findIndex(
//       (lecture) => lecture._id.toString() === context.params.id.toString()
//     );

//     if (lectureIndex === -1) {
//       return res.status(404).json({ message: "Lecture not found" });
//     }

//     section.lectures[lectureIndex] = lacturebody; // Replace lecture with new data
//     await curriculum.save();

//     //console.log("updated lacture content", curriculum);

//     return NextResponse.json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     // console.log("errx ", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
