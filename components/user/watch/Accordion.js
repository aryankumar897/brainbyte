// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   IconButton,
//   Button,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MenuIcon from "@mui/icons-material/Menu";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// export default function LodashAccordion() {
//   const searchParams = useSearchParams();
//   const slug = searchParams.get("search");

//   const [showAccordion, setShowAccordion] = useState(true);
//   const router = useRouter();
//   const [curriculum, setCurriculum] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (slug) {
//       fetchCurriculum(slug);
//     }
//   }, [slug]);

//   const fetchCurriculum = async (slug) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.API}/user/accordion/${slug}`);
//       const data = await response.json();
//       setCurriculum(data?.sections || []);
//     } catch (error) {
//       console.error("Error fetching curriculum:", error);
//     }
//     setLoading(false);
//   };

//   const handleContentSelection = (lecture) => {
//     router.push(`/dashboard/user/watch?search=${lecture?.slug}`);
//   };

//   return (
//     <>
//       {/* Left Sidebar Accordion */}
//       <Box
//         sx={{
//           marginLeft: "90px",
//           zIndex: 1,
//           bgcolor: "#212121",
//           color: "#fff",
//           width: "300px",
//           height: "100vh", // Full viewport height
//           overflowY: "auto", // Adds vertical scrollbar
//           borderRight: "1px solid #333",
//           display: { xs: showAccordion ? "block" : "none", md: "block" },
//         }}
//       >
//         {/* Loading Spinner */}
//         {loading ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//             }}
//           >
//             <CircularProgress color="inherit" />
//           </Box>
//         ) : (
//           <>
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: "#FFD700",
//                 color: "#000",
//                 fontSize: "1.1rem",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 width: "100%",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 "&:hover": {
//                   bgcolor: "#FFC107",
//                   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
//                 },
//               }}
//             >
//               Go Premium
//             </Button>

//             <Divider
//               sx={{
//                 height: "5px",
//                 width: "100%",
//                 margin: "auto",
//                 backgroundColor: "black",
//               }}
//             />

//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: "#FFD700",
//                 color: "#000",
//                 fontSize: "1.1rem",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 width: "100%",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 "&:hover": {
//                   bgcolor: "#FFC107",
//                   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
//                 },
//               }}
//             >
//               Go Courses
//             </Button>

