
// Importing NextResponse from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect utility to connect to MongoDB
import dbConnect from "@/utils/dbConnect";

// Importing the CurriculumCourse model to interact with the 'curriculumCourses' collection in MongoDB
import CurriculumCourse from "@/models/CurriculumCourse";

// Importing slugify to generate slugs from titles for URL-friendly strings
import slugify from "slugify";

// GET method to retrieve all curriculum courses sorted by their creation date (newest first)
export async function GET() {
  // Connect to MongoDB before performing any operation
  await dbConnect();

  try {
    // Find all curriculum courses from the database and sort them by createdAt in descending order
    const curriculumCourse = await CurriculumCourse.find({}).sort({
      createdAt: -1,
    });

    // Return the list of curriculum courses as a JSON response
    return NextResponse.json(curriculumCourse);
  } catch (err) {
    // If an error occurs, return a 500 status code and the error message in the response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST method to create a new curriculum course
export async function POST(req) {
  // Connect to MongoDB before performing any operation
  await dbConnect();

  // Parse the incoming request body into JSON
  const body = await req.json();

  // Log the incoming body data to the console for debugging purposes
  console.log("body", body);

  try {
    // Generate a URL-friendly slug from the title of the curriculum course using slugify
    const slug = slugify(body.title);

    // Add the generated slug to the body of the request
    body.slug = slug;

    // Create a new curriculum course document in the database with the provided data
    const curriculumCourse = await CurriculumCourse.create(body);

    // Log the created curriculum course to the console for debugging purposes
    console.log("body", curriculumCourse);

    // Return the newly created curriculum course as a JSON response
    return NextResponse.json(curriculumCourse);
  } catch (err) {
    // If an error occurs, return a 500 status code and the error message in the response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}






















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";
// import slugify from "slugify";

// export async function GET() {
//   await dbConnect();

//   try {
//     const curriculumCourse = await CurriculumCourse.find({}).sort({
//       createdAt: -1,
//     });

//     return NextResponse.json(curriculumCourse);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   await dbConnect();

//   //console.log("hello")

//   const body = await req.json();

//   console.log("body", body);

//   try {
//     // Generate a slug from the title using slugify
//     const slug = slugify(body.title);

//     // Add the slug to the body
//     body.slug = slug;

//     const curriculumCourse = await CurriculumCourse.create(body);

//     console.log("body", curriculumCourse);
//     return NextResponse.json(curriculumCourse);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
