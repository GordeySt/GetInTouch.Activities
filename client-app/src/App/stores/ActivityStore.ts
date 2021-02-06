import { observable, action, makeAutoObservable, computed } from "mobx"
import { SyntheticEvent } from "react";
import { Activities } from "../api/agent";
import { IActivity } from "../models/activity";

class ActivityStore {
    @observable activitiesRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
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
            this.mapAllActivitiesFromResponse(activities);
            this.loadingInitial = false;
        } 
        catch (error) {
            console.log(error);
            this.loadingInitial = false;
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

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = false;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await Activities.create(activity);
            this.addActivitiesFromResponseToClientArray(activity);
            this.editMode = false;
            this.submitting = false;
        }
        catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await Activities.update(activity);
            this.addActivitiesFromResponseToClientArray(activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.submitting = false;
        }
        catch (error) {
            this.submitting = false;
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
                this.activitiesRegistry.delete(id);
                this.submitting = false;
                this.target = '';
                this.checkIfDeletedActivityDisplayedInDetails(id);
            }
            catch (error) {
                this.submitting = false;
                this.target = '';
                console.log(error);
            }
    }

    checkIfDeletedActivityDisplayedInDetails = (id: string) => {
        if (this.selectedActivity && this.selectedActivity.id === id) this.closeActivityDetailsComponent();
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
        this.editMode = true;
    }

    @action closeEditForm = () => {
        this.editMode = false;
    }

    @action closeActivityDetailsComponent = () => {
        this.selectedActivity = undefined;
    }
}

export default new ActivityStore();