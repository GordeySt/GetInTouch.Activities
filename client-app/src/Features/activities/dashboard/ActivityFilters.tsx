import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

export const ActivityFilters = () => {
  return (
    <React.Fragment>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 35 }}>
        <Header icon="filter" attached content="Filters" color="black" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </React.Fragment>
  );
};
