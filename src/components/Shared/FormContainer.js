import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const FormContainer = ({
  title,
  subtitle,
  maxWidth = 460,
  children,
  onSubmit,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "60vh",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth,
          p: { xs: 3, sm: 5 },
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {title && (
          <Box sx={{ mb: 4, textAlign: "center" }}>
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
