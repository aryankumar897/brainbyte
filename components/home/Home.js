import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import Typewriter from "typewriter-effect";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import ReactPlayer (ensures it’s client-side only)
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Responsive breakpoint
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false); // State to track input focus

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
        data.forEach((curriculum) => {
          // Add the curriculum itself as a suggestion
          suggestions.push({ type: "curriculum", ...curriculum });

          // Handle lectures within each curriculum
          curriculum.sections.forEach((section) => {
            section.lectures.forEach((lecture) => {
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
    <>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1c1c", // Exact dark background
          color: "#ffffff",
          px: 2,
        }}
      >
        {/* <SearchBar/> */}
        {/* Title */}
        <Typography
          variant={isMobile ? "h5" : "h3"}
          sx={{ mb: 3, fontWeight: 700, textAlign: "center" }}
        >
          Hello, What Do You Want To Learn?
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
            maxWidth: "800px",
            position: "relative", // For positioning typewriter placeholder
          }}
        >
          <TextField
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleInputChange}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "#2c2c2c", // Input field background
              borderRadius: "5%", // Rounded border
              "& .MuiOutlinedInput-root": {
                color: "#ffffff", // White text
                "& fieldset": { borderColor: "#4caf50" }, // Green border
                "&:hover fieldset": { borderColor: "#66bb6a" }, // Lighter green on hover
                "&.Mui-focused fieldset": { borderColor: "#4caf50" }, // Green border on focus
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "#4caf50", // Green search icon
                      cursor: "pointer",
                    }}
                    //   onClick={handleSearch} // Trigger search on click
                  />
                </InputAdornment>
              ),
            }}
            //  value={searchTerm}
            //   onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)} // Track focus
            onBlur={() => setIsFocused(false)} // Track blur
          />
          {/* Custom placeholder with typewriter effect */}
          {!isFocused && (
            <Box
              sx={{
                position: "absolute",
                left: "12px", // Adjust based on input field padding
                top: "50%",
                transform: "translateY(-50%)",
                color: "#ffffff",
                pointerEvents: "none", // Prevent interaction with the placeholder
                zIndex: 1, // Make sure it's above the TextField
                marginLeft: "33px", // Left margin for the typewriter text
              }}
            >
              <Typewriter
                options={{
                  strings: [
                    "Code is like humor. When you have to explain it, it’s bad.",
                    "Talk is cheap. Show me the code.",
                    "First, solve the problem. Then, write the code.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50, // Speed of typing
                  deleteSpeed: 30, // Speed of deleting
                }}
              />
            </Box>
          )}
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#424242", // Gray button background
              color: "#ffffff",
              px: 3,
              py: 1,
              borderRadius: 1,
              "&:hover": { backgroundColor: "#616161" }, // Darker gray hover
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Master DS & ML
          </Box>
          <Box
            onClick={() => router.push("/pricing")}
            sx={{
              backgroundColor: "#FFC107", // Green button
              color: "#000",
              px: 3,
              py: 1,
              borderRadius: 1,
              "&:hover": { backgroundColor: "#FFC107" }, // Hover effect
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Go Premium
          </Box>
          <Box
            sx={{
              backgroundColor: "#424242", // Gray button
              color: "#ffffff",
              px: 3,
              py: 1,
              borderRadius: 1,
              "&:hover": { backgroundColor: "#616161" }, // Hover effect
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Full Stack Live Classes
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: "800px",
          transform:
            filteredSuggestions.length > 0
              ? "translateY(-270px)"
              : "translateY(0)", // Move up if suggestions exist
          transition: "transform 0.3s ease-in-out", // Smooth animation

          mx: "auto",
          mt: 4,
        }}
      >
        {/* Loading state */}

        {loading && (
          <Typography
            sx={{
              maxWidth: "800px",
              color: "#fff", // White text color
              backgroundColor: "#212121", // Blue background
              padding: "10px 14px", // Add padding
              borderRadius: "8px", // Rounded corners
              textAlign: "center", // Center-align text
              fontWeight: "bold", // Bold text
              fontSize: "16px", // Adjust font size
              boxShadow: "0px 4px 8px rgba(0, 0, 255, 0.4)", // Subtle shadow for depth
              mx: "auto",
              mt: 4,
              //width: "fit-content", // Adjust width to fit the text
              animation: "pulse 1.5s infinite", // Add the animation

              transform:
                filteredSuggestions.length === 0
                  ? "translateY(-270px)"
                  : "translateY(0)", // Move up if suggestions exist

              transition: "transform 0.3s ease-in-out", // Smooth animation
              mx: "auto",
            }}
            style={{
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.05)",
                  opacity: 0.8,
                },
                "100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          >
            Loading...
          </Typography>
        )}

        {/* Error state */}
        {error && (
          <Typography
            sx={{
              color: "white", // White text for better contrast
              backgroundColor: "red", // Red background for better visibility
              padding: "12px 16px", // Add padding for spacing
              borderRadius: "8px", // Rounded corners
              boxShadow: "0px 4px 8px rgba(255, 0, 0, 0.4)", // Subtle shadow for depth
              maxWidth: "800px",
              textAlign: "center", // Center align the text
              fontWeight: "bold", // Bold text for emphasis
              fontSize: "16px", // Adjust font size
              transform:
                filteredSuggestions.length === 0
                  ? "translateY(-270px)"
                  : "translateY(0)", // Move up if suggestions exist
              transition: "transform 0.3s ease-in-out", // Smooth animation
              mx: "auto",
              mt: 4,
            }}
          >
            {error}
          </Typography>
        )}

        {/* Suggestions List */}
        {filteredSuggestions.length > 0 && (
          <List
            sx={{
              bgcolor: "#212121",
              border: "1px solid #fff",
              borderRadius: "8px",
              mt: isMobile ? 12.5 : 1,
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
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease", // Smooth transition effect
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      component="div"
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
                        : `${suggestion.sectionTitle} - ${suggestion.lecture.title}  `}

                      {suggestion.type !== "curriculum" &&
                        suggestion.lecture.videourl && (
                          <div
                            style={{
                              position: "relative",
                              paddingTop: "56.25%", // 16:9 aspect ratio
                              width: "100%",
                              maxWidth: "780px",
                              margin: "0 auto",
                              border: "1px solid #fff",
                            }}
                          >
                            <ReactPlayer
                              url={suggestion?.lecture?.videourl}
                              width="100%"
                              height="100%"
                              controls
                              light={true}
                              playing={false}
                              style={{ position: "absolute", top: 0, left: 0 }}
                            />
                          </div>
                        )}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        {/* No results found */}
        {filteredSuggestions.length === 0 &&
          !loading &&
          !error &&
          searchTerm.trim() !== "" && (
            <Typography
              sx={{
                color: "#fff",

                maxWidth: "800px",
                transform:
                  filteredSuggestions.length < 0
                    ? "translateY(-270px)"
                    : "translateY(0)", // Move up if suggestions exist
                transition: "transform 0.3s ease-in-out", // Smooth animation

                mx: "auto",
                mt: 4,
              }}
            >
              Data not found
            </Typography>
          )}
      </Box>
    </>
  );
};

export default HeroSection;
