

// Import necessary modules
import { NextResponse } from "next/server"; // For sending JSON responses in Next.js API routes
import dbConnect from "@/utils/dbConnect"; // Utility function to connect to the database
import CurriculumCourse from "@/models/CurriculumCourse"; // CurriculumCourse model to interact with the curriculum data

// Main GET function to retrieve curriculum data based on the 'slug' parameter
export async function GET(req, context) {
  // Connect to the database
  await dbConnect();

  // Validate the 'slug' parameter from the request context
  const slug = context?.params?.slug;
  
  // If 'slug' is missing or invalid, return a 400 error with a relevant message
  if (!slug || typeof slug !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing 'slug' parameter" },
      { status: 400 }
    );
  }

  try {
    // Attempt to find a curriculum by searching for a lecture inside sections with the provided slug
    let curriculum = await CurriculumCourse.findOne({
      "sections.lectures.slug": slug,
    });

    // If no curriculum found with the slug inside sections, try to find it by the slug alone
    if (!curriculum) {
      curriculum = await CurriculumCourse.findOne({ slug });

      // If still no curriculum is found, return a 404 error indicating that the curriculum is not found
      if (!curriculum) {
        return NextResponse.json(
          { error: "Curriculum not found" },
          { status: 404 }
        );
      }

      // Log the matching curriculum if found (useful for debugging)
      console.log("Matching Lecture inside   : ", curriculum);

      // Return the curriculum data found by slug
      return NextResponse.json(curriculum);
    }

    // If curriculum is found with the lecture slug, return the curriculum data
    return NextResponse.json(curriculum);
  } catch (err) {
    // Handle any database errors or unexpected exceptions
    return NextResponse.json(
      { error: "Failed to fetch curriculum", details: err.message },
      { status: 500 }
    );
  }
}






























// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";

// export async function GET(req, context) {
//   await dbConnect();

//   // Validate slug parameter
//   const slug = context?.params?.slug;
//   if (!slug || typeof slug !== "string") {
//     return NextResponse.json(
//       { error: "Invalid or missing 'slug' parameter" },
//       { status: 400 }
//     );
//   }

//   try {
//     let curriculum = await CurriculumCourse.findOne({
//       "sections.lectures.slug": slug,
//     });

//     if (!curriculum) {
//       const curriculum = await CurriculumCourse.findOne({ slug });

//       if (!curriculum) {
//         return NextResponse.json(
//           { error: "Curriculum not found" },
//           { status: 404 }
//         );
//       }

//       console.log("Matching Lecture inside   : ", curriculum);

//       return NextResponse.json(curriculum);
//     }

//     // Return the curriculum data
//     return NextResponse.json(curriculum);
//   } catch (err) {
//     // Handle database errors or unexpected exceptions
//     return NextResponse.json(
//       { error: "Failed to fetch curriculum", details: err.message },
//       { status: 500 }
//     );
//   }
// }
