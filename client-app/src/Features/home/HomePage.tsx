import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import UserStore from "../../App/stores/UserStore";

export const HomePage = () => {
  const { isLoggedIn, user } = UserStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Activities
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back, ${user.displayedName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content={"Bring people together"} />
            <Button as={Link} to="/login" size="huge" inverted>
              Login
            </Button>
            <Button as={Link} to="/register" size="huge" inverted>
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};
