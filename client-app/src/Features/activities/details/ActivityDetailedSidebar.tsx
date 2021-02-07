import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Item, Label, List, Segment } from "semantic-ui-react";

export const ActivityDetailedSidebar = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="black"
      >
        <Icon name="users" size="large" />
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="black"
              ribbon="right"
            >
              Host
            </Label>
            <Image
              size="mini"
              src={"/assets/user.jpg"}
              style={{ marginRight: "10px" }}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Bob</Link>
              </Item.Header>
              <Item.Extra style={{ color: "black" }}>Friend</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image
              size="mini"
              src={"/assets/user.jpg"}
              style={{ marginRight: "10px" }}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Tom</Link>
              </Item.Header>
              <Item.Extra style={{ color: "black" }}>Friend</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image
              size="mini"
              src={"/assets/user.jpg"}
              style={{ marginRight: "10px" }}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Sally</Link>
              </Item.Header>
              <Item.Extra style={{ color: "black" }}>Not A Friend</Item.Extra>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </Fragment>
  );
};
