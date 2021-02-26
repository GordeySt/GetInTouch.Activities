import { FORM_ERROR } from "final-form";
import React, { Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button, Segment, Header, Icon } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { IUserFormValues } from "../../App/models/user";
import UserStore from "../../App/stores/UserStore";
import { ErrorMessage } from "../../App/common/form/ErrorMessage";

const validate = combineValidators({
  username: isRequired("email"),
  displayedName: isRequired("email"),
  email: isRequired("email"),
  password: isRequired("password"),
});

export const RegisterForm: React.FC = () => {
  const { register } = UserStore;
  return (
    <Fragment>
      <Segment clearing>
        <Header textAlign="center" as="h4" color="black">
          <Icon size="mini" name="users" />
          Hey there! Ready to go?
        </Header>
        <FinalForm
          onSubmit={(values: IUserFormValues) =>
            register(values).catch((error) => ({
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
              <Field
                name="username"
                component={TextInput}
                placeholder="Username"
              />
              <Field
                name="displayedName"
                component={TextInput}
                placeholder="Displayed name"
              />
              <Field name="email" component={TextInput} placeholder="Email" />
              <Field
                name="password"
                component={TextInput}
                placeholder="Password"
                type="password"
              />
              {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage error={submitError} />
              )}
              <Button
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                loading={submitting}
                color="black"
                content="Register"
                fluid
              />
            </Form>
          )}
        />
      </Segment>
    </Fragment>
  );
};
