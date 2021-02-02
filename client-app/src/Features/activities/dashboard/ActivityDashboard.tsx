import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  activity: IActivity | null;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  activity,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {activity && <ActivityDetails activity={activity} />}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};
