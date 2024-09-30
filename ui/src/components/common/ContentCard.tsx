import { Paper } from "@mui/material";
import React from "react";

const ContentCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30vw",
        height: "70vh",
      }}
    >
      {children}
    </Paper>
  );
};

export default ContentCard;
