
// Importing NextResponse from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect utility to establish a connection with MongoDB
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model to interact with the 'curriculumCourses' collection in MongoDB
import CurriculumCourse from "@/models/CurriculumCourse";

// PUT method to update a section in the curriculum course
export async function PUT(req, context) {
  // Connect to MongoDB before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  // Destructure updatedSection (the section data to be updated) and search (the curriculum ID) from the request body
  const { updatedSection, search } = body;

  try {
    // Find the curriculum course by its ID (search)
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum is not found, return an error message
    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the index of the section that matches the ID in the request context
    const sectionIndex = curriculum.sections.findIndex(
      (section) => section._id.toString() === context?.params?.id.toString()
    );

    // If the section is not found in the curriculum, return an error message
    if (sectionIndex === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Replace the section with the new data (updatedSection) at the found index
    curriculum.sections[sectionIndex] = updatedSection;

    // Save the updated curriculum back to the database
    await curriculum.save();

    // Return the updated curriculum as a JSON response
    return NextResponse.json(curriculum);

  } catch (err) {
    // If an error occurs, return a 500 status code with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE method to remove a section from the curriculum course
export async function DELETE(req, context) {
  // Connect to MongoDB before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  // Destructure search (the curriculum ID) from the request body
  const { search } = body;

  try {
    // Find the curriculum course by its ID (search)
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum is not found, return an error message
    if (!curriculum) {
      return NextResponse.json({ err: "not found" });
    }

    // Filter the sections to remove the section that matches the ID in the request context
    curriculum.sections = curriculum.sections.filter(
      (section) => section._id.toString() !== context?.params?.id.toString()
    );

    // Save the updated curriculum after removing the section
    await curriculum.save();

    // Return the updated curriculum as a JSON response
    return NextResponse.json(curriculum);

  } catch (err) {
    // If an error occurs, return a 500 status code with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}







































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   const { updatedSection, search } = body;

//   //console.log("update section", body)

//   try {
//     const curriculum = await CurriculumCourse.findById(search);

//     if (!curriculum) {
//       return NextResponse.json({ message: "Section not found" });
//     }

//     const sectionIndex = curriculum.sections.findIndex(
//       (section) => section._id.toString() === context?.params?.id.toString()
//     );

//     //console.log( "section index",   sectionIndex )

//     if (sectionIndex === -1) {
//       return NextResponse.json({ message: "Section not found" });
//     }

//     curriculum.sections[sectionIndex] = updatedSection; // Replace section with new data

//     await curriculum.save();

//     //console.log("upadated  curriculum", curriculum)
//     return NextResponse.json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     //  console.log("updated error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   const { search } = body;

//   console.log("update section", body);
//   console.log("update sectiondelid", context.params.id);

//   try {
//     const curriculum = await CurriculumCourse.findById(body);

//     console.log("curriculum", curriculum);
//     if (!curriculum) {
//       return NextResponse.json({ err: "not found" });
//     }

//     curriculum.sections = curriculum.sections.filter(
//       (section) => section._id.toString() !== context?.params?.id.toString()
//     );
//     await curriculum.save();

//     console.log("curriculum delete", curriculum);

//     return NextResponse.json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
