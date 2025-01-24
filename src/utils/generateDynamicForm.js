import getValidationSchema from './getValidationSchema';

const generateDynamicForm = (formData) => {
  const defaultValues = formData.reduce((acc, field) => {
    if (field.properties && Array.isArray(field.properties)) {
      field.properties.forEach((nestedField) => {
        acc[`${field.name}.${nestedField.name}`] = nestedField.defaultValue || "";
      });
    } else {
      acc[field.name] = field.defaultValue || "";
    }
    return acc;
  }, {});

  const validationSchema = getValidationSchema(formData);

  return { defaultValues, validationSchema };
};

export default generateDynamicForm;
