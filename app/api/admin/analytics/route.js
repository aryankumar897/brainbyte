import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Category from "@/models/Category";
import SubCategory from "@/models/subcategory";
import CateWithSubCate from "@/models/catewithsubcate";
import Subscription from "@/models/subscription";
import Order from "@/models/order";
import UserCourse from "@/models/usercourse";
import Curriculum from "@/models/Curriculum";
import CurriculumCourse from "@/models/CurriculumCourse";
import User from "@/models/user";


export async function GET() {
  await dbConnect();

  try {
    const categoryCount = await Category.countDocuments({});
    const subCategoryCount = await SubCategory.countDocuments({});
    const cateWithSubCateCount = await CateWithSubCate.countDocuments({});
    const subscriptionCount = await Subscription.countDocuments({});
    const orderCount = await Order.countDocuments({});
    const orderCourseCount = await UserCourse.countDocuments({});
    const curriculumCount = await Curriculum.countDocuments({});
    const curriculumCourseCount = await CurriculumCourse.countDocuments({});
    const userCount = await User.countDocuments({"role":"user"});
    const userAdminCount = await User.countDocuments({ "role":"admin" });

    return NextResponse.json({
      categoryCount,
      subCategoryCount,
      cateWithSubCateCount,
      subscriptionCount,
      orderCount,
      orderCourseCount,
      curriculumCount,
      curriculumCourseCount,
      userCount,
      userAdminCount,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
