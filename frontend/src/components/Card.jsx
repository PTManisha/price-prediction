import { Paper, Typography, Box } from "@mui/material"

const Card = ({ title, children, icon, sx = {} }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "#e8f5e9",
        height: "100%",
        ...sx,
      }}
    >
      {title && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
          <Typography variant="subtitle1" fontWeight="medium">
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </Paper>
  )
}

export default Card

