


// Import the NextResponse object from the "next/server" module to handle API responses in Next.js.
import { NextResponse } from "next/server";

// Import the dbConnect utility function to establish a connection with the MongoDB database.
import dbConnect from "@/utils/dbConnect";

// Import the CurriculumCourse model to interact with the CurriculumCourse collection in MongoDB.
import CurriculumCourse from "@/models/CurriculumCourse";

// The PUT function handles updating lecture content in a specific section of a curriculum.
export async function PUT(req, context) {
  // Establish a connection to the MongoDB database.
  await dbConnect();

  // Parse the incoming JSON request body.
  const body = await req.json();

  try {
    // Destructure the body to extract lecture body content (lacturebody), section ID, and search criteria.
    const { lacturebody, sectionId, search } = body;

    // Find the curriculum document by its ID (using the search criteria passed in the body).
    const curriculum = await CurriculumCourse.findById(search);

    // If the curriculum is not found, return a message saying "Section not found."
    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the specific section by ID within the curriculum.
    const section = curriculum.sections.id(sectionId);

    // If the section is not found, return a message saying "Section not found."
    if (section === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    // Find the index of the lecture to update by comparing the lecture ID in the URL params to the section's lectures.
    const lectureIndex = section.lectures.findIndex(
      (lecture) => lecture._id.toString() === context.params.id.toString()
    );

    // If the lecture is not found, return a 404 status with a "Lecture not found" message.
    if (lectureIndex === -1) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Replace the existing lecture with the new lecture data passed in the request (lacturebody).
    section.lectures[lectureIndex] = lacturebody;

    // Save the updated curriculum document to the database.
    await curriculum.save();

    // Return the updated curriculum document as a JSON response.
    return NextResponse.json(curriculum);

    // You could also uncomment the line below to return the updated curriculum instead of the above.
    // return NextResponse.json(curriculum)
  } catch (err) {
    // If an error occurs, catch the error and return it with a 500 status code.
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}





















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function PUT(req, context) {
//   await dbConnect();

//   const body = await req.json();

//   try {
//     const { lacturebody, sectionId, search } = body;

//     const curriculum = await CurriculumCourse.findById(search);

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
//     //console.log("errx ", err);

//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
