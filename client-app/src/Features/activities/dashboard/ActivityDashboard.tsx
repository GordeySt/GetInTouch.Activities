import React from "react";
import { Grid } from "semantic-ui-react";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/ActivityStore";

export const ActivityDashboard: React.FC = observer(() => {
  const { selectedActivity, editMode } = ActivityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            key={selectedActivity && selectedActivity.id}
            activity={selectedActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
});
