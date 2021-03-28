import React from "react";
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface IProps {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

export const TextInput: React.FC<IProps> = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
