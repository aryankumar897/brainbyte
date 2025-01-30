
// Import the NextResponse object from the "next/server" module for handling responses in Next.js API routes.
import { NextResponse } from "next/server";

// Import a utility function for connecting to the MongoDB database.
import dbConnect from "@/utils/dbConnect";

// Import the CurriculumCourse model for interacting with the database.
import CurriculumCourse from "@/models/CurriculumCourse";

// Import the slugify function for generating slugs from strings (e.g., making URLs cleaner).
import slugify from "slugify"; 

// The PUT function handles updates to a curriculum's lecture information.
export async function PUT(req, context) {
  // Connect to the database
  await dbConnect();

  // Parse the request body (JSON format).
  const body = await req.json();

  // Destructure the body to extract updated section data, section ID, and search criteria.
  const { updatedSection, sectionId, search } = body;

  try {
    // Find the curriculum by its ID (using the search criteria passed in the body).
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum doesn't exist, return a message saying "Section not found."
    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the specific section by ID from the curriculum.
    const section = curriculum?.sections.id(sectionId);

    // If the section is not found, return a message saying "Section not found."
    if (section === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the index of the lecture to update within the section's lectures.
    const lectureIndex = section?.lectures.findIndex(
      (lecture) => lecture._id.toString() === context?.params?.id.toString()
    );

    // If the lecture is not found, return an error message.
    if (lectureIndex === -1) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Generate a slug from the updated section's title using the slugify function.
    const slug = slugify(updatedSection?.title);

    // Add the generated slug to the updatedSection object.
    updatedSection.slug = slug;

    // Replace the old lecture with the updated lecture information in the section.
    section.lectures[lectureIndex] = updatedSection; 

    // Save the updated curriculum to the database.
    await curriculum.save();

    // Return the updated curriculum data as a JSON response.
    return NextResponse.json(curriculum);
  } catch (err) {
    // If an error occurs, return the error message with a 500 status code.
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// The DELETE function handles the deletion of a lecture from a section.
export async function DELETE(req, context) {
  // Connect to the database.
  await dbConnect();

  // Parse the request body (JSON format).
  const body = await req.json();

  // Log the ID of the lecture being deleted (from the URL params).
  console.log("body", context?.params?.id);

  // Log the request body.
  console.log("deleting..", body);

  try {
    // Destructure the body to extract the section ID and search criteria.
    const { sectionId, search } = body;

    // Find the curriculum by ID (using the search criteria passed in the body).
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum doesn't exist, return a message saying "curriculum not found."
    if (!curriculum) {
      return NextResponse.json({ message: "curriculum not found" });
    }

    // Find the specific section by ID from the curriculum.
    const section = curriculum.sections.id(sectionId);

    // If the section is not found, return a message saying "section not found."
    if (!section) {
      return NextResponse.json({ message: "section not found" });
    }

    // Filter out the lecture to delete from the section's lectures array.
    section.lectures = section.lectures.filter(
      (lecture) => lecture._id.toString() !== context?.params?.id.toString()
    );

    // Save the updated curriculum to the database after deleting the lecture.
    await curriculum.save();

    // Log the updated curriculum data.
    console.log("curriculum", curriculum);

    // Return the updated curriculum data as a JSON response.
    return NextResponse.json(curriculum);
  } catch (err) {
    // If an error occurs, log the error and return the error message with a 500 status code.
    console.log("err", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}



























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";
// import slugify from "slugify"; // Import slugify
// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

 
//   const { updatedSection, sectionId, search } = body;

  

//   try {
    
//     const curriculum = await CurriculumCourse.findById(search);

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

//     //console.log("updated lacture", curriculum);

//     return NextResponse.json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     //console.log("errx ", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   console.log("body", context?.params?.id);
//   console.log("deleting..", body);

//   try {
//     const { sectionId, search } = body;

//     const curriculum = await CurriculumCourse.findById(search);

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
//     console.log("curriculum", curriculum);

//     return NextResponse.json(curriculum);
//   } catch (err) {
//     console.log("err", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
