import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger icon
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TranslateIcon from "@mui/icons-material/Translate";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import Page from "@/components/loginmodal/Page";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import CategoryMenu from "@/components/categorymenu/Category";
const NavBar = () => {







  
  // State hooks for managing drawer and hover states
  const [drawerOpen, setDrawerOpen] = useState(false); // Tracks whether the drawer is open or closed
  const [hoveredIndex, setHoveredIndex] = useState(null); // Tracks the index of the menu item being hovered over

  // Next.js session hook to get session data and status (useful for authenticated users)
  const { data: session, status } = useSession();

  // Next.js router hook to handle page navigation programmatically
  const router = useRouter();

  // Array of menu items that will be displayed in the drawer
  const menuItems = ["Courses", "Jobs", "Practice", "Contests"];

  // Function to toggle the drawer open or closed
  const toggleDrawer = (open) => (event) => {
    // Prevents closing the drawer when pressing 'Tab' or 'Shift' (important for accessibility and keyboard navigation)
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open); // Toggles the drawer state
  };

  // const [drawerOpen, setDrawerOpen] = useState(false); // Manage drawer state
  // const [hoveredIndex, setHoveredIndex] = useState(null); // Track hover state
  // const { data: session, status } = useSession();

  // const router = useRouter();
  // const menuItems = ["Courses", "Jobs", "Practice", "Contests"];

  // const toggleDrawer = (open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setDrawerOpen(open);
  // };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1A1A1A", color: "#fff", height: 80 }}
      >
        <Toolbar>
          {/* Left Side (Menu Items for larger screens) */}
          <Box
            display={{ xs: "none", md: "flex" }}
            flexGrow={1}
            alignItems="center"
          >
            {menuItems.slice(0, 1).map((item, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  marginRight: 2,
                  cursor: "pointer",
                  "&:hover .arrowIcon": {
                    transform: "rotate(180deg)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ marginRight: 1 }}>
                  {item}
                </Typography>
                <KeyboardArrowDownIcon
                  className="arrowIcon"
                  sx={{
                    transition: "transform 0.3s",
                    transform:
                      hoveredIndex === index ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </Box>
            ))}

            <CategoryMenu />

            {menuItems.slice(1).map((item, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  marginRight: 2,
                  cursor: "pointer",
                  "&:hover .arrowIcon": {
                    transform: "rotate(180deg)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ marginRight: 1 }}>
                  {item}
                </Typography>
                <KeyboardArrowDownIcon
                  className="arrowIcon"
                  sx={{
                    transition: "transform 0.3s",
                    transform:
                      hoveredIndex === index ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Centered Logo */}
          <Box
            onClick={() => router.push("/")}
            sx={{
              flexGrow: 9000008,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 28,
            }}
          >
            <img
              src="/images/logo2.png" // Replace with your logo's path
              alt="Logo"
              style={{
                height: 60,
                cursor: "pointer",
                borderRadius: "50%", // This makes it circular
                width: 60, // Ensure the width and height are equal to maintain the circular shape
              }}
            />
          </Box>

          {/* Right Side (Search, Notifications, Translate, and Sign In) */}
          <Box display="flex" alignItems="center">
            <IconButton
              sx={{ color: "#fff", display: { xs: "none", md: "block" } }}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#fff", display: { xs: "none", md: "block" } }}
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#fff", display: { xs: "none", md: "block" } }}
            >
              <TranslateIcon />
            </IconButton>

            {status === "authenticated" ? (
              session?.user?.image && (
                <img
                  src={session?.user?.image || "/images/pic1.png"} // Fallback for default avatar
                  alt="User Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    router.push(
                      session?.user?.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    )
                  }
                />
              )
            ) : (
              <Page />
            )}

            {/* Hamburger Icon for Small Devices */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Drawer for Small Devices */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 250,
              backgroundColor: "#1A1A1A",
              height: "100%",
              color: "#fff",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ padding: 2, borderTop: "1px solid #333" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#00796B",
                  "&:hover": { backgroundColor: "#005A4F" },
                }}
              >
                Sign In
              </Button>
            </Box>

            <List>
              {menuItems.map((text, index) => (
                <div key={index}>
                  <ListItem sx={{ textAlign: "left" }}>
                    <Typography sx={{ p: 1 }}>{text}</Typography>
                  </ListItem>
                  <Divider
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#a3a3c2",
                    }}
                  />
                </div>
              ))}
            </List>
            {/* Login Button at the Bottom */}
          </Box>
        </Drawer>
      </AppBar>
    </>
  );
};

export default NavBar;
