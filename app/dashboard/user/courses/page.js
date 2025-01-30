"use client"; // Ensures client-side rendering

import React from "react";

import Sidebar from "@/components/user/sidebar/Sidebar";

import ProfileImage  from "@/components/user/profileimage/ProfileImage"
import Courses from "@/components/user/courses/Courses"


const CourseCreate = () => {
 
  return (
    <>
    <ProfileImage/>
<Courses/>
    <Sidebar />

     
    </>
  );
};

export default CourseCreate;
