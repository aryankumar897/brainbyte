


// Import necessary modules
import { NextResponse } from "next/server";  // Importing Next.js response handler for API routes
import dbConnect from "@/utils/dbConnect";  // Utility function to establish a database connection
import CateWithSubCate from "@/models/catewithsubcate";  // CateWithSubCate model for interacting with the 'CateWithSubCate' collection in the database
import SubCategory from "@/models/subcategory";  // SubCategory model for interacting with the 'SubCategory' collection in the database

// Define the GET function to retrieve category and subcategory data
export async function GET() {
  await dbConnect();  // Establish a database connection before proceeding

  try {
    // Find all documents in the 'CateWithSubCate' collection, sorted by 'createdAt' in descending order
    const cateWithSubCate = await CateWithSubCate.find({})
      .sort({ createdAt: -1 })  // Sorting by creation date (most recent first)
      .populate("categoryId")  // Populating the 'categoryId' field with corresponding category data
      .populate("subcategoryId");  // Populating the 'subcategoryId' field with corresponding subcategory data

    // Return the retrieved 'cateWithSubCate' data as a JSON response
    return NextResponse.json(cateWithSubCate);
  } catch (err) {
    // If any error occurs during the database operation, catch it and return an error response
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CateWithSubCate from "@/models/catewithsubcate";
// import SubCategory from "@/models/subcategory";

// export async function GET() {
//   await dbConnect();
//   try {
//     const cateWithSubCate = await CateWithSubCate.find({})
//       .sort({ createdAt: -1 })
//       .populate("categoryId")
//       .populate("subcategoryId");

//     //console.log("cateWithSubCate4444", cateWithSubCate)
//     return NextResponse.json(cateWithSubCate);
//   } catch (err) {
//     // console.log("error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
