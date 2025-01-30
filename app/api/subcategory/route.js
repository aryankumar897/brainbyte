
// Import necessary modules
import { NextResponse } from "next/server"; // To send JSON responses in Next.js API routes
import dbConnect from "@/utils/dbConnect"; // Utility function to connect to the MongoDB database
import SubCategory from "@/models/subcategory"; // SubCategory model to interact with subcategory data in MongoDB

// Main GET function to retrieve all subcategories sorted by creation date
export async function GET() {
  // Connect to the database
  await dbConnect();

  try {
    // Retrieve all subcategories from the SubCategory collection, sorted by creation date in descending order
    const subcategory = await SubCategory.find({}).sort({ createdAt: -1 });

    // Return the fetched subcategories as JSON response
    return NextResponse.json(subcategory);
  } catch (err) {
    // Handle any errors that occur during the database query
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import SubCategory from "@/models/subcategory";

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
