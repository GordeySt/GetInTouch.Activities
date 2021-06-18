import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { NavBar } from "../../Features/nav/NavBar";
import { ActivityDashboard } from "../../Features/activities/dashboard/ActivityDashboard";
import { Route, Switch, useLocation, withRouter } from "react-router-dom";
import { HomePage } from "../../Features/home/HomePage";
import { ActivityForm } from "../../Features/activities/form/ActivityForm";
import { ActivityDetails } from "../../Features/activities/details/ActivityDetails";
import { NotFound } from "./NotFound";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/Store";
import { ModalContainer } from "../common/modals/ModalContainer";
import { ProfilePage } from "../../Features/profiles/ProfilePage";
import { LoadingComponent } from "./LoadingComponent";
import { RegisterSuccess } from "../../Features/user/RegisterSuccess";
import { VerifyEmail } from "../../Features/user/VerifyEmail";

const App: React.FC = () => {
  const { commonStore, userStore } = useStore();
  const { getUser, loadingUser, getFacebookLoginStatus } = userStore;
  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) {
      getUser().finally(() => commonStore.setAppLoaded());
    } else {
      getFacebookLoginStatus().then(() => commonStore.setAppLoaded());
    }
  }, [getUser, commonStore, getFacebookLoginStatus]);

  return (
    <React.Fragment>
      <ModalContainer />
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
                <Route
                  path="/profile/:username"
                  component={ProfilePage}
                ></Route>
                <Route
                  path="/user/registerSuccess"
                  component={RegisterSuccess}
                />
                <Route path="/user/verifyEmail" component={VerifyEmail} />
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
