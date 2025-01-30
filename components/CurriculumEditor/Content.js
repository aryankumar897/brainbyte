// import React, { useState } from "react";

// import { Box, Button, Typography, IconButton, Grid, TextField, Tabs, Tab } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DescriptionIcon from "@mui/icons-material/Description";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CloseIcon from "@mui/icons-material/Close";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";

// import SlideshowIcon from "@mui/icons-material/Slideshow";


// import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import EditIcon from "@mui/icons-material/Edit"; // For Edit functionality
// import DeleteIcon from "@mui/icons-material/Delete"; // For Delete functionality
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// const CurriculumEditor = () => {

//   const [showContentSelector, setShowContentSelector] = useState(false);
//   const [showResourceSelector, setShowResourceSelector] = useState(false);
//   const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
//   const [isResourcesVisible, setIsResourcesVisible] = useState(false);
//   const [selectedTab, setSelectedTab] = useState(0);
//   const toggleDescription = () => {
//     setIsDescriptionVisible(!isDescriptionVisible);
//     setShowResourceSelector(false)
//     setShowContentSelector(false)
//   };

//   const toggleDescriptionClose = () => {
//     setIsDescriptionVisible(false);

//   }

//   const toggleContentSelector = () => {
//     setShowContentSelector(!showContentSelector);
//     setShowResourceSelector(false)
//     setIsDescriptionVisible(false);
//   };

//   const toggleResourceSelector = () => {
//     setShowResourceSelector(!showResourceSelector)
//     setShowContentSelector(false)
//     setIsDescriptionVisible(false);
//   }



//   const toggleResources = () => {
//     setIsResourcesVisible(!isResourcesVisible);
//     setShowResourceSelector(false)

//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const toggleResourcesClose = () => {
//     setIsResourcesVisible(false);

//   }


//   return (

//     <>
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "800px",
//           margin: "0 auto",
//           padding: "16px",
//           backgroundColor: "#212121",
//           border: "1px solid #E0E0E0",
//         }}
//       >
//         {/* Section */}
//         <Box
//           sx={{
//             backgroundColor: "#212121",
//             border: "1px solid #E0E0E0",
//             marginBottom: "16px",
//             padding: "16px",
//             borderRadius: "4px",

          


//           }}
//         >

// <Box  


//             sx={{
             
//               "&:hover .hover-iconss": {
//                 display: "flex", // Show icons on hover
//               },


//             }}

//     >
//           {/* Section Header */}
//           <Typography
//             variant="subtitle1"
//             fontWeight="bold"
//             sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
//           >
//             <DescriptionIcon sx={{ marginRight: "8px", color: "#000000" }} />
//             Section 1: Introduction

//             <Box
//               className="hover-iconss"
//               sx={{
//                 display: "none", // Hidden by default
//                 alignItems: "center",
//                 marginLeft: "8px",
//                 gap: "8px",
//               }}
//             >
//               <IconButton
//                 size="small"
//                 sx={{ color: "#fff",
//                   zIndex: 9999,
                
//                  }}
//                 onClick={() => console.log("Edit clicked")}
//               >
//                 <EditIcon sx={{ fontSize: "20px", color: "#fff" }} />
//               </IconButton>
//               <IconButton
//                 size="small"
//                 sx={{ color: "#fff", zIndex: 9999, }}
//                 onClick={() => console.log("Delete clicked")}
//               >
//                 <DeleteIcon sx={{ fontSize: "20px", color: "#fff" }} />
//               </IconButton>

//                 <IconButton
//                   size="small"
//                   sx={{ color: "#333333", marginLeft: "400px" }} // Pushed to the right
//                   onClick={() => console.log("Drag clicked")}
//                 >
//                   <DragIndicatorIcon sx={{ fontSize: "20px", color: "#fff" }} />
//                 </IconButton>
//             </Box>



//           </Typography>

//           </Box>






          

