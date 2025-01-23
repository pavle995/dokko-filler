import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({ children, type, fullWidth, variant, color }) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant || "contained"}
      color={color || "primary"}
      sx={{ mt: 3, mb: 2 }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
