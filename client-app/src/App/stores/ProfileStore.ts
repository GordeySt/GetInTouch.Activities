import { makeAutoObservable, configure, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Profiles } from "../api/agent";
import { IPhoto, IProfile } from "../models/profile";
import { store } from "./Store";

configure({ enforceActions: "always" });

export default class ProfileStore {
  profile: IProfile | null = null;
  loadingProfile = false;
  uploading = false;
  loadingSetMain = false;
  loadingDelete = false;
  loadingFollow = false;
  loadingFollowingsList = false;
  followings: IProfile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.userName === this.profile.userName;
    } else {
      return false;
    }
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;

    try {
      const profile = await Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };

  uploadPhoto = async (file: Blob) => {
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
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem uploading photo");
      runInAction(() => {
        this.uploading = false;
      });
    }
  };

  setMainPhoto = async (photo: IPhoto) => {
    this.loadingSetMain = true;

    try {
      await Profiles.setMainPhoto(photo.id);
      runInAction(() => {
        store.userStore.user!.image = photo.url;
        this.profile!.photos.find((a) => a.isMain)!.isMain = false;
        this.profile!.photos.find((a) => a.id === photo.id)!.isMain = true;
        this.profile!.mainImage = photo.url;
        this.loadingSetMain = false;
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem setting photo as main");
      runInAction(() => {
        this.loadingSetMain = false;
      });
    }
  };

  deletePhoto = async (photo: IPhoto) => {
    this.loadingDelete = true;

    try {
      await Profiles.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter(
          (a) => a.id !== photo.id
        );
        this.loadingDelete = false;
      });
    } catch (error) {
      toast.error("Problem deleting the photo");
      runInAction(() => {
        this.loadingDelete = false;
      });
    }
  };

  updateFollowing = async (username: string, isFollowing: boolean) => {
    this.loadingFollow = true;

    try {
      await Profiles.updateFollowing(username);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.userName !== store.userStore.user?.userName
        ) {
          isFollowing
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.isFollowing = !this.profile.isFollowing;
        }
        this.followings.forEach((profile) => {
          if (profile.userName === username) {
            profile.isFollowing
              ? profile.followersCount--
              : profile.followersCount++;
            profile.isFollowing = !profile.isFollowing;
          }
        });
        this.loadingFollow = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingFollow = false));
    }
  };

  loadFollowings = async (predicate: string) => {
    this.loadingFollowingsList = true;

    try {
      const followings = await Profiles.getListOfFollowings(
        this.profile!.userName,
        predicate
      );

      runInAction(() => {
        this.followings = followings;
        this.loadingFollowingsList = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingFollowingsList = false));
    }
  };
}
