import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'
import { IActivity } from '../models/activity'

interface IState {
  activities: IActivity[];
}

class App extends Component<{}, IState>{
  readonly state: IState = {
    activities: []
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/activities')
      .then(response => response.json())
      .then(activities => {
        this.setState({
          activities
        });
      });
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Activities</Header.Content>
        </Header>
        <List>
         {this.state.activities.map((activity: IActivity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  };
}

export default App;
