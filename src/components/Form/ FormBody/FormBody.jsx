import React from "react";
import { useFormContext } from "react-hook-form";
import Grid from "@mui/material/Grid";
import {DynamicFieldRenderer} from "../DynamicFieldRenderer";

const FormBody = ({ formData }) => {
  const { handleSubmit, formState } = useFormContext();
  const sortedFormData = formData.sort((a, b) => a.order - b.order);

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const onError = (errors) => {
    console.log("Form Errors", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <Grid container spacing={2}>
        {sortedFormData.map((field) => (
          <Grid item xs={12} key={field.name}>
            <DynamicFieldRenderer field={field} />
          </Grid>
        ))}
      </Grid>
    </form>
  );
};

export default FormBody;
