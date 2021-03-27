import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/Store";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";
import { NotFound } from "../../../App/layout/NotFound";
import { GoToPreviousPageButton } from "../../buttons/GoToPreviousPageButton";

export const ActivityDetails: React.FC = observer(() => {
  const { activityStore } = useStore();
  const { activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent />;

  if (!activity) return <NotFound />;

  return (
    <React.Fragment>
      <GoToPreviousPageButton />
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat activityId={activity.id!} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar attendees={activity.attendees} />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
});
