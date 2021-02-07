import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export const HomePage = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>Home Page</h1>
      <h4>
        Go to <Link to="/activities">Activities</Link>
      </h4>
    </Container>
  );
};
