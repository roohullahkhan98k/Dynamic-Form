// RadioFieldComponent.js
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const RadioFieldComponent = ({ field }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ""}
      render={({ field: { value, onChange } }) => (
        <RadioGroup value={value} onChange={onChange}>
          {field.options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default RadioFieldComponent;