'use client';

import { useState, useEffect } from 'react';

import Course from "@/components/coursedisplay/Course"

import { useSearchParams } from "next/navigation";


const ContentViewPage = () => {

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 const searchParams = useSearchParams();
  const search = searchParams.get("search");

  console.log("searchcourse", search);




    useEffect(() => {
        if (!search) return;

        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.API}/getsinglecourse/${search}`, {
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
    }, [search ]);

    if (error) {
        return <p>Error: {error}</p>;
    }



    return (
        <>
    


           <Course course={content} loading={loading} /> 
        </>
    );
};

export default ContentViewPage;
