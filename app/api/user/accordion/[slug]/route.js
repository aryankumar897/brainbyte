import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";

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

      console.log("Matching Lecture inside   : ", curriculum);

      return NextResponse.json(curriculum);
    }

    // Return the curriculum data
    return NextResponse.json(curriculum);
  } catch (err) {
    // Handle database errors or unexpected exceptions
    return NextResponse.json(
      { error: "Failed to fetch curriculum", details: err.message },
      { status: 500 }
    );
  }
}
