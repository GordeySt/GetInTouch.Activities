import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";
import { IUser } from "../models/user";
import UserStore from "./UserStore";
import { createAttendee, setActivityProps } from "../common/utils/utils";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import CommonStore from "./CommonStore";

configure({ enforceActions: "always" });

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable submitting = false;
    @observable target = '';
    @observable isMouseOver = false;
    @observable isJoined = true;
    @observable loading = false;
    @observable.ref hubConnection: HubConnection | null = null;

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activitiesRegistry.values()))
    }

    private groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.slice().sort(
            (a, b) => a.date!.getTime() - b.date!.getTime()
        )

        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date!.toISOString().split('T')[0];

            activities[date] = activities[date] ? [...activities[date], activity] : [activity];

            return activities;
        }, {} as {[key: string]: IActivity[]}));
    }

    constructor() {
        makeAutoObservable(this);
    }

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                accessTokenFactory: () => CommonStore.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start()
            .then(() => console.log(this.hubConnection!.state))
            .catch(error => console.log("Error establishinh connection: ", error))

        this.hubConnection.on("RecieveComment", comment => {
            runInAction(() => {
                this.activity!.comments.push(comment);
            })
        })
    }

    @action stopHubConnection = () => {
        this.hubConnection!.stop();
    }

    @action addComment = async (values: any) => {
        values.activityId = this.activity!.id;

        try {
            await this.hubConnection!.invoke("SendComment", values);
        } catch (error) {
            console.log(error);
        }
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;

        try {
            const activities = await Activities.list();
            runInAction(() => {
                const user = UserStore.user;
                this.mapAllActivitiesFromResponse(activities, user);
                this.loadingInitial = false;
            });
        } 
        catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    }

    private mapAllActivitiesFromResponse = (activities: IActivity[], user: IUser | null) => {
        activities.forEach((activity) => {
            activity = this.modifyActivityDate(activity);

            setActivityProps(activity, user);

            this.addActivitiesFromResponseToClientArray(activity);
        });
    }

    private modifyActivityDate = (activity: IActivity): IActivity => {
        activity.date = new Date(activity.date!);
        
        return activity;
    }

    @action clearActivity = () => {
        this.activity = null;
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if (activity) {
            this.activity = activity;

            return activity;
        }
        else {
            this.loadingInitial = true;

            try {
                activity = await Activities.details(id);
                const user = UserStore.user;
                runInAction(() => {
                    activity.date = new Date(activity.date!);
                    setActivityProps(activity, user);
                    this.activity = activity;
                    this.loadingInitial = false;
                })
                return activity;
            }
            catch (error) {
                runInAction(() => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await Activities.create(activity);
            const attendee = createAttendee(UserStore.user!);
            attendee.isHost = true;
            let attendees = [];
            attendees.push(attendee);
            activity.attendees = attendees;
            activity.comments = [];
            activity.isHost = true;
            runInAction(() => {
                this.addActivitiesFromResponseToClientArray(activity);
                this.submitting = false;
            })
            history.push(`/activities/${activity.id}`)
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem submitting data')
            console.log(error);
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await Activities.update(activity);
            runInAction(() => {
                this.addActivitiesFromResponseToClientArray(activity);
                this.activity = activity;
                this.submitting = false;
            });
            history.push(`/activities/${activity.id}`)
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            });
            console.log(error);
        }
    }

    private addActivitiesFromResponseToClientArray = (activity: IActivity) => {
        this.activitiesRegistry.set(activity.id, activity);
    }

    modifyDayOfTheWeekToString = (activity: IActivity) => {
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
  
      modifyMonthToString = (activity: IActivity) => {
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

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>,
        id: string) => {
            this.submitting = true;
            this.target = event.currentTarget.name;

            try {
                await Activities.delete(id);
                runInAction(() => {
                    this.activitiesRegistry.delete(id);
                    this.submitting = false;
                    this.target = '';
                    history.push('/activities');
                })
            }
            catch (error) {
                runInAction(() => {
                    this.submitting = false;
                    this.target = '';
                })
                console.log(error);
            }
    }

    @action setIsJoined = () => {
        this.isJoined = !this.isJoined;
    }

    @action setIsMouseOver = (mouseState: boolean) => {
        this.isMouseOver = mouseState;
    }

    @action attendActivity = async () => {
        const attendee = createAttendee(UserStore.user!);
        this.loading = true;

        try {
            await Activities.attend(this.activity!.id!);
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees.push(attendee);
                    this.activity.isGoing = true;
                    this.activitiesRegistry.set(this.activity.id, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error("Problem signing up to activity");
        }
    }

    @action cancelAttendance = async () => {
        this.loading = true;

        try {
            await Activities.unattend(this.activity!.id!)
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees = this.activity.attendees.filter(
                        a => a.userName !== UserStore.user?.userName
                    );
        
                    this.activity.isGoing = false;
                    this.activitiesRegistry.set(this.activity.id, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error("Problem cancelling attendance")
        }
    }
}

export default new ActivityStore();