import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Segment, Button, Label, Item, Icon } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/ActivityStore";

export const ActivityList: React.FC = observer(() => {
  const {
    activitiesByDate,
    selectActivity,
    target,
    submitting,
    deleteActivity,
  } = ActivityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity: IActivity) => (
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
        ))}
      </Item.Group>
    </Segment>
  );
});
