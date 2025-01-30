

// Importing necessary modules from Next.js and utilities
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";  // Custom MongoDB connection utility
import Curriculum from "@/models/Curriculum";  // Curriculum model to interact with the database
import slugify from "slugify";  // Importing slugify to create slugs from titles

// POST function to add a new lecture to a curriculum section
export async function POST(req) {
  // Establish a connection to the MongoDB database
  await dbConnect();

  // Parsing the request body to extract data (new lecture, search criteria, and section ID)
  const body = await req.json();
  const { newLecture, search, sectionId } = body;

  try {
    // Find the curriculum by ID (search)
    const curriculum = await Curriculum.findById(search);

    // If curriculum is not found, return an error response with status 404
    if (!curriculum) {
      return NextResponse.json({ err: "Curriculum not found" }, { status: 404 });
    }

    // Find the section inside the curriculum where the lecture needs to be added
    const section = curriculum.sections.id(sectionId);

    // If section is not found, return an error response with status 404
    if (!section) {
      return NextResponse.json({ err: "Section not found" }, { status: 404 });
    }

    // Generate a slug for the new lecture using slugify based on the lecture's title
    const slug = slugify(newLecture?.title);

    // Push the new lecture along with the generated slug into the section's lectures array
    section.lectures.push({ ...newLecture, slug });

    // Save the updated curriculum back to the database
    await curriculum.save();

    // Retrieve the newly added lecture
    const newlyAddedLecture = section.lectures[section.lectures.length - 1];

    // Return the newly added lecture in the response
    return NextResponse.json(newlyAddedLecture);
  } catch (err) {
    // If an error occurs during any part of the process, return an error response with status 500
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";
// import slugify from "slugify"; // Import slugify
// export async function POST(req) {
//   await dbConnect();

  

//   const body = await req.json();

//   const { newLecture, search, sectionId } = body;

 

//   try {
//     const curriculum = await Curriculum.findById(search);
//     if (!curriculum) {
//       return NextResponse.json(
//         { err: "Curriculum not found" },
//         { status: 404 }
//       );
//     }

    
//     const section = curriculum.sections.id(sectionId);
//     if (!section) {
//       return NextResponse.json({ err: "Section not found" }, { status: 404 });
//     }

//     // Generate slug using slugify
//     const slug = slugify(newLecture?.title);

//     // Add the slug to the lecture
//     section.lectures.push({ ...newLecture, slug });

//     //  section.lectures.push(newLecture);

//     await curriculum.save();

  //  console.log( "lacture add",  curriculum);

//     //return NextResponse.json(curriculum);

//     const newlyAddedLecture = section.lectures[section.lectures.length - 1];

//     // console.log("Lecture added newly:", newlyAddedLecture);

//     return NextResponse.json(newlyAddedLecture);
//   } catch (err) {
//     //console.log("error", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
