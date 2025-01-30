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

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";


export async function GET(req, context) {
  await dbConnect();

  // Validate slug parameter
  const slug = context?.params?.slug;
  


  if (!slug || typeof slug !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing 'slug' parameter" },
      { status: 400 }
    );
  }

  try {
  
  
  
    let curriculum = await Curriculum.findOne({
      "sections.lectures.slug": slug,
    });

    if (!curriculum) {
               // const slug=slug.toLowerCase() 

      const curriculum = await Curriculum.findOne({ slug });

      if (!curriculum) {
        return NextResponse.json(
          { error: "Curriculum not found" },
          { status: 404 }
        );
      }

      // Extract the first section and first lecture if curriculum is found but no specific lecture
      const firstSection = curriculum.sections[0]; // Get the first section
      if (!firstSection) {
        return NextResponse.json(
          { message: "No sections found in the curriculum." },
          { status: 404 }
        );
      }

      const firstLecture = firstSection.lectures[0]; // Get the first lecture
      if (!firstLecture) {
        return NextResponse.json(
          { message: "No lectures found in the first section." },
          { status: 404 }
        );
      }

      return NextResponse.json(firstLecture);
    }

    // Extract only the lecture matching the slug if curriculum is found
    let matchingLecture = null;

    for (const section of curriculum.sections) {
      const lecture = section.lectures.find((lecture) => lecture.slug === slug);
      if (lecture) {
        matchingLecture = {
          ...lecture._doc, // Extract the pure lecture object
        };
        break; // Stop searching after finding the lecture
      }
    }

    if (!matchingLecture) {
      return NextResponse.json(
        { message: "Lecture not found in sections." },
        { status: 404 }
      );
    }

    return NextResponse.json(matchingLecture);
  } catch (err) {
    // Handle database errors or unexpected exceptions
    return NextResponse.json(
      { error: "Failed to fetch curriculum", details: err.message },
      { status: 500 }
    );
  }
}
