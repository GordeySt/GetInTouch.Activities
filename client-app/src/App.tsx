import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon, List } from 'semantic-ui-react'


class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/values')
      .then(response => response.json())
      .then(values => {
        this.setState({
          values
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
         {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  };
}

export default App;
