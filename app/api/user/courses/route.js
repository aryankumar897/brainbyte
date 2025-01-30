
// Importing necessary modules
import { NextResponse } from "next/server"; // Next.js API handler for sending responses
import dbConnect from "@/utils/dbConnect"; // Import the function to connect to the database
import { getServerSession } from "next-auth/next"; // Import function to get the server session (user authentication)
import { authOptions } from "@/utils/authOptions"; // Import authentication options configuration
import UserCourse from "@/models/usercourse"; // Import the UserCourse model to interact with the 'usercourse' collection

// Main function to handle GET requests
export async function GET(req, context) {
  // Establish a database connection before querying
  await dbConnect();

  // Get the current user session, which holds user data (like user ID) from authentication
  const session = await getServerSession(authOptions);

  try {
    // Fetch all the user courses that belong to the currently logged-in user
    // The query looks for courses associated with the user ID (from the session) and populates the course details
    const courses = await UserCourse.find({
      user_id: session?.user?._id,
    }).populate("course_id"); // 'course_id' is populated with the full details of the associated course

    // Log the courses to the console for debugging purposes
    console.log("coursesxxxxxx", courses);

    // Return the list of courses as a JSON response
    return NextResponse.json(courses);
  } catch (error) {
    // Catch any errors that occur during the database query or processing
    // Log the error for debugging purposes and return a JSON response with a 500 status code and the error message
    console.log(error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}






























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import { getServerSession } from "next-auth/next";

// import { authOptions } from "@/utils/authOptions";

// import UserCourse from "@/models/usercourse";

// export async function GET(req, context) {
//   await dbConnect();

//   const session = await getServerSession(authOptions);

//   try {
//     const courses = await UserCourse.find({
//       user_id: session?.user?._id,
//     }).populate("course_id");

//     console.log("coursesxxxxxx", courses);

//     return NextResponse.json(courses);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ err: error.message }, { status: 500 });
//   }
// }
