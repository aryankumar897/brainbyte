
// Importing NextResponse to handle HTTP responses from Next.js
import { NextResponse } from "next/server";

// Importing the dbConnect utility function to establish a connection with MongoDB
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model to interact with the 'curriculumCourses' collection in MongoDB
import CurriculumCourse from "@/models/CurriculumCourse";

// Importing the slugify library to create URL-friendly slugs for lecture titles
import slugify from "slugify";

// POST method to add a new lecture to a specific section of a curriculum
export async function POST(req) {
  // Connect to the MongoDB database before performing any operations
  await dbConnect();

  // Parse the incoming JSON body of the request
  const body = await req.json();

  // Destructure the necessary data from the body: newLecture (new lecture data), search (curriculum ID), and sectionId (ID of the section to add the lecture to)
  const { newLecture, search, sectionId } = body;

  try {
    // Find the curriculum by its ID (search)
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum is not found, return an error response with a 404 status
    if (!curriculum) {
      return NextResponse.json({ err: "Curriculum not found" }, { status: 404 });
    }

    // Find the specific section within the curriculum using the sectionId
    const section = curriculum.sections.id(sectionId);

    // If the section is not found, return an error response with a 404 status
    if (!section) {
      return NextResponse.json({ err: "Section not found" }, { status: 404 });
    }

    // Generate a slug from the lecture title using the slugify function
    const slug = slugify(newLecture?.title);

    // Add the slug to the newLecture data and push it to the section's lectures array
    section.lectures.push({ ...newLecture, slug });

    // Save the updated curriculum document to the database
    await curriculum.save();

    // Retrieve the newly added lecture from the section's lectures array
    const newlyAddedLecture = section.lectures[section.lectures.length - 1];

    // Return the newly added lecture as a JSON response
    return NextResponse.json(newlyAddedLecture);

  } catch (err) {
    // If any error occurs, catch it and return a 500 status code with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";
// import slugify from "slugify"; // Import slugify
// export async function POST(req) {
//   await dbConnect();



//   const body = await req.json();

//   const { newLecture, search, sectionId } = body;

  

//   try {
//     const curriculum = await CurriculumCourse.findById(search);
//     if (!curriculum) {
//       return NextResponse.json(
//         { err: "Curriculum not found" },
//         { status: 404 }
//       );
//     }

//     // const section = curriculum.sections.id(req.params.sectionId);

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

//    // console.log("lacture add", curriculum);

//     // Get the newly added lecture
//     const newlyAddedLecture = section.lectures[section.lectures.length - 1];

//    // console.log("Lecture added newly:", newlyAddedLecture);

//     return NextResponse.json(newlyAddedLecture);

//     // return NextResponse.json(curriculum);
//   } catch (err) {
// //console.log("error", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
