import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Icon, Label, Segment } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { useStore } from "../../App/stores/Store";

export const LoginForm = () => {
  const { userStore } = useStore();
  return (
    <Segment clearing>
      <Header as="h4" color="black">
        <Icon size="mini" name="users" />
        Login To Activities
      </Header>
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          userStore
            .login(values)
            .catch((error) => setErrors({ error: "Invalid email or password" }))
        }
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="email" placeholder="Email" />
            <TextInput name="password" placeholder="Password" type="password" />
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: 10 }}
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <Button
              loading={isSubmitting}
              secondary
              content="Login"
              type="submit"
              fluid
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
