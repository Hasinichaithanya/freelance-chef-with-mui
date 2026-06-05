import { createTheme, alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#D97706",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1E293B",
      light: "#334155",
      dark: "#0F172A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAF9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
    error: {
      main: "#EF4444",
    },
    success: {
      main: "#22C55E",
    },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      color: "#64748B",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E1 transparent",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
            transform: "translateY(-1px)",
          },
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.8rem",
        },
        sizeMedium: {
          padding: "10px 24px",
          fontSize: "0.9rem",
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
          },
        },
        outlinedPrimary: {
          borderColor: "#F59E0B",
          color: "#D97706",
          "&:hover": {
            backgroundColor: alpha("#F59E0B", 0.08),
            borderColor: "#D97706",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #F1F5F9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            transition: "all 0.2s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F59E0B",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F59E0B",
              borderWidth: 2,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#D97706",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: 8,
          boxShadow: "0 25px 50px rgba(0,0,0,0.12)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "1.25rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#F1F5F9",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: "12px !important",
          border: "1px solid #F1F5F9",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: "8px 0",
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
