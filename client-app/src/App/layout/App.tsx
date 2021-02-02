import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../Features/nav/NavBar";
import { ActivityDashboard } from "../../Features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(
      activities.filter((activity: IActivity) => activity.id === id)[0]
    );
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/activities")
      .then((response) => response.json())
      .then((activities: IActivity[]) => {
        setActivities(activities);
      });
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          activity={selectedActivity}
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
