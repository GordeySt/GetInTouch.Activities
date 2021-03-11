import { observable, action, makeAutoObservable, configure, runInAction, computed } from "mobx"
import { Profiles } from "../api/agent";
import { IProfile } from "../models/profile";
import UserStore from "./UserStore";

configure({ enforceActions: "always" });

class ProfileStore {
    @observable profile: IProfile | null = null;
    @observable loadingProfile = false;

    constructor() {
        makeAutoObservable(this);
    }

    @computed get isCurrentUser() {
        if (UserStore.user && this.profile) {
            return UserStore.user.userName === this.profile.userName;
        } else {
            return false;
        }
    }

    @action loadProfile = async (username: string) => {
        this.loadingProfile = true;

        try {
            const profile = await Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingProfile = false;
            })
            console.log(error);
        }
    }
}

export default new ProfileStore();