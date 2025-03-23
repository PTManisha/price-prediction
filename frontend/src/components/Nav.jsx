// "use client";
// import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import bhavImage from "../assets/BHAV.png";

// const Nav = () => {
//   return (
//     <AppBar position="static" sx={{ bgcolor: "#8BC34A" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* Left: Logo and Title */}
//         {/* <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <Avatar src={bhavImage} alt="BHAV Logo" sx={{ width: 50, height: 50 }} />
//           <Typography variant="h6" fontWeight="bold">
//             AGRICAST
//           </Typography>
//         </div> */}

//         {/* Right: Notification & Logout */}
//         <div style={{display:"flex",alignItems:"center", justifyContent:"flex-end",gap:2}}>
//           <IconButton color="inherit">
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <ExitToAppIcon />
//           </IconButton>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Nav;


// "use client";
// import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import bhavImage from "../assets/BHAV.png";

// const Nav = () => {
//   return (
//     <AppBar position="static" sx={{ bgcolor: "#388E3C", width: "100%", zIndex: 1201 }}>
//       <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%" }}>
//         {/* Left: Logo and Title */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Avatar src={bhavImage} alt="BHAV Logo" sx={{ width: 50, height: 50 }} />
//           <Typography variant="h6" fontWeight="bold">BhavBuddy</Typography>
//         </Box>

//         {/* Filler to push icons to the right */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Right: Icons */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <IconButton color="inherit">
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <ExitToAppIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Nav;


// nav.jsx
"use client";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Nav = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#388E3C", width: "100%", zIndex: 1201 }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
        {/* Right: Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;