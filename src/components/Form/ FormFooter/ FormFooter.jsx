import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";

const FormFooter = () => {
  const { handleSubmit } = useFormContext();

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit((data) => console.log("Submitted", data))}
      >
        Submit
      </Button>
    </Box>
  );
};

export default FormFooter;
