import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";

import UserCourse 
from "@/models/usercourse";
import User from "@/models/user";





export async function GET(req, context) {
  await dbConnect();

  // Validate slug parameter
  const slug = context?.params?.slug;
  if (!slug || typeof slug !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing 'slug' parameter" },
      { status: 400 }
    );
  }

  try {
    const sessions = await getServerSession(authOptions);

    const user = await User.findOne({ _id: sessions?.user?._id });

 if(!user){
  return NextResponse.json({ err: "user not logged in." }, { status: 404 });



 }

 const usercourse = await UserCourse.findOne({ user_id: user?._id });

 if(!usercourse){
  return NextResponse.json({ err: "unauthorized access." }, { status: 404 });



 }

    let curriculum = await CurriculumCourse.findOne({
      "sections.lectures.slug": slug,
    });

    if (!curriculum) {
     
      const curriculum = await CurriculumCourse.findOne({ slug });

     
      if (!curriculum) {
        return NextResponse.json(
          { error: "Curriculum not found" },
          { status: 404 }
        );
      }

     // Extract the first section and first lecture if curriculum is found but no specific lecture
     const firstSection = curriculum.sections[0]; // Get the first section
     if (!firstSection) {
       return NextResponse.json({ message: "No sections found in the curriculum." }, { status: 404 });
     }

     const firstLecture = firstSection.lectures[0]; // Get the first lecture
     if (!firstLecture) {
       return NextResponse.json({ message: "No lectures found in the first section." }, { status: 404 });
     }

      return NextResponse.json(firstLecture);
    }



  // Extract only the lecture matching the slug if curriculum is found
  let matchingLecture = null;

  for (const section of curriculum.sections) {
    const lecture = section.lectures.find((lecture) => lecture.slug === slug);
    if (lecture) {
      matchingLecture = {
        ...lecture._doc, // Extract the pure lecture object
      };
      break; // Stop searching after finding the lecture
    }
  }

  if (!matchingLecture) {
    return NextResponse.json({ message: "Lecture not found in sections." }, { status: 404 });
  }

    return NextResponse.json(matchingLecture);
  } catch (err) {
    // Handle database errors or unexpected exceptions
    return NextResponse.json(
      { error: "Failed to fetch curriculum", details: err.message },
      { status: 500 }
    );
  }
}
