import { observer } from "mobx-react-lite";
import React from "react";
import { Item, Label } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/ActivityStore";
import { ActivityListItem } from "./ActivityListItem";

export const ActivityList: React.FC = observer(() => {
  const { activitiesByDate } = ActivityStore;
  return (
    <React.Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <React.Fragment key={group}>
          <Label circular color="black" size="large">
            {group}
          </Label>
          <Item.Group divided>
            {activities.map((activity: IActivity) => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
});
