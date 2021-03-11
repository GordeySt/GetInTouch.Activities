import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import UserStore from "../../App/stores/UserStore";

export const NavBar: React.FC = observer(() => {
  const { logout, user } = UserStore;
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
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={user?.image || "/assets/user.jpg"} />
            <Dropdown pointing="top left" text={user.displayedName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.userName}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
});
