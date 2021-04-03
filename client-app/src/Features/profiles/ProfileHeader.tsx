import { observer } from "mobx-react-lite";
import {
  Segment,
  Item,
  Header,
  Grid,
  Statistic,
  Divider,
} from "semantic-ui-react";
import { IProfile } from "../../App/models/profile";
import { FollowButton } from "../profiles/FollowButton";

interface IProps {
  profile: IProfile | null;
}

export const ProfileHeader: React.FC<IProps> = observer(({ profile }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile?.mainImage || "/assets/user.jpg"}
                circular
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{profile?.displayedName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={profile?.followersCount || 0} />
            <Statistic
              label="Following"
              value={profile?.followingsCount || 0}
            />
          </Statistic.Group>
          <Divider />
          <FollowButton profile={profile!} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
