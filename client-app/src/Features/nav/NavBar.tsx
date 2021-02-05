import { observer } from "mobx-react-lite";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../App/stores/ActivityStore";

export const NavBar: React.FC = observer(() => {
  const { openCreateForm } = ActivityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          InTouch
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
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
