import { observable, action, makeAutoObservable, configure, runInAction } from "mobx"
import { Profiles } from "../api/agent";
import { IProfile } from "../models/profile";

configure({ enforceActions: "always" });

class ProfileStore {
    @observable profile: IProfile | null = null;
    @observable loadingProfile = false;

    constructor() {
        makeAutoObservable(this);
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