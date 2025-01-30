
// Import necessary modules
import { NextResponse } from "next/server";  // To handle the responses for the API route
import dbConnect from "@/utils/dbConnect";  // Function to connect to the database
import SubCategory from "@/models/subcategory";  // Import the SubCategory model to interact with the subcategory collection
import slugify from "slugify";  // Utility to generate slugs from names

// Define the GET function to handle the retrieval of all subcategories
export async function GET() {
  // Establish a connection to the database
  await dbConnect();

  try {
    // Fetch all subcategories from the database, sorted by creation date
    const subcategory = await SubCategory.find({}).sort({ createdAt: -1 });

    // Return the fetched subcategories as a JSON response
    return NextResponse.json(subcategory);
  } catch (err) {
    // Handle any errors that occur during the query
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// Define the POST function to handle the creation of a new subcategory
export async function POST(req) {
  // Establish a connection to the database
  await dbConnect();

  // Parse the request body to extract the subcategory name
  const body = await req.json();
  const { name } = body;

  try {
    // Create a new subcategory using the name and a slug generated from the name
    const subcategory = await SubCategory.create({ name, slug: slugify(name) });

    // Return the newly created subcategory as a JSON response
    return NextResponse.json(subcategory);
  } catch (err) {
    // Handle any errors that occur during the creation process
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import SubCategory from "@/models/subcategory";
// import slugify from "slugify";

// export async function GET() {
//   await dbConnect();

//   try {
//     const subcategory = await SubCategory.find({}).sort({ createdAt: -1 });

//     //console.log("allcatxxxx", subcategory)

//     return NextResponse.json(subcategory);
//   } catch (err) {
//     //console.log("error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   await dbConnect();

//   //console.log("hello")

//   const body = await req.json();

//   const { name } = body;

//   // console.log("hello",name)

//   try {
//     const subcategory = await SubCategory.create({ name, slug: slugify(name) });

//     //console.log("subcategory",subcategory)
//     return NextResponse.json(subcategory);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
