import { observable, action, makeAutoObservable } from "mobx"
import { createContext } from "react"
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    @action loadActivities = () => {
        this.loadingInitial = true;

        Activities.list()
        .then((activities) => {
            activities.forEach((activity) => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
            });
        }).finally(() => this.loadingInitial = false);
    }
}

export default new ActivityStore();