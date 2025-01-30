
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CourseOrder from "@/models/courseorder"

export async function GET() {

  await dbConnect();

  try {

    const revenueData = await CourseOrder.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            amount: 1,
          },
        },
        {
          $group: {
            _id: { month: "$month", year: "$year" },
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
        },
      ]);
  
      // Format the response in the shape expected by the chart
      const formattedData = {
        labels: revenueData.map(item => {
          // Format the label as "May '24", "Jun '24", etc.
          const month = item._id.month;
          const year = item._id.year;
          const date = new Date(year, month - 1); // JavaScript months are 0-indexed
          const options = { year: '2-digit', month: 'short' };
          return date.toLocaleString('en-US', options); // e.g., "May '24"
        }),
        datasets: [
          {
            label: 'Monthly Earnings ($)',
            data: revenueData.map(item => item.totalAmount),
            borderColor: 'rgba(255, 99, 132, 1)', // Vibrant pink-red line
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Semi-transparent pink-red fill
            tension: 0.4,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Vibrant blue for points
            pointBorderColor: '#FFF', // White border for points
            pointHoverRadius: 8, // Larger points on hover
          },
        ],
      };

       console.log("formattedData  ---- " , formattedData)

    return NextResponse.json(formattedData)




  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}


