

// Import necessary modules
import { NextResponse } from "next/server";  // Importing Next.js response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a database connection
import Curriculum from "@/models/Curriculum";  // Curriculum model to interact with the 'Curriculum' collection in the database

// Define the GET function to retrieve a specific curriculum or lecture by slug
export async function GET(req, context) {
  await dbConnect();  // Establish a database connection before querying

  // Validate slug parameter - ensuring it's present and is a string
  const slug = context?.params?.slug;  // Extract the 'slug' parameter from the URL context

  // Check if the slug is missing or invalid (not a string)
  if (!slug || typeof slug !== "string") {
    // Return a 400 Bad Request response with an error message if slug is invalid or missing
    return NextResponse.json(
      { error: "Invalid or missing 'slug' parameter" },
      { status: 400 }
    );
  }

  try {
    // Attempt to find a curriculum with a section containing a lecture that has the specified slug
    let curriculum = await Curriculum.findOne({
      "sections.lectures.slug": slug,  // Search for a lecture within sections that matches the slug
    });

    // If no curriculum is found with that slug in the sections
    if (!curriculum) {
      // If no curriculum is found, attempt to find a curriculum by the general slug (not specific to sections)
      const curriculum = await Curriculum.findOne({ slug });

      // If still no curriculum found, return a 404 Not Found error
      if (!curriculum) {
        return NextResponse.json(
          { error: "Curriculum not found" },
          { status: 404 }
        );
      }

      // If a curriculum is found but no specific lecture matches the slug, extract the first section
      const firstSection = curriculum.sections[0];  // Get the first section from the curriculum
      if (!firstSection) {
        // If no sections are found in the curriculum, return a 404 error
        return NextResponse.json(
          { message: "No sections found in the curriculum." },
          { status: 404 }
        );
      }

      // Extract the first lecture from the first section
      const firstLecture = firstSection.lectures[0];  // Get the first lecture from the section
      if (!firstLecture) {
        // If no lectures are found in the first section, return a 404 error
        return NextResponse.json(
          { message: "No lectures found in the first section." },
          { status: 404 }
        );
      }

      // Return the first lecture from the first section if no specific lecture is found
      return NextResponse.json(firstLecture);
    }

    // If a curriculum is found with the matching slug in the sections, search for the exact lecture
    let matchingLecture = null;

    // Loop through each section of the found curriculum
    for (const section of curriculum.sections) {
      // Find a lecture within each section that matches the slug
      const lecture = section.lectures.find((lecture) => lecture.slug === slug);
      if (lecture) {
        // If a matching lecture is found, store the lecture and break the loop
        matchingLecture = {
          ...lecture._doc,  // Extract the raw lecture object from the MongoDB document
        };
        break;  // Stop the loop once the lecture is found
      }
    }

    // If no matching lecture is found within any section, return a 404 error
    if (!matchingLecture) {
      return NextResponse.json(
        { message: "Lecture not found in sections." },
        { status: 404 }
      );
    }

    // Return the found lecture if a match was found
    return NextResponse.json(matchingLecture);
  } catch (err) {
    // If any errors occur during the database query or any other unexpected error, return a 500 error
    return NextResponse.json(
      { error: "Failed to fetch curriculum", details: err.message },
      { status: 500 }
    );
  }
}




















































// // import { NextResponse } from "next/server";

// // import dbConnect from "@/utils/dbConnect";
// // import Curriculum from "@/models/Curriculum";

// // export async function GET(req, context) {
// //   await dbConnect();

// //   const slugdata = context?.params?.slug;

// //    const slug = slugdata?.toLowerCase();
// //    console.log("slugggg",  slug)

// //   if (!slug) {
// //     return NextResponse.json({ message: "Lecture slug is required." }, { status: 400 });
// //   }

// //   try {

// //     // Query to find the curriculum containing the lecture with the given slug
// //     const curriculum = await Curriculum.findOne({
// //       "sections.lectures.slug": slug,
// //     });

// //     if (!curriculum) {
// //       return NextResponse.json({ message: "Lecture not found." }, { status: 404 });
// //     }

// //     // Extract only the lecture matching the slug
// //     let matchingLecture = null;

// //     for (const section of curriculum.sections) {
// //       const lecture = section.lectures.find((lecture) => lecture.slug === slug);
// //       if (lecture) {
// //         matchingLecture = {

