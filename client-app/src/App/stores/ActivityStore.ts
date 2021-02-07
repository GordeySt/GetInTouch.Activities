import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import { SyntheticEvent } from "react";
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: "always" });

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activitiesRegistry.values()).slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    constructor() {
        makeAutoObservable(this);
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await Activities.list();
            runInAction(() => {
                this.mapAllActivitiesFromResponse(activities);
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

    mapAllActivitiesFromResponse = (activities: IActivity[]) => {
        activities.forEach((activity) => {
            activity = this.modifyActivityDate(activity);
            this.addActivitiesFromResponseToClientArray(activity);
        });
    }

    modifyActivityDate = (activity: IActivity): IActivity => {
        activity.date = activity.date.split(".")[0];
        
        return activity;
    }

    @action clearActivity = () => {
        this.activity = null;
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if (activity) {
            this.activity = activity;
        }
        else {
            this.loadingInitial = true;

            try {
                activity = await Activities.details(id);
                runInAction(() => {
                    this.activity = activity;
                    this.loadingInitial = false;
                })
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
        }
        catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
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
}

export default new ActivityStore();