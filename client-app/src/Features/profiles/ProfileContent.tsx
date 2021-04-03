import { Tab } from "semantic-ui-react";
import { ProfilePhotos } from "./ProfilePhotos";
import { ProfileFollowings } from "./ProfileFollowings";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About</Tab.Pane> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  { menuItem: "Activities", render: () => <Tab.Pane>Activities</Tab.Pane> },
  { menuItem: "Followers", render: () => <ProfileFollowings /> },
  { menuItem: "Following", render: () => <ProfileFollowings /> },
];

export const ProfileContent = () => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};
