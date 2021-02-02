import React from "react";
import { Segment, Button, Label, Item } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity: IActivity) => (
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
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  secondary
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
