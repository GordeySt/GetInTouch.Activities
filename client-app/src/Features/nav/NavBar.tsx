import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../App/stores/ActivityStore";

export const NavBar: React.FC = observer(() => {
  const { openCreateForm } = ActivityStore;
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
            onClick={openCreateForm}
            basic
            inverted
            colour="gray"
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
});
