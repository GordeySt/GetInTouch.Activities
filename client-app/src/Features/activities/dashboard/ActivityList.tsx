import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Item } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import ActivityStore from "../../../App/stores/ActivityStore";
import { ActivityListItem } from "./ActivityListItem"

export const ActivityList: React.FC = observer(() => {
  const {
    activitiesByDate,
  } = ActivityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity: IActivity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
      </Item.Group>
    </Segment>
  );
});
