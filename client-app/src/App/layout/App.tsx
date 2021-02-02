import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { List, Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../Features/nav/NavBar";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

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
        <List>
          {activities.map((activity: IActivity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
};

export default App;
