import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormField, FormFieldProps, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <FormField error={touched && !!error} width={width}>
      <DatePicker
        selected={input.value || undefined}
        onChange={(data) => input.onChange(data)}
        showTimeSelect
        dateFormat="MM/dd/yyyy  EE hh:mm a"
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        placeholderText={placeholder}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </FormField>
  );
};
