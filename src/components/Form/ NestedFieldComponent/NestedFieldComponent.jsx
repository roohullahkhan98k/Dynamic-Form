import React from "react";
import { useWatch } from "react-hook-form";
import { DynamicFieldRenderer } from "../DynamicFieldRenderer";

const NestedFieldComponent = ({
  field,
  parentName,
  watch,
  data,
  selectedValue,
  fieldName,
}) => {
  const watchedSelectedValue = useWatch({ name: fieldName });

  if (field?.properties && Array.isArray(field.properties)) {
    return (
      <div>
        {field.properties.map((nestedField, index) => {
          if (nestedField.method === watchedSelectedValue) {
            return (
              <div
                key={`${parentName}.${index}`}
                style={{ marginLeft: "2rem" }}
              >
                {nestedField.properties?.map((property, propertyIndex) => (
                  <DynamicFieldRenderer
                    key={`${parentName}.${index}.${propertyIndex}`}
                    field={property}
                    data={data}
                  />
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return null;
};

export default NestedFieldComponent;
