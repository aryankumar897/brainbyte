
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";
import slugify from 'slugify'


export async function GET() {

  await dbConnect();

  try {

    const curriculumCourse = await CurriculumCourse.find({}).sort({ createdAt: -1 });

    return NextResponse.json(curriculumCourse)


  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}




export async function POST(req) {

  await dbConnect();

  //console.log("hello")

  const body = await req.json();

  console.log("body", body)

  try {

    // Generate a slug from the title using slugify
    const slug = slugify(body.title);

    // Add the slug to the body
    body.slug = slug;

    const curriculumCourse = await CurriculumCourse.create(body);
    
    console.log("body", curriculumCourse)
    return NextResponse.json(curriculumCourse)

  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 })

  }






}