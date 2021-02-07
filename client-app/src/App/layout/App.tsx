import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../Features/nav/NavBar";
import { ActivityDashboard } from "../../Features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/ActivityStore";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import { HomePage } from "../../Features/home/HomePage";
import { ActivityForm } from "../../Features/activities/form/ActivityForm";
import { ActivityDetails } from "../../Features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = observer(({ location }) => {
  useEffect(() => {
    ActivityStore.loadActivities();
  }, []);

  if (ActivityStore.loadingInitial) return <LoadingComponent />;

  return (
    <React.Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <React.Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
});

export default withRouter(App);