//           {/* Lecture */}
  
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "16px",
//               border: "1px solid #E0E0E0",
//               padding: "8px",
//               position: "relative",
//               "&:hover .hover-icons": {
//                 display: "flex", // Show icons on hover
//               },
//             }}
//           >
//             {/* Left Section */}
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <CheckCircleIcon
//                 sx={{
//                   marginRight: "8px",
//                   color: "#fff",
//                   fontSize: "20px",
//                 }}
//               />
//               <Typography
//                 variant="body1"
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 Lecture 1:{" "}
//                 <DescriptionIcon
//                   sx={{
//                     marginLeft: "4px",
//                     marginRight: "8px",
//                     color: "#000000",
//                   }}
//                 />
//                 Introduction
//               </Typography>

//               {/* Edit and Delete Icons - Hidden by default */}
//               <Box
//                 className="hover-icons"
//                 sx={{
//                   display: "none", // Hidden by default
//                   alignItems: "center",
//                   marginLeft: "8px",
//                   gap: "8px",
//                 }}
//               >
//                 <IconButton
//                   size="small"
//                   sx={{
//                     color: "#333333",
//                   }}
//                   onClick={() => console.log("Edit clicked")}
//                 >
//                   <EditIcon sx={{ fontSize: "20px" ,color:"#fff" }} />
//                 </IconButton>
//                 <IconButton
//                   size="small"
//                   sx={{
//                     color: "#333333",
//                   }}
//                   onClick={() => console.log("Delete clicked")}
//                 >
//                   <DeleteIcon sx={{ fontSize: "20px", color: "#fff" }} />
//                 </IconButton>
//               </Box>
//             </Box>

//             {/* Right Section */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//               {!showContentSelector && (
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={toggleContentSelector}
//                   startIcon={<AddIcon sx={{ color: "#FFFFFF" }} />}
//                   sx={{
//                     textTransform: "none",


//                     fontSize: "16px",
//                     fontWeight: 500,
//                     color: "#FFFFFF", // Text color white
//                     border: "1px solid #E0E0E0",

//                   }}
//                 >
//                   Content
//                 </Button>
//               )}

//               {showResourceSelector ? (
//                 <IconButton onClick={toggleResourceSelector}>
//                   <CloseIcon
//                     sx={{
//                       fontSize: "30px",
//                       color: "#FFFFFF",
//                     }}
//                   />
//                 </IconButton>
//               ) : (
//                 <IconButton onClick={toggleResourceSelector}>
//                   <ExpandMoreIcon
//                     sx={{
//                       fontSize: "30px",
//                       color: "#FFFFFF",
//                     }}
//                   />
//                 </IconButton>
//               )}




//               <IconButton
//             //   onClick={toggleResourceSelector}
              
//               >
//                 <DragIndicatorIcon 
//                   sx={{
//                     fontSize: "30px",
//                     color: "#FFFFFF",
//                   }}
//                 />
//               </IconButton>




  
//             </Box>
//           </Box>



//           {showContentSelector && (
//             <Box
//               sx={{
//                 width: "100%",
//                 maxWidth: "800px",
//                 marginTop: "16px",
//                 backgroundColor: "#212121",
//                 border: "1px solid #E0E0E0",
//                 borderRadius: "8px",
//                 padding: "16px",
//               }}
//             >
//               {/* Content Selector Header */}
//               <Box
//                 sx={{
//                   display: "flex", justifyContent: "space-between",
//                   alignItems: "center"
//                 }}

//               >
//                 <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//                   Select the main type of content
//                 </Typography>
//                 <IconButton onClick={toggleContentSelector}>
//                   <CloseIcon sx={{ color: "#FFFFFF", fontWeight: "bold" }} />
//                 </IconButton>
//               </Box>

//               <Typography
//                 variant="body2"
//                 sx={{ marginBottom: "16px", color: "#555" }}
//               >
//                 Files and links can be added as resources.{" "}
//                 <Typography
//                   component="a"
//                   href="#"
//                   sx={{ color: "#1976D2", textDecoration: "none", fontWeight: "bold" }}
//                 >
//                   Learn about content types.
//                 </Typography>
//               </Typography>

