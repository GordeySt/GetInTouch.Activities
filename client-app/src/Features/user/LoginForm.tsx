import { FORM_ERROR } from "final-form";
import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button, Segment, Header, Icon } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { IUserFromValues } from "../../App/models/user";
import UserStore from "../../App/stores/UserStore";
import { ErrorMessage } from "../../App/common/form/ErrorMessage";
import { toast } from "react-toastify";

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
          <Form onSubmit={handleSubmit} error>
            <Field name="email" component={TextInput} placeholder="Email" />
            <Field
              name="password"
              component={TextInput}
              placeholder="Password"
              type="password"
            />
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage
                error={submitError}
                text="Invalid email or password"
              />
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
