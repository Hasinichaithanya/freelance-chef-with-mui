import React from "react";
import { Box, Typography } from "@mui/material";
import "./PageHeader.css";

const PageHeader = ({ title, subtitle, icon, align = "left", sx = {} }) => {
  const alignClass = align === "center" ? "center" : "left";

  return (
    <Box
      className={`page-header page-header--${alignClass}`}
      sx={sx}
    >
      <Box className={`page-header__title-row page-header__title-row--${alignClass}`}>
        {icon && <Box className="page-header__icon">{icon}</Box>}
        <Typography variant="h4" className="gradient-text page-header__title">
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;
