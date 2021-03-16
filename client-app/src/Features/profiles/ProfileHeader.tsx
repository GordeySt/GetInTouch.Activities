import { observer } from "mobx-react-lite";
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal,
} from "semantic-ui-react";
import { IProfile } from "../../App/models/profile";

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
            <Statistic label="Followers" value="5" />
            <Statistic label="Following" value="42" />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="black" content="Following" />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button
                fluid
                basic
                colour={true ? "gray" : "black"}
                content={true ? "Unfollow" : "Follow"}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
