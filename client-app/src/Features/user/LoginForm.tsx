import { FORM_ERROR } from "final-form";
import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button, Label, Segment, Header, Icon } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { IUserFromValues } from "../../App/models/user";
import UserStore from "../../App/stores/UserStore";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

export const LoginForm = () => {
  const { login } = UserStore;
  return (
    <Segment clearing>
      <Header as="h4" color="black">
        <Icon size="mini" name="users" />
        Login To Activities
      </Header>
      <FinalForm
        onSubmit={(values: IUserFromValues) =>
          login(values).catch((error) => ({
            [FORM_ERROR]: error,
          }))
        }
        validate={validate}
        render={({
          handleSubmit,
          submitting,
          submitError,
          invalid,
          pristine,
          dirtySinceLastSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="email" component={TextInput} placeholder="Email" />
            <Field
              name="password"
              component={TextInput}
              placeholder="Password"
              type="password"
            />
            {submitError && !dirtySinceLastSubmit && (
              <Label color="red" basic content={submitError.statusText} />
            )}
            <Button
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              loading={submitting}
              color="black"
              content="Login"
              fluid
            />
          </Form>
        )}
      />
    </Segment>
  );
};
