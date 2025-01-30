

// Import necessary modules and functions
import { NextResponse } from "next/server";  // For sending responses in Next.js API routes
import dbConnect from "@/utils/dbConnect";  // Function to connect to the database
import CurriculumCourse from "@/models/CurriculumCourse";  // CurriculumCourse model for MongoDB
import { getServerSession } from "next-auth/next";  // For fetching the user session data from NextAuth
import { authOptions } from "@/utils/authOptions";  // Authentication options for NextAuth
import UserCourse from "@/models/usercourse";  // UserCourse model for MongoDB (tracks user courses)
import User from "@/models/user";  // User model for MongoDB (user data)

export async function GET(req, context) {
  // Establish connection to the database before performing any queries
  await dbConnect();

  // Validate the 'slug' parameter from the URL (this could represent a specific lecture or curriculum)
  const slug = context?.params?.slug;
  if (!slug || typeof slug !== "string") {
    // If the slug is missing or invalid, return a 400 Bad Request with an error message
    return NextResponse.json(
      { error: "Invalid or missing 'slug' parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch the current session to verify the user's authentication status
    const sessions = await getServerSession(authOptions);

    // Look up the user using the user ID from the session
    const user = await User.findOne({ _id: sessions?.user?._id });

    if (!user) {
      // If the user does not exist, return a 404 with an error message
      return NextResponse.json({ err: "user not logged in." }, { status: 404 });
    }

    // Check if the user has a course record (i.e., they are authorized to access the curriculum)
    const usercourse = await UserCourse.findOne({ user_id: user?._id });

    if (!usercourse) {
      // If the user does not have an associated course, return a 404 with an error message
      return NextResponse.json({ err: "unauthorized access." }, { status: 404 });
    }

    // Search for a curriculum that contains the lecture identified by the 'slug' in its sections
    let curriculum = await CurriculumCourse.findOne({
      "sections.lectures.slug": slug,
    });

    if (!curriculum) {
      // If no curriculum with the given slug is found, try searching using the curriculum's slug directly
      const curriculum = await CurriculumCourse.findOne({ slug });

      if (!curriculum) {
        // If the curriculum is not found at all, return a 404 with an error message
        return NextResponse.json(
          { error: "Curriculum not found" },
          { status: 404 }
        );
      }

      // If the curriculum is found but no specific lecture was identified, extract the first section and lecture
      const firstSection = curriculum.sections[0];  // Get the first section from the curriculum
      if (!firstSection) {
        // If no sections are found in the curriculum, return a 404 with a message
        return NextResponse.json({ message: "No sections found in the curriculum." }, { status: 404 });
      }

      const firstLecture = firstSection.lectures[0];  // Get the first lecture from the first section
      if (!firstLecture) {
        // If no lectures are found in the first section, return a 404 with a message
        return NextResponse.json({ message: "No lectures found in the first section." }, { status: 404 });
      }

      // Return the first lecture as a response if everything is found successfully
      return NextResponse.json(firstLecture);
    }

    // If the curriculum is found, search for the specific lecture matching the 'slug'
    let matchingLecture = null;
    for (const section of curriculum.sections) {
      const lecture = section.lectures.find((lecture) => lecture.slug === slug);
      if (lecture) {
        // If the lecture is found, assign it to matchingLecture and stop searching further
        matchingLecture = {
          ...lecture._doc,  // Extract the pure lecture object from the document
        };
        break;
      }
    }

    if (!matchingLecture) {
      // If no matching lecture is found in the sections, return a 404 with a message
      return NextResponse.json({ message: "Lecture not found in sections." }, { status: 404 });
    }

    // Return the matching lecture if found
    return NextResponse.json(matchingLecture);
  } catch (err) {
    // If an error occurs during the process (e.g., database issues), catch it and return a 500 Internal Server Error
    return NextResponse.json(
      { error: "Failed to fetch curriculum", details: err.message },
      { status: 500 }
    );
  }
}
















































// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";
// import CurriculumCourse from "@/models/CurriculumCourse";
// import { getServerSession } from "next-auth/next";

// import { authOptions } from "@/utils/authOptions";

// import UserCourse 
// from "@/models/usercourse";
// import User from "@/models/user";





// export async function GET(req, context) {
//   await dbConnect();

//   // Validate slug parameter
//   const slug = context?.params?.slug;
//   if (!slug || typeof slug !== "string") {
//     return NextResponse.json(
//       { error: "Invalid or missing 'slug' parameter" },
//       { status: 400 }
//     );
//   }

//   try {
//     const sessions = await getServerSession(authOptions);

//     const user = await User.findOne({ _id: sessions?.user?._id });

//  if(!user){
//   return NextResponse.json({ err: "user not logged in." }, { status: 404 });



//  }

//  const usercourse = await UserCourse.findOne({ user_id: user?._id });

//  if(!usercourse){
//   return NextResponse.json({ err: "unauthorized access." }, { status: 404 });



//  }

//     let curriculum = await CurriculumCourse.findOne({
//       "sections.lectures.slug": slug,
//     });

//     if (!curriculum) {
     
//       const curriculum = await CurriculumCourse.findOne({ slug });

     
//       if (!curriculum) {
//         return NextResponse.json(
//           { error: "Curriculum not found" },
//           { status: 404 }
//         );
//       }

//      // Extract the first section and first lecture if curriculum is found but no specific lecture
//      const firstSection = curriculum.sections[0]; // Get the first section
//      if (!firstSection) {
//        return NextResponse.json({ message: "No sections found in the curriculum." }, { status: 404 });
//      }

//      const firstLecture = firstSection.lectures[0]; // Get the first lecture
//      if (!firstLecture) {
//        return NextResponse.json({ message: "No lectures found in the first section." }, { status: 404 });
//      }

//       return NextResponse.json(firstLecture);
//     }



//   // Extract only the lecture matching the slug if curriculum is found
//   let matchingLecture = null;

//   for (const section of curriculum.sections) {
//     const lecture = section.lectures.find((lecture) => lecture.slug === slug);
//     if (lecture) {
//       matchingLecture = {
//         ...lecture._doc, // Extract the pure lecture object
//       };
//       break; // Stop searching after finding the lecture
//     }
//   }

//   if (!matchingLecture) {
//     return NextResponse.json({ message: "Lecture not found in sections." }, { status: 404 });
//   }

//     return NextResponse.json(matchingLecture);
//   } catch (err) {
//     // Handle database errors or unexpected exceptions
//     return NextResponse.json(
//       { error: "Failed to fetch curriculum", details: err.message },
//       { status: 500 }
//     );
//   }
// }
