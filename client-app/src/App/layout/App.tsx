import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../Features/nav/NavBar";
import { ActivityDashboard } from "../../Features/activities/dashboard/ActivityDashboard";
import { Activities } from "../api/agent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setEditMode(false);
    setSelectedActivity(
      activities.filter((activity: IActivity) => activity.id === id)[0]
    );
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    if (selectedActivity && id === selectedActivity.id) {
      setSelectedActivity(null);
    }

    setActivities([...activities.filter((a) => a.id !== id)]);
  };

  useEffect(() => {
    Activities.list().then((response) => {
      let activities: IActivity[] = [];

      response.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });

      setActivities(activities);
    });
  }, []);

  return (
    <React.Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
