
// "use client" - Ensures this component is only rendered client-side in Next.js (for compatibility with React features like hooks).

import React, { useState } from "react"; // Import React and useState for managing state
import { Button } from "@mui/material"; // Import Button component from Material-UI
import LoginModal from "@/components/loginmodal/Login"; // Import a custom LoginModal component

// Main functional component for the Home page
const Home = () => {
  // State hook to manage whether the login modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Button to trigger the login modal */}
      <Button
        onClick={() => setIsModalOpen(true)} // Sets the modal to open when the button is clicked
        variant="contained" // Material-UI button style
        sx={{
          display: { xs: 'none', md: 'block' }, // Hides the button on small screens, shows on medium and larger screens
          backgroundColor: '#00796B', // Sets the background color to a teal shade
          '&:hover': { backgroundColor: '#005A4F' }, // Changes color when hovering over the button
        }}
      >
        Sign In {/* Button label */}
      </Button>

      {/* LoginModal component, which receives props to control its visibility */}
      <LoginModal
        open={isModalOpen} // Passes the modal state to control its visibility
        handleClose={() => setIsModalOpen(false)} // Closes the modal by setting the state to false
      />
    </div>
  );
};

// Exports the component so it can be used elsewhere
export default Home;






















// "use client"


// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import LoginModal from "@/components/loginmodal/Login";

// const Home = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <Button
        
//         onClick={() => setIsModalOpen(true)}
//         variant="contained"
//         sx={{
//           display: { xs: 'none', md: 'block' },
//           backgroundColor: '#00796B',
//           '&:hover': { backgroundColor: '#005A4F' },
//         }}
//       >
//         Sign In
//       </Button>
//       <LoginModal
//         open={isModalOpen}
//         handleClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default Home;
