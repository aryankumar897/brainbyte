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
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

const Sidebar = () => {



// State to control whether the drawer (sidebar menu) is open or closed
const [drawerOpen, setDrawerOpen] = useState(false); 

// State to track whether an element (e.g., menu item) is being hovered over
const [isHovered, setIsHovered] = useState(false); 

// Get the current theme settings (useful for styling)
const theme = useTheme(); 

// Detect if the screen width is small (e.g., mobile devices) using Material-UI breakpoints
const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 

// Get the router object to enable programmatic navigation
const router = useRouter(); 

// Get the user's session data (checks if the user is logged in and retrieves user details)
const { data: session } = useSession(); 

// Define an array of menu items for the sidebar navigation
const menuItems = [
  {
    text: "Dashboard", // Display name of the menu item
    icon: <HomeIcon sx={{ fontSize: "32px" }} />, // Icon for the menu item with a custom font size
    link: "/dashboard/user", // The URL path to navigate to when clicked
  },
  {
    text: "Profile",
    icon: <SwitchAccountIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/user/profile",
  },
  {
    text: "Courses",
    icon: <BarChartIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/user/courses",
  },
  {
    text: "Subscription",
    icon: <BuildIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/user/subscription",
  },
  {
    text: "Pricing",
    icon: <ShoppingCartCheckoutIcon sx={{ fontSize: "32px" }} />,
    link: "/pricing",
  },
  {
    text: "Order History",
    icon: <ManageHistoryIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/user/orders",
  },
  {
    text: "Home",
    icon: <DoorFrontOutlinedIcon sx={{ fontSize: "32px" }} />,
    link: "/", // Navigates to the home page
  },
  {
    text: "Course Order History",
    icon: <CastForEducationIcon sx={{ fontSize: "32px" }} />,
    link: "/dashboard/user/course-orders",
  },
];






















  // const [drawerOpen, setDrawerOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);

  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const router = useRouter();
  // const { data: session } = useSession(); // Fetch session data

  // const menuItems = [
  //   {
  //     text: "Dashboard",
  //     icon: <HomeIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/user",
  //   },
  //   {
  //     text: "Profile",
  //     icon: <SwitchAccountIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/user/profile",
  //   },

  //   {
  //     text: "Courses",
  //     icon: <BarChartIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/user/courses",
  //   },
  //   {
  //     text: "Subscription",
  //     icon: <BuildIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/user/subscription",
  //   },
  //   {
  //     text: "Pricing",
  //     icon: <ShoppingCartCheckoutIcon sx={{ fontSize: "32px" }} />,
  //     link: "/pricing",
  //   },
  //   {
  //     text: "Order History",
  //     icon: <ManageHistoryIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/user/orders",
  //   },

  //   {
  //     text: "Home",
  //     icon: <DoorFrontOutlinedIcon sx={{ fontSize: "32px" }} />,
  //     link: "/",
  //   },
  //   {
  //     text: "Course Order History",
  //     icon: <CastForEducationIcon sx={{ fontSize: "32px" }} />,
  //     link: "/dashboard/user/course-orders",
  //   },
  // ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Permanent Drawer for larger screens */}
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
                onClick={() => router.push(item.link)}
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

      {/* AppBar for smaller screens */}
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

      {/* Drawer for mobile */}
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
                router.push(item.link);
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

          {/* Logout Item in Mobile Drawer */}
          <ListItem
            sx={{ cursor: "pointer" }}
            onClick={() => {
              signOut({ callbackUrl: "/" });
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon sx={{ color: "white", fontSize: "32px" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "white" }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
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
