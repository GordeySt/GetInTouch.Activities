import { FORM_ERROR } from "final-form";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Segment, Header, Icon } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { IUserFormValues } from "../../App/models/user";
import { useStore } from "../../App/stores/Store";
import { ErrorMessage } from "../../App/common/form/ErrorMessage";
import { TextAreaInput } from "../../App/common/form/TextAreaInput";

export const LoginForm = () => {
  const { userStore } = useStore();
  const { login } = userStore;
  return (
    <Segment clearing>
      <Header as="h4" color="black">
        <Icon size="mini" name="users" />
        Login To Activities
      </Header>
      <FinalForm
        onSubmit={(values: IUserFormValues) =>
          login(values).catch((error) => ({
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
            <Field name="email" component={TextAreaInput} placeholder="Email" />
            <Field
              name="password"
              component={TextAreaInput}
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
