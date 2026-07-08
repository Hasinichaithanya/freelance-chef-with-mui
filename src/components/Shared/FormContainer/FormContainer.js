import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import "./FormContainer.css";

const FormContainer = ({
  title,
  subtitle,
  maxWidth = 460,
  children,
  onSubmit,
  ...props
}) => {
  return (
    <Box className="form-container-wrapper">
      <Paper
        elevation={0}
        className="form-container-paper"
        style={{ maxWidth }}
        sx={{ borderColor: "divider" }}
      >
        {title && (
          <Box className="form-container-header">
            <Typography
              variant="h4"
              sx={{ color: "text.primary", mb: subtitle ? 1 : 0 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {onSubmit ? (
          <Box component="form" onSubmit={onSubmit} noValidate {...props}>
            {children}
          </Box>
        ) : (
          <Box {...props}>{children}</Box>
        )}
      </Paper>
    </Box>
  );
};

export default FormContainer;
