import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const Chart = ({ title, data }) => {
  if (!data || data.length === 0) {
    return <Typography align="center">No data available</Typography>;
  }

  return (
    <Box sx={{ width: "100%", textAlign: "center" }} height={600} >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" s angle={-90}  />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
