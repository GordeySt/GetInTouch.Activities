import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../Features/nav/NavBar";
import { ActivityDashboard } from "../../Features/activities/dashboard/ActivityDashboard";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { HomePage } from "../../Features/home/HomePage";
import { ActivityForm } from "../../Features/activities/form/ActivityForm";
import { ActivityDetails } from "../../Features/activities/details/ActivityDetails";
import { NotFound } from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RegisterForm } from "../../Features/user/RegisterForm";
import CommonStore from "../stores/CommonStore";
import UserStore from "../stores/UserStore";
import { LoadingComponent } from "./LoadingComponent";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const { appLoaded, setAppLoaded, token } = CommonStore;
  const { getUser } = UserStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) <LoadingComponent />;

  return (
    <React.Fragment>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <React.Fragment>
            <NavBar />
            <Container style={{ marginTop: "5em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/register" component={RegisterForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
};

export default withRouter(App);
