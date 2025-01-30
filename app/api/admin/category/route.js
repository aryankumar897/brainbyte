
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Category from  "@/models/Category"
import slugify from 'slugify'

export async function GET() {

  await dbConnect();

  try {

    const category = await Category.find({}).sort({ createdAt: -1 })

   // console.log("allcat", category)

    return NextResponse.json(category)




  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}




export async function POST(req) {

  await dbConnect();

  //console.log("hello")

  const body = await req.json();

  const { name } = body

  try {


    const category = await Category.create({ name, slug:slugify(name)   })


    return NextResponse.json(category)

  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 })

  }






}