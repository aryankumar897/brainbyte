'use client';
import {
    Box,
   
  } from '@mui/material';
import { useState, useEffect } from 'react';
import CourseEdit from '@/components/CurriculumCourseEditor/courseEdit/CourseEdit';
import { useSearchParams } from 'next/navigation'
import Sidebar from "@/components/sidebar/Sidebar";

const ContentViewPage = () => {
    
     const [content, setContent] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
    const searchParams = useSearchParams()
 
    const search = searchParams.get('search')

    useEffect(() => {
        if (!search ) return;

        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.API}/admin/course/edit/${search}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch content');
                }

                const data = await response.json();
                setContent(data);
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [search]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
      
      <Sidebar/>

 
        <CourseEdit content={content} loading={loading} /> 
       
      

        </>
    );
};

export default ContentViewPage;
