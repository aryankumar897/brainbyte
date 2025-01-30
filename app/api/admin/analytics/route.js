

// Importing the NextResponse module from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a custom utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing MongoDB model schemas for various collections in the database
import Category from "@/models/Category";  // Category model
import SubCategory from "@/models/subcategory";  // SubCategory model
import CateWithSubCate from "@/models/catewithsubcate";  // CateWithSubCate model
import Subscription from "@/models/subscription";  // Subscription model
import Order from "@/models/order";  // Order model
import UserCourse from "@/models/usercourse";  // UserCourse model
import Curriculum from "@/models/Curriculum";  // Curriculum model
import CurriculumCourse from "@/models/CurriculumCourse";  // CurriculumCourse model
import User from "@/models/user";  // User model

// Async function to handle the GET request and return aggregated counts
export async function GET() {
  // Connect to the MongoDB database
  await dbConnect();

  try {
    // Counting the total number of documents in each collection
    const categoryCount = await Category.countDocuments({});  // Count of categories
    const subCategoryCount = await SubCategory.countDocuments({});  // Count of subcategories
    const cateWithSubCateCount = await CateWithSubCate.countDocuments({});  // Count of cateWithSubCate
    const subscriptionCount = await Subscription.countDocuments({});  // Count of subscriptions
    const orderCount = await Order.countDocuments({});  // Count of orders
    const orderCourseCount = await UserCourse.countDocuments({});  // Count of user courses
    const curriculumCount = await Curriculum.countDocuments({});  // Count of curriculums
    const curriculumCourseCount = await CurriculumCourse.countDocuments({});  // Count of curriculum courses
    const userCount = await User.countDocuments({"role":"user"});  // Count of users with role "user"
    const userAdminCount = await User.countDocuments({ "role":"admin" });  // Count of users with role "admin"

    // Returning a JSON response with the counts of all collections
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
    // Handling any errors that occur during the database queries
    console.log("error", error);
    // Returning an error response with status 500 and the error message
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Category from "@/models/Category";
// import SubCategory from "@/models/subcategory";
// import CateWithSubCate from "@/models/catewithsubcate";
// import Subscription from "@/models/subscription";
// import Order from "@/models/order";
// import UserCourse from "@/models/usercourse";
// import Curriculum from "@/models/Curriculum";
// import CurriculumCourse from "@/models/CurriculumCourse";
// import User from "@/models/user";


// export async function GET() {
//   await dbConnect();

//   try {
//     const categoryCount = await Category.countDocuments({});
//     const subCategoryCount = await SubCategory.countDocuments({});
//     const cateWithSubCateCount = await CateWithSubCate.countDocuments({});
//     const subscriptionCount = await Subscription.countDocuments({});
//     const orderCount = await Order.countDocuments({});
//     const orderCourseCount = await UserCourse.countDocuments({});
//     const curriculumCount = await Curriculum.countDocuments({});
//     const curriculumCourseCount = await CurriculumCourse.countDocuments({});
//     const userCount = await User.countDocuments({"role":"user"});
//     const userAdminCount = await User.countDocuments({ "role":"admin" });

//     return NextResponse.json({
//       categoryCount,
//       subCategoryCount,
//       cateWithSubCateCount,
//       subscriptionCount,
//       orderCount,
//       orderCourseCount,
//       curriculumCount,
//       curriculumCourseCount,
//       userCount,
//       userAdminCount,
//     });
//   } catch (error) {
//     console.log("error", error);
//     return NextResponse.json({ err: error.message }, { status: 500 });
//   }
// }
