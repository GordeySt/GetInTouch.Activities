import React from "react";
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
import UserStore from "../../App/stores/UserStore";

export const ProfileHeader = () => {
  const { user } = UserStore;
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={user?.image || "/assets/user.jpg"}
                circular
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{user?.displayedName}</Header>
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
};
