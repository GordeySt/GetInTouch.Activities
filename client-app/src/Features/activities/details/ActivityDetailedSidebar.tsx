import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Item, Label, List, Segment } from "semantic-ui-react";
import { IAttendee } from "../../../App/models/activity";

interface IProps {
  attendees: IAttendee[];
}

export const ActivityDetailedSidebar: React.FC<IProps> = observer(
  ({ attendees }) => {
    const isHost = false;
    return (
      <Fragment>
        <Segment
          textAlign="center"
          style={{ border: "none" }}
          attached="top"
          secondary
          inverted
          color="black"
        >
          {attendees.length} {attendees.length === 1 ? "Person" : "People"}{" "}
          going
        </Segment>
        <Segment attached>
          <List relaxed divided>
            {attendees.map((attendee) => (
              <Item key={attendee.userName} style={{ position: "relative" }}>
                {isHost && (
                  <Label
                    style={{ position: "absolute" }}
                    color="black"
                    ribbon="right"
                  >
                    Host
                  </Label>
                )}
                <Image
                  size="mini"
                  src={attendee.image || "/assets/user.jpg"}
                  style={{ marginRight: "10px" }}
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${attendee.userName}`}>
                      {attendee.displayedName}
                    </Link>
                  </Item.Header>
                  <Item.Extra style={{ color: "black" }}>Friend</Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </List>
        </Segment>
      </Fragment>
    );
  }
);
