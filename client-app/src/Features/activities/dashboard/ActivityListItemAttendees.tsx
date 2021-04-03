import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../App/models/activity";
import { ProfileCard } from "../../profiles/ProfileCard";

interface IProps {
  attendees: IAttendee[];
}

export const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  const styles = {
    borderColor: "orange",
    borderWidth: 3,
    cursor: "pointer",
  };

  return (
    <List horizontal>
      {attendees?.map((attendee) => (
        <List.Item key={attendee.userName}>
          <Popup
            header={attendee.displayedName}
            trigger={
              <Image
                bordered
                style={attendee.isFollowing ? styles : { cursor: "pointer" }}
                size="mini"
                circular
                src={attendee.mainImage || "/assets/user.jpg"}
              />
            }
          >
            <Popup.Content>
              <ProfileCard profile={attendee} />
            </Popup.Content>
          </Popup>
        </List.Item>
      ))}
    </List>
  );
};
