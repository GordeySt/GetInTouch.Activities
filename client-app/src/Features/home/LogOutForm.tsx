import { Fragment } from "react";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { LoginForm } from "../../Features/user/LoginForm";
import { RegisterForm } from "../../Features/user/RegisterForm";
import { useStore } from "../../App/stores/Store";
import { observer } from "mobx-react-lite";

export const LogOutForm = observer(() => {
  const { modalStore, userStore } = useStore();
  const { openModal } = modalStore;
  return (
    <Fragment>
      <Header color="black" as="h3" content="Wanna try something new?" />
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <LoginForm />
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button
              style={{ marginBottom: "10px" }}
              onClick={() => openModal(<RegisterForm />)}
              content="Sign up"
              icon="signup"
              size="big"
            />
            <Button
              color="facebook"
              icon
              circular
              loading={userStore.fbLoading}
              onClick={userStore.facebookLogin}
            >
              <Icon name="facebook" /> Use Facebook
            </Button>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Fragment>
  );
});
