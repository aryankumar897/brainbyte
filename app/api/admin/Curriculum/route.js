


// Importing the NextResponse module from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a custom utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Curriculum model schema to interact with the 'Curriculum' collection in MongoDB
import Curriculum from "@/models/Curriculum";

// Importing the slugify package to generate slugs from text, making it URL-friendly
import slugify from "slugify";

// Async function to handle the GET request and return curriculum data
export async function GET() {
  // Connect to the MongoDB database
  await dbConnect();

  try {
    // Fetching all curriculums from the 'Curriculum' collection, sorting by 'createdAt' in descending order
    const curriculums = await Curriculum.find({}).sort({ createdAt: -1 });

    // Returning the fetched curriculums as a JSON response
    return NextResponse.json(curriculums);
  } catch (err) {
    // Handling errors that occur during the database query
    // Returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// Async function to handle the POST request and create a new curriculum
export async function POST(req) {
  // Connect to the MongoDB database
  await dbConnect();

  // Parsing the incoming JSON body from the request
  const body = await req.json();

  console.log("body", body);  // Logging the request body for debugging purposes

  try {
    // Generating a URL-friendly slug from the curriculum's title using slugify
    const slug = slugify(body.title, {
      lower: true,  // Converts the slug to lowercase
      strict: true,  // Removes special characters (e.g., spaces or punctuation)
    });
    
    // Adding the generated slug to the request body
    body.slug = slug;

    // Creating a new curriculum document in the MongoDB database using the provided data
    const curriculum = await Curriculum.create(body);

    console.log("body", curriculum);  // Logging the created curriculum for debugging purposes

    // Returning the newly created curriculum as a JSON response
    return NextResponse.json(curriculum);
  } catch (err) {
    // Handling errors that occur during curriculum creation
    // Returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}





























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";
// import slugify from "slugify";

// export async function GET() {
//   await dbConnect();

//   try {
//     const curriculums = await Curriculum.find({}).sort({ createdAt: -1 });

//     return NextResponse.json(curriculums);
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
//     // const slug = slugify(body.title);
//     const slug = slugify(body.title, {
//       lower: true, // Ensures the slug is in lowercase
//       strict: true, // Removes special characters
//     });
//     // Add the slug to the body
//     body.slug = slug;

//     const curriculum = await Curriculum.create(body);

//     console.log("body", curriculum);
//     return NextResponse.json(curriculum);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
