import React from "react";
import { ErrorMessage, useField } from "formik";

export const SelectField8 = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="col-md-8">
      <label htmlFor={field.name}>{label}</label>
      <select
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
        //  {...field} {...props}
      />
      {/* {meta.touched && meta.error && 'is-invalid' ? (
          <div className="error">{meta.error}</div>
        ) : null} */}
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
