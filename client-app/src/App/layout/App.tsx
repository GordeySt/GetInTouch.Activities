import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/activity";

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
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Activities</Header.Content>
      </Header>
      <List>
        {activities.map((activity: IActivity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