//               {/* Content Options */}
//               <Grid container spacing={2}>
//                 {/* Video Option */}
//                 <Grid item xs={12} sm={4}>
//                   <Box
//                     sx={{
//                       border: "1px solid #E0E0E0",
//                       borderRadius: "4px",
//                       textAlign: "center",
//                       padding: "16px",
//                       backgroundColor: "#FFFFFF",
//                       cursor: "pointer",
//                       "&:hover": {
//                         backgroundColor: "#333333", // Slightly darker on hover
//                       },
//                     }}
//                   >
//                     <PlayCircleIcon sx={{
//                       fontSize: "40px",

//                       "&:hover": {
//                         color: "#fff", // Slightly darker on hover
//                       },
//                       color: "#9E9E9E"
//                     }} />
//                     <Typography variant="body2" sx={{ marginTop: "8px" }}>
//                       Video
//                     </Typography>
//                   </Box>
//                 </Grid>

//                 {/* Video & Slide Mashup Option */}
//                 <Grid item xs={12} sm={4}>
//                   <Box
//                     sx={{
//                       border: "1px solid #E0E0E0",
//                       borderRadius: "4px",
//                       textAlign: "center",
//                       padding: "16px",
//                       backgroundColor: "#FFFFFF",
//                       cursor: "pointer",
//                       "&:hover": {
//                         backgroundColor: "#333333", // Slightly darker on hover
//                       },
//                     }}
//                   >
//                     <SlideshowIcon sx={{
//                       fontSize: "40px",


//                       color: "#9E9E9E"
//                     }} />
//                     <Typography variant="body2" sx={{ marginTop: "8px" }}>
//                       Video & Slide Mashup
//                     </Typography>
//                   </Box>
//                 </Grid>

//                 {/* Article Option */}
//                 <Grid item xs={12} sm={4}>
//                   <Box
//                     sx={{
//                       border: "1px solid #E0E0E0",
//                       borderRadius: "4px",
//                       textAlign: "center",
//                       padding: "16px",
//                       backgroundColor: "#FFFFFF",
//                       cursor: "pointer",
//                       "&:hover": {
//                         backgroundColor: "#333333", // Slightly darker on hover
//                       },
//                     }}
//                   >
//                     <DescriptionIcon sx={{
//                       fontSize: "40px",


//                       color: "#9E9E9E"
//                     }} />
//                     <Typography variant="body2" sx={{ marginTop: "8px" }}>
//                       Article
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>
//           )}








//           {
//             showResourceSelector && (
//               <Box
//                 sx={{
//                   width: "100%",
//                   maxWidth: "800px",
//                   marginTop: "16px",
//                   backgroundColor: "#212121",
//                   border: "1px solid #E0E0E0",
//                   borderRadius: "8px",
//                   padding: "18px",
//                 }}
//               >
//                 {/* Description Button */}
//                 <Button

//                   onClick={toggleDescription}

//                   variant="outlined"
//                   sx={{
//                     display: "flex",
//                     justifyContent: "flex-start",
//                     alignItems: "center",
//                     textTransform: "none",
//                     border: "1px solid #E0E0E0",
//                     //  borderRadius: "8px",
//                     fontSize: "16px",
//                     fontWeight: 500,
//                     m: 1,
//                     color: "#FFFFFF", // Text color white
//                   }}
//                   startIcon={<AddIcon sx={{ color: "#FFFFFF" }} />}
//                 >
//                   Description
//                 </Button>

//                 {/* Resources Button */}
//                 <Button

//                   onClick={toggleResources}
//                   variant="outlined"
//                   sx={{
//                     m: 1,
//                     display: "flex",
//                     justifyContent: "flex-start",
//                     alignItems: "center",
//                     textTransform: "none",
//                     border: "1px solid #E0E0E0",
//                     //  borderRadius: "8px",
//                     fontSize: "16px",
//                     fontWeight: 500,
//                     color: "#FFFFFF", // Text color white

//                   }}
//                   startIcon={<AddIcon sx={{ color: "#FFFFFF" }} />}
//                 >
//                   Resources
//                 </Button>
//               </Box>
//             )
//           }





//           {isDescriptionVisible && (
//             <Box
//               sx={{
//                 border: "1px solid #E0E0E0",
//                 borderRadius: "4px",
//                 padding: "16px",
//                 marginTop: "16px",
//                 backgroundColor: "#212121"
//               }}
//             >
//               {/* Title */}
//               <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: "8px" }}>
//                 Lecture Description
//               </Typography>

