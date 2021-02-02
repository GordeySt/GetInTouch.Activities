import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'


class App extends Component {
  state = {
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
         {this.state.activities.map((activity: any) => (
            <List.Item key={activity.id}>{activity.name}</List.Item>
          ))}
        </List>
      </div>
    );
  };
}

export default App;
