import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../App/stores/Store";

export const ActivityFilters = observer(() => {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();
  return (
    <React.Fragment>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 35 }}>
        <Header icon="filter" attached content="Filters" color="black" />
        <Menu.Item
          content="All Activities"
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        />
        <Menu.Item
          content="I'm going"
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
        />
      </Menu>
      <Header />
      <Calendar
        onChange={(date) => setPredicate("startDate", date as Date)}
        value={predicate.get("startDate") || new Date()}
      />
    </React.Fragment>
  );
});
