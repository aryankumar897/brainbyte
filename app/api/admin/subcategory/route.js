
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import SubCategory from "@/models/subcategory";
import slugify from 'slugify'

export async function GET() {

  await dbConnect();

  try {

    const subcategory = await SubCategory.find({}).sort({ createdAt: -1 })

  //console.log("allcatxxxx", subcategory)

    return NextResponse.json(subcategory)




  } catch (err) {
 //console.log("error", err)
    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}




export async function POST(req) {

  await dbConnect();

  //console.log("hello")

  const body = await req.json();

  const { name } = body

// console.log("hello",name)

  try {


    const subcategory = await SubCategory.create({ name, slug: slugify(name) })

//console.log("subcategory",subcategory)
    return NextResponse.json(subcategory)

  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 })

  }






}