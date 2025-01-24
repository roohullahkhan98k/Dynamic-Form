import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectFieldComponent = ({ field }) => {
  const { control } = useFormContext();

  const options = field.options || (field.validation?.enum?.map((option) => ({ value: option, label: option })) || []);

  return (
    <FormControl fullWidth>
      <InputLabel id={`${field.name}-label`}>{field.label || field.name}</InputLabel>
      <Controller
        name={field.name}
        control={control}
        defaultValue={options[0]?.value || ""}
        render={({ field: { value, onChange } }) => (
          <Select
            labelId={`${field.name}-label`}
            value={value}
            onChange={onChange}
            label={field.label || field.name}
          >
            {options.map((option, index) => (
              <MenuItem key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectFieldComponent;
