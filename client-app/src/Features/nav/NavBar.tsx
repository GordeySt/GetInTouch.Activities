import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../../App/stores/Store";

export const NavBar: React.FC = observer(() => {
  const { userStore } = useStore();
  const { isLoggedIn, user, logout } = userStore;
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
        {isLoggedIn && user && (
          <React.Fragment>
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
            <Menu.Item position="right">
              <Image
                avatar
                spaced="right"
                src={user?.image || "/assets/user.jpg"}
              />
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
          </React.Fragment>
        )}
      </Container>
    </Menu>
  );
});
