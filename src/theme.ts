import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#48cfcb", // --ac-one
      contrastText: "#181717", // --fg-two
    },
    secondary: {
      main: "#f5007b", // --ac-two
      contrastText: "#ffffff", // --bg-one
    },
    text: {
      primary: "#45474b", // --fg-one
      secondary: "#181717", // --fg-two
    },
    background: {
      default: "#ffffff", // --bg-one
      paper: "#f0f4f9", // --bg-two
    },
    // You can add more color definitions if needed
  },
  typography: {
    fontFamily: '"Inconsolata", system-ui',
  },

  // Optional: Define typography settings to customize fonts, sizes, weights, etc.
  /*
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    // Define other typography variants as needed
  },
  */

  // Optional: Define spacing to maintain consistent padding and margins.
  /*
  spacing: 8, // The default spacing unit (e.g., theme.spacing(2) equals 16px)
  */

  // Optional: Define breakpoints for responsive design.
  /*
  breakpoints: {
    values: {
      xs: 0,    // Extra-small: 0px and up
      sm: 600,  // Small: 600px and up
      md: 960,  // Medium: 960px and up
      lg: 1280, // Large: 1280px and up
      xl: 1920, // Extra-large: 1920px and up
    },
  },
  */

  // Optional: Customize component styles globally.
  /*
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for all buttons
          textTransform: 'none', // Disable uppercase transformation
        },
        contained: {
          boxShadow: 'none', // Remove box shadow from contained buttons
          '&:hover': {
            boxShadow: 'none', // Remove box shadow on hover
          },
        },
      },
      defaultProps: {
        disableRipple: true, // Disable ripple effect globally on buttons
      },
    },
    // Add overrides for other components as needed
  },
  */
});

export default theme;
