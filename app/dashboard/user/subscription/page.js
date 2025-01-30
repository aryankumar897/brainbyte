"use client"; // Ensures client-side rendering

import React from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/user/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import ProfileImage  from "@/components/user/profileimage/ProfileImage"
import Subscription from  "@/components/user/subscription/Subscription"


const CourseCreate = () => {
 
  return (
    <>
    <ProfileImage/>
    <Subscription/>
    <Sidebar />

     
    </>
  );
};

export default CourseCreate;