//               {/* Toolbar */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: "8px",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <IconButton sx={{ color: "#333333" }}>
//                   <FormatBoldIcon />
//                 </IconButton>
//                 <IconButton sx={{ color: "#333333" }}>
//                   <FormatItalicIcon />
//                 </IconButton>
//                 <IconButton sx={{ color: "#333333" }}>
//                   <FormatListBulletedIcon />
//                 </IconButton>
//               </Box>

//               {/* Text Area */}
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 placeholder="Add a description. Include what students will be able to do after completing the lecture."
//                 variant="outlined"
//                 sx={{
//                   border: "1px solid #E0E0E0",
//                   "& .MuiOutlinedInput-root": {
//                     backgroundColor: "#212121"
//                   },
//                 }}
//               />

//               {/* Action Buttons */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   marginTop: "8px",
//                   gap: "8px",
//                 }}
//               >
//                 <Button
//                   onClick={toggleDescriptionClose}

//                   variant="text"
//                   sx={{
//                     textTransform: "none", color: "#fff",
//                     border: "1px solid #E0E0E0",


//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     textTransform: "none",
//                     backgroundColor: "#212121",
//                     border: "1px solid #E0E0E0",
//                     color: "#fff",
//                     "&:hover": {
//                       backgroundColor: "#444444",
//                     },
//                   }}
//                 >
//                   Save
//                 </Button>
//               </Box>
//             </Box>
//           )}


















//           {/* Resources Component */}
//           {isResourcesVisible && (
//             <Box
//               sx={{
//                 border: "1px solid #E0E0E0",
//                 borderRadius: "4px",
//                 marginTop: "16px",
//                 padding: "16px",
//                 backgroundColor: "#212121",
//                 position: "relative",
//               }}
//             >
//               {/* Close Icon */}
//               <IconButton
//                 sx={{
//                   position: "absolute",
//                   top: "8px",
//                   right: "8px",
//                   color: "#333333",
//                   zIndex: 1000
//                 }}
//                 onClick={toggleResourcesClose}
//               >
//                 <CloseIcon


//                   sx={{
//                     color: "#fff",

//                   }}

//                 />
//               </IconButton>

//               {/* Tabs */}
//               <Tabs
//                 value={selectedTab}
//                 onChange={handleTabChange}

//                 sx={{
//                   marginBottom: "16px",

//                   "& .MuiTabs-indicator": {
//                     display: "none", // Remove underline
//                   },
//                   "& .MuiTabs-scrollButtons": {
//                     color: "#fff", // Scroll button color
//                     "&:hover": {
//                       color: "#00ff00", // Hover color for scroll buttons
//                     },
//                     "& svg": {
//                       fontSize: "3rem", // Increase the size of the icons
//                     },
//                   },
//                 }}
//               >
//                 <Tab label="Downloadable File" sx={{
//                   textTransform: "none"

//                   ,
//                   fontWeight: 600,
//                   "&.Mui-selected": {
//                     color: "#fff !important", // Force white for the selected tab
//                   },
//                   color: "#fff", // Active tab is white, others are gray
//                   "&:hover": {
//                     color: "#00ff00", // Green text on hover
//                   },



//                 }} />
//                 <Tab label="Add from Library" sx={{
//                   textTransform: "none"

//                   ,
//                   fontWeight: 600,
//                   "&.Mui-selected": {
//                     color: "#fff !important", // Force white for the selected tab
//                   },
//                   color: "#fff", // Active tab is white, others are gray
//                   "&:hover": {
//                     color: "#00ff00", // Green text on hover
//                   },

//                 }} />
//                 <Tab label="External Resource" sx={{
//                   textTransform: "none"
//                   ,
//                   fontWeight: 600,
//                   "&.Mui-selected": {
//                     color: "#fff !important", // Force white for the selected tab
//                   },
//                   color: "#fff", // Active tab is white, others are gray
//                   "&:hover": {
//                     color: "#00ff00", // Green text on hover
//                   },

//                 }} />
//                 <Tab label="Source Code" sx={{
//                   textTransform: "none"

