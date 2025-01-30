'use client';

import React, { useState } from 'react';
import Navbar  from  "@/components/navbar/Navbar"
import Home from "@/components/home/Home"
import Course from "@/components/course/Course"

import Footer from '@/components/footer/Footer';
import Tab from "@/components/tab/Tab"

const NavBar = () => {


  return (

<>

      <Navbar/>
      <Tab />

      <Home />
      <Course />
      <Footer />
    </>

  );
};

export default NavBar;
