import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({
  label,
  type,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
};

export default CustomTextField;
