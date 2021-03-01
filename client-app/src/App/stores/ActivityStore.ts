import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";
import { IUser } from "../models/user";
import UserStore from "./UserStore";
import { setActivityProps } from "../common/utils/utils"

configure({ enforceActions: "always" });

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable submitting = false;
    @observable target = '';
    @observable isMouseOver = false;
    @observable isJoined = true;

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activitiesRegistry.values()))
    }

    groupActivitiesByDate(activities: IActivity[]) {
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

    mapAllActivitiesFromResponse = (activities: IActivity[], user: IUser | null) => {
        activities.forEach((activity) => {
            activity = this.modifyActivityDate(activity);

            setActivityProps(activity, user);

            this.addActivitiesFromResponseToClientArray(activity);
        });
    }

    modifyActivityDate = (activity: IActivity): IActivity => {
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

    getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await Activities.create(activity);
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

    addActivitiesFromResponseToClientArray = (activity: IActivity) => {
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
}

export default new ActivityStore();