import { Fragment } from "react";
import { Container, Segment } from "semantic-ui-react";
import { useStore } from "../../App/stores/Store";
import { LogOutForm } from "./LogOutForm";
import { LogInForm } from "./LogInForm";

export const HomePage = () => {
  const { userStore } = useStore();
  const { isLoggedIn, user } = userStore;
  return (
    <Fragment>
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          {isLoggedIn && user ? <LogInForm user={user} /> : <LogOutForm />}
        </Container>
      </Segment>
    </Fragment>
  );
};
