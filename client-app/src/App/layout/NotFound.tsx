import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="heartbeat" />
        Oops! Page Not Found
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" color="black">
          Return to Activities page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};
