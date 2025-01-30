"use client"
//import CurriculumEditor  from "@/components/CurriculumEditor/CurriculumEditor"

import { Typography } from '@mui/material';

import Dashboard from "@/components/admin/dashboard/Dashboard"
import Sidebar from  "@/components/sidebar/Sidebar"
const CourseCreate= () => {


  return (

    <>


<div style={{ textAlign: 'center', margin: '30px 0' }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          fontSize: '2.5rem',
          letterSpacing: '1px',
          lineHeight: '1.4',
          textTransform: 'uppercase',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)', // Subtle text shadow for modern feel
          backgroundImage: 'linear-gradient(45deg, #FF6F61, #FF8C00)', // Gradient effect
          backgroundClip: 'text', // Make gradient fill text
          color: 'transparent',
          display: 'inline-block',
        }}
      >
        Admin Dashboard
      </Typography>
     
     
     
   
    </div>

<Dashboard/>
      {/* <Page/> */}

     <Sidebar/>
      
    </>

  );
};
export default CourseCreate;