import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Icon, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/ActivityStore";

interface IProps {
  activity: IActivity;
}

export const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const { target, submitting, deleteActivity } = ActivityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item key={activity.id}>
            <Item.Image size="tiny" circular src="/assets/user.jpg" />
            <Item.Content>
              <Item.Header>{activity.title}</Item.Header>
              <Item.Description>Hosted by Gordey</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" />
        <span style={{ marginRight: "10px" }}>{activity.date}</span>
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          secondary
        />
        <Button
          name={activity.id}
          loading={target === activity.id && submitting}
          onClick={(e) => deleteActivity(e, activity.id)}
          floated="right"
          icon
        >
          <Icon name="trash" />
        </Button>
      </Segment>
    </Segment.Group>
  );
};
