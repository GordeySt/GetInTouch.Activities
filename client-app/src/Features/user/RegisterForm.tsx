import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Icon, Label, Segment } from "semantic-ui-react";
import { TextInput } from "../../App/common/form/TextInput";
import { useStore } from "../../App/stores/Store";
import * as Yup from "yup";
import { ValidationErrors } from "../../App/common/form/ValidationErrors";

export const RegisterForm = observer(() => {
  const { userStore } = useStore();
  return (
    <Segment clearing>
      <Header as="h4" color="black">
        <Icon size="mini" name="users" />
        Hey there! Ready to go?
      </Header>
      <Formik
        initialValues={{
          displayedName: "",
          userName: "",
          email: "",
          password: "",
          error: null,
        }}
        onSubmit={(values, { setErrors }) =>
          userStore.register(values).catch((error) => setErrors({ error }))
        }
        validationSchema={Yup.object({
          displayedName: Yup.string().required(),
          userName: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form
            className="ui form error"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <TextInput name="displayedName" placeholder="Display Name" />
            <TextInput name="userName" placeholder="Username" />
            <TextInput name="email" placeholder="Email" />
            <TextInput name="password" placeholder="Password" type="password" />
            <ErrorMessage
              name="error"
              render={() => <ValidationErrors errors={errors.error} />}
            />
            <Button
              disabled={!isValid || !dirty || isSubmitting}
              loading={isSubmitting}
              secondary
              content="Register"
              type="submit"
              fluid
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
