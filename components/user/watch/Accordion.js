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
  const searchParams = useSearchParams();
  const slug = searchParams.get("search");

  const [showAccordion, setShowAccordion] = useState(true);
  const router = useRouter();
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Load states from localStorage
  useEffect(() => {
    const storedExpandedAccordion = localStorage.getItem("expandedAccordion");
    const storedSelectedLecture = localStorage.getItem("selectedLecture");
    if (storedExpandedAccordion) {
      setExpandedAccordion(Number(storedExpandedAccordion));
    }
    if (storedSelectedLecture) {
      setSelectedLecture(storedSelectedLecture);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchCurriculum(slug);
    }
  }, [slug]);

  const fetchCurriculum = async (slug) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.API}/user/accordion/${slug}`);
      const data = await response.json();
      setCurriculum(data?.sections || []);
    } catch (error) {
      console.error("Error fetching curriculum:", error);
    }
    setLoading(false);
  };

  const handleAccordionChange = (index) => {
    const newExpanded = expandedAccordion === index ? null : index;
    setExpandedAccordion(newExpanded); // Toggle accordion
    localStorage.setItem("expandedAccordion", newExpanded); // Persist state to localStorage
  };

  const handleContentSelection = (lecture) => {
    setSelectedLecture(lecture?.title);
    localStorage.setItem("selectedLecture", lecture?.title); // Persist selected lecture
    router.push(`/dashboard/user/watch?search=${lecture?.slug}`);
  };

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
                          selectedLecture === lecture.title ? "#8A12FC" : "inherit",
                        color:
                          selectedLecture === lecture.title ? "#fff" : "inherit",
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

