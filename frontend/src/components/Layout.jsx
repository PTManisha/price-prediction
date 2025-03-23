// import { Outlet } from "react-router-dom"
// import { Box, Paper } from "@mui/material"
// import Sidebar from "@/components/Sidebar";
// import Nav from "./Nav";


// const Layout = () => {
//   return (
//     <Box sx={{ display: "flex", height: "100vh", bgcolor: "#4CAF50" }}>
     
//       <Sidebar />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             flex: 1,
//             borderRadius: 4,
//             overflow: "hidden",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Outlet />
//         </Paper>
//       </Box>
//     </Box>
//   )
// }

// export default Layout



import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Nav from "./Nav";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#388E3C" }}> 
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Nav /> {/* Added Nav here */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflow:"auto"
          }}
        >
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 4,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
