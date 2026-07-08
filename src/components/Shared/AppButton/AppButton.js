import React from "react";
import { Button } from "@mui/material";
import "./AppButton.css";

/**
 * AppButton — reusable button wrapper used throughout the project.
 *
 * Props:
 *  variant    : "contained" | "outlined" | "text" | "ghost"   (default: "contained")
 *  color      : "primary" | "danger"                           (default: "primary")
 *  size       : "sm" | "md" | "lg"                             (default: "md")
 *  fullWidth  : boolean
 *  iconOnly   : boolean  — square icon-only button
 *  active     : boolean  — for ghost nav buttons (active page)
 *  disabled   : boolean
 *  type       : "button" | "submit" | "reset"
 *  startIcon  : node
 *  endIcon    : node
 *  onClick    : function
 *  component  : React component (e.g. Link for nav buttons)
 *  to         : route path  (used with component={Link})
 *  className  : extra classes
 *  children   : content
 */
const AppButton = ({
  variant = "contained",
  color = "primary",
  size = "md",
  fullWidth = false,
  iconOnly = false,
  active = false,
  disabled = false,
  type = "button",
  startIcon,
  endIcon,
  onClick,
  component,
  to,
  className = "",
  children,
  ...rest
}) => {
  // Build CSS class list
  const variantClass =
    color === "danger"
      ? `app-btn--danger-${variant}`
      : variant === "ghost"
      ? `app-btn--ghost${active ? " app-btn--ghost--active" : ""}`
      : `app-btn--${variant}`;

  const sizeClass = iconOnly ? "app-btn--icon-only" : `app-btn--${size}`;
  const fullClass = fullWidth ? "app-btn--full" : "";

  const classes = ["app-btn", variantClass, sizeClass, fullClass, className]
    .filter(Boolean)
    .join(" ");

  // Map our size to MUI's size for accessible focus ring sizing
  const muiSize = size === "lg" ? "large" : size === "sm" ? "small" : "medium";

  return (
    <Button
      variant={variant === "ghost" ? "text" : variant === "contained" && color === "danger" ? "contained" : variant}
      size={muiSize}
      disabled={disabled}
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      component={component}
      to={to}
      fullWidth={fullWidth}
      className={classes}
      disableElevation
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
