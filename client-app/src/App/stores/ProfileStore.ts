import { Agent } from "http";
import { observable, action, makeAutoObservable, configure, runInAction, computed } from "mobx"
import { toast } from "react-toastify";
import { Profiles } from "../api/agent";
import { IPhoto, IProfile } from "../models/profile";
import { store } from "./Store";

configure({ enforceActions: "always" });

class ProfileStore {
    @observable profile: IProfile | null = null;
    @observable loadingProfile = false;
    @observable uploading = false;
    @observable loadingSetMain = false;
    @observable loadingDelete = false;

    constructor() {
        makeAutoObservable(this);
    }

    @computed get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.userName;
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
                    
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.user.image = photo.url;
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

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loadingSetMain = true;

        try {
            await Profiles.setMainPhoto(photo.id);
            runInAction(() => {
                store.userStore.user!.image = photo.url;
                this.profile!.photos.find(a => a.isMain)!.isMain = false;
                this.profile!.photos.find(a => a.id === photo.id)!.isMain = true;
                this.profile!.mainImage = photo.url;
                this.loadingSetMain = false;
            })
        } catch (error) {
            console.log(error);
            toast.error("Problem setting photo as main");
            runInAction(() => {
                this.loadingSetMain = false;
            })
        }
    }

    @action deletePhoto = async (photo: IPhoto) => {
        this.loadingDelete = true;

        try {
            await Profiles.deletePhoto(photo.id);
            runInAction(() => {
                this.profile!.photos = this.profile!.photos.filter(a => a.id !== photo.id);
                this.loadingDelete = false;
            })
        } catch (error) {
            toast.error("Problem deleting the photo");
            runInAction(() => {
                this.loadingDelete = false;
            })
        }
    }
}

export default new ProfileStore();