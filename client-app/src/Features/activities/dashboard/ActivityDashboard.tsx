import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/ActivityStore";

interface IProps {
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

export const ActivityDashboard: React.FC<IProps> = observer(
  ({
    deleteActivity,
    submitting,
    target,
  }) => {
    const { selectedActivity, editMode } = ActivityStore;
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            deleteActivity={deleteActivity}
            submitting={submitting}
            target={target}
          />
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
  }
);