//             {curriculum?.map((item, index) => (
//               <Accordion
//                 key={index}
//                 disableGutters
//                 sx={{
//                   bgcolor: "inherit",
//                   color: "inherit",
//                   borderBottom: "1px solid #333",
//                 }}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
//                 >
//                   <Typography
//                     style={{
//                       fontSize: "22px",
//                       fontStyle: "normal",
//                       letterSpacing: "0.5px",
//                       lineHeight: "1.6",
//                       wordSpacing: "1px",
//                     }}
//                   >
//                     {item.title}
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   {item?.lectures?.map((lecture, i) => (
//                     <Typography
//                       key={i}
//                       sx={{
//                         mb: 1,
//                         cursor: "pointer",
//                         "&:hover": { color: "#008000" },
//                       }}
//                       style={{
//                         fontSize: "20px",
//                         fontStyle: "normal",
//                         letterSpacing: "0.5px",
//                         lineHeight: "1.1",
//                         wordSpacing: "1px",
//                       }}
//                       onClick={() => handleContentSelection(lecture)}
//                     >
//                       {lecture.title}
//                     </Typography>
//                   ))}
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </>
//         )}
//       </Box>

//       {/* Floating Menu Icon for Small Devices */}
//       <IconButton
//         sx={{
//           position: "fixed",
//           bottom: 16,
//           right: 16,
//           display: { md: "none" },
//           bgcolor: "#333",
//           color: "#fff",
//           zIndex: 10,
//           "&:hover": {
//             bgcolor: "#444",
//           },
//         }}
//         onClick={() => setShowAccordion(!showAccordion)}
//       >
//         <MenuIcon />
//       </IconButton>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LodashAccordion() {


  
  // Import necessary hooks from React and Next.js
  const searchParams = useSearchParams(); // Hook to access URL search parameters
  const slug = searchParams.get("search"); // Extract the value of the 'search' query parameter from the URL

  // State variables to manage UI and data
  const [showAccordion, setShowAccordion] = useState(true); // State to control whether the accordion sections are visible
  const router = useRouter(); // Next.js router instance for navigation
  const [curriculum, setCurriculum] = useState([]); // State to store the fetched curriculum data (array of sections)
  const [loading, setLoading] = useState(false); // Boolean state to track whether data is being loaded
  const [expandedAccordion, setExpandedAccordion] = useState(null); // Stores the index of the currently expanded accordion section (null means none)
  const [selectedLecture, setSelectedLecture] = useState(null); // Stores the title of the currently selected lecture

  // Load previously saved UI states from localStorage when the component mounts
  useEffect(() => {
    const storedExpandedAccordion = localStorage.getItem("expandedAccordion"); // Retrieve the last expanded accordion section from localStorage
    const storedSelectedLecture = localStorage.getItem("selectedLecture"); // Retrieve the last selected lecture title from localStorage

    if (storedExpandedAccordion) {
      setExpandedAccordion(Number(storedExpandedAccordion)); // Convert stored string value to a number and set it in state
    }
    if (storedSelectedLecture) {
      setSelectedLecture(storedSelectedLecture); // Set the previously selected lecture in state
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Fetch curriculum data whenever the 'slug' (search query) changes
  useEffect(() => {
    if (slug) {
      // Only fetch if slug is not null or undefined
      fetchCurriculum(slug); // Call the function to fetch curriculum based on the given slug
    }
  }, [slug]); // Runs every time `slug` changes

  // Function to fetch curriculum data from the API based on the slug
  const fetchCurriculum = async (slug) => {
    setLoading(true); // Set loading state to true before fetching data
    try {
      const response = await fetch(`${process.env.API}/user/accordion/${slug}`); // Make an API request to get the curriculum data
      const data = await response.json(); // Parse the response JSON

      setCurriculum(data?.sections || []); // Update state with the received curriculum data, defaulting to an empty array if no sections exist
    } catch (error) {
      console.error("Error fetching curriculum:", error); // Log any errors encountered while fetching data
    }
    setLoading(false); // Set loading state to false after fetching is complete
  };

  // Function to handle expanding/collapsing an accordion section
  const handleAccordionChange = (index) => {
    const newExpanded = expandedAccordion === index ? null : index; // Toggle accordion: if the same index is clicked, collapse it; otherwise, expand it
    setExpandedAccordion(newExpanded); // Update state with the new expanded section index
    localStorage.setItem("expandedAccordion", newExpanded); // Persist the expanded section index in localStorage for state retention after page reload
  };

  // Function to handle selecting a lecture from the curriculum
  const handleContentSelection = (lecture) => {
    setSelectedLecture(lecture?.title); // Update state with the selected lecture's title
    localStorage.setItem("selectedLecture", lecture?.title); // Save the selected lecture title to localStorage to persist the selection

    // Redirect the user to the lecture viewing page, passing the lecture slug as a query parameter
    router.push(`/dashboard/user/watch?search=${lecture?.slug}`);
  };

  // const searchParams = useSearchParams();
  // const slug = searchParams.get("search");

  // const [showAccordion, setShowAccordion] = useState(true);
  // const router = useRouter();
  // const [curriculum, setCurriculum] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [expandedAccordion, setExpandedAccordion] = useState(null);
  // const [selectedLecture, setSelectedLecture] = useState(null);

  // // Load states from localStorage
  // useEffect(() => {
  //   const storedExpandedAccordion = localStorage.getItem("expandedAccordion");
  //   const storedSelectedLecture = localStorage.getItem("selectedLecture");
  //   if (storedExpandedAccordion) {
  //     setExpandedAccordion(Number(storedExpandedAccordion));
  //   }
  //   if (storedSelectedLecture) {
  //     setSelectedLecture(storedSelectedLecture);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (slug) {
  //     fetchCurriculum(slug);
  //   }
  // }, [slug]);

  // const fetchCurriculum = async (slug) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${process.env.API}/user/accordion/${slug}`);
  //     const data = await response.json();
  //     setCurriculum(data?.sections || []);
  //   } catch (error) {
  //     console.error("Error fetching curriculum:", error);
  //   }
  //   setLoading(false);
  // };

  // const handleAccordionChange = (index) => {
  //   const newExpanded = expandedAccordion === index ? null : index;
  //   setExpandedAccordion(newExpanded); // Toggle accordion
  //   localStorage.setItem("expandedAccordion", newExpanded); // Persist state to localStorage
  // };

  // const handleContentSelection = (lecture) => {
  //   setSelectedLecture(lecture?.title);
  //   localStorage.setItem("selectedLecture", lecture?.title); // Persist selected lecture
  //   router.push(`/dashboard/user/watch?search=${lecture?.slug}`);
  // };

  return (
    <>
      <Box
        sx={{
          marginLeft: "90px",
          zIndex: 1,
          bgcolor: "#212121",
          color: "#fff",
          width: "300px",
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid #333",
          display: { xs: showAccordion ? "block" : "none", md: "block" },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFD700",
                color: "#000",
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: "bold",
                width: "100%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  bgcolor: "#FFC107",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Go Premium
            </Button>

            <Divider
              sx={{
                height: "5px",
                width: "100%",
                margin: "auto",
                backgroundColor: "black",
              }}
            />

            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFD700",
                color: "#000",
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: "bold",
                width: "100%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  bgcolor: "#FFC107",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Go Courses
            </Button>

            {curriculum?.map((item, index) => (
              <Accordion
                key={index}
                disableGutters
                expanded={expandedAccordion === index}
                onChange={() => handleAccordionChange(index)}
                sx={{
                  bgcolor: "inherit",
                  color: "inherit",
                  borderBottom: "1px solid #333",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                >
                  <Typography
                    style={{
                      fontSize: "22px",
                      fontStyle: "normal",
                      letterSpacing: "0.5px",
                      lineHeight: "1.9",
                      wordSpacing: "1px",
                    }}
                  >
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item?.lectures?.map((lecture, i) => (
                    <Typography
                      key={i}
                      sx={{
                        mb: 1,
                        cursor: "pointer",
                        bgcolor:
                          selectedLecture === lecture.title
                            ? "#8A12FC"
                            : "inherit",
                        color:
                          selectedLecture === lecture.title
                            ? "#fff"
                            : "inherit",
                        borderRadius: "4px",
                        padding: "4px",
                        "&:hover": { color: "#008000" },
                      }}
                      style={{
                        fontSize: "23px",
                        fontStyle: "normal",
                        letterSpacing: "0.5px",
                        lineHeight: "1.1",
                        wordSpacing: "1px",
                      }}
                      onClick={() => handleContentSelection(lecture)}
                    >
                      {lecture.title}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { md: "none" },
          bgcolor: "#333",
          color: "#fff",
          zIndex: 10,
          "&:hover": {
            bgcolor: "#444",
          },
        }}
        onClick={() => setShowAccordion(!showAccordion)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
