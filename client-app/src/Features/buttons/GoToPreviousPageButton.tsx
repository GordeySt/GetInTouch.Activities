import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const GoToPreviousPageButton: React.FC = () => {
  let history = useHistory();
  return (
    <Button
      icon
      onClick={() => history.push("/activities")}
      style={{ marginBottom: "10px", cursor: "pointer" }}
      basic
    >
      <Icon name="arrow alternate circle left outline" size="big" />
    </Button>
  );
};
