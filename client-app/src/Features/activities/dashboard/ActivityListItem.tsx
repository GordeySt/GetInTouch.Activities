import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, Item, Icon } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/ActivityStore";

interface IProps {
  activity: IActivity;
}

export const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const { target, submitting, deleteActivity } = ActivityStore;
  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as="a">{activity.title}</Item.Header>
        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            {activity.city}, {activity.venue}
          </div>
        </Item.Description>
        <Item.Extra>
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
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
