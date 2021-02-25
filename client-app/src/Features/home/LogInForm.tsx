import React, { Fragment } from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import { IUser } from "../../App/models/user";
import { Link } from "react-router-dom";

interface IProps {
  user: IUser;
}

export const LogInForm: React.FC<IProps> = ({ user }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
