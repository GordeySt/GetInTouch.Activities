import { EROFS } from "constants";
import { observable, action, makeAutoObservable } from "mobx"
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;

    constructor() {
        makeAutoObservable(this);
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false;
        } 
        catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }
}

export default new ActivityStore();