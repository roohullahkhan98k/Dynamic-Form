import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

const TextFieldComponent = ({ field }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ""}
      render={({ field: { value, onChange } }) => (
        <TextField
          id={field.name}
          type={field.type || "text"}
          inputMode={field.type === "number" ? "numeric" : "text"}
          label={field.label || field.name}
          value={value}
          onChange={onChange}
          fullWidth
          error={!!errors[field.name]}
          helperText={errors[field.name] ? errors[field.name].message : ""}
          margin="normal"
        />
      )}
    />
  );
};

export default TextFieldComponent;