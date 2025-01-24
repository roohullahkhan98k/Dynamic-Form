import * as Yup from "yup";

const getValidationSchema = (formData) => {
  const schema = {};
  formData.forEach((field) => {
    if (field.validation) {
      let validator;
      switch (field.validation.type) {
        case "string":
          validator = Yup.string();
          break;
        case "integer":
          validator = Yup.number()
            .integer()
            .min(field.validation.minimum)
            .max(field.validation.maximum);
          break;
        case "object":
          if (field.properties && Array.isArray(field.properties)) {
            if (
              field.properties.every(
                (property) => property.method || property.value
              )
            ) {
              validator = Yup.string().oneOf(
                field.properties.map(
                  (property) => property.method || property.value
                )
              );
            } else {
              const nestedSchema = {};
              field.properties.forEach((nestedField) => {
                if (nestedField.validation) {
                  let nestedValidator;
                  switch (nestedField.validation.type) {
                    case "string":
                      nestedValidator = Yup.string();
                      break;
                    case "integer":
                      nestedValidator = Yup.number()
                        .integer()
                        .min(nestedField.validation.minimum)
                        .max(nestedField.validation.maximum);
                      break;
                    case "object":
                      nestedValidator = Yup.object();
                      break;
                    default:
                      nestedValidator = Yup.string();
                  }
                  if (nestedField.validation.required) {
                    nestedValidator = nestedValidator.required(
                      nestedField.validation.required
                    );
                  }
                  if (nestedField.validation.minLength) {
                    nestedValidator = nestedValidator.min(
                      nestedField.validation.minLength,
                      "Too short"
                    );
                  }
                  if (nestedField.validation.maxLength) {
                    nestedValidator = nestedValidator.max(
                      nestedField.validation.maxLength,
                      "Too long"
                    );
                  }
                  nestedSchema[nestedField.name] = nestedValidator;
                }
              });
              validator = Yup.object().shape(nestedSchema);
            }
          } else {
            validator = Yup.string();
          }
          break;
        default:
          validator = Yup.string();
      }
      if (field.validation.required) {
        validator = validator.required(field.validation.required);
      }
      if (field.validation.minLength) {
        validator = validator.min(field.validation.minLength, "Too short");
      }
      if (field.validation.maxLength) {
        validator = validator.max(field.validation.maxLength, "Too long");
      }
      schema[field.name] = validator;
    }
  });

  return Yup.object().shape(schema);
};

export default getValidationSchema;
