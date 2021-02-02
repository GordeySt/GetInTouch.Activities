import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

export const ActivityForm = () => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea rows={2} placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button floated="right" inverted secondary content="Submit" />
        <Button floated="right" inverted color="red" content="Cancel" />
      </Form>
    </Segment>
  );
};
