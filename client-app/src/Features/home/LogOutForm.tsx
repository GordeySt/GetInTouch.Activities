import React, { Fragment } from "react";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import { LoginForm } from "../../Features/user/LoginForm";
import { Link } from "react-router-dom";

export const LogOutForm = () => {
  return (
    <Fragment>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <LoginForm />
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button
              as={Link}
              to="/register"
              content="Sign up"
              icon="signup"
              size="big"
            />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </Fragment>
  );
};
