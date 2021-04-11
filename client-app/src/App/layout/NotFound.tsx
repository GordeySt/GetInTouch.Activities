import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/Store";

export const NotFound = () => {
  const { userStore } = useStore();

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="heartbeat" />
        Oops! Page Not Found
      </Header>
      <Segment.Inline>
        <Button
          as={Link}
          to={userStore.user ? "/activities" : "/"}
          color="black"
        >
          Go back
        </Button>
      </Segment.Inline>
    </Segment>
  );
};
