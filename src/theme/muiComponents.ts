import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          '@media(min-width: 600px)': {
            paddingLeft: 0,
            paddingRight: 0,
          }
        }

      }
    }
  }
})
