import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import TextInputField from './../TextInputField';

function AppFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TextInputField
        onFieldBlur={() => {
          setFieldTouched(name);
        }}
        fieldName= {name}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
