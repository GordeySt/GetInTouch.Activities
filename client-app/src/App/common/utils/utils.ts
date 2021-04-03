import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";

export const setActivityProps = (activity: IActivity, user: IUser | null) => {
  activity.isGoing = activity.attendees.some(
    (a) => a.userName === user?.userName
  );
  activity.isHost = activity.attendees.some(
    (a) => a.userName === user?.userName && a.isHost
  );
};

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayedName: user.displayedName,
    isHost: false,
    userName: user.userName,
    mainImage: user.image!,
  };
};
