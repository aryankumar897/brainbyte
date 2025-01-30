
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";
import slugify from 'slugify'


export async function GET() {

  await dbConnect();

  try {

    const curriculums = await Curriculum.find({}).sort({ createdAt: -1 });

    return NextResponse.json(curriculums)


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
   // const slug = slugify(body.title);
    const slug = slugify(body.title, {
      lower: true, // Ensures the slug is in lowercase
      strict: true, // Removes special characters
    });
    // Add the slug to the body
    body.slug = slug;

    const curriculum = await Curriculum.create(body);
    
    console.log("body", curriculum)
    return NextResponse.json(curriculum)

  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 })

  }






}