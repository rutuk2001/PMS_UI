import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: 5,
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontSize: "1.5rem",
      lineHeight: "1.875rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.125rem",
      lineHeight: "1.375rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.125rem",
      lineHeight: "1.375rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: ".875rem",
      lineHeight: "1.125rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: ".9375rem",
      lineHeight: "1.25rem",
    },
    body2: {
      fontSize: ".875rem",
      lineHeight: "1.125rem",
    },
    caption: {
      fontSize: ".75rem",
      lineHeight: "1rem",
    },
  },
  palette: {
    primary: {
      main: "#007ab1",
    },
    secondary: {
      main: "#28a745",
    },
    error: {
      main: "#D17575",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    default: {
      main: "#F7F7F9",
    },
    text: {
      primary: "#8C8C8C",
      secondary: "#66697A",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "#A4A4A4",
    },
  },
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          "& .MuiBreadcrumbs-li": {
            fontSize: "1.5rem",
            lineHeight: "1.875rem",
            fontWeight: 600,
            color: "#66697A",
            "& .MuiLink-root": {
              fontWeight: 400,
              color: "#66697A",
            },
            "& .MuiTypography-body1": {
              fontSize: "1.5rem",
              lineHeight: "1.875rem",
              fontWeight: 600,
              color: "#66697A",
            },
          },
          "& .MuiBreadcrumbs-separator": {
            fontSize: "1.5rem",
            lineHeight: "1.875rem",
            fontWeight: "300",
            marginLeft: "18px",
            marginRight: "18px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: ".9375rem",
            color: "#707070",
            height: "1.4375rem",
            "&.Mui-disabled": {
              backgroundColor: "#F5F5F7",
              borderRadius: ".5rem",
            },
          },
          "& .MuiInputBase-multiline": {
            "&.Mui-disabled": {
              backgroundColor: "#F5F5F7",
              borderRadius: ".5rem",
            },
            "& .MuiInputBase-input": {
              "&.Mui-disabled": {
                backgroundColor: "transparent",
                borderRadius: "0",
              },
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: ".5rem",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: ".9375rem",
            color: "#8C8C8C",
            height: "1.4375rem",
          },
          "& .MuiInputBase-input.MuiSelect-select": {
            minHeight: "1.4375rem",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: ".5rem",
          },
          "&.Mui-disabled": {
            backgroundColor: "#F5F5F7",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-formControl": {
            color: "#A4A4A4",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          "& .MuiAutocomplete-paper": {
            borderRadius: ".75rem",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ".5rem",
          fontWeight: "600",
          lineHeight: "1.5rem",
          padding: "8px 16px",
        },
        outlined: {
          padding: "7px 16px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: "600",
          color: "#007ab1",
          textDecoration: "none",
          "&.MuiLink-Regular-Blue": {
            fontWeight: "400",
            color: "#0A6CFF",
            textDecoration: "underline",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: "600",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#D9D9D9",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: ".75rem",
          boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.1)",
          "& .MuiCardHeader-title": {
            fontSize: "1.125rem",
            lineHeight: "1.375rem",
            fontWeight: "600",
            color: "#66697A",
          },
          "& .MuiCardHeader-action": {
            margin: "0 0 0 10px",
          },
          "& .MuiCardHeader-action-lgdown-fullwidth": {
            "@media (max-width: 1199px)": {
              flexWrap: "wrap",
              "& .MuiCardHeader-action": {
                width: "100%",
                margin: "10px 0 0 0",
              },
            },
          },
          "& .MuiCardHeader-action-mddown-fullwidth": {
            "@media (max-width: 991px)": {
              flexWrap: "wrap",
              "& .MuiCardHeader-action": {
                width: "100%",
                margin: "10px 0 0 0",
              },
            },
          },
          "& .MuiCardHeader-action-smdown-fullwidth": {
            "@media (max-width: 767px)": {
              flexWrap: "wrap",
              "& .MuiCardHeader-action": {
                width: "100%",
                margin: "10px 0 0 0",
              },
            },
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-head": {
            "& .MuiTableCell-head": {
              backgroundColor: "#F5F5F7",
              fontWeight: "600",
              lineHeight: "1.125rem",
              color: "#66697A",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              paddingRight: "10px",
              height: "60px",
              position: "relative",
              boxSizing: "border-box",
              "&:first-of-type": {
                paddingLeft: "20px",
              },
              "&:last-child": {
                paddingRight: "20px",
              },
              "&:not(:first-of-type):before": {
                content: '""',
                width: "1px",
                height: "16px",
                backgroundColor: "#A4A4A4",
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
              },
              "& .MuiTableSortLabel-root.Mui-active": {
                color: "#66697A",
              },
              "& .MuiTableSortLabel-icon": {
                fontSize: "15px",
                marginRight: 0,
              },
              "&.MuiTableCell-alignRight": {
                "& .MuiTableSortLabel-icon": {
                  marginLeft: 0,
                  marginRight: "4px",
                },
              },
            },
          },
          "& .MuiTableHead-group": {
            "& .MuiTableRow-head": {
              "&:first-of-type": {
                "& .MuiTableCell-head": {
                  borderBottom: "none",
                  "&:not(:first-of-type):before": {
                    display: "none",
                  },
                },
              },
              "& .MuiTableCell-head": {
                paddingTop: "8px",
                paddingBottom: "8px",
                height: "28px",
                "&.MuiTableCell-group": {
                  "&:after": {
                    content: '""',
                    height: "1px",
                    width: "50%",
                    backgroundColor: "#A4A4A4",
                    position: "absolute",
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",
                  },
                },
                "&.MuiTableCell-group.full": {
                  "&:after": {
                    width: "calc(100% - 20px)",
                    left: "10px",
                    transform: "translateX(0)",
                  },
                },
              },
            },
          },
          "& .MuiTableCell-body": {
            fontSize: ".9375rem",
            lineHeight: "1.25rem",
            padding: "10px",
            height: "54px",
            boxSizing: "border-box",
            "&:first-child": {
              paddingLeft: "20px",
            },
            "&:last-child": {
              paddingRight: "20px",
            },
            "& .MuiIconButton-root": {
              color: "#8C8C8C",
            },
            "& .MuiTableActions": {
              marginRight: "-8px",
            },
          },
          "& th.MuiTableCell-body": {
            fontWeight: "600",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-paper": {
            borderRadius: "0.75rem",
          },
          "& .MuiDialog-paperWidthMd": {
            maxWidth: "714px",
            boxSizing: "border-box",
          },
          "& .MuiDialogTitle-root": {
            fontSize: "1.125rem",
            lineHeight: "1.375rem",
            fontWeight: 500,
            color: "#66697A",
            padding: "30px 56px 15px 30px",
            "@media (max-width:600px)": {
              padding: "20px 46px 10px 20px",
            },
          },
          "& .MuiIconButton-close": {
            position: "absolute",
            right: 20,
            top: 20,
            color: (theme) => theme.palette.grey[500],
            "@media (max-width:600px)": {
              right: 10,
              top: 10,
            },
          },
          "& .MuiDialogContent-root": {
            padding: "15px 30px 30px 30px",
            "@media (max-width:600px)": {
              padding: "10px 20px 20px 20px",
            },
            "&.MuiDialogContent-table": {
              padding: "15px 0 30px 0",
              "@media (max-width:600px)": {
                padding: "10px 0 20px 0",
              },
            },
          },
          "& .MuiDialogActions-root": {
            padding: "15px 30px 30px 30px",
            marginTop: "-15px",
            backgroundColor: "#fff",
            zIndex: "1",
            "@media (max-width:600px)": {
              padding: "10px 20px 20px 20px",
              marginTop: "-10px",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: "600",
          borderRadius: "4px",
        },
        outlinedPrimary: {
          backgroundColor: "#DBFFE3",
          borderColor: "#007ab1",
          color: "#007ab1",
        },
        outlinedWarning: {
          backgroundColor: "#FFF2E9",
          borderColor: "#E8782D",
          color: "#E8782D",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 32,
          height: 18,
          padding: 0,
          "&:active": {
            "& .MuiSwitch-switchBase": {
              "& .MuiSwitch-thumb": {
                width: 14,
              },
              "&.Mui-checked": {
                transform: "translateX(10px)",
              },
            },
          },
          "& .MuiSwitch-switchBase": {
            padding: 4,
            "&.Mui-checked": {
              transform: "translateX(14px)",
              "& .MuiSwitch-thumb": {
                backgroundColor: "#007ab1",
              },
              "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#fff",
                borderColor: "#007ab1",
              },
            },
          },
          "& .Mui-disabled.MuiSwitch-switchBase": {
            pointerEvent: "none",
            transform: "translateX(0px)",
            "&.Mui-checked": {
              transform: "translateX(14px)",
              "& .MuiSwitch-thumb": {
                width: 10,
                backgroundColor: "#8C8C8C",
              },
              "& + .MuiSwitch-track": {
                borderColor: "#8C8C8C",
              },
            },
            "& .MuiSwitch-thumb": {
              width: 10,
            },
            "& + .MuiSwitch-track": {
              opacity: 1,
            },
          },
          "& .MuiSwitch-thumb": {
            boxShadow: "none",
            width: 10,
            height: 10,
            backgroundColor: "#8C8C8C",
            borderRadius: 8,
            transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
          "& .MuiSwitch-track": {
            borderRadius: 18 / 2,
            opacity: 1,
            backgroundColor: "#fff",
            border: "2px solid #8C8C8C",
            boxSizing: "border-box",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#8C8C8C",
          "&.Mui-disabled": {
            color: "#8C8C8C",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiInfoCounter": {
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "16px",
            "& .MuiInfoTotal": {
              fontSize: "30px",
              lineHeight: "1",
              color: "#66697A",
              marginRight: "16px",
            },
            "& .MuiInfoPer": {
              position: "relative",
              whiteSpace: "nowrap",
              "&:before": {
                content: '""',
                borderStyle: "solid",
                display: "inline-block",
                marginRight: "3px",
              },
            },
            "& .MuiInfoPer.up": {
              "&:before": {
                borderWidth: "0 7px 12px 7px",
                borderColor: "transparent transparent #007ab1 transparent",
              },
            },
            "& .MuiInfoPer.down": {
              "&:before": {
                borderWidth: "12px 7px 0 7px",
                borderColor: "#E8782D transparent transparent transparent",
              },
            },
          },
        },
      },
    },
  },
});

export default theme;
