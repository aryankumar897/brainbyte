
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Category from  "@/models/Category"
import SubCategory from "@/models/subcategory"
import User from  "@/models/user"
import Order from "@/models/order"


export async function GET() {

  await dbConnect();

  try {
    // Replace with your database collections
    const categoryCount = await Category.countDocuments();
    const subCategoryCount = await SubCategory.countDocuments();
    const userCount = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });
    const orderCount = await Order.countDocuments();
 console.log({
    categoryCount,
    subCategoryCount,
    userCount,
    adminCount,
    orderCount,
  })

   
    return NextResponse.json(
        {
            categoryCount,
            subCategoryCount,
            userCount,
            adminCount,
            orderCount,
          }
    )




  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}


