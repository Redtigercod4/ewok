import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../common/ContentCard";
import Logo from "../../assets/logo.png";

const LoginForm: React.FC = () => {
  return (
    <ContentCard>
      <img src={Logo} alt="EWOK logo" width="188px" height="251px" />
      <Typography variant="h1">EWOK</Typography>
      <Typography variant="h2">Space Electronic Warfare Simulator</Typography>
      <TextField label="Username" />
      <TextField label="Password" />
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button variant="contained">Login</Button>
        <Button variant="outlined">Forgot Password?</Button>
      </Box>
    </ContentCard>
  );
};

export default LoginForm;
