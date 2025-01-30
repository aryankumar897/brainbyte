
// Import necessary modules
import { NextResponse } from "next/server";  // Import Next.js's response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a connection to the database
import Curriculum from "@/models/Curriculum";  // Import the Curriculum model to query the curriculum data

// Define the GET function to handle requests for fetching curriculum/lecture data
export async function GET(req, context) {
  // Establish a connection to the database
  await dbConnect();

  // Get the 'slug' from the URL parameters
  const slugdata = context?.params?.slug;
  const slug = slugdata?.toLowerCase();  // Convert the slug to lowercase for consistency

  // Check if the slug is provided, if not, return a 400 status with an error message
  if (!slug) {
    return NextResponse.json({ message: "Lecture slug is required." }, { status: 400 });
  }

  try {
    // Query the Curriculum collection for a curriculum containing a lecture with the given slug
    let curriculum = await Curriculum.findOne({
      "sections.lectures.slug": slug,  // Look for the slug inside the 'lectures' array in each section
    });

    if (!curriculum) {
      // If no curriculum with the lecture slug is found, try fetching by the curriculum slug
      curriculum = await Curriculum.findOne({
        "slug": slug,  // Look for a curriculum with the matching slug
      });

      if (!curriculum) {
        // If no curriculum or lecture is found, return a 404 status with a message
        return NextResponse.json({ message: "Curriculum or lecture not found." }, { status: 404 });
      }

      // Log the matched curriculum if the slug was found
      console.log("Matching Lecture inside: ", curriculum);

      // Return the curriculum if no specific lecture was found, but a curriculum match was found
      return NextResponse.json(curriculum);
    }

    // If the lecture with the given slug was found, log it and return the curriculum data
    console.log("Matching Lecture outside: ", curriculum);
    return NextResponse.json(curriculum);
  } catch (err) {
    // If any error occurs, return a 500 status with the error message
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Curriculum from "@/models/Curriculum";


// export async function GET(req, context) {

//   await dbConnect()
//    console.log("context?.params?.slug",context?.params?.slug)

//   try {

//     const curriculum = await Curriculum.find({slug:context?.params?.slug});

//  console.log("get method" ,curriculum)

//     return NextResponse.json(curriculum)


//   } catch (err) {
//     console.log("get method err" ,err)

//     return NextResponse.json({ err: err.message }, { status: 500 })
//   }



// }




//real code comment here


// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";

// export async function GET(req, context) {
//   await dbConnect();

//   const slugdata = context?.params?.slug;
//   const slug = slugdata?.toLowerCase();
//   //console.log("slugggg", slug);

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

//       console.log("Matching Lecture inside   : ", curriculum);

//       return NextResponse.json(curriculum);
//     }

   


//    console.log("Matching Lecture out side: ", curriculum);
//     return NextResponse.json(curriculum);
//   } catch (err) {
//     //console.error("Error fetching lecture:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }




