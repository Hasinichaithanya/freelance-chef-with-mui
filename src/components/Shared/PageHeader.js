import React from "react";
import { Box, Typography } from "@mui/material";

const PageHeader = ({ title, subtitle, icon, align = "left", sx = {} }) => {
  return (
    <Box
      sx={{
        mb: 4,
        textAlign: align,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: align === "center" ? "center" : "flex-start",
          gap: 1.5,
          mb: subtitle ? 1 : 0,
        }}
      >
        {icon && (
          <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
        )}
        <Typography
          variant="h4"
          sx={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
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
