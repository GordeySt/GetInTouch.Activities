import { observable, action, makeAutoObservable, computed } from "mobx"
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;

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
            activities.forEach((activity) => {
                activity.date = activity.date.split(".")[0];
                this.activitiesRegistry.set(activity.id, activity);
            });
            this.loadingInitial = false;
        } 
        catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = false;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await Activities.create(activity);
            this.activitiesRegistry.set(activity.id, activity);
            this.editMode = false;
            this.submitting = false;
        }
        catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }
}

export default new ActivityStore();