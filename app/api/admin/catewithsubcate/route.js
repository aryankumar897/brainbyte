

// Importing NextResponse to handle the HTTP responses in Next.js
import { NextResponse } from "next/server";

// Importing dbConnect utility to establish a connection to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing models for interacting with the database collections
import CateWithSubCate from "@/models/catewithsubcate";
import SubCategory from "@/models/subcategory";

// Importing the slugify library to generate URL-friendly slugs
import slugify from 'slugify';

// GET function to retrieve all documents from the "CateWithSubCate" collection
export async function GET() {
  // Establishing a connection to the database
  await dbConnect();

  // A try-catch block to handle potential errors
  try {
    // Fetching all documents from the CateWithSubCate collection, sorted by creation date
    // Populating the "categoryId" and "subcategoryId" fields with their respective references
    const cateWithSubCate = await CateWithSubCate.find({})
      .sort({ createdAt: -1 }) // Sorting by creation date in descending order
      .populate("categoryId") // Populating category details
      .populate("subcategoryId"); // Populating subcategory details

    // Returning the fetched data as a JSON response
    return NextResponse.json(cateWithSubCate);
  } catch (err) {
    // If an error occurs, catching it and returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST function to handle creating a new "CateWithSubCate" document
export async function POST(req) {
  // Establishing a connection to the database
  await dbConnect();

  // Parsing the incoming request body as JSON
  const body = await req.json();

  // Destructuring the required data from the request body
  const { categoryId, subcategoryId, title, subtitle } = body;

  // Fetching the subcategory document based on the subcategoryId
  const subcategory = await SubCategory.findOne({ _id: subcategoryId });

  // Extracting the subcategory's name (if available)
  const subcategorytitle = subcategory?.name;

  // A try-catch block to handle potential errors during the creation process
  try {
    // Creating a new document in the CateWithSubCate collection
    // The slug is generated using the title (or the subcategory's name if the title is not available)
    const cateWithSubCate = await CateWithSubCate.create({
      categoryId,
      subcategoryId,
      title,
      subtitle,
      slug: slugify(title) || slugify(subcategorytitle), // Generating a slug from the title or subcategory name
    });

    // Returning the created document as a JSON response
    return NextResponse.json(cateWithSubCate);
  } catch (err) {
    // If an error occurs, catching it and returning a 500 error with the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CateWithSubCate from "@/models/catewithsubcate";
// import SubCategory from "@/models/subcategory";
// import slugify from 'slugify'

// export async function GET() {
//   await dbConnect();
//   try {
//     const cateWithSubCate = await CateWithSubCate.find({})
//     .sort({ createdAt: -1 })
//       .populate("categoryId")
//       .populate("subcategoryId")

//    // console.log("cateWithSubCate", cateWithSubCate)
//     return NextResponse.json(cateWithSubCate)
//   } catch (err) {
//    // console.log("error", err)
//     return NextResponse.json({ err: err.message }, { status: 500 })

//   }

// }


// export async function POST(req) {
//   await dbConnect();
//   //console.log("hello")
//   const body = await req.json();

//   const {  
//    categoryId,
//     subcategoryId,
//     title,
//     subtitle,
//   } = body


//   const subcategory = await SubCategory.findOne({ _id: subcategoryId })

// //console.log("subcategory", subcategory)
//  const subcategorytitle = subcategory?.name
 



//   try {
 
//     const cateWithSubCate = await CateWithSubCate.create({ 
//       categoryId,
//       subcategoryId,
//       title,
//       subtitle,
//       slug: slugify(title) || slugify(subcategorytitle)
    
//     })
//  //console.log("x",   cateWithSubCate)

//     return NextResponse.json(cateWithSubCate)

//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 })

//   }






// }