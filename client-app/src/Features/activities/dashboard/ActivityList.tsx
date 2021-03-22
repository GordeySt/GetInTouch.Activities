import { observer } from "mobx-react-lite";
import React from "react";
import { Item, Label } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { useStore } from "../../../App/stores/Store";
import { ActivityListItem } from "./ActivityListItem";

export const ActivityList: React.FC = observer(() => {
  const { activityStore } = useStore();
  return (
    <React.Fragment>
      {activityStore.activitiesByDate.map(([group, activities]) => (
        <React.Fragment key={group}>
          <Label circular color="black" size="large">
            {activityStore.modifyMonthToString(activities[0])} {activities[0].date!.getDate()}
            , {activityStore.modifyDayOfTheWeekToString(activities[0])}
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
