import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export const LoadingComponent = () => {
  return (
    <Dimmer active inverted={true}>
      <Loader />
    </Dimmer>
  );
};
