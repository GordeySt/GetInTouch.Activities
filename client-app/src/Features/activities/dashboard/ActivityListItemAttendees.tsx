import React from "react";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../App/models/activity";
import { ProfileCard } from "../../profiles/ProfileCard";

interface IProps {
  attendees: IAttendee[];
}

export const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees?.map((attendee) => (
        <List.Item key={attendee.userName}>
          <Popup
            trigger={
              <Image
                as={Link}
                to={`/profile/${attendee.userName}`}
                bordered
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
