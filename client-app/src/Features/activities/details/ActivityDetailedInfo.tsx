import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";

interface IProps {
  activity: IActivity;
}

export const ActivityDetailedInfo: React.FC<IProps> = observer(
  ({ activity }) => {
    const modifyDayOfTheWeekToString = () => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      return days[activity.date!.getDay()];
    };

    const modifyMonthToString = () => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return months[activity.date!.getMonth()];
    };

    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="black" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{activity.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="black" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {modifyMonthToString()} {activity.date!.getDate()},{" "}
                {modifyDayOfTheWeekToString()}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="black" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                {activity.venue}, {activity.city}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
);
