import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../Features/nav/NavBar";
import { ActivityDashboard } from "../../Features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/ActivityStore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  useEffect(() => {
    ActivityStore.loadActivities();
  }, [ActivityStore]);

  if (ActivityStore.loadingInitial) return <LoadingComponent />;

  return (
    <React.Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </React.Fragment>
  );
});

export default App;
