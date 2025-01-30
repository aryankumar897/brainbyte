

// Import necessary modules
import { NextResponse } from "next/server"; // Used to return JSON responses in Next.js API routes
import dbConnect from "@/utils/dbConnect"; // Database connection utility
import Curriculum from "@/models/Curriculum"; // Model to interact with the 'Curriculum' collection
import slugify from 'slugify'; // Utility to generate slugs for curriculum/lectures if necessary

// Main GET function to handle fetching curriculums
export async function GET(req, context) {
  await dbConnect(); // Ensure database connection is established

  // Extract the 'slug' from the URL parameters
  const { slug } = context.params;

  try {
    // If no slug is provided, fetch all curriculums sorted by creation date
    if (!slug) {
      const curriculums = await Curriculum.find({}).sort({ createdAt: -1 });
      return NextResponse.json(curriculums);
    }

    // If a slug is provided, search for curriculums and lectures that match the slug or content
    let curriculums = await Curriculum.find({
      $or: [
        { slug: slug },  // Match the curriculum slug
        { "sections.lectures.slug": slug }, // Match the lecture slug within sections
        { "sections.lectures.content": { $regex: slug, $options: 'i' } } // Match content within lectures, case-insensitive
      ]
    }).populate({
      path: "sections.lectures", // Populate the lectures field
      match: {
        $or: [
          { slug: slug }, // Match slug in lecture
          { content: { $regex: slug, $options: 'i' } } // Match content in lecture (case-insensitive)
        ]
      }
    }).sort({ createdAt: -1 }); // Sort the results by creation date in descending order

    // If no matching curriculums or lectures are found, return a 404 message
    if (!curriculums || curriculums.length === 0) {
      return NextResponse.json({ message: "No matching curriculums or lectures found." }, { status: 404 });
    }

    // Return the matched curriculums
    return NextResponse.json(curriculums);

  } catch (err) {
    // If an error occurs, return the error message with a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}






































// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";
// import slugify from 'slugify';

// export async function GET(req,context) {
//   await dbConnect();

//   // Extract the search query parameter (slug) from the request URL
//   const { slug } =  context.params // Using searchParams to get query params

//   try {
//     // If no slug is provided, return all curriculums sorted by creation date
//     if (!slug) {
//       const curriculums = await Curriculum.find({}).sort({ createdAt: -1 });
//       return NextResponse.json(curriculums);
//     }

//     // If a slug is provided, search for curriculums and lectures matching the slug or content
//     let curriculums = await Curriculum.find({
//       $or: [
//         { slug: slug },  // Match slug in curriculum
//         { "sections.lectures.slug": slug }, // Match slug in lecture
//         { "sections.lectures.content": { $regex: slug, $options: 'i' } } // Match content in lecture (case-insensitive)
//       ]
//     }).populate({
//       path: "sections.lectures", 
//       match: { 
//         $or: [
//           { slug: slug }, // Match slug in lecture
//           { content: { $regex: slug, $options: 'i' } } // Match content in lecture (case-insensitive)
//         ]
//       }
//     }).sort({ createdAt: -1 });

//     // If no curriculums or lectures are found, return an appropriate message
//     if (!curriculums || curriculums.length === 0) {
//       return NextResponse.json({ message: "No matching curriculums or lectures found." }, { status: 404 });
//     }

//     return NextResponse.json(curriculums);
    
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
