import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { IUserFromValues } from "../../App/models/user";
import UserStore from "../../App/stores/UserStore";

export const LoginForm = () => {
  const { login } = UserStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFromValues) => login(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          <Button positive content="Login" />
        </Form>
      )}
    />
  );
};
