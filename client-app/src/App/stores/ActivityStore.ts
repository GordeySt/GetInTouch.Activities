import { makeAutoObservable, computed, configure, runInAction } from "mobx"
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";
import { IUser } from "../models/user";
import { store } from "./Store";
import { createAttendee, setActivityProps } from "../common/utils/utils";


configure({ enforceActions: "always" });

export default class ActivityStore {
    activitiesRegistry = new Map();
    loadingInitial = false;
    activity: IActivity | null = null;
    submitting = false;
    target = '';
    loading = false;

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

    loadActivities = async () => {
        this.loadingInitial = true;

        try {
            const activities = await Activities.list();
            runInAction(() => {
                const user = store.userStore.user;
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

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if (activity) {
            this.activity = activity;

            return activity;
        }
        else {
            this.loadingInitial = true;

            try {
                activity = await Activities.details(id);
                const user = store.userStore.user;
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

    createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await Activities.create(activity);
            const attendee = createAttendee(store.userStore.user!);
            attendee.isHost = true;
            let attendees = [];
            attendees.push(attendee);
            activity.attendees = attendees;
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

    editActivity = async (activity: IActivity) => {
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

    deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>,
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

    attendActivity = async () => {
        const attendee = createAttendee(store.userStore.user!);
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

    cancelAttendance = async () => {
        this.loading = true;

        try {
            await Activities.unattend(this.activity!.id!)
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees = this.activity.attendees.filter(
                        a => a.userName !== store.userStore.user?.userName
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