import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from "@mui/material/Paper";
import generateDynamicForm from "../../utils/generateDynamicForm";
import { FormHeader } from "./FormHeader";
import { FormBody } from "./ FormBody";
import { FormFooter } from "./ FormFooter";

const Form = ({ formData }) => {
  const { defaultValues, validationSchema } = generateDynamicForm(formData);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  return (
    <FormProvider {...methods}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          borderRadius: 2,
        }}
      >
        <FormHeader />
        <FormBody formData={formData} />
        <FormFooter />
      </Paper>
    </FormProvider>
  );
};

export default Form;
