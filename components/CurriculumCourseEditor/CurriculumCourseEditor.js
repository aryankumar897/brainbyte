"use client";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import { imageUpload } from "@/components/functions/Upload";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import NotesIcon from "@mui/icons-material/Notes";
import Tab from "./Tab"
import SideBar from "@/components/sidebar/Sidebar"

import axios from "axios";
import {
 
 
  LinearProgress,

  Card,
  CardContent,
  CardActions,
 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";




import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Modal,
  CircularProgress,
} from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import ReactPlayer (ensures it’s client-side only)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";
const ItemTypes = {
  SECTION: "section",
  LECTURE: "lecture",
};

const DraggableSection = ({ section, index, moveSection, children }) => {
  const [, ref] = useDrag({
    type: ItemTypes.SECTION,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.SECTION,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Box ref={(node) => ref(drop(node))} sx={{ marginBottom: "16px" }}>
      {children}
    </Box>
  );
};

const DraggableLecture = ({
  lecture,
  sectionIndex,
  lectureIndex,
  moveLecture,
  children,
}) => {
  const [, ref] = useDrag({
    type: ItemTypes.LECTURE,
    item: { sectionIndex, lectureIndex },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.LECTURE,
    hover: (draggedItem) => {
      if (
        draggedItem.sectionIndex !== sectionIndex ||
        draggedItem.lectureIndex !== lectureIndex
      ) {
        moveLecture(
          draggedItem.sectionIndex,
          draggedItem.lectureIndex,
          sectionIndex,
          lectureIndex
        );
        draggedItem.sectionIndex = sectionIndex;
        draggedItem.lectureIndex = lectureIndex;
      }
    },
  });

  return (
    <Box ref={(node) => ref(drop(node))} sx={{ marginBottom: "8px" }}>
      {children}
    </Box>
  );
};

const CurriculumEditor = () => {
  
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  console.log("searchcourse", search);

  const [sections, setSections] = useState([
    {
      idindex: uuidv4(),
      title: "Introduction",
      lectures: [{ id: uuidv4(), title: "Topic A", content: "" }],
    },
    {
      id: uuidv4(),
      title: "Basics",
      lectures: [{ id: uuidv4(), title: "Topic B", content: "" }],
    },
  ]);

  const [editSectionValue, setEditSectionValue] = useState("");
  const [editLectureValue, setEditLectureValue] = useState("");
  const [editing, setEditing] = useState(null);

  const [deletingLecture, setDeletingLecture] = useState(null);
  const [deletingSection, setDeletingSection] = useState("");
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(false);
 const [coursetitle,setcourseTitle]=useState("")
  useEffect(() => {
    const fetchCurriculum = async (searchId) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.API}/admin/singlecourse/${searchId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("datax======", data);
        setcourseTitle(data?.title)
        setCurriculum(data?.sections || []);
      } catch (error) {
        console.log("Error fetching curriculum:", error);
        // Optional: Provide user feedback
        alert("Failed to load curriculum. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculum(search);
  }, [search]);

  const handleAddSection = async () => {
    const idindex = uuidv4(); // Generate a single unique ID
    const newSection = {
      idindex,
      title: "New Section",
      lectures: [],
    };

    // Optimistically update the curriculum state
    setCurriculum((prevSections) => [...prevSections, newSection]);

    const data = {
      newSection,
      search,
    };

    try {
      const response = await fetch(
        `${process.env.API}/admin/curriculumCourse/section`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const { newlyAddedSection } = await response.json();
        console.log("newlyAddedSection", newlyAddedSection);

        // Replace the optimistic update with the server's response
        setCurriculum((prevSections) =>
          prevSections.map((section) =>
            section.idindex === idindex ? newlyAddedSection : section
          )
        );



        
      } else {
        console.error("Failed to add section");
        // Optionally revert the optimistic update
        setCurriculum((prevSections) =>
          prevSections.filter((section) => section.idindex !== idindex)
        );
      }
    } catch (error) {
      console.error("Error adding section:", error);
      // Revert the optimistic update in case of error
      setCurriculum((prevSections) =>
        prevSections.filter((section) => section.idindex !== idindex)
      );
    }
  };

  const handleAddLecture = async (sectionIndex) => {
    try {
      const lectureId = uuidv4(); // Generate ID once
      const newLecture = {
        idindex: lectureId,
        title: "New Lecture",
      };

      const sectionId = curriculum[sectionIndex]._id;

      // Optimistic UI update
      setCurriculum((prevSections) =>
        prevSections.map((section, index) =>
          index === sectionIndex
            ? {
                ...section,
                lectures: [...section.lectures, newLecture],
              }
            : section
        )
      );

      // API call to save the lecture
      const response = await fetch(
        `${process.env.API}/admin/curriculumCourse/section/lecture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newLecture,
            search,
            sectionId,
          }),
        }
      );

      if (response.ok) {
        const savedLecture = await response.json();

        // Replace optimistic update with server response
        setCurriculum((prevSections) =>
          prevSections.map((section, index) =>
            index === sectionIndex
              ? {
                  ...section,
                  lectures: section.lectures.map((lecture) =>
                    lecture.idindex === lectureId ? savedLecture : lecture
                  ),
                }
              : section
          )
        );



        
      } else {
        throw new Error("Failed to save the lecture on the server");
      }
    } catch (error) {
      console.log("Error adding lecture:", error);

      // Revert optimistic update if the API call fails
      setCurriculum((prevSections) =>
        prevSections.map((section, index) =>
          index === sectionIndex
            ? {
                ...section,
                lectures: section.lectures.filter(
                  (lecture) => lecture.idindex !== lectureId
                ),
              }
            : section
        )
      );
    }
  };

  const handleDeleteLecture = async (sectionIndex, lectureId) => {
    setDeletingLecture({ sectionIndex, lectureId });

    console.log("deletingxxxx", { sectionIndex, lectureId });

    const sectionId = curriculum[sectionIndex]?._id;

    const data = {
      sectionId,
      search,
    };

    const response = await fetch(
      `${process.env.API}/admin/curriculumCourse/section/lecture/${lectureId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      setTimeout(() => {
        setCurriculum((prevSections) =>
          prevSections.map((section, index) =>
            index === sectionIndex
              ? {
                  ...section,
                  lectures: section?.lectures.filter(
                    (lecture) => lecture._id !== lectureId
                  ),
                }
              : section
          )
        );

        setDeletingLecture(null);
      }, 2000);
    } else {
      console.log("Failed to delete lecture");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    setDeletingSection(sectionId);

    console.log("section deleting", sectionId);

    const response = await fetch(
      `${process.env.API}/admin/curriculumCourse/section/${sectionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      }
    );

    if (response.ok) {
      setTimeout(() => {
        setCurriculum((prevSections) =>
          prevSections.filter((section) => section._id !== sectionId)
        );

        setDeletingLecture(null);
      }, 2000);
    } else {
      console.log("Failed to delete section");
    }
  };

  const startEditing = (type, sectionIndex, lectureIndex = null) => {
    console.log({ type, sectionIndex, lectureIndex });
    setEditing({ type, sectionIndex, lectureIndex });
    if (type === "section") {
      //real
      // setEditSectionValue(sections[sectionIndex].title);

      setEditSectionValue(curriculum[sectionIndex]?.title);

      console.log("curriculum[sectionIndex]", curriculum[sectionIndex]);
      console.log("editSectionValue", editSectionValue);
    } else if (type === "lecture") {
      setEditLectureValue(
        curriculum[sectionIndex]?.lectures[lectureIndex]?.title
      );
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setEditSectionValue("");
    setEditLectureValue("");
  };

  const handleSaveEdit = async () => {
    if (editing.type === "section") {
      const updatedSection = {
        ...curriculum[editing.sectionIndex],
        title: editSectionValue,
      };

      const data = {
        updatedSection,
        search,
      };

      const response = await fetch(
        `${process.env.API}/admin/curriculumCourse/section/${updatedSection?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("update section", response);

      // real
      // setSections((prevSections) =>
      //   prevSections.map((section, index) =>
      //     index === editing.sectionIndex
      //       ? { ...section, title: editSectionValue }
      //       : section
      //   )
      // );

      if (response.ok) {
        setCurriculum((prevSections) =>
          prevSections.map((section, index) =>
            index === editing.sectionIndex
              ? { ...section, title: editSectionValue }
              : section
          )
        );
      } else {
        console.log("Failed to update section");
      }
    } else if (editing.type === "lecture") {
      const updatedSection = {
        ...curriculum[editing.sectionIndex]?.lectures[editing.lectureIndex],
        title: editLectureValue,
      };

      const sectionId = curriculum[editing.sectionIndex]?._id;

      const data = {
        updatedSection,
        sectionId,
        search,
      };

      console.log("save lacture", data);

      const response = await fetch(
        `${process.env.API}/admin/curriculumCourse/section/lecture/${
          curriculum[editing.sectionIndex]?.lectures[editing.lectureIndex]?._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setCurriculum((prevSections) =>
          prevSections.map((section, sectionIndex) =>
            sectionIndex === editing.sectionIndex
              ? {
                  ...section,
                  lectures: section?.lectures?.map((lecture, lectureIndex) =>
                    lectureIndex === editing.lectureIndex
                      ? { ...lecture, title: editLectureValue }
                      : lecture
                  ),
                }
              : section
          )
        );
      } else {
        console.log("Failed to update lacutre");
      }

      //real
      // setSections((prevSections) =>
      //   prevSections.map((section, sectionIndex) =>
      //     sectionIndex === editing.sectionIndex
      //       ? {
      //           ...section,
      //           lectures: section.lectures.map((lecture, lectureIndex) =>
      //             lectureIndex === editing.lectureIndex
      //               ? { ...lecture, title: editLectureValue }
      //               : lecture
      //           ),
      //         }
      //       : section
      //   )
      // );
    }
    handleCancelEdit();
  };

  const moveSection = async (fromIndex, toIndex) => {
    console.log("cccc", { fromIndex, toIndex });

    const updatedSections = [...curriculum];
    const [movedSection] = updatedSections.splice(fromIndex, 1);
    updatedSections.splice(toIndex, 0, movedSection);
    setCurriculum(updatedSections);

    try {
      await fetch(
        `${process.env.API}/admin/curriculumCourse/section/updateSectionOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sections: updatedSections, search }),
        }
      );
    } catch (error) {
      console.log("Error updating section order:", error);
    }

    //real

    // const updatedSections = [...sections];
    // const [movedSection] = updatedSections.splice(fromIndex, 1);
    // updatedSections.splice(toIndex, 0, movedSection);
    // setSections(updatedSections);
  };

  const moveLecture = async (
    fromSectionIndex,
    fromLectureIndex,
    toSectionIndex,
    toLectureIndex
  ) => {
    console.log({
      fromSectionIndex,
      fromLectureIndex,
      toSectionIndex,
      toLectureIndex,
    });

    const updatedSections = [...curriculum];
    const [movedLecture] = updatedSections[fromSectionIndex].lectures.splice(
      fromLectureIndex,
      1
    );
    updatedSections[toSectionIndex].lectures.splice(
      toLectureIndex,
      0,
      movedLecture
    );
    setCurriculum(updatedSections);

    try {
      await fetch(
        `${process.env.API}/admin/curriculumCourse/section/lecture/updateLectureOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sections: updatedSections, search }),
        }
      );
    } catch (error) {
      console.log("Error updating lecture order:", error);
    }

    // const updatedSections = [...sections];
    // const [movedLecture] = updatedSections[fromSectionIndex].lectures.splice(
    //   fromLectureIndex,
    //   1
    // );
    // updatedSections[toSectionIndex].lectures.splice(
    //   toLectureIndex,
    //   0,
    //   movedLecture
    // );
    // setSections(updatedSections);
  };

 
  const [currentLecture, setCurrentLecture] = useState(null);
 
  const [videourl, setVideourl] = useState("");
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null);

 const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoURL, setVideoURL] = useState("");
  const [buffer, setBuffer] = useState(10); // Buffer state to simulate buffering effect


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const maxSizeInMB = 100; // Set max file size in MB

    if (selectedFile && selectedFile.size > maxSizeInMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeInMB}MB. Please upload a smaller file.`);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setVideoURL("");
    setUploadProgress(0);
    setBuffer(10); // Reset buffer on new file
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
            if (progress % 5 === 0 && buffer < 100) {
              setBuffer(buffer + 1 + Math.random() * 10); // Simulate buffering
            }
          },
        }
      );

      setVideoURL(response.data.secure_url);
      setVideourl(response.data.secure_url);
      setUploadProgress(0); // Reset progress bar after success
      setBuffer(100); // Set buffer to 100 once upload is successful
      console.log("Upload successful!");
    } catch (error) {
      console.log("Error uploading video:", error.response || error.message);
      console.log("Upload failed. Please try again.");
    }
  };

  const handleRemoveVideo = () => {
    setFile(null);
    setVideoURL("");
    setUploadProgress(0);
    setBuffer(10); // Reset buffer when removing video
  };





  const handleOpenVodeoModal = (lecture, sectionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentLecture(lecture);
    setVideourl(lecture.videourl || "");
    setOpenVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setOpenVideoModal(false);
    setCurrentLecture(null);
    setVideourl("");
    setCurrentSectionIndex(null);
  };

  const handleSaveVideoContent = async () => {

    setFile(null);
    setVideoURL("");

    const sectionId = curriculum[currentSectionIndex]?._id;

    const lacturebody = { ...currentLecture, videourl };

    const data = {
      lacturebody,
      sectionId,
      search,
    };

    console.log("dataxxxz", data);

    const response = await fetch(
      `${process.env.API}/admin/curriculumCourse/section/lecture/content/${lacturebody?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      setCurriculum((prevSections) =>
        prevSections.map((section) => ({
          ...section,
          lectures: section?.lectures.map((lecture) =>
            lecture?._id === currentLecture?._id
              ? { ...lecture, videourl }
              : lecture
          ),
        }))
      );
    } else {
      console.log("Failed to update lacutre conent vidourl");
    }

    // setSections((prevSections) =>
    //   prevSections.map((section) => ({
    //     ...section,
    //     lectures: section.lectures.map((lecture) =>
    //       lecture.id === currentLecture.id ? { ...lecture, content } : lecture
    //     ),
    //   }))
    // );
    handleCloseVideoModal();
  };

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      const language = lang && hljs.getLanguage(lang) ? lang : "js";
      try {
        const highlightedCode = hljs.highlight(language, str, true).value;
        return `<pre class="hljs"><code>${highlightedCode}</code></pre>`;
      } catch (error) {
        return ""; // Return an empty string if highlighting fails
      }
    },
  });

  // Display loading indicator while data is loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>




<Box
  sx={{
    mt: 0, // No margin at the top
    padding: "16px",
  
    background: "linear-gradient(90deg, #8A12FC, #FF0080)", // Modern gradient
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Soft shadow
    textAlign: "center",
    mb:4
  }}
>
  <Typography
    variant="h4" // Modern and slightly larger font size
    sx={{
      fontWeight: "bold", // Bold text for emphasis
      color: "#fff", // White text for contrast
      textTransform: "uppercase", // All caps for a modern touch
      letterSpacing: "1.5px", // Slight spacing for readability
    }}
  >
    {coursetitle}
  </Typography>
</Box>





<Tab/>


 <Box

 sx={{
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "16px",
            backgroundColor: "#212121",
            border: "1px solid #E0E0E0",
          }}
        >


      <DndProvider
        backend={HTML5Backend}
        debugMode={true}
        key={JSON.stringify(curriculum)}
      >
        {curriculum?.length > 0 &&
          curriculum?.map((section, sectionIndex) => (
            <DraggableSection
              key={section?.idindex}
              section={section}
              index={sectionIndex}
              moveSection={moveSection}
            >
              <Box
                key={sectionIndex}
                sx={{
                  // backgroundColor: "#212121",

                  backgroundColor:
                    deletingSection === section?._id ? "red" : "#212121",

                  border: "1px solid #E0E0E0",
                  padding: "16px",
                  borderRadius: "4px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ marginBottom: "16px" }}
                  >
                    <DescriptionIcon
                      sx={{ marginRight: "8px", color: "#FFFFFF" }}
                    />
                    Section {sectionIndex + 1}: {section.title}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => startEditing("section", sectionIndex)}
                    >
                      <EditIcon sx={{ color: "#FFFFFF" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteSection(section?._id)}
                    >
                      <DeleteIcon sx={{ color: "#FFFFFF" }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Section editing below the section title */}
                {editing &&
                  editing.type === "section" &&
                  editing.sectionIndex === sectionIndex && (
                    <Box sx={{ marginTop: "16px" }}>
                      <TextField
                        fullWidth
                        value={editSectionValue}
                        onChange={(e) => setEditSectionValue(e.target.value)}
                        sx={{
                          marginBottom: "8px",
                          backgroundColor: "#212121",
                          borderRadius: "4px",
                          color: "#fff",

                          color: "#fff",
                          input: { color: "white" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#fff",
                            },
                            "&:hover fieldset": {
                              borderColor: "#fff",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#fff",
                            },
                          },
                        }}
                      />
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          variant="contained"
                          onClick={handleCancelEdit}
                          sx={{
                            marginRight: "8px",
                            textTransform: "none",
                            border: "1px solid #E0E0E0",
                            color: "#FFFFFF",
                            backgroundColor: "#000",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleSaveEdit}
                          sx={{
                            color: "#FFFFFF",
                            backgroundColor: "#000",
                            textTransform: "none",
                            border: "1px solid #E0E0E0",
                          }}
                        >
                          Save Section
                        </Button>
                      </Box>
                    </Box>
                  )}

                <Box sx={{ marginTop: "16px" }}>
                  {section &&
                    section?.lectures?.map((lecture, lectureIndex) => (
                      <DraggableLecture
                        key={lecture?.idindex}
                        sectionIndex={sectionIndex}
                        lectureIndex={lectureIndex}
                        lecture={lecture}
                        moveLecture={moveLecture}
                      >
                        <Box
                          key={lecture?._id}
                          sx={{
                            backgroundColor:
                              deletingLecture?.sectionIndex === sectionIndex &&
                              deletingLecture?.lectureId === lecture?._id
                                ? "red"
                                : "#333",

                            padding: "16px",
                            borderRadius: "4px",
                            marginBottom: "8px",
                            border: "1px solid #E0E0E0",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                marginBottom: "8px",
                              }}
                            >
                              Lecture {lectureIndex + 1}: {lecture.title}
                            </Typography>
                            <Box>
                              <IconButton
                                onClick={() =>
                                  handleOpenVodeoModal(lecture, sectionIndex)
                                }
                              >
                                {lecture?.videourl ? (
                                  <OndemandVideoIcon sx={{ color: "#fff" }} />
                                ) : (
                                  <PersonalVideoIcon sx={{ color: "#fff" }} />
                                )}
                              </IconButton>

                              <IconButton
                                onClick={() =>
                                  startEditing(
                                    "lecture",
                                    sectionIndex,
                                    lectureIndex
                                  )
                                }
                              >
                                <EditIcon sx={{ color: "#fff" }} />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  handleDeleteLecture(sectionIndex, lecture._id)
                                }
                              >
                                <DeleteIcon sx={{ color: "#fff" }} />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Lecture editing below the lecture title */}
                          {editing &&
                            editing.type === "lecture" &&
                            editing.sectionIndex === sectionIndex &&
                            editing.lectureIndex === lectureIndex && (
                              <Box sx={{ marginTop: "16px" }}>
                                <TextField
                                  fullWidth
                                  value={editLectureValue || ""}
                                  onChange={(e) =>
                                    setEditLectureValue(e.target.value)
                                  }
                                  sx={{
                                    marginBottom: "8px",
                                    backgroundColor: "#212121",
                                    borderRadius: "4px",
                                    color: "#fff",
                                    input: { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderColor: "#fff",
                                      },
                                      "&:hover fieldset": {
                                        borderColor: "#fff",
                                      },
                                      "&.Mui-focused fieldset": {
                                        borderColor: "#fff",
                                      },
                                    },
                                  }}
                                />
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    onClick={handleCancelEdit}
                                    sx={{
                                      marginRight: "8px",
                                      textTransform: "none",
                                      border: "1px solid #E0E0E0",
                                      color: "#FFFFFF",
                                      backgroundColor: "#000",
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={handleSaveEdit}
                                    sx={{
                                      color: "#FFFFFF",
                                      backgroundColor: "#000",
                                      textTransform: "none",
                                      border: "1px solid #E0E0E0",
                                    }}
                                  >
                                    Save Lecture
                                  </Button>
                                </Box>
                              </Box>
                            )}
                        </Box>
                      </DraggableLecture>
                    ))}
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddLecture(sectionIndex)}
                    sx={{
                      marginTop: "8px",
                      color: "#FFFFFF",
                      backgroundColor: "#000",
                      textTransform: "none",
                    }}
                  >
                    Add Lecture
                  </Button>
                </Box>
              </Box>
            </DraggableSection>
          ))}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSection}
          sx={{
            marginTop: "16px",
            color: "#FFFFFF",
            backgroundColor: "#000",
            textTransform: "none",
          }}
        >
          Add Section
        </Button>

        {/* Modal for editing lecture video content */}
     
{/* Modal for editing lecture video content */}
<Modal open={openVideoModal} onClose={handleCloseVideoModal}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxHeight: "90vh", // Limit the modal's height
      overflowY: "auto", // Enable vertical scrolling
      bgcolor: "#212121",
      border: "2px solid #000",
      p: 4,
      borderRadius: 2, // Optional: for rounded corners
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      Edit Lecture{"   "}
      {currentLecture?.title}
    </Typography>

    <Card
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        p: 2,
       
        borderRadius: 2,
        bgcolor: "#212121",
        color: "white",
      }}
    >
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          🎥 Video Uploader
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          component="label"
          sx={{
            width: "100%",
            p: 2,
            borderRadius: 1,
            mt: 2,
            textTransform: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            fontSize: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {file ? file.name : "Select Video"}
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            hidden
          />
        </Button>

        {uploadProgress > 0 && (
          <Box
            sx={{
              mt: 3,
              position: "relative",
              width: "100%",
              height: 30,
              borderRadius: 4,
              backgroundColor: "#122121",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <LinearProgress
              variant="buffer"
              value={uploadProgress}
              valueBuffer={buffer}
              sx={{
                height: "100%",
                borderRadius: 4,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#8A12FC",
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#fff",
                fontWeight: "bold",
                lineHeight: "30px",
              }}
            >
              {uploadProgress}%
            </Typography>
          </Box>
        )}

        {videoURL && (
          <Box sx={{ mt: 3, position: "relative" }}>
            <Typography variant="subtitle1">Uploaded Video:</Typography>
            <video
              src={videoURL}
              controls
              style={{
                width: "100%",
                borderRadius: "8px",
                marginTop: "10px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <IconButton
              aria-label="remove video"
              onClick={handleRemoveVideo}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "rgba(240, 13, 13, 0.8)",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                "&:hover": { background: "red" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
          sx={{
            textTransform: "capitalize",
            px: 3,
            py: 1.5,
            mt: 2,
            borderRadius: 2,
            backgroundColor: "#8A12FC",
          }}
        >
          Upload Video
        </Button>
      </CardActions>
    </Card>

    {currentLecture && currentLecture.videourl ? (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          padding: "16px",
          backgroundColor: "#212121",
        }}
      >
        <ReactPlayer
          url={currentLecture.videourl}
          width="100%"
          height="100%"
          controls
          light={true}
          playing={false}
        />
      </Box>
    ) : (
      <Box sx={{ padding: "16px", textAlign: "center" }}>
        <p>No video available for this lecture.</p>
      </Box>
    )}

    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
      <Button
        variant="outlined"
        onClick={handleCloseVideoModal}
        sx={{ marginRight: "8px" }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={handleSaveVideoContent}
        sx={{ color: "#fff", backgroundColor: "#000" }}
      >
        Save
      </Button>
    </Box>
  </Box>
</Modal>

    
      </DndProvider>

      </Box>
      <SideBar/>
    </>
  );
};

export default CurriculumEditor;
