
// Importing the NextResponse module from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a custom utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the User model schema for accessing the 'user' collection in MongoDB
import User from "@/models/user";

// Importing the slugify package to generate slugs (not used here, but could be used later for user names or data)
import slugify from "slugify";

// Async function to handle the GET request and return user data
export async function GET() {
  // Connect to the MongoDB database
  await dbConnect();

  try {
    // Fetching all users from the 'user' collection, sorting them by 'createdAt' field in descending order
    const user = await User.find({}).sort({ createdAt: -1 });

    // Returning the fetched user data as a JSON response
    return NextResponse.json(user);
  } catch (err) {
    // Handling any errors that occur during the database query
    // Returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}




















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import User from "@/models/user";
// import slugify from "slugify";

// export async function GET() {
//   await dbConnect();

//   try {
//     const user = await User.find({}).sort({ createdAt: -1 });

//     return NextResponse.json(user);
//   } catch (err) {
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
