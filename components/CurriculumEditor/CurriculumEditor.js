"use client";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import { imageUpload } from "@/components/functions/Upload";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import NotesIcon from "@mui/icons-material/Notes";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Modal,
} from "@mui/material";
import dynamic from "next/dynamic";
import Tab from "./Tab";
import SideBar from "@/components/sidebar/Sidebar";

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

  console.log("searchx", search);

  const [sections, setSections] = useState([
    {
      id: uuidv4(),
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
  const [coursetitle, setcourseTitle] = useState("");

  const fetchCurriculum = async (searchId) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.API}/singlecurriculum/${searchId}`
    );
    const data = await response.json();
    console.log("datax", data);

    // setCurriculum(processedSections?.sections || []);
    setcourseTitle(data?.title);

    setCurriculum(data?.sections || []);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      fetchCurriculum(search);
    }
  }, [search]);

  const handleAddSection = async () => {
    // setCurriculum((prevSections) => [
    //   ...prevSections,
    //   {
    //     idindex: uuidv4(),
    //     title: `New Section`,
    //     lectures: [],
    //   },
    // ]);

    // const newSection = {
    //   idindex: uuidv4(),
    //   title: "New Section",
    //   lectures: [],
    // };

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
      const response = await fetch(`${process.env.API}/admin/Curriculum/section`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {

        // const savedSection = await response.json();
        // setSections((prevSections) => [...prevSections, savedSection]);
     
        const { newlyAddedSection } = await response.json();
        console.log("newlyAddedSection", newlyAddedSection);

        // Replace the optimistic update with the server's response
        setCurriculum((prevSections) =>
          prevSections.map((section) =>
            section.idindex === idindex ? newlyAddedSection : section
          )
        );


     
      } else {

        console.log("Failed to add section");
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
    console.log(
      "add lac curriculum[sectionIndex]",
      curriculum[sectionIndex]._id
    );



    // setCurriculum((prevSections) =>
    //   prevSections.map((section, index) =>
    //     index === sectionIndex
    //       ? {
    //           ...section,
    //           lectures: [
    //             ...section.lectures,
    //             { idindex: uuidv4(), title: `New Lecture` },
    //           ],
    //         }
    //       : section
    //   )
    // );

    // const newLecture = {
    //   idindex: uuidv4(),
    //   title: "New Lecture",
    // };



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








   // const sectionId = curriculum[sectionIndex]._id;

    const data = {
      newLecture,
      search,
      sectionId,
    };

    const response = await fetch(
      `${process.env.API}/admin/Curriculum/section/lecture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
      console.log("Failed to add lecture");
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
      `${process.env.API}/admin/Curriculum/section/lecture/${lectureId}`,
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
      console.error("Failed to delete lecture");
    }
  };

  const handleDeleteSection = async (sectionId) => {
    setDeletingSection(sectionId);

    console.log("section deleting", sectionId);

    const response = await fetch(
      `${process.env.API}/admin/Curriculum/section/${sectionId}`,
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
        `${process.env.API}/admin/Curriculum/section/${updatedSection?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("update section", response);

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
        `${process.env.API}/admin/Curriculum/section/lecture/${
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
      await fetch(`${process.env.API}/admin/Curriculum/section/updateSectionOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: updatedSections, search }),
      });
    } catch (error) {
      console.error("Error updating section order:", error);
    }
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
        `${process.env.API}/admin/Curriculum/section/lecture/updateLectureOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sections: updatedSections, search }),
        }
      );
    } catch (error) {
      console.error("Error updating lecture order:", error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [content, setContent] = useState("");
  const [videourl, setVideourl] = useState("");
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null);

  const handleOpenModal = (lecture, sectionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentLecture(lecture);
    setContent(lecture.content || "");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentLecture(null);
    setContent("");
    setCurrentSectionIndex(null);
  };

  const handleSaveContent = async () => {
    const sectionId = curriculum[currentSectionIndex]?._id;

    const lacturebody = { ...currentLecture, content };

    const data = {
      lacturebody,
      sectionId,
      search,
    };

    console.log("dataxxxz", data);

    const response = await fetch(
      `${process.env.API}/admin/Curriculum/section/lecture/content/${lacturebody?._id}`,
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
              ? { ...lecture, content }
              : lecture
          ),
        }))
      );
    } else {
      console.log("Failed to update lacutre conent");
    }

    // setSections((prevSections) =>
    //   prevSections.map((section) => ({
    //     ...section,
    //     lectures: section.lectures.map((lecture) =>
    //       lecture.id === currentLecture.id ? { ...lecture, content } : lecture
    //     ),
    //   }))
    // );
    handleCloseModal();
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
    const sectionId = curriculum[currentSectionIndex]?._id;

    const lacturebody = { ...currentLecture, videourl };

    const data = {
      lacturebody,
      sectionId,
      search,
    };

    console.log("dataxxxz", data);

    const response = await fetch(
      `${process.env.API}/admin/Curriculum/section/lecture/content/${lacturebody?._id}`,
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

  return (
    <>
      <Box
        sx={{
          mt: 0, // No margin at the top
          padding: "16px",

          background: "linear-gradient(90deg, #8A12FC, #FF0080)", // Modern gradient
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Soft shadow
          textAlign: "center",
          mb: 4,
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

      <Tab />

      <DndProvider backend={HTML5Backend}>
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
          {curriculum &&
            curriculum?.map((section, sectionIndex) => (
              <DraggableSection
                key={section?.idindex}
                section={section}
                index={sectionIndex}
                moveSection={moveSection}
              >
                <Box
                  key={section?._id}
                  sx={{
                    // backgroundColor: "#212121",

                    backgroundColor:
                      deletingSection === section?._id ? "red" : "#212121",

                    border: "1px solid #E0E0E0",
                    padding: "16px",
                    borderRadius: "4px",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
                        onClick={() => handleDeleteSection(section._id)}
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
                        <Box
                          sx={{ display: "flex", justifyContent: "flex-end" }}
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
                                deletingLecture?.sectionIndex ===
                                  sectionIndex &&
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
                                    handleOpenModal(lecture, sectionIndex)
                                  }
                                >
                                  {lecture?.content ? (
                                    <LibraryAddCheckIcon
                                      sx={{ color: "#fff" }}
                                    />
                                  ) : (
                                    <NotesIcon sx={{ color: "#fff" }} />
                                  )}
                                </IconButton>

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
                                    handleDeleteLecture(
                                      sectionIndex,
                                      lecture._id
                                    )
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

          {/* Modal for editing lecture content */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                bgcolor: "#212121",
                border: "2px solid #000",
                // boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Edit Lecture{"   "}
                {currentLecture?.title}
              </Typography>
              {/* <Editor
              //  value={content}
                defaultValue={content}
               // onChange={(value) => setContent(value)}

                onChange={(v) => {
                  setContent(v());
                 // localStorage.setItem("post-content", JSON.stringify(v()));
                }}
              //  uploadImage={uploadImage}
               // theme="snow"
                style={{
                  height: "auto", // Set the editor height
                  marginBottom: "16px", // Add space below the editor
                  //  border: '1px solid #ccc', // Add a light border
                  borderRadius: "8px", // Make the border corners rounded
                  padding: "8px",
                  // Add padding inside the editor
                }}
              /> */}

              <MdEditor
                value={content}
                style={{
                  height: "80vh", // Set the editor height
                }}
                // renderHTML={(text) => new MarkdownIt().render(text)}
                onChange={({ text }) => setContent(text)}
                renderHTML={(text) => md.render(text)} // Use the initialized md
                onImageUpload={(file) => imageUpload(file)}
                placeholder="Write your Content here..."
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{ marginRight: "8px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveContent}
                  sx={{ color: "#fff", backgroundColor: "#000" }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Modal for editing lecture video content */}
          <Modal open={openVideoModal} onClose={handleCloseVideoModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                bgcolor: "#212121",
                border: "2px solid #000",
                // boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Edit Lecture{"   "}
                {currentLecture?.title}
              </Typography>

              <TextField
                label="Add VideoURL"
                variant="outlined"
                fullWidth
                value={videourl}
                onChange={(e) => setVideourl(e.target.value)}
                InputLabelProps={{
                  style: { color: "#8A12FC" },
                }}
                sx={{
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#8A12FC",
                    },
                    "&:hover fieldset": {
                      borderColor: "#8A12FC",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#8A12FC",
                    },
                  },
                }}
              />

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
        </Box>
      </DndProvider>

      <SideBar />
    </>
  );
};

export default CurriculumEditor;
