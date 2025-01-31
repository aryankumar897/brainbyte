"use client"; // Ensures client-side rendering

import React from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/user/sidebar/Sidebar";
import { useRouter } from "next/navigation";
const CourseCreate = () => {

  const { data: session } = useSession(); // Fetches the current user's session data (if logged in)
const router = useRouter(); // Provides access to Next.js router for navigation


//   const { data: session } = useSession(); // Fetch session data
//  const router = useRouter();


  return (
    <>
      {/* Rotating border around the static user image */}
      <div
       onClick={() => 
        router.push("/dashboard/user/profile")
       
      }
        style={{
          position: "absolute",
          top: "50px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          cursor:"pointer"
        }}
      >
        {/* Wrapper for rotating border */}
        <div
          style={{
            position: "relative",
            width: "70px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Rotating gradient border */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `conic-gradient(
                #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #f09433
              )`,
              animation: "rotateBorder 2s linear infinite",
              zIndex: 1, // Ensures the border is behind the image
            }}
          />
          {/* Static inner white circle */}
          <div
            style={{
              position: "absolute",
              width: "66px", // Slightly smaller to create inner padding
              height: "66px",
              borderRadius: "80%",
              backgroundColor: "white",
            }}

          />
          {/* Static User Image */}
          <img

            src={session?.user?.image || "/images/pic1.png"} // Fallback for default avatar
            alt="User Avatar"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              position: "relative",
              zIndex: 2, // Keep the image above the rotating border
            }}
          />
        </div>

       
      </div>

    <Sidebar />

      {/* Rotating animation for the border */}
      <style jsx>{`
        @keyframes rotateBorder {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default CourseCreate;
