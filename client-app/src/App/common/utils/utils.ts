import { IActivity } from "../../models/activity"
import { IUser } from "../../models/user"

export const setActivityProps = (activity: IActivity, user: IUser | null) => {
    activity.isGoing = activity.attendees.some(
        a => a.userName === user?.userName
    );
    activity.isHost = activity.attendees.some(
        a => a.userName === user?.userName && a.isHost
    );
}