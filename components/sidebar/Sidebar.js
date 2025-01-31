import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation"; // Import useRouter
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import CategoryIcon from "@mui/icons-material/Category";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoneyIcon from "@mui/icons-material/Money";

const Sidebar = () => {

// State hooks to manage the local state of the component
const [drawerOpen, setDrawerOpen] = useState(false); // Tracks whether the drawer is open or closed (default is closed)
const [isHovered, setIsHovered] = useState(false); // Tracks whether the drawer item is being hovered over (default is false)

// Material-UI theme hook for accessing the current theme (e.g., color, breakpoints)
const theme = useTheme();

// Media query hook to check if the screen is small (mobile-first responsiveness)
const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

// Next.js router hook to programmatically navigate between pages
const router = useRouter();

// Menu items array, where each item corresponds to a link and its respective icon
const menuItems = [
  {
    text: "Dashboard", // The text label for the menu item
    icon: <HomeIcon sx={{ fontSize: "32px" }} />, // The icon displayed with the menu item
    link: "/dashboard/admin", // The path the user will be routed to when this item is clicked
  },
  {
    text: "Create Content & Courses",
    icon: <ChatIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/admin/content/create",
  },
  {
    text: "Courses",
    icon: <BarChartIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/admin/create/course",
  },
  {
    text: "Tutorials",
    icon: <BuildIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/admin/create/content",
  },
  {
    text: "Home Page",
    icon: <LiveHelpIcon sx={{ fontSize: "32px" }} />,
    link: "/",
  },

  // New links added to the menu for category and subcategory management
  {
    text: "Create Category",
    icon: <CategoryIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/admin/create/category",
  },
  {
    text: "Create SubCategory",
    icon: <AcUnitIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/admin/create/subcategory",
  },
  {
    text: "Create Category With SubCategory",
    icon: <AlignVerticalCenterIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/admin/create/catewithsubcate",
  },
  {
    text: "All User",
    icon: <ManageAccountsIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/admin/alluser",
  },
  {
    text: "Pricing",
    icon: <MoneyIcon sx={{ fontSize: "32px" }} />,
    link: "/pricing",
  },
];





















  // const [drawerOpen, setDrawerOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);

  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const router = useRouter(); // Next.js router instance

  // const menuItems = [
  //   {
  //     text: "Dashboard",
  //     icon: <HomeIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin",
  //   },
  //   {
  //     text: "Create Content & Courses",
  //     icon: <ChatIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin/content/create",
  //   },
  //   {
  //     text: "Courses",
  //     icon: <BarChartIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin/create/course",
  //   },
  //   {
  //     text: "Tutorials",
  //     icon: <BuildIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin/create/content",
  //   },
  //   {
  //     text: "Home Page",
  //     icon: <LiveHelpIcon sx={{ fontSize: "32px" }} />,
  //     link: "/",
  //   },

  //   {
  //     text: "Create Category",
  //     icon: <CategoryIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin/create/category",
  //   }, // New Link

  //   {
  //     text: "Create SubCategory",
  //     icon: <AcUnitIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin/create/subcategory",
  //   }, // New Link
  //   {
  //     text: "Create  category With  SubCategory",
  //     icon: <AlignVerticalCenterIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin/create/catewithsubcate",
  //   }, // New Link
  //   {
  //     text: "All User",
  //     icon: <ManageAccountsIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/admin/alluser",
  //   }, // New Link
  //   {
  //     text: "Pricing",
  //     icon: <MoneyIcon sx={{ fontSize: "32px" }} />,
  //     link: "/pricing",
  //   }, // New Link
  // ];

  return (
    <Box sx={{ display: "flex" }}>
      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          sx={{
            width: isHovered ? 300 : 100,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isHovered ? 300 : 100,
              transition: "width 0.3s",
              overflowX: "hidden",
              backgroundColor: "#1a1a1a",
              color: "white",
              paddingTop: "20px",
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  marginBottom: "10px",
                  padding: isHovered ? "10px 20px" : "10px 0",
                  cursor: "pointer",
                  ":hover": {
                    borderLeft: "19px solid blueviolet !important",
                  },
                  transition: "border-bottom 0.3s ease",
                }}
                onClick={() => router.push(item.link)} // Navigate using router.push
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: isHovered ? "50px" : "40px",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isHovered && (
                  <ListItemText
                    primary={item.text}
                    sx={{ marginLeft: "10px", fontSize: "18px" }}
                  />
                )}
              </ListItem>
            ))}

            {/* Logout Item */}
            <ListItem
              sx={{
                marginBottom: "10px",
                padding: isHovered ? "10px 20px" : "10px 0",
                cursor: "pointer",
                ":hover": {
                  borderLeft: "19px solid blueviolet !important",
                },
                transition: "border-bottom 0.3s ease",
              }}
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: isHovered ? "50px" : "40px",
                  justifyContent: "center",
                  marginLeft: "20px",
                }}
              >
                <ExitToAppIcon sx={{ fontSize: "32px", color: "blueviolet" }} />
              </ListItemIcon>
              {isHovered && (
                <ListItemText
                  primary="Logout"
                  sx={{ marginLeft: "10px", fontSize: "18px" }}
                />
              )}
            </ListItem>
          </List>
        </Drawer>
      )}

      {isSmallScreen && (
        <AppBar position="fixed" sx={{ backgroundColor: "#1a1a1a" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon sx={{ fontSize: "32px" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: isSmallScreen ? "block" : "none",
          "& .MuiDrawer-paper": {
            width: 300,
            backgroundColor: "#1a1a1a",
            color: "white",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                router.push(item.link); // Navigate using router.push
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: "100px", xs: "0" },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Sidebar;
