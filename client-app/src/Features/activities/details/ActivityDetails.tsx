import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import ActivityStore from "../../../App/stores/ActivityStore";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";
import { NotFound } from "../../../App/layout/NotFound";
import { GoToPreviousPageButton } from "../../buttons/GoToPreviousPageButton";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<
  RouteComponentProps<DetailParams>
> = observer(({ match, history }) => {
  const { activity, loadActivity, loadingInitial } = ActivityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent />;

  if (!activity) return <NotFound />;

  return (
    <React.Fragment>
      <GoToPreviousPageButton />
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar attendees={activity.attendees} />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
});
