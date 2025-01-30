

// Importing NextResponse from the Next.js server module to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Curriculum model to interact with the 'curriculums' collection in MongoDB
import Curriculum from "@/models/Curriculum";

// Importing slugify to generate slugs (URL-friendly strings) from text (such as titles)
import slugify from "slugify";

// PUT method to update a specific lecture within a section of a curriculum
export async function PUT(req, context) {
  // Connect to the MongoDB database before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  // Destructure the relevant data (updatedSection, sectionId, and search) from the request body
  const { updatedSection, sectionId, search } = body;

  try {
    // Find the curriculum document by its unique ID (search is assumed to be the curriculum ID)
    const curriculum = await Curriculum.findById(search);

    // If no curriculum is found, return an error response
    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Attempt to find the specific section within the curriculum by sectionId
    const section = curriculum?.sections.id(sectionId);

    // If the section doesn't exist, return an error response
    if (section === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the index of the specific lecture that needs to be updated in the section
    const lectureIndex = section?.lectures.findIndex(
      (lecture) => lecture._id.toString() === context?.params?.id.toString()
    );

    // If the lecture is not found in the section, return a "Lecture not found" error
    if (lectureIndex === -1) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Generate a URL-friendly slug from the updatedSection's title using slugify
    const slug = slugify(updatedSection?.title);

    // Add the generated slug to the updatedSection object
    updatedSection.slug = slug;

    // Replace the old lecture with the updated lecture in the section's lectures array
    section.lectures[lectureIndex] = updatedSection;

    // Save the updated curriculum document back to the database
    await curriculum.save();

    // Return the updated curriculum as a JSON response
    return NextResponse.json(curriculum);

  } catch (err) {
    // If an error occurs, return a 500 status code and the error message in the response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE method to delete a specific lecture from a section of a curriculum
export async function DELETE(req, context) {
  // Connect to the MongoDB database before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  try {
    // Destructure the relevant data (sectionId, search) from the request body
    const { sectionId, search } = body;

    // Find the curriculum by its unique ID (search is assumed to be the curriculum ID)
    const curriculum = await Curriculum.findById(search);

    // If no curriculum is found, return an error response
    if (!curriculum) {
      return NextResponse.json({ message: "curriculum not found" });
    }

    // Attempt to find the specific section within the curriculum by sectionId
    const section = curriculum.sections.id(sectionId);

    // If the section doesn't exist, return an error response
    if (!section) {
      return NextResponse.json({ message: "section not found" });
    }

    // Remove the lecture with the matching ID from the section's lectures array
    section.lectures = section.lectures.filter(
      (lecture) => lecture._id.toString() !== context?.params?.id.toString()
    );

    // Save the updated curriculum document back to the database
    await curriculum.save();

    // Return the updated curriculum as a JSON response
    return NextResponse.json(curriculum);
  } catch (err) {
    // If an error occurs, return a 500 status code and the error message in the response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}


























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Curriculum from "@/models/Curriculum";
// import slugify from "slugify"; // Import slugify
// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   const { updatedSection, sectionId, search } = body;

//   try {
//     const curriculum = await Curriculum.findById(search);

//     if (!curriculum) {
//       return NextResponse.json({ message: "Section not found" });
//     }

//     const section = curriculum?.sections.id(sectionId);

//     if (section === -1) {
//       return NextResponse.json({ message: "Section not found" });
//     }

//     const lectureIndex = section?.lectures.findIndex(
//       (lecture) => lecture._id.toString() === context?.params?.id.toString()
//     );

//     if (lectureIndex === -1) {
//       return res.status(404).json({ message: "Lecture not found" });
//     }

//     // Generate a slug from the title in updatedSection
//     const slug = slugify(updatedSection?.title);

//     // Add the slug to updatedSection
//     updatedSection.slug = slug;

//     section.lectures[lectureIndex] = updatedSection; // Replace lecture with new data

//     await curriculum.save();

//     // console.log("updated lacture", curriculum);

//     return NextResponse.json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     // console.log("errx ", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   // console.log("body", context?.params?.id);
//   // console.log("deleting..", body);

//   try {
//     const { sectionId, search } = body;

//     const curriculum = await Curriculum.findById(search);

//     if (!curriculum) {
//       return NextResponse.json({ message: "curriculum not found" });
//     }

//     const section = curriculum.sections.id(sectionId);

//     if (!section) {
//       return NextResponse.json({ message: "section not found" });
//     }

//     section.lectures = section.lectures.filter(
//       (lecture) => lecture._id.toString() !== context?.params?.id.toString()
//     );

//     await curriculum.save();
//     // console.log("curriculum",curriculum)

//     return NextResponse.json(curriculum);
//   } catch (err) {
//     // console.log("err",err)

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
