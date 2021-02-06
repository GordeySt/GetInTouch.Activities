import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Card, Button, Image } from "semantic-ui-react";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import ActivityStore from "../../../App/stores/ActivityStore";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<
  RouteComponentProps<DetailParams>
> = observer(({ match }) => {
  const {
    activity,
    openEditForm,
    closeActivityDetailsComponent,
    loadActivity,
    loadingInitial
  } = ActivityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, []);

  if (loadingInitial || !activity) return <LoadingComponent />

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
            onClick={() => openEditForm(activity!.id)}
            inverted
            secondary
            content="Edit"
          />
          <Button
            onClick={closeActivityDetailsComponent}
            inverted
            color="red"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
