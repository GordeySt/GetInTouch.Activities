import { observable, action, makeAutoObservable, configure, runInAction, computed } from "mobx"
import { toast } from "react-toastify";
import { Profiles } from "../api/agent";
import { IProfile } from "../models/profile";
import UserStore from "./UserStore";

configure({ enforceActions: "always" });

class ProfileStore {
    @observable profile: IProfile | null = null;
    @observable loadingProfile = false;
    @observable uploading = false;

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

    @action uploadPhoto = async (file: Blob) => {
        this.uploading = true;

        try {
            const photo = await Profiles.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos.push(photo);
                    
                    if (photo.isMain && UserStore.user) {
                        UserStore.user.image = photo.url;
                        this.profile.mainImage = photo.url;
                    }
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            toast.error('Problem uploading photo')
            runInAction(() => {
                this.uploading = false;
            })
        }
    }
}

export default new ProfileStore();