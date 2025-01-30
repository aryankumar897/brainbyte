import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";
import slugify from "slugify"; // Import slugify
export async function POST(req) {
  await dbConnect();

  //console.log("hello")

  const body = await req.json();

  const { newLecture, search, sectionId } = body;

  // console.log({
  //   newLecture,
  //   search,
  //   sectionId,
  // });

  try {
    const curriculum = await Curriculum.findById(search);
    if (!curriculum) {
      return NextResponse.json(
        { err: "Curriculum not found" },
        { status: 404 }
      );
    }

    // const section = curriculum.sections.id(req.params.sectionId);

    const section = curriculum.sections.id(sectionId);
    if (!section) {
      return NextResponse.json({ err: "Section not found" }, { status: 404 });
    }

    // Generate slug using slugify
    const slug = slugify(newLecture?.title);

    // Add the slug to the lecture
    section.lectures.push({ ...newLecture, slug });

    //  section.lectures.push(newLecture);

    await curriculum.save();

    // console.log( "lacture add",  curriculum);

    //return NextResponse.json(curriculum);

    const newlyAddedLecture = section.lectures[section.lectures.length - 1];

    // console.log("Lecture added newly:", newlyAddedLecture);
 
     return NextResponse.json(newlyAddedLecture);



  } catch (err) {
    //console.log("error", err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
