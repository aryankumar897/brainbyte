import React, { useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const SearchBar = () => {
 


    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
  

   

    // Handle input change and fetch data
    const handleInputChange = async (event) => {
      const value = event.target.value;
      setSearchTerm(value);
  
  // Handle Enter key press to reset
  if (event.key === "Enter") {
    setSearchTerm("");
    setFilteredSuggestions([]);
    setError(null);
    setLoading(false);
    return;
  }


      if (value.trim() === "") {
        setFilteredSuggestions([]);
     
        setError(null); // Reset any existing error
        return;
      }
  
      setLoading(true);
      setError(null);
  
      try {


        const response = await fetch(`${process.env.API}/search/${value}`);
       
       
        const data = await response.json();
  
        if (response.ok) {
          const suggestions = [];
  
          // Handle curriculum data
          data.forEach(curriculum => {
            // Add the curriculum itself as a suggestion
            suggestions.push({ type: "curriculum", ...curriculum });
  
            // Handle lectures within each curriculum
            curriculum.sections.forEach(section => {
              section.lectures.forEach(lecture => {
                suggestions.push({
                  type: "lecture",
                  curriculumTitle: curriculum.title,
                  sectionTitle: section.title,
                  lecture: lecture,
                });
              });
            });
          });
  
          // Set filtered suggestions
          setFilteredSuggestions(suggestions);
        } else {
          setError("No data found");
          setFilteredSuggestions([]);
        }
      } catch (err) {
        setError("Failed to fetch data");
        setFilteredSuggestions([]);
      } finally {
        
           
        setLoading(false);
      }
    };
  


  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "curriculum") {
      router.push(`/content/${suggestion?.slug}`);
    } else if (suggestion.type === "lecture") {
      // Adjusted path for lecture
      router.push(`/content/${suggestion?.lecture?.slug}`);
    }
  };
  

  return (
    <Box sx={{ maxWidth: "400px", mx: "auto", mt: 4 }}>
      {/* Search Input */}
      <TextField
        fullWidth
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleInputChange}
        variant="outlined"
        sx={{
          bgcolor: "green",
          color: "white",
          borderRadius: "8px",
        }}
      />

      {/* Loading state */}
      {loading && <Typography sx={{ color: "#fff" }}>Loading...</Typography>}

      {/* Error state */}
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

      {/* Suggestions List */}
      {filteredSuggestions.length > 0 && (
        <List
          sx={{
            bgcolor: "black",
            border: "1px solid #ccc",
            borderRadius: "8px",
            mt: 1,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              component="button" // Use this to make it a button
              onClick={() => handleSuggestionClick(suggestion)}
              sx={{
                bgcolor: "transparent", // Transparent background by default
                borderRadius: "8px",
                padding: "12px",
                "&:hover": {
                  bgcolor: "#212121", // Light gray background on hover
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow on hover
                },
                cursor: "pointer", // Pointer cursor to indicate it is clickable
                transition: "background-color 0.3s ease, box-shadow 0.3s ease", // Smooth transition effect
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500, // Make the text slightly bolder
                      fontSize: "16px", // Adjust the font size for better readability
                      color: "#fff", // Dark text color
                      "&:hover": {
                        color: "#0073e6", // Change text color on hover for better interactivity
                      },
                    }}
                  >
                    {suggestion.type === "curriculum"
                      ? suggestion.title
                      : `${suggestion.sectionTitle} - ${suggestion.lecture.title}`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* No results found */}
      {filteredSuggestions.length === 0 && !loading && !error && searchTerm.trim() !== ""    && (
        <Typography sx={{ color: "#fff", mt: 2 }}>Data not found</Typography>
      )} 

 

    </Box>
  );
};

export default SearchBar;
