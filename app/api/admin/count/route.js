
// Importing the NextResponse object from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing dbConnect utility to establish a connection to the database
import dbConnect from "@/utils/dbConnect";

// Importing various models representing different collections in the database
import Category from "@/models/Category";
import SubCategory from "@/models/subcategory";
import User from "@/models/user";
import Order from "@/models/order";

// Defining the GET function to handle GET requests and fetch various counts from the database
export async function GET() {

  // Establishing a connection to the database using dbConnect
  await dbConnect();

  // A try-catch block to handle potential errors during the process
  try {
    // Fetching the count of documents in different collections (categories, subcategories, users, orders)
    const categoryCount = await Category.countDocuments();  // Counting categories in the Category collection
    const subCategoryCount = await SubCategory.countDocuments();  // Counting subcategories in the SubCategory collection
    const userCount = await User.countDocuments();  // Counting total users in the User collection
    const adminCount = await User.countDocuments({ role: "admin" });  // Counting users with "admin" role in the User collection
    const orderCount = await Order.countDocuments();  // Counting total orders in the Order collection

    // Logging the counts to the console for debugging or logging purposes
    console.log({
      categoryCount,
      subCategoryCount,
      userCount,
      adminCount,
      orderCount,
    });

    // Returning the counts as a JSON response
    return NextResponse.json(
      {
        categoryCount,  // Number of categories
        subCategoryCount,  // Number of subcategories
        userCount,  // Total number of users
        adminCount,  // Number of admin users
        orderCount,  // Total number of orders
      }
    );

  } catch (err) {
    // If an error occurs, catching the error and returning a JSON response with the error message and a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}






















// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Category from  "@/models/Category"
// import SubCategory from "@/models/subcategory"
// import User from  "@/models/user"
// import Order from "@/models/order"


// export async function GET() {

//   await dbConnect();

//   try {
//     // Replace with your database collections
//     const categoryCount = await Category.countDocuments();
//     const subCategoryCount = await SubCategory.countDocuments();
//     const userCount = await User.countDocuments();
//     const adminCount = await User.countDocuments({ role: "admin" });
//     const orderCount = await Order.countDocuments();
//  console.log({
//     categoryCount,
//     subCategoryCount,
//     userCount,
//     adminCount,
//     orderCount,
//   })

   
//     return NextResponse.json(
//         {
//             categoryCount,
//             subCategoryCount,
//             userCount,
//             adminCount,
//             orderCount,
//           }
//     )




//   } catch (err) {

//     return NextResponse.json({ err: err.message }, { status: 500 })


//   }

// }


