import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../App/stores/Store";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { ProfileCard } from "./ProfileCard";

export const ProfileFollowings = observer(() => {
  const { profileStore } = useStore();
  const {
    profile,
    followings,
    loadingFollowingsList,
    activeTab,
  } = profileStore;

  return (
    <Tab.Pane loading={loadingFollowingsList}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 3
                ? `People following ${profile?.displayedName}`
                : `People ${profile?.displayedName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map((profile) => (
              <ProfileCard key={profile?.userName} profile={profile!} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
