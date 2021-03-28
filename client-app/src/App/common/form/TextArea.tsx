import React from "react";
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface IProps {
  placeholder: string;
  name: string;
  label?: string;
  rowsize: number;
}

export const TextArea: React.FC<IProps> = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea rows={props.rowsize} {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
