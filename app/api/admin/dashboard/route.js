

// Importing the NextResponse object from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing the dbConnect utility to establish a connection to the database
import dbConnect from "@/utils/dbConnect";

// Importing the CourseOrder model, which represents course order data
import CourseOrder from "@/models/courseorder"

// Defining the GET function to handle GET requests and retrieve revenue data
export async function GET() {

  // Establishing a connection to the database using dbConnect
  await dbConnect();

  // A try-catch block to handle potential errors during the process
  try {

    // Using the aggregate method to process data from the CourseOrder collection
    const revenueData = await CourseOrder.aggregate([
      // $project stage to extract the month, year, and amount from the createdAt field
      {
        $project: {
          month: { $month: "$createdAt" },  // Extracting the month from createdAt
          year: { $year: "$createdAt" },    // Extracting the year from createdAt
          amount: 1,  // Including the amount field in the output
        },
      },
      // $group stage to group by year and month, and calculate the total amount per group
      {
        $group: {
          _id: { month: "$month", year: "$year" }, // Grouping by month and year
          totalAmount: { $sum: "$amount" },  // Summing the amounts for each month-year group
        },
      },
      // $sort stage to sort the results by year and month in ascending order
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sorting by year and month
      },
    ]);

    // Formatting the data into a structure that can be used by a chart
    const formattedData = {
      // labels are the months and years formatted as "May '24", "Jun '24", etc.
      labels: revenueData.map(item => {
        const month = item._id.month;
        const year = item._id.year;
        const date = new Date(year, month - 1);  // JavaScript months are 0-indexed
        const options = { year: '2-digit', month: 'short' };
        return date.toLocaleString('en-US', options); // Formatting the date as "May '24"
      }),
      datasets: [
        {
          label: 'Monthly Earnings ($)', // Label for the data series
          data: revenueData.map(item => item.totalAmount), // Data for the chart (total earnings for each month)
          borderColor: 'rgba(255, 99, 132, 1)', // Vibrant pink-red color for the line
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Semi-transparent pink-red fill under the line
          tension: 0.4, // Smoothing the line (curvature)
          pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Blue color for points on the line
          pointBorderColor: '#FFF', // White border around points
          pointHoverRadius: 8, // Larger point size on hover
        },
      ],
    };

    // Logging the formatted data to the console for debugging purposes
    console.log("formattedData  ---- ", formattedData);

    // Returning the formatted data as a JSON response
    return NextResponse.json(formattedData)

  } catch (err) {
    // If an error occurs, return a JSON response with the error message and a 500 status code
    return NextResponse.json({ err: err.message }, { status: 500 })
  }

}






























// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import CourseOrder from "@/models/courseorder"

// export async function GET() {

//   await dbConnect();

//   try {

//     const revenueData = await CourseOrder.aggregate([
//         {
//           $project: {
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" },
//             amount: 1,
//           },
//         },
//         {
//           $group: {
//             _id: { month: "$month", year: "$year" },
//             totalAmount: { $sum: "$amount" },
//           },
//         },
//         {
//           $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
//         },
//       ]);
  
//       // Format the response in the shape expected by the chart
//       const formattedData = {
//         labels: revenueData.map(item => {
//           // Format the label as "May '24", "Jun '24", etc.
//           const month = item._id.month;
//           const year = item._id.year;
//           const date = new Date(year, month - 1); // JavaScript months are 0-indexed
//           const options = { year: '2-digit', month: 'short' };
//           return date.toLocaleString('en-US', options); // e.g., "May '24"
//         }),
//         datasets: [
//           {
//             label: 'Monthly Earnings ($)',
//             data: revenueData.map(item => item.totalAmount),
//             borderColor: 'rgba(255, 99, 132, 1)', // Vibrant pink-red line
//             backgroundColor: 'rgba(255, 99, 132, 0.2)', // Semi-transparent pink-red fill
//             tension: 0.4,
//             pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Vibrant blue for points
//             pointBorderColor: '#FFF', // White border for points
//             pointHoverRadius: 8, // Larger points on hover
//           },
//         ],
//       };

//        console.log("formattedData  ---- " , formattedData)

//     return NextResponse.json(formattedData)




//   } catch (err) {

//     return NextResponse.json({ err: err.message }, { status: 500 })


//   }

// }


