import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Item,
  Icon,
  Segment,
  Label,
  LabelDetail,
} from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import moment from "moment";
import { ActivityListItemAttendees } from "./ActivityListItemAttendees";

interface IProps {
  activity: IActivity;
}

export const ActivityListItem: React.FC<IProps> = observer(({ activity }) => {
  const host = activity.attendees.filter((x) => x.isHost)[0];
  return (
    <Segment.Group>
      {activity.isCancelled && (
        <Label
          attached="top"
          color="red"
          content="Cancelled"
          style={{ textAlign: "center" }}
        />
      )}
      <Segment>
        <Item.Group>
          <Item key={activity.id}>
            <Item.Image
              size="tiny"
              circular
              src={host.mainImage || "/assets/user.jpg"}
              style={{ marginBottom: 3 }}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
                <Link to={`/profile/${host.userName}`}>
                  {" "}
                  {host.displayedName}
                </Link>
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="teal"
                    content="You are hosting this activity"
                  />
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="black"
                    content="You are going to this activity"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        <span style={{ marginRight: "10px" }}>
          {moment(activity.date).format("LT")}
        </span>
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          secondary
        />
      </Segment>
    </Segment.Group>
  );
});
