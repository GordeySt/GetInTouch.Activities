import { NavLink, Link } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          InTouch
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            basic
            inverted
            colour="gray"
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
