import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Icon, Image, Item, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface IProps {
  activity: IActivity;
}

export const ActivityDetailedHeader: React.FC<IProps> = observer(({ activity }) => {
  const [isJoined, setIsJoined] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categories/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Gordey</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => setIsMouseOver(false)}
          onClick={() => setIsJoined(!isJoined)}
          icon
          color="black"
        >
          <Icon name={!isJoined ? "times" : "check"} />
        </Button>
        <span
          style={{
            display: `${isMouseOver ? "inline-block" : "none"}`,
            marginLeft: "10px",
          }}
        >
          {isJoined ? (
            <strong>Join Activity</strong>
          ) : (
            <strong>Cancel Attendee</strong>
          )}
        </span>
        <Button icon floated="right">
          <Icon name="edit outline" />
        </Button>
      </Segment>
    </Segment.Group>
  );
});