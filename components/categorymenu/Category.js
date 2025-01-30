"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const categories = [
  {
    name: "Category 11",
    subcategories: [
      { name: "Subcategory 1-1", children: ["Child 1-1-1", "Child 1-1-2"] },
      { name: "Subcategory 1-2", children: [] },
      { name: "Subcategory 1-3", children: ["Child 1-3-1"] },
    ],
  },
  {
    name: "Category 2",
    subcategories: [],
  },
  {
    name: "Category 3",
    subcategories: [
      { name: "Subcategory 3-1", children: [] },
      { name: "Subcategory 3-2", children: ["Child 3-2-1", "Child 3-2-2"] },
    ],
  },
];

const CategoryMenu = () => {
  const router = useRouter();
  const [arrowRotated, setArrowRotated] = useState(false);

  const handleMouseEnter = () => setArrowRotated(true);
  const handleMouseLeave = () => setArrowRotated(false);
  const handleCategoryClick = () => console.log("Categories clicked!");

  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [hoveredSubcategoryIndex, setHoveredSubcategoryIndex] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategoryHover = (index) => setHoveredCategoryIndex(index);
  const handleSubcategoryHover = (index) => setHoveredSubcategoryIndex(index);

  const handleCategoryTextHover = () => setIsCategoryOpen(true);
  const handleCategoryTextLeave = () => {
    setIsCategoryOpen(false);
    setHoveredCategoryIndex(null);
    setHoveredSubcategoryIndex(null);
  };

  const handleCategoryTextClick = () => setIsCategoryOpen((prev) => !prev);

  const renderSubcategories = (subcategories) => (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "100%",
        backgroundColor: "#1c1c1c",
        color: "white",
        borderTop: "8px solid green",
        zIndex: 10,
        padding: 1,
      }}
    >
      <List>
        {subcategories.map((subcategory, index) => (
          <ListItem
            key={index}
            onMouseEnter={() => handleSubcategoryHover(index)}
            onMouseLeave={() => setHoveredSubcategoryIndex(null)}
            onClick={() => router.push(`/content/${subcategory?.slug}`)}
            sx={{
              cursor: "pointer",
              backgroundColor: "#1A1A1A",
              color: "white",
              //  border: '1px solid green',
              padding: "12px 16px",
              "&:hover": { backgroundColor: "#66bb6a", color: "white" },
              display: "flex",
              alignItems: "center", // Ensures vertical alignment
            }}
          >
            <ListItemText
              primary={subcategory.name}
              sx={{
                whiteSpace: "nowrap", // Prevents text wrapping
                overflow: "hidden", // Hides overflowing text
                textOverflow: "ellipsis", // Adds ellipsis for overflowing text
                paddingRight: 2, // Space between text and arrow
              }}
            />
            {subcategory.children.length > 0 && (
              <ListItemIcon sx={{ minWidth: 0, marginLeft: 10 }}>
                <ArrowForwardIosIcon
                  sx={{
                    color: "white",
                    transform:
                      hoveredSubcategoryIndex === index
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </ListItemIcon>
            )}
            {hoveredSubcategoryIndex === index &&
              subcategory.children.length > 0 &&
              renderChildCategories(subcategory.children)}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderChildCategories = (children) => (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "100%",
        backgroundColor: "#1c1c1c",
        color: "white",
        borderTop: "8px solid green",
        zIndex: 10,
        padding: 1,
      }}
    >
      <List>
        {children.map((child, index) => (
          <ListItem
            key={index}
            onClick={() => router.push(`/content/${child?.slug}`)}
            sx={{
              cursor: "pointer",
              backgroundColor: "#1A1A1A",
              color: "white",
              //   borderTop: '8px solid green',
              padding: "12px 66px",
              "&:hover": { backgroundColor: "#66bb6a", color: "white" },
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemText
              primary={child.title}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [categorydata, setcategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCurriculum = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.API}/homepage/catwithsubcate`);
    const data = await response.json();
    console.log("datax444", data);

    // setCurriculum(processedSections?.sections || []);

    setcategoryData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const formattedCategories = categorydata.reduce((acc, item) => {
    const categoryName = item.categoryId.name;
    const categorySlug = item.categoryId.slug;
    const subcategoryName = item.subcategoryId.name;
    const subcategorySlug = item.subcategoryId.slug;
    const children = item.title
      ? [{ title: item.title, subtitle: item.subtitle ,slug:item.slug}]
      : [];

    let category = acc.find((c) => c.name === categoryName);

    if (!category) {
      category = { name: categoryName, slug: categorySlug, subcategories: [] };
      acc.push(category);
    }

    let subcategory = category.subcategories.find(
      (sc) => sc.name === subcategoryName
    );

    if (!subcategory) {
      subcategory = {
        name: subcategoryName,
        slug: subcategorySlug,
        children: [],
      };
      category.subcategories.push(subcategory);
    }

    subcategory.children = subcategory.children.concat(children);

    return acc;
  }, []);

  console.log("formattedCategories==========");
  console.log(JSON.stringify(formattedCategories, null, 2));

  return (
<>


{/* {JSON.stringify(formattedCategories, null, 4)} */}

    <div
      style={{ position: "relative" }}
      onMouseLeave={handleCategoryTextLeave}
    >
      {/* <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          mx: 2,
          color: 'white',
          textDecoration: 'none',
        }}
        onMouseEnter={handleCategoryTextHover}
        onClick={handleCategoryTextClick}
      >
        Categories
      </Typography> */}

      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCategoryClick}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mx: 2,
          color: "white",
          textDecoration: "none",
          transition: "color 0.3s ease",
          "&:hover": {
            color: "lightgreen", // Optional hover effect for text color
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginRight: "8px", // Space between text and icon
          }}
          onMouseEnter={handleCategoryTextHover}
          onClick={handleCategoryTextClick}
        >
          Tutorials
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "white",
            fontSize: "1.5rem",
            transform: arrowRotated ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>
      {isCategoryOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#1c1c1c",
            color: "white",
            borderTop: "6px solid green",
            zIndex: 10,
            padding: 1,
          }}
        >
          <List>
            {formattedCategories.map((category, index) => (
              <ListItem
                key={index}
                onMouseEnter={() => handleCategoryHover(index)}
                onMouseLeave={() => setHoveredCategoryIndex(null)}
                onClick={() => router.push(`/content/${category?.slug.toLowerCase()}`)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#1A1A1A",
                  color: "white",
                  //  border: '1px solid green',
                  padding: "12px 16px",
                  "&:hover": { backgroundColor: "#66bb6a", color: "white" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={category.name}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: 2,
                  }}
                />
                {category.subcategories.length > 0 && (
                  <ListItemIcon sx={{ minWidth: 0, marginLeft: 10 }}>
                    <ArrowForwardIosIcon
                      sx={{
                        color: "white",
                        transform:
                          hoveredCategoryIndex === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </ListItemIcon>
                )}
                {hoveredCategoryIndex === index &&
                  renderSubcategories(category.subcategories)}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </div>

</>

  );
};

export default CategoryMenu;
