import { FORM_ERROR } from "final-form";
import React, { Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Segment, Header, Icon } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { IUserFormValues } from "../../App/models/user";
import { useStore } from "../../App/stores/Store";
import { ErrorMessage } from "../../App/common/form/ErrorMessage";
import { TextAreaInput } from "../../App/common/form/TextAreaInput";

export const RegisterForm: React.FC = () => {
  const { userStore } = useStore();
  const { register } = userStore;
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
                component={TextAreaInput}
                placeholder="Username"
              />
              <Field
                name="displayedName"
                component={TextAreaInput}
                placeholder="Displayed name"
              />
              <Field name="email" component={TextAreaInput} placeholder="Email" />
              <Field
                name="password"
                component={TextAreaInput}
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
