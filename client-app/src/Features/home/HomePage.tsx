import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import UserStore from "../../App/stores/UserStore";
import { LoginForm } from "../user/LoginForm";

export const HomePage = () => {
  const { isLoggedIn, user } = UserStore;
  return (
    <Fragment>
      <Segment inverted textAlign="center" vertical className="masthead">
        {isLoggedIn && user ? (
          <Container text>
            <Header as="h2" color="black">
              <Icon name="users" />
            </Header>
            <Header
              color="black"
              as="h2"
              content={`Welcome to Activities, ${user?.displayedName}`}
            />
            <Header color="black" as="h2" content="Bring people together" />
            <Button color="black" as={Link} to="/activities" size="huge">
              Let's get it started
            </Button>
          </Container>
        ) : (
          <Container text>
            <Fragment>
              <Segment placeholder>
                <Grid columns={2} relaxed="very" stackable>
                  <Grid.Column>
                    <LoginForm />
                  </Grid.Column>

                  <Grid.Column verticalAlign="middle">
                    <Button content="Sign up" icon="signup" size="big" />
                  </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
              </Segment>
            </Fragment>
          </Container>
        )}
      </Segment>
    </Fragment>
  );
};
