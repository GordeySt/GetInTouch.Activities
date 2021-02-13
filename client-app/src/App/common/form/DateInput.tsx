import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormField, FormFieldProps, Label } from "semantic-ui-react";
import DatePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
  input,
  width,
  meta: { touched, error },
}) => {
  return (
    <FormField error={touched && !!error} width={width}>
      <DatePicker
        value={input.value || undefined}
        onChange={(data) => input.onChange(data)}
        dateFormat="DD-MM-YYYY"
        timeFormat="hh:mm A"
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </FormField>
  );
};
