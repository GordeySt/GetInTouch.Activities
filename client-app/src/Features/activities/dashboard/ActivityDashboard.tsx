import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { ActivityList } from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../App/stores/Store";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import { ActivityFilters } from "./ActivityFilters";
import { PagingParams } from "../../../App/models/pagination";

export const ActivityDashboard: React.FC = observer(() => {
  const { activityStore } = useStore();
  const {
    loadActivities,
    activitiesRegistry,
    setPagingParams,
    pagination,
    loadingInitial,
  } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    if (pagination) {
      setPagingParams(new PagingParams(pagination.currentPage + 1));
    }
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    if (activitiesRegistry.size <= 1) loadActivities();
  }, [activitiesRegistry.size, loadActivities]);

  if (loadingInitial && !loadingNext) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
        <Button
          floated="right"
          content="More..."
          positive
          onClick={handleGetNext}
          loading={loadingNext}
          disabled={pagination?.totalPages === pagination?.currentPage}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