//                   ,
//                   fontWeight: 600,
//                   "&.Mui-selected": {
//                     color: "#fff !important", // Force white for the selected tab
//                   },
//                   color: "#fff", // Active tab is white, others are gray
//                   "&:hover": {
//                     color: "#00ff00", // Green text on hover
//                   },

//                 }} />
//               </Tabs>

//               {/* Tab Content */}
//               <Box sx={{ marginTop: "16px" }}>
//                 {selectedTab === 0 && (



//                   <Box
//                     sx={{
//                       border: "1px solid #E0E0E0",
//                       borderRadius: "4px",
//                       padding: "16px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     <Typography variant="body1" sx={{ color: "#333333" }}>
//                       No file selected
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         border: "1px solid #E0E0E0",
//                         textTransform: "none",

//                         color: "#fff",
//                       }}
//                     >
//                       Select File
//                     </Button>
//                   </Box>



//                 )}
//                 {selectedTab === 1 && (






//                   < Box
//                     sx={{
//                       border: "1px solid #E0E0E0",
//                       borderRadius: "4px",
//                       padding: "16px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "8px",
//                     }}>
//                     {/* Content for "Add from Library" */}

//                     <Typography variant="body1" sx={{ color: "#333333" }}>
//                       No file selected
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         textTransform: "none",
//                         border: "1px solid #E0E0E0",
//                         color: "#fff",
//                       }}
//                     >
//                       Select File
//                     </Button>
//                   </Box>



//                 )}
//                 {selectedTab === 2 && (
//                   <Box>
//                     {/* Content for "External Resource" */}
//                     <Typography variant="h6" sx={{ marginBottom: "16px" }}>
//                       Add External Resource
//                     </Typography>
//                     <TextField
//                       fullWidth
//                       label="Title"
//                       placeholder="A descriptive title"
//                       variant="outlined"
//                       sx={{
//                         marginBottom: "16px",

//                         border: "1px solid #E0E0E0",

//                       }}
//                     />
//                     <TextField
//                       fullWidth
//                       label="URL"
//                       placeholder="https://example.com"
//                       variant="outlined"
//                       sx={{
//                         marginBottom: "16px",
//                         border: "1px solid #E0E0E0",

//                       }}
//                     />
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "flex-end",
//                       }}
//                     >
//                       <Button
//                         variant="contained"
//                         sx={{
//                           textTransform: "none",
//                           backgroundColor: "#333333",
//                           color: "#FFFFFF",
//                           border: "1px solid #E0E0E0",

//                           "&:hover": { backgroundColor: "#111111" },
//                         }}
//                       >
//                         Add Link
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//                 {selectedTab === 3 && (







//                   <Box
//                     sx={{
//                       border: "1px solid #E0E0E0",
//                       borderRadius: "4px",
//                       padding: "16px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "8px",
//                     }}>
//                     {/* Content for "Source Code" */}

//                     <Typography variant="body1" sx={{ color: "#333333" }}>
//                       No file selected
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         textTransform: "none",
//                         border: "1px solid #E0E0E0",
//                         color: "#fff",
//                       }}
//                     >
//                       Select File
//                     </Button>
//                   </Box>

//                 )}
//               </Box>
//             </Box>
//           )}



//           {/* Curriculum Item */}
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon sx={{ color: "#FFFFFF" }} />}
//             size="small"
//             sx={{
//               textTransform: "none",
//               fontSize: "16px",
//               fontWeight: 500,
//               color: "#FFFFFF", // Text color white
//               marginTop: "8px",

//               border: "1px solid #E0E0E0",
//             }}
//           >
//             Curriculum item
//           </Button>
//         </Box>

//         {/* Add Section */}
//         <Box sx={{ textAlign: "left" }}>
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             size="small"
//             sx={{
//               textTransform: "none",
//               fontWeight: "bold",
//               fontSize: "20px",
//               fontWeight: 500,
//               color: "#FFFFFF", // Text color white
//               border: "1px solid #E0E0E0",

//             }}
//           >
//             Section
//           </Button>
//         </Box>
//       </Box>





//     </>

//   );
// };

// export default CurriculumEditor;

