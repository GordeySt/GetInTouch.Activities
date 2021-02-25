import React, { Fragment } from "react";
import { Container, Segment } from "semantic-ui-react";
import UserStore from "../../App/stores/UserStore";
import { LogOutForm } from "./LogOutForm";
import { LogInForm } from "./LogInForm";

export const HomePage = () => {
  const { isLoggedIn, user } = UserStore;
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
