import React from "react";
import { Card, Button, Image } from "semantic-ui-react";

export const ActivityDetails = () => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Title</Card.Header>
        <Card.Meta>
          <span>Date</span>
        </Card.Meta>
        <Card.Description>Description</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button inverted secondary content="Edit" />
          <Button inverted color="red" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
