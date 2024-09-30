import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        background: {
            default: "#212121",
            paper: "#4E4E4E"
        }
    },
    typography: {
        h1: {
            fontSize: "36px",
            fontWeight: "bold"
        },
        h2: {
            fontSize: "26px"
        },
        allVariants: {
            color: "#FFFFFF"
        }
    }
})