import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Grid, Icon } from "semantic-ui-react";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import ActivityStore from "../../../App/stores/ActivityStore";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

export const ActivityDetails: React.FC<
  RouteComponentProps<DetailParams>
> = observer(({ match, history }) => {
  const { activity, loadActivity, loadingInitial } = ActivityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity) return <LoadingComponent />;

  return (
    <React.Fragment>
      <Icon
        onClick={() => history.push("/activities")}
        name="arrow alternate circle left outline"
        size="big"
        style={{ marginBottom: "10px", cursor: "pointer" }}
      />
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
});
