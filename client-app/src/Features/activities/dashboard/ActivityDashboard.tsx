import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { ActivityList } from "./ActivityList";
import { observer } from "mobx-react-lite";
import { store, useStore } from "../../../App/stores/Store";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import { ActivityFilters } from "./ActivityFilters";

export const ActivityDashboard: React.FC = observer(() => {
  const { activityStore } = useStore();
  useEffect(() => {
    store.activityStore.loadActivities();
  }, [activityStore]);

  if (store.activityStore.loadingInitial) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