// //           ...lecture._doc, // Extract the pure lecture object
// //         };
// //         break; // Stop searching after finding the lecture
// //       }
// //     }

// //     if (!matchingLecture) {
// //       return NextResponse.json({ message: "Lecture not found in sections." }, { status: 404 });
// //     }

// //      console.log("match=====================", matchingLecture)
// //     return NextResponse.json(matchingLecture);
// //   } catch (err) {
// //     console.error("Error fetching lecture:", err);
// //     return NextResponse.json({ error: err.message }, { status: 500 });
// //   }
// // }

// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";

// export async function GET(req, context) {
//   await dbConnect();

//   const slugdata = context?.params?.slug;
//   const slug = slugdata?.toLowerCase();
//   //console.log("slugggg========", slug);

//   if (!slug) {
//     return NextResponse.json({ message: "Lecture slug is required." }, { status: 400 });
//   }

//   try {
//     // Query to find the curriculum containing the lecture with the given slug
//     let curriculum = await Curriculum.findOne({
//       "sections.lectures.slug": slug,
//     });

//     if (!curriculum) {
//       // If no specific lecture is found, try fetching by curriculum slug
//       curriculum = await Curriculum.findOne({
//         "slug": slug,
//       });

//       if (!curriculum) {
//         return NextResponse.json({ message: "Curriculum or lecture not found." }, { status: 404 });
//       }

//       // Extract the first section and first lecture if curriculum is found but no specific lecture
//       const firstSection = curriculum.sections[0]; // Get the first section
//       if (!firstSection) {
//         return NextResponse.json({ message: "No sections found in the curriculum." }, { status: 404 });
//       }

//       const firstLecture = firstSection.lectures[0]; // Get the first lecture
//       if (!firstLecture) {
//         return NextResponse.json({ message: "No lectures found in the first section." }, { status: 404 });
//       }

//       // Return the first lecture from the first section
//       console.log("First Lecture: ", firstLecture);
//       return NextResponse.json(firstLecture);
//     }

//     // Extract only the lecture matching the slug if curriculum is found
//     let matchingLecture = null;

//     for (const section of curriculum.sections) {
//       const lecture = section.lectures.find((lecture) => lecture.slug === slug);
//       if (lecture) {
//         matchingLecture = {
//           ...lecture._doc, // Extract the pure lecture object
//         };
//         break; // Stop searching after finding the lecture
//       }
//     }

//     if (!matchingLecture) {
//       return NextResponse.json({ message: "Lecture not found in sections." }, { status: 404 });
//     }

//     console.log("Matching Lecture********: ", matchingLecture);
//     return NextResponse.json(matchingLecture);
//   } catch (err) {
//    console.error("Error fetching lecture:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


















//real comment


// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";


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
  
  
  
//     let curriculum = await Curriculum.findOne({
//       "sections.lectures.slug": slug,
//     });

//     if (!curriculum) {
//                // const slug=slug.toLowerCase() 

//       const curriculum = await Curriculum.findOne({ slug });

//       if (!curriculum) {
//         return NextResponse.json(
//           { error: "Curriculum not found" },
//           { status: 404 }
//         );
//       }

//       // Extract the first section and first lecture if curriculum is found but no specific lecture
//       const firstSection = curriculum.sections[0]; // Get the first section
//       if (!firstSection) {
//         return NextResponse.json(
//           { message: "No sections found in the curriculum." },
//           { status: 404 }
//         );
//       }

//       const firstLecture = firstSection.lectures[0]; // Get the first lecture
//       if (!firstLecture) {
//         return NextResponse.json(
//           { message: "No lectures found in the first section." },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(firstLecture);
//     }

//     // Extract only the lecture matching the slug if curriculum is found
//     let matchingLecture = null;

//     for (const section of curriculum.sections) {
//       const lecture = section.lectures.find((lecture) => lecture.slug === slug);
//       if (lecture) {
//         matchingLecture = {
//           ...lecture._doc, // Extract the pure lecture object
//         };
//         break; // Stop searching after finding the lecture
//       }
//     }

//     if (!matchingLecture) {
//       return NextResponse.json(
//         { message: "Lecture not found in sections." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(matchingLecture);
//   } catch (err) {
//     // Handle database errors or unexpected exceptions
//     return NextResponse.json(
//       { error: "Failed to fetch curriculum", details: err.message },
//       { status: 500 }
//     );
//   }
// }
