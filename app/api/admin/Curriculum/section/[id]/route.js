
// Importing the NextResponse module from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a custom utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Curriculum model schema to interact with the 'Curriculum' collection in MongoDB
import Curriculum from "@/models/Curriculum";

// Async function to handle the PUT request for updating a specific section within a curriculum
export async function PUT(req, context) {
  // Connect to the MongoDB database
  await dbConnect();

  // Parsing the incoming JSON body from the request
  const body = await req.json();

  // Extracting the 'updatedSection' (the updated data for the section) and 'search' (curriculum ID) from the request body
  const { updatedSection, search } = body;

  try {
    // Finding the curriculum document by its ID (search)
    const curriculum = await Curriculum.findById(search);

    // If no curriculum is found, return an error message
    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Finding the index of the section to update based on its ID in the curriculum's sections array
    const sectionIndex = curriculum.sections.findIndex(
      (section) => section._id.toString() === context?.params?.id.toString()
    );

    // If the section is not found in the curriculum, return an error message
    if (sectionIndex === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Replacing the section at the found index with the updated data
    curriculum.sections[sectionIndex] = updatedSection;

    // Saving the updated curriculum document back to the database
    await curriculum.save();

    // Returning the updated curriculum document as a JSON response
    return NextResponse.json(curriculum);

  } catch (err) {
    // If an error occurs during the process, returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// Async function to handle the DELETE request for removing a specific section from a curriculum
export async function DELETE(req, context) {
  // Connect to the MongoDB database
  await dbConnect();

  // Parsing the incoming JSON body from the request
  const body = await req.json();

  // Extracting the 'search' (curriculum ID) from the request body
  const { search } = body;

  try {
    // Finding the curriculum document by its ID (search)
    const curriculum = await Curriculum.findById(body);

    // If no curriculum is found, return an error message
    if (!curriculum) {
      return NextResponse.json({ err: "not found" });
    }

    // Filtering out the section to be deleted from the curriculum's sections array
    curriculum.sections = curriculum.sections.filter(
      (section) => section._id.toString() !== context?.params?.id.toString()
    );

    // Saving the updated curriculum document back to the database
    await curriculum.save();

    // Returning the updated curriculum document after deletion as a JSON response
    return NextResponse.json(curriculum);

  } catch (err) {
    // If an error occurs during the process, returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}





















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Curriculum from "@/models/Curriculum";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   const { updatedSection, search } = body;

//   //console.log("update section", body)

//   try {
//     const curriculum = await Curriculum.findById(search);

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
//     //console.log("updated error", err)
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
//     const curriculum = await Curriculum.findById(body);

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
