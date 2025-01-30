import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Subscription from "@/models/subscription";
import Order from "@/models/order";
import UserCourse from "@/models/usercourse";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized: User not logged in." },
      { status: 401 }
    );
  }

  const userId = session?.user?._id;

  try {
    // User-specific counts
    const userSubscriptionCount = await Subscription.countDocuments({ userId });
    const userOrderCount = await Order.countDocuments({ userId });
    const userCourseCount = await UserCourse.countDocuments({user_id: userId });



 console.log("ccccc", {
  userSubscriptionCount,
  userOrderCount,
  userCourseCount,
})

    return NextResponse.json({
      userSubscriptionCount,
      userOrderCount,
      userCourseCount,
    });
  } catch (error) {
    console.error("Error fetching user-specific counts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
