import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Button, Image } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/ActivityStore";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDetails: React.FC<IProps> = observer(({
  setEditMode,
  setSelectedActivity,
}) =>
{
  const { selectedActivity: activity } = ActivityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categories/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            inverted
            secondary
            content="Edit"
          />
          <Button
            onClick={() => setSelectedActivity(null)}
            inverted
            color="red"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
