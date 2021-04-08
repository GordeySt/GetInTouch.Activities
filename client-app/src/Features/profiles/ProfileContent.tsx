import { Tab } from "semantic-ui-react";
import { ProfilePhotos } from "./ProfilePhotos";
import { ProfileFollowings } from "./ProfileFollowings";
import { useStore } from "../../App/stores/Store";
import { ProfileActivities } from "./ProfileActivities";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About</Tab.Pane> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  { menuItem: "Activities", render: () => <ProfileActivities /> },
  { menuItem: "Followers", render: () => <ProfileFollowings /> },
  { menuItem: "Following", render: () => <ProfileFollowings /> },
];

export const ProfileContent = () => {
  const { profileStore } = useStore();
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
};
