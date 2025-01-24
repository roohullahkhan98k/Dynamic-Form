import React from "react";
import { useFormContext } from "react-hook-form";
import { TextFieldComponent } from "../TextFieldComponent";
import { SelectFieldComponent } from "../SelectFieldComponent";
import { RadioFieldComponent } from "../RadioFieldComponent";
import { NestedFieldComponent } from "../ NestedFieldComponent";
import FieldWithTooltip from "../FieldWithTooltip/FieldWithTooltip";

const fieldComponents = {
  text: TextFieldComponent,
  textarea: TextFieldComponent,
  select: SelectFieldComponent,
  radio: RadioFieldComponent,
  number: TextFieldComponent,
  date: TextFieldComponent,
  string: TextFieldComponent,
  integer: TextFieldComponent,
  object: NestedFieldComponent,
};

const DynamicFieldRenderer = ({ field, parentName = "", data }) => {
  const { watch,  setValue } = useFormContext();

// i am are conditonally rendering the fields 
  if (field.condition) {
    const conditionValue = watch(field.condition.field);
    if (conditionValue !== field.condition.value) {
      return null;
    }
  }

  //checking for the undefined field type

  if (!field.type && !field.validation?.type) {
    console.warn(`Field ${field.name} is missing a type.`);
    return <p style={{ color: "red" }}>Missing field type for: {field.name}</p>;
  }

  let fieldType = field.type;
  if (!fieldType && field.validation?.type) {
    fieldType = field.validation.type;
  }

  const fieldName = `${parentName}${parentName ? "." : ""}${field.name}`;

// logic for handling nested fields

  if (field.properties && Array.isArray(field.properties)) {
    return (
      <div>
        <FieldWithTooltip
          Component={SelectFieldComponent}
          field={{
            ...field,
            label: field.name,
            name: fieldName,
            options: field.properties.map((property) => ({
              value: property.method || property.value,
              label: property.label || property.method,
            })),
          }}
          description={field.description}
          onChange={(event) => {
            setValue(fieldName, event.target.value, { shouldValidate: true });
          }}
        />
        {watch(fieldName) !== undefined && (
          <NestedFieldComponent
            field={field}
            fieldName={fieldName}
            parentName={parentName}
            watch={watch}
            data={data}
            selectedValue={watch(fieldName)}
          />
        )}
      </div>
    );
  }

  let Component;
  if (fieldType === "string" && field.validation?.enum) {
    Component = SelectFieldComponent;
  } else {
    Component = fieldComponents[fieldType];
  }

  if (!Component) {
    console.warn(`Unsupported field type: ${fieldType}`);
    return <p>Unsupported field type: {fieldType}</p>;
  }

  return (
    <FieldWithTooltip
      Component={Component}
      field={{
        ...field,
        name: fieldName,
      }}
      description={field.description}
    />
  );
};

export default DynamicFieldRenderer;