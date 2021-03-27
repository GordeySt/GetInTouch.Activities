import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Item } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { useStore } from "../../../App/stores/Store";
import { ActivityListItem } from "./ActivityListItem";

export const ActivityList: React.FC = observer(() => {
  const { activityStore } = useStore();
  return (
    <React.Fragment>
      {activityStore.activitiesByDate.map(([group, activities]) => (
        <React.Fragment key={group}>
          <Header sub color="black">
            {group}
          </Header>
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
