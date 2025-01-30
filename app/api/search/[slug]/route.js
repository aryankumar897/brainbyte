import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";
import slugify from 'slugify';

export async function GET(req,context) {
  await dbConnect();

  // Extract the search query parameter (slug) from the request URL
  const { slug } =  context.params // Using searchParams to get query params

  try {
    // If no slug is provided, return all curriculums sorted by creation date
    if (!slug) {
      const curriculums = await Curriculum.find({}).sort({ createdAt: -1 });
      return NextResponse.json(curriculums);
    }

    // If a slug is provided, search for curriculums and lectures matching the slug or content
    let curriculums = await Curriculum.find({
      $or: [
        { slug: slug },  // Match slug in curriculum
        { "sections.lectures.slug": slug }, // Match slug in lecture
        { "sections.lectures.content": { $regex: slug, $options: 'i' } } // Match content in lecture (case-insensitive)
      ]
    }).populate({
      path: "sections.lectures", 
      match: { 
        $or: [
          { slug: slug }, // Match slug in lecture
          { content: { $regex: slug, $options: 'i' } } // Match content in lecture (case-insensitive)
        ]
      }
    }).sort({ createdAt: -1 });

    // If no curriculums or lectures are found, return an appropriate message
    if (!curriculums || curriculums.length === 0) {
      return NextResponse.json({ message: "No matching curriculums or lectures found." }, { status: 404 });
    }

    return NextResponse.json(curriculums);
    
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
