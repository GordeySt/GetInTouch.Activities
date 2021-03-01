import React from "react";
import { List, Image } from "semantic-ui-react";
import { IAttendee } from "../../../App/models/activity";

interface IProps {
    attendees: IAttendee[] | null;
}

export const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      <List.Item>
        <Image size="mini" circular src="/assets/user.jpg" />
      </List.Item>
      <List.Item>
        <Image size="mini" circular src="/assets/user.jpg" />
      </List.Item>
      <List.Item>
        <Image size="mini" circular src="/assets/user.jpg" />
      </List.Item>
    </List>
  );
};
