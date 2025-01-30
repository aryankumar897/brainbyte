import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import CurriculumCourse from "@/models/CurriculumCourse";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();

  //console.log("put", body)

  try {
    // Create an update object with only the allowed fields
    const updateFields = {};
    if (body.title) updateFields.title = body.title;
    if (body.about) updateFields.about = body.about;
    if (body.description) updateFields.description = body.description;
    if (body.imageUrl) updateFields.imageUrl = body.imageUrl;
    if (body.level) updateFields.level = body.level;
    if (body.videoUrl) updateFields.videoUrl = body.videoUrl;
    if(body.price) updateFields.price=body.price


    const curriculumCourse = await CurriculumCourse.findByIdAndUpdate(
      context?.params?.id,

      { $set: updateFields }, // Use $set to update only specified fields
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure schema validation
      }
    );

    // console.log("putx", curriculumCourse)

    return NextResponse.json(curriculumCourse);
  } catch (err) {
    //console.log("errorx", err)
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  try {
    const curriculumCourse = await CurriculumCourse.findByIdAndDelete(
      context.params.id
    );

    return NextResponse.json(curriculumCourse);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
