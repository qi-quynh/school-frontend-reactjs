import React from "react";
import { ErrorMessage, useField } from "formik";
import { SelectField } from "./SelectField";

export const TextField2 = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="col-md-2">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control shadow-none  ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
