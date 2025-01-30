


// Import necessary modules
import { NextResponse } from "next/server";  // Import Next.js's response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a connection to the database
import CateWithSubCate from "@/models/catewithsubcate";  // CateWithSubCate model to interact with the 'CateWithSubCate' collection in the database

// Define the GET function to retrieve data from the CateWithSubCate collection
export async function GET() {
  await dbConnect();  // Establish a database connection before querying

  try {
    // Query the CateWithSubCate collection to get all documents
    const cateWithSubCate = await CateWithSubCate.find({})
      .sort({ createdAt: -1 })  // Sort the results by 'createdAt' in descending order (newest first)
      .populate("categoryId")  // Populate the 'categoryId' field with data from the referenced category document
      .populate("subcategoryId");  // Populate the 'subcategoryId' field with data from the referenced subcategory document

    // Log the retrieved data for debugging purposes
    console.log("cateWithSubCate===============", cateWithSubCate);
    
    // Return the retrieved data as a JSON response
    return NextResponse.json(cateWithSubCate);
  } catch (err) {
    // If an error occurs during the query or any other step, return a 500 Internal Server Error response with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CateWithSubCate from "@/models/catewithsubcate";

// export async function GET() {
//   await dbConnect();
//   try {
//     const cateWithSubCate = await CateWithSubCate.find({})
//       .sort({ createdAt: -1 })
//       .populate("categoryId")
//       .populate("subcategoryId");

//     console.log("cateWithSubCate===============", cateWithSubCate);
//     return NextResponse.json(cateWithSubCate);
//   } catch (err) {
//     // console.log("error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
