
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CateWithSubCate from "@/models/catewithsubcate";
import SubCategory from "@/models/subcategory";
import slugify from 'slugify'

export async function GET() {
  await dbConnect();
  try {
    const cateWithSubCate = await CateWithSubCate.find({})
    .sort({ createdAt: -1 })
      .populate("categoryId")
      .populate("subcategoryId")

   // console.log("cateWithSubCate", cateWithSubCate)
    return NextResponse.json(cateWithSubCate)
  } catch (err) {
   // console.log("error", err)
    return NextResponse.json({ err: err.message }, { status: 500 })

  }

}


export async function POST(req) {
  await dbConnect();
  //console.log("hello")
  const body = await req.json();

  const {  
   categoryId,
    subcategoryId,
    title,
    subtitle,
  } = body


  const subcategory = await SubCategory.findOne({ _id: subcategoryId })

//console.log("subcategory", subcategory)
 const subcategorytitle = subcategory?.name
 



  try {
 
    const cateWithSubCate = await CateWithSubCate.create({ 
      categoryId,
      subcategoryId,
      title,
      subtitle,
      slug: slugify(title) || slugify(subcategorytitle)
    
    })
 //console.log("x",   cateWithSubCate)

    return NextResponse.json(cateWithSubCate)

  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 })

  }






}