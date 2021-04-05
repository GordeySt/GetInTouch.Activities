import React, { useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { ActivityList } from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../App/stores/Store";
import { ActivityFilters } from "./ActivityFilters";
import { PagingParams } from "../../../App/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import { ActivityListItemPlaceholder } from "./ActivityListItemPlaceholder";

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

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && !loadingNext ? (
          <React.Fragment>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </React.Fragment>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
