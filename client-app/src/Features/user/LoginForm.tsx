import { Form, Formik } from "formik";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";

export const LoginForm = () => {
  return (
    <Segment clearing>
      <Header as="h4" color="black">
        <Icon size="mini" name="users" />
        Login To Activities
      </Header>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="email" placeholder="Email" />
            <TextInput name="password" placeholder="Password" type="password" />
            <Button secondary content="Login" type="submit" fluid />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
